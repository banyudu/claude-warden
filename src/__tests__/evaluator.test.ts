import { describe, it, expect } from 'vitest';
import { evaluate } from '../evaluator';
import { parseCommand } from '../parser';
import { DEFAULT_CONFIG } from '../defaults';
import type { WardenConfig } from '../types';

function eval_(cmd: string) {
  return evaluate(parseCommand(cmd), DEFAULT_CONFIG);
}

function evalWith(cmd: string, overrides: Partial<WardenConfig>) {
  const config: WardenConfig = { ...structuredClone(DEFAULT_CONFIG), ...overrides };
  return evaluate(parseCommand(cmd), config);
}

function evalWithSSH(cmd: string, trustedHosts: string[]) {
  return evalWith(cmd, { trustedSSHHosts: trustedHosts });
}

describe('evaluator', () => {
  describe('always-allow commands', () => {
    it('allows cat', () => {
      expect(eval_('cat file.txt').decision).toBe('allow');
    });

    it('allows ls -la', () => {
      expect(eval_('ls -la').decision).toBe('allow');
    });

    it('allows grep pattern file', () => {
      expect(eval_('grep foo bar.txt').decision).toBe('allow');
    });

    it('allows jq', () => {
      expect(eval_('jq .name package.json').decision).toBe('allow');
    });

    it('allows echo', () => {
      expect(eval_('echo hello').decision).toBe('allow');
    });
  });

  describe('always-deny commands', () => {
    it('denies sudo', () => {
      expect(eval_('sudo apt install').decision).toBe('deny');
    });

    it('denies shutdown', () => {
      expect(eval_('shutdown -h now').decision).toBe('deny');
    });

    it('denies crontab', () => {
      expect(eval_('crontab -e').decision).toBe('deny');
    });
  });

  describe('global deny patterns', () => {
    it('denies rm -rf', () => {
      expect(eval_('rm -rf /').decision).toBe('deny');
    });

    it('denies rm -fr', () => {
      expect(eval_('rm -fr /tmp/stuff').decision).toBe('deny');
    });

    it('denies chmod -R 777', () => {
      expect(eval_('chmod -R 777 /var/www').decision).toBe('deny');
    });
  });

  describe('conditional rules', () => {
    it('allows node --version', () => {
      expect(eval_('node --version').decision).toBe('allow');
    });

    it('asks for node script.js', () => {
      expect(eval_('node script.js').decision).toBe('ask');
    });

    it('allows npx jest', () => {
      expect(eval_('npx jest').decision).toBe('allow');
    });

    it('allows npx vitest', () => {
      expect(eval_('npx vitest --coverage').decision).toBe('allow');
    });

    it('asks for npx unknown-package', () => {
      expect(eval_('npx unknown-package').decision).toBe('ask');
    });

    it('allows npm install', () => {
      expect(eval_('npm install').decision).toBe('allow');
    });

    it('allows npm run build', () => {
      expect(eval_('npm run build').decision).toBe('allow');
    });

    it('asks for npm publish', () => {
      expect(eval_('npm publish').decision).toBe('ask');
    });

    it('allows git status', () => {
      expect(eval_('git status').decision).toBe('allow');
    });

    it('allows git commit', () => {
      expect(eval_('git commit -m "feat: add feature"').decision).toBe('allow');
    });

    it('asks for git push --force', () => {
      expect(eval_('git push --force origin main').decision).toBe('ask');
    });

    it('asks for git reset --hard', () => {
      expect(eval_('git reset --hard HEAD~1').decision).toBe('ask');
    });

    it('allows bun install', () => {
      expect(eval_('bun install').decision).toBe('allow');
    });

    it('allows bun run test', () => {
      expect(eval_('bun run test').decision).toBe('allow');
    });

    it('allows rm single file (few args)', () => {
      const result = eval_('rm temp.txt');
      expect(result.decision).toBe('allow');
    });

    it('asks for rm -r', () => {
      expect(eval_('rm -r directory').decision).toBe('ask');
    });

    it('allows docker ps', () => {
      expect(eval_('docker ps').decision).toBe('allow');
    });

    it('asks for docker run', () => {
      expect(eval_('docker run ubuntu').decision).toBe('ask');
    });
  });

  describe('pipelines', () => {
    it('allows cat | grep | wc pipeline', () => {
      expect(eval_('cat file.txt | grep pattern | wc -l').decision).toBe('allow');
    });

    it('allows ls | sort | head pipeline', () => {
      expect(eval_('ls -la | sort -k5 | head -20').decision).toBe('allow');
    });

    it('denies pipeline with sudo', () => {
      expect(eval_('echo hello | sudo tee /etc/config').decision).toBe('deny');
    });

    it('asks when pipeline has unknown command', () => {
      expect(eval_('cat file.txt | custom-tool').decision).toBe('ask');
    });
  });

  describe('chains', () => {
    it('allows safe chain with &&', () => {
      expect(eval_('mkdir -p dir && touch dir/file').decision).toBe('allow');
    });

    it('denies chain with dangerous command', () => {
      expect(eval_('echo done && sudo rm -rf /').decision).toBe('deny');
    });

    it('asks for chain with unknown command', () => {
      expect(eval_('npm run build && deploy-script').decision).toBe('ask');
    });
  });

  describe('env prefixes', () => {
    it('evaluates command after env prefix', () => {
      expect(eval_('NODE_ENV=production npm run build').decision).toBe('allow');
    });

    it('evaluates npx after env prefix', () => {
      expect(eval_('NODE_OPTIONS="--max-old-space-size=4096" npx jest').decision).toBe('allow');
    });
  });

  describe('subshells', () => {
    it('allows $(safe-command) when inner command is always-allow', () => {
      expect(eval_('echo $(whoami)').decision).toBe('allow');
    });

    it('allows backtick safe-command when inner command is always-allow', () => {
      expect(eval_('echo `date`').decision).toBe('allow');
    });

    it('denies $(dangerous-command)', () => {
      expect(eval_('echo $(sudo rm -rf /)').decision).toBe('deny');
    });

    it('asks for $(unknown-command)', () => {
      expect(eval_('echo $(unknown-sketchy-tool)').decision).toBe('ask');
    });
  });

  describe('edge cases', () => {
    it('allows empty command', () => {
      expect(eval_('').decision).toBe('allow');
    });

    it('asks for unknown command', () => {
      expect(eval_('totally-unknown-command').decision).toBe('ask');
    });

    it('handles command with path', () => {
      // /usr/bin/node --version → node --version → allow
      expect(eval_('/usr/bin/node --version').decision).toBe('allow');
    });
  });

  describe('SSH host whitelisting', () => {
    const hosts = ['devserver', 'staging-*', '*.internal.com', '192.168.1.*'];

    it('allows ssh to trusted host', () => {
      expect(evalWithSSH('ssh devserver', hosts).decision).toBe('allow');
    });

    it('allows ssh with user@ to trusted host', () => {
      expect(evalWithSSH('ssh user@devserver', hosts).decision).toBe('allow');
    });

    it('allows ssh with safe remote command on trusted host', () => {
      expect(evalWithSSH('ssh devserver cat /etc/hosts', hosts).decision).toBe('allow');
    });

    it('denies ssh with dangerous remote command on trusted host', () => {
      expect(evalWithSSH('ssh devserver sudo rm -rf /', hosts).decision).toBe('deny');
    });

    it('asks for ssh to untrusted host', () => {
      expect(evalWithSSH('ssh unknown-host', hosts).decision).toBe('ask');
    });

    it('matches * glob patterns', () => {
      expect(evalWithSSH('ssh staging-web', hosts).decision).toBe('allow');
      expect(evalWithSSH('ssh app.internal.com', hosts).decision).toBe('allow');
      expect(evalWithSSH('ssh 192.168.1.50', hosts).decision).toBe('allow');
    });

    it('matches ? glob pattern (single char)', () => {
      expect(evalWith('ssh dev?', { trustedSSHHosts: ['dev?'] }).decision).toBe('allow');
      expect(evalWith('ssh devAB', { trustedSSHHosts: ['dev?'] }).decision).toBe('ask');
    });

    it('matches [...] character class', () => {
      expect(evalWith('ssh dev1', { trustedSSHHosts: ['dev[123]'] }).decision).toBe('allow');
      expect(evalWith('ssh dev4', { trustedSSHHosts: ['dev[123]'] }).decision).toBe('ask');
    });

    it('matches [!...] negated character class', () => {
      expect(evalWith('ssh devX', { trustedSSHHosts: ['dev[!0-9]'] }).decision).toBe('allow');
      expect(evalWith('ssh dev5', { trustedSSHHosts: ['dev[!0-9]'] }).decision).toBe('ask');
    });

    it('matches {a,b,c} brace expansion', () => {
      expect(evalWith('ssh staging', { trustedSSHHosts: ['{staging,prod}'] }).decision).toBe('allow');
      expect(evalWith('ssh prod', { trustedSSHHosts: ['{staging,prod}'] }).decision).toBe('allow');
      expect(evalWith('ssh dev', { trustedSSHHosts: ['{staging,prod}'] }).decision).toBe('ask');
    });

    it('matches combined glob features', () => {
      expect(evalWith('ssh web-staging-01', { trustedSSHHosts: ['{web,api}-*-[0-9][0-9]'] }).decision).toBe('allow');
      expect(evalWith('ssh api-prod-99', { trustedSSHHosts: ['{web,api}-*-[0-9][0-9]'] }).decision).toBe('allow');
      expect(evalWith('ssh db-staging-01', { trustedSSHHosts: ['{web,api}-*-[0-9][0-9]'] }).decision).toBe('ask');
    });

    it('skips SSH flags correctly', () => {
      expect(evalWithSSH('ssh -i key -p 2222 devserver ls', hosts).decision).toBe('allow');
    });

    it('skips boolean SSH flags', () => {
      expect(evalWithSSH('ssh -v -A devserver ls', hosts).decision).toBe('allow');
    });

    it('allows scp to trusted host', () => {
      expect(evalWithSSH('scp file.txt devserver:/tmp/', hosts).decision).toBe('allow');
    });

    it('allows scp from trusted host', () => {
      expect(evalWithSSH('scp devserver:/tmp/file.txt .', hosts).decision).toBe('allow');
    });

    it('allows scp with user@ to trusted host', () => {
      expect(evalWithSSH('scp file.txt user@devserver:/tmp/', hosts).decision).toBe('allow');
    });

    it('asks for scp to untrusted host', () => {
      expect(evalWithSSH('scp file.txt unknown:/tmp/', hosts).decision).toBe('ask');
    });

    it('allows rsync to trusted host', () => {
      expect(evalWithSSH('rsync -avz src/ devserver:/opt/app/', hosts).decision).toBe('allow');
    });

    it('asks for rsync to untrusted host', () => {
      expect(evalWithSSH('rsync -avz src/ unknown:/opt/app/', hosts).decision).toBe('ask');
    });

    it('asks for ssh with no trusted hosts configured', () => {
      expect(evalWithSSH('ssh devserver', []).decision).toBe('ask');
    });

    it('recursively evaluates ask-level remote commands', () => {
      expect(evalWithSSH('ssh devserver node script.js', hosts).decision).toBe('ask');
    });
  });

  describe('Docker container whitelisting', () => {
    const containers = ['my-app', 'dev-*'];

    it('allows docker exec on trusted container', () => {
      expect(evalWith('docker exec my-app ls', { trustedDockerContainers: containers }).decision).toBe('allow');
    });

    it('allows docker exec with flags on trusted container', () => {
      expect(evalWith('docker exec -it my-app ls', { trustedDockerContainers: containers }).decision).toBe('allow');
    });

    it('allows docker exec interactive (no command) on trusted container', () => {
      expect(evalWith('docker exec -it my-app', { trustedDockerContainers: containers }).decision).toBe('allow');
    });

    it('denies docker exec with dangerous command on trusted container', () => {
      expect(evalWith('docker exec my-app sudo rm -rf /', { trustedDockerContainers: containers }).decision).toBe('deny');
    });

    it('asks for docker exec on untrusted container', () => {
      expect(evalWith('docker exec unknown-app ls', { trustedDockerContainers: containers }).decision).toBe('ask');
    });

    it('matches glob patterns for containers', () => {
      expect(evalWith('docker exec dev-web ls', { trustedDockerContainers: containers }).decision).toBe('allow');
    });

    it('does not intercept non-exec docker commands', () => {
      expect(evalWith('docker ps', { trustedDockerContainers: containers }).decision).toBe('allow');
      expect(evalWith('docker run ubuntu', { trustedDockerContainers: containers }).decision).toBe('ask');
    });

    it('skips docker exec flags with values', () => {
      expect(evalWith('docker exec -e FOO=bar -u root my-app cat /etc/hosts', { trustedDockerContainers: containers }).decision).toBe('allow');
    });
  });

  describe('kubectl context whitelisting', () => {
    const contexts = ['minikube', 'dev-*'];

    it('allows kubectl exec on trusted context with safe command', () => {
      expect(evalWith('kubectl exec --context minikube my-pod -- cat /etc/hosts', { trustedKubectlContexts: contexts }).decision).toBe('allow');
    });

    it('allows kubectl exec interactive on trusted context', () => {
      expect(evalWith('kubectl exec --context minikube -it my-pod', { trustedKubectlContexts: contexts }).decision).toBe('allow');
    });

    it('denies kubectl exec with dangerous command on trusted context', () => {
      expect(evalWith('kubectl exec --context minikube my-pod -- sudo rm -rf /', { trustedKubectlContexts: contexts }).decision).toBe('deny');
    });

    it('asks for kubectl exec without context', () => {
      expect(evalWith('kubectl exec my-pod -- ls', { trustedKubectlContexts: contexts }).decision).toBe('ask');
    });

    it('asks for kubectl exec on untrusted context', () => {
      expect(evalWith('kubectl exec --context production my-pod -- ls', { trustedKubectlContexts: contexts }).decision).toBe('ask');
    });

    it('matches glob patterns for contexts', () => {
      expect(evalWith('kubectl exec --context dev-cluster my-pod -- ls', { trustedKubectlContexts: contexts }).decision).toBe('allow');
    });

    it('handles --context=value syntax', () => {
      expect(evalWith('kubectl exec --context=minikube my-pod -- ls', { trustedKubectlContexts: contexts }).decision).toBe('allow');
    });

    it('does not intercept non-exec kubectl commands', () => {
      expect(evalWith('kubectl get pods --context minikube', { trustedKubectlContexts: contexts }).decision).toBe('ask');
    });

    it('handles namespace and container flags', () => {
      expect(evalWith('kubectl exec --context minikube -n default -c app my-pod -- cat /tmp/log', { trustedKubectlContexts: contexts }).decision).toBe('allow');
    });
  });

  describe('Sprite whitelisting', () => {
    const sprites = ['my-sprite', 'dev-*'];

    it('allows sprite exec on trusted sprite', () => {
      expect(evalWith('sprite exec -s my-sprite ls -la', { trustedSprites: sprites }).decision).toBe('allow');
    });

    it('allows sprite x (alias) on trusted sprite', () => {
      expect(evalWith('sprite x -s my-sprite ls', { trustedSprites: sprites }).decision).toBe('allow');
    });

    it('allows sprite console on trusted sprite', () => {
      expect(evalWith('sprite console -s my-sprite', { trustedSprites: sprites }).decision).toBe('allow');
    });

    it('allows sprite c (alias) on trusted sprite', () => {
      expect(evalWith('sprite c -s my-sprite', { trustedSprites: sprites }).decision).toBe('allow');
    });

    it('denies sprite exec with dangerous command on trusted sprite', () => {
      expect(evalWith('sprite exec -s my-sprite sudo rm -rf /', { trustedSprites: sprites }).decision).toBe('deny');
    });

    it('asks for sprite exec on untrusted sprite', () => {
      expect(evalWith('sprite exec -s unknown-sprite ls', { trustedSprites: sprites }).decision).toBe('ask');
    });

    it('matches glob patterns', () => {
      expect(evalWith('sprite exec -s dev-web ls', { trustedSprites: sprites }).decision).toBe('allow');
    });

    it('handles -o and -s flags before subcommand', () => {
      expect(evalWith('sprite -o myorg -s my-sprite exec ls', { trustedSprites: sprites }).decision).toBe('allow');
    });

    it('handles --sprite=value syntax', () => {
      expect(evalWith('sprite exec --sprite=my-sprite ls', { trustedSprites: sprites }).decision).toBe('allow');
    });

    it('handles -o and -s with exec subcommand and command', () => {
      expect(evalWith('sprite exec -o myorg -s my-sprite npm start', { trustedSprites: sprites }).decision).toBe('allow');
    });

    it('recursively evaluates ask-level remote commands', () => {
      expect(evalWith('sprite exec -s my-sprite node script.js', { trustedSprites: sprites }).decision).toBe('ask');
    });
  });
});

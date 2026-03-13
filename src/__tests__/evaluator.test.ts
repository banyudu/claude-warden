import { describe, it, expect } from 'vitest';
import { evaluate } from '../evaluator';
import { parseCommand } from '../parser';
import { DEFAULT_CONFIG } from '../defaults';
import type { WardenConfig, ConfigLayer, TrustedTarget } from '../types';

function toTargets(items: (string | TrustedTarget)[]): TrustedTarget[] {
  return items.map(i => typeof i === 'string' ? { name: i } : i);
}

function eval_(cmd: string) {
  return evaluate(parseCommand(cmd), DEFAULT_CONFIG);
}

function evalWith(cmd: string, overrides: Partial<WardenConfig>) {
  const config: WardenConfig = { ...structuredClone(DEFAULT_CONFIG), ...overrides };
  return evaluate(parseCommand(cmd), config);
}

function evalWithSSH(cmd: string, trustedHosts: (string | TrustedTarget)[]) {
  return evalWith(cmd, { trustedSSHHosts: toTargets(trustedHosts) });
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

  describe('dangerous arg patterns', () => {
    it('asks for rm -rf', () => {
      expect(eval_('rm -rf /').decision).toBe('ask');
    });

    it('asks for rm -fr', () => {
      expect(eval_('rm -fr /tmp/stuff').decision).toBe('ask');
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

  describe('scoped layer priority', () => {
    it('user alwaysAllow overrides default alwaysDeny', () => {
      const userLayer: ConfigLayer = { alwaysAllow: ['sudo'], alwaysDeny: [], rules: [] };
      const config: WardenConfig = {
        ...structuredClone(DEFAULT_CONFIG),
        layers: [userLayer, DEFAULT_CONFIG.layers[0]],
      };
      expect(evaluate(parseCommand('sudo apt install'), config).decision).toBe('allow');
    });

    it('workspace alwaysDeny overrides user alwaysAllow', () => {
      const userLayer: ConfigLayer = { alwaysAllow: ['curl'], alwaysDeny: [], rules: [] };
      const workspaceLayer: ConfigLayer = { alwaysAllow: [], alwaysDeny: ['curl'], rules: [] };
      const config: WardenConfig = {
        ...structuredClone(DEFAULT_CONFIG),
        layers: [workspaceLayer, userLayer, DEFAULT_CONFIG.layers[0]],
      };
      expect(evaluate(parseCommand('curl https://example.com'), config).decision).toBe('deny');
    });

    it('workspace rule with override replaces default rule for same command', () => {
      const workspaceLayer: ConfigLayer = {
        alwaysAllow: [],
        alwaysDeny: [],
        rules: [{ command: 'npm', default: 'deny', override: true }],
      };
      const config: WardenConfig = {
        ...structuredClone(DEFAULT_CONFIG),
        layers: [workspaceLayer, DEFAULT_CONFIG.layers[0]],
      };
      expect(evaluate(parseCommand('npm install'), config).decision).toBe('deny');
    });

    it('user rule with override replaces default rule', () => {
      const userLayer: ConfigLayer = {
        alwaysAllow: [],
        alwaysDeny: [],
        rules: [{ command: 'docker', default: 'allow', override: true }],
      };
      const config: WardenConfig = {
        ...structuredClone(DEFAULT_CONFIG),
        layers: [userLayer, DEFAULT_CONFIG.layers[0]],
      };
      expect(evaluate(parseCommand('docker run ubuntu'), config).decision).toBe('allow');
    });

    it('first layer default wins when merging (workspace over user)', () => {
      const userLayer: ConfigLayer = {
        alwaysAllow: [],
        alwaysDeny: [],
        rules: [{ command: 'npm', default: 'allow' }],
      };
      const workspaceLayer: ConfigLayer = {
        alwaysAllow: [],
        alwaysDeny: [],
        rules: [{ command: 'npm', default: 'ask' }],
      };
      const config: WardenConfig = {
        ...structuredClone(DEFAULT_CONFIG),
        layers: [workspaceLayer, userLayer, DEFAULT_CONFIG.layers[0]],
      };
      // npm install matches a default argPattern → allow; but unmatched commands use workspace's default: ask
      expect(evaluate(parseCommand('npm install'), config).decision).toBe('allow');
      expect(evaluate(parseCommand('npm some-unknown-cmd'), config).decision).toBe('ask');
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
      expect(evalWith('ssh dev?', { trustedSSHHosts: toTargets(['dev?']) }).decision).toBe('allow');
      expect(evalWith('ssh devAB', { trustedSSHHosts: toTargets(['dev?']) }).decision).toBe('ask');
    });

    it('matches [...] character class', () => {
      expect(evalWith('ssh dev1', { trustedSSHHosts: toTargets(['dev[123]']) }).decision).toBe('allow');
      expect(evalWith('ssh dev4', { trustedSSHHosts: toTargets(['dev[123]']) }).decision).toBe('ask');
    });

    it('matches [!...] negated character class', () => {
      expect(evalWith('ssh devX', { trustedSSHHosts: toTargets(['dev[!0-9]']) }).decision).toBe('allow');
      expect(evalWith('ssh dev5', { trustedSSHHosts: toTargets(['dev[!0-9]']) }).decision).toBe('ask');
    });

    it('matches {a,b,c} brace expansion', () => {
      expect(evalWith('ssh staging', { trustedSSHHosts: toTargets(['{staging,prod}']) }).decision).toBe('allow');
      expect(evalWith('ssh prod', { trustedSSHHosts: toTargets(['{staging,prod}']) }).decision).toBe('allow');
      expect(evalWith('ssh dev', { trustedSSHHosts: toTargets(['{staging,prod}']) }).decision).toBe('ask');
    });

    it('matches combined glob features', () => {
      expect(evalWith('ssh web-staging-01', { trustedSSHHosts: toTargets(['{web,api}-*-[0-9][0-9]']) }).decision).toBe('allow');
      expect(evalWith('ssh api-prod-99', { trustedSSHHosts: toTargets(['{web,api}-*-[0-9][0-9]']) }).decision).toBe('allow');
      expect(evalWith('ssh db-staging-01', { trustedSSHHosts: toTargets(['{web,api}-*-[0-9][0-9]']) }).decision).toBe('ask');
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
      expect(evalWith('docker exec my-app ls', { trustedDockerContainers: toTargets(containers) }).decision).toBe('allow');
    });

    it('allows docker exec with flags on trusted container', () => {
      expect(evalWith('docker exec -it my-app ls', { trustedDockerContainers: toTargets(containers) }).decision).toBe('allow');
    });

    it('allows docker exec interactive (no command) on trusted container', () => {
      expect(evalWith('docker exec -it my-app', { trustedDockerContainers: toTargets(containers) }).decision).toBe('allow');
    });

    it('denies docker exec with dangerous command on trusted container', () => {
      expect(evalWith('docker exec my-app sudo rm -rf /', { trustedDockerContainers: toTargets(containers) }).decision).toBe('deny');
    });

    it('asks for docker exec on untrusted container', () => {
      expect(evalWith('docker exec unknown-app ls', { trustedDockerContainers: toTargets(containers) }).decision).toBe('ask');
    });

    it('matches glob patterns for containers', () => {
      expect(evalWith('docker exec dev-web ls', { trustedDockerContainers: toTargets(containers) }).decision).toBe('allow');
    });

    it('does not intercept non-exec docker commands', () => {
      expect(evalWith('docker ps', { trustedDockerContainers: toTargets(containers) }).decision).toBe('allow');
      expect(evalWith('docker run ubuntu', { trustedDockerContainers: toTargets(containers) }).decision).toBe('ask');
    });

    it('skips docker exec flags with values', () => {
      expect(evalWith('docker exec -e FOO=bar -u root my-app cat /etc/hosts', { trustedDockerContainers: toTargets(containers) }).decision).toBe('allow');
    });

    it('allows bare bash on trusted container (interactive shell)', () => {
      expect(evalWith('docker exec -it my-app bash', { trustedDockerContainers: toTargets(containers) }).decision).toBe('allow');
    });

    it('allows bare sh on trusted container (interactive shell)', () => {
      expect(evalWith('docker exec my-app sh', { trustedDockerContainers: toTargets(containers) }).decision).toBe('allow');
    });

    it('allows bash -c with safe command on trusted container', () => {
      expect(evalWith('docker exec my-app bash -c "ls -la"', { trustedDockerContainers: toTargets(containers) }).decision).toBe('allow');
    });

    it('denies bash -c with dangerous command on trusted container', () => {
      expect(evalWith('docker exec my-app bash -c "sudo rm -rf /"', { trustedDockerContainers: toTargets(containers) }).decision).toBe('deny');
    });

    it('allows bash -c with piped safe commands on trusted container', () => {
      expect(evalWith(`docker exec my-app bash -c 'tail -100 /tmp/app.log | grep error | tail -20'`, { trustedDockerContainers: toTargets(containers) }).decision).toBe('allow');
    });
  });

  describe('kubectl context whitelisting', () => {
    const contexts = ['minikube', 'dev-*'];

    it('allows kubectl exec on trusted context with safe command', () => {
      expect(evalWith('kubectl exec --context minikube my-pod -- cat /etc/hosts', { trustedKubectlContexts: toTargets(contexts) }).decision).toBe('allow');
    });

    it('allows kubectl exec interactive on trusted context', () => {
      expect(evalWith('kubectl exec --context minikube -it my-pod', { trustedKubectlContexts: toTargets(contexts) }).decision).toBe('allow');
    });

    it('denies kubectl exec with dangerous command on trusted context', () => {
      expect(evalWith('kubectl exec --context minikube my-pod -- sudo rm -rf /', { trustedKubectlContexts: toTargets(contexts) }).decision).toBe('deny');
    });

    it('asks for kubectl exec without context', () => {
      expect(evalWith('kubectl exec my-pod -- ls', { trustedKubectlContexts: toTargets(contexts) }).decision).toBe('ask');
    });

    it('asks for kubectl exec on untrusted context', () => {
      expect(evalWith('kubectl exec --context production my-pod -- ls', { trustedKubectlContexts: toTargets(contexts) }).decision).toBe('ask');
    });

    it('matches glob patterns for contexts', () => {
      expect(evalWith('kubectl exec --context dev-cluster my-pod -- ls', { trustedKubectlContexts: toTargets(contexts) }).decision).toBe('allow');
    });

    it('handles --context=value syntax', () => {
      expect(evalWith('kubectl exec --context=minikube my-pod -- ls', { trustedKubectlContexts: toTargets(contexts) }).decision).toBe('allow');
    });

    it('does not intercept non-exec kubectl commands', () => {
      // 'get' is now always allowed as a read-only kubectl command, so test with a non-read-only subcommand
      expect(evalWith('kubectl apply -f deployment.yaml --context minikube', { trustedKubectlContexts: toTargets(contexts) }).decision).toBe('ask');
    });

    it('handles namespace and container flags', () => {
      expect(evalWith('kubectl exec --context minikube -n default -c app my-pod -- cat /tmp/log', { trustedKubectlContexts: toTargets(contexts) }).decision).toBe('allow');
    });

    it('allows bare bash on trusted context (interactive shell)', () => {
      expect(evalWith('kubectl exec --context minikube my-pod -- bash', { trustedKubectlContexts: toTargets(contexts) }).decision).toBe('allow');
    });

    it('allows bare sh on trusted context (interactive shell)', () => {
      expect(evalWith('kubectl exec --context minikube my-pod -- sh', { trustedKubectlContexts: toTargets(contexts) }).decision).toBe('allow');
    });

    it('allows bash -c with safe command on trusted context', () => {
      expect(evalWith('kubectl exec --context minikube my-pod -- bash -c "ls -la"', { trustedKubectlContexts: toTargets(contexts) }).decision).toBe('allow');
    });

    it('denies bash -c with dangerous command on trusted context', () => {
      expect(evalWith('kubectl exec --context minikube my-pod -- bash -c "sudo rm -rf /"', { trustedKubectlContexts: toTargets(contexts) }).decision).toBe('deny');
    });

    it('allows bash -c with piped safe commands on trusted context', () => {
      expect(evalWith(`kubectl exec --context minikube my-pod -- bash -c 'tail -100 /tmp/app.log | grep error | tail -20'`, { trustedKubectlContexts: toTargets(contexts) }).decision).toBe('allow');
    });
  });

  describe('Sprite whitelisting', () => {
    const sprites = ['my-sprite', 'dev-*'];

    it('allows sprite exec on trusted sprite', () => {
      expect(evalWith('sprite exec -s my-sprite ls -la', { trustedSprites: toTargets(sprites) }).decision).toBe('allow');
    });

    it('allows sprite x (alias) on trusted sprite', () => {
      expect(evalWith('sprite x -s my-sprite ls', { trustedSprites: toTargets(sprites) }).decision).toBe('allow');
    });

    it('allows sprite console on trusted sprite', () => {
      expect(evalWith('sprite console -s my-sprite', { trustedSprites: toTargets(sprites) }).decision).toBe('allow');
    });

    it('allows sprite c (alias) on trusted sprite', () => {
      expect(evalWith('sprite c -s my-sprite', { trustedSprites: toTargets(sprites) }).decision).toBe('allow');
    });

    it('denies sprite exec with dangerous command on trusted sprite', () => {
      expect(evalWith('sprite exec -s my-sprite sudo rm -rf /', { trustedSprites: toTargets(sprites) }).decision).toBe('deny');
    });

    it('asks for sprite exec on untrusted sprite', () => {
      expect(evalWith('sprite exec -s unknown-sprite ls', { trustedSprites: toTargets(sprites) }).decision).toBe('ask');
    });

    it('matches glob patterns', () => {
      expect(evalWith('sprite exec -s dev-web ls', { trustedSprites: toTargets(sprites) }).decision).toBe('allow');
    });

    it('handles -o and -s flags before subcommand', () => {
      expect(evalWith('sprite -o myorg -s my-sprite exec ls', { trustedSprites: toTargets(sprites) }).decision).toBe('allow');
    });

    it('handles --sprite=value syntax', () => {
      expect(evalWith('sprite exec --sprite=my-sprite ls', { trustedSprites: toTargets(sprites) }).decision).toBe('allow');
    });

    it('handles -o and -s with exec subcommand and command', () => {
      expect(evalWith('sprite exec -o myorg -s my-sprite npm start', { trustedSprites: toTargets(sprites) }).decision).toBe('allow');
    });

    it('recursively evaluates ask-level remote commands', () => {
      expect(evalWith('sprite exec -s my-sprite node script.js', { trustedSprites: toTargets(sprites) }).decision).toBe('ask');
    });

    it('allows bare bash on trusted sprite (interactive shell)', () => {
      expect(evalWith('sprite exec -s my-sprite bash', { trustedSprites: toTargets(sprites) }).decision).toBe('allow');
    });

    it('allows bare sh on trusted sprite (interactive shell)', () => {
      expect(evalWith('sprite exec -s my-sprite sh', { trustedSprites: toTargets(sprites) }).decision).toBe('allow');
    });

    it('allows bash -c with safe command on trusted sprite', () => {
      expect(evalWith('sprite exec -s my-sprite bash -c "ls -la"', { trustedSprites: toTargets(sprites) }).decision).toBe('allow');
    });

    it('denies bash -c with dangerous command on trusted sprite', () => {
      expect(evalWith('sprite exec -s my-sprite bash -c "sudo rm -rf /"', { trustedSprites: toTargets(sprites) }).decision).toBe('deny');
    });

    it('allows bash -c with piped safe commands on trusted sprite', () => {
      expect(evalWith(`sprite exec -s my-sprite bash -c 'tail -100 /tmp/app.log | grep error | tail -20'`, { trustedSprites: toTargets(sprites) }).decision).toBe('allow');
    });
  });

  describe('trustedContextOverrides', () => {
    const overrides = {
      alwaysAllow: ['sudo', 'apt'],
      alwaysDeny: [],
      rules: [],
    };

    it('allows sudo inside trusted docker container with override', () => {
      expect(evalWith('docker exec my-app sudo apt install curl', {
        trustedDockerContainers: toTargets(['my-app']),
        trustedContextOverrides: overrides,
      }).decision).toBe('allow');
    });

    it('still denies sudo on the host (not in remote context)', () => {
      expect(evalWith('sudo apt install curl', {
        trustedContextOverrides: overrides,
      }).decision).toBe('deny');
    });

    it('allows sudo inside trusted kubectl context with override', () => {
      expect(evalWith('kubectl exec --context minikube my-pod -- sudo apt install curl', {
        trustedKubectlContexts: toTargets(['minikube']),
        trustedContextOverrides: overrides,
      }).decision).toBe('allow');
    });

    it('allows sudo inside trusted SSH host with override', () => {
      expect(evalWith('ssh devserver sudo apt install curl', {
        trustedSSHHosts: toTargets(['devserver']),
        trustedContextOverrides: overrides,
      }).decision).toBe('allow');
    });

    it('allows sudo inside trusted sprite with override', () => {
      expect(evalWith('sprite exec -s my-sprite sudo apt install curl', {
        trustedSprites: toTargets(['my-sprite']),
        trustedContextOverrides: overrides,
      }).decision).toBe('allow');
    });

    it('allows sudo via bash -c inside trusted docker with override', () => {
      expect(evalWith('docker exec my-app bash -c "sudo apt install curl"', {
        trustedDockerContainers: toTargets(['my-app']),
        trustedContextOverrides: overrides,
      }).decision).toBe('allow');
    });

    it('still denies non-overridden dangerous commands in remote context', () => {
      expect(evalWith('docker exec my-app shutdown now', {
        trustedDockerContainers: toTargets(['my-app']),
        trustedContextOverrides: overrides,
      }).decision).toBe('deny');
    });

    it('does not apply overrides to untrusted containers', () => {
      expect(evalWith('docker exec unknown-app sudo apt install curl', {
        trustedDockerContainers: toTargets(['my-app']),
        trustedContextOverrides: overrides,
      }).decision).toBe('ask');
    });

    it('supports alwaysDeny in context overrides', () => {
      expect(evalWith('docker exec my-app curl http://example.com', {
        trustedDockerContainers: toTargets(['my-app']),
        trustedContextOverrides: { alwaysAllow: [], alwaysDeny: ['curl'], rules: [] },
      }).decision).toBe('deny');
    });
  });

  describe('per-target trusted overrides', () => {
    it('allowAll on docker container allows sudo, shutdown, etc.', () => {
      expect(evalWith('docker exec dev-box sudo rm -rf /', {
        trustedDockerContainers: [{ name: 'dev-box', allowAll: true }],
      }).decision).toBe('allow');
    });

    it('allowAll on docker container allows shutdown', () => {
      expect(evalWith('docker exec dev-box shutdown now', {
        trustedDockerContainers: [{ name: 'dev-box', allowAll: true }],
      }).decision).toBe('allow');
    });

    it('allowAll on sprite allows everything', () => {
      expect(evalWith('sprite exec -s yudu-claw sudo apt install curl', {
        trustedSprites: [{ name: 'yudu-claw', allowAll: true }],
      }).decision).toBe('allow');
    });

    it('allowAll on SSH host allows everything', () => {
      expect(evalWith('ssh devserver sudo rm -rf /', {
        trustedSSHHosts: [{ name: 'devserver', allowAll: true }],
      }).decision).toBe('allow');
    });

    it('allowAll on kubectl context allows everything', () => {
      expect(evalWith('kubectl exec --context minikube my-pod -- sudo rm -rf /', {
        trustedKubectlContexts: [{ name: 'minikube', allowAll: true }],
      }).decision).toBe('allow');
    });

    it('per-target overrides allow sudo but global does not', () => {
      expect(evalWith('docker exec dev-box sudo apt install curl', {
        trustedDockerContainers: [{ name: 'dev-box', overrides: { alwaysAllow: ['sudo', 'apt'], alwaysDeny: [], rules: [] } }],
      }).decision).toBe('allow');
    });

    it('per-target overrides do not affect other containers', () => {
      expect(evalWith('docker exec other-box sudo apt install curl', {
        trustedDockerContainers: [
          { name: 'dev-box', overrides: { alwaysAllow: ['sudo'], alwaysDeny: [], rules: [] } },
          { name: 'other-box' },
        ],
      }).decision).toBe('deny');
    });

    it('per-target overrides combine with global overrides', () => {
      expect(evalWith('docker exec dev-box sudo systemctl restart app', {
        trustedDockerContainers: [{ name: 'dev-box', overrides: { alwaysAllow: ['sudo'], alwaysDeny: [], rules: [] } }],
        trustedContextOverrides: { alwaysAllow: ['systemctl'], alwaysDeny: [], rules: [] },
      }).decision).toBe('allow');
    });

    it('per-target overrides take priority over global overrides', () => {
      expect(evalWith('docker exec dev-box curl http://example.com', {
        trustedDockerContainers: [{ name: 'dev-box', overrides: { alwaysAllow: [], alwaysDeny: ['curl'], rules: [] } }],
        trustedContextOverrides: { alwaysAllow: ['curl'], alwaysDeny: [], rules: [] },
      }).decision).toBe('deny');
    });

    it('string entries still work as before (backward compat)', () => {
      expect(evalWith('docker exec my-app ls', {
        trustedDockerContainers: toTargets(['my-app']),
      }).decision).toBe('allow');
    });

    it('mixed string and object entries work together', () => {
      const result1 = evalWith('docker exec my-app sudo apt install curl', {
        trustedDockerContainers: [
          { name: 'my-app' },
          { name: 'dev-box', allowAll: true },
        ],
      });
      expect(result1.decision).toBe('deny'); // my-app has no overrides, sudo denied

      const result2 = evalWith('docker exec dev-box sudo apt install curl', {
        trustedDockerContainers: [
          { name: 'my-app' },
          { name: 'dev-box', allowAll: true },
        ],
      });
      expect(result2.decision).toBe('allow'); // dev-box has allowAll
    });

    it('allowAll on untrusted target has no effect', () => {
      expect(evalWith('docker exec unknown-box sudo ls', {
        trustedDockerContainers: [{ name: 'dev-box', allowAll: true }],
      }).decision).toBe('ask');
    });

    it('SSH with per-host overrides', () => {
      expect(evalWith('ssh staging-web systemctl restart app', {
        trustedSSHHosts: [{ name: 'staging-*', overrides: { alwaysAllow: ['systemctl'], alwaysDeny: [], rules: [] } }],
      }).decision).toBe('allow');
    });

    it('kubectl with per-context overrides', () => {
      expect(evalWith('kubectl exec --context prod-cluster my-pod -- rm -rf /tmp/cache', {
        trustedKubectlContexts: [{ name: 'prod-cluster', overrides: { alwaysAllow: [], alwaysDeny: ['rm'], rules: [] } }],
      }).decision).toBe('deny');
    });

    it('sprite with per-sprite overrides', () => {
      expect(evalWith('sprite exec -s dev-sprite sudo apt install vim', {
        trustedSprites: [{ name: 'dev-*', overrides: { alwaysAllow: ['sudo', 'apt'], alwaysDeny: [], rules: [] } }],
      }).decision).toBe('allow');
    });

    it('allowAll on glob-matched sprite', () => {
      expect(evalWith('sprite exec -s dev-testing sudo shutdown now', {
        trustedSprites: [{ name: 'dev-*', allowAll: true }],
      }).decision).toBe('allow');
    });
  });

  describe('dangerous alwaysAllow hardening', () => {
    // find — smart -exec evaluation
    it('allows find basic search', () => expect(eval_('find . -name "*.ts"').decision).toBe('allow'));
    it('allows find -exec with safe command', () => expect(eval_('find . -exec grep -l "foo" {} \\;').decision).toBe('allow'));
    it('allows find -exec rm (few files)', () => expect(eval_('find . -exec rm {} \\;').decision).toBe('allow'));
    it('asks for find -exec rm -rf', () => expect(eval_('find . -exec rm -rf {} \\;').decision).toBe('ask'));
    it('asks for find -exec with dangerous command', () => expect(eval_('find . -exec sudo rm {} \\;').decision).toBe('deny'));
    it('asks for find -delete', () => expect(eval_('find . -name "*.tmp" -delete').decision).toBe('ask'));
    it('asks for find -ok', () => expect(eval_('find . -ok rm {} \\;').decision).toBe('ask'));
    it('allows find -execdir with safe command', () => expect(eval_('find . -execdir cat {} \\;').decision).toBe('allow'));
    it('allows find -exec grep -l', () => expect(eval_('find ~/dev/src/config -name "*.ts" -exec grep -l "tools: {" {} \\;').decision).toBe('allow'));

    // sed
    it('allows sed without -i', () => expect(eval_("sed 's/foo/bar/' file.txt").decision).toBe('allow'));
    it('asks for sed -i', () => expect(eval_("sed -i 's/foo/bar/' file.txt").decision).toBe('ask'));

    // awk
    it('allows simple awk', () => expect(eval_("awk '{print $1}' file.txt").decision).toBe('allow'));
    it('asks for awk with system()', () => expect(eval_('awk \'BEGIN{system("rm -rf /")}\' file').decision).toBe('ask'));

    // xargs
    it('uses subcommand policy for xargs', () => expect(eval_('xargs rm').decision).toBe('allow'));
    it('denies xargs with denied subcommand', () => expect(eval_('xargs sudo').decision).toBe('deny'));
    it('allows xargs with no args (defaults to echo)', () => expect(eval_('xargs').decision).toBe('allow'));
    it('allows xargs with options and no command (defaults to echo)', () => expect(eval_('xargs -0').decision).toBe('allow'));
    it('asks when xargs subcommand cannot be resolved', () => expect(eval_('xargs --unknown').decision).toBe('ask'));
    it('allows xargs with sh -c when inner commands are safe', () => expect(eval_("xargs -I {} sh -c 'echo === && head -50 foo'").decision).toBe('allow'));
    it('allows xargs with bash -c when inner commands are safe', () => expect(eval_("xargs -I {} bash -c 'echo hello && ls'").decision).toBe('allow'));
    it('denies xargs with sh -c when inner command is denied', () => expect(eval_("xargs sh -c 'sudo rm -rf /'").decision).toBe('deny'));

    // tee
    it('allows tee to normal path', () => expect(eval_('tee output.txt').decision).toBe('allow'));
    it('asks for tee to /etc/', () => expect(eval_('tee /etc/shadow').decision).toBe('ask'));

    // openssl
    it('allows openssl x509', () => expect(eval_('openssl x509 -in cert.pem -text').decision).toBe('allow'));
    it('asks for openssl enc', () => expect(eval_('openssl enc -aes-256-cbc -in secret').decision).toBe('ask'));
  });

  describe('eval/source/. commands', () => {
    // eval — always deny
    it('denies eval', () => {
      expect(eval_('eval "echo hello"').decision).toBe('deny');
    });

    it('denies eval in chain', () => {
      expect(eval_('ls && eval "rm -rf /"').decision).toBe('deny');
    });

    // source — conditional
    it('allows source ~/.bashrc', () => {
      expect(eval_('source ~/.bashrc').decision).toBe('allow');
    });

    it('allows source ~/.nvm/nvm.sh', () => {
      expect(eval_('source ~/.nvm/nvm.sh').decision).toBe('allow');
    });

    it('allows source .env', () => {
      expect(eval_('source .env').decision).toBe('allow');
    });

    it('allows source .envrc', () => {
      expect(eval_('source .envrc').decision).toBe('allow');
    });

    it('asks for source /tmp/random.sh', () => {
      expect(eval_('source /tmp/random.sh').decision).toBe('ask');
    });

    it('denies source with no args', () => {
      expect(eval_('source').decision).toBe('deny');
    });

    // . (dot command) — same as source
    it('allows . ~/.bashrc', () => {
      expect(eval_('. ~/.bashrc').decision).toBe('allow');
    });

    it('allows . ~/.nvm/nvm.sh', () => {
      expect(eval_('. ~/.nvm/nvm.sh').decision).toBe('allow');
    });

    it('asks for . /tmp/unknown.sh', () => {
      expect(eval_('. /tmp/unknown.sh').decision).toBe('ask');
    });
  });

  describe('full-path whitelist', () => {
    it('full-path in alwaysAllow matches only that exact path', () => {
      const layer: ConfigLayer = { alwaysAllow: ['/home/user/bin/my-script.sh'], alwaysDeny: [], rules: [] };
      const config: WardenConfig = {
        ...structuredClone(DEFAULT_CONFIG),
        layers: [layer, DEFAULT_CONFIG.layers[0]],
      };
      expect(evaluate(parseCommand('/home/user/bin/my-script.sh arg1'), config).decision).toBe('allow');
    });

    it('full-path in alwaysAllow does not match different path with same basename', () => {
      const layer: ConfigLayer = { alwaysAllow: ['/home/user/bin/my-script.sh'], alwaysDeny: [], rules: [] };
      const config: WardenConfig = {
        ...structuredClone(DEFAULT_CONFIG),
        layers: [layer, DEFAULT_CONFIG.layers[0]],
      };
      expect(evaluate(parseCommand('/other/path/my-script.sh'), config).decision).toBe('ask');
    });

    it('full-path in alwaysDeny blocks only that exact path', () => {
      const layer: ConfigLayer = { alwaysAllow: [], alwaysDeny: ['/opt/dangerous/tool'], rules: [] };
      const config: WardenConfig = {
        ...structuredClone(DEFAULT_CONFIG),
        layers: [layer, DEFAULT_CONFIG.layers[0]],
      };
      expect(evaluate(parseCommand('/opt/dangerous/tool --flag'), config).decision).toBe('deny');
    });

    it('full-path in alwaysDeny does not block different path with same basename', () => {
      const layer: ConfigLayer = { alwaysAllow: [], alwaysDeny: ['/opt/dangerous/tool'], rules: [] };
      const config: WardenConfig = {
        ...structuredClone(DEFAULT_CONFIG),
        layers: [layer, DEFAULT_CONFIG.layers[0]],
      };
      // basename 'tool' is unknown, should fall through to default (ask)
      expect(evaluate(parseCommand('/safe/path/tool'), config).decision).toBe('ask');
    });

    it('full-path in rules matches only that exact path', () => {
      const layer: ConfigLayer = {
        alwaysAllow: [],
        alwaysDeny: [],
        rules: [{ command: '/home/user/bin/deploy.sh', default: 'allow' }],
      };
      const config: WardenConfig = {
        ...structuredClone(DEFAULT_CONFIG),
        layers: [layer, DEFAULT_CONFIG.layers[0]],
      };
      expect(evaluate(parseCommand('/home/user/bin/deploy.sh --env prod'), config).decision).toBe('allow');
      // Different path with same basename should not match the full-path rule
      expect(evaluate(parseCommand('/other/deploy.sh --env prod'), config).decision).toBe('ask');
    });

    it('/usr/bin/ls still matches basename ls in alwaysAllow (existing behavior)', () => {
      expect(eval_('/usr/bin/ls -la').decision).toBe('allow');
    });

    it('/usr/bin/node --version still matches basename node rule', () => {
      expect(eval_('/usr/bin/node --version').decision).toBe('allow');
    });

    it('basename rules still work unchanged', () => {
      expect(eval_('cat file.txt').decision).toBe('allow');
      expect(eval_('sudo rm -rf /').decision).toBe('deny');
    });

    it('mixed full-path and basename rules coexist', () => {
      const layer: ConfigLayer = {
        alwaysAllow: ['/home/user/bin/safe-tool'],
        alwaysDeny: ['/opt/dangerous/script'],
        rules: [],
      };
      const config: WardenConfig = {
        ...structuredClone(DEFAULT_CONFIG),
        layers: [layer, DEFAULT_CONFIG.layers[0]],
      };
      expect(evaluate(parseCommand('/home/user/bin/safe-tool'), config).decision).toBe('allow');
      expect(evaluate(parseCommand('/opt/dangerous/script'), config).decision).toBe('deny');
      // Basename commands still work from default layer
      expect(evaluate(parseCommand('cat file.txt'), config).decision).toBe('allow');
      expect(evaluate(parseCommand('sudo rm'), config).decision).toBe('deny');
    });

    it('tilde path in alwaysAllow expands to home directory', () => {
      const home = require('os').homedir();
      const layer: ConfigLayer = { alwaysAllow: ['~/bin/my-tool'], alwaysDeny: [], rules: [] };
      const config: WardenConfig = {
        ...structuredClone(DEFAULT_CONFIG),
        layers: [layer, DEFAULT_CONFIG.layers[0]],
      };
      expect(evaluate(parseCommand(`${home}/bin/my-tool arg1`), config).decision).toBe('allow');
    });
  });

  describe('recursion depth limit', () => {
    it('returns ask when recursion depth exceeded', () => {
      const parsed = parseCommand('echo hello');
      const result = evaluate(parsed, DEFAULT_CONFIG, 11);
      expect(result.decision).toBe('ask');
      expect(result.reason).toContain('recursion depth');
    });

    it('allows normal depth', () => {
      const parsed = parseCommand('echo hello');
      const result = evaluate(parsed, DEFAULT_CONFIG, 5);
      expect(result.decision).toBe('allow');
    });
  });

  describe('invalid regex patterns', () => {
    it('treats invalid regex as no-match', () => {
      const layer: ConfigLayer = {
        alwaysAllow: [],
        alwaysDeny: [],
        rules: [{
          command: 'test-cmd',
          default: 'allow',
          argPatterns: [
            { match: { argsMatch: ['[invalid'] }, decision: 'deny', reason: 'bad regex' },
          ],
        }],
      };
      const config: WardenConfig = {
        ...structuredClone(DEFAULT_CONFIG),
        layers: [layer, DEFAULT_CONFIG.layers[0]],
      };
      const result = evaluate(parseCommand('test-cmd foo'), config);
      expect(result.decision).toBe('allow');
    });

    it('treats invalid anyArgMatches regex as no-match', () => {
      const layer: ConfigLayer = {
        alwaysAllow: [],
        alwaysDeny: [],
        rules: [{
          command: 'test-cmd',
          default: 'allow',
          argPatterns: [
            { match: { anyArgMatches: ['(unterminated'] }, decision: 'deny', reason: 'bad regex' },
          ],
        }],
      };
      const config: WardenConfig = {
        ...structuredClone(DEFAULT_CONFIG),
        layers: [layer, DEFAULT_CONFIG.layers[0]],
      };
      const result = evaluate(parseCommand('test-cmd foo'), config);
      expect(result.decision).toBe('allow');
    });
  });

  describe('rsync/scp trusted host overrides', () => {
    it('allows scp to trusted host with allowAll', () => {
      const result = evalWith('scp file.txt user@myhost:/tmp/', {
        trustedSSHHosts: toTargets([{ name: 'myhost', allowAll: true }]),
      });
      expect(result.decision).toBe('allow');
    });

    it('allows rsync to trusted host without overrides', () => {
      const result = evalWith('rsync -av dir/ user@myhost:/tmp/', {
        trustedSSHHosts: toTargets(['myhost']),
      });
      expect(result.decision).toBe('allow');
    });

    it('denies scp when overrides block it', () => {
      const result = evalWith('scp file.txt user@myhost:/tmp/', {
        trustedSSHHosts: toTargets([{
          name: 'myhost',
          overrides: { alwaysAllow: [], alwaysDeny: ['scp'], rules: [] },
        }]),
      });
      expect(result.decision).toBe('deny');
    });
  });
});

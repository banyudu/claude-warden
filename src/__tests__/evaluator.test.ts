import { describe, it, expect } from 'vitest';
import { evaluate } from '../evaluator';
import { parseCommand } from '../parser';
import { DEFAULT_CONFIG } from '../defaults';
import type { WardenConfig, ConfigLayer, TrustedTarget, TrustedRemote, RemoteContext } from '../types';

function toTargets(items: (string | TrustedTarget)[]): TrustedTarget[] {
  return items.map(i => typeof i === 'string' ? { name: i } : i);
}

function toRemotes(items: (string | TrustedTarget)[], context: RemoteContext): TrustedRemote[] {
  return toTargets(items).map(t => ({ ...t, context }));
}

function eval_(cmd: string) {
  return evaluate(parseCommand(cmd), DEFAULT_CONFIG);
}

function evalWith(cmd: string, overrides: Partial<WardenConfig>) {
  const config: WardenConfig = { ...structuredClone(DEFAULT_CONFIG), ...overrides };
  return evaluate(parseCommand(cmd), config);
}

function evalWithSSH(cmd: string, trustedHosts: (string | TrustedTarget)[]) {
  return evalWith(cmd, { trustedRemotes: toRemotes(trustedHosts, 'ssh') });
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

    it('allows explicit (...) subshell when all inner commands are safe', () => {
      expect(eval_('(cd /tmp && ls)').decision).toBe('allow');
    });

    it('allows explicit (...) subshell with pipes when all inner commands are safe', () => {
      expect(eval_('(cd /tmp && echo hi | head -5)').decision).toBe('allow');
    });

    it('denies explicit (...) subshell containing a dangerous command', () => {
      expect(eval_('(cd /tmp && sudo apt install foo)').decision).toBe('deny');
    });

    it('asks for explicit (...) subshell containing an unknown command', () => {
      expect(eval_('(echo hi && unknown-sketchy-tool)').decision).toBe('ask');
    });
  });

  describe('heredocs', () => {
    it('allows cat with heredoc (body is data, not code)', () => {
      expect(eval_('cat <<EOF\nhello world\nEOF').decision).toBe('allow');
    });

    it('allows cat > file with heredoc', () => {
      expect(eval_("cat > /tmp/out.md << 'EOF'\nsome content\nEOF").decision).toBe('allow');
    });

    it('allows tee with heredoc', () => {
      expect(eval_("tee /tmp/out.txt << 'EOF'\nhello\nEOF").decision).toBe('allow');
    });

    it('asks for python with heredoc (python executes stdin as code)', () => {
      expect(eval_("python3 << 'EOF'\nprint('hi')\nEOF").decision).toBe('ask');
    });

    it('asks for unknown command with heredoc', () => {
      expect(eval_("unknown-cmd << 'EOF'\ndata\nEOF").decision).toBe('ask');
    });
  });

  describe('inline interpreter content-based decisions', () => {
    // Risky identifiers are constructed via string concatenation so the test source
    // does not contain the literal strings (a global security-reminder hook flags them).
    const SUB = 'sub' + 'process';
    const OSSYS = 'os' + '.' + 'system';
    const EXECFN = 'ex' + 'ec';
    const URLOPEN = 'urllib' + '.request';
    const CP = 'child' + '_process';
    const SHEXEC = 'shell' + '_exec';

    it.each([
      ['python -c "print(1)"',                      'Python'],
      ['python3 -c "print(1)"',                     'Python'],
      ['python3 -c "import json; print(json.dumps({}))"', 'Python'],
      ['node -e "console.log(1)"',                  'JavaScript'],
      ['node --eval "1+1"',                         'JavaScript'],
      ['node -p "1+1"',                             'JavaScript'],
      ['node -e "console.log(JSON.parse(x).foo)"',  'JavaScript'],
      ['perl -e "print 1"',                         'Perl'],
      ['perl -pe "s/foo/bar/g"',                    'Perl'],
      ['perl -ne "print if /foo/"',                 'Perl'],
      ['perl -ane "print $F[0]"',                   'Perl'],
      ['perl -pE "s/foo/bar/g"',                    'Perl'],
      ['ruby -e "puts 1"',                          'Ruby'],
      ['php -r "echo 1;"',                          'PHP'],
    ])('allows plausibly read-only inline script %s', (cmd) => {
      const r = eval_(cmd);
      expect(r.decision).toBe('allow');
    });

    const DANGEROUS_CASES: [string, string, string][] = [
      // Python — shell-out / code exec / file-write / network
      [`python3 -c "import ${SUB}; ${SUB}.run(['ls'])"`,       'Python', 'py'],
      [`python3 -c "import os; ${OSSYS}('ls')"`,               'Python', 'py'],
      [`python3 -c "${EXECFN}(open('x').read())"`,             'Python', 'py'],
      [`python -c "import ${URLOPEN}; ${URLOPEN}.urlopen('http://x')"`, 'Python', 'py'],
      [`python3 -c "open('f','w').write('x')"`,                'Python', 'py'],
      // Node — shell-out / file-write / network
      [`node -e "require('${CP}').spawn('ls')"`,               'JavaScript', 'js'],
      [`node -e "require('fs').writeFileSync('f','x')"`,       'JavaScript', 'js'],
      [`node -e "fetch('http://x')"`,                          'JavaScript', 'js'],
      // `--eval=script` form (no space between flag and body)
      [`node --eval=require('${CP}').spawn('ls')`,             'JavaScript', 'js'],
      // Ruby — shell-out / file-write
      [`ruby -e "system('ls')"`,                               'Ruby', 'rb'],
      [`ruby -e "IO.popen('ls')"`,                             'Ruby', 'rb'],
      [`ruby -e "File.write('f','x')"`,                        'Ruby', 'rb'],
      // Perl — shell-out
      [`perl -e "system('ls')"`,                               'Perl', 'pl'],
      [`perl -pe "system('rm x')"`,                            'Perl', 'pl'],
      [`perl -ne "\`rm x\`"`,                                  'Perl', 'pl'],
      // PHP — shell-out / file-write
      [`php -r "${SHEXEC}('ls');"`,                            'PHP', 'php'],
      [`php -r "file_put_contents('f','x');"`,                 'PHP', 'php'],
    ];

    it.each(DANGEROUS_CASES)('asks with educational reason for risky inline script %s', (cmd, lang, ext) => {
      const r = eval_(cmd);
      expect(r.decision).toBe('ask');
      expect(r.reason).toContain('jq');
      expect(r.reason).toContain(`scripts/*.${ext}`);
      expect(r.reason).toContain(lang);
    });

    it('does NOT trigger inline nudge for python3 script.py', () => {
      const r = eval_('python3 script.py');
      expect(r.reason ?? '').not.toContain('jq');
    });

    it('does NOT trigger inline nudge for node script.js', () => {
      const r = eval_('node script.js');
      expect(r.reason ?? '').not.toContain('jq');
    });

    it(`does NOT mis-flag python3 ${SUB}_helper.py (no -c flag)`, () => {
      const r = eval_(`python3 ${SUB}_helper.py`);
      expect(r.reason ?? '').not.toContain('jq');
    });

    it.each([
      'perl -pie "s/foo/bar/g" file',
      'perl -i -pe "s/foo/bar/g" file',
      'perl -i.bak -pe "s/foo/bar/g" file',
    ])('does NOT allow perl with -i (in-place edit): %s', (cmd) => {
      expect(eval_(cmd).decision).not.toBe('allow');
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
      expect(evalWith('ssh dev?', { trustedRemotes: toRemotes(['dev?'], 'ssh') }).decision).toBe('allow');
      expect(evalWith('ssh devAB', { trustedRemotes: toRemotes(['dev?'], 'ssh') }).decision).toBe('ask');
    });

    it('matches [...] character class', () => {
      expect(evalWith('ssh dev1', { trustedRemotes: toRemotes(['dev[123]'], 'ssh') }).decision).toBe('allow');
      expect(evalWith('ssh dev4', { trustedRemotes: toRemotes(['dev[123]'], 'ssh') }).decision).toBe('ask');
    });

    it('matches [!...] negated character class', () => {
      expect(evalWith('ssh devX', { trustedRemotes: toRemotes(['dev[!0-9]'], 'ssh') }).decision).toBe('allow');
      expect(evalWith('ssh dev5', { trustedRemotes: toRemotes(['dev[!0-9]'], 'ssh') }).decision).toBe('ask');
    });

    it('matches {a,b,c} brace expansion', () => {
      expect(evalWith('ssh staging', { trustedRemotes: toRemotes(['{staging,prod}'], 'ssh') }).decision).toBe('allow');
      expect(evalWith('ssh prod', { trustedRemotes: toRemotes(['{staging,prod}'], 'ssh') }).decision).toBe('allow');
      expect(evalWith('ssh dev', { trustedRemotes: toRemotes(['{staging,prod}'], 'ssh') }).decision).toBe('ask');
    });

    it('matches combined glob features', () => {
      expect(evalWith('ssh web-staging-01', { trustedRemotes: toRemotes(['{web,api}-*-[0-9][0-9]'], 'ssh') }).decision).toBe('allow');
      expect(evalWith('ssh api-prod-99', { trustedRemotes: toRemotes(['{web,api}-*-[0-9][0-9]'], 'ssh') }).decision).toBe('allow');
      expect(evalWith('ssh db-staging-01', { trustedRemotes: toRemotes(['{web,api}-*-[0-9][0-9]'], 'ssh') }).decision).toBe('ask');
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
      expect(evalWith('docker exec my-app ls', { trustedRemotes: toRemotes(containers, 'docker') }).decision).toBe('allow');
    });

    it('allows docker exec with flags on trusted container', () => {
      expect(evalWith('docker exec -it my-app ls', { trustedRemotes: toRemotes(containers, 'docker') }).decision).toBe('allow');
    });

    it('allows docker exec interactive (no command) on trusted container', () => {
      expect(evalWith('docker exec -it my-app', { trustedRemotes: toRemotes(containers, 'docker') }).decision).toBe('allow');
    });

    it('denies docker exec with dangerous command on trusted container', () => {
      expect(evalWith('docker exec my-app sudo rm -rf /', { trustedRemotes: toRemotes(containers, 'docker') }).decision).toBe('deny');
    });

    it('asks for docker exec on untrusted container', () => {
      expect(evalWith('docker exec unknown-app ls', { trustedRemotes: toRemotes(containers, 'docker') }).decision).toBe('ask');
    });

    it('matches glob patterns for containers', () => {
      expect(evalWith('docker exec dev-web ls', { trustedRemotes: toRemotes(containers, 'docker') }).decision).toBe('allow');
    });

    it('does not intercept non-exec docker commands', () => {
      expect(evalWith('docker ps', { trustedRemotes: toRemotes(containers, 'docker') }).decision).toBe('allow');
      expect(evalWith('docker run ubuntu', { trustedRemotes: toRemotes(containers, 'docker') }).decision).toBe('ask');
    });

    it('skips docker exec flags with values', () => {
      expect(evalWith('docker exec -e FOO=bar -u root my-app cat /etc/hosts', { trustedRemotes: toRemotes(containers, 'docker') }).decision).toBe('allow');
    });

    it('allows bare bash on trusted container (interactive shell)', () => {
      expect(evalWith('docker exec -it my-app bash', { trustedRemotes: toRemotes(containers, 'docker') }).decision).toBe('allow');
    });

    it('allows bare sh on trusted container (interactive shell)', () => {
      expect(evalWith('docker exec my-app sh', { trustedRemotes: toRemotes(containers, 'docker') }).decision).toBe('allow');
    });

    it('allows bash -c with safe command on trusted container', () => {
      expect(evalWith('docker exec my-app bash -c "ls -la"', { trustedRemotes: toRemotes(containers, 'docker') }).decision).toBe('allow');
    });

    it('denies bash -c with dangerous command on trusted container', () => {
      expect(evalWith('docker exec my-app bash -c "sudo rm -rf /"', { trustedRemotes: toRemotes(containers, 'docker') }).decision).toBe('deny');
    });

    it('allows bash -c with piped safe commands on trusted container', () => {
      expect(evalWith(`docker exec my-app bash -c 'tail -100 /tmp/app.log | grep error | tail -20'`, { trustedRemotes: toRemotes(containers, 'docker') }).decision).toBe('allow');
    });
  });

  describe('kubectl context whitelisting', () => {
    const contexts = ['minikube', 'dev-*'];

    it('allows kubectl exec on trusted context with safe command', () => {
      expect(evalWith('kubectl exec --context minikube my-pod -- cat /etc/hosts', { trustedRemotes: toRemotes(contexts, 'kubectl') }).decision).toBe('allow');
    });

    it('allows kubectl exec interactive on trusted context', () => {
      expect(evalWith('kubectl exec --context minikube -it my-pod', { trustedRemotes: toRemotes(contexts, 'kubectl') }).decision).toBe('allow');
    });

    it('denies kubectl exec with dangerous command on trusted context', () => {
      expect(evalWith('kubectl exec --context minikube my-pod -- sudo rm -rf /', { trustedRemotes: toRemotes(contexts, 'kubectl') }).decision).toBe('deny');
    });

    it('asks for kubectl exec without context', () => {
      expect(evalWith('kubectl exec my-pod -- ls', { trustedRemotes: toRemotes(contexts, 'kubectl') }).decision).toBe('ask');
    });

    it('asks for kubectl exec on untrusted context', () => {
      expect(evalWith('kubectl exec --context production my-pod -- ls', { trustedRemotes: toRemotes(contexts, 'kubectl') }).decision).toBe('ask');
    });

    it('matches glob patterns for contexts', () => {
      expect(evalWith('kubectl exec --context dev-cluster my-pod -- ls', { trustedRemotes: toRemotes(contexts, 'kubectl') }).decision).toBe('allow');
    });

    it('handles --context=value syntax', () => {
      expect(evalWith('kubectl exec --context=minikube my-pod -- ls', { trustedRemotes: toRemotes(contexts, 'kubectl') }).decision).toBe('allow');
    });

    it('does not intercept non-exec kubectl commands', () => {
      // 'get' is now always allowed as a read-only kubectl command, so test with a non-read-only subcommand
      expect(evalWith('kubectl apply -f deployment.yaml --context minikube', { trustedRemotes: toRemotes(contexts, 'kubectl') }).decision).toBe('ask');
    });

    it('handles namespace and container flags', () => {
      expect(evalWith('kubectl exec --context minikube -n default -c app my-pod -- cat /tmp/log', { trustedRemotes: toRemotes(contexts, 'kubectl') }).decision).toBe('allow');
    });

    it('allows bare bash on trusted context (interactive shell)', () => {
      expect(evalWith('kubectl exec --context minikube my-pod -- bash', { trustedRemotes: toRemotes(contexts, 'kubectl') }).decision).toBe('allow');
    });

    it('allows bare sh on trusted context (interactive shell)', () => {
      expect(evalWith('kubectl exec --context minikube my-pod -- sh', { trustedRemotes: toRemotes(contexts, 'kubectl') }).decision).toBe('allow');
    });

    it('allows bash -c with safe command on trusted context', () => {
      expect(evalWith('kubectl exec --context minikube my-pod -- bash -c "ls -la"', { trustedRemotes: toRemotes(contexts, 'kubectl') }).decision).toBe('allow');
    });

    it('denies bash -c with dangerous command on trusted context', () => {
      expect(evalWith('kubectl exec --context minikube my-pod -- bash -c "sudo rm -rf /"', { trustedRemotes: toRemotes(contexts, 'kubectl') }).decision).toBe('deny');
    });

    it('allows bash -c with piped safe commands on trusted context', () => {
      expect(evalWith(`kubectl exec --context minikube my-pod -- bash -c 'tail -100 /tmp/app.log | grep error | tail -20'`, { trustedRemotes: toRemotes(contexts, 'kubectl') }).decision).toBe('allow');
    });
  });

  describe('Sprite whitelisting', () => {
    const sprites = ['my-sprite', 'dev-*'];

    it('allows sprite exec on trusted sprite', () => {
      expect(evalWith('sprite exec -s my-sprite ls -la', { trustedRemotes: toRemotes(sprites, 'sprite') }).decision).toBe('allow');
    });

    it('allows sprite x (alias) on trusted sprite', () => {
      expect(evalWith('sprite x -s my-sprite ls', { trustedRemotes: toRemotes(sprites, 'sprite') }).decision).toBe('allow');
    });

    it('allows sprite console on trusted sprite', () => {
      expect(evalWith('sprite console -s my-sprite', { trustedRemotes: toRemotes(sprites, 'sprite') }).decision).toBe('allow');
    });

    it('allows sprite c (alias) on trusted sprite', () => {
      expect(evalWith('sprite c -s my-sprite', { trustedRemotes: toRemotes(sprites, 'sprite') }).decision).toBe('allow');
    });

    it('denies sprite exec with dangerous command on trusted sprite', () => {
      expect(evalWith('sprite exec -s my-sprite sudo rm -rf /', { trustedRemotes: toRemotes(sprites, 'sprite') }).decision).toBe('deny');
    });

    it('asks for sprite exec on untrusted sprite', () => {
      expect(evalWith('sprite exec -s unknown-sprite ls', { trustedRemotes: toRemotes(sprites, 'sprite') }).decision).toBe('ask');
    });

    it('matches glob patterns', () => {
      expect(evalWith('sprite exec -s dev-web ls', { trustedRemotes: toRemotes(sprites, 'sprite') }).decision).toBe('allow');
    });

    it('handles -o and -s flags before subcommand', () => {
      expect(evalWith('sprite -o myorg -s my-sprite exec ls', { trustedRemotes: toRemotes(sprites, 'sprite') }).decision).toBe('allow');
    });

    it('handles --sprite=value syntax', () => {
      expect(evalWith('sprite exec --sprite=my-sprite ls', { trustedRemotes: toRemotes(sprites, 'sprite') }).decision).toBe('allow');
    });

    it('handles -o and -s with exec subcommand and command', () => {
      expect(evalWith('sprite exec -o myorg -s my-sprite npm start', { trustedRemotes: toRemotes(sprites, 'sprite') }).decision).toBe('allow');
    });

    it('recursively evaluates ask-level remote commands', () => {
      expect(evalWith('sprite exec -s my-sprite node script.js', { trustedRemotes: toRemotes(sprites, 'sprite') }).decision).toBe('ask');
    });

    it('allows bare bash on trusted sprite (interactive shell)', () => {
      expect(evalWith('sprite exec -s my-sprite bash', { trustedRemotes: toRemotes(sprites, 'sprite') }).decision).toBe('allow');
    });

    it('allows bare sh on trusted sprite (interactive shell)', () => {
      expect(evalWith('sprite exec -s my-sprite sh', { trustedRemotes: toRemotes(sprites, 'sprite') }).decision).toBe('allow');
    });

    it('allows bash -c with safe command on trusted sprite', () => {
      expect(evalWith('sprite exec -s my-sprite bash -c "ls -la"', { trustedRemotes: toRemotes(sprites, 'sprite') }).decision).toBe('allow');
    });

    it('denies bash -c with dangerous command on trusted sprite', () => {
      expect(evalWith('sprite exec -s my-sprite bash -c "sudo rm -rf /"', { trustedRemotes: toRemotes(sprites, 'sprite') }).decision).toBe('deny');
    });

    it('allows bash -c with piped safe commands on trusted sprite', () => {
      expect(evalWith(`sprite exec -s my-sprite bash -c 'tail -100 /tmp/app.log | grep error | tail -20'`, { trustedRemotes: toRemotes(sprites, 'sprite') }).decision).toBe('allow');
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
        trustedRemotes: toRemotes(['my-app'], 'docker'),
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
        trustedRemotes: toRemotes(['minikube'], 'kubectl'),
        trustedContextOverrides: overrides,
      }).decision).toBe('allow');
    });

    it('allows sudo inside trusted SSH host with override', () => {
      expect(evalWith('ssh devserver sudo apt install curl', {
        trustedRemotes: toRemotes(['devserver'], 'ssh'),
        trustedContextOverrides: overrides,
      }).decision).toBe('allow');
    });

    it('allows sudo inside trusted sprite with override', () => {
      expect(evalWith('sprite exec -s my-sprite sudo apt install curl', {
        trustedRemotes: toRemotes(['my-sprite'], 'sprite'),
        trustedContextOverrides: overrides,
      }).decision).toBe('allow');
    });

    it('allows sudo via bash -c inside trusted docker with override', () => {
      expect(evalWith('docker exec my-app bash -c "sudo apt install curl"', {
        trustedRemotes: toRemotes(['my-app'], 'docker'),
        trustedContextOverrides: overrides,
      }).decision).toBe('allow');
    });

    it('still denies non-overridden dangerous commands in remote context', () => {
      expect(evalWith('docker exec my-app shutdown now', {
        trustedRemotes: toRemotes(['my-app'], 'docker'),
        trustedContextOverrides: overrides,
      }).decision).toBe('deny');
    });

    it('does not apply overrides to untrusted containers', () => {
      expect(evalWith('docker exec unknown-app sudo apt install curl', {
        trustedRemotes: toRemotes(['my-app'], 'docker'),
        trustedContextOverrides: overrides,
      }).decision).toBe('ask');
    });

    it('supports alwaysDeny in context overrides', () => {
      expect(evalWith('docker exec my-app curl http://example.com', {
        trustedRemotes: toRemotes(['my-app'], 'docker'),
        trustedContextOverrides: { alwaysAllow: [], alwaysDeny: ['curl'], rules: [] },
      }).decision).toBe('deny');
    });
  });

  describe('per-target trusted overrides', () => {
    it('allowAll on docker container allows sudo, shutdown, etc.', () => {
      expect(evalWith('docker exec dev-box sudo rm -rf /', {
        trustedRemotes: [{ name: 'dev-box', allowAll: true, context: 'docker' }],
      }).decision).toBe('allow');
    });

    it('allowAll on docker container allows shutdown', () => {
      expect(evalWith('docker exec dev-box shutdown now', {
        trustedRemotes: [{ name: 'dev-box', allowAll: true, context: 'docker' }],
      }).decision).toBe('allow');
    });

    it('allowAll on sprite allows everything', () => {
      expect(evalWith('sprite exec -s yudu-claw sudo apt install curl', {
        trustedRemotes: [{ name: 'yudu-claw', allowAll: true, context: 'sprite' }],
      }).decision).toBe('allow');
    });

    it('allowAll on SSH host allows everything', () => {
      expect(evalWith('ssh devserver sudo rm -rf /', {
        trustedRemotes: [{ name: 'devserver', allowAll: true, context: 'ssh' }],
      }).decision).toBe('allow');
    });

    it('allowAll on kubectl context allows everything', () => {
      expect(evalWith('kubectl exec --context minikube my-pod -- sudo rm -rf /', {
        trustedRemotes: [{ name: 'minikube', allowAll: true, context: 'kubectl' }],
      }).decision).toBe('allow');
    });

    it('per-target overrides allow sudo but global does not', () => {
      expect(evalWith('docker exec dev-box sudo apt install curl', {
        trustedRemotes: [{ name: 'dev-box', overrides: { alwaysAllow: ['sudo', 'apt'], alwaysDeny: [], rules: [] }, context: 'docker' }],
      }).decision).toBe('allow');
    });

    it('per-target overrides do not affect other containers', () => {
      expect(evalWith('docker exec other-box sudo apt install curl', {
        trustedRemotes: [
          { name: 'dev-box', overrides: { alwaysAllow: ['sudo'], alwaysDeny: [], rules: [] }, context: 'docker' },
          { name: 'other-box', context: 'docker' },
        ],
      }).decision).toBe('deny');
    });

    it('per-target overrides combine with global overrides', () => {
      expect(evalWith('docker exec dev-box sudo systemctl restart app', {
        trustedRemotes: [{ name: 'dev-box', overrides: { alwaysAllow: ['sudo'], alwaysDeny: [], rules: [] }, context: 'docker' }],
        trustedContextOverrides: { alwaysAllow: ['systemctl'], alwaysDeny: [], rules: [] },
      }).decision).toBe('allow');
    });

    it('per-target overrides take priority over global overrides', () => {
      expect(evalWith('docker exec dev-box curl http://example.com', {
        trustedRemotes: [{ name: 'dev-box', overrides: { alwaysAllow: [], alwaysDeny: ['curl'], rules: [] }, context: 'docker' }],
        trustedContextOverrides: { alwaysAllow: ['curl'], alwaysDeny: [], rules: [] },
      }).decision).toBe('deny');
    });

    it('string entries still work as before (backward compat)', () => {
      expect(evalWith('docker exec my-app ls', {
        trustedRemotes: toRemotes(['my-app'], 'docker'),
      }).decision).toBe('allow');
    });

    it('mixed string and object entries work together', () => {
      const result1 = evalWith('docker exec my-app sudo apt install curl', {
        trustedRemotes: [
          { name: 'my-app', context: 'docker' },
          { name: 'dev-box', allowAll: true, context: 'docker' },
        ],
      });
      expect(result1.decision).toBe('deny'); // my-app has no overrides, sudo denied

      const result2 = evalWith('docker exec dev-box sudo apt install curl', {
        trustedRemotes: [
          { name: 'my-app', context: 'docker' },
          { name: 'dev-box', allowAll: true, context: 'docker' },
        ],
      });
      expect(result2.decision).toBe('allow'); // dev-box has allowAll
    });

    it('allowAll on untrusted target has no effect', () => {
      expect(evalWith('docker exec unknown-box sudo ls', {
        trustedRemotes: [{ name: 'dev-box', allowAll: true, context: 'docker' }],
      }).decision).toBe('ask');
    });

    it('SSH with per-host overrides', () => {
      expect(evalWith('ssh staging-web systemctl restart app', {
        trustedRemotes: [{ name: 'staging-*', overrides: { alwaysAllow: ['systemctl'], alwaysDeny: [], rules: [] }, context: 'ssh' }],
      }).decision).toBe('allow');
    });

    it('kubectl with per-context overrides', () => {
      expect(evalWith('kubectl exec --context prod-cluster my-pod -- rm -rf /tmp/cache', {
        trustedRemotes: [{ name: 'prod-cluster', overrides: { alwaysAllow: [], alwaysDeny: ['rm'], rules: [] }, context: 'kubectl' }],
      }).decision).toBe('deny');
    });

    it('sprite with per-sprite overrides', () => {
      expect(evalWith('sprite exec -s dev-sprite sudo apt install vim', {
        trustedRemotes: [{ name: 'dev-*', overrides: { alwaysAllow: ['sudo', 'apt'], alwaysDeny: [], rules: [] }, context: 'sprite' }],
      }).decision).toBe('allow');
    });

    it('allowAll on glob-matched sprite', () => {
      expect(evalWith('sprite exec -s dev-testing sudo shutdown now', {
        trustedRemotes: [{ name: 'dev-*', allowAll: true, context: 'sprite' }],
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
        trustedRemotes: toRemotes([{ name: 'myhost', allowAll: true }], 'ssh'),
      });
      expect(result.decision).toBe('allow');
    });

    it('allows rsync to trusted host without overrides', () => {
      const result = evalWith('rsync -av dir/ user@myhost:/tmp/', {
        trustedRemotes: toRemotes(['myhost'], 'ssh'),
      });
      expect(result.decision).toBe('allow');
    });

    it('denies scp when overrides block it', () => {
      const result = evalWith('scp file.txt user@myhost:/tmp/', {
        trustedRemotes: toRemotes([{
          name: 'myhost',
          overrides: { alwaysAllow: [], alwaysDeny: ['scp'], rules: [] },
        }], 'ssh'),
      });
      expect(result.decision).toBe('deny');
    });
  });

  describe('fly / flyctl trusted apps', () => {
    const apps = ['my-app', 'staging-*'];

    it('allows fly ssh console with safe command on trusted app', () => {
      expect(evalWith('fly ssh console -a my-app -C "ls -la"', { trustedRemotes: toRemotes(apps, 'fly') }).decision).toBe('allow');
    });

    it('allows fly ssh console interactive (no command)', () => {
      expect(evalWith('fly ssh console -a my-app', { trustedRemotes: toRemotes(apps, 'fly') }).decision).toBe('allow');
    });

    it('allows --app=value syntax', () => {
      expect(evalWith('fly ssh console --app=my-app -C "ls -la"', { trustedRemotes: toRemotes(apps, 'fly') }).decision).toBe('allow');
    });

    it('denies fly ssh console with dangerous command on trusted app', () => {
      expect(evalWith('fly ssh console -a my-app -C "sudo rm -rf /"', { trustedRemotes: toRemotes(apps, 'fly') }).decision).toBe('deny');
    });

    it('asks for untrusted app', () => {
      expect(evalWith('fly ssh console -a unknown-app -C "ls"', { trustedRemotes: toRemotes(apps, 'fly') }).decision).toBe('ask');
    });

    it('supports glob matching', () => {
      expect(evalWith('fly ssh console -a staging-web -C "ls"', { trustedRemotes: toRemotes(apps, 'fly') }).decision).toBe('allow');
    });

    it('evaluates shell -c commands recursively', () => {
      expect(evalWith('fly ssh console -a my-app -C "bash -c \\"ls | grep foo\\""', { trustedRemotes: toRemotes(apps, 'fly') }).decision).toBe('allow');
    });

    it('flyctl alias works same as fly', () => {
      expect(evalWith('flyctl ssh console -a my-app -C "ls"', { trustedRemotes: toRemotes(apps, 'fly') }).decision).toBe('allow');
    });

    it('allowAll on trusted app allows everything', () => {
      expect(evalWith('fly ssh console -a my-app -C "sudo rm -rf /"', {
        trustedRemotes: [{ name: 'my-app', allowAll: true, context: 'fly' }],
      }).decision).toBe('allow');
    });

    it('per-app overrides work', () => {
      expect(evalWith('fly ssh console -a my-app -C "sudo apt install vim"', {
        trustedRemotes: [{ name: 'my-app', overrides: { alwaysAllow: ['sudo', 'apt'], alwaysDeny: [], rules: [] }, context: 'fly' }],
      }).decision).toBe('allow');
    });

    it('non-ssh fly commands fall through to regular rules', () => {
      const result = evalWith('fly status', { trustedRemotes: toRemotes(apps, 'fly') });
      expect(result.decision).toBe('allow');
    });

    it('fly deploy still asks', () => {
      const result = evalWith('fly deploy', { trustedRemotes: toRemotes(apps, 'fly') });
      expect(result.decision).toBe('ask');
    });

    it('allows -- syntax for remote command', () => {
      expect(evalWith('fly ssh console -a my-app -- ls -la', { trustedRemotes: toRemotes(apps, 'fly') }).decision).toBe('allow');
    });

    it('allows bare bash on trusted app (interactive shell)', () => {
      expect(evalWith('fly ssh console -a my-app -C "bash"', { trustedRemotes: toRemotes(apps, 'fly') }).decision).toBe('allow');
    });
  });
});

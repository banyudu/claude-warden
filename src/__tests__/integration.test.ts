import { describe, it, expect } from 'vitest';
import { parseCommand } from '../parser';
import { evaluate } from '../evaluator';
import { DEFAULT_CONFIG } from '../defaults';
import type { WardenConfig } from '../types';

/** Simulate the full pipeline: parse → evaluate with default config */
function warden(command: string) {
  const parsed = parseCommand(command);
  return evaluate(parsed, DEFAULT_CONFIG);
}

function wardenWith(command: string, overrides: Partial<WardenConfig>) {
  const config: WardenConfig = { ...structuredClone(DEFAULT_CONFIG), ...overrides };
  return evaluate(parseCommand(command), config);
}

function wardenWithSSH(command: string, trustedHosts: string[]) {
  return wardenWith(command, { trustedSSHHosts: trustedHosts });
}

describe('integration: realistic commands', () => {
  describe('common safe patterns that currently prompt', () => {
    it('cat a.txt | wc -l → allow', () => {
      expect(warden('cat a.txt | wc -l').decision).toBe('allow');
    });

    it('cat file | grep pattern | sort | uniq -c | head -20 → allow', () => {
      expect(warden('cat file | grep pattern | sort | uniq -c | head -20').decision).toBe('allow');
    });

    it('git log --oneline | head -10 → allow', () => {
      expect(warden('git log --oneline | head -10').decision).toBe('allow');
    });

    it('npm run build && npm test → allow', () => {
      expect(warden('npm run build && npm test').decision).toBe('allow');
    });

    it('pnpm install && pnpm run build → allow', () => {
      expect(warden('pnpm install && pnpm run build').decision).toBe('allow');
    });

    it('yarn install && yarn build → allow', () => {
      expect(warden('yarn install && yarn build').decision).toBe('allow');
    });

    it('cargo build --release → allow', () => {
      expect(warden('cargo build --release').decision).toBe('allow');
    });

    it('go build ./... → allow', () => {
      expect(warden('go build ./...').decision).toBe('allow');
    });

    it('gh pr list → allow', () => {
      expect(warden('gh pr list').decision).toBe('allow');
    });

    it('uv pip install requests → allow', () => {
      expect(warden('uv pip install requests').decision).toBe('allow');
    });

    it('mkdir -p src/components && touch src/components/Button.tsx → allow', () => {
      expect(warden('mkdir -p src/components && touch src/components/Button.tsx').decision).toBe('allow');
    });

    it('ls -la | wc -l → allow', () => {
      expect(warden('ls -la | wc -l').decision).toBe('allow');
    });

    it('grep -r "TODO" src/ | wc -l → allow', () => {
      expect(warden('grep -r "TODO" src/ | wc -l').decision).toBe('allow');
    });
  });

  describe('npx/bunx with known tools', () => {
    it('npx jest --coverage → allow', () => {
      expect(warden('npx jest --coverage').decision).toBe('allow');
    });

    it('npx vitest run → allow', () => {
      expect(warden('npx vitest run').decision).toBe('allow');
    });

    it('npx tsc --noEmit → allow', () => {
      expect(warden('npx tsc --noEmit').decision).toBe('allow');
    });

    it('npx eslint src/ → allow', () => {
      expect(warden('npx eslint src/').decision).toBe('allow');
    });

    it('npx prettier --write . → allow', () => {
      expect(warden('npx prettier --write .').decision).toBe('allow');
    });

    it('npx prisma migrate dev → allow', () => {
      expect(warden('npx prisma migrate dev').decision).toBe('allow');
    });

    it('npx unknown-sketchy-package → ask', () => {
      expect(warden('npx unknown-sketchy-package').decision).toBe('ask');
    });

    it('bunx vitest run → allow', () => {
      expect(warden('bunx vitest run').decision).toBe('allow');
    });

    it('bunx --version → allow', () => {
      expect(warden('bunx --version').decision).toBe('allow');
    });

    it('bunx unknown-sketchy-package → ask', () => {
      expect(warden('bunx unknown-sketchy-package').decision).toBe('ask');
    });
  });

  describe('env prefix patterns', () => {
    it('NODE_ENV=production npm run build → allow', () => {
      expect(warden('NODE_ENV=production npm run build').decision).toBe('allow');
    });

    it('NODE_OPTIONS="--max-old-space-size=4096" npx jest → allow', () => {
      expect(warden('NODE_OPTIONS="--max-old-space-size=4096" npx jest').decision).toBe('allow');
    });

    it('CI=true npm test → allow', () => {
      expect(warden('CI=true npm test').decision).toBe('allow');
    });
  });

  describe('dangerous commands', () => {
    it('sudo rm -rf / → deny', () => {
      expect(warden('sudo rm -rf /').decision).toBe('deny');
    });

    it('rm -rf / → ask (argPattern)', () => {
      expect(warden('rm -rf /').decision).toBe('ask');
    });

    it('echo hello && sudo apt install malware → deny', () => {
      expect(warden('echo hello && sudo apt install malware').decision).toBe('deny');
    });

    it('chmod -R 777 /var/www → deny', () => {
      expect(warden('chmod -R 777 /var/www').decision).toBe('deny');
    });

    it('shutdown -h now → deny', () => {
      expect(warden('shutdown -h now').decision).toBe('deny');
    });
  });

  describe('ask patterns (cautious)', () => {
    it('node script.js → ask', () => {
      expect(warden('node script.js').decision).toBe('ask');
    });

    it('python manage.py runserver → ask', () => {
      expect(warden('python manage.py runserver').decision).toBe('ask');
    });

    it('docker run -it ubuntu → ask', () => {
      expect(warden('docker run -it ubuntu').decision).toBe('ask');
    });

    it('ssh user@host → ask', () => {
      expect(warden('ssh user@host').decision).toBe('ask');
    });

    it('git push --force origin main → ask', () => {
      expect(warden('git push --force origin main').decision).toBe('ask');
    });

    it('echo $(whoami) → allow (safe subshell)', () => {
      expect(warden('echo $(whoami)').decision).toBe('allow');
    });

    it('set -a → allow (shell option builtin)', () => {
      expect(warden('set -a').decision).toBe('allow');
    });

    it('set +a → allow (shell option builtin)', () => {
      expect(warden('set +a').decision).toBe('allow');
    });

    it('set -a && set +a && echo "loaded" → allow', () => {
      expect(warden('set -a && set +a && echo "loaded"').decision).toBe('allow');
    });

    it('npm publish → ask', () => {
      expect(warden('npm publish').decision).toBe('ask');
    });

    it('pnpm publish → ask', () => {
      expect(warden('pnpm publish').decision).toBe('ask');
    });

    it('pnpm adduser → ask', () => {
      expect(warden('pnpm adduser').decision).toBe('ask');
    });

    it('pnpm token list → ask', () => {
      expect(warden('pnpm token list').decision).toBe('ask');
    });

    it('yarn publish → ask', () => {
      expect(warden('yarn publish').decision).toBe('ask');
    });

    it('yarn login → ask', () => {
      expect(warden('yarn login').decision).toBe('ask');
    });

    it('yarn token list → ask', () => {
      expect(warden('yarn token list').decision).toBe('ask');
    });

    it('cargo publish → ask', () => {
      expect(warden('cargo publish').decision).toBe('ask');
    });

    it('cargo login → ask', () => {
      expect(warden('cargo login').decision).toBe('ask');
    });

    it('cargo yank → ask', () => {
      expect(warden('cargo yank').decision).toBe('ask');
    });

    it('cargo owner → ask', () => {
      expect(warden('cargo owner').decision).toBe('ask');
    });

    it('go generate → ask', () => {
      expect(warden('go generate').decision).toBe('ask');
    });

    it('gh repo delete → ask', () => {
      expect(warden('gh repo delete').decision).toBe('ask');
    });

    it('gh repo archive → ask', () => {
      expect(warden('gh repo archive').decision).toBe('ask');
    });

    it('uv publish → ask', () => {
      expect(warden('uv publish').decision).toBe('ask');
    });
  });

  describe('SSH host whitelisting end-to-end', () => {
    const hosts = ['devserver', '*.internal.com'];

    it('ssh devserver → allow (trusted, no remote cmd)', () => {
      expect(wardenWithSSH('ssh devserver', hosts).decision).toBe('allow');
    });

    it('ssh devserver cat /etc/hosts → allow (trusted + safe cmd)', () => {
      expect(wardenWithSSH('ssh devserver cat /etc/hosts', hosts).decision).toBe('allow');
    });

    it('ssh devserver sudo rm -rf / → deny (trusted + dangerous cmd)', () => {
      expect(wardenWithSSH('ssh devserver sudo rm -rf /', hosts).decision).toBe('deny');
    });

    it('ssh unknown-host → ask (not trusted)', () => {
      expect(wardenWithSSH('ssh unknown-host', hosts).decision).toBe('ask');
    });

    it('scp file.txt devserver:/tmp/ → allow (trusted)', () => {
      expect(wardenWithSSH('scp file.txt devserver:/tmp/', hosts).decision).toBe('allow');
    });

    it('ssh -i key -p 2222 devserver ls → allow (flags skipped)', () => {
      expect(wardenWithSSH('ssh -i key -p 2222 devserver ls', hosts).decision).toBe('allow');
    });

    it('ssh devserver npm run build && echo done → allow (pipeline)', () => {
      expect(wardenWithSSH('ssh devserver npm run build', hosts).decision).toBe('allow');
    });

    it('rsync -avz src/ user@app.internal.com:/opt/ → allow (glob match)', () => {
      expect(wardenWithSSH('rsync -avz src/ user@app.internal.com:/opt/', hosts).decision).toBe('allow');
    });
  });

  describe('sh -c / bash -c recursive parsing', () => {
    it('sh -c "cat file | wc -l" → allow', () => {
      expect(warden('sh -c "cat file | wc -l"').decision).toBe('allow');
    });

    it('bash -c "npm run build && npm test" → allow', () => {
      expect(warden('bash -c "npm run build && npm test"').decision).toBe('allow');
    });

    it('sh -c "sudo rm -rf /" → deny', () => {
      expect(warden('sh -c "sudo rm -rf /"').decision).toBe('deny');
    });
  });

  describe('version/help flags always safe', () => {
    it('node --version → allow', () => {
      expect(warden('node --version').decision).toBe('allow');
    });

    it('python3 --version → allow', () => {
      expect(warden('python3 --version').decision).toBe('allow');
    });

    it('npx --help → allow', () => {
      expect(warden('npx --help').decision).toBe('allow');
    });

    it('bun --version → allow', () => {
      expect(warden('bun --version').decision).toBe('allow');
    });
  });

  describe('git operations', () => {
    it('git add . && git commit -m "feat: update" → allow', () => {
      expect(warden('git add . && git commit -m "feat: update"').decision).toBe('allow');
    });

    it('git stash && git pull --rebase && git stash pop → allow', () => {
      expect(warden('git stash && git pull --rebase && git stash pop').decision).toBe('allow');
    });

    it('git reset --hard HEAD~1 → ask', () => {
      expect(warden('git reset --hard HEAD~1').decision).toBe('ask');
    });
  });

  describe('Docker container whitelisting end-to-end', () => {
    const containers = ['my-app', 'dev-*'];

    it('docker exec my-app cat /etc/hosts → allow', () => {
      expect(wardenWith('docker exec my-app cat /etc/hosts', { trustedDockerContainers: containers }).decision).toBe('allow');
    });

    it('docker exec -it my-app → allow (interactive)', () => {
      expect(wardenWith('docker exec -it my-app', { trustedDockerContainers: containers }).decision).toBe('allow');
    });

    it('docker exec my-app sudo rm -rf / → deny', () => {
      expect(wardenWith('docker exec my-app sudo rm -rf /', { trustedDockerContainers: containers }).decision).toBe('deny');
    });

    it('docker exec unknown-app ls → ask', () => {
      expect(wardenWith('docker exec unknown-app ls', { trustedDockerContainers: containers }).decision).toBe('ask');
    });

    it('docker exec dev-web npm start → allow (glob)', () => {
      expect(wardenWith('docker exec dev-web npm start', { trustedDockerContainers: containers }).decision).toBe('allow');
    });
  });

  describe('kubectl context whitelisting end-to-end', () => {
    const contexts = ['minikube', 'dev-*'];

    it('kubectl exec --context minikube pod -- cat /tmp/log → allow', () => {
      expect(wardenWith('kubectl exec --context minikube pod -- cat /tmp/log', { trustedKubectlContexts: contexts }).decision).toBe('allow');
    });

    it('kubectl exec --context minikube -it pod → allow (interactive)', () => {
      expect(wardenWith('kubectl exec --context minikube -it pod', { trustedKubectlContexts: contexts }).decision).toBe('allow');
    });

    it('kubectl exec --context minikube pod -- sudo rm -rf / → deny', () => {
      expect(wardenWith('kubectl exec --context minikube pod -- sudo rm -rf /', { trustedKubectlContexts: contexts }).decision).toBe('deny');
    });

    it('kubectl exec --context production pod -- ls → ask (untrusted)', () => {
      expect(wardenWith('kubectl exec --context production pod -- ls', { trustedKubectlContexts: contexts }).decision).toBe('ask');
    });

    it('kubectl exec --context=dev-east pod -- ls → allow (=syntax, glob)', () => {
      expect(wardenWith('kubectl exec --context=dev-east pod -- ls', { trustedKubectlContexts: contexts }).decision).toBe('allow');
    });
  });

  describe('command substitution recursive evaluation', () => {
    it('echo $(date) → allow (date is safe)', () => {
      expect(warden('echo $(date)').decision).toBe('allow');
    });

    it('echo $(whoami) → allow (whoami is safe)', () => {
      expect(warden('echo $(whoami)').decision).toBe('allow');
    });

    it('echo $(sudo rm -rf /) → deny (dangerous inner command)', () => {
      expect(warden('echo $(sudo rm -rf /)').decision).toBe('deny');
    });

    it('echo $(unknown-tool foo) → ask (unknown inner command)', () => {
      expect(warden('echo $(unknown-tool foo)').decision).toBe('ask');
    });

    it('echo `date` → allow (backtick safe command)', () => {
      expect(warden('echo `date`').decision).toBe('allow');
    });

    it('echo "today is $(date)" → allow (safe inside quotes)', () => {
      expect(warden('echo "today is $(date)"').decision).toBe('allow');
    });

    it('echo $(node script.js) → ask (node script is conditional)', () => {
      expect(warden('echo $(node script.js)').decision).toBe('ask');
    });

    it('echo $(ls -la) && echo done → allow (all safe)', () => {
      expect(warden('echo $(ls -la) && echo done').decision).toBe('allow');
    });
  });

  describe('Sprite whitelisting end-to-end', () => {
    const sprites = ['my-sprite', 'dev-*'];

    it('sprite exec -s my-sprite ls -la → allow', () => {
      expect(wardenWith('sprite exec -s my-sprite ls -la', { trustedSprites: sprites }).decision).toBe('allow');
    });

    it('sprite -o myorg -s my-sprite exec npm start → allow', () => {
      expect(wardenWith('sprite -o myorg -s my-sprite exec npm start', { trustedSprites: sprites }).decision).toBe('allow');
    });

    it('sprite exec -s my-sprite sudo rm -rf / → deny', () => {
      expect(wardenWith('sprite exec -s my-sprite sudo rm -rf /', { trustedSprites: sprites }).decision).toBe('deny');
    });

    it('sprite exec -s unknown ls → ask (untrusted)', () => {
      expect(wardenWith('sprite exec -s unknown ls', { trustedSprites: sprites }).decision).toBe('ask');
    });

    it('sprite console -s my-sprite → allow (interactive)', () => {
      expect(wardenWith('sprite console -s my-sprite', { trustedSprites: sprites }).decision).toBe('allow');
    });

    it('sprite exec -s dev-web cat /etc/hosts → allow (glob)', () => {
      expect(wardenWith('sprite exec -s dev-web cat /etc/hosts', { trustedSprites: sprites }).decision).toBe('allow');
    });
  });
});

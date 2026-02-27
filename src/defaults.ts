import type { WardenConfig, CommandRule, ArgPattern } from './types';

// --- Shared patterns for Node.js ecosystem ---

const SAFE_DEV_TOOLS = [
  'jest', 'vitest', 'tsc', 'eslint', 'prettier', 'mkdirp', 'concurrently',
  'turbo', 'next', 'nuxt', 'vite', 'astro', 'playwright', 'cypress',
  'mocha', 'nyc', 'c8', 'ts-jest', 'tsup', 'esbuild', 'rollup', 'webpack',
  'prisma', 'drizzle-kit', 'typeorm', 'knex', 'sequelize-cli',
  'tailwindcss', 'postcss', 'autoprefixer', 'lint-staged', 'husky',
  'changeset', 'semantic-release', 'lerna', 'nx',
  'create-react-app', 'create-next-app', 'create-vite', 'degit',
  'storybook', 'wrangler', 'netlify', 'vercel', 'json',
];

const SCRIPT_RUNNERS = ['tsx', 'ts-node', 'nodemon'];

const REGISTRY_OPS = ['publish', 'unpublish', 'deprecate', 'owner', 'access', 'token', 'adduser', 'login', 'logout'];

const SAFE_PKG_MANAGER_CMDS = [
  'install', 'add', 'remove', 'uninstall', 'update', 'upgrade', 'outdated',
  'ls', 'list', 'run', 'test', 'start', 'build', 'init', 'create',
  'info', 'view', 'show', 'why', 'pack', 'cache', 'config', 'get', 'set',
  'version', 'help', 'exec', 'dedupe', 'prune', 'audit', 'completion',
];

const VERSION_HELP_FLAGS: ArgPattern = {
  match: { anyArgMatches: ['^--(version|help)$', '^-[vh]$'] },
  decision: 'allow',
  description: 'Version/help flags',
};

function anyArgMatchesPattern(items: string[]): string {
  return `^(${items.join('|')})$`;
}

function safeDevToolsPattern(): ArgPattern {
  return {
    match: { anyArgMatches: [anyArgMatchesPattern(SAFE_DEV_TOOLS)] },
    decision: 'allow',
    description: 'Well-known dev tools',
  };
}

function scriptRunnersPattern(): ArgPattern {
  return {
    match: { anyArgMatches: [anyArgMatchesPattern(SCRIPT_RUNNERS)] },
    decision: 'ask',
    reason: 'Script runners can execute arbitrary code',
  };
}

function registryOpsPattern(): ArgPattern {
  return {
    match: { anyArgMatches: [anyArgMatchesPattern(REGISTRY_OPS)] },
    decision: 'ask',
    reason: 'Registry modification',
  };
}

function pkgManagerRule(command: string, extraSafeCmds: string[] = []): CommandRule {
  const safeCmds = [...SAFE_PKG_MANAGER_CMDS, ...extraSafeCmds];
  return {
    command,
    default: 'ask',
    argPatterns: [
      registryOpsPattern(),
      {
        match: { anyArgMatches: [anyArgMatchesPattern(safeCmds)] },
        decision: 'allow',
        description: `Standard ${command} commands`,
      },
      VERSION_HELP_FLAGS,
    ],
  };
}

function pkgRunnerRule(command: string): CommandRule {
  return {
    command,
    default: 'ask',
    argPatterns: [
      safeDevToolsPattern(),
      scriptRunnersPattern(),
      VERSION_HELP_FLAGS,
    ],
  };
}

export const DEFAULT_CONFIG: WardenConfig = {
  defaultDecision: 'ask',
  askOnSubshell: true,
  trustedSSHHosts: [],
  trustedDockerContainers: [],
  trustedKubectlContexts: [],
  trustedSprites: [],

  layers: [{
    alwaysAllow: [
      // Read-only file operations
      'cat', 'head', 'tail', 'less', 'more', 'wc', 'sort', 'uniq', 'tee',
      'diff', 'comm', 'cut', 'paste', 'tr', 'fold', 'expand', 'unexpand',
      'column', 'rev', 'tac', 'nl', 'od', 'xxd', 'file', 'stat',
      // Search/find
      'grep', 'egrep', 'fgrep', 'rg', 'ag', 'ack', 'find', 'fd', 'fzf',
      'locate', 'which', 'whereis', 'type', 'command',
      // Directory listing
      'ls', 'dir', 'tree', 'exa', 'eza', 'lsd',
      // Path/string utilities
      'basename', 'dirname', 'realpath', 'readlink',
      'echo', 'printf', 'true', 'false', 'test', '[',
      // Date/time
      'date', 'cal',
      // Environment info
      'env', 'printenv', 'uname', 'hostname', 'whoami', 'id', 'pwd',
      // Process viewing (read-only)
      'ps', 'top', 'htop', 'uptime', 'free', 'df', 'du', 'lsof',
      // Text processing
      'sed', 'awk', 'jq', 'yq', 'xargs', 'seq',
      // Pagers and formatters
      'bat', 'pygmentize', 'highlight',
      // Version managers (read-only)
      'nvm', 'fnm', 'rbenv', 'pyenv',
      // Terminal
      'stty', 'tput', 'reset', 'clear',
      // Misc safe
      'cd', 'pushd', 'popd', 'dirs', 'hash', 'alias',
      'sleep', 'wait', 'time',
      'md5', 'md5sum', 'sha256sum', 'shasum', 'cksum',
      'base64', 'openssl',
    ],

    alwaysDeny: [
      'sudo', 'su', 'doas',
      'mkfs', 'fdisk', 'dd',
      'shutdown', 'reboot', 'halt', 'poweroff',
      'iptables', 'ip6tables', 'nft',
      'useradd', 'userdel', 'usermod', 'groupadd', 'groupdel',
      'crontab',
      'systemctl', 'service', 'launchctl',
    ],

    rules: [
      // --- CLI tools ---
      {
        command: 'claude',
        default: 'ask',
        argPatterns: [
          { match: { anyArgMatches: ['^--(version|help)$', '^-[vh]$'] }, decision: 'allow', description: 'Version/help flags' },
        ],
      },

      // --- Shell interpreters ---
      ...['bash', 'sh', 'zsh'].map((cmd): CommandRule => ({
        command: cmd,
        default: 'ask',
        argPatterns: [
          { match: { anyArgMatches: ['^--(version|help)$'] }, decision: 'allow', description: 'Version/help flags' },
        ],
      })),

      // --- Node.js ecosystem ---
      {
        command: 'node',
        default: 'ask',
        argPatterns: [
          { match: { anyArgMatches: ['^-e$', '^--eval', '^-p$', '^--print'] }, decision: 'ask', reason: 'Evaluating inline code' },
          { match: { anyArgMatches: ['^--(version|help)$', '^-[vh]$'] }, decision: 'allow', description: 'Version/help flags' },
          { match: { noArgs: true }, decision: 'ask', reason: 'Interactive REPL' },
        ],
      },
      // npx / bunx — package runners
      pkgRunnerRule('npx'),
      pkgRunnerRule('bunx'),
      // npm / pnpm / yarn — package managers
      pkgManagerRule('npm', ['ci', 'search', 'explain', 'prefix', 'root', 'fund', 'doctor', 'diff', 'pkg', 'query', 'shrinkwrap']),
      pkgManagerRule('pnpm', ['store', 'fetch', 'doctor', 'patch']),
      pkgManagerRule('yarn', ['up', 'dlx', 'workspaces']),
      // bun — runtime + package manager
      {
        command: 'bun',
        default: 'ask',
        argPatterns: [
          { match: { anyArgMatches: [anyArgMatchesPattern([...SAFE_PKG_MANAGER_CMDS, 'ci', 'pm', 'x', 'link', 'unlink'])], }, decision: 'allow', description: 'Standard bun commands' },
          safeDevToolsPattern(),
          scriptRunnersPattern(),
          VERSION_HELP_FLAGS,
        ],
      },

      // --- Python ---
      ...['python', 'python3'].map((cmd): CommandRule => ({
        command: cmd,
        default: 'ask',
        argPatterns: [
          { match: { anyArgMatches: ['^--(version|help)$', '^-V$'] }, decision: 'allow' },
        ],
      })),
      { command: 'pip', default: 'allow' },
      { command: 'pip3', default: 'allow' },
      {
        command: 'uv',
        default: 'allow',
        argPatterns: [
          { match: { anyArgMatches: ['^publish$'] }, decision: 'ask', reason: 'Publishing to PyPI' },
        ],
      },
      { command: 'pipx', default: 'ask' },

      // --- Git ---
      {
        command: 'git',
        default: 'allow',
        argPatterns: [
          { match: { argsMatch: ['push\\s+--force', 'push\\s+-f\\b'] }, decision: 'ask', reason: 'Force push can overwrite remote history' },
          { match: { argsMatch: ['reset\\s+--hard'] }, decision: 'ask', reason: 'Hard reset discards changes' },
          { match: { anyArgMatches: ['^clean$'] }, decision: 'ask', reason: 'git clean removes untracked files' },
        ],
      },
      {
        command: 'gh',
        default: 'allow',
        argPatterns: [
          { match: { argsMatch: ['repo\\s+delete', 'repo\\s+archive'] }, decision: 'ask', reason: 'Destructive repo operation' },
        ],
      },

      // --- Build tools ---
      { command: 'make', default: 'allow' },
      { command: 'cmake', default: 'allow' },
      {
        command: 'cargo',
        default: 'allow',
        argPatterns: [
          { match: { anyArgMatches: ['^(publish|login|logout|owner|yank)$'] }, decision: 'ask', reason: 'Registry modification' },
        ],
      },
      {
        command: 'go',
        default: 'allow',
        argPatterns: [
          { match: { anyArgMatches: ['^generate$'] }, decision: 'ask', reason: 'go generate runs arbitrary commands' },
        ],
      },
      { command: 'rustup', default: 'allow' },
      { command: 'tsc', default: 'allow' },
      { command: 'turbo', default: 'allow' },
      { command: 'nx', default: 'allow' },
      { command: 'lerna', default: 'allow' },

      // --- Docker ---
      {
        command: 'docker',
        default: 'ask',
        argPatterns: [
          { match: { anyArgMatches: ['^(ps|images|logs|inspect|stats|top|version|info)$'] }, decision: 'allow', description: 'Read-only docker commands' },
          { match: { anyArgMatches: ['^(build|run|compose|exec|pull|stop|start|restart|create)$'] }, decision: 'ask', reason: 'Docker state-changing operation' },
          { match: { anyArgMatches: ['^(system\\s+prune|container\\s+prune|image\\s+prune)$'] }, decision: 'ask', reason: 'Docker prune operations' },
        ],
      },
      { command: 'docker-compose', default: 'ask' },
      { command: 'kubectl', default: 'ask' },

      // --- File operations ---
      {
        command: 'rm',
        default: 'ask',
        argPatterns: [
          { match: { argsMatch: ['-[^\\s]*r[^\\s]*f|-[^\\s]*f[^\\s]*r'] }, decision: 'ask', reason: 'Recursive force delete (rm -rf)' },
          { match: { argsMatch: ['-[^\\s]*r'] }, decision: 'ask', reason: 'Recursive delete' },
          { match: { argCount: { max: 3 }, not: false }, decision: 'allow', description: 'Deleting a small number of non-recursive files' },
        ],
      },
      { command: 'mkdir', default: 'allow' },
      { command: 'touch', default: 'allow' },
      { command: 'cp', default: 'allow' },
      { command: 'mv', default: 'allow' },
      { command: 'ln', default: 'allow' },
      {
        command: 'chmod',
        default: 'ask',
        argPatterns: [
          { match: { argsMatch: ['-R\\s+777'] }, decision: 'deny', reason: 'Recursively setting world-writable permissions' },
        ],
      },
      { command: 'chown', default: 'ask' },

      // --- Network ---
      { command: 'curl', default: 'allow' },
      { command: 'wget', default: 'allow' },
      { command: 'ssh', default: 'ask' },
      { command: 'scp', default: 'ask' },
      { command: 'rsync', default: 'ask' },

      // --- Package managers ---
      { command: 'brew', default: 'allow' },
      { command: 'apt', default: 'ask' },
      { command: 'apt-get', default: 'ask' },
      { command: 'yum', default: 'ask' },
      { command: 'dnf', default: 'ask' },
      { command: 'pacman', default: 'ask' },

      // --- Terraform / IaC ---
      { command: 'terraform', default: 'ask', argPatterns: [
        { match: { anyArgMatches: ['^(plan|validate|fmt|show|state|output|providers|version|graph|console)$'] }, decision: 'allow', description: 'Read-only terraform commands' },
      ]},
    ],
  }],
};

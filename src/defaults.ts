import type { WardenConfig } from './types';

export const DEFAULT_CONFIG: WardenConfig = {
  defaultDecision: 'ask',
  askOnSubshell: true,
  trustedSSHHosts: [],
  trustedDockerContainers: [],
  trustedKubectlContexts: [],
  trustedSprites: [],

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
    'nvm', 'fnm', 'nvm', 'rbenv', 'pyenv',
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

  globalDeny: [
    { pattern: 'rm\\s+-[^\\s]*r[^\\s]*f|rm\\s+-[^\\s]*f[^\\s]*r', reason: 'Recursive force delete' },
    { pattern: '>\\/dev\\/sd|>\\/dev\\/nvme|>\\/dev\\/hd', reason: 'Direct write to block device' },
    { pattern: 'chmod\\s+-R\\s+777', reason: 'Recursively setting world-writable permissions' },
    { pattern: ':\\(\\)\\s*\\{', reason: 'Fork bomb pattern detected' },
  ],

  rules: [
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
    {
      command: 'npx',
      default: 'ask',
      argPatterns: [
        {
          match: { anyArgMatches: ['^(jest|vitest|tsx|ts-node|tsc|eslint|prettier|rimraf|mkdirp|concurrently|turbo|next|nuxt|vite|astro|playwright|cypress|mocha|nyc|c8|nodemon|ts-jest|tsup|esbuild|rollup|webpack|prisma|drizzle-kit|typeorm|knex|sequelize-cli|tailwindcss|postcss|autoprefixer|lint-staged|husky|changeset|semantic-release|lerna|nx|create-react-app|create-next-app|create-vite|degit|storybook|wrangler|netlify|vercel)$'] },
          decision: 'allow',
          description: 'Well-known dev tools',
        },
        { match: { anyArgMatches: ['^--(version|help)$', '^-[vh]$'] }, decision: 'allow', description: 'Version/help flags' },
      ],
    },
    {
      command: 'bunx',
      default: 'ask',
      argPatterns: [
        {
          match: { anyArgMatches: ['^(jest|vitest|tsx|tsc|eslint|prettier|turbo|next|vite|astro|playwright|prisma|drizzle-kit|tsup|esbuild|tailwindcss|storybook|wrangler)$'] },
          decision: 'allow',
          description: 'Well-known dev tools',
        },
      ],
    },
    {
      command: 'npm',
      default: 'allow',
      argPatterns: [
        { match: { anyArgMatches: ['^(publish|unpublish|deprecate|owner|access|token|adduser|login)$'] }, decision: 'ask', reason: 'Registry modification' },
      ],
    },
    { command: 'pnpm', default: 'allow', argPatterns: [{ match: { anyArgMatches: ['^publish$'] }, decision: 'ask', reason: 'Publishing' }] },
    { command: 'yarn', default: 'allow', argPatterns: [{ match: { anyArgMatches: ['^publish$'] }, decision: 'ask', reason: 'Publishing' }] },
    {
      command: 'bun',
      default: 'ask',
      argPatterns: [
        { match: { anyArgMatches: ['^(install|add|remove|run|test|build|init|create|pm|x|upgrade|link|unlink)$'] }, decision: 'allow', description: 'Standard bun commands' },
        { match: { anyArgMatches: ['^--(version|help)$'] }, decision: 'allow' },
      ],
    },

    // --- Python ---
    {
      command: 'python',
      default: 'ask',
      argPatterns: [
        { match: { anyArgMatches: ['^--(version|help)$', '^-V$'] }, decision: 'allow' },
      ],
    },
    {
      command: 'python3',
      default: 'ask',
      argPatterns: [
        { match: { anyArgMatches: ['^--(version|help)$', '^-V$'] }, decision: 'allow' },
      ],
    },
    { command: 'pip', default: 'allow' },
    { command: 'pip3', default: 'allow' },
    { command: 'uv', default: 'allow' },
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
    { command: 'gh', default: 'allow' },

    // --- Build tools ---
    { command: 'make', default: 'allow' },
    { command: 'cmake', default: 'allow' },
    { command: 'cargo', default: 'allow' },
    { command: 'go', default: 'allow' },
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
        { match: { argsMatch: ['-[^\\s]*r'] }, decision: 'ask', reason: 'Recursive delete' },
        { match: { argCount: { max: 3 }, not: false }, decision: 'allow', description: 'Deleting a small number of non-recursive files' },
      ],
    },
    { command: 'mkdir', default: 'allow' },
    { command: 'touch', default: 'allow' },
    { command: 'cp', default: 'allow' },
    { command: 'mv', default: 'allow' },
    { command: 'ln', default: 'allow' },
    { command: 'chmod', default: 'ask' },
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
};

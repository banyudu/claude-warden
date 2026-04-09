import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/codex-export.ts', 'src/copilot.ts', 'src/cli.ts'],
  format: ['cjs'],
  target: 'node18',
  outDir: 'dist',
  clean: true,
  splitting: false,
  noExternal: ['bash-parser', 'yaml'],
  banner: { js: '#!/usr/bin/env node' },
});

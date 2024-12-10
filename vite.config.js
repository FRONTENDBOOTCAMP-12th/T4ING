// import { resolve } from 'node:path'
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'docs',
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
});

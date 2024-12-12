// import { resolve } from 'node:path'
import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        login: resolve(__dirname, 'src/pages/login/index.html'),
      },
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
});

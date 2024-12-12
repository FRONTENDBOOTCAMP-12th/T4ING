import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        login: resolve(__dirname, 'src/pages/login/index.html'),
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        outDir: (folder) => {
          if (folder.name.includes('assets/')) {
            return 'assets/[name][extname]';
          }
          return '[name][extname]';
        },
      },
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
});

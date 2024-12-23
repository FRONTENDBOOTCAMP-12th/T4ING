import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        loginMain: resolve(__dirname, '/src/pages/main/index.html'),
        login: resolve(__dirname, '/src/pages/login/index.html'),
        join: resolve(__dirname, '/src/pages/register/index.html'),
        landing: resolve(__dirname, '/src/pages/landing/index.html'),
        profile: resolve(__dirname, '/src/pages/profile/index.html'),
        guide: resolve(__dirname, '/guide/index.html'),
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
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@components', replacement: '/src/components' },
      { find: '@layout', replacement: '/src/components/layout' },
    ],
  },
});

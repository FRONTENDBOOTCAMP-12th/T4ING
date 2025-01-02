import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        landing: resolve(__dirname, 'src/pages/landing/index.html'),
        login: resolve(__dirname, 'src/pages/login/index.html'),
        profile: resolve(__dirname, 'src/pages/profile/index.html'),
        register: resolve(__dirname, 'src/pages/register/index.html'),
        user: resolve(__dirname, 'src/pages/user/index.html'),
        goodbye: resolve(__dirname, 'src/pages/goodbye/index.html'),
        guide: resolve(__dirname, 'guide/index.html'),
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
  plugins: [
    {
      name: 'vite-plugin-og-tags',
      transformIndexHtml(html) {
        return html.replace(
          '</head>',
          `
    <meta name="author" content="TAING">
    <meta name="description" content="멋쟁이 사자처럼 태킷 프론트엔드 스쿨 12기 바닐라 프로젝트 4조 4인머스캣의 타잉 웹사이트.">
    <meta name="keywords" content="멋쟁이 사자처럼, 프론트엔드 스쿨">
    <meta property="og:site_name" content="TAING">
    <meta property="og:type" content="website">
    <meta property="og:title" content="TAING">
    <meta property="og:description" content="멋쟁이 사자처럼 태킷 프론트엔드 스쿨 12기 바닐라 프로젝트 4조 4인머스캣의 타잉 웹사이트.">
    <meta property="og:image" content="/assets/images/og.png">
    <meta property="og:image:width" content="800">
    <meta property="og:image:height" content="400">
    <meta property="og:url" content="https://t4ing.vercel.app">
    <meta property="og:locale" content="ko_KR">
  </head>`
        );
      },
    },
  ],
});

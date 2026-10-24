import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: './',
    plugins: [
      {
        name: 'copy-static-assets',
        closeBundle() {
          const folders = ['css', 'js', 'assets'];
          for (const folder of folders) {
            const src = path.resolve(__dirname, folder);
            const dest = path.resolve(__dirname, 'dist', folder);
            if (fs.existsSync(src)) {
              fs.cpSync(src, dest, {recursive: true});
            }
          }
        },
      },
    ],
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          blogs: path.resolve(__dirname, 'blogs.html'),
          blog: path.resolve(__dirname, 'blog.html'),
          categories: path.resolve(__dirname, 'categories.html'),
          bookmarks: path.resolve(__dirname, 'bookmarks.html'),
          about: path.resolve(__dirname, 'about.html'),
          dashboard: path.resolve(__dirname, 'dashboard.html'),
        },
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
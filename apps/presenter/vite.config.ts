/// <reference types="vitest" />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig({
  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },

  cacheDir: '../../node_modules/.vite/presenter',

  server: {
    port: 9010,
    host: 'localhost',
  },

  preview: {
    port: 9011,
    host: 'localhost',
  },

  plugins: [
    react(),
    nxViteTsPaths(),
    checker({
      typescript: {
        root: `${process.cwd()}/apps/presenter`,
        tsconfigPath: 'tsconfig.app.json',
      },
    }),
  ],
});

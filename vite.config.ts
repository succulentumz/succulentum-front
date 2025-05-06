import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => ({
  base: process.env['APP_BASE'],
  plugins: [react(), tsconfigPaths()],
  build: {
    modulePreload: false,
    target: ['esnext'],
    minify: mode === 'production',
    cssCodeSplit: false,
  },
  define: {
    'process.env': {
      NODE_ENV: process.env['NODE_ENV'],
      GATEWAY_URL: process.env['GATEWAY_URL'],
      ...loadEnv(mode, process.cwd()),
    },
  },
  server: {
    port: 8080,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globalSetup: './vitest.global.setup.ts',
  },
}));

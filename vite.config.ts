import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(() => {
  const env = loadEnv('development', process.cwd(), '')
  return {
    plugins: [react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      }
    })],
    server: {
      open: env.DISABLE_OPEN_BROWSER === 'true' ? false : true,
      port: 3000,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
      include: ['**/*.spec.ts', '**/*.spec.tsx'],
      css: true,
    }
  }
});

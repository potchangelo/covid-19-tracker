import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(config => {
  const env = loadEnv(config.mode, process.cwd(), "");
  return {
    server: {
      port: +(env.SERVER_PORT ?? 3001)
    },
    plugins: [react()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/utils/setupTests.js',
    },
  };
})

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../dist/public',
    sourcemap: true,
  },
  server: {
    proxy: {
      '/*': 'http://localhost:3000',
    },
  },
});

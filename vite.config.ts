import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: { sourcemap: false, chunkSizeWarningLimit: 500 },
  server: { host: '127.0.0.1', strictPort: true, port: 5173 },
});

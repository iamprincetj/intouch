import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv'

dotenv.config()

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './testSetup.ts',
    include: ['./tests/**/*.test.ts'],
  },
  // build: {
    // rollupOptions: {
    //   output: { manualChunks: { vendor: ['react', 'react-dom'] } },
    // },
  //   chunkSizeWarningLimit: 1000
  // }
});

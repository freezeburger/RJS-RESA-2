import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import crypto from 'crypto';

// https://vitejs.dev/config/
export default defineConfig({
  html:{
    cspNonce: 'nonce-' + crypto.randomBytes(16).toString("base64"),
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
  test: {
    environment: 'jsdom',
  }
} as UserConfig)

import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
const { resolve, join } = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  publicDir:'static',
  plugins: [
    reactRefresh()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  server: {
    port: 3001,
    proxy: {
      "/no-migraine-service": {
        target: "http://localhost:3008",
        changeOrigin: true,
        secure: false,
        rewrite: path => {
          return path.replace(/^\/no-migraine-service/, '')
        }
      },
    },
  }
})

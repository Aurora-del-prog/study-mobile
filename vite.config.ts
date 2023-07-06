import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    eslint(),
  ],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        // 3000是服务器，8888是mock
        target: 'http://localhost:8888/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // 不可以省略rewrite
      }
    }
  }
})

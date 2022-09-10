import { defineConfig } from 'vite'
import path from 'path'
// import vue from '@vitejs/plugin-vue'
import vue from '@vitejs/plugin-vue2'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
  },
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'./src')
    }
  }
})

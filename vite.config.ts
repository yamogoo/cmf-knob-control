import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  // define: { processEnvValues },
  server: {
    port: 5001
    // proxy: { '/api': 'http://localhost:5002' }
  },
  build: {
    outDir: 'build'
  },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@typings': fileURLToPath(new URL('./src/typings', import.meta.url)),

      '@app': fileURLToPath(new URL('./src/projects/cmf-app', import.meta.url)),
      '@proto': fileURLToPath(new URL('./src/projects/proto-app', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
            @import './src/assets/styles/common.scss';
          `
      }
    }
  }
})

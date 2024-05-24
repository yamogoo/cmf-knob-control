import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5001
  },
  build: {
    outDir: 'build'
  },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~@': fileURLToPath(new URL('./src/renderer/src', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/renderer/src/utils', import.meta.url)),
      '@typings': fileURLToPath(new URL('./src/renderer/src/typings', import.meta.url)),

      '@app': fileURLToPath(new URL('./src/renderer/src/projects/cmf-app', import.meta.url)),
      '@proto': fileURLToPath(new URL('./src/renderer/src/projects/proto-app', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
            @import './src/renderer/src/assets/styles/common.scss';
          `
      }
    }
  },
  test: {
    // enable jest-like global test APIs
    globals: true,
    // simulate DOM with happy-dom
    // (requires installing happy-dom as a peer dependency)
    environment: 'happy-dom'
  }
})

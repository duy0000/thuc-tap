/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['/src/assets/*.{ico,jpg,jpeg,gif,svg,.png}'],
  server: {
    forceHttps: true,
  },
  esbuild: {
    legalComments: 'external',
    platform: 'browser',
    treeShaking: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      Styles: path.resolve(__dirname, './src/assets/Styles/'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@/assets/Styles/Mixins/mixins' as *;
                        @use '@/assets/Styles/Mixins/var' as *;
                        @use '@/assets/Styles/Commons/var' as *;`,
        sassOptions: {
          quietDeps: true,
        },
      },
    },
  },
  // build: {
  //   rollupOptions: {
  //     external: [
  //       'react-quill/dist/quill.snow.css',
  //     ],
  //   },
  // },
})

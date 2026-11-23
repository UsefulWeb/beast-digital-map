import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import 'dotenv/config'

import manifest from './baseManifest.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      manifest,
    }),
  ],
  base: process.env.APP_BASE_PATH || '/beast-digital-map/',
  build: {
    // outDir: 'docs'
  },
  preview: {
    port: Number(process.env.APP_PREVIEW_PORT) || 8080,
  },
})

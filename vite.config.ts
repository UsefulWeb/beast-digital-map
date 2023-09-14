import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import 'dotenv/config';

import manifest from './baseManifest';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      react(),
      VitePWA({
          registerType: 'autoUpdate',
          manifest
      })
  ],
  base: process.env.APP_BASE_PATH || '/beast-digital-map/',
  build: {
    // outDir: 'docs'
  }
})

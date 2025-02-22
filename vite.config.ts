import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

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
  base: '/beast-digital-map/',
  build: {
    // outDir: 'docs'
  }
})

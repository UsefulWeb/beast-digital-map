import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vitest/config'
import 'dotenv/config'

import manifest from './baseManifest.js'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

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
      injectRegister: false,
      manifest,
      includeAssets: [
        'favicon.ico',
        'favicon-16x16.png',
        'favicon-32x32.png',
        'apple-touch-icon.png',
        'android-chrome-192x192.png',
        'android-chrome-512x512.png',
        'safari-pinned-tab.svg',
        'fonts/**/*',
        'images/**/*',
        'data/**/*',
      ],
      workbox: {
        // App shell + public maps/JSON/UI so boards work offline after first visit
        globPatterns: [
          '**/*.{js,css,html,ico,png,svg,avif,jpg,jpeg,webp,woff,woff2,json,webmanifest}',
        ],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
        navigateFallback: 'index.html',
        runtimeCaching: [
          {
            urlPattern: ({ request, url }) =>
              request.destination === 'image' ||
              url.pathname.includes('/images/') ||
              url.pathname.includes('/data/'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'beast-map-assets',
              expiration: {
                maxEntries: 120,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@app': path.resolve(rootDir, 'src/app'),
      '@pages': path.resolve(rootDir, 'src/pages'),
      '@widgets': path.resolve(rootDir, 'src/widgets'),
      '@features': path.resolve(rootDir, 'src/features'),
      '@entities': path.resolve(rootDir, 'src/entities'),
      '@shared': path.resolve(rootDir, 'src/shared'),
    },
  },
  base: process.env.APP_BASE_PATH || '/beast-digital-map/',
  build: {
    // outDir: 'docs'
  },
  preview: {
    port: Number(process.env.APP_PREVIEW_PORT) || 8080,
  },
  test: {
    environment: 'node',
    include: ['src/**/*.{test,spec}.ts'],
  },
})

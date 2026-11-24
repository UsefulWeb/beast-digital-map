import { registerSW } from 'virtual:pwa-register'

/** Register the service worker for offline map/assets caching. */
export const registerPwa = () => {
  registerSW({ immediate: true })
}

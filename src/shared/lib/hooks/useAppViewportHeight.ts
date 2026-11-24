import { useEffect } from 'react'
import { getViewportSize } from '../getViewportSize'

const APP_HEIGHT_VAR = '--app-height'

/** Apply visible viewport height to `--app-height` (safe to call before React). */
export const syncAppHeight = () => {
  const { height } = getViewportSize()
  document.documentElement.style.setProperty(APP_HEIGHT_VAR, `${height}px`)
}

/** Keep `--app-height` aligned with the visible viewport (mobile chrome / FS). */
export const useAppViewportHeight = () => {
  useEffect(() => {
    syncAppHeight()

    const onChange = () => syncAppHeight()
    window.addEventListener('resize', onChange)
    window.addEventListener('orientationchange', onChange)
    document.addEventListener('fullscreenchange', onChange)

    const vv = window.visualViewport
    vv?.addEventListener('resize', onChange)
    vv?.addEventListener('scroll', onChange)

    return () => {
      window.removeEventListener('resize', onChange)
      window.removeEventListener('orientationchange', onChange)
      document.removeEventListener('fullscreenchange', onChange)
      vv?.removeEventListener('resize', onChange)
      vv?.removeEventListener('scroll', onChange)
    }
  }, [])
}

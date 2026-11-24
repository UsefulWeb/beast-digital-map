import { useEffect } from 'react'
import { exitAppFullscreen, requestAppFullscreen } from '../fullscreen'

/** Enter fullscreen while mounted; no-op when `enabled` is false. */
export const useFullscreen = (enabled = true) => {
  useEffect(() => {
    if (!enabled) {
      return
    }
    void requestAppFullscreen()
    return () => {
      void exitAppFullscreen()
    }
  }, [enabled])
}

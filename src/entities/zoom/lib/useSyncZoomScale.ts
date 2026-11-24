import { useDebounce } from '@shared/lib'
import { useTransformEffect } from 'react-zoom-pan-pinch'
import { setZoom } from '../model'

/** Keep zoom store in sync with the transform, debounced. */
export const useSyncZoomScale = (delayMs = 50) => {
  const debouncedSetZoom = useDebounce(
    (scale: number) => setZoom(scale),
    delayMs,
  )

  useTransformEffect(({ state }) => {
    debouncedSetZoom(state.scale)
  })
}

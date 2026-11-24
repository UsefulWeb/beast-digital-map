import type { MapSize } from '@entities/map'
import { useEffect, useState } from 'react'
import { getViewportSize } from '../getViewportSize'

export const getImageSize = (defaultSize?: MapSize) => {
  const { width: viewportWidth, height: viewportHeight } = getViewportSize()
  if (!defaultSize) {
    return [viewportWidth, viewportHeight, 1] as const
  }

  let height = viewportHeight - 4
  let ratio = height / defaultSize.height
  let width = ratio * defaultSize.width

  if (width > viewportWidth) {
    width = viewportWidth
    ratio = width / defaultSize.width
    height = ratio * defaultSize.height
  }

  return [width, height, ratio] as const
}

export const useImageSize = (imageSize: MapSize) => {
  const [size, setSize] = useState(() => getImageSize(imageSize))

  useEffect(() => {
    const onResize = () => {
      setSize(getImageSize(imageSize))
    }
    onResize()
    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onResize)
    document.addEventListener('fullscreenchange', onResize)

    const vv = window.visualViewport
    vv?.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
      document.removeEventListener('fullscreenchange', onResize)
      vv?.removeEventListener('resize', onResize)
    }
  }, [imageSize])

  return size
}

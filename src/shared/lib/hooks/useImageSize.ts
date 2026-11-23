import type { MapSize } from '@entities/map'
import { useEffect, useState } from 'react'

export const getImageSize = (defaultSize?: MapSize) => {
  const { innerWidth, innerHeight } = window
  if (!defaultSize) {
    return [innerWidth, innerHeight, 1] as const
  }

  let height = innerHeight - 4
  let ratio = height / defaultSize.height
  let width = ratio * defaultSize.width

  if (width > innerWidth) {
    width = innerWidth
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
    return () => window.removeEventListener('resize', onResize)
  }, [imageSize])

  return size
}

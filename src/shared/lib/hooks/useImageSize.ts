import { useEffect, useState } from 'react'
import type { IMapSize } from '../../util/interfaces'

export const getImageSize = (defaultSize?: IMapSize) => {
  const { innerWidth, innerHeight } = window
  if (!defaultSize) {
    return [innerWidth, innerHeight, 1]
  }

  let height = innerHeight - 4
  let ratio = height / defaultSize.height
  let width = ratio * defaultSize.width

  if (width > innerWidth) {
    width = innerWidth
    ratio = width / defaultSize.width
    height = ratio * defaultSize.height
  }

  return [width, height, ratio]
}

export const useImageSize = (imageSize: IMapSize) => {
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

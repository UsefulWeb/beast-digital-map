import {
  generatePathList,
  getMovementDirection,
  selectPathData,
  stepCarouselIndex,
  usePathStore,
} from '@entities/path'
import { BASE_URL } from '@shared/config'
import { useKeyup } from '@shared/lib'
import { CarouselNav } from '@shared/ui'
import { useState } from 'react'
import { MovementImage } from '../MovementImage'

const DIRECTION_IMAGES = {
  east: `${BASE_URL}images/movement/east.avif`,
  south: `${BASE_URL}images/movement/south.avif`,
  west: `${BASE_URL}images/movement/west.avif`,
  north: `${BASE_URL}images/movement/north.avif`,
  none: `${BASE_URL}images/movement/no-movement.avif`,
} as const

export const Movements = () => {
  const path = usePathStore(selectPathData)
  const pathList = generatePathList(path, false)
  const [index, setIndex] = useState(0)

  const hasPrev = index < pathList.length - 1
  const hasNext = index !== 0
  const pathItem = pathList[pathList.length - index - 1]
  const direction = getMovementDirection(pathItem)

  const prev = () =>
    setIndex((value) => stepCarouselIndex(value, 1, pathList.length))
  const next = () =>
    setIndex((value) => stepCarouselIndex(value, -1, pathList.length))

  useKeyup((event) => {
    if (hasNext && event.key === 'ArrowRight') {
      next()
    }
    if (hasPrev && event.key === 'ArrowLeft') {
      prev()
    }
  })

  return (
    <CarouselNav
      onPrev={prev}
      onNext={next}
      hasPrev={hasPrev}
      hasNext={hasNext}
      indexLabel={index + 1}
      prevIcon={`${BASE_URL}images/movement/prev.avif`}
      nextIcon={`${BASE_URL}images/movement/next.avif`}
    >
      <MovementImage src={DIRECTION_IMAGES[direction]} alt="" />
    </CarouselNav>
  )
}

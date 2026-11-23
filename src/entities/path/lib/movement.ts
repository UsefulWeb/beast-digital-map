import type { PathSegment } from '../model/types'
import { getLocationCenter, getSkew, rad2deg } from './calculatePath'

export type MovementDirection = 'east' | 'south' | 'west' | 'north' | 'none'

export const getMovementDirection = (
  segment: PathSegment | undefined,
): MovementDirection => {
  if (!segment) {
    return 'none'
  }
  const { source, target } = segment
  if (!source || !target || source.location === target.location) {
    return 'none'
  }
  const fromPoint = getLocationCenter(source.location)
  const toPoint = getLocationCenter(target.location)
  const rad = getSkew(fromPoint, toPoint)
  const deg = (rad2deg(rad) + 45 + 360) % 360
  const quadrant = Math.floor(deg / 90)
  return (['east', 'south', 'west', 'north'] as const)[quadrant]
}

export const stepCarouselIndex = (
  index: number,
  delta: number,
  length: number,
) => {
  const next = index + delta
  if (next < 0 || next > length - 1) {
    return index
  }
  return next
}

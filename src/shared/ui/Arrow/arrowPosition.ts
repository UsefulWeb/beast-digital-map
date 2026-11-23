import {
  getControlPoint,
  getLocationCenter,
  getSkew,
  rad2deg,
} from '../../../entities/path'
import { scale } from '../../util/common'
import type { ILocationPathListItem } from '../../util/interfaces'

export interface ArrowPositionOptions {
  pathItem: ILocationPathListItem
  ratio: number
}

export const getArrowPosition = (options: ArrowPositionOptions) => {
  const { pathItem, ratio } = options
  const { source, target } = pathItem

  const k = (x: number) => scale(x, ratio)
  const controlPoint = getControlPoint({
    source,
    target,
    visitIndex: pathItem.mutualVisitIndex,
    ratio: 0.5,
  })

  const rad = getSkew(controlPoint, getLocationCenter(target.location))
  const deg = rad2deg(rad)
  const [left, top] = controlPoint.map(k)

  const minSize = Math.min(source.location.size, target.location.size)
  const size = k(minSize) * 0.02

  return {
    angle: {
      rad,
      deg,
    },
    left,
    top,
    scale: size,
  }
}

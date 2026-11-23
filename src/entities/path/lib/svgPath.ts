import type { PathSegment, PathSegments } from '../model/types'
import {
  getControlPoint,
  getLocationCenter,
  getSkew,
  type IPoint,
  rad2deg,
} from './calculatePath'

/** Arrow asset points down; SVG rotate(0) keeps that orientation. */
const ARROW_ASSET_OFFSET_DEG = -90

const scalePoint =
  (ratio: number) =>
  (point: IPoint): IPoint => [point[0] * ratio, point[1] * ratio]

export type PathMarker = {
  key: string
  x: number
  y: number
  angle: number
  label: number
  isLast: boolean
}

export type PathLineModel = {
  d: string
  markers: PathMarker[]
}

const segmentPoints = (segment: PathSegment, ratio: number) => {
  const from = scalePoint(ratio)(getLocationCenter(segment.source.location))
  const to = scalePoint(ratio)(getLocationCenter(segment.target.location))
  const control = scalePoint(ratio)(
    getControlPoint({
      source: segment.source,
      target: segment.target,
      visitIndex: segment.mutualVisitIndex,
    }),
  )
  return { from, to, control }
}

/** Point on quadratic Bézier at parameter t ∈ [0, 1]. */
const quadraticAt = (
  from: IPoint,
  control: IPoint,
  to: IPoint,
  t: number,
): IPoint => {
  const u = 1 - t
  return [
    u * u * from[0] + 2 * u * t * control[0] + t * t * to[0],
    u * u * from[1] + 2 * u * t * control[1] + t * t * to[1],
  ]
}

/** Tangent of quadratic Bézier at t (not normalized). */
const quadraticTangentAt = (
  from: IPoint,
  control: IPoint,
  to: IPoint,
  t: number,
): IPoint => {
  const u = 1 - t
  return [
    2 * u * (control[0] - from[0]) + 2 * t * (to[0] - control[0]),
    2 * u * (control[1] - from[1]) + 2 * t * (to[1] - control[1]),
  ]
}

const markerAngle = (tangentFrom: IPoint, tangentTo: IPoint) =>
  ARROW_ASSET_OFFSET_DEG + rad2deg(getSkew(tangentFrom, tangentTo))

export const buildPathLineModel = (
  segments: PathSegments,
  ratio: number,
): PathLineModel => {
  if (segments.length === 0) {
    return { d: '', markers: [] }
  }

  const parts: string[] = []
  const markers: PathMarker[] = []

  segments.forEach((segment, index) => {
    const { from, to, control } = segmentPoints(segment, ratio)
    if (index === 0) {
      parts.push(`M ${from[0]} ${from[1]}`)
    }
    parts.push(`Q ${control[0]} ${control[1]} ${to[0]} ${to[1]}`)

    // Midpoint of the drawn curve (not the off-curve control point).
    const mid = quadraticAt(from, control, to, 0.5)
    const tangent = quadraticTangentAt(from, control, to, 0.5)
    const tangentEnd: IPoint = [mid[0] + tangent[0], mid[1] + tangent[1]]

    markers.push({
      key: `${segment.index}-${index}`,
      x: mid[0],
      y: mid[1],
      angle: markerAngle(mid, tangentEnd),
      label: segment.index + 1,
      isLast: index === segments.length - 1,
    })
  })

  return {
    d: parts.join(' '),
    markers,
  }
}

import { palette } from '@shared/styles'
import Color from 'color'
import type { PathSegments } from '../model/types'
import {
  getControlPoint,
  getLocationCenter,
  getSkew,
  type IPoint,
  rad2deg,
} from './calculatePath'

/** Arrow asset points down; SVG rotate(0) keeps that orientation. */
const ARROW_ASSET_OFFSET_DEG = -90

/** Samples per cubic when measuring length / building gradient pieces. */
const CUBIC_SAMPLES = 12

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

/** One short stroke with a linearGradient aligned to its local direction. */
export type PathStrokePiece = {
  key: string
  d: string
  x1: number
  y1: number
  x2: number
  y2: number
  colorFrom: string
  colorTo: string
}

export type PathLineModel = {
  strokes: PathStrokePiece[]
  markers: PathMarker[]
}

const markerAngle = (tangentFrom: IPoint, tangentTo: IPoint) =>
  ARROW_ASSET_OFFSET_DEG + rad2deg(getSkew(tangentFrom, tangentTo))

const cubicAt = (
  p0: IPoint,
  p1: IPoint,
  p2: IPoint,
  p3: IPoint,
  t: number,
): IPoint => {
  const u = 1 - t
  const tt = t * t
  const uu = u * u
  return [
    uu * u * p0[0] + 3 * uu * t * p1[0] + 3 * u * tt * p2[0] + tt * t * p3[0],
    uu * u * p0[1] + 3 * uu * t * p1[1] + 3 * u * tt * p2[1] + tt * t * p3[1],
  ]
}

const cubicTangentAt = (
  p0: IPoint,
  p1: IPoint,
  p2: IPoint,
  p3: IPoint,
  t: number,
): IPoint => {
  const u = 1 - t
  return [
    3 * u * u * (p1[0] - p0[0]) +
      6 * u * t * (p2[0] - p1[0]) +
      3 * t * t * (p3[0] - p2[0]),
    3 * u * u * (p1[1] - p0[1]) +
      6 * u * t * (p2[1] - p1[1]) +
      3 * t * t * (p3[1] - p2[1]),
  ]
}

type Cubic = { p0: IPoint; p1: IPoint; p2: IPoint; p3: IPoint }

const catmullRomCubics = (points: IPoint[]): Cubic[] => {
  if (points.length < 2) {
    return []
  }
  if (points.length === 2) {
    const [a, b] = points
    return [{ p0: a, p1: a, p2: b, p3: b }]
  }

  const pts: IPoint[] = [points[0], ...points, points[points.length - 1]]
  const cubics: Cubic[] = []

  for (let i = 1; i < pts.length - 2; i++) {
    const p0 = pts[i - 1]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2]
    cubics.push({
      p0: p1,
      p1: [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6],
      p2: [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6],
      p3: p2,
    })
  }

  return cubics
}

const buildWaypoints = (segments: PathSegments, ratio: number): IPoint[] => {
  const scale = scalePoint(ratio)
  const points: IPoint[] = []

  segments.forEach((segment, index) => {
    if (index === 0) {
      points.push(scale(getLocationCenter(segment.source.location)))
    }

    if (segment.mutualVisitIndex > 0) {
      points.push(
        scale(
          getControlPoint({
            source: segment.source,
            target: segment.target,
            visitIndex: segment.mutualVisitIndex,
          }),
        ),
      )
    }

    points.push(scale(getLocationCenter(segment.target.location)))
  })

  return points
}

const dist = (a: IPoint, b: IPoint) => Math.hypot(b[0] - a[0], b[1] - a[1])

const cubicLength = (cubic: Cubic, samples = CUBIC_SAMPLES) => {
  let length = 0
  let prev = cubicAt(cubic.p0, cubic.p1, cubic.p2, cubic.p3, 0)
  for (let i = 1; i <= samples; i++) {
    const point = cubicAt(cubic.p0, cubic.p1, cubic.p2, cubic.p3, i / samples)
    length += dist(prev, point)
    prev = point
  }
  return length
}

/** Arc-length color: start → ochre mid → end. */
const colorAt = (t: number) => {
  const start = Color(palette.markerStart)
  const mid = Color(palette.path)
  const end = Color(palette.markerEnd)
  if (t <= 0.5) {
    return start.mix(mid, t / 0.5).hex()
  }
  return mid.mix(end, (t - 0.5) / 0.5).hex()
}

const buildGradientStrokes = (cubics: Cubic[]): PathStrokePiece[] => {
  const lengths = cubics.map((cubic) => cubicLength(cubic))
  const total = lengths.reduce((sum, value) => sum + value, 0) || 1
  const strokes: PathStrokePiece[] = []
  let traveled = 0

  cubics.forEach((cubic, cubicIndex) => {
    let prev = cubicAt(cubic.p0, cubic.p1, cubic.p2, cubic.p3, 0)
    let prevT = traveled / total

    for (let i = 1; i <= CUBIC_SAMPLES; i++) {
      const t = i / CUBIC_SAMPLES
      const point = cubicAt(cubic.p0, cubic.p1, cubic.p2, cubic.p3, t)
      const segmentLength = dist(prev, point)
      if (segmentLength < 0.25) {
        prev = point
        continue
      }

      const nextTraveled = traveled + segmentLength
      const nextT = nextTraveled / total

      strokes.push({
        key: `stroke-${cubicIndex}-${i}`,
        d: `M ${prev[0]} ${prev[1]} L ${point[0]} ${point[1]}`,
        x1: prev[0],
        y1: prev[1],
        x2: point[0],
        y2: point[1],
        colorFrom: colorAt(prevT),
        colorTo: colorAt(nextT),
      })

      traveled = nextTraveled
      prevT = nextT
      prev = point
    }
  })

  return strokes
}

export const buildPathLineModel = (
  segments: PathSegments,
  ratio: number,
): PathLineModel => {
  if (segments.length === 0) {
    return { strokes: [], markers: [] }
  }

  const waypoints = buildWaypoints(segments, ratio)
  const cubics = catmullRomCubics(waypoints)
  const strokes = buildGradientStrokes(cubics)

  const markers: PathMarker[] = []
  let nextWaypointIndex = 1

  segments.forEach((segment, index) => {
    if (segment.mutualVisitIndex > 0) {
      nextWaypointIndex += 1
    }
    const cubic =
      cubics[Math.min(nextWaypointIndex - 1, cubics.length - 1)] ?? cubics[0]
    nextWaypointIndex += 1

    const mid = cubicAt(cubic.p0, cubic.p1, cubic.p2, cubic.p3, 0.5)
    const tangent = cubicTangentAt(cubic.p0, cubic.p1, cubic.p2, cubic.p3, 0.5)
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

  return { strokes, markers }
}

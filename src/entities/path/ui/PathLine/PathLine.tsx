import { BASE_URL } from '@shared/config'
import type { PathMarker, PathStrokePiece } from '../../lib'
import * as C from './PathLine.components'

const arrowImg = `${BASE_URL}images/path/arrow.svg`

/** Stroke thickness at map ratio = 1 (map native pixel space). */
const BASE_STROKE_WIDTH = 10
const BASE_MARKER_SIZE = 39
const BASE_MARKER_FONT = 23
/**
 * Arrow tip is +Y. Triangle centroid of arrow.svg is above the image
 * center (toward the base), in the wider part of the triangle.
 */
const LABEL_LOCAL_Y = -0.17

export type PathLineProps = {
  strokes: PathStrokePiece[]
  width: number
  height: number
  ratio: number
  markers: PathMarker[]
}

export const PathLine = (props: PathLineProps) => {
  const { strokes, width, height, ratio, markers } = props

  const strokeWidth = Math.max(1.5, BASE_STROKE_WIDTH * ratio)
  const underlayWidth = strokeWidth + Math.max(1, strokeWidth * 0.18)
  const markerSize = Math.max(8, BASE_MARKER_SIZE * ratio)
  const markerHalf = markerSize / 2
  const markerFont = Math.max(6.5, BASE_MARKER_FONT * ratio)
  const labelLocalY = markerSize * LABEL_LOCAL_Y

  return (
    <C.Root width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        {strokes.map((stroke) => (
          <linearGradient
            key={`grad-${stroke.key}`}
            id={`path-grad-${stroke.key}`}
            gradientUnits="userSpaceOnUse"
            x1={stroke.x1}
            y1={stroke.y1}
            x2={stroke.x2}
            y2={stroke.y2}
          >
            <stop offset="0%" stopColor={stroke.colorFrom} />
            <stop offset="100%" stopColor={stroke.colorTo} />
          </linearGradient>
        ))}
      </defs>
      {/* Opaque underlay — keeps the ribbon readable above map-art / location glow */}
      {strokes.map((stroke) => (
        <C.Line
          key={`under-${stroke.key}`}
          d={stroke.d}
          $strokeWidth={underlayWidth}
          stroke="rgb(0 0 0 / 80%)"
        />
      ))}
      {strokes.map((stroke) => (
        <C.Line
          key={stroke.key}
          d={stroke.d}
          $strokeWidth={strokeWidth}
          stroke={`url(#path-grad-${stroke.key})`}
        />
      ))}
      {markers.map((marker) => (
        <g
          key={marker.key}
          transform={`translate(${marker.x}, ${marker.y}) rotate(${marker.angle})`}
        >
          <image
            href={arrowImg}
            width={markerSize}
            height={markerSize}
            x={-markerHalf}
            y={-markerHalf}
            style={{
              filter: marker.isLast
                ? 'drop-shadow(0 0 2px var(--color-marker-start))'
                : 'drop-shadow(0 0 2px black)',
            }}
          />
          <g
            transform={`translate(0, ${labelLocalY}) rotate(${-marker.angle})`}
          >
            <text
              x={0}
              y={0}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={markerFont}
              fontWeight={700}
              fill={
                marker.isLast ? 'var(--color-marker-start)' : 'var(--color-ink)'
              }
            >
              {marker.label}
            </text>
          </g>
        </g>
      ))}
    </C.Root>
  )
}

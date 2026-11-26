const CX = 2390
const CY = 2390
const OUTER_R = 2280
const INNER_R = 1720

const polar = (radius: number, angle: number) =>
  [CX + radius * Math.cos(angle), CY + radius * Math.sin(angle)] as const

/** Full donut ring (health === 1). */
const fullRingPath = () => {
  const [ox, oy] = polar(OUTER_R, -Math.PI / 2)
  const [ix, iy] = polar(INNER_R, -Math.PI / 2)
  return [
    `M ${ox} ${oy}`,
    `A ${OUTER_R} ${OUTER_R} 0 1 1 ${ox - 0.01} ${oy}`,
    `L ${ix - 0.01} ${iy}`,
    `A ${INNER_R} ${INNER_R} 0 1 0 ${ix} ${iy}`,
    'Z',
  ].join(' ')
}

/**
 * Donut wedge for segment `index` of `total`, starting at 12 o'clock.
 * Small gaps between wedges when total > 1.
 */
export const getPieSegmentPath = (index: number, total: number) => {
  if (total <= 1) {
    return fullRingPath()
  }

  const gap = Math.min(0.06, (2 * Math.PI) / total / 8)
  const slice = (2 * Math.PI) / total
  const a0 = -Math.PI / 2 + index * slice + gap / 2
  const a1 = -Math.PI / 2 + (index + 1) * slice - gap / 2
  const sweep = a1 - a0
  const large = sweep > Math.PI ? 1 : 0

  const [x0, y0] = polar(OUTER_R, a0)
  const [x1, y1] = polar(OUTER_R, a1)
  const [x2, y2] = polar(INNER_R, a1)
  const [x3, y3] = polar(INNER_R, a0)

  return [
    `M ${x0} ${y0}`,
    `A ${OUTER_R} ${OUTER_R} 0 ${large} 1 ${x1} ${y1}`,
    `L ${x2} ${y2}`,
    `A ${INNER_R} ${INNER_R} 0 ${large} 0 ${x3} ${y3}`,
    'Z',
  ].join(' ')
}

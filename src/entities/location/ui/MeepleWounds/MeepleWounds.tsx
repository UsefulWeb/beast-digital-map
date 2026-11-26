import { getPieSegmentPath } from '../../lib'
import * as C from './MeepleWounds.components'

export type MeepleWoundsProps = {
  health: number
  wounds: number
}

export const MeepleWounds = (props: MeepleWoundsProps) => {
  const { health, wounds } = props
  if (wounds <= 0 || health <= 0) {
    return null
  }

  const segments = Array.from({ length: health }, (_, index) => index)

  return (
    <C.Container>
      <C.Markers
        xmlns="http://www.w3.org/2000/svg"
        width="478"
        height="478"
        viewBox="0 0 4780 4780"
      >
        {segments.map((index) => {
          const wounded = index < wounds
          return (
            <path
              key={index}
              className={wounded ? 'wound' : 'slot'}
              d={getPieSegmentPath(index, health)}
            />
          )
        })}
      </C.Markers>
    </C.Container>
  )
}

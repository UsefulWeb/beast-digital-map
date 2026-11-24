import { get4PieSegment } from '../../lib'
import * as C from './MeepleWounds.components'

export type MeepleWoundsProps = {
  wounds: number
}

export const MeepleWounds = ({ wounds }: MeepleWoundsProps) => {
  if (wounds <= 0) {
    return null
  }

  const woundsList = Array.from({ length: wounds }, (_, key) => key)

  return (
    <C.Container>
      <C.Markers
        xmlns="http://www.w3.org/2000/svg"
        width="478"
        height="478"
        viewBox="0 0 4780 4780"
      >
        {woundsList.map((key) => (
          <path key={key} fill="red" d={get4PieSegment(key)} />
        ))}
      </C.Markers>
    </C.Container>
  )
}

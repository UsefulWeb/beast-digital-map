import {
  type MapMeeple,
  MapMeepleType,
  MEEPLE_IMAGE_SCALE,
  MEEPLE_OUTLINE,
  MEEPLE_SLUG,
} from '../../model'
import { MeepleWounds } from '../MeepleWounds'
import * as C from './Meeple.components'

export type MeepleProps = {
  meeple: MapMeeple
  onInjure: () => void
}

export const Meeple = ({ meeple, onInjure }: MeepleProps) => {
  const slug = MEEPLE_SLUG[meeple.type]
  if (!slug) {
    return null
  }

  return (
    <C.Container
      onClick={(event) => {
        event.stopPropagation()
        onInjure()
      }}
    >
      <C.Item
        $slug={slug}
        $scale={MEEPLE_IMAGE_SCALE[meeple.type]}
        $outline={MEEPLE_OUTLINE[meeple.type]}
        $farmer={meeple.type === MapMeepleType.FARMER}
      >
        <MeepleWounds wounds={meeple.wounds} />
      </C.Item>
    </C.Container>
  )
}

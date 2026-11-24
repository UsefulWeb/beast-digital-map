import { BASE_URL } from '@shared/config'
import { BOARD_MODES, type BoardMode } from '../../lib'
import {
  GameMode,
  selectHelpActive,
  selectMode,
  setGameMode,
  useGameStore,
} from '../../model'
import * as C from './ModeSwitch.components'

const ICONS: Record<BoardMode, string> = {
  [GameMode.PATH]: `${BASE_URL}images/controls/mode-path-active.svg`,
  [GameMode.LOCATIONS]: `${BASE_URL}images/controls/mode-locations-active.svg`,
  [GameMode.MEEPLE]: `${BASE_URL}images/controls/mode-meeple.svg`,
}

const LABELS: Record<BoardMode, string> = {
  [GameMode.PATH]: 'Path',
  [GameMode.LOCATIONS]: 'Locations',
  [GameMode.MEEPLE]: 'Meeples',
}

export const ModeSwitch = () => {
  const mode = useGameStore(selectMode)
  const helpActive = useGameStore(selectHelpActive)

  if (mode === GameMode.MOVEMENT) {
    return null
  }

  return (
    <C.Root>
      <C.List $help={helpActive}>
        {BOARD_MODES.map((boardMode) => (
          <C.Item
            key={boardMode}
            type="button"
            $active={mode === boardMode}
            $help={helpActive}
            onClick={() => setGameMode(boardMode)}
            title={LABELS[boardMode]}
            aria-label={LABELS[boardMode]}
            aria-pressed={mode === boardMode}
          >
            <img src={ICONS[boardMode]} alt="" />
            {helpActive && (
              <C.Hint $active={mode === boardMode}>{LABELS[boardMode]}</C.Hint>
            )}
          </C.Item>
        ))}
      </C.List>
    </C.Root>
  )
}

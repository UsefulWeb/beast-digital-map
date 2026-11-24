import {
  GameMode,
  selectMode,
  selectPathLinksLocked,
  togglePathLinksLocked,
  useGameStore,
} from '@entities/game'
import { Redo, Undo } from '@entities/history'
import {
  canClearPath,
  clearPath,
  selectPathData,
  usePathStore,
} from '@entities/path'
import { ZoomControls } from '@entities/zoom'
import { HelpTip } from '@features/help'
import { MovementsButton } from '@features/view-movements'
import { BASE_URL } from '@shared/config'
import { IconButton, Stack } from '@shared/ui'
import { useLocation } from 'wouter'
import { MovementsDock } from '../MovementsDock'
import { ToolbarPanel } from '../ToolbarPanel'
import * as C from './Toolbar.components'

export const Toolbar = () => {
  const gameMode = useGameStore(selectMode)
  const pathLinksLocked = useGameStore(selectPathLinksLocked)
  const path = usePathStore(selectPathData)
  const [, setLocation] = useLocation()

  const isPathMode = gameMode === GameMode.PATH
  const isMovementMode = gameMode === GameMode.MOVEMENT
  const showMovementButton = path.length > 1

  return (
    <>
      {showMovementButton && (
        <MovementsDock>
          <HelpTip label="Movements" align="end">
            <MovementsButton />
          </HelpTip>
        </MovementsDock>
      )}
      <ToolbarPanel>
        <Stack
          gap="1em"
          order={2}
          grow={1}
          align="center"
          portrait="row"
          portraitJustify="center"
        >
          {isPathMode && (
            <>
              <HelpTip label={pathLinksLocked ? 'Links only' : 'Free travel'}>
                <C.LockSlot $open={!pathLinksLocked}>
                  <IconButton
                    onClick={() => togglePathLinksLocked()}
                    icon={`${BASE_URL}images/controls/${
                      pathLinksLocked ? 'lock-closed' : 'lock-open'
                    }.svg`}
                    name={
                      pathLinksLocked
                        ? 'Unlock path links — free travel'
                        : 'Lock path links — neighbors only'
                    }
                    size="control"
                  />
                </C.LockSlot>
              </HelpTip>
              <HelpTip label="Clear">
                <C.ClearSlot>
                  <IconButton
                    onClick={() => clearPath()}
                    icon={`${BASE_URL}images/controls/clear-path.svg`}
                    disabled={!canClearPath(path)}
                    name="Refresh"
                    size="clear"
                  />
                </C.ClearSlot>
              </HelpTip>
              <Stack
                gap="1em"
                padding="1em 0.4em 0"
                portrait="row"
                align="center"
              >
                <HelpTip label="Undo">
                  <Undo />
                </HelpTip>
                <HelpTip label="Redo">
                  <Redo />
                </HelpTip>
              </Stack>
            </>
          )}
          {!isMovementMode && (
            <HelpTip label="Zoom">
              <ZoomControls />
            </HelpTip>
          )}
        </Stack>
        {!isMovementMode && (
          <Stack
            gap="1em"
            order={2}
            portrait="row"
            portraitOrder={1}
            align="center"
          >
            <HelpTip label="Back">
              <IconButton
                onClick={() => setLocation('/')}
                icon={`${BASE_URL}images/controls/back.svg`}
                name="Go back"
                size="back"
              />
            </HelpTip>
          </Stack>
        )}
      </ToolbarPanel>
    </>
  )
}

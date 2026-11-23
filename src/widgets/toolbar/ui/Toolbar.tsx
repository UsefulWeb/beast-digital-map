import { GameMode, ModeSwitch, selectMode, useGameStore } from '@entities/game'
import { Redo, Undo } from '@entities/history'
import {
  canClearPath,
  clearPath,
  selectPathData,
  usePathStore,
} from '@entities/path'
import { ZoomControls } from '@entities/zoom'
import { ResetLocationsButton } from '@features/change-location-type'
import { MovementsButton } from '@features/view-movements'
import { BASE_URL } from '@shared/config'
import { IconButton, Stack } from '@shared/ui'
import { useLocation } from 'wouter'
import { MovementsDock } from './MovementsDock'
import { ToolbarPanel } from './ToolbarPanel'

export const Toolbar = () => {
  const gameMode = useGameStore(selectMode)
  const path = usePathStore(selectPathData)
  const [, setLocation] = useLocation()

  const isPathMode = gameMode === GameMode.PATH
  const isLocationsMode = gameMode === GameMode.LOCATIONS
  const isMovementMode = gameMode === GameMode.MOVEMENT
  const showMovementButton = path.length > 1

  return (
    <>
      {showMovementButton && (
        <MovementsDock>
          <MovementsButton />
        </MovementsDock>
      )}
      <ToolbarPanel>
        <Stack gap="1em" order={2} portrait="row" portraitJustify="start">
          <ModeSwitch />
          {isPathMode && (
            <>
              <IconButton
                onClick={() => clearPath()}
                icon={`${BASE_URL}images/controls/clear-path.svg`}
                disabled={!canClearPath(path)}
                name="Refresh"
                size="clear"
              />
              <Stack gap="1em" padding="1em 0.4em 0" portrait="row">
                <Undo />
                <Redo />
              </Stack>
            </>
          )}
          {isLocationsMode && <ResetLocationsButton />}
          {!isMovementMode && (
            <Stack padding="0 0 0 1.1em">
              <ZoomControls />
            </Stack>
          )}
        </Stack>
        <Stack gap="1em" order={2} portrait="row" portraitOrder={1}>
          <IconButton
            onClick={() => setLocation('/')}
            icon={`${BASE_URL}images/controls/back.svg`}
            name="Go back"
            size="back"
          />
        </Stack>
      </ToolbarPanel>
    </>
  )
}

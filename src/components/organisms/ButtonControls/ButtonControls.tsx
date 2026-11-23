import classnames from 'classnames'
import { useLocation } from 'wouter'
import backIcon from '../../../../public/images/back.svg'
import clearIcon from '../../../../public/images/clear.svg'
import {
  selectMode,
  useGameModeStore,
} from '../../../features/gameMode/gameModeSlice'
import {
  clearPath,
  selectPathData,
  usePathStore,
} from '../../../features/path/pathSlice'
import { IconButton } from '../../../shared/ui'
import { GameMode } from '../../../shared/util/common'
import { CardMovementsButton } from '../CardMovementsButton/CardMovementsButton'
import { HistoryControls } from '../HistoryControls/HistoryControls'
import { ModeSwitch } from '../ModeSwitch/ModeSwitch'
import { ResetLocationsTypeButton } from '../ResetLocationsTypeButton/ResetLocationsTypeButton'
import { ZoomControls } from '../ZoomControls/ZoomControls'
import S from './ButtonControls.module.scss'

export const ButtonControls = () => {
  const gameMode = useGameModeStore(selectMode)
  const path = usePathStore(selectPathData)
  const [, setLocation] = useLocation()

  const isPathMode = gameMode === GameMode.PATH
  const isLocationsMode = gameMode === GameMode.LOCATIONS
  const isMovementMode = gameMode === GameMode.MOVEMENT

  const goHome = () => setLocation('/')
  const clear = () => clearPath()
  const canClear = path.length > 1
  const showMovementButton = path.length > 1

  return (
    <>
      {showMovementButton && <CardMovementsButton className={S.movement} />}
      <div className={S.primary}>
        <div className={classnames(S.group, S.group_primary)}>
          <div className={S.control}>
            <ModeSwitch className={S.mode} />
          </div>
          {isPathMode && (
            <>
              <div className={S.control}>
                <IconButton
                  onClick={() => clear()}
                  className={classnames(S.clear)}
                  icon={clearIcon}
                  disabled={!canClear}
                  name={'Refresh'}
                />
              </div>
              <div className={classnames(S.group, S.history)}>
                <HistoryControls controlClassName={S.control} />
              </div>
            </>
          )}
          {isLocationsMode && (
            <>
              <div className={S.control}>
                <ResetLocationsTypeButton className={S.clear} />
              </div>
            </>
          )}

          {!isMovementMode && (
            <div className={classnames(S.group, S.zoom)}>
              <ZoomControls controlClassName={S.control} />
            </div>
          )}
        </div>
        <div className={classnames(S.group, S.group_back)}>
          <IconButton
            onClick={goHome}
            className={classnames(S.control, S.back)}
            icon={backIcon}
            name={'Go back'}
          />
        </div>
      </div>
    </>
  )
}

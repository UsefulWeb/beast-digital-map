import classnames from 'classnames'
import changeIcon from '../../../../public/images/change.svg'
import pathIcon from '../../../../public/images/path.svg'
import {
  selectMode,
  useGameModeStore,
} from '../../../features/gameMode/gameModeSlice'
import { IconButton } from '../../../shared/ui'
import { GameMode } from '../../../shared/util/common'
import S from './ModeSwitch.module.scss'

export interface ModeSwitchProps {
  className?: string
}

const icons = {
  [GameMode.PATH]: changeIcon,
  [GameMode.LOCATIONS]: pathIcon,
  [GameMode.MOVEMENT]: null,
}

export const ModeSwitch = (props: ModeSwitchProps) => {
  const { className } = props
  const gameMode = useGameModeStore(selectMode)
  const setGameMode = useGameModeStore((s) => s.setGameMode)
  const icon = icons[gameMode]

  const toggleMode = () => {
    const mode = gameMode === GameMode.PATH ? GameMode.LOCATIONS : GameMode.PATH
    setGameMode(mode)
  }

  return (
    <>
      {icon && (
        <IconButton
          onClick={toggleMode}
          className={classnames(className, S.button)}
          icon={icon}
          name={''}
        />
      )}
    </>
  )
}

import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useControls } from 'react-zoom-pan-pinch'
import buttonImage from '../../../../public/images/movement/back.jpg'
import {
  selectMode,
  useGameModeStore,
} from '../../../features/gameMode/gameModeSlice'
import { GameMode } from '../../../shared/util/common'
import S from './CardMovementsButton.module.scss'

export interface CardMovementsButtonProps {
  className?: string
}

export const CardMovementsButton = (props: CardMovementsButtonProps) => {
  const gameMode = useGameModeStore(selectMode)
  const setGameMode = useGameModeStore((s) => s.setGameMode)

  const { resetTransform } = useControls()

  const selected = gameMode === GameMode.MOVEMENT

  const [lastMode, setLastMode] = useState(gameMode)

  useEffect(() => {
    if (selected) {
      return resetTransform()
    }

    setLastMode(gameMode)
  }, [gameMode])

  const className = classNames(
    S.container,
    props.className,
    selected && S.selected,
  )
  const modes = [lastMode, GameMode.MOVEMENT]

  const onClick = () => {
    const index = modes.indexOf(gameMode)
    const nextMode = modes[1 - index]

    setGameMode(nextMode)
  }
  return (
    <button className={className} onClick={() => onClick()}>
      <img className={S.image} src={buttonImage} alt="" />
    </button>
  )
}

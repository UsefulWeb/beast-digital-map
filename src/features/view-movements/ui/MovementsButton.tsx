import styled from '@emotion/styled'
import { GameMode, selectMode, setGameMode, useGameStore } from '@entities/game'
import { BASE_URL } from '@shared/config'
import { useEffect, useState } from 'react'
import { useControls } from 'react-zoom-pan-pinch'
import { getNextMovementMode } from '../lib'

const Button = styled.button<{ $selected: boolean }>`
  width: 8vmin;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  filter: ${({ $selected }) => ($selected ? 'grayscale(0)' : 'grayscale(1)')};
  outline: none;
  border-radius: 4px;
`

const Image = styled.img`
  box-shadow: 0 0 5px white;
  width: 100%;
  border-radius: 4px;

  &:hover {
    box-shadow: 0 0 10px #ffa92c;
  }
`

export const MovementsButton = () => {
  const gameMode = useGameStore(selectMode)
  const { resetTransform } = useControls()
  const selected = gameMode === GameMode.MOVEMENT
  const [lastMode, setLastMode] = useState(gameMode)

  useEffect(() => {
    if (selected) {
      resetTransform()
      return
    }
    setLastMode(gameMode)
  }, [gameMode, resetTransform, selected])

  return (
    <Button
      $selected={selected}
      onClick={() => setGameMode(getNextMovementMode(gameMode, lastMode))}
      type="button"
    >
      <Image src={`${BASE_URL}images/movement/back.jpg`} alt="" />
    </Button>
  )
}

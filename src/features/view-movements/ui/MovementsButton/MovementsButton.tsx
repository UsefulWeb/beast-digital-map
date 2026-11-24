import { GameMode, selectMode, setGameMode, useGameStore } from '@entities/game'
import { setZoom } from '@entities/zoom'
import { BASE_URL } from '@shared/config'
import { useEffect, useRef, useState } from 'react'
import { useControls } from 'react-zoom-pan-pinch'
import { getNextMovementMode } from '../../lib'
import * as C from './MovementsButton.components'

type SavedTransform = {
  positionX: number
  positionY: number
  scale: number
}

export const MovementsButton = () => {
  const gameMode = useGameStore(selectMode)
  const { resetTransform, setTransform, instance } = useControls()
  const selected = gameMode === GameMode.MOVEMENT
  const [lastMode, setLastMode] = useState(gameMode)
  const savedTransform = useRef<SavedTransform | null>(null)

  useEffect(() => {
    if (selected) {
      // Save only on enter — effect can re-run after resetTransform and
      // would otherwise overwrite the real zoom with scale 1.
      if (!savedTransform.current) {
        const { scale, positionX, positionY } = instance.transformState
        savedTransform.current = { scale, positionX, positionY }
        resetTransform(0)
      }
      return
    }

    const saved = savedTransform.current
    if (saved) {
      savedTransform.current = null
      const { positionX, positionY, scale } = saved
      // Wait a frame so TransformWrapper is enabled again after MOVEMENT.
      requestAnimationFrame(() => {
        setTransform(positionX, positionY, scale, 0)
        setZoom(scale)
      })
    }
    setLastMode(gameMode)
  }, [gameMode, instance, resetTransform, selected, setTransform])

  return (
    <C.Button
      $selected={selected}
      onClick={() => setGameMode(getNextMovementMode(gameMode, lastMode))}
      type="button"
    >
      <C.Image src={`${BASE_URL}images/movement/back.avif`} alt="" />
    </C.Button>
  )
}

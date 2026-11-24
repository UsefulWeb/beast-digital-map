import { ClassNames } from '@emotion/react'
import { BoardRoot } from '@entities/board'
import { GameMode, ModeSwitch, selectMode, useGameStore } from '@entities/game'
import type { MapData } from '@entities/map'
import { HelpControl } from '@features/help'
import { useKeyboardControls } from '@features/keyboard-controls'
import { useImageSize } from '@shared/lib'
import { Toolbar } from '@widgets/toolbar'
import { useCallback, useRef, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import { BoardMap } from '../BoardMap'

export type BoardProps = {
  data: MapData
  mapUrl: string
}

/**
 * Chrome keeps a fixed bitmap while `will-change: transform` is set, so zoom
 * looks soft. Use it only during the gesture; drop it on idle so the layer
 * re-rasters at the current scale.
 */
const BoardContent = (props: {
  mapUrl: string
  width: number
  height: number
  ratio: number
  transforming: boolean
}) => {
  const { mapUrl, width, height, ratio, transforming } = props
  useKeyboardControls()

  return (
    <>
      <Toolbar />
      <ModeSwitch />
      <HelpControl />
      <ClassNames>
        {({ css }) => (
          <TransformComponent
            contentClass={css`
              ${transforming ? 'will-change: transform;' : ''}
            `}
          >
            <BoardMap
              src={mapUrl}
              width={width}
              height={height}
              ratio={ratio}
            />
          </TransformComponent>
        )}
      </ClassNames>
    </>
  )
}

export const Board = (props: BoardProps) => {
  const { mapUrl, data } = props
  const gameMode = useGameStore(selectMode)
  const [width, height, ratio] = useImageSize(data.settings)
  const [transforming, setTransforming] = useState(false)
  const idleFrame = useRef(0)

  const beginTransform = useCallback(() => {
    cancelAnimationFrame(idleFrame.current)
    setTransforming(true)
  }, [])

  const endTransform = useCallback(() => {
    // Drop will-change on the next frame so Chrome re-rasters crisp.
    cancelAnimationFrame(idleFrame.current)
    idleFrame.current = requestAnimationFrame(() => {
      setTransforming(false)
    })
  }, [])

  return (
    <BoardRoot>
      <TransformWrapper
        doubleClick={{ disabled: true }}
        disabled={gameMode === GameMode.MOVEMENT}
        onPanningStart={beginTransform}
        onPanningStop={endTransform}
        onPinchingStart={beginTransform}
        onPinchingStop={endTransform}
        onZoomStart={beginTransform}
        onZoomStop={endTransform}
        onWheelStart={beginTransform}
        onWheelStop={endTransform}
      >
        <BoardContent
          mapUrl={mapUrl}
          width={width}
          height={height}
          ratio={ratio}
          transforming={transforming}
        />
      </TransformWrapper>
    </BoardRoot>
  )
}

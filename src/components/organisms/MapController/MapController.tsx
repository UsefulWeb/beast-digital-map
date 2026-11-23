import classnames from 'classnames'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import {
  selectMode,
  useGameModeStore,
} from '../../../features/gameMode/gameModeSlice'
import { useImageSize } from '../../../shared/lib'
import { GameMode } from '../../../shared/util/common'
import type { IMapData } from '../../../shared/util/interfaces'
import { ButtonControls, GameMap, KeyboardControls } from '../..'
import S from './MapController.module.scss'

export interface GameMapProps {
  className?: string
  data: IMapData
  mapUrl: string
}

export const MapController = (props: GameMapProps) => {
  const { mapUrl, className, data } = props

  const gameMode = useGameModeStore(selectMode)
  const [width, height, ratio] = useImageSize(data.settings)

  const doubleClickOptions = {
    disabled: true,
  }

  return (
    <div className={classnames(className, S.container)}>
      <TransformWrapper
        doubleClick={doubleClickOptions}
        disabled={gameMode === GameMode.MOVEMENT}
      >
        <ButtonControls />
        <KeyboardControls />
        <TransformComponent contentClass={S.content} wrapperClass={S.warpper}>
          <GameMap src={mapUrl} width={width} height={height} ratio={ratio} />
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}

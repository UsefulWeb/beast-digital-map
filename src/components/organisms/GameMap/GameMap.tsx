import classnames from 'classnames'
import { type CSSProperties, useState } from 'react'
import {
  selectMode,
  useGameModeStore,
} from '../../../features/gameMode/gameModeSlice'
import { GameMode, px } from '../../../shared/util/common'
import { CardMovements, MapLocationList, MapLocationPath } from '../..'
import S from './GameMap.module.scss'

export interface GameMapProps {
  src: string
  width: number
  height: number
  ratio: number
}

export const GameMap = (props: GameMapProps) => {
  const { width, height, ratio, src } = props

  const mode = useGameModeStore(selectMode)

  const [loaded, setLoaded] = useState(false)

  const mainStyle: CSSProperties = {
    width: px(width),
    height: px(height),
  }

  const imageClassName = classnames(S.image, {
    [S.image_loading]: !loaded,
    [S.image_hidden]: mode === GameMode.MOVEMENT,
  })

  return (
    <div className={S.container}>
      <div className={S.main} style={mainStyle}>
        <img
          src={src}
          className={imageClassName}
          onLoad={() => setLoaded(true)}
          alt=""
        />
        {loaded && (
          <>
            {mode !== GameMode.MOVEMENT && <MapLocationList ratio={ratio} />}
            {mode === GameMode.PATH && (
              <MapLocationPath width={width} height={height} ratio={ratio} />
            )}
            {mode === GameMode.MOVEMENT && <CardMovements />}
          </>
        )}
      </div>
    </div>
  )
}

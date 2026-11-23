import classnames from 'classnames'
import type { MapLocationType } from '../../../../shared/util/interfaces'
import { MapLocationImageList } from '../../../../shared/util/locations'
import S from './MapLocationImage.module.scss'

export interface MapLocationImageProps {
  type: MapLocationType
  ratio: number
  locationSize: number
  className?: string
}

export const MapLocationImage = (props: MapLocationImageProps) => {
  const { type, className } = props
  const { url } = MapLocationImageList[type]

  return <img src={url} className={classnames(className, S.image)} alt="" />
}

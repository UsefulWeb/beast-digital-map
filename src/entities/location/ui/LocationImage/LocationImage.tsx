import { TERRAIN_IMAGES } from '../../lib'
import type { Terrain } from '../../model'
import * as C from './LocationImage.components'

export type LocationImageProps = {
  type: Terrain
  ratio: number
  locationSize: number
}

export const LocationImage = (props: LocationImageProps) => {
  const { type } = props
  const { url } = TERRAIN_IMAGES[type]
  return <C.Image src={url} alt="" />
}

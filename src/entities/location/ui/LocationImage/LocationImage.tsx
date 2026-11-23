import styled from '@emotion/styled'
import { TERRAIN_IMAGES } from '../../lib'
import type { Terrain } from '../../model'

export type LocationImageProps = {
  type: Terrain
  ratio: number
  locationSize: number
}

const Image = styled.img`
  position: absolute;
  left: -6%;
  top: -9%;
  width: 114%;
  height: 114%;
  object-fit: contain;
`

export const LocationImage = (props: LocationImageProps) => {
  const { type } = props
  const { url } = TERRAIN_IMAGES[type]
  return <Image src={url} alt="" />
}

import * as C from './HomeLogo.components'

export type HomeLogoProps = {
  src: string
  alt?: string
}

export const HomeLogo = (props: HomeLogoProps) => {
  const { src, alt = '' } = props
  return <C.Logo src={src} alt={alt} />
}

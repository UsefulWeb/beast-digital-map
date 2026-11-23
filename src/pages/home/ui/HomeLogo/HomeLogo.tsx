import styled from '@emotion/styled'

export type HomeLogoProps = {
  src: string
  alt?: string
}

const Logo = styled.img`
  max-width: 100%;
  height: 100px;
  object-fit: contain;
`

export const HomeLogo = (props: HomeLogoProps) => {
  const { src, alt = '' } = props
  return <Logo src={src} alt={alt} />
}

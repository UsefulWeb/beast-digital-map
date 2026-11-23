import styled from '@emotion/styled'
import { type ReactNode, useState } from 'react'

export type BoardImageProps = {
  src: string
  dimmed?: boolean
  children?: ReactNode
}

const Img = styled.img<{ $dimmed?: boolean; $hidden?: boolean }>`
  width: 100%;
  height: 100%;
  transition: 0.3s filter ease-in-out;
  visibility: ${({ $hidden }) => ($hidden ? 'hidden' : 'visible')};
  filter: ${({ $dimmed }) => ($dimmed ? 'blur(5px) grayscale(1)' : undefined)};
`

export const BoardImage = (props: BoardImageProps) => {
  const { src, dimmed = false, children } = props
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <Img
        src={src}
        $dimmed={dimmed}
        $hidden={dimmed}
        onLoad={() => setLoaded(true)}
        alt=""
      />
      {loaded && children}
    </>
  )
}

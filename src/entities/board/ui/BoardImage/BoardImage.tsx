import { type ReactNode, useState } from 'react'
import * as C from './BoardImage.components'

export type BoardImageProps = {
  src: string
  dimmed?: boolean
  children?: ReactNode
}

export const BoardImage = (props: BoardImageProps) => {
  const { src, dimmed = false, children } = props
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <C.Img
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

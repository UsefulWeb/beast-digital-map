import type { CSSProperties, ReactNode } from 'react'
import * as C from './BoardFrame.components'

export type BoardFrameProps = {
  children: ReactNode
  width: string
  height: string
}

export const BoardFrame = (props: BoardFrameProps) => {
  const { children, width, height } = props
  const style: CSSProperties = { width, height }

  return (
    <C.Viewport>
      <C.Main style={style}>{children}</C.Main>
    </C.Viewport>
  )
}

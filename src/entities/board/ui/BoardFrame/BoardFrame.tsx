import styled from '@emotion/styled'
import type { CSSProperties, ReactNode } from 'react'

export type BoardFrameProps = {
  children: ReactNode
  width: string
  height: string
}

const Viewport = styled.div`
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Main = styled.div`
  position: relative;
  box-sizing: border-box;
`

export const BoardFrame = (props: BoardFrameProps) => {
  const { children, width, height } = props
  const style: CSSProperties = { width, height }

  return (
    <Viewport>
      <Main style={style}>{children}</Main>
    </Viewport>
  )
}

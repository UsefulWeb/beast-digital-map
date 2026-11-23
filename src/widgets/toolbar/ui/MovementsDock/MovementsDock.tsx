import styled from '@emotion/styled'
import type { ReactNode } from 'react'

export type MovementsDockProps = {
  children: ReactNode
}

const Dock = styled.div`
  position: fixed;
  z-index: 7;

  @media (orientation: landscape) {
    right: 2vh;
    bottom: 2vh;
  }

  @media (orientation: portrait) {
    right: 3vw;
    bottom: 20vw;

    @media (min-height: 1024px) {
      bottom: 3vw;
    }
  }
`

export const MovementsDock = (props: MovementsDockProps) => {
  const { children } = props
  return <Dock>{children}</Dock>
}

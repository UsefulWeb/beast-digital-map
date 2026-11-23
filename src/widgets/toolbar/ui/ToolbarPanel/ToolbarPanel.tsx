import styled from '@emotion/styled'
import { BASE_URL } from '@shared/config'
import { Stack } from '@shared/ui'
import type { ReactNode } from 'react'

export type ToolbarPanelProps = {
  children: ReactNode
}

const Panel = styled(Stack)`
  background: url(${BASE_URL}images/ui/navigation-background.png) no-repeat;
  background-size: cover;
  position: fixed;
  padding: 1.5em 0;
  box-sizing: border-box;
  z-index: 3;
  top: 0;
  left: 0;
  width: fit-content;
  height: 100%;
  box-shadow: 1px 0 10px #ffffff20;
  font-size: 1.5vmin;

  &:after {
    content: '';
    display: block;
    width: 0.5em;
    height: 100%;
    position: absolute;
    left: 100%;
    top: 0;
    background: url(${BASE_URL}images/ui/border-vertical.png) center center
      no-repeat;
    background-size: cover;
  }

  @media (orientation: landscape) {
    @media (min-height: 600px) {
      font-size: 10px;
    }
  }

  @media (orientation: portrait) {
    font-size: 1.7vw;
    padding: 1em;
    bottom: 0;
    top: auto;
    height: auto;
    width: 100%;

    &:after {
      left: 0;
      bottom: 100%;
      background-image: url(${BASE_URL}images/ui/border-horizontal.png);
      height: 0.5em;
      width: 100%;
    }

    @media (min-height: 1024px) {
      padding: 0 2em 1em 1em;
      font-size: 12px;
      top: 0;
      bottom: auto;

      &:after {
        bottom: auto;
        top: 100%;
      }
    }
  }
`

export const ToolbarPanel = (props: ToolbarPanelProps) => {
  const { children } = props
  return (
    <Panel justify="space-between" portrait="row">
      {children}
    </Panel>
  )
}

import styled from '@emotion/styled'
import type { ReactNode } from 'react'

export type BoardRootProps = {
  children: ReactNode
}

const Root = styled.div`
  position: relative;
`

export const BoardRoot = (props: BoardRootProps) => {
  const { children } = props
  return <Root>{children}</Root>
}

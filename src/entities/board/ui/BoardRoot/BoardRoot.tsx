import type { ReactNode } from 'react'
import * as C from './BoardRoot.components'

export type BoardRootProps = {
  children: ReactNode
}

export const BoardRoot = (props: BoardRootProps) => {
  const { children } = props
  return <C.Root>{children}</C.Root>
}

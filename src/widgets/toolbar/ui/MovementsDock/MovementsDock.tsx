import type { ReactNode } from 'react'
import * as C from './MovementsDock.components'

export type MovementsDockProps = {
  children: ReactNode
}

export const MovementsDock = (props: MovementsDockProps) => {
  const { children } = props
  return <C.Dock>{children}</C.Dock>
}

import type { ReactNode } from 'react'
import * as C from './HomeLayout.components'

export type HomeLayoutProps = {
  children: ReactNode
}

export const HomeLayout = (props: HomeLayoutProps) => {
  const { children } = props
  return (
    <C.Layout align="center" justify="center">
      {children}
    </C.Layout>
  )
}

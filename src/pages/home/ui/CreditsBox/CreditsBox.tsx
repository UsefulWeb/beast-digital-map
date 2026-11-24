import type { ReactNode } from 'react'
import * as C from './CreditsBox.components'

export type CreditsBoxProps = {
  children: ReactNode
}

export const CreditsBox = (props: CreditsBoxProps) => {
  const { children } = props
  return <C.Box>{children}</C.Box>
}

import { OfflineBadge } from '@shared/ui'
import type { ReactNode } from 'react'
import * as C from './AppShell.components'

export type AppShellProps = {
  children: ReactNode
}

export const AppShell = (props: AppShellProps) => {
  const { children } = props
  return (
    <C.Shell align="center" justify="center">
      <OfflineBadge />
      {children}
    </C.Shell>
  )
}

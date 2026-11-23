import styled from '@emotion/styled'
import { Stack } from '@shared/ui'
import type { ReactNode } from 'react'

export type AppShellProps = {
  children: ReactNode
}

const Shell = styled(Stack)`
  height: 100vh;
`

export const AppShell = (props: AppShellProps) => {
  const { children } = props
  return (
    <Shell align="center" justify="center">
      {children}
    </Shell>
  )
}

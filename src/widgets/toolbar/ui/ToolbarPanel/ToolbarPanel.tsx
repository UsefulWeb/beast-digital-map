import type { ReactNode } from 'react'
import * as C from './ToolbarPanel.components'

export type ToolbarPanelProps = {
  children: ReactNode
}

export const ToolbarPanel = (props: ToolbarPanelProps) => {
  const { children } = props
  return (
    <C.Panel justify="space-between" align="center" portrait="row">
      {children}
    </C.Panel>
  )
}

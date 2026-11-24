import { selectHelpActive, useGameStore } from '@entities/game'
import type { ReactNode } from 'react'
import * as C from './HelpTip.components'

export type HelpTipProps = {
  label: string
  children: ReactNode
  align?: 'center' | 'end'
}

export const HelpTip = (props: HelpTipProps) => {
  const { label, children, align = 'center' } = props
  const helpActive = useGameStore(selectHelpActive)

  if (!helpActive) {
    return <>{children}</>
  }

  return (
    <C.Anchor>
      {children}
      <C.Badge $align={align}>{label}</C.Badge>
    </C.Anchor>
  )
}

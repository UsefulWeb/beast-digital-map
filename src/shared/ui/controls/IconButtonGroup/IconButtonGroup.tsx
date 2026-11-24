import type { ReactNode } from 'react'
import * as C from './IconButtonGroup.components'

export type IconButtonGroupProps = {
  children: ReactNode
  direction?: 'column' | 'row'
  variant?: 'primary' | 'back' | 'history' | 'zoom'
}

export const IconButtonGroup = (props: IconButtonGroupProps) => {
  const { children, direction = 'column', variant = 'primary' } = props
  return (
    <C.Root $direction={direction} $variant={variant}>
      {children}
    </C.Root>
  )
}

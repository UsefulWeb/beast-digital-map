import type React from 'react'
import type { PropsWithChildren } from 'react'
import * as C from './Button.components'

export type ButtonProps = PropsWithChildren<{
  as?: React.ElementType
  onClick?: React.MouseEventHandler
}>

export const Button = (props: ButtonProps) => {
  const { as = 'button', children, ...rest } = props

  return (
    <C.Root as={as} {...rest}>
      {children}
    </C.Root>
  )
}

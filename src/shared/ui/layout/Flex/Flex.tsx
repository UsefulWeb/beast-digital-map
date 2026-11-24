import { pickDefined } from '@shared/lib'
import type { CSSProperties, ElementType, ReactNode } from 'react'
import * as C from './Flex.components'

export type FlexProps = {
  children?: ReactNode
  as?: ElementType
  direction?: 'row' | 'column'
  gap?: CSSProperties['gap']
  align?: CSSProperties['alignItems']
  justify?: CSSProperties['justifyContent']
  padding?: CSSProperties['padding']
  wrap?: boolean
  grow?: number
  shrink?: number
  fullWidth?: boolean
  fullHeight?: boolean
  order?: number
  portrait?: 'row' | 'column'
  portraitOrder?: number
  portraitJustify?: CSSProperties['justifyContent']
  portraitGrow?: number
}

export const Flex = (props: FlexProps) => {
  const {
    as = 'div',
    children,
    direction = 'column',
    gap,
    align,
    justify,
    padding,
    wrap,
    grow,
    shrink,
    fullWidth,
    fullHeight,
    order,
    portrait,
    portraitOrder,
    portraitJustify,
    portraitGrow,
    ...rest
  } = props

  return (
    <C.Root
      as={as}
      $direction={direction}
      {...pickDefined({
        $gap: gap,
        $align: align,
        $justify: justify,
        $padding: padding,
        $wrap: wrap,
        $grow: grow,
        $shrink: shrink,
        $fullWidth: fullWidth,
        $fullHeight: fullHeight,
        $order: order,
        $portrait: portrait,
        $portraitOrder: portraitOrder,
        $portraitJustify: portraitJustify,
        $portraitGrow: portraitGrow,
      })}
      {...rest}
    >
      {children}
    </C.Root>
  )
}

import styled from '@emotion/styled'
import { pickDefined } from '@shared/lib'
import type { CSSProperties, ElementType, ReactNode } from 'react'

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
}

const Root = styled.div<{
  $direction: 'row' | 'column'
  $gap?: CSSProperties['gap']
  $align?: CSSProperties['alignItems']
  $justify?: CSSProperties['justifyContent']
  $padding?: CSSProperties['padding']
  $wrap?: boolean
  $grow?: number
  $shrink?: number
  $fullWidth?: boolean
  $fullHeight?: boolean
  $order?: number
  $portrait?: 'row' | 'column'
  $portraitOrder?: number
  $portraitJustify?: CSSProperties['justifyContent']
}>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  gap: ${({ $gap }) => (typeof $gap === 'number' ? `${$gap}px` : $gap)};
  align-items: ${({ $align }) => $align};
  justify-content: ${({ $justify }) => $justify};
  padding: ${({ $padding }) =>
    typeof $padding === 'number' ? `${$padding}px` : $padding};
  flex-wrap: ${({ $wrap }) => ($wrap ? 'wrap' : undefined)};
  flex-grow: ${({ $grow }) => $grow};
  flex-shrink: ${({ $shrink }) => $shrink};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : undefined)};
  height: ${({ $fullHeight }) => ($fullHeight ? '100%' : undefined)};
  order: ${({ $order }) => $order};
  box-sizing: border-box;

  @media (orientation: portrait) {
    ${({ $portrait }) =>
      $portrait ? `flex-direction: ${$portrait};` : undefined}
    ${({ $portraitOrder }) =>
      $portraitOrder !== undefined ? `order: ${$portraitOrder};` : undefined}
    ${({ $portraitJustify }) =>
      $portraitJustify ? `justify-content: ${$portraitJustify};` : undefined}
  }
`

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
    ...rest
  } = props

  return (
    <Root
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
      })}
      {...rest}
    >
      {children}
    </Root>
  )
}

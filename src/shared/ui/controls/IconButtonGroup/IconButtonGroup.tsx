import styled from '@emotion/styled'
import type { ReactNode } from 'react'

export type IconButtonGroupProps = {
  children: ReactNode
  direction?: 'column' | 'row'
  variant?: 'primary' | 'back' | 'history' | 'zoom'
}

const Root = styled.div<{
  $direction: 'column' | 'row'
  $variant: IconButtonGroupProps['variant']
}>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  gap: 1em;
  order: 2;

  ${({ $variant }) =>
    $variant === 'history' &&
    `
    padding: 1em 0.4em 0;
  `}

  ${({ $variant }) =>
    $variant === 'zoom' &&
    `
    padding-left: 1.1em;
    @media (orientation: portrait) {
      padding-top: 1.1em;
    }
  `}

  @media (orientation: portrait) {
    flex-direction: row;
    ${({ $variant }) =>
      $variant === 'primary' &&
      `
      justify-content: start;
    `}
    ${({ $variant }) =>
      $variant === 'back' &&
      `
      order: 1;
    `}
  }
`

export const IconButtonGroup = (props: IconButtonGroupProps) => {
  const { children, direction = 'column', variant = 'primary' } = props
  return (
    <Root $direction={direction} $variant={variant}>
      {children}
    </Root>
  )
}

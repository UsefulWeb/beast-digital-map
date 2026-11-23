import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { BASE_URL } from '@shared/config'
import type React from 'react'
import type { PropsWithChildren } from 'react'

export type ButtonProps = PropsWithChildren<{
  as?: React.ElementType
  variant?: 'default' | 'fixed'
  onClick?: React.MouseEventHandler
}>

const fixedTypeStyles = css`
  background: url(${BASE_URL}images/ui/button-background.png) center center
    no-repeat;
  font-size: 10vw;
  background-size: 100%;
  padding: 0 0.633em;
  width: 9.1195em;
  height: 2.16em;
  line-height: 0.8152;

  &:hover {
    background-color: transparent;
    filter: brightness(0.9);
  }

  @media (min-width: 500px) {
    font-size: 50px;
  }
`

const Root = styled.button<{ $variant: 'default' | 'fixed' }>`
  font-size: 40px;
  padding: 10px;
  background-color: #ffa92c;
  border: none;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: #fdd39b;
  }

  &:active {
    position: relative;
    top: 2px;
    left: 2px;
  }

  @media (min-height: 768px) {
    font-size: 50px;
    padding: 20px;
  }

  ${({ $variant }) => $variant === 'fixed' && fixedTypeStyles}
`

export const Button = (props: ButtonProps) => {
  const { as = 'button', variant = 'default', children, ...rest } = props

  return (
    <Root as={as} $variant={variant} {...rest}>
      {children}
    </Root>
  )
}

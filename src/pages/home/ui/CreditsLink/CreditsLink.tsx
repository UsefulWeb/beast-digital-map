import styled from '@emotion/styled'
import type { ReactNode } from 'react'

export type CreditsLinkProps = {
  href: string
  children: ReactNode
}

const Author = styled.a`
  position: relative;
  display: inline-block;
  color: inherit;

  &:after {
    content: '';
    position: absolute;
    top: calc(100% - 1px);
    left: -1px;
    width: calc(100% + 4px);
    height: 0.5px;
    background: radial-gradient(
      circle at center,
      #ff780a 0,
      orangered 15%,
      red
    );
  }

  &:hover:after {
    display: none;
  }
`

export const CreditsLink = (props: CreditsLinkProps) => {
  const { href, children } = props
  return (
    <Author target="_blank" href={href} rel="noopener">
      {children}
    </Author>
  )
}

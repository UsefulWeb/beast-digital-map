import type { ReactNode } from 'react'
import * as C from './CreditsLink.components'

export type CreditsLinkProps = {
  href: string
  children: ReactNode
}

export const CreditsLink = (props: CreditsLinkProps) => {
  const { href, children } = props
  return (
    <C.Author target="_blank" href={href} rel="noopener">
      {children}
    </C.Author>
  )
}

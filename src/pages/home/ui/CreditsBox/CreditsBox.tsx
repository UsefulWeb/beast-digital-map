import styled from '@emotion/styled'
import type { ReactNode } from 'react'

export type CreditsBoxProps = {
  children: ReactNode
}

const Box = styled.div`
  font-size: 12px;
  background: #ffffff60;
  padding: 10px;
  border-radius: 4px;
  color: #000000;
`

export const CreditsBox = (props: CreditsBoxProps) => {
  const { children } = props
  return <Box>{children}</Box>
}

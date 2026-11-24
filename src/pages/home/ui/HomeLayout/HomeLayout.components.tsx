import styled from '@emotion/styled'
import { BASE_URL } from '@shared/config'
import { Stack } from '@shared/ui'

export const Layout = styled(Stack)`
  height: 100vh;
  width: 100%;
  background: url(${BASE_URL}images/ui/page-background.avif) top center no-repeat;
  background-size: cover;
  padding: 10px;
  gap: 10px;

  @media (min-height: 768px) {
    gap: 30px;
  }
`

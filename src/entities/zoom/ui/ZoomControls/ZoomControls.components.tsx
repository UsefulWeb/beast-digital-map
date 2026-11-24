import styled from '@emotion/styled'
import { Stack } from '@shared/ui'

export const ZoomRow = styled(Stack)`
  @media (orientation: portrait) {
    gap: 0;
  }
`

export const ZoomOutSlot = styled.div`
  margin-top: -0.7em;

  @media (orientation: portrait) {
    margin-top: 0;
    /* pull toward zoom-in: icon has right-side handle, so circles sit farther apart */
    margin-left: -2.2em;
  }
`

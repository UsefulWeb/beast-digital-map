import styled from '@emotion/styled'

export const Root = styled.svg`
  position: absolute;
  inset: 0;
  /* Above location fills/glow (5), below wait/meeple (7/8); clicks pass through */
  z-index: 6;
  pointer-events: none;
`

export const Line = styled.path<{ $strokeWidth: number }>`
  fill: none;
  stroke-width: ${({ $strokeWidth }) => $strokeWidth};
  stroke-linecap: round;
  stroke-linejoin: round;
`

import styled from '@emotion/styled'

export const Root = styled.div<{
  $direction: 'column' | 'row'
  $variant?: 'primary' | 'back' | 'history' | 'zoom'
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

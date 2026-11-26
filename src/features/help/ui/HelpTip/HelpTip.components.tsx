import styled from '@emotion/styled'

export const Anchor = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Badge = styled.span<{ $align?: 'center' | 'end' }>`
  position: absolute;
  z-index: 6;
  top: calc(100% + 0.25em);
  ${({ $align }) =>
    $align === 'end'
      ? `
    right: 0;
    left: auto;
    transform: none;
  `
      : `
    left: 50%;
    transform: translateX(-50%);
  `}
  white-space: nowrap;
  padding: 0.2em 0.45em;
  border-radius: 0.3em;
  background: rgb(12 10 8 / 90%);
  color: var(--color-accent);
  /* absolute size — dock is outside toolbar font-size context */
  font-size: 1.55vmin;
  font-weight: 700;
  line-height: 1.2;
  pointer-events: none;
  box-shadow: 0 0.15em 0.5em rgb(0 0 0 / 45%);
  border: 1px solid rgb(255 169 44 / 40%);

  @media (orientation: landscape) and (min-height: 600px) {
    font-size: 11px;
  }

  @media (orientation: portrait) {
    font-size: 2.1vw;
    /* toolbar is at the bottom — keep labels above the buttons */
    top: auto;
    bottom: calc(100% + 0.25em);

    @media (min-height: 1024px) {
      font-size: 12px;
      /* toolbar flips to the top — labels go below again */
      top: calc(100% + 0.25em);
      bottom: auto;
    }
  }
`

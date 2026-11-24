import styled from '@emotion/styled'

export const ClearSlot = styled.div`
  @media (orientation: portrait) {
    font-size: 1.2em;
    margin-top: 0.85em;

    /* toolbar docks on top — drop column offset so bar matches bottom height */
    @media (min-height: 1024px) {
      margin-top: 0;
    }
  }
`

export const HistorySlot = styled.div`
  padding: 1em 0.4em 0;

  @media (orientation: portrait) and (min-height: 1024px) {
    padding: 0 0.4em;
  }
`

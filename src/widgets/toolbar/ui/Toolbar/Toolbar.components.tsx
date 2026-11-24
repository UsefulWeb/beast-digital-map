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

const LOCK_SIZE = '6.5em'

export const LockSlot = styled.div<{ $open?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  width: ${LOCK_SIZE};
  height: ${LOCK_SIZE};
  flex-shrink: 0;
  line-height: 0;
  overflow: visible;
  box-sizing: content-box;

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    max-width: none;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: visible;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    display: block;
  }

  @media (orientation: landscape) {
    position: relative;
    left: ${({ $open }) => ($open ? '0.55em' : '0')};
    padding-top: 0.4em;
    margin-top: 0.2em;
    margin-bottom: 0.55em;
  }

  @media (orientation: portrait) {
    position: relative;
    left: ${({ $open }) => ($open ? '0.35em' : '0')};
    margin-top: 0.85em;
    margin-bottom: 0.35em;

    @media (min-height: 1024px) {
      margin-top: 0;
      margin-bottom: 0;
    }
  }
`

export const HistorySlot = styled.div`
  padding: 1em 0.4em 0;

  @media (orientation: portrait) and (min-height: 1024px) {
    padding: 0 0.4em;
  }
`

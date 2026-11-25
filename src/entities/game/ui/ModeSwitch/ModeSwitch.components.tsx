import styled from '@emotion/styled'

export const Root = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  /* above help tips/backdrop so modes stay usable while tips are open */
  z-index: 21;
  display: flex;
  justify-content: center;
  padding: 0.5em;
  pointer-events: none;
  font-size: clamp(14px, 4.2vmin, 22px);

  @media (orientation: portrait) {
    font-size: clamp(16px, 5.5vw, 24px);

    @media (min-height: 1024px) {
      top: auto;
      bottom: 0;
      font-size: 16px;
    }
  }

  @media (orientation: landscape) and (min-height: 600px) {
    font-size: 16px;
  }
`

export const List = styled.div<{ $help?: boolean }>`
  display: inline-flex;
  gap: ${({ $help }) => ($help ? '0.85em' : '0.5em')};
  padding: ${({ $help }) => ($help ? '0.55em 0.7em 0.65em' : '0.5em')};
  border-radius: 0.5em;
  background: rgb(0 0 0 / 50%);
  pointer-events: auto;
`

export const Item = styled.button<{ $active: boolean; $help?: boolean }>`
  position: relative;
  width: ${({ $help }) => ($help ? '4.2em' : '2em')};
  height: ${({ $help }) => ($help ? 'auto' : '2em')};
  min-height: 2em;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35em;
  filter: ${({ $active }) => ($active ? 'none' : 'grayscale(1)')};

  &:hover {
    filter: ${({ $active }) =>
      $active ? 'brightness(1.1)' : 'grayscale(0.4)'};
  }

  img {
    width: 2em;
    height: 2em;
    display: block;
    object-fit: contain;
    flex-shrink: 0;
  }

  @media (orientation: portrait) and (min-height: 1024px) {
    flex-direction: column-reverse;
  }
`

export const Hint = styled.span<{ $active?: boolean }>`
  width: 100%;
  padding: 0.22em 0.35em;
  border-radius: 0.3em;
  background: rgb(12 10 8 / 90%);
  color: ${({ $active }) =>
    $active ? 'var(--color-hover)' : 'var(--color-accent)'};
  border: 1px solid
    ${({ $active }) =>
      $active ? 'var(--color-hover)' : 'rgb(255 169 44 / 40%)'};
  font-size: 0.55em;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  line-height: 1.15;
  text-align: center;
  white-space: nowrap;
  pointer-events: none;
  box-sizing: border-box;
`

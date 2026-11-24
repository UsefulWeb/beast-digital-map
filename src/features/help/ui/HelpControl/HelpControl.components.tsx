import styled from '@emotion/styled'

export const Backdrop = styled.button`
  position: fixed;
  inset: 0;
  z-index: 19;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  cursor: default;
`

export const Root = styled.div`
  position: fixed;
  top: calc(0.75em + env(safe-area-inset-top, 0px));
  right: calc(1em + env(safe-area-inset-right, 0px));
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.65em;
  pointer-events: none;
  font-size: 1.7vmin;

  @media (orientation: landscape) and (min-height: 600px) {
    font-size: 12px;
  }

  @media (orientation: portrait) {
    font-size: 2.4vw;

    /* same breakpoint as ToolbarPanel top dock — sit under the bar, top-right */
    @media (min-height: 1024px) {
      font-size: 14px;
      /* toolbar ~8.1em@12px + border; keep a small gap below */
      top: calc(110px + env(safe-area-inset-top, 0px));
      right: calc(1em + env(safe-area-inset-right, 0px));
    }
  }
`

export const Panel = styled.aside`
  pointer-events: auto;
  width: min(22em, calc(100vw - 2.4em));
  max-height: min(70vh, 36em);
  overflow: auto;
  padding: 0.9em 1em 1em;
  border-radius: 0.55em;
  background: rgb(12 10 8 / 88%);
  color: #f3ebe0;
  box-shadow: 0 0.4em 1.4em rgb(0 0 0 / 45%);
  border: 1px solid rgb(255 169 44 / 35%);
`

export const PanelTitle = styled.h2`
  margin: 0 0 0.55em;
  font-size: 1.05em;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--color-hover);
`

export const Section = styled.section`
  & + & {
    margin-top: 0.85em;
    padding-top: 0.75em;
    border-top: 1px solid rgb(255 255 255 / 14%);
  }
`

export const SectionTitle = styled.h3`
  margin: 0 0 0.4em;
  font-size: 0.78em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: rgb(255 255 255 / 62%);
`

export const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.45em;
`

export const Item = styled.li`
  display: grid;
  grid-template-columns: 7.2em 1fr;
  gap: 0.55em;
  align-items: start;
  font-size: 1em;
  line-height: 1.4;
`

export const Label = styled.span`
  font-weight: 700;
  color: var(--color-accent);
`

export const Text = styled.span`
  color: rgb(243 235 224 / 92%);
`

export const Fab = styled.button<{ $active: boolean }>`
  pointer-events: auto;
  width: 2.2em;
  height: 2.2em;
  border-radius: 50%;
  border: 2px solid
    ${({ $active }) =>
      $active ? 'var(--color-hover)' : 'rgb(255 255 255 / 55%)'};
  background: ${({ $active }) =>
    $active ? 'rgb(255 169 44 / 92%)' : 'rgb(12 10 8 / 78%)'};
  color: ${({ $active }) => ($active ? '#1a1208' : '#f3ebe0')};
  font-size: 1em;
  font-weight: 800;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 0.25em 0.9em rgb(0 0 0 / 40%);
  display: grid;
  place-items: center;
  flex-shrink: 0;

  &:hover {
    border-color: var(--color-hover);
    color: ${({ $active }) => ($active ? '#1a1208' : 'var(--color-hover)')};
  }

  &:active {
    transform: translate(1px, 1px);
  }
`

export const FabMark = styled.span`
  font-size: 1.85em;
  font-weight: 800;
  line-height: 1;
  transform: translateY(0.02em);
`

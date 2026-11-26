import styled from '@emotion/styled'

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export const Markers = styled.svg`
  position: absolute;
  opacity: 0.92;
  width: 95%;
  height: 95%;
  left: 2.5%;
  top: 2.5%;
  filter: drop-shadow(0 0 1px rgb(255 255 255 / 70%));

  .wound {
    fill: var(--color-wound);
  }

  .slot {
    fill: rgb(17 17 17 / 22%);
  }
`

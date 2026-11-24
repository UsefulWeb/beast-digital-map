import styled from '@emotion/styled'
import { BASE_URL } from '@shared/config'
import { Stack } from '@shared/ui'

export const Panel = styled(Stack)`
  background: url(${BASE_URL}images/ui/navigation-background.avif) no-repeat;
  background-size: cover;
  position: fixed;
  padding: 1.5em 0;
  box-sizing: border-box;
  z-index: 3;
  top: 0;
  left: 0;
  width: fit-content;
  height: 100%;
  box-shadow: 1px 0 10px #ffffff20;
  font-size: 1.5vmin;

  &:after {
    content: '';
    display: block;
    width: 0.5em;
    height: 100%;
    position: absolute;
    left: 100%;
    top: 0;
    background: url(${BASE_URL}images/ui/border-vertical.avif) center center
      no-repeat;
    background-size: cover;
  }

  @media (orientation: landscape) {
    @media (min-height: 600px) {
      font-size: 10px;
    }
  }

  @media (orientation: portrait) {
    font-size: 1.7vw;
    /* icons read heavier at the bottom — bias padding upward */
    padding: 1.7em 1em 1.35em;
    bottom: 0;
    top: auto;
    height: auto;
    width: 100%;
    align-items: center;

    &:after {
      left: 0;
      bottom: 100%;
      background-image: url(${BASE_URL}images/ui/border-horizontal.avif);
      height: 0.5em;
      width: 100%;
    }

    @media (min-height: 1024px) {
      padding: 1.7em 1.5em 1.35em;
      font-size: 13px;
      top: 0;
      bottom: auto;

      &:after {
        bottom: auto;
        top: 100%;
      }
    }
  }
`

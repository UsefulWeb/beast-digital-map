import styled from '@emotion/styled'
import { BASE_URL } from '@shared/config'

export const Root = styled.div`
  top: -7%;
  left: -7%;
  width: 114%;
  height: 114%;
  position: absolute;

  &::before {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    left: 0.5%;
    top: -5%;
    background: url(${BASE_URL}images/ui/hourglass.svg) top center no-repeat;
    background-size: 20%;
  }
`

export const Markers = styled.svg`
  position: absolute;
  opacity: 0.9;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  filter: drop-shadow(0 0 1px black);
`

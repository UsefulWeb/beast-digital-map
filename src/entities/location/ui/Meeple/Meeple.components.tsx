import styled from '@emotion/styled'
import { BASE_URL } from '@shared/config'

export const Container = styled.div`
  position: absolute;
  z-index: 6;
  transform: translate(-50%, -50%);
  top: 100%;
  left: 50%;
  width: 100%;
  height: 100%;
  padding: 10%;
  box-sizing: border-box;
  pointer-events: auto;
  cursor: pointer;

  &:hover::after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10%;
    height: 10%;
    border-radius: 50%;
    box-shadow:
      0 0 10px #ffa92c,
      inset 0 0 10px #ffa930,
      0 0 30px red;
    background: radial-gradient(#ffa92c, #ff7709, #ff0000a1);
  }
`

export const Item = styled.div<{
  $slug: string
  $scale: number
  $outline: string
  $farmer?: boolean
}>`
  position: absolute;
  left: 20%;
  right: 20%;
  top: 20%;
  bottom: 20%;
  background-color: #e9e8e3;
  background-image: url(${({ $slug }) => `${BASE_URL}images/meeples/${$slug}.avif`});
  background-repeat: no-repeat;
  background-position: ${({ $farmer }) =>
    $farmer ? 'center right 20%' : 'center center'};
  background-size: ${({ $scale }) => `${80 * $scale}%`};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  outline: calc(1px / 1.5) solid ${({ $outline }) => $outline};
`

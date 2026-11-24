import styled from '@emotion/styled'
import { BASE_URL } from '@shared/config'

export const Root = styled.button`
  box-sizing: border-box;
  background: url(${BASE_URL}images/ui/button-background.png) center center
    no-repeat;
  background-size: 100%;
  background-color: transparent;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  text-decoration: none;
  font-size: 10vw;
  padding: 0 0.633em;
  width: 9.1195em;
  height: 2.16em;
  line-height: 0.8152;

  &:hover {
    filter: brightness(0.9);
  }

  &:active {
    position: relative;
    top: 2px;
    left: 2px;
  }

  @media (min-width: 500px) {
    font-size: 50px;
  }
`

import styled from '@emotion/styled'
import { Row } from '../../layout'

export const Shell = styled(Row)`
  position: fixed;
  top: 0;
  left: 10vw;
  right: 10vw;
  z-index: 4;
  height: 100vh;
  padding: 20px;
  gap: 5vw;

  @media (orientation: portrait) {
    left: 0;
    right: 0;
  }
`

export const Control = styled.div`
  display: flex;
  align-items: center;

  &:active {
    position: relative;
    top: 1px;
    left: 1px;
  }
`

export const Arrow = styled.img`
  max-width: 100%;
  max-height: 30vmin;
`

export const Frame = styled.div`
  display: inline-block;
  position: relative;
`

export const Index = styled.div`
  position: absolute;
  top: 1vw;
  font-size: 12vmin;
  text-align: center;
  width: 100%;
  color: black;
  text-shadow: 1px 1px 0 white;
`

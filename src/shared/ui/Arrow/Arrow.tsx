import styled from '@emotion/styled'
import type { CSSProperties } from 'react'
import type { ILocationPathListItem } from '../../util/interfaces'
import { getArrowPosition } from './arrowPosition'

const arrowImg = `${import.meta.env.BASE_URL}images/arrow_alt4.svg`

export interface ArrowProps {
  pathItem: ILocationPathListItem
  ratio: number
  isLast: boolean
}

const Container = styled.div<{ $isLast: boolean }>`
  position: absolute;
  z-index: 6;
  top: 0;
  left: 0;
  margin-top: -10px;
  margin-left: -11px;
  color: ${({ $isLast }) => ($isLast ? 'red' : 'inherit')};
`

const Icon = styled.img`
  position: absolute;
  transform-origin: 11px 10px;
  filter: drop-shadow(0 0 2px black);
`

const Text = styled.div`
  line-height: 1;
  position: absolute;
  z-index: 1;
  top: calc(50% + 0.7px);
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  text-shadow: 0 0 2px white;
`

export const Arrow = (props: ArrowProps) => {
  const { pathItem, ratio, isLast } = props

  const position = getArrowPosition({
    pathItem,
    ratio,
  })

  const { angle, top, left, scale } = position
  const defaultAngle = -90
  const { deg, rad } = angle
  const rotate = defaultAngle + deg

  const iconSize = scale * 20
  const halfSize = iconSize / 2

  const iconStyle: CSSProperties = {
    transform: `rotate(${rotate}deg)`,
    width: iconSize,
    height: iconSize,
    transformOrigin: `${halfSize}px ${halfSize}px`,
  }

  const containerStyle: CSSProperties = {
    top,
    left,
    width: iconSize,
    height: iconSize,
    marginTop: -halfSize,
    marginLeft: -halfSize,
  }

  const marginLeft = -scale * 2 * Math.cos(rad)
  const marginTop = -scale * 2 * Math.sin(rad)
  const textStyle: CSSProperties = {
    fontSize: scale * 10,
    width: iconSize,
    height: iconSize,
    marginLeft,
    marginTop,
  }

  return (
    <Container $isLast={isLast} style={containerStyle}>
      <Icon src={arrowImg} style={iconStyle} alt="" />
      <Text style={textStyle}>{pathItem.index + 1}</Text>
    </Container>
  )
}

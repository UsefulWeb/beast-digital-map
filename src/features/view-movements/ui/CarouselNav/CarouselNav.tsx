import styled from '@emotion/styled'
import { Row, Stack } from '@shared/ui'
import type { ReactNode } from 'react'

export type CarouselNavProps = {
  onPrev: () => void
  onNext: () => void
  hasPrev: boolean
  hasNext: boolean
  indexLabel: number
  prevIcon?: string
  nextIcon?: string
  children: ReactNode
}

const Shell = styled(Row)`
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

const Control = styled.div`
  display: flex;
  align-items: center;

  &:active {
    position: relative;
    top: 1px;
    left: 1px;
  }
`

const Arrow = styled.img`
  max-width: 100%;
  max-height: 30vmin;
`

const Frame = styled.div`
  display: inline-block;
  position: relative;
`

const Index = styled.div`
  position: absolute;
  top: 1vw;
  font-size: 12vmin;
  text-align: center;
  width: 100%;
  color: black;
  text-shadow: 1px 1px 0 white;
`

export const CarouselNav = (props: CarouselNavProps) => {
  const {
    onPrev,
    onNext,
    hasPrev,
    hasNext,
    indexLabel,
    prevIcon,
    nextIcon,
    children,
  } = props

  return (
    <Shell align="stretch" justify="center">
      <Control onClick={onPrev}>
        {hasPrev && prevIcon && <Arrow src={prevIcon} alt="" />}
      </Control>
      <Stack align="center" justify="center">
        <Frame>
          <Index>{indexLabel}</Index>
          {children}
        </Frame>
      </Stack>
      <Control onClick={onNext}>
        {hasNext && nextIcon && <Arrow src={nextIcon} alt="" />}
      </Control>
    </Shell>
  )
}

import type { ReactNode } from 'react'
import { Stack } from '../../layout'
import * as C from './CarouselNav.components'

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
    <C.Shell align="stretch" justify="center">
      <C.Control onClick={onPrev}>
        {hasPrev && prevIcon && <C.Arrow src={prevIcon} alt="" />}
      </C.Control>
      <Stack align="center" justify="center">
        <C.Frame>
          <C.Index>{indexLabel}</C.Index>
          {children}
        </C.Frame>
      </Stack>
      <C.Control onClick={onNext}>
        {hasNext && nextIcon && <C.Arrow src={nextIcon} alt="" />}
      </C.Control>
    </C.Shell>
  )
}

import styled from '@emotion/styled'
import type { MouseEventHandler } from 'react'

export interface IconButtonProps {
  onClick?: CallableFunction
  className?: string
  icon: string
  name: string
  disabled?: boolean
}

const Container = styled.div`
  /* layout shell — sizing comes from parent */
`

const Icon = styled.img<{ $disabled?: boolean }>`
  width: 100%;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  filter: ${({ $disabled }) =>
    $disabled ? 'grayscale(1)' : 'drop-shadow(0 0 10px #00000070)'};

  ${({ $disabled }) =>
    !$disabled &&
    `
    &:hover {
      filter: drop-shadow(0 0 10px #ffa92c);
    }

    &:active {
      position: relative;
      top: 1px;
      left: 1px;
    }
  `}
`

export const IconButton = (props: IconButtonProps) => {
  const { className, onClick = () => undefined, icon, name, disabled } = props

  const handleClick: MouseEventHandler<HTMLDivElement> = () => {
    if (!disabled) {
      onClick()
    }
  }

  return (
    <Container className={className} onClick={handleClick}>
      <Icon src={icon} alt={name} $disabled={disabled} />
    </Container>
  )
}

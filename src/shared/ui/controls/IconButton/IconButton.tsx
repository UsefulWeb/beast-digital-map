import type { MouseEventHandler } from 'react'
import * as C from './IconButton.components'

export type IconButtonProps = {
  onClick?: () => void
  icon: string
  name: string
  disabled?: boolean
  size?: 'control' | 'clear' | 'mode' | 'back' | 'history'
}

export const IconButton = (props: IconButtonProps) => {
  const {
    onClick = () => undefined,
    icon,
    name,
    disabled = false,
    size = 'control',
  } = props

  const handleClick: MouseEventHandler<HTMLDivElement> = () => {
    if (!disabled) {
      onClick()
    }
  }

  return (
    <C.Container
      $size={size}
      onClick={handleClick}
      title={name}
      role="button"
      aria-label={name}
    >
      <C.Icon src={icon} alt="" $disabled={disabled} />
    </C.Container>
  )
}

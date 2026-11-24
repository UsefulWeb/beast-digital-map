import { BASE_URL } from '@shared/config'
import * as C from './BackButton.components'

export type BackButtonProps = {
  onClick: () => void
  name?: string
}

export const BackButton = ({ onClick, name = 'Go back' }: BackButtonProps) => (
  <C.Button type="button" onClick={onClick} aria-label={name}>
    <img
      className="default"
      src={`${BASE_URL}images/ui/backbutton.avif`}
      alt=""
    />
    <img
      className="hover"
      src={`${BASE_URL}images/ui/backbuttonHover.avif`}
      alt=""
    />
  </C.Button>
)

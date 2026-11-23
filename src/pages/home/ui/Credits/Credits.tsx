import { CreditsBox } from '../CreditsBox'
import { CreditsLink } from '../CreditsLink'

export const Credits = () => (
  <CreditsBox>
    Made by{' '}
    <CreditsLink href="https://github.com/neizerth">@neizerth</CreditsLink>.
    <br />
    Background and logo are made by{' '}
    <CreditsLink href="https://studiomidhall.com/">Studio Midhall</CreditsLink>.
  </CreditsBox>
)

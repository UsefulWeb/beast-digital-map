import { css, Global } from '@emotion/react'
import { paletteCss } from './palette'

export const GlobalStyles = () => (
  <Global
    styles={css`
      ${paletteCss}
    `}
  />
)

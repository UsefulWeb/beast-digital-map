import styled from '@emotion/styled'

const base = `
  max-width: 8em;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const sizes = {
  control: `
    ${base}
    padding: 0 0.5em;
  `,
  clear: `
    ${base}
    position: relative;
    width: 6em;
    height: 5.5em;
  `,
  mode: `
    ${base}
    position: relative;
    padding: 0.5em 1em 0.3em 0.6em;
    left: 0.5em;
  `,
  back: `
    ${base}
    position: relative;
    left: -0.1em;
    padding: 0 0.5em;
  `,
  history: `
    ${base}
    width: 6.5em;
    height: 7em;
  `,
} as const

export const Container = styled.div<{ $size: keyof typeof sizes }>`
  ${({ $size }) => sizes[$size]}
`

export const Icon = styled.img<{ $disabled?: boolean }>`
  width: 100%;
  height: auto;
  display: block;
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

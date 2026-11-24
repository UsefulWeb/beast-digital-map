import styled from '@emotion/styled'

export const Img = styled.img<{ $dimmed?: boolean; $hidden?: boolean }>`
  width: 100%;
  height: 100%;
  transition: 0.3s filter ease-in-out;
  visibility: ${({ $hidden }) => ($hidden ? 'hidden' : 'visible')};
  filter: ${({ $dimmed }) => ($dimmed ? 'blur(5px) grayscale(1)' : undefined)};
`

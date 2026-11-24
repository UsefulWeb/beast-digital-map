import styled from '@emotion/styled'

export const Button = styled.button<{ $selected: boolean }>`
  width: 8vmin;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  filter: ${({ $selected }) => ($selected ? 'grayscale(0)' : 'grayscale(1)')};
  outline: none;
  border-radius: 4px;
`

export const Image = styled.img`
  box-shadow: 0 0 5px white;
  width: 100%;
  border-radius: 4px;

  &:hover {
    box-shadow: 0 0 10px #ffa92c;
  }
`

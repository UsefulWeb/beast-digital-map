import styled from '@emotion/styled'

export const Button = styled.button`
  appearance: none;
  border: 0;
  padding: 0;
  margin: 0;
  background: transparent;
  cursor: pointer;
  width: 5.5em;
  max-width: 120px;
  line-height: 0;

  img {
    width: 100%;
    height: auto;
    display: block;
  }

  .hover {
    display: none;
  }

  &:hover .default,
  &:focus-visible .default {
    display: none;
  }

  &:hover .hover,
  &:focus-visible .hover {
    display: block;
  }
`

import styled from '@emotion/styled'

export const Shell = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #070a0c;
`

export const Container = styled.div`
  padding: 4px;
  background: rgb(255 255 255 / 12%);
  width: min(20em, 70vw);
  border-radius: 2em;
`

export const Value = styled.div<{ $value: number }>`
  width: ${({ $value }) => Math.max($value, 4)}%;
  height: 10px;
  border-radius: 16px;
  background: linear-gradient(60deg, #fdd39b, #ffa92c 80%, #ff8a0c 95%);
  transition: width 0.15s ease-out;
`

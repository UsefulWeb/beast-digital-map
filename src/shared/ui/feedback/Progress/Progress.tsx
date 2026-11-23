import styled from '@emotion/styled'

export interface ProgressProps {
  value: number
}

const Container = styled.div`
  padding: 4px;
  background: #00000010;
  width: 20em;
  border-radius: 2em;
`

const Value = styled.div<{ $value: number }>`
  width: ${({ $value }) => $value}%;
  height: 10px;
  border-radius: 16px;
  background: linear-gradient(60deg, #fdd39b, #ffa92c 80%, #ff8a0c 95%);
`

export const Progress = (props: ProgressProps) => {
  const { value } = props

  return (
    <Container>
      <Value $value={value} />
    </Container>
  )
}

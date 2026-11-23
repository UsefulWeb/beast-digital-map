import styled from '@emotion/styled'
import { Button } from '../../controls'
import { Row, Stack } from '../../layout'

export type ErrorFallbackProps = {
  title?: string
  message?: string
  onRetry?: () => void
  onHome?: () => void
}

const Title = styled.h1`
  margin: 0;
`

const Message = styled.p`
  margin: 0;
`

export const ErrorFallback = (props: ErrorFallbackProps) => {
  const {
    title = 'Something went wrong',
    message = 'Please try again.',
    onRetry,
    onHome,
  } = props

  return (
    <Stack
      align="center"
      justify="center"
      gap={16}
      padding={24}
      fullWidth
      fullHeight
    >
      <Title>{title}</Title>
      <Message>{message}</Message>
      <Row gap={12} justify="center">
        {onRetry && (
          <Button variant="fixed" onClick={onRetry}>
            Retry
          </Button>
        )}
        {onHome && (
          <Button variant="fixed" onClick={onHome}>
            Home
          </Button>
        )}
      </Row>
    </Stack>
  )
}

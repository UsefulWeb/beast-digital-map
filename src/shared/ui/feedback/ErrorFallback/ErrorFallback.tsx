import { Button } from '../../controls'
import { Row, Stack } from '../../layout'
import * as C from './ErrorFallback.components'

export type ErrorFallbackProps = {
  title?: string
  message?: string
  onRetry?: () => void
  onHome?: () => void
}

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
      <C.Title>{title}</C.Title>
      <C.Message>{message}</C.Message>
      <Row gap={12} justify="center">
        {onRetry && <Button onClick={onRetry}>Retry</Button>}
        {onHome && <Button onClick={onHome}>Home</Button>}
      </Row>
    </Stack>
  )
}

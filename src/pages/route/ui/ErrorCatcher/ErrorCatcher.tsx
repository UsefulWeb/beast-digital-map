import { Component, type ReactNode } from 'react'

export type ErrorCatcherProps = {
  children: ReactNode
  onError: (error: Error) => void
  resetKey: string
}

type ErrorCatcherState = {
  error: Error | null
}

/** Class boundary that reports render errors to the parent. */
export class ErrorCatcher extends Component<
  ErrorCatcherProps,
  ErrorCatcherState
> {
  state: ErrorCatcherState = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error) {
    this.props.onError(error)
  }

  componentDidUpdate(prevProps: ErrorCatcherProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null })
    }
  }

  render() {
    if (this.state.error) {
      return null
    }
    return this.props.children
  }
}

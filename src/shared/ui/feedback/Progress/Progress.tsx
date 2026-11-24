import * as C from './Progress.components'

export interface ProgressProps {
  value: number
}

export const Progress = (props: ProgressProps) => {
  const { value } = props

  return (
    <C.Container>
      <C.Value $value={value} />
    </C.Container>
  )
}

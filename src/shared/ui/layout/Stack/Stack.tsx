import { Flex, type FlexProps } from '../Flex'

export type StackProps = Omit<FlexProps, 'direction'>

export const Stack = (props: StackProps) => (
  <Flex direction="column" {...props} />
)

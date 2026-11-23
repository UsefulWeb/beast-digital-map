import { Flex, type FlexProps } from '../Flex'

export type RowProps = Omit<FlexProps, 'direction'>

export const Row = (props: RowProps) => <Flex direction="row" {...props} />

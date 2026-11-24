import {
  buildPathLineModel,
  generatePathList,
  PathLine,
  selectPathData,
  usePathStore,
} from '@entities/path'

export type PathLayerProps = {
  width: number
  height: number
  ratio: number
}

export const PathLayer = (props: PathLayerProps) => {
  const { width, height, ratio } = props
  const path = usePathStore(selectPathData)
  const segments = generatePathList(path)
  const model = buildPathLineModel(segments, ratio)

  return (
    <PathLine
      strokes={model.strokes}
      width={width}
      height={height}
      ratio={ratio}
      markers={model.markers}
    />
  )
}

import { useEffect, useRef } from 'react'
import { generatePathList } from '../../../entities/path'
import { selectPathData, usePathStore } from '../../../features/path/pathSlice'
import { Arrow } from '../../../shared/ui'
import S from './MapLocationPath.module.scss'
import { renderPath } from './renderPath'

export interface MapLocationPathProps {
  ratio: number
  width: number
  height: number
}

export const MapLocationPath = (props: MapLocationPathProps) => {
  const { width, height, ratio } = props
  const path = usePathStore(selectPathData)
  const ref = useRef<HTMLCanvasElement>(null)

  const pathList = generatePathList(path)

  useEffect(() => {
    if (!ref.current) {
      return
    }
    renderPath({
      ratio,
      canvas: ref.current,
      pathList,
    })
  }, [ref, pathList])

  return (
    <>
      <canvas className={S.container} width={width} height={height} ref={ref} />
      {pathList.map((item, key) => (
        <Arrow
          key={key}
          pathItem={item}
          isLast={key === pathList.length - 1}
          ratio={ratio}
        />
      ))}
    </>
  )
}

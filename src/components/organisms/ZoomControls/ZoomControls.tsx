import classnames from 'classnames'
import { debounce } from 'lodash'
import { useControls, useTransformEffect } from 'react-zoom-pan-pinch'

import zoomInIcon from '../../../../public/images/zoom_in.svg'
import zoomOutIcon from '../../../../public/images/zoom_out.svg'
import { selectZoomScale, useZoomStore } from '../../../features/zoom/zoomSlice'
import { IconButton } from '../../../shared/ui'
import { MAX_ZOOM, MIN_ZOOM } from '../../../shared/util/common'
import S from './ZoomControls.module.scss'

export interface ZoomControlsProps {
  controlClassName?: string
}
export const ZoomControls = (props: ZoomControlsProps) => {
  const { controlClassName } = props

  const { zoomIn, zoomOut } = useControls()
  const scale = useZoomStore(selectZoomScale)
  const setZoom = useZoomStore((s) => s.setZoom)

  const setZoomValue = debounce((value: number) => setZoom(value), 50)

  useTransformEffect(({ state }) => {
    const value = state.scale

    setZoomValue(value)
  })

  const isZoomOutDisabled = scale === MIN_ZOOM
  const isZoomInDisabled = scale === MAX_ZOOM

  return (
    <>
      <div className={S.control}>
        <IconButton
          onClick={zoomIn}
          className={classnames(controlClassName, S.zoom_in, S.control)}
          icon={zoomInIcon}
          disabled={isZoomInDisabled}
          name={'Zoom In'}
        />
      </div>
      <div className={S.control}>
        <IconButton
          onClick={zoomOut}
          className={classnames(controlClassName, S.zoom_out, S.control)}
          icon={zoomOutIcon}
          disabled={isZoomOutDisabled}
          name={'Zoom Out'}
        />
      </div>
    </>
  )
}

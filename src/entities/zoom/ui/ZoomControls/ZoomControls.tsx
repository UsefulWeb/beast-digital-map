import { BASE_URL } from '@shared/config'
import { IconButton } from '@shared/ui'
import { useEffect, useRef } from 'react'
import { useControls, useTransformEffect } from 'react-zoom-pan-pinch'
import { canZoomIn, canZoomOut } from '../../lib'
import { selectZoomScale, setZoom, useZoomStore } from '../../model'
import * as C from './ZoomControls.components'

export const ZoomControls = () => {
  const { zoomIn, zoomOut } = useControls()
  const scale = useZoomStore(selectZoomScale)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useTransformEffect(({ state }) => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
    timer.current = setTimeout(() => setZoom(state.scale), 50)
  })

  useEffect(
    () => () => {
      if (timer.current) {
        clearTimeout(timer.current)
      }
    },
    [],
  )

  return (
    <C.ZoomRow gap="1em" portrait="row" align="center">
      <IconButton
        onClick={() => zoomIn()}
        icon={`${BASE_URL}images/controls/zoom-in.svg`}
        disabled={!canZoomIn(scale)}
        name="Zoom In"
        size="control"
      />
      <C.ZoomOutSlot>
        <IconButton
          onClick={() => zoomOut()}
          icon={`${BASE_URL}images/controls/zoom-out.svg`}
          disabled={!canZoomOut(scale)}
          name="Zoom Out"
          size="control"
        />
      </C.ZoomOutSlot>
    </C.ZoomRow>
  )
}

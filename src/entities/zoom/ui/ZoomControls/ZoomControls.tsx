import styled from '@emotion/styled'
import { BASE_URL } from '@shared/config'
import { IconButton, Stack } from '@shared/ui'
import { useEffect, useRef } from 'react'
import { useControls, useTransformEffect } from 'react-zoom-pan-pinch'
import { canZoomIn, canZoomOut } from '../../lib'
import { selectZoomScale, setZoom, useZoomStore } from '../../model'

const ZoomOutSlot = styled.div`
  margin-top: -0.7em;

  @media (orientation: portrait) {
    margin-top: 0;
    margin-left: -2em;
  }
`

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
    <Stack gap="1em" portrait="row">
      <IconButton
        onClick={() => zoomIn()}
        icon={`${BASE_URL}images/controls/zoom-in.svg`}
        disabled={!canZoomIn(scale)}
        name="Zoom In"
        size="control"
      />
      <ZoomOutSlot>
        <IconButton
          onClick={() => zoomOut()}
          icon={`${BASE_URL}images/controls/zoom-out.svg`}
          disabled={!canZoomOut(scale)}
          name="Zoom Out"
          size="control"
        />
      </ZoomOutSlot>
    </Stack>
  )
}

import { BASE_URL } from '@shared/config'
import { IconButton } from '@shared/ui'
import { useControls } from 'react-zoom-pan-pinch'
import { canZoomIn, canZoomOut, useSyncZoomScale } from '../../lib'
import { selectZoomScale, useZoomStore } from '../../model'
import * as C from './ZoomControls.components'

export const ZoomControls = () => {
  const { zoomIn, zoomOut } = useControls()
  const scale = useZoomStore(selectZoomScale)
  useSyncZoomScale()

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

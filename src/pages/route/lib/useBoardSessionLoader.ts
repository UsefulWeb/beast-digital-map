import {
  clearMapResource,
  getBoardSessionAssets,
  type MapId,
} from '@entities/map'
import { hintAssetEntries, useAssetsProgress } from '@shared/lib'
import { useEffect, useMemo, useState } from 'react'

/** Load + hint all board-session assets; expose progress and retry. */
export const useBoardSessionLoader = (mapId: MapId) => {
  const [renderError, setRenderError] = useState<Error | null>(null)
  const [loadKey, setLoadKey] = useState(0)

  const assets = useMemo(() => {
    void loadKey
    return getBoardSessionAssets(mapId)
  }, [mapId, loadKey])

  const { progress, ready, error: assetsError } = useAssetsProgress(assets)

  useEffect(() => {
    hintAssetEntries(assets, 'preload')
  }, [assets])

  const error = renderError ?? assetsError

  const retry = () => {
    clearMapResource(mapId)
    setRenderError(null)
    setLoadKey((value) => value + 1)
  }

  return {
    progress,
    ready,
    error,
    setRenderError,
    retry,
  }
}

import { useEffect, useMemo, useState } from 'react'
import { type AssetEntry, loadAssets } from '../loadAssets'

export type AssetsProgressState = {
  progress: number
  ready: boolean
  error: Error | null
}

const serialize = (entries: Array<string | AssetEntry>) =>
  JSON.stringify(
    entries.map((entry) =>
      typeof entry === 'string'
        ? { url: entry }
        : { url: entry.url, kind: entry.kind },
    ),
  )

/** Load a list of assets; progress is 0–100 by completed count. */
export const useAssetsProgress = (
  entries: Array<string | AssetEntry>,
  enabled = true,
): AssetsProgressState => {
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const serialized = useMemo(() => serialize(entries), [entries])

  useEffect(() => {
    if (!enabled) {
      setProgress(0)
      setReady(false)
      setError(null)
      return
    }

    const list = JSON.parse(serialized) as AssetEntry[]
    const controller = new AbortController()
    setProgress(0)
    setReady(false)
    setError(null)

    loadAssets(list, {
      signal: controller.signal,
      onProgress: setProgress,
    })
      .then(() => {
        if (!controller.signal.aborted) {
          setReady(true)
          setProgress(100)
        }
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) {
          return
        }
        setError(err instanceof Error ? err : new Error(String(err)))
        setReady(false)
      })

    return () => controller.abort()
  }, [enabled, serialized])

  return { progress, ready, error }
}

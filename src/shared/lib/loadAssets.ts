export type AssetKind = 'image' | 'fetch'

export type AssetEntry = {
  url: string
  kind?: AssetKind
}

type LoadAssetsOptions = {
  onProgress?: (progress: number) => void
  signal?: AbortSignal
}

const imageCache = new Map<string, Promise<void>>()
const fetchCache = new Map<string, Promise<void>>()

const loadImage = (url: string, signal?: AbortSignal) => {
  const cached = imageCache.get(url)
  if (cached) {
    return cached
  }

  const promise = new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Aborted', 'AbortError'))
      return
    }

    const image = new Image()
    const onAbort = () => {
      image.src = ''
      reject(new DOMException('Aborted', 'AbortError'))
    }
    signal?.addEventListener('abort', onAbort, { once: true })

    image.onload = () => {
      signal?.removeEventListener('abort', onAbort)
      const decode = image.decode?.()
      if (decode) {
        decode.then(() => resolve()).catch(() => resolve())
        return
      }
      resolve()
    }
    image.onerror = () => {
      signal?.removeEventListener('abort', onAbort)
      reject(new Error(`Failed to load image: ${url}`))
    }
    image.src = url
  }).catch((error) => {
    imageCache.delete(url)
    throw error
  })

  imageCache.set(url, promise)
  return promise
}

const loadFetch = async (url: string, signal?: AbortSignal) => {
  const cached = fetchCache.get(url)
  if (cached) {
    return cached
  }

  const promise = fetch(url, signal ? { signal } : undefined)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.status}`)
      }
      return response.arrayBuffer()
    })
    .then(() => undefined)
    .catch((error) => {
      fetchCache.delete(url)
      throw error
    })

  fetchCache.set(url, promise)
  return promise
}

const normalize = (entries: Array<string | AssetEntry>): AssetEntry[] => {
  const seen = new Set<string>()
  const result: AssetEntry[] = []

  for (const entry of entries) {
    const item = typeof entry === 'string' ? { url: entry } : entry
    if (!item.url || seen.has(item.url)) {
      continue
    }
    seen.add(item.url)
    result.push({
      url: item.url,
      kind: item.kind ?? (/\.json($|\?)/i.test(item.url) ? 'fetch' : 'image'),
    })
  }

  return result
}

/** Load assets; progress is 0–100 by completed file count (Pages-friendly). */
export const loadAssets = async (
  entries: Array<string | AssetEntry>,
  options: LoadAssetsOptions = {},
) => {
  const { onProgress, signal } = options
  const list = normalize(entries)
  if (list.length === 0) {
    onProgress?.(100)
    return
  }

  let done = 0
  const tick = () => {
    done += 1
    onProgress?.(Math.round((done / list.length) * 100))
  }

  onProgress?.(0)

  await Promise.all(
    list.map(async (entry) => {
      if (entry.kind === 'fetch') {
        await loadFetch(entry.url, signal)
      } else {
        await loadImage(entry.url, signal)
      }
      tick()
    }),
  )
}

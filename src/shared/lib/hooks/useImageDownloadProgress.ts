import { useEffect, useState } from 'react'

const downloadWithProgress = async (
  url: string,
  onProgress: (value: number) => void,
  signal?: AbortSignal,
) => {
  const response = await fetch(url, signal ? { signal } : undefined)
  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status}`)
  }

  const total = Number(response.headers.get('Content-Length') ?? 0)
  const body = response.body

  if (!body || !total) {
    await response.blob()
    onProgress(100)
    return
  }

  const reader = body.getReader()
  let loaded = 0

  while (true) {
    const { done, value } = await reader.read()
    if (done) {
      break
    }
    loaded += value.byteLength
    onProgress(Math.min(100, (loaded / total) * 100))
  }

  onProgress(100)
}

export const useImageDownloadProgress = (url: string) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!url) {
      setProgress(0)
      return
    }

    const controller = new AbortController()
    setProgress(0)

    downloadWithProgress(url, setProgress, controller.signal).catch((error) => {
      if (error?.name !== 'AbortError') {
        setProgress(0)
      }
    })

    return () => controller.abort()
  }, [url])

  return progress
}

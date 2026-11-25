import type { AssetEntry } from './loadAssets'

export type PartitionedAssetHints = {
  images: string[]
  fetches: string[]
}

/** Split asset entries into image vs fetch URL lists for link hints. */
export const partitionAssetEntries = (
  entries: Array<string | AssetEntry>,
): PartitionedAssetHints => {
  const images: string[] = []
  const fetches: string[] = []

  for (const entry of entries) {
    if (typeof entry === 'string') {
      images.push(entry)
      continue
    }
    if (entry.kind === 'fetch') {
      fetches.push(entry.url)
    } else {
      images.push(entry.url)
    }
  }

  return { images, fetches }
}

import type { AssetEntry } from './loadAssets'
import { partitionAssetEntries } from './partitionAssetEntries'

export type AssetHintRel = 'preload' | 'prefetch'

export type AssetHintOptions = {
  rel?: AssetHintRel
  as?: 'image' | 'fetch' | 'script' | 'style' | 'font'
}

const hintKey = (rel: AssetHintRel, href: string) =>
  `link[data-asset-hint="${rel}:${href}"]`

export const ensurePreloadLink = (
  href: string,
  asType: 'image' | 'fetch' | 'script' | 'style',
) => {
  injectAssetHints([href], { rel: 'preload', as: asType })
}

/** Inject unique preload/prefetch link tags for the given URLs. */
export const injectAssetHints = (
  urls: string[],
  options: AssetHintOptions = {},
) => {
  if (typeof document === 'undefined') {
    return
  }

  const rel = options.rel ?? 'preload'
  const asType = options.as ?? 'image'

  for (const href of urls) {
    if (!href) {
      continue
    }
    if (document.querySelector(hintKey(rel, href))) {
      continue
    }
    const link = document.createElement('link')
    link.rel = rel
    link.href = href
    link.as = asType
    link.dataset.assetHint = `${rel}:${href}`
    if (asType === 'fetch' || asType === 'font') {
      link.crossOrigin = 'anonymous'
    }
    document.head.append(link)
  }
}

/** Preload image + fetch entries from an asset manifest. */
export const hintAssetEntries = (
  entries: Array<string | AssetEntry>,
  rel: AssetHintRel = 'preload',
) => {
  const { images, fetches } = partitionAssetEntries(entries)
  injectAssetHints(images, { rel, as: 'image' })
  injectAssetHints(fetches, { rel, as: 'fetch' })
}

export const ensurePreloadLink = (
  href: string,
  asType: 'image' | 'fetch' | 'script' | 'style',
) => {
  if (typeof document === 'undefined') {
    return
  }
  const selector = `link[data-preload="${href}"]`
  if (document.querySelector(selector)) {
    return
  }
  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = href
  link.as = asType
  link.dataset.preload = href
  if (asType === 'fetch') {
    link.crossOrigin = 'anonymous'
  }
  document.head.append(link)
}

/** Fetch URL and parse JSON; throws on non-OK responses. */
export const fetchJson = async <T>(
  url: string,
  signal?: AbortSignal,
): Promise<T> => {
  const response = await fetch(url, signal ? { signal } : undefined)
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`)
  }
  return response.json() as Promise<T>
}

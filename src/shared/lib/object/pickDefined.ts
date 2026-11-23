export const pickDefined = <T extends Record<string, unknown>>(obj: T) => {
  const result: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      result[key] = value
    }
  }
  return result as {
    [K in keyof T as T[K] extends undefined ? never : K]?: Exclude<
      T[K],
      undefined
    >
  }
}

export type DebouncedFn<T extends (...args: never[]) => void> = ((
  ...args: Parameters<T>
) => void) & {
  cancel: () => void
}

/** Delay `fn` until calls settle for `delayMs`. */
export const debounce = <T extends (...args: never[]) => void>(
  fn: T,
  delayMs: number,
): DebouncedFn<T> => {
  let timer: ReturnType<typeof setTimeout> | null = null

  const run = ((...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      timer = null
      fn(...args)
    }, delayMs)
  }) as DebouncedFn<T>

  run.cancel = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  return run
}

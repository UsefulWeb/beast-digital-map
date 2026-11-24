import { useEffect, useMemo, useRef } from 'react'
import { type DebouncedFn, debounce } from '../debounce'

/** React wrapper around `debounce` — always calls the latest `fn`. */
export const useDebounce = <T extends (...args: never[]) => void>(
  fn: T,
  delayMs: number,
): DebouncedFn<T> => {
  const fnRef = useRef(fn)
  fnRef.current = fn

  const debounced = useMemo(
    () =>
      debounce(
        ((...args: Parameters<T>) => {
          fnRef.current(...args)
        }) as T,
        delayMs,
      ),
    [delayMs],
  )

  useEffect(() => () => debounced.cancel(), [debounced])

  return debounced
}

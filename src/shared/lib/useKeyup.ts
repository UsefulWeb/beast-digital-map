import { useEffect } from 'react'

export const useKeyup = (handler: (event: KeyboardEvent) => void) => {
  useEffect(() => {
    window.addEventListener('keyup', handler)
    return () => window.removeEventListener('keyup', handler)
  }, [handler])
}

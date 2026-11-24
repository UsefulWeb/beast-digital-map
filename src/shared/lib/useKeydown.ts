import { useEffect } from 'react'

export const useKeydown = (handler: (event: KeyboardEvent) => void) => {
  useEffect(() => {
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handler])
}

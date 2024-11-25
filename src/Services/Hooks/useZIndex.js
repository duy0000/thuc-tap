import { useRef } from 'react'

let DEFAULT_ZINDEX = 20

export const useZIndex = () => {
  const zIndex = useRef(DEFAULT_ZINDEX)

  const nextZIndex = () => {
    DEFAULT_ZINDEX++
    zIndex.current++
  }

  return {
    zIndex: zIndex.current,
    nextZIndex,
  }
}

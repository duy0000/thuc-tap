import { useContext } from 'react'
import { popperCtx } from './token'

export default function PopperArrow() {
  const popperProvider = useContext(popperCtx)

  return (
    popperProvider.arrow && (
      <div
        ref={popperProvider.arrowRef}
        style={{
          position: 'absolute',
          left: popperProvider.middlewareData.arrow?.x,
          top: popperProvider.middlewareData.arrow?.y,
        }}
        data-popper-role="arrow"
      />
    )
  )
}

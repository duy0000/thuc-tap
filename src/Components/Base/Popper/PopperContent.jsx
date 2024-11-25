import { useContext, useEffect } from 'react'
import { popperCtx } from './token'
import PopperArrow from './PopperArrow'
import { useZIndex } from '@/Services/Hooks/useZIndex'
import { createPortal } from 'react-dom'

export const PopperContent = ({ children, ...props }) => {
  const popperProvider = useContext(popperCtx)

  const { nextZIndex, zIndex } = useZIndex()

  useEffect(() => {
    if (popperProvider.isVisible) nextZIndex()
  }, [popperProvider.isVisible])

  if (!popperProvider.shouldRender) return null

  const ContentTemplate = (
    <div
      ref={popperProvider.refs.setFloating}
      style={{
        ...popperProvider.floatingStyles,
        display: popperProvider.shouldShow ? 'block' : 'none',
        zIndex,
      }}
      data-popper-role="content-wrapper"
      data-popper-placement={popperProvider.placement}
      data-popper-interactive={popperProvider.interactive}
      {...popperProvider.getFloatingProps()}
      {...props}
    >
      <PopperArrow />

      <div data-popper-role="content">{children}</div>
    </div>
  )

  return popperProvider.teleport
    ? createPortal(ContentTemplate, document.body)
    : ContentTemplate
}

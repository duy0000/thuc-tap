import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'

import { DrawerFooter } from './Drawer.Footer'
import { DrawerContent } from './Drawer.Content'
import { DrawerHeader } from './Drawer.Header'

import './Drawer.scss'
import { createPortal } from 'react-dom'
import { useZIndex } from '@/Services/Hooks/useZIndex'

export const Drawer = forwardRef(
  (
    {
      children,
      onBeforeClose = () => true,
      onBeforeOpen = () => true,
      onOpened = () => {},
      onClosed = () => {},
      maxWidth = null,
      minWidth = null,
      width = null,
      persistent = false,
      closeOnClickOutside = false,
      ...attrs
    },
    ref,
  ) => {
    const contentRef = useRef()
    const { nextZIndex, zIndex } = useZIndex()

    const [isOpen, setIsOpen] = useState(false)

    const open = () => {
      if (!onBeforeOpen?.()) return

      setIsOpen(true)
      onOpened?.()
    }

    const close = () => {
      if (!onBeforeClose?.()) return

      setIsOpen(false)
      onClosed?.()
    }

    const toggle = () => setIsOpen((p) => !p)

    const shouldRender = useMemo(
      () => (persistent ? persistent : isOpen),
      [isOpen, persistent],
    )

    const handleCloseDrawer = (event) => {
      if (!isOpen || !closeOnClickOutside) return

      if (contentRef.current && !contentRef.current.contains(event.target)) {
        close()
      }
    }

    useEffect(() => {
      if (isOpen) {
        nextZIndex()
      }
    }, [isOpen])

    useImperativeHandle(ref, () => ({
      open,
      close,
      toggle,
      isOpen,
    }))

    return createPortal(
      <>
        {shouldRender && (
          <div
            className="fixed top-0 right-0 bottom-0 left-0 bg-slate-800/10 z-[10]"
            style={{
              display: isOpen ? 'block' : 'none',
              backdropFilter: 'blur(15px)',
              transition: 'all 2s ease 1s',
              zIndex,
            }}
            {...attrs}
            onClick={handleCloseDrawer}
          >
            <div
              ref={contentRef}
              style={{
                width,
                maxWidth: maxWidth != null ? maxWidth : 'max-content',
                minWidth: minWidth != null ? minWidth : 'max-content',
                borderRadius: '24px 0 0 24px',
              }}
              className="bg-white px-8 py-4 absolute right-0 top-0 bottom-0 flex flex-col justify-between animate__faster animate__animated animate__fadeInRight"
            >
              {children}
            </div>
          </div>
        )}
      </>,
      document.body,
    )
  },
)

Drawer.displayName = 'Drawer'
Drawer.Header = DrawerHeader
Drawer.Footer = DrawerFooter
Drawer.Content = DrawerContent

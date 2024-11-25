import { useNamespace } from '@/Services/Hooks'
import { useRef, useImperativeHandle, forwardRef, useEffect } from 'react'

import './Dialog.scss'
import { createPortal } from 'react-dom'
import { transformCls } from '@/Services/Utils/reactUtils'
import { useZIndex } from '@/Services/Hooks/useZIndex'

export const Dialog = forwardRef(
  (
    {
      footer,
      header,
      children,
      isOpen,
      setIsOpen,
      headerCenter = true,
      headerClass = '',
      preventClose = false,
      notClose = false,
      onClosed,
      onClickClose,
    },
    ref,
  ) => {
    const bem = useNamespace('dialog')
    const { zIndex, nextZIndex } = useZIndex()
    const dialogRef = useRef()
    const dialogOriginalRef = useRef()

    const handleCloseDialog = async () => {
      if (onClickClose && !onClickClose()) return

      await addTransitionClose()

      onClosed?.()
      setIsOpen(false)
    }

    const addTransitionClose = async () => {
      dialogRef.current?.classList.add(bem.is('close'))
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, 140)
      })
    }

    useEffect(() => {
      nextZIndex()
    }, [isOpen])

    const closeDialog = (event) => {
      if (preventClose) return

      if (
        dialogOriginalRef.current &&
        !dialogOriginalRef.current.contains(event.target)
      ) {
        handleCloseDialog()
      }
    }

    useImperativeHandle(ref, () => ({
      close: handleCloseDialog,
    }))

    return createPortal(
      <>
        {isOpen && (
          <div
            ref={dialogRef}
            className={bem.b()}
            style={{
              zIndex,
            }}
            onClick={closeDialog}
          >
            <div ref={dialogOriginalRef} className={bem.e('original')}>
              <div
                className={transformCls([
                  bem.e('header'),
                  bem.is('center', headerCenter == true),
                  headerClass,
                ])}
              >
                {/* Btn close */}
                {!notClose && (
                  <div className={bem.e('close')} onClick={handleCloseDialog}>
                    <svg
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 12.75H6c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h12c.41 0 .75.34.75.75s-.34.75-.75.75Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M12 18.75c-.41 0-.75-.34-.75-.75V6c0-.41.34-.75.75-.75s.75.34.75.75v12c0 .41-.34.75-.75.75Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                )}
                {header}
              </div>

              <div className={bem.e('content')}>{children}</div>

              <div className={bem.e('footer')}>{footer}</div>
            </div>
          </div>
        )}
      </>,
      document.body,
    )
  },
)

Dialog.displayName = 'Dialog'

export default Dialog

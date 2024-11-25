import { useEffect, useMemo, useRef, useState } from 'react'
import { popperCtx } from './token'
import {
  flip as fFlip,
  shift as fShift,
  arrow as fArrow,
  offset as fOffset,
  useFloating,
  autoUpdate,
  useInteractions,
  useHover,
  useClick,
  useFocus,
  safePolygon,
} from '@floating-ui/react'

import './Popper.scss'
import { useClickOutside } from '@/Services/Hooks'
import { useImperativeHandle } from 'react'
import { forwardRef } from 'react'

const ARROW_HEIGHT = 10
/**
 *
 * @param trigger ['click', 'hover', 'focus']
 */
export const Popper = forwardRef(
  (
    {
      children,
      isOpen = false,
      placement = 'bottom',
      fit = false,
      flip = true,
      shift = true,
      arrow = true,
      offset = 5,
      trigger = ['click'],
      interactive = true,
      persistent = false,
      disabled = false,
      onShow = undefined,
      onHide = undefined,
      teleport = false,
    },
    ref,
  ) => {
    if (trigger.length === 0) {
      trigger.push('click')
    }

    const [isVisible, setIsVisible] = useState(isOpen)

    const arrowRef = useRef()

    const shouldRender = useMemo(() => {
      return persistent ? true : isVisible
    }, [persistent, isVisible])

    const shouldShow = useMemo(() => {
      return disabled ? false : isVisible
    }, [disabled, isVisible])

    const {
      refs,
      floatingStyles,
      context: floatingCtx,
      middlewareData,
      placement: currentPlacement,
    } = useFloating({
      middleware: [
        flip && fFlip(),
        shift && fShift(),
        arrow &&
          fArrow({
            element: arrowRef,
            padding: arrow ? ARROW_HEIGHT : 0,
          }),
        fOffset(arrow ? offset + ARROW_HEIGHT : offset),
      ],
      placement,
      strategy: 'fixed',
      open: isVisible,
      onOpenChange: setIsVisible,
      whileElementsMounted: autoUpdate,
      transform: false,
    })

    const hover = useHover(floatingCtx, {
      enabled: trigger.includes('hover'),
      handleClose: safePolygon({
        blockPointerEvents: true,
      }),
    })
    const click = useClick(floatingCtx, {
      enabled: trigger.includes('click'),
    })
    const focus = useFocus(floatingCtx, {
      enabled: trigger.includes('focus'),
    })

    const { getReferenceProps, getFloatingProps } = useInteractions([
      hover,
      click,
      focus,
    ])

    useClickOutside(refs.floating, (e) => {
      if (
        refs.reference.current.contains(e.target) ||
        refs.reference.current === e.target
      )
        return
      setIsVisible(false)
    })

    useEffect(() => {
      if (isVisible) {
        onShow?.()

        if (fit) {
          refs.floating.current.style.width =
            refs.reference.current.getBoundingClientRect().width + 'px'
        }
      } else {
        onHide?.()
      }
    }, [isVisible])

    useImperativeHandle(ref, () => ({
      hide: () => setIsVisible(false),
      show: () => setIsVisible(true),
      toggle: () => setIsVisible((prev) => !prev),
      isVisible,
      placement: currentPlacement,
    }))

    return (
      <popperCtx.Provider
        value={{
          placement: currentPlacement,
          arrowRef,
          arrow,
          floatingCtx,
          floatingStyles,
          middlewareData,
          refs,
          isVisible,
          getReferenceProps,
          getFloatingProps,
          interactive,
          shouldRender,
          shouldShow,
          teleport,
        }}
      >
        {children}
      </popperCtx.Provider>
    )
  },
)

Popper.displayName = 'Popper'

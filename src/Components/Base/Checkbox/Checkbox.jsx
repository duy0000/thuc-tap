import { transformCls } from '@/Services/Utils/reactUtils'
import { forwardRef, useImperativeHandle } from 'react'
import Icon from '../Icon/Icon'
import { Check } from '../Icons/Check'
import { isFunction } from 'lodash-unified'

export const Checkbox = forwardRef(
  (
    {
      children,
      labelBefore = false,
      onChange,
      checked = false,
      disabled = false,
    },
    ref,
  ) => {
    if (!isFunction(onChange) && !disabled) {
      throw 'Checkbox [Prop] (onChange) must be a function'
    }

    const check = () => {
      if (disabled) return
      onChange(true)
    }

    const uncheck = () => {
      if (disabled) return
      onChange(false)
    }

    const toggle = () => {
      if (disabled) return
      onChange(!checked)
    }

    useImperativeHandle(ref, () => ({
      isChecked: checked,
      toggle,
      check,
      uncheck,
    }))

    return (
      <div
        className={transformCls([
          labelBefore ? 'flex-row-reverse' : 'flex-row',
          'flex gap-3',
        ])}
      >
        <div
          onClick={toggle}
          className={transformCls([
            'w-5 h-5 rounded-[6px] flex items-center justify-center border border-uneti-primary',
            checked ? 'bg-uneti-primary' : '',
            disabled
              ? 'cursor-not-allowed pointer-events-none'
              : 'cursor-pointer',
          ])}
        >
          {checked && (
            <Icon size="12">
              <Check />
            </Icon>
          )}
        </div>

        {children && (
          <div
            onClick={toggle}
            className={transformCls([
              'select-none',
              disabled
                ? 'cursor-not-allowed pointer-events-none'
                : 'cursor-pointer',
            ])}
          >
            {children}
          </div>
        )}
      </div>
    )
  },
)

Checkbox.displayName = 'Checkbox'

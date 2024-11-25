import { forwardRef, useContext, useMemo } from 'react'
import { SelectCtx } from './token'
import { transformCls } from '@/Services/Utils/reactUtils'
import Icon from '../Icon/Icon'
import Tick from '../Icons/Tick'

export default forwardRef(function Option(
  { label = '', value = '', disabled = false, isSelected },
  ref,
) {
  const selectCtx = useContext(SelectCtx)

  const isDisabled = useMemo(() => {
    return disabled || selectCtx.disabled
  }, [disabled, selectCtx.disabled])

  const handleClick = () => {
    if (isDisabled) return

    selectCtx.onSelect({
      value,
      label,
    })
  }

  return (
    <button
      ref={ref}
      className={transformCls([
        isSelected ? 'text-uneti-primary-lighter' : '',
        isDisabled
          ? 'cursor-not-allowed bg-gray-100 opacity-80'
          : 'cursor-pointer',
        'w-full select-none px-2 py-1 my-1 rounded-md flex items-center justify-between',
        'hover:bg-input-bg/70',
        'text-left',
        'relative transition-all',
      ])}
      onClick={handleClick}
    >
      {selectCtx.dangerouslySetInnerHTML ? (
        <div dangerouslySetInnerHTML={{ __html: label }} />
      ) : (
        label
      )}

      {isSelected && (
        <div className="flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 transform">
          <Icon size={20}>
            <Tick />
          </Icon>
        </div>
      )}
    </button>
  )
})

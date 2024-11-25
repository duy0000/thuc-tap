import { forwardRef, useMemo } from 'react'
import { useNamespace } from '@/Services/Hooks'
import { transformCls } from '@/Services/Utils'

import Icon from '@/Components/Base/Icon/Icon.jsx'
import Loading from '@/Components/Base/Icons/Loading.jsx'

import './Button.scss'

export default forwardRef(function Button(
  {
    children,
    type = 'default',
    disabled = false,
    icon = false,
    color,
    isLoading = false,
    className,
    ...attrs
  },
  ref,
) {
  const bem = useNamespace('button')

  const isDisabled = useMemo(() => {
    return disabled || isLoading
  }, [disabled, isLoading])

  return (
    <div
      ref={ref}
      {...attrs}
      className={transformCls([
        bem.b(),
        bem.is('icon', icon),
        bem.is(type),
        bem.is(`color-${color}`),
        bem.is(`disabled`, isDisabled),
        bem.is('loading', isLoading),
        className,
      ])}
    >
      {
        /*Icon loading*/
        isLoading && (
          <Icon>
            <Loading />
          </Icon>
        )
      }

      {children}
    </div>
  )
})

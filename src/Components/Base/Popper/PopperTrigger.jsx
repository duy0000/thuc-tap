import { useContext } from 'react'
import { popperCtx } from './token'
import { OnlyChild } from '@/Components/Base/OnlyChild/OnlyChild'

export const PopperTrigger = ({ children, ...props }) => {
  const popperProvider = useContext(popperCtx)

  return (
    <OnlyChild
      ref={popperProvider.refs.setReference}
      {...props}
      data-popper-role="trigger"
      {...popperProvider.getReferenceProps()}
    >
      {children}
    </OnlyChild>
  )
}

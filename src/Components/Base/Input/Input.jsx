import React from 'react'
import { transformCls } from '@/Services/Utils'

export const Input = ({ value, onChange, placeholder, className }, props) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={transformCls([
        'w-full text-sm p-1 rounded-md border-[0.5px] border-vs-text  focus:outline-vs-theme-color ',
        className,
      ])}
      {...props}
    />
  )
}

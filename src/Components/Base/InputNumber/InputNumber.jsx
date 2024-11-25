import { transformCls } from '@/Services/Utils'
import React, { useState } from 'react'

export const InputNumber = ({ value, onChange, className }) => {
  const handleChange = (event) => {
    const newValue = event.target.value
    if (newValue === '' || !isNaN(newValue)) {
      onChange(Number(newValue))
    }
  }
  return (
    <input
      type="text"
      className={transformCls([
        'size-[1.9rem] border-[1px] border-vs-text rounded-md p-2',
        className,
      ])}
      value={value}
      onChange={handleChange}
      inputMode="numeric"
    />
  )
}

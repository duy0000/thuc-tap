/* eslint-disable no-unused-vars */
import { Popper, PopperTrigger, PopperContent } from '@/Components/Base'
import { memo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { BsThreeDotsVertical, BsPin } from 'react-icons/bs'
import { FiArrowUp, FiArrowDown } from 'react-icons/fi'

const PopoverMenuHeader = memo(function PopoverMenuHeader(props) {
  const popperRef = useRef(null)
  const { onPinColumnLeft } = props

  return (
    <Popper ref={popperRef} placement={'bottom'} fit persistent>
      <PopperTrigger>
        <button>
          <BsThreeDotsVertical
            id="popup-menu"
            size={16}
            className="cursor-pointer"
            aria-controls={'customized-menu'}
          />
        </button>
      </PopperTrigger>

      <PopperContent className="rounded-xl bg-white border border-gray-200 slide-down min-w-[200px] min-h-[100px] z-[100] py-2 px-0">
        <div className="flex flex-col font-normal">
          <button
            type="button"
            onClick={() => {
              onPinColumnLeft()
            }}
            className="text-gray-900 font-semibold hover:font-semibold hover:bg-cyan-700 hover:text-white px-6 py-2 flex items-center gap-4"
          >
            <BsPin size={16} />
            Ghim cột
          </button>
          <button className="text-gray-900 font-semibold hover:font-semibold hover:bg-cyan-700 hover:text-white px-6 py-2 flex items-center gap-4">
            <FiArrowUp />
            Sắp xếp tăng dần
          </button>
          <button className="text-gray-900 font-semibold hover:font-semibold hover:bg-cyan-700 hover:text-white px-6 py-2 flex items-center gap-4">
            <FiArrowDown />
            Sắp xếp giảm dần
          </button>
        </div>
      </PopperContent>
    </Popper>
  )
})

PopoverMenuHeader.propTypes = {}

export default PopoverMenuHeader

import { BiChevronDown } from 'react-icons/bi'
import Icon from '../Base/Icon/Icon'
import { useClickOutside, useNamespace } from '@/Services/Hooks'
import { useState } from 'react'
import { useRef } from 'react'
import { transformCls } from '@/Services/Utils/reactUtils'
import { Popper, PopperContent, PopperTrigger } from '../Base'

export default function AdvanceSearch({
  search = '',
  setSearch = () => {},
  onSearch = () => {},
  children,
}) {
  const nsLayoutKDCL = useNamespace('kiem-dinh-chat-luong')
  const [isOpenSearchAdvance, setIsOpenSearchAdvance] = useState(false)
  const searchAdvanceRef = useRef()
  const searchDropdownRef = useRef()

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  useClickOutside(searchDropdownRef, (event) => {
    if (event.target !== searchAdvanceRef.current) {
      setIsOpenSearchAdvance(false)
    }
  })

  return (
    <div className={nsLayoutKDCL.em('actions', 'search')}>
      <div className={nsLayoutKDCL.em('search', 'controls')}>
        <input
          className={nsLayoutKDCL.em('search', 'control')}
          value={search}
          onInput={handleSearch}
          placeholder="Nhập từ khóa tìm kiếm"
        />
        <Popper placement="bottom-end" persistent>
          <PopperTrigger>
            <button
              ref={searchAdvanceRef}
              className={transformCls([
                nsLayoutKDCL.em('search', 'advance'),
                'whitespace-nowrap',
              ])}
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                setIsOpenSearchAdvance((prev) => !prev)
              }}
            >
              Tìm kiếm nâng cao
              <Icon>
                <BiChevronDown />
              </Icon>
            </button>
          </PopperTrigger>

          <PopperContent>
            {children ? children : 'Advance Search '}
          </PopperContent>
        </Popper>
      </div>
      <button
        onClick={onSearch}
        className="base-button bg-uneti-primary whitespace-nowrap"
      >
        Tìm kiếm
      </button>
    </div>
  )
}

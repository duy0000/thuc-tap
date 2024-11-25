import Icon from '@/Components/Base/Icon/Icon'
import clsx from 'clsx'
import React, { useState } from 'react'
import { MdArrowRight } from 'react-icons/md'

const NhapDiemThuongKyDropdown = ({
  label,
  items,
  setDataSubmit,
  currentHocKy,
}) => {
  const [open, setOpen] = useState(false)
  const [openSubItem, setOpenSubItem] = useState(null)
  const [openSubItem2, setOpenSubItem2] = useState(null)

  const toggleDropdown = () => {
    setOpen(!open)
  }

  const toggleSubItem = (index) => {
    setOpenSubItem(openSubItem === index ? null : index)
  }

  const toggleSubItem2 = (index) => {
    setOpenSubItem2(openSubItem2 === index ? null : index)
  }
  return (
    <div className="relative flex flex-col items-start justify-start text-xs select-none">
      <div
        className=" flex items-center justify-start font-semibold hover:cursor-pointer"
        onClick={() => {
          setOpen(!open)
        }}
      >
        <Icon>
          <MdArrowRight
            className={clsx(
              'transition-all duration-100 ',
              open ? 'rotate-90' : 'rotate-0',
            )}
          />
        </Icon>
        <span>{items[0].TenDonVi}</span>
      </div>
      {open && (
        <div className="absolute top-3 w-fit left-3 mt-2 bg-transparent  ">
          {items.map((item, index) => (
            <div key={index} className="w-full p-1 ">
              <div
                className="flex items-center justify-start font-semibold text-xs text-vs-text hover:cursor-pointer"
                onClick={() => toggleSubItem(index)}
              >
                <Icon>
                  <MdArrowRight
                    className={clsx(
                      'transition-all duration-100 ',
                      openSubItem !== null && openSubItem === index
                        ? 'rotate-90'
                        : 'rotate-0',
                    )}
                  />
                </Icon>
                <span>{item.TenPhongBan}</span>
              </div>
              {openSubItem === index && item.MonHoc && (
                <div
                  className="flex items-center justify-start  ml-4 text-vs-text font-semibold hover:cursor-pointer p-[0.2rem]"
                  onClick={() => {
                    toggleSubItem2(index)
                  }}
                >
                  <Icon>
                    <MdArrowRight
                      className={clsx(
                        'transition-all duration-100 ',
                        openSubItem2 !== null && openSubItem2 === index
                          ? 'rotate-90'
                          : 'rotate-0',
                      )}
                    />
                  </Icon>
                  <span>{item.MonHoc}</span>
                </div>
              )}
              {openSubItem === index &&
                openSubItem2 === index &&
                item.LopHocPhan && (
                  <div
                    onClick={() => {
                      const [maHocPhan, tenLopHocPhan] =
                        item.LopHocPhan.split(' - ')
                      const [maMonHoc, monHoc] = item.MonHoc.split(' - ')
                      setDataSubmit({
                        MaGiangVien: '01011013',
                        HocKy: currentHocKy,
                        CoSo: item.TenDonVi,
                        MonHoc: monHoc,
                        LopHoc: tenLopHocPhan,
                        MaLopHocPhan: maHocPhan,
                        TrangThaiSinhVien: '',
                      })
                    }}
                    className="ml-14 text-xs font-medium text-vs-text border-[0.5px] p-[0.2rem] rounded-md border-vs-text bg-vs-theme-bg hover:cursor-pointer"
                  >
                    <span className="">{item.LopHocPhan}</span>
                  </div>
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default NhapDiemThuongKyDropdown

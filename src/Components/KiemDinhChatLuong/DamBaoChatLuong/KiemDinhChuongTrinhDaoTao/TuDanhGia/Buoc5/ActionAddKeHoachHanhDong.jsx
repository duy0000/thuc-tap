import Button from '@/Components/Base/Button/Button'
import DrawerKeHoachHanhDong from './DrawerKeHoachHanhDong'
import { useState } from 'react'

export default function ActionAddKeHoachHanhDong({
  KT_KDCL_CTDT_DanhGiaTieuChi_ID,
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Thêm mới</Button>

      {isOpen && (
        <DrawerKeHoachHanhDong
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          KT_KDCL_CTDT_DanhGiaTieuChi_ID={KT_KDCL_CTDT_DanhGiaTieuChi_ID}
        />
      )}
    </>
  )
}

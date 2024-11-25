import { useMemo, useState } from 'react'
import Swal from 'sweetalert2'
import { Table, TableColumn } from '@/Components/Base'
import Icon from '@/Components/Base/Icon/Icon'
import { Brush } from '@/Components/Base/Icons/Brush'
import { Trash } from '@/Components/Base/Icons/Trash'
import { useKeHoachHanhDongStore } from '@/Services/Store'
import DrawerKeHoachHanhDong from './DrawerKeHoachHanhDong'
import { delKeHoachHanhDong } from '@/Apis/KDCL'
import { dayjs } from '@/Services/Utils'

export default function TableKeHoachHanhDong({ KT_KDCL_CTDT_KHDG_CT_DGTC_ID }) {
  const { listKeHoachHanhDong, refetch: refetchListKeHoachHanhDong } =
    useKeHoachHanhDongStore()

  const [isOpen, setIsOpen] = useState(false)
  const [rowEditing, setRowEditing] = useState()

  const keHoach = useMemo(() => {
    return listKeHoachHanhDong.filter(
      (item) =>
        item.KT_KDCL_CTDT_KHDG_CT_DGTC_ID === KT_KDCL_CTDT_KHDG_CT_DGTC_ID,
    )
  }, [listKeHoachHanhDong, KT_KDCL_CTDT_KHDG_CT_DGTC_ID])

  const handleEdit = (row) => {
    setRowEditing(row)
    setIsOpen(true)
  }

  const handleDelete = async (row) => {
    const res = await Swal.fire({
      title: 'Bạn chắc chắn muốn xóa dữ liệu này?',
      text: 'Sau khi xóa sẽ không thể khôi phục lại được',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    })

    if (!res.isConfirmed) return

    try {
      await delKeHoachHanhDong(row.KT_KDCL_CTDT_KHDG_CT_ID)
      await refetchListKeHoachHanhDong()
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Thông báo',
        text: 'Có lỗi xảy ra, vui lòng thử lại sau hoặc liên hệ quản trị viên!',
      })
    }
  }

  return (
    <>
      <Table data={keHoach}>
        <TableColumn label="Mục tiêu" prop="KT_KDCL_CTDT_KHDG_CT_MucTieu" />
        <TableColumn label="Nội dung" prop="KT_KDCL_CTDT_KHDG_CT_NoiDung" />
        <TableColumn
          label="Đơn vị, người thực hiện"
          prop="KT_KDCL_CTDT_KHDG_CT_ThucHien"
        />
        <TableColumn label="Thời gian thực hiện/hoàn thành">
          {(row) =>
            dayjs(row.KT_KDCL_CTDT_KHDG_CT_ThoiGianThucHien).format(
              'DD/MM/YYYY',
            )
          }
        </TableColumn>
        <TableColumn label="Ghi chú" prop="KT_KDCL_CTDT_KHDG_CT_GhiChu" />
        <TableColumn label="Thao tác" align="center">
          {(row) => (
            <div className="flex items-center justify-center gap-1">
              <button className="icon-btn" onClick={() => handleEdit(row)}>
                <Icon>
                  <Brush />
                </Icon>
              </button>
              <button className="icon-btn" onClick={() => handleDelete(row)}>
                <Icon>
                  <Trash />
                </Icon>
              </button>
            </div>
          )}
        </TableColumn>
      </Table>

      {isOpen && (
        <DrawerKeHoachHanhDong
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          form={rowEditing}
        />
      )}
    </>
  )
}

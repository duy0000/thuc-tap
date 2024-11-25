import {
  delNhomChuyenTrachThanhVien,
  putNhomChuyenTrachThanhVien,
} from '@/Apis/KDCL/DamBaoChatLuong/apiNhomChuyenTrach'
import { Table, TableColumn } from '@/Components/Base'
import { Checkbox } from '@/Components/Base/Checkbox'
import Dialog from '@/Components/Base/Dialog/Dialog'
import Icon from '@/Components/Base/Icon/Icon'
import { Trash } from '@/Components/Base/Icons/Trash'
import { useNhomChuyenTrachThanhVienStore } from '@/Services/Store'
import { HoSoKiemDinhCtx } from '@/Services/Tokens'
import { useContext, useMemo, useState } from 'react'
import Swal from 'sweetalert2'

export default function TableThanhVienNhom({
  setIsOpenTableThanhVienNhom,
  isOpenTableThanhVienNhom,
  nhomChuyenTrach,
}) {
  const hoSoKiemDinhCtx = useContext(HoSoKiemDinhCtx)

  const { refetch: refetchNhomChuyenTrachThanhVien } =
    useNhomChuyenTrachThanhVienStore()

  const [isUpdating, setIsUpdating] = useState(false)

  const thanhVien = useMemo(() => {
    return (
      hoSoKiemDinhCtx.nhomChuyenTrachThanhVienGroupByIDNhomChuyenTrach[
        nhomChuyenTrach?.KT_KDCL_CTDT_NhomChuyenTrach_ID
      ] || []
    )
  }, [
    hoSoKiemDinhCtx.nhomChuyenTrachThanhVienGroupByIDNhomChuyenTrach,
    nhomChuyenTrach,
  ])

  const findLeader = () => {
    return thanhVien.find(
      (e) => e.KT_KDCL_CTDT_NhomChuyenTrach_ThanhVien_IsTruongNhom,
    )
  }

  const handleUpdateRole = async (member, isTruongNhom) => {
    if (isUpdating) return

    try {
      setIsUpdating(true)
      await putNhomChuyenTrachThanhVien({
        ...member,
        KT_KDCL_CTDT_NhomChuyenTrach_ThanhVien_IsTruongNhom: isTruongNhom,
      })

      const truongNhom = findLeader()
      // Loại bỏ trưởng nhóm cũ
      if (
        isTruongNhom &&
        truongNhom &&
        truongNhom.KT_KDCL_CTDT_NhomChuyenTrach_ThanhVien_ID !=
          member.KT_KDCL_CTDT_NhomChuyenTrach_ThanhVien_ID
      ) {
        await putNhomChuyenTrachThanhVien({
          ...truongNhom,
          KT_KDCL_CTDT_NhomChuyenTrach_ThanhVien_IsTruongNhom: false,
        })
      }

      await refetchNhomChuyenTrachThanhVien()
    } catch (e) {
      //
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDeleteMember = async (member) => {
    try {
      const result = await Swal.fire({
        title: `Bạn chắc chắn muốn xóa <b>${member.KT_KDCL_CTDT_NhomChuyenTrach_ThanhVien_MaNhanSu} - ${member.KT_KDCL_CTDT_NhomChuyenTrach_ThanhVien_HoTen}</b> khỏi danh sách?`,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Gửi',
        denyButtonText: `Hủy`,
      })

      if (result.isConfirmed) {
        await delNhomChuyenTrachThanhVien(
          member.KT_KDCL_CTDT_NhomChuyenTrach_ThanhVien_ID,
        )

        await refetchNhomChuyenTrachThanhVien()
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Dialog
        isOpen={isOpenTableThanhVienNhom}
        setIsOpen={setIsOpenTableThanhVienNhom}
        header={
          <h3 className="">
            Thành viên nhóm chuyên trách:{' '}
            <b> {nhomChuyenTrach?.KT_KDCL_CTDT_NhomChuyenTrach_TenNhom}</b>
          </h3>
        }
      >
        <Table data={thanhVien}>
          <TableColumn
            label="Mã nhân sự"
            prop="KT_KDCL_CTDT_NhomChuyenTrach_ThanhVien_MaNhanSu"
          />
          <TableColumn
            label="Họ tên"
            prop="KT_KDCL_CTDT_NhomChuyenTrach_ThanhVien_HoTen_ChucDanh"
          />
          <TableColumn label="Trưởng nhóm" width={140} align="center">
            {(row) => (
              <Checkbox
                checked={
                  row.KT_KDCL_CTDT_NhomChuyenTrach_ThanhVien_IsTruongNhom
                }
                onChange={(val) => handleUpdateRole(row, val)}
                disabled={isUpdating}
              />
            )}
          </TableColumn>
          <TableColumn label="Tác vụ" align="center">
            {(row) => (
              <div className="flex gap-2 justify-center items-center">
                <button
                  onClick={() => handleDeleteMember(row)}
                  className="icon-btn border-transparent hover:bg-red-500/10 text-red-400"
                >
                  <Icon>
                    <Trash />
                  </Icon>
                </button>
              </div>
            )}
          </TableColumn>
        </Table>
      </Dialog>
    </>
  )
}

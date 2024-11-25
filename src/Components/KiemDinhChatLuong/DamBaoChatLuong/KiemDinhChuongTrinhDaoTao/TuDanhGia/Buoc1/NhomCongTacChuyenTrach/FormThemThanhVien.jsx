import { useContext, useMemo, useRef, useState } from 'react'
import Swal from 'sweetalert2'

import { Table, TableColumn } from '@/Components/Base'
import Dialog from '@/Components/Base/Dialog/Dialog'
import {
  HoSoKiemDinhCtx,
  LoaiThanhPhanHoiDongEnum,
  NhiemVuEnumText,
} from '@/Services/Tokens'
import { postNhomChuyenTrachThanhVien } from '@/Apis/KDCL'
import { useNhomChuyenTrachThanhVienStore } from '@/Services/Store'
import Button from '@/Components/Base/Button/Button'
import Tag from '@/Components/Base/Tag/Tag'

export default function FormThemThanhVien({ isOpenForm, setIsOpenForm, nhom }) {
  const { refetch: refetchNhomChuyenTrachThanhVien } =
    useNhomChuyenTrachThanhVienStore()

  const hoSoKiemDinhCtx = useContext(HoSoKiemDinhCtx)
  const dialogRef = useRef()
  const [modelValue, setModelValue] = useState([])
  const [isPosting, setIsPosting] = useState(false)

  const validate = () => {
    if (!modelValue.length) {
      Swal.fire({
        title: 'Lỗi',
        icon: 'error',
        text: 'Bạn chưa chọn thành viên cho nhóm',
      })
      return false
    }

    return true
  }

  const onSubmit = async () => {
    if (isPosting || !validate()) return

    try {
      setIsPosting(true)

      const posting = []
      for (const e of modelValue) {
        posting.push(
          postNhomChuyenTrachThanhVien({
            KT_KDCL_CTDT_NhomChuyenTrach_ThanhVien_IDNhomChuyenTrach:
              nhom.KT_KDCL_CTDT_NhomChuyenTrach_ID,
            KT_KDCL_CTDT_NhomChuyenTrach_ThanhVien_IDThanhPhanHoiDong:
              e.KT_KDCL_CTDT_ThanhPhanHoiDong_ID,
            KT_KDCL_CTDT_NhomChuyenTrach_IsTruongNhom: false,
          }),
        )
      }

      await Promise.all(posting)

      await refetchNhomChuyenTrachThanhVien()
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Thông báo',
        text: 'Có lỗi xảy ra, vui lòng thử lại sau hoặc liên hệ quản trị viên!',
      })
    } finally {
      setIsPosting(false)
    }
  }

  const filteredThanhPhanHoiDong = useMemo(
    () =>
      hoSoKiemDinhCtx.thanhPhanHoiDong.filter(
        (tp) =>
          tp.KT_KDCL_CTDT_ThanhPhanHoiDong_LoaiThanhPhan ===
            LoaiThanhPhanHoiDongEnum.TDG_ThanhPhanHoiDong &&
          !hoSoKiemDinhCtx.listNhomChuyenTrachThanhVienTrongHoiDong.find(
            (thanhVien) =>
              thanhVien.KT_KDCL_CTDT_NhomChuyenTrach_ThanhVien_IDThanhPhanHoiDong ===
              tp.KT_KDCL_CTDT_ThanhPhanHoiDong_ID,
          ),
      ),
    [
      hoSoKiemDinhCtx.thanhPhanHoiDong,
      hoSoKiemDinhCtx.listNhomChuyenTrachThanhVienTrongHoiDong,
    ],
  )

  return (
    <Dialog
      ref={dialogRef}
      isOpen={isOpenForm}
      setIsOpen={setIsOpenForm}
      header={
        <div>
          Thêm thành viên nhóm:
          <b> {nhom.KT_KDCL_CTDT_NhomChuyenTrach_TenNhom}</b>
        </div>
      }
      footer={
        <div className="flex justify-end gap-2">
          <Button
            disabled={isPosting}
            onClick={() => dialogRef.current?.close()}
            color="danger"
          >
            Hủy
          </Button>
          <Button onClick={onSubmit} isLoading={isPosting}>
            Cập nhật
          </Button>
        </div>
      }
    >
      <Table
        data={filteredThanhPhanHoiDong}
        displayNumberOrder={false}
        modelValue={modelValue}
        onUpdateModelValue={setModelValue}
        noDataText="Không có thành viên"
      >
        <TableColumn align="center" checkable />
        <TableColumn
          label="Mã nhân sự"
          prop="KT_KDCL_CTDT_ThanhPhanHoiDong_MaNhanSu"
        />
        <TableColumn
          label="Họ tên"
          prop="KT_KDCL_CTDT_ThanhPhanHoiDong_HoTen_ChucDanh"
        />
        <TableColumn label="Chức vụ" minWidth={200}>
          {(row) => (
            <div className="-ml-1">
              {row.KT_KDCL_CTDT_ThanhPhanHoiDong_ChucVu.split(';').map((e) => (
                <Tag key={e}>{e}</Tag>
              ))}
            </div>
          )}
        </TableColumn>
        <TableColumn label="Nhiệm vụ">
          {(row) => (
            <p> {NhiemVuEnumText[row.KT_KDCL_CTDT_ThanhPhanHoiDong_NhiemVu]}</p>
          )}
        </TableColumn>
        {/* <TableColumn label="Loại nhân sự">
          {(row) =>
            loaiNhanSu.find(
              (e) => e.value === row.KT_KDCL_CTDT_ThanhPhanHoiDong_LoaiNhanSu,
            )?.label
          }
        </TableColumn> */}
      </Table>
    </Dialog>
  )
}

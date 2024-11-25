import { Select } from '@/Components/Base'
import Dialog from '@/Components/Base/Dialog/Dialog'
import { useEffect, useMemo, useRef } from 'react'
import { useState } from 'react'
import { cloneDeep, isNumber } from 'lodash-unified'
import {
  postHoSoKiemDinh,
  putHoSoKiemDinh,
} from '@/Apis/KDCL/DamBaoChatLuong/apiHoSoKiemDinh'
import Swal from 'sweetalert2'
import { useBoTieuChuanStore } from '@/Services/Store'
import { useChuongTrinhDaoTaoStore } from '@/Services/Store/Module/KiemDinhChatLuong/chuongTrinhDaoTao'
import Button from '@/Components/Base/Button/Button'

export default function CreateUpdateHoSoKiemDinh({
  onUpdated = null,
  isOpen,
  setIsOpen,
  hoSoUpdating,
  onClosed = () => {},
}) {
  const { listBoTieuChuan, isLoading: isLoadingBTC } = useBoTieuChuanStore()
  const { listChuongTrinhDaoTao, isLoading: isLoadingCTDT } =
    useChuongTrinhDaoTaoStore()

  const dialogRef = useRef()

  const [isPosting, setIsPosting] = useState(false)
  const [form, setForm] = useState({
    KT_KDCL_CTDT_HoSoKiemDinh_IDBoTieuChuan: '',
    KT_KDCL_CTDT_HoSoKiemDinh_MaCTDT: '',
    KT_KDCL_CTDT_HoSoKiemDinh_TenKhoa: '',
    KT_KDCL_CTDT_HoSoKiemDinh_TenDonVi:
      'Trường Đại học Kinh tế - Kỹ thuật Công nghiệp',
  })

  const listChuyenNganh = useMemo(() => {
    if (
      listChuongTrinhDaoTao.length == 0 ||
      !form.KT_KDCL_CTDT_HoSoKiemDinh_TenKhoa
    )
      return []

    return (
      listChuongTrinhDaoTao.find(
        (e) => e.TenKhoa == form.KT_KDCL_CTDT_HoSoKiemDinh_TenKhoa,
      )?.ChuyenNganh || []
    )
  }, [form.KT_KDCL_CTDT_HoSoKiemDinh_TenKhoa, listChuongTrinhDaoTao])

  useEffect(() => {
    if (hoSoUpdating?.KT_KDCL_CTDT_HoSoKiemDinh_ID) {
      setForm(cloneDeep(hoSoUpdating))
    }
  }, [hoSoUpdating])

  const onCancel = () => {
    dialogRef.current.close()
  }

  const validate = () => {
    if (!isNumber(form.KT_KDCL_CTDT_HoSoKiemDinh_IDBoTieuChuan)) {
      Swal.fire({
        title: 'Lỗi',
        icon: 'error',
        text: 'Vui lòng chọn bộ tiêu chuẩn',
      })
      return false
    }
    if (!form.KT_KDCL_CTDT_HoSoKiemDinh_MaCTDT?.trim()) {
      Swal.fire({
        title: 'Lỗi',
        icon: 'error',
        text: 'Vui lòng chọn chương trình đào tạo',
      })
      return false
    }
    return true
  }

  const onUpdate = async () => {
    if (isPosting || !validate()) return
    try {
      setIsPosting(true)
      let action = postHoSoKiemDinh

      if (form.KT_KDCL_CTDT_HoSoKiemDinh_ID) {
        action = putHoSoKiemDinh
      }

      await action(form)

      dialogRef.current.close()
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        text: 'Cập nhật hồ sơ kiểm định thành công',
      })
      onUpdated?.()
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Có lỗi xảy ra, vui lòng thử lại sau hoặc liên hệ quản trị viên!',
      })
    } finally {
      setIsPosting(false)
    }
  }

  return (
    <Dialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      ref={dialogRef}
      headerCenter={false}
      headerClass="bg-uneti-primary"
      onClosed={() => {
        setForm({
          KT_KDCL_CTDT_HoSoKiemDinh_ID: null,
          KT_KDCL_CTDT_HoSoKiemDinh_IDBoTieuChuan: '',
          KT_KDCL_CTDT_HoSoKiemDinh_MaCTDT: '',
          KT_KDCL_CTDT_HoSoKiemDinh_TenKhoa: '',
          KT_KDCL_CTDT_HoSoKiemDinh_TenDonVi:
            'Trường Đại học Kinh tế - Kỹ thuật Công nghiệp',
        })
        onClosed()
      }}
      notClose
      header={
        <div className="font-semibold py-1 md:py-2 text-gray-100 text-[15px] md:text-lg">
          <h3>Cập nhật hồ sơ kiểm định chất lượng CTĐT</h3>
        </div>
      }
      footer={
        <div className="flex justify-end gap-3">
          <Button disabled={isPosting} onClick={onCancel} color="danger">
            Huỷ
          </Button>
          <Button isLoading={isPosting} onClick={onUpdate}>
            Cập nhật
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-3 my-2">
        {/* <div className="flex items-center gap-1 md:gap-6">
          <p className="shrink-0 w-[90px] md:w-[160px]">
            Đơn vị <span className="text-red-500">(*)</span>:
          </p>
          <span className="font-semibold">
            Trường Đại học Kinh tế - Kỹ thuật Công nghiệp
          </span>
        </div> */}
        <div className="flex items-center gap-1">
          <p className="relative shrink-0 w-[90px] md:w-[130px]">
            Khoa chủ quản
            <span className="text-red-500 md:relative absolute top-0 right-0">
              (*):
            </span>
          </p>
          <div className="flex-1">
            <Select
              modelValue={form.KT_KDCL_CTDT_HoSoKiemDinh_TenKhoa}
              onChange={(value) =>
                setForm((p) => ({
                  ...p,
                  KT_KDCL_CTDT_HoSoKiemDinh_TenKhoa: value,
                }))
              }
              valueKey="TenKhoa"
              labelKey="TenKhoa"
              data={listChuongTrinhDaoTao}
              clearable={false}
              triggerClass="w-[250px]"
              isLoading={isLoadingCTDT}
              defaultFirstOption
            />
          </div>
        </div>
        <div className="flex items-center gap-1">
          <p className="relative shrink-0 w-[90px] md:w-[130px]">
            Chương trình đào tạo
            <span className="text-red-500 md:relative absolute top-0 right-0">
              (*):
            </span>
          </p>
          <div className="flex-1">
            <Select
              modelValue={form.KT_KDCL_CTDT_HoSoKiemDinh_MaCTDT}
              onChange={(value) =>
                setForm((p) => ({
                  ...p,
                  KT_KDCL_CTDT_HoSoKiemDinh_MaCTDT: value,
                }))
              }
              valueKey="MaTuyenSinh"
              labelKey="TenNganh"
              data={listChuyenNganh}
              clearable={false}
              triggerClass="w-[250px]"
              isLoading={isLoadingCTDT}
              noDataText="Vui lòng chọn khoa kiểm định"
            />
          </div>
        </div>
        <div className="flex items-center gap-1">
          <p className="shrink-0 w-[90px] md:w-[130px] relative">
            Bộ tiêu chuẩn{' '}
            <span className="text-red-500 md:relative absolute top-0 right-0">
              (*):
            </span>
          </p>
          <div className="flex-1">
            <Select
              modelValue={form.KT_KDCL_CTDT_HoSoKiemDinh_IDBoTieuChuan}
              onChange={(ID) =>
                setForm((p) => ({
                  ...p,
                  KT_KDCL_CTDT_HoSoKiemDinh_IDBoTieuChuan: ID,
                }))
              }
              data={listBoTieuChuan}
              clearable={false}
              labelKey="KT_KDCL_BoTieuChuan_Ten"
              valueKey="KT_KDCL_BoTieuChuan_ID"
              triggerClass="w-[250px]"
              isLoading={isLoadingBTC}
              defaultFirstOption
            />
          </div>
        </div>
      </div>
    </Dialog>
  )
}

import { lazy, useContext, useEffect, useMemo, useState } from 'react'
import { Suspense } from 'react'
import Swal from 'sweetalert2'
import { retries } from '@/Services/Utils/requestUtils'
import {
  delNhomChuyenTrach,
  postNhomChuyenTrach,
  putNhomChuyenTrach,
} from '@/Apis/KDCL/DamBaoChatLuong/apiNhomChuyenTrach'
import Loading from '@/Components/Loading/Loading'
import TableNhomChuyenTrach from './TableNhomChuyenTrach'
import { HoSoKiemDinhCtx } from '@/Services/Tokens'
import FormThemThanhVien from './FormThemThanhVien'
import { useNhomChuyenTrachStore } from '@/Services/Store'
import Button from '@/Components/Base/Button/Button'

const DrawerCreateUpdateNhomCongTac = lazy(
  () => import('./DrawerCreateUpdateNhomCongTac'),
)
const TableThanhVienNhom = lazy(() => import('./TableThanhVienNhom'))

const FormTypeEnum = {
  Create: 1,
  Update: 2,
}

export default function NhomCongTacChuyenTrach() {
  const hoSoKiemDinhCtx = useContext(HoSoKiemDinhCtx)

  const { refetch: refetchNhomChuyenTrach } = useNhomChuyenTrachStore()
  const [formType, setFormType] = useState()
  const [isPosting, setIsPosting] = useState(false)
  const [isOpenCreateUpdateDrawer, setIsOpenCreateUpdateDrawer] =
    useState(false)
  const [form, setForm] = useState({
    KT_KDCL_CTDT_NhomChuyenTrach_TenNhom: '',
    KT_KDCL_CTDT_NhomChuyenTrach_IDThanhLapHoiDong:
      hoSoKiemDinhCtx?.hoiDong?.KT_KDCL_CTDT_ThanhLapHoiDong_ID,
  })
  const [formTitle, setFormTitle] = useState('')

  // Thanh vien
  const [nhomChuyenTrachThemThanhVien, setNhomChuyenTrachThemThanhVien] =
    useState()
  const [isOpenAddUsersDrawer, setIsOpenAddUsersDrawer] = useState(false)

  const [nhomChuyenTrachThanhVienShow, setNhomChuyenTrachThanhVienShow] =
    useState()
  const [isOpenTableThanhVienNhom, setIsOpenTableThanhVienNhom] =
    useState(false)

  const validate = () => {
    if (!form.KT_KDCL_CTDT_NhomChuyenTrach_TenNhom.trim()) {
      Swal.fire({
        title: 'Lỗi',
        icon: 'error',
        text: 'Vui lòng nhập tên nhóm',
      })
      return false
    }
    return true
  }
  const _postNhomChuyenTrach = async () => {
    if (isPosting || !validate()) return
    try {
      setIsPosting(true)
      await postNhomChuyenTrach(form)
      retries(refetchNhomChuyenTrach)
      setIsOpenCreateUpdateDrawer(false)
      setForm({
        KT_KDCL_CTDT_NhomChuyenTrach_TenNhom: '',
        KT_KDCL_CTDT_NhomChuyenTrach_IDThanhLapHoiDong:
          hoSoKiemDinhCtx?.hoiDong?.KT_KDCL_CTDT_ThanhLapHoiDong_ID,
      })
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Thông báo',
        text: 'Có lỗi xảy ra, vui lòng thử lại sau hoặc liên hệ quản trị viên!',
      })
    } finally {
      setIsPosting(false)
    }
  }
  const _putNhomChuyenTrach = async () => {
    if (isPosting || !validate()) return
    try {
      setIsPosting(true)
      await putNhomChuyenTrach(form)
      retries(refetchNhomChuyenTrach)
      setIsOpenCreateUpdateDrawer(false)
      setForm({
        KT_KDCL_CTDT_NhomChuyenTrach_TenNhom: '',
        KT_KDCL_CTDT_NhomChuyenTrach_IDThanhLapHoiDong:
          hoSoKiemDinhCtx?.hoiDong?.KT_KDCL_CTDT_ThanhLapHoiDong_ID,
      })
    } catch (e) {
      console.log(e)
    } finally {
      setIsPosting(false)
    }
  }
  const handleOpenDeleteForm = async (row) => {
    try {
      const result = await Swal.fire({
        title: `Bạn chắc chắn muốn xóa ${row.KT_KDCL_CTDT_NhomChuyenTrach_TenNhom} khỏi danh sách?`,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Gửi',
        denyButtonText: `Hủy`,
      })

      if (result.isConfirmed) {
        await delNhomChuyenTrach(row.KT_KDCL_CTDT_NhomChuyenTrach_ID)
        retries(refetchNhomChuyenTrach)
      }
    } catch (e) {
      console.log(e)
    }
  }
  const onSubmit = () => {
    switch (formType) {
      case FormTypeEnum.Create: {
        _postNhomChuyenTrach()
        break
      }
      case FormTypeEnum.Update: {
        _putNhomChuyenTrach()
        break
      }
    }
  }
  const onCanceled = () => {
    setIsOpenCreateUpdateDrawer(false)
    setForm({
      KT_KDCL_CTDT_NhomChuyenTrach_TenNhom: '',
      KT_KDCL_CTDT_NhomChuyenTrach_IDThanhLapHoiDong:
        hoSoKiemDinhCtx?.hoiDong?.KT_KDCL_CTDT_ThanhLapHoiDong_ID,
    })
  }

  const _nhomChuyenTrach = useMemo(
    () =>
      hoSoKiemDinhCtx.nhomChuyenTrach.map((e) => {
        const thanhVien =
          hoSoKiemDinhCtx.nhomChuyenTrachThanhVienGroupByIDNhomChuyenTrach[
            e.KT_KDCL_CTDT_NhomChuyenTrach_ID
          ]

        const truongNhom = thanhVien?.find(
          (tv) => tv.KT_KDCL_CTDT_NhomChuyenTrach_ThanhVien_IsTruongNhom,
        )
        return {
          ...e,
          KT_KDCL_CTDT_NhomChuyenTrach_SoThanhVien: thanhVien?.length || 0,
          KT_KDCL_CTDT_NhomChuyenTrach_TruongNhom:
            truongNhom &&
            truongNhom.KT_KDCL_CTDT_NhomChuyenTrach_ThanhVien_MaNhanSu +
              ' - ' +
              truongNhom.KT_KDCL_CTDT_NhomChuyenTrach_ThanhVien_HoTen_ChucDanh,
        }
      }),

    [
      hoSoKiemDinhCtx.nhomChuyenTrach,
      hoSoKiemDinhCtx.nhomChuyenTrachThanhVienGroupByIDNhomChuyenTrach,
    ],
  )

  useEffect(() => {
    setForm((f) => ({
      ...f,
      KT_KDCL_CTDT_NhomChuyenTrach_IDThanhLapHoiDong:
        hoSoKiemDinhCtx?.hoiDong?.KT_KDCL_CTDT_ThanhLapHoiDong_ID,
    }))
  }, [hoSoKiemDinhCtx.hoiDong])

  return (
    <div className="z-[2] mt-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="uppercase cursor-default text-uneti-primary-light ml-3 font-semibold">
          Nhóm công tác chuyên trách
        </h3>

        <Button
          onClick={() => {
            setFormTitle('Thêm mới nhóm chuyên trách')
            setFormType(FormTypeEnum.Create)
            setIsOpenCreateUpdateDrawer(true)
          }}
          type="shadow"
        >
          Thêm nhóm
        </Button>
      </div>

      <div className="flex gap-3 mt-1">
        <TableNhomChuyenTrach
          nhomChuyenTrach={_nhomChuyenTrach}
          handleAddUsers={(row) => {
            setIsOpenAddUsersDrawer(true)
            setNhomChuyenTrachThemThanhVien(row)
          }}
          handleDelete={handleOpenDeleteForm}
          handleUpdate={(row) => {
            setFormTitle('Cập nhật nhóm chuyên trách')
            setFormType(FormTypeEnum.Update)
            setForm(row)
            setIsOpenCreateUpdateDrawer(true)
          }}
          handleViewUsers={(row) => {
            setIsOpenTableThanhVienNhom(true)
            setNhomChuyenTrachThanhVienShow(row)
          }}
        />
      </div>

      <Suspense fallback={<Loading />}>
        {isOpenTableThanhVienNhom && (
          <TableThanhVienNhom
            isOpenTableThanhVienNhom={isOpenTableThanhVienNhom}
            setIsOpenTableThanhVienNhom={setIsOpenTableThanhVienNhom}
            nhomChuyenTrach={nhomChuyenTrachThanhVienShow}
          />
        )}

        {isOpenCreateUpdateDrawer && (
          <DrawerCreateUpdateNhomCongTac
            form={form}
            setForm={setForm}
            formTitle={formTitle}
            onSubmit={onSubmit}
            onCanceled={onCanceled}
            isOpenForm={isOpenCreateUpdateDrawer}
            isPosting={isPosting}
          />
        )}

        {isOpenAddUsersDrawer && (
          <FormThemThanhVien
            isOpenForm={isOpenAddUsersDrawer}
            setIsOpenForm={setIsOpenAddUsersDrawer}
            nhom={nhomChuyenTrachThemThanhVien}
          />
        )}
      </Suspense>
    </div>
  )
}

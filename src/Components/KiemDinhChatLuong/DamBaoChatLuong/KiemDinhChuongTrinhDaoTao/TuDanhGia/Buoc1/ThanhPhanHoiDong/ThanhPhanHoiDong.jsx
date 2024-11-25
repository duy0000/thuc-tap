import { Suspense, lazy, useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import {
  delThanhPhanHoiDong,
  postThanhPhanHoiDong,
  putThanhPhanHoiDong,
} from '@/Apis/KDCL/DamBaoChatLuong/apiThanhPhanHoiDong'
import { HoSoKiemDinhCtx, NhiemVuEnumText } from '@/Services/Tokens'
import { useThanhPhanHoiDongStore } from '@/Services/Store'
import { retries } from '@/Services/Utils'

import { Table, TableColumn } from '@/Components/Base'
import Icon from '@/Components/Base/Icon/Icon'
import { Brush } from '@/Components/Base/Icons/Brush'
import { Trash } from '@/Components/Base/Icons/Trash'
import Loading from '@/Components/Loading/Loading'
import { required } from '@/Services/Validators/required.js'
import Button from '@/Components/Base/Button/Button'
import { isTrue } from '@/Services/Validators'
import Tag from '@/Components/Base/Tag/Tag'

const DrawerCreateUpdateThanhPhanHoiDong = lazy(
  () => import('./DrawerCreateUpdateThanhPhanHoiDong'),
)

const FormTypeEnum = {
  Create: 1,
  Update: 2,
}

export default function ThanhPhanHoiDong({ loaiThanhPhan, boxTitle }) {
  const hoSoKiemDinhCtx = useContext(HoSoKiemDinhCtx)

  const { refetch: refetchThanhPhanHoiDong } = useThanhPhanHoiDongStore()

  const [isOpenForm, setIsOpenForm] = useState(false)
  const [formType, setFormType] = useState(FormTypeEnum.Create)
  const [isPosting, setIsPosting] = useState(false)
  const [formTitle, setFormTitle] = useState('')
  const [form, setForm] = useState({
    KT_KDCL_CTDT_ThanhPhanHoiDong_IDThanhLapHoiDong:
      hoSoKiemDinhCtx?.hoiDong?.KT_KDCL_CTDT_ThanhLapHoiDong_ID,
    KT_KDCL_CTDT_ThanhPhanHoiDong_MaNhanSu: '',
    KT_KDCL_CTDT_ThanhPhanHoiDong_LoaiNhanSu: '',
    KT_KDCL_CTDT_ThanhPhanHoiDong_HoTen: '',
    KT_KDCL_CTDT_ThanhPhanHoiDong_ChucVu: '',
    KT_KDCL_CTDT_ThanhPhanHoiDong_NhiemVu: '',
    KT_KDCL_CTDT_ThanhPhanHoiDong_LoaiThanhPhan: loaiThanhPhan,
  })

  const validate = () =>
    [
      () =>
        required(
          form.KT_KDCL_CTDT_ThanhPhanHoiDong_MaNhanSu,
          'Vui lòng nhập đầy đủ Mã nhân sự',
        ),
      () =>
        required(
          form.KT_KDCL_CTDT_ThanhPhanHoiDong_HoTen,
          'Vui lòng nhập đầy đủ Họ tên',
        ),
      () =>
        required(
          form.KT_KDCL_CTDT_ThanhPhanHoiDong_ChucVu,
          'Vui lòng chọn Chức vụ',
        ),
      () =>
        required(
          form.KT_KDCL_CTDT_ThanhPhanHoiDong_NhiemVu,
          'Vui lòng chọn Nhiệm vụ',
        ),
    ].every(isTrue)

  const _postThanhPhanHoiDong = async () => {
    if (isPosting || !validate()) return
    try {
      // Kiem tra ton tai
      const existed = hoSoKiemDinhCtx.thanhPhanHoiDong.some(
        (e) =>
          e.KT_KDCL_CTDT_ThanhPhanHoiDong_MaNhanSu ===
          form.KT_KDCL_CTDT_ThanhPhanHoiDong_MaNhanSu,
      )
      if (existed) {
        Swal.fire({
          title: 'Lỗi',
          icon: 'error',
          text: 'Mã nhân sự đã tồn tại trong danh sách thành viên hội đồng',
        })
        return
      }

      setIsPosting(true)
      await postThanhPhanHoiDong(form)
      Swal.fire({
        icon: 'success',
        text: 'Thêm mới thành phần hội đồng thành công',
      })
      retries(refetchThanhPhanHoiDong)
      setIsOpenForm(false)
    } catch (e) {
      console.log(e)
      Swal.fire({
        title: 'Lỗi',
        icon: 'error',
        text: 'Có lỗi xảy ra, vui lòng thử lại sau!',
      })
    } finally {
      setIsPosting(false)
    }
  }
  const _putThanhPhanHoiDong = async () => {
    if (isPosting || !validate()) return
    try {
      setIsPosting(true)
      await putThanhPhanHoiDong(form)
      Swal.fire({
        icon: 'success',
        text: 'Cập nhật thành phần hội đồng thành công',
      })
      retries(refetchThanhPhanHoiDong)
      setIsOpenForm(false)
    } catch (e) {
      console.log(e)
      Swal.fire({
        title: 'Lỗi',
        icon: 'error',
        text: 'Có lỗi xảy ra, vui lòng thử lại sau!',
      })
    } finally {
      setIsPosting(false)
    }
  }

  const handleOpenCreateForm = () => {
    setFormType(FormTypeEnum.Create)
    setFormTitle('Thêm thành phần hội đồng')
    setForm({
      KT_KDCL_CTDT_ThanhPhanHoiDong_IDThanhLapHoiDong:
        hoSoKiemDinhCtx?.hoiDong?.KT_KDCL_CTDT_ThanhLapHoiDong_ID,
      KT_KDCL_CTDT_ThanhPhanHoiDong_MaNhanSu: '',
      KT_KDCL_CTDT_ThanhPhanHoiDong_LoaiNhanSu: '',
      KT_KDCL_CTDT_ThanhPhanHoiDong_HoTen: '',
      KT_KDCL_CTDT_ThanhPhanHoiDong_ChucVu: '',
      KT_KDCL_CTDT_ThanhPhanHoiDong_NhiemVu: '',
      KT_KDCL_CTDT_ThanhPhanHoiDong_LoaiThanhPhan: loaiThanhPhan,
    })
    setIsOpenForm(true)
  }

  const handleOpenUpdateForm = (row) => {
    setFormType(FormTypeEnum.Update)
    setFormTitle('Cập nhật thành phần hội đồng')
    setForm({
      ...row,
      KT_KDCL_CTDT_ThanhPhanHoiDong_IDThanhLapHoiDong:
        hoSoKiemDinhCtx?.hoiDong?.KT_KDCL_CTDT_ThanhLapHoiDong_ID,
      KT_KDCL_CTDT_ThanhPhanHoiDong_LoaiThanhPhan: loaiThanhPhan,
    })
    setIsOpenForm(true)
  }

  const handleOpenDeleteForm = async (row) => {
    try {
      const result = await Swal.fire({
        title: `Bạn chắc chắn muốn xóa ${row.KT_KDCL_CTDT_ThanhPhanHoiDong_HoTen_ChucDanh} khỏi danh sách?`,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Gửi',
        denyButtonText: `Hủy`,
      })

      if (result.isConfirmed) {
        await delThanhPhanHoiDong(row.KT_KDCL_CTDT_ThanhPhanHoiDong_ID)
        retries(refetchThanhPhanHoiDong)
        Swal.fire({
          title: `Sau khi xoá thành viên ${row.KT_KDCL_CTDT_ThanhPhanHoiDong_HoTen_ChucDanh} khỏi danh sách, cần cập nhật lại các phân công trong nhóm, phân công thực hiện...`,
          confirmButtonText: 'Xác nhận',
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  const onCanceled = () => {
    setIsOpenForm(false)
    setForm({})
  }

  const onSubmit = () => {
    switch (formType) {
      case FormTypeEnum.Create: {
        _postThanhPhanHoiDong()
        break
      }
      case FormTypeEnum.Update: {
        _putThanhPhanHoiDong()
        break
      }
    }
  }

  useEffect(() => {
    setForm((f) => ({
      ...f,
      KT_KDCL_CTDT_ThanhPhanHoiDong_IDThanhLapHoiDong:
        hoSoKiemDinhCtx?.hoiDong?.KT_KDCL_CTDT_ThanhLapHoiDong_ID,
    }))
  }, [hoSoKiemDinhCtx.hoiDong])

  return (
    <>
      <div className="z-[2] mt-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="uppercase cursor-default text-uneti-primary-light ml-3 font-semibold">
            {boxTitle}
          </h3>

          <Button onClick={handleOpenCreateForm} type="shadow">
            Thêm thành viên
          </Button>
        </div>

        <div className="flex gap-3 mt-1">
          <Table
            data={hoSoKiemDinhCtx.thanhPhanHoiDong.filter(
              (e) =>
                e.KT_KDCL_CTDT_ThanhPhanHoiDong_LoaiThanhPhan === loaiThanhPhan,
            )}
            maxHeight={500}
          >
            <TableColumn
              label="Họ tên"
              prop="KT_KDCL_CTDT_ThanhPhanHoiDong_HoTen_ChucDanh"
              minWidth={200}
            />
            <TableColumn label="Chức vụ" minWidth={200}>
              {(row) => (
                <div className="-ml-1 flex gap-1 flex-wrap">
                  {row.KT_KDCL_CTDT_ThanhPhanHoiDong_ChucVu.split(';').map(
                    (e, i) => (
                      <Tag key={i}>{e}</Tag>
                    ),
                  )}
                </div>
              )}
            </TableColumn>
            <TableColumn label="Nhiệm vụ" minWidth={200}>
              {(row) =>
                NhiemVuEnumText[row.KT_KDCL_CTDT_ThanhPhanHoiDong_NhiemVu]
              }
            </TableColumn>
            <TableColumn label="Tác vụ" align="center">
              {(row) => (
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleOpenUpdateForm(row)}
                    className="icon-btn"
                  >
                    <Icon>
                      <Brush />
                    </Icon>
                  </button>
                  <button
                    onClick={() => handleOpenDeleteForm(row)}
                    className="icon-btn"
                  >
                    <Icon>
                      <Trash />
                    </Icon>
                  </button>
                </div>
              )}
            </TableColumn>
          </Table>
        </div>
      </div>
      <Suspense fallback={<Loading />}>
        {isOpenForm && (
          <DrawerCreateUpdateThanhPhanHoiDong
            isOpenForm={isOpenForm}
            form={form}
            setForm={setForm}
            formTitle={formTitle}
            onSubmit={onSubmit}
            onCanceled={onCanceled}
            isPosting={isPosting}
          />
        )}
      </Suspense>
    </>
  )
}

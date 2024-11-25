import { useContext, useEffect, useMemo, useState } from 'react'
import Swal from 'sweetalert2'
import { isNil } from 'lodash-unified'

import { postThoiGianThucHien, putThoiGianThucHien } from '@/Apis/KDCL'
import { DatepickerV2 } from '@/Components/Base'
import Icon from '@/Components/Base/Icon/Icon'
import { Brush } from '@/Components/Base/Icons/Brush'
import { HoSoKiemDinhCtx, stepStatusEnum } from '@/Services/Tokens'
import { useThoiGianThucHienStore } from '@/Services/Store'
import { retries } from '@/Services/Utils'
import Button from '@/Components/Base/Button/Button'
import { date, isTrue, required } from '@/Services/Validators'

export default function CauHinhThoiGian() {
  const hoSoKiemDinhCtx = useContext(HoSoKiemDinhCtx)

  const quyTrinh = hoSoKiemDinhCtx.stepActive
  const childStepCanUpdateTimeline = useMemo(
    () => quyTrinh.children.filter((qt) => qt.CanUpdateTimeline),
    [quyTrinh],
  )

  const { refetch: refetchListThoiGianThucHien } = useThoiGianThucHienStore()
  const [isEditing, setIsEditing] = useState(false)
  const [isPosting, setIsPosting] = useState(false)
  const [form, setForm] = useState(
    childStepCanUpdateTimeline.map(() => ({
      KT_KDCL_CTDT_ThoiGianThucHien_TuNgay: '',
      KT_KDCL_CTDT_ThoiGianThucHien_DenNgay: '',
    })),
  )

  const validate = () =>
    form
      .map((qt, index) => {
        return [
          () =>
            required(
              qt?.KT_KDCL_CTDT_ThoiGianThucHien_TuNgay,
              `Quy trình <b>${childStepCanUpdateTimeline[index].title}</b>: Vui lòng chọn ngày bắt đầu`,
            ),
          () =>
            required(
              qt.KT_KDCL_CTDT_ThoiGianThucHien_DenNgay,
              `Quy trình <b>${childStepCanUpdateTimeline[index].title}</b>: Vui lòng chọn ngày kết thúc`,
            ),
          () =>
            date(qt.KT_KDCL_CTDT_ThoiGianThucHien_TuNgay).isValid(
              `Quy trình <b>${childStepCanUpdateTimeline[index].title}</b>: <b>Ngày bắt đầu</b> không hợp lệ`,
            ),
          () =>
            date(qt.KT_KDCL_CTDT_ThoiGianThucHien_DenNgay).isValid(
              `Quy trình <b>${childStepCanUpdateTimeline[index].title}</b>: <b>Ngày kết thúc</b> không hợp lệ`,
            ),
          () =>
            date(qt.KT_KDCL_CTDT_ThoiGianThucHien_TuNgay).isSameOrBefore(
              qt.KT_KDCL_CTDT_ThoiGianThucHien_DenNgay,
              `Quy trình <b>${childStepCanUpdateTimeline[index].title}</b>: Ngày bắt đầu không được lớn hơn ngày kết thúc`,
            ),
        ]
      })
      .every(isTrue)

  const onSubmitForm = async () => {
    if (!form.length || isPosting || !validate()) return
    try {
      setIsPosting(true)
      const newForm = form.map((qt) => ({
        ...qt,
        KT_KDCL_CTDT_ThoiGianThucHien_TrangThai: isNil(
          qt.KT_KDCL_CTDT_ThoiGianThucHien_TrangThai,
        )
          ? stepStatusEnum.ChuaThucHien
          : qt.KT_KDCL_CTDT_ThoiGianThucHien_TrangThai,
        KT_KDCL_CTDT_ThoiGianThucHien_IDThanhLapHoiDong:
          hoSoKiemDinhCtx.hoiDong.KT_KDCL_CTDT_ThanhLapHoiDong_ID,
      }))

      const postList = newForm.map((item) =>
        retries(() =>
          item.KT_KDCL_CTDT_ThoiGianThucHien_ID
            ? putThoiGianThucHien(item)
            : postThoiGianThucHien(item),
        ),
      )
      await Promise.all(postList)

      Swal.fire({
        icon: 'success',
        text: 'Cập nhật thời gian thành công',
      })
      refetchListThoiGianThucHien()
      setIsEditing(false)
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

  useEffect(() => {
    setForm(hoSoKiemDinhCtx.thoiGianThucHien)
  }, [hoSoKiemDinhCtx.thoiGianThucHien])

  return (
    <div className="z-[2] mt-4">
      <div className="flex items-center gap-2">
        <h3 className="uppercase cursor-default text-uneti-primary-light ml-3 font-semibold">
          Cấu hình thời gian thực hiện các bước trong quy trình
        </h3>

        {isEditing ? (
          <>
            <Button
              onClick={() => {
                setIsEditing(false)
              }}
              color="danger"
              disabled={isPosting}
            >
              Huỷ
            </Button>
            <Button
              disabled={!form.length}
              isLoading={isPosting}
              onClick={onSubmitForm}
            >
              Cập nhật
            </Button>
          </>
        ) : (
          hoSoKiemDinhCtx.hoiDong && (
            <button
              onClick={() => setIsEditing(true)}
              className="icon-btn bg-gray-50 hover:bg-gray-100"
            >
              <Icon>
                <Brush />
              </Icon>
            </button>
          )
        )}
      </div>

      <div className="mt-3">
        {childStepCanUpdateTimeline.map((qt, qtIndex) => (
          <div
            key={qtIndex}
            className="flex flex-col md:flex-row md:items-end justify-between my-2 bg-white rounded-lg px-2 md:px-5 py-2"
          >
            <div className="flex-1 text-slate-700/80">
              <b>{qt.title}</b>
            </div>
            <div className="flex-1 flex-col md:flex-row flex md:items-center md:gap-2">
              <p className="text-slate-600 ml-2 md:ml-0">Từ ngày:</p>
              <DatepickerV2
                modelValue={form[qtIndex]?.KT_KDCL_CTDT_ThoiGianThucHien_TuNgay}
                onChange={(date) => {
                  const newForm = [...form]
                  newForm[qtIndex] = {
                    ...newForm[qtIndex],
                    KT_KDCL_CTDT_ThoiGianThucHien_TuNgay: date,
                    KT_KDCL_CTDT_ThoiGianThucHien_IDQuyTrinhKiemDinh:
                      qt.IDQuyTrinhKiemDinh,
                  }
                  setForm(newForm)
                }}
                valueFormat="YYYY-MM-DD HH:mm:ss"
                disabled={!isEditing}
                triggerClass="w-full md:w-[200px]"
              />
            </div>
            <div className="flex-1 flex-col md:flex-row flex md:items-center md:gap-2">
              <p className="text-slate-600 ml-2 md:ml-0">Đến ngày:</p>
              <DatepickerV2
                modelValue={
                  form[qtIndex]?.KT_KDCL_CTDT_ThoiGianThucHien_DenNgay
                }
                onChange={(date) => {
                  const newForm = [...form]
                  newForm[qtIndex] = {
                    ...newForm[qtIndex],
                    KT_KDCL_CTDT_ThoiGianThucHien_DenNgay: date,
                    KT_KDCL_CTDT_ThoiGianThucHien_IDQuyTrinhKiemDinh:
                      qt.IDQuyTrinhKiemDinh,
                  }
                  setForm(newForm)
                }}
                valueFormat="YYYY-MM-DD HH:mm:ss"
                disabled={!isEditing}
                triggerClass="w-full md:w-[200px]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

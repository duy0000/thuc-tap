import { useContext, useEffect, useRef, useState } from 'react'
import { DatepickerV2, Drawer } from '@/Components/Base'
import Button from '@/Components/Base/Button/Button'
import { DrawerContent } from '@/Components/Base/Drawer/Drawer.Content'
import { DrawerFooter } from '@/Components/Base/Drawer/Drawer.Footer'
import { DrawerHeader } from '@/Components/Base/Drawer/Drawer.Header'
import Swal from 'sweetalert2'
import { isTrue, required } from '@/Services/Validators'
import { postDGDCLichTrich, putDGDCLichTrich } from '@/Apis/KDCL'
import { HoSoKiemDinhCtx } from '@/Services/Tokens'
import { useDGDC_LichDanhGiaStore } from '@/Services/Store'

export default function DrawerLichDanhGia({ isOpen, setIsOpen, form }) {
  const hoSoKiemDinh = useContext(HoSoKiemDinhCtx)

  const { refetch: refetchListLichDanhGia } = useDGDC_LichDanhGiaStore()
  const drawerRef = useRef()

  const [isPosting, setIsPosting] = useState(false)
  const [_form, setForm] = useState({})

  const validate = () =>
    [
      () =>
        required(
          _form.KT_KDCL_LapKH_DanhGiaDongCap_ThoiGian,
          'Vui lòng chọn thời gian',
        ),
      () =>
        required(
          _form.KT_KDCL_LapKH_DanhGiaDongCap_NoiDung,
          'Vui lòng nhập nội dung',
        ),
      () =>
        required(
          _form.KT_KDCL_LapKH_DanhGiaDongCap_DiaDiem,
          'Vui lòng nhập địa điểm',
        ),
      () =>
        required(
          _form.KT_KDCL_LapKH_DanhGiaDongCap_LuuY,
          'Vui lòng nhập lưu ý',
        ),
    ].every(isTrue)

  const handleSubmit = async () => {
    if (isPosting || !validate()) return

    try {
      setIsPosting(true)

      let action = postDGDCLichTrich

      if (_form.KT_KDCL_LapKH_DanhGiaDongCap_ID) {
        action = putDGDCLichTrich
      }

      await action({
        ..._form,
        KT_KDCL_LapKH_DanhGiaDongCap_IDHoSoKiemDinh:
          hoSoKiemDinh.hoSoKiemDinh.KT_KDCL_CTDT_HoSoKiemDinh_ID,
      })

      await refetchListLichDanhGia()
      setIsOpen(false)
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

  useEffect(() => {
    form && setForm(form)
  }, [form])

  useEffect(() => {
    if (isOpen) {
      drawerRef.current.open()
    } else {
      drawerRef.current.close()
    }
  }, [isOpen])

  return (
    <Drawer ref={drawerRef}>
      <DrawerHeader>
        <h3 className="uppercase cursor-default text-uneti-primary-light ml-3 font-semibold">
          Cập nhật thông tin lịch trình đánh giá
        </h3>
      </DrawerHeader>

      <DrawerContent>
        <div className="flex flex-col gap-3">
          <div>
            <p className="ml-2 text-slate-500/90">Thời gian</p>
            <DatepickerV2
              modelValue={_form.KT_KDCL_LapKH_DanhGiaDongCap_ThoiGian || ''}
              onChange={(date) =>
                setForm({
                  ..._form,
                  KT_KDCL_LapKH_DanhGiaDongCap_ThoiGian: date,
                })
              }
              triggerClass="w-full"
              valueFormat="YYYY-MM-DD HH:mm:ss"
            />
          </div>
          <div>
            <p className="text-vs-text ml-2">Nội dung</p>
            <input
              value={_form.KT_KDCL_LapKH_DanhGiaDongCap_NoiDung || ''}
              onChange={(event) =>
                setForm({
                  ..._form,
                  KT_KDCL_LapKH_DanhGiaDongCap_NoiDung: event.target.value,
                })
              }
              className="base-input w-full"
              placeholder="Nhập nội dung đánh giá"
            />
          </div>
          <div>
            <p className="text-vs-text ml-2">Địa điểm</p>
            <input
              value={_form.KT_KDCL_LapKH_DanhGiaDongCap_DiaDiem || ''}
              onChange={(event) =>
                setForm({
                  ..._form,
                  KT_KDCL_LapKH_DanhGiaDongCap_DiaDiem: event.target.value,
                })
              }
              className="base-input w-full"
              placeholder="Nhập địa điểm"
            />
          </div>
          <div>
            <p className="text-vs-text ml-2">Lưu ý</p>
            <input
              value={_form.KT_KDCL_LapKH_DanhGiaDongCap_LuuY || ''}
              onChange={(event) =>
                setForm({
                  ..._form,
                  KT_KDCL_LapKH_DanhGiaDongCap_LuuY: event.target.value,
                })
              }
              className="base-input w-full"
              placeholder="Nhập lưu ý"
            />
          </div>
        </div>
      </DrawerContent>

      <DrawerFooter>
        <div className="flex items-center justify-end gap-2">
          <Button
            disabled={isPosting}
            color="danger"
            onClick={() => setIsOpen(false)}
          >
            Huỷ
          </Button>
          <Button isLoading={isPosting} onClick={handleSubmit}>
            Cập nhật
          </Button>
        </div>
      </DrawerFooter>
    </Drawer>
  )
}

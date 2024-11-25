import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import Swal from 'sweetalert2'
import { postKeHoachHanhDong, putKeHoachHanhDong } from '@/Apis/KDCL'
import { DatepickerV2, Drawer } from '@/Components/Base'
import Button from '@/Components/Base/Button/Button'
import { DrawerContent } from '@/Components/Base/Drawer/Drawer.Content'
import { DrawerFooter } from '@/Components/Base/Drawer/Drawer.Footer'
import { DrawerHeader } from '@/Components/Base/Drawer/Drawer.Header'
import { useKeHoachHanhDongStore } from '@/Services/Store'

export default forwardRef(function DrawerKeHoachHanhDong(
  { onSubmitted, isOpen, setIsOpen, form, KT_KDCL_CTDT_DanhGiaTieuChi_ID },
  ref,
) {
  const drawerRef = useRef()
  const [_form, setForm] = useState({
    KT_KDCL_CTDT_KHDG_CT_DGTC_ID: KT_KDCL_CTDT_DanhGiaTieuChi_ID,
    KT_KDCL_CTDT_KHDG_CT_MucTieu: '',
    KT_KDCL_CTDT_KHDG_CT_NoiDung: '',
    KT_KDCL_CTDT_KHDG_CT_ThucHien: '',
    KT_KDCL_CTDT_KHDG_CT_ThoiGianThucHien: '',
    KT_KDCL_CTDT_KHDG_CT_TrangThaiThucHien: true,
    KT_KDCL_CTDT_KHDG_CT_GhiChu: '',
  })
  const [isPosting, setIsPosting] = useState(false)

  const { refetch: refetchListKeHoachHanhDong } = useKeHoachHanhDongStore()

  const handleChange = (key, value) => {
    setForm({ ..._form, [key]: value })
  }

  const validate = () => true

  const onSubmit = async () => {
    if (isPosting || !validate()) return

    try {
      setIsPosting(true)
      let action = postKeHoachHanhDong

      if (_form.KT_KDCL_CTDT_KHDG_CT_ID) {
        action = putKeHoachHanhDong
      }

      await action({
        ..._form,
        KT_KDCL_CTDT_KHDG_CT_DGTC_ID:
          form?.KT_KDCL_CTDT_KHDG_CT_DGTC_ID ?? KT_KDCL_CTDT_DanhGiaTieuChi_ID,
        KT_KDCL_CTDT_KHDG_CT_TrangThaiThucHien: true,
      })

      await refetchListKeHoachHanhDong()

      onSubmitted?.()
      setIsOpen(false)
    } catch (e) {
      console.error(e)
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
    if (isOpen) {
      drawerRef.current?.open()
    } else {
      drawerRef.current?.close()
    }
  }, [isOpen])

  useEffect(() => {
    setForm({
      ..._form,
      ...form,
      KT_KDCL_CTDT_KHDG_CT_DGTC_ID: KT_KDCL_CTDT_DanhGiaTieuChi_ID,
    })
  }, [KT_KDCL_CTDT_DanhGiaTieuChi_ID, form])

  useImperativeHandle(ref, () => ({
    open: () => drawerRef.current?.open(),
    close: () => drawerRef.current?.close(),
  }))

  return (
    <Drawer ref={drawerRef}>
      <DrawerHeader>
        <h3 className="text-uneti-primary text-lg">
          <b>Cập nhật kế hoạch đánh giá tiêu chí</b>
        </h3>
      </DrawerHeader>
      <DrawerContent>
        <div className="my-2 flex flex-col">
          <label className="ml-3 mb-1 text-slate-500" htmlFor="MucTieu">
            Mục tiêu:
          </label>
          <input
            id="MucTieu"
            className="base-input w-full"
            value={_form.KT_KDCL_CTDT_KHDG_CT_MucTieu}
            onChange={(event) =>
              handleChange('KT_KDCL_CTDT_KHDG_CT_MucTieu', event.target.value)
            }
          />
        </div>
        <div className="my-2 flex flex-col">
          <label className="ml-3 mb-1 text-slate-500" htmlFor="NoiDung">
            Nội dung:
          </label>
          <input
            id="NoiDung"
            className="base-input w-full"
            value={_form.KT_KDCL_CTDT_KHDG_CT_NoiDung}
            onChange={(event) =>
              handleChange('KT_KDCL_CTDT_KHDG_CT_NoiDung', event.target.value)
            }
          />
        </div>
        <div className="my-2 flex flex-col">
          <label className="ml-3 mb-1 text-slate-500" htmlFor="DonVi">
            Đơn vị, người thực hiện:
          </label>
          <input
            id="DonVi"
            className="base-input w-full"
            value={_form.KT_KDCL_CTDT_KHDG_CT_ThucHien}
            onChange={(event) =>
              handleChange('KT_KDCL_CTDT_KHDG_CT_ThucHien', event.target.value)
            }
          />
        </div>
        <div className="my-2 flex flex-col">
          <label className="ml-3 mb-1 text-slate-500" htmlFor="ThoiGian">
            Thời gian thực hiện/ hoàn thành
          </label>
          <DatepickerV2
            modelValue={_form.KT_KDCL_CTDT_KHDG_CT_ThoiGianThucHien}
            valueFormat="YYYY-MM-DD"
            onChange={(value) =>
              handleChange('KT_KDCL_CTDT_KHDG_CT_ThoiGianThucHien', value)
            }
            triggerClass="base-input w-full"
          />
        </div>
        <div className="my-2 flex flex-col">
          <label className="ml-3 mb-1 text-slate-500" htmlFor="GhiChu">
            Ghi chú
          </label>
          <textarea
            id="GhiChu"
            className="base-input w-full"
            value={_form.KT_KDCL_CTDT_KHDG_CT_GhiChu}
            onChange={(event) =>
              handleChange('KT_KDCL_CTDT_KHDG_CT_GhiChu', event.target.value)
            }
          />
        </div>
      </DrawerContent>

      <DrawerFooter>
        <div className="flex items-center justify-end gap-2">
          <Button
            color="danger"
            disabled={isPosting}
            onClick={() => {
              drawerRef.current.close()
              setIsOpen(false)
            }}
          >
            Huỷ
          </Button>
          <Button isLoading={isPosting} onClick={onSubmit}>
            Cập nhật
          </Button>
        </div>
      </DrawerFooter>
    </Drawer>
  )
})

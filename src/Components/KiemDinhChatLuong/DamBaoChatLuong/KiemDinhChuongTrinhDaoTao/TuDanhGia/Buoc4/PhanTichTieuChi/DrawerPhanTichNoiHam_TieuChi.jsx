import { useEffect, useRef, useState } from 'react'

import { Drawer } from '@/Components/Base/index.js'
import Button from '@/Components/Base/Button/Button.jsx'
import { DrawerContent } from '@/Components/Base/Drawer/Drawer.Content.jsx'
import { DrawerFooter } from '@/Components/Base/Drawer/Drawer.Footer.jsx'
import { DrawerHeader } from '@/Components/Base/Drawer/Drawer.Header.jsx'
import Swal from 'sweetalert2'
import {
  postPhanTichNoiHamChiTiet,
  putPhanTichNoiHamChiTiet,
} from '@/Apis/KDCL/index.js'
import { usePhanTichNoiHamChiTietStore } from '@/Services/Store/index.js'
import { required } from '@/Services/Validators/required.js'

export default function DrawerPhanTichNoiHam({
  isOpen,
  setIsOpen,
  noiHam,
  IDPhanTichNoiHam,
}) {
  const drawerRef = useRef()

  const { refetch: refetchListPhanTichNoiHamChiTiet } =
    usePhanTichNoiHamChiTietStore()

  const [form, setForm] = useState(null)
  const [isPosting, setIsPosting] = useState(false)

  const handleChange = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    })
  }

  const validate = () =>
    [
      required(
        form?.KT_KDCL_CTDT_PhanTichNoiHam_ChiTiet_PhuongPhapThuThap,
        'Vui lòng nhập phương pháp thu thập',
      ),
      required(
        form?.KT_KDCL_CTDT_PhanTichNoiHam_ChiTiet_ThongTinThuThap,
        'Vui lòng nhập thông tin thu thập',
      ),
      required(
        form?.KT_KDCL_CTDT_PhanTichNoiHam_ChiTiet_CauHoi,
        'Vui lòng nhập câu hỏi đặt ra',
      ),
      required(
        form?.KT_KDCL_CTDT_PhanTichNoiHam_ChiTiet_YeuCau,
        'Vui lòng nhập yêu cầu',
      ),
    ].every((e) => e)

  const onSubmit = async () => {
    if (!IDPhanTichNoiHam) {
      return
    }
    if (isPosting || !validate()) return

    setIsPosting(true)
    try {
      let action = form.KT_KDCL_CTDT_PhanTichNoiHam_ChiTiet_IDPhanTichNoiHam
        ? putPhanTichNoiHamChiTiet
        : postPhanTichNoiHamChiTiet

      form.KT_KDCL_CTDT_PhanTichNoiHam_ChiTiet_IDPhanTichNoiHam =
        IDPhanTichNoiHam
      await action(form)
      await refetchListPhanTichNoiHamChiTiet()

      setForm({})
      setIsOpen(false)
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Thông báo',
        text: 'Có lỗi xảy ra, vui lòng thử lại sau!',
      })
    } finally {
      setIsPosting(false)
    }
  }

  useEffect(() => {
    setForm(noiHam)
  }, [noiHam])

  useEffect(() => {
    if (isOpen) drawerRef.current?.open()
    else drawerRef.current?.close()
  }, [isOpen])

  return (
    <Drawer ref={drawerRef}>
      <DrawerHeader>
        <h3 className="text-uneti-primary font-medium text-base pl-3">
          Cập nhật nội dung phân tích tiêu chí
        </h3>
      </DrawerHeader>

      <DrawerContent>
        <div className="flex flex-col gap-3 px-1">
          <div className="flex flex-col gap-1 w-[320px]">
            <label htmlFor="YeuCau" className="ml-2 text-slate-500">
              Yêu cầu <span className="text-red-500">*</span>
            </label>
            <textarea
              className="base-input h-auto w-full"
              id="YeuCau"
              value={form?.KT_KDCL_CTDT_PhanTichNoiHam_ChiTiet_YeuCau || ''}
              onInput={(event) =>
                handleChange(
                  'KT_KDCL_CTDT_PhanTichNoiHam_ChiTiet_YeuCau',
                  event.target.value,
                )
              }
              rows={3}
              placeholder="Nhập yêu cầu phân tích, đánh giá tiêu chí"
            />
          </div>
          <div className="flex flex-col gap-1 w-[320px]">
            <label htmlFor="CauHoi" className="ml-2 text-slate-500">
              Câu hỏi đặt ra <span className="text-red-500">*</span>
            </label>
            <textarea
              className="base-input h-auto w-full"
              id="CauHoi"
              value={form?.KT_KDCL_CTDT_PhanTichNoiHam_ChiTiet_CauHoi || ''}
              onChange={(event) =>
                handleChange(
                  'KT_KDCL_CTDT_PhanTichNoiHam_ChiTiet_CauHoi',
                  event.target.value,
                )
              }
              rows={3}
              placeholder="Nhập câu hỏi"
            />
          </div>
          <div className="flex flex-col gap-1 w-[320px]">
            <label htmlFor="ThongTinThuThap" className="ml-2 text-slate-500">
              Thông tin minh chứng cần thu thập{' '}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              className="base-input h-auto w-full"
              id="ThongTinThuThap"
              value={
                form?.KT_KDCL_CTDT_PhanTichNoiHam_ChiTiet_ThongTinThuThap || ''
              }
              onInput={(event) =>
                handleChange(
                  'KT_KDCL_CTDT_PhanTichNoiHam_ChiTiet_ThongTinThuThap',
                  event.target.value,
                )
              }
              rows={3}
              placeholder="Nhập thông tin các minh chứng cần thu thập"
            />
          </div>
          <div className="flex flex-col gap-1 w-[320px]">
            <label htmlFor="NoiThuThap" className="ml-2 text-slate-500">
              Nơi thu thập thông tin, minh chứng
            </label>
            <textarea
              className="base-input h-auto w-full"
              id="NoiThuThap"
              value={form?.KT_KDCL_CTDT_PhanTichNoiHam_ChiTiet_NoiThuThap || ''}
              onInput={(event) =>
                handleChange(
                  'KT_KDCL_CTDT_PhanTichNoiHam_ChiTiet_NoiThuThap',
                  event.target.value,
                )
              }
              rows={3}
              placeholder="Nhập nguồn thu thập thông tin minh chứng"
            />
          </div>
          <div className="flex flex-col gap-1 w-[320px]">
            <label htmlFor="PhuongPhapThuThap" className="ml-2 text-slate-500">
              Phương pháp thu thập thông tin, minh chứng{' '}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              className="base-input h-auto w-full"
              id="PhuongPhapThuThap"
              value={
                form?.KT_KDCL_CTDT_PhanTichNoiHam_ChiTiet_PhuongPhapThuThap ||
                ''
              }
              onInput={(event) =>
                handleChange(
                  'KT_KDCL_CTDT_PhanTichNoiHam_ChiTiet_PhuongPhapThuThap',
                  event.target.value,
                )
              }
              rows={3}
              placeholder="Nhập phương pháp thu thập thông tin minh chứng"
            />
          </div>
          <div className="flex flex-col gap-1 w-[320px]">
            <label htmlFor="GhiChu" className="ml-2 text-slate-500">
              Ghi chú
            </label>
            <textarea
              className="base-input h-auto w-full"
              id="GhiChu"
              value={form?.KT_KDCL_CTDT_PhanTichNoiHam_ChiTiet_GhiChu}
              onInput={(event) =>
                handleChange(
                  'KT_KDCL_CTDT_PhanTichNoiHam_ChiTiet_GhiChu',
                  event.target.value,
                )
              }
              rows={3}
              placeholder="Nhập ghi chú"
            />
          </div>
        </div>
      </DrawerContent>

      <DrawerFooter>
        <div className="flex justify-end items-center gap-2">
          <Button
            disabled={isPosting}
            color="danger"
            onClick={() => setIsOpen(false)}
          >
            Hủy
          </Button>
          <Button disabled={isPosting} isLoading={isPosting} onClick={onSubmit}>
            Cập nhật
          </Button>
        </div>
      </DrawerFooter>
    </Drawer>
  )
}

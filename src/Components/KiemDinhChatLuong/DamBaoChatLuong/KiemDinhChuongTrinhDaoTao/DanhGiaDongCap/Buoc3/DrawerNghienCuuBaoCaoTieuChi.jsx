import { useEffect, useRef, useState } from 'react'
import { Drawer } from '@/Components/Base'
import Button from '@/Components/Base/Button/Button'
import { DrawerContent } from '@/Components/Base/Drawer/Drawer.Content'
import { DrawerFooter } from '@/Components/Base/Drawer/Drawer.Footer'
import { DrawerHeader } from '@/Components/Base/Drawer/Drawer.Header'
import Swal from 'sweetalert2'
import { postDGDCNghienCuuBaoCao, putDGDCNghienCuuBaoCao } from '@/Apis/KDCL'
import { isTrue, required } from '@/Services/Validators'
import { useDGDC_NghienCuuBaoCaoStore } from '@/Services/Store/Module/KiemDinhChatLuong/DGDC_nghienCuuBaoCao'

export default function DrawerNghienCuuBaoCaoTieuChi({
  isOpen,
  setIsOpen,
  form,
  setForm,
}) {
  const { refetch: refetchListNghienCuuBaoCao } = useDGDC_NghienCuuBaoCaoStore()

  const drawerRef = useRef()
  const [isPosting, setIsPosting] = useState(false)

  const validate = () =>
    [
      () =>
        required(
          form.KT_KDCL_DGDC_NghienCuu_BaoCao_DiemManh,
          'Vui lòng nhập điểm mạnh',
        ),
      () =>
        required(
          form.KT_KDCL_DGDC_NghienCuu_BaoCao_LinhVuc,
          'Vui lòng nhập lĩnh vực cần cải tiến',
        ),
      () =>
        required(
          form.KT_KDCL_DGDC_NghienCuu_BaoCao_MC_TTBS,
          'Vui lòng nhập minh chứng/thông tin cần bổ sung',
        ),
      () =>
        required(
          form.KT_KDCL_DGDC_NghienCuu_BaoCao_DuKien_KQDG,
          'Vui lòng nhập dự kiến kết quả/đánh giá',
        ),
    ].every(isTrue)

  const handleSubmit = async () => {
    if (isPosting || !validate()) return

    if (
      form.KT_KDCL_DGDC_NghienCuu_BaoCao_DuKien_KQDG < 0 ||
      form.KT_KDCL_DGDC_NghienCuu_BaoCao_DuKien_KQDG > 5
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'Thông báo',
        text: 'Dự kiến kết quả/đánh giá phải nằm trong khoảng từ 0 đến 5',
      })
      return
    }

    try {
      setIsPosting(true)

      let action = postDGDCNghienCuuBaoCao
      if (form.KT_KDCL_DGDC_NghienCuu_BaoCao_ID) {
        action = putDGDCNghienCuuBaoCao
      }

      await action(form)
      await refetchListNghienCuuBaoCao()
      setIsOpen(false)
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
    if (isOpen) {
      drawerRef.current?.open()
    } else {
      drawerRef.current?.close()
    }
  }, [isOpen])

  return (
    <Drawer ref={drawerRef}>
      <DrawerHeader>
        <h3 className="uppercase cursor-default text-uneti-primary-light ml-3 font-semibold">
          Cập nhật thông tin nghiên cứu báo cáo tiêu chí
        </h3>
      </DrawerHeader>
      <DrawerContent>
        <div className="flex flex-col gap-3">
          <div>
            <p className="ml-2 text-slate-500/90">Điểm mạnh</p>
            <input
              value={form.KT_KDCL_DGDC_NghienCuu_BaoCao_DiemManh || ''}
              onChange={(event) =>
                setForm({
                  ...form,
                  KT_KDCL_DGDC_NghienCuu_BaoCao_DiemManh: event.target.value,
                })
              }
              className="base-input w-full"
              placeholder="Nhập điểm mạnh"
            />
          </div>
          <div>
            <p className="text-vs-text ml-2">Lĩnh vực cần cải tiến</p>
            <input
              value={form.KT_KDCL_DGDC_NghienCuu_BaoCao_LinhVuc || ''}
              onChange={(event) =>
                setForm({
                  ...form,
                  KT_KDCL_DGDC_NghienCuu_BaoCao_LinhVuc: event.target.value,
                })
              }
              className="base-input w-full"
              placeholder="Nhập nội dung lĩnh vực cần cải tiến"
            />
          </div>
          <div>
            <p className="text-vs-text ml-2">
              Minh chứng/thông tin cần bổ sung
            </p>
            <input
              value={form.KT_KDCL_DGDC_NghienCuu_BaoCao_MC_TTBS || ''}
              onChange={(event) =>
                setForm({
                  ...form,
                  KT_KDCL_DGDC_NghienCuu_BaoCao_MC_TTBS: event.target.value,
                })
              }
              className="base-input w-full"
              placeholder="Nhập thông tin cần bổ sung"
            />
          </div>
          <div>
            <p className="text-vs-text ml-2">
              Dự kiến kết quả/đánh giá (1 - 5)
            </p>
            <input
              value={form.KT_KDCL_DGDC_NghienCuu_BaoCao_DuKien_KQDG || ''}
              onChange={(event) =>
                setForm({
                  ...form,
                  KT_KDCL_DGDC_NghienCuu_BaoCao_DuKien_KQDG: event.target.value,
                })
              }
              type="number"
              className="base-input w-full"
              placeholder="Nhập dự kiến kết quả/đánh giá"
            />
          </div>
        </div>
      </DrawerContent>
      <DrawerFooter>
        <div className="flex items-center justify-end gap-2">
          <Button color="danger" onClick={() => setIsOpen(false)}>
            Huỷ
          </Button>
          <Button onClick={handleSubmit}>Cập nhật</Button>
        </div>
      </DrawerFooter>
    </Drawer>
  )
}

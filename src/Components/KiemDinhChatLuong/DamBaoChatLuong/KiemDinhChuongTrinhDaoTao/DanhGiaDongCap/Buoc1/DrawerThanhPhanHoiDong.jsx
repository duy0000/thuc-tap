import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import { Drawer, Select } from '@/Components/Base'
import { DrawerContent } from '@/Components/Base/Drawer/Drawer.Content'
import { DrawerFooter } from '@/Components/Base/Drawer/Drawer.Footer'
import { DrawerHeader } from '@/Components/Base/Drawer/Drawer.Header'
import Button from '@/Components/Base/Button/Button'
import { isNil, keys } from 'lodash-unified'
import {
  chucVu,
  HoSoKiemDinhCtx,
  LoaiThanhPhanHoiDongEnum,
  NhiemVuEnumText,
  stepStatusEnum,
} from '@/Services/Tokens'
import { postThanhPhanHoiDong, putThanhPhanHoiDong } from '@/Apis/KDCL'
import { useThanhPhanHoiDongStore } from '@/Services/Store'
import {
  postDGDCPhanCongThucHien,
  putDGDCPhanCongThucHien,
} from '@/Apis/KDCL/DamBaoChatLuong/apiDGDC_PhanCongThucHien'
import { useDGDC_PhanCongThucHienStore } from '@/Services/Store/Module/KiemDinhChatLuong/DGDC_phanCongThucHien'
import { isTrue, required } from '@/Services/Validators'

export default function DrawerThanhPhanHoiDong({
  isOpen,
  setIsOpen,
  form,
  setForm,
}) {
  const hoSoKiemDinhCtx = useContext(HoSoKiemDinhCtx)

  const { refetch: refetchListThanhPhanHoiDong } = useThanhPhanHoiDongStore()
  const { listPhanCongThucHien, refetch: refetchListPhanCongThucHien } =
    useDGDC_PhanCongThucHienStore()
  const drawerRef = useRef()
  const [isPosting, setIsPosting] = useState(false)

  const listPhanCongThucHienHoiDong = useMemo(() => {
    return listPhanCongThucHien.filter(
      (e) =>
        e.KT_KDCL_DGDC_PhanCongThucHien_IDThanhLapHoiDong ===
        hoSoKiemDinhCtx.hoiDong.KT_KDCL_CTDT_ThanhLapHoiDong_ID,
    )
  }, [listPhanCongThucHien, hoSoKiemDinhCtx.hoiDong])

  const listTieuChuan = useMemo(() => {
    return hoSoKiemDinhCtx.listTieuChuan.filter((tieuChuan) => {
      const phanCongTieuChuan = listPhanCongThucHienHoiDong.find(
        (e) =>
          e.KT_KDCL_DGDC_PhanCongThucHien_IDTieuChuan ===
          tieuChuan.KT_KDCL_TieuChuan_ID,
      )

      if (!phanCongTieuChuan) return true

      const isTieuChuanAssignedToCurrentUser =
        phanCongTieuChuan.KT_KDCL_DGDC_PhanCongThucHien_IDThanhPhanHoiDong ===
        form.KT_KDCL_DGDC_PhanCongThucHien
          ?.KT_KDCL_DGDC_PhanCongThucHien_IDThanhPhanHoiDong

      return isTieuChuanAssignedToCurrentUser
    })
  }, [listPhanCongThucHienHoiDong, hoSoKiemDinhCtx.listTieuChuan, form])

  const validate = () =>
    [
      () =>
        required(
          form.KT_KDCL_CTDT_ThanhPhanHoiDong_MaNhanSu,
          'Vui lòng nhập mã nhân sự',
        ),
      () =>
        required(
          form.KT_KDCL_CTDT_ThanhPhanHoiDong_HoTen,
          'Vui lòng nhập họ tên',
        ),
      // () =>
      //   required(
      //     form.KT_KDCL_CTDT_ThanhPhanHoiDong_LoaiNhanSu,
      //     'Vui lòng chọn loại nhân sự',
      //   ),
      () =>
        required(
          form.KT_KDCL_CTDT_ThanhPhanHoiDong_NhiemVu,
          'Vui lòng chọn nhiệm vụ',
        ),
      () =>
        required(
          form.KT_KDCL_CTDT_ThanhPhanHoiDong_ChucVu,
          'Vui lòng chọn chức vụ',
        ),
      () =>
        required(
          form.KT_KDCL_DGDC_PhanCongThucHien_IDTieuChuan,
          'Vui lòng tiêu chuẩn phân công',
        ),
    ].every(isTrue)

  const handleSubmit = async () => {
    if (isPosting || !validate()) return

    try {
      setIsPosting(true)

      let action = postThanhPhanHoiDong

      let KT_KDCL_CTDT_ThanhPhanHoiDong_ID =
        form.KT_KDCL_CTDT_ThanhPhanHoiDong_ID

      if (form.KT_KDCL_CTDT_ThanhPhanHoiDong_ID) {
        action = putThanhPhanHoiDong
      }

      const res = await action({
        ...form,
        KT_KDCL_CTDT_ThanhPhanHoiDong_IDThanhLapHoiDong:
          hoSoKiemDinhCtx.hoiDong.KT_KDCL_CTDT_ThanhLapHoiDong_ID,
        KT_KDCL_CTDT_ThanhPhanHoiDong_LoaiThanhPhan:
          LoaiThanhPhanHoiDongEnum.DGDC_ThanhPhanHoiDong,
      })

      if (!KT_KDCL_CTDT_ThanhPhanHoiDong_ID) {
        KT_KDCL_CTDT_ThanhPhanHoiDong_ID =
          res.data.body[0].KT_KDCL_CTDT_ThanhPhanHoiDong_ID
      }

      let actionPhanCongThucHien = putDGDCPhanCongThucHien
      if (
        isNil(
          form.KT_KDCL_DGDC_PhanCongThucHien?.KT_KDCL_DGDC_PhanCongThucHien_ID,
        )
      ) {
        actionPhanCongThucHien = postDGDCPhanCongThucHien
      }

      await actionPhanCongThucHien({
        KT_KDCL_DGDC_PhanCongThucHien_TrangThaiNghienCuu:
          stepStatusEnum.DangThucHien,
        KT_KDCL_DGDC_PhanCongThucHien_TrangThaiDanhGia:
          stepStatusEnum.DangThucHien,
        ...form.KT_KDCL_DGDC_PhanCongThucHien,
        KT_KDCL_DGDC_PhanCongThucHien_IDThanhPhanHoiDong:
          KT_KDCL_CTDT_ThanhPhanHoiDong_ID,
        KT_KDCL_DGDC_PhanCongThucHien_IDTieuChuan:
          form.KT_KDCL_DGDC_PhanCongThucHien_IDTieuChuan,
      })

      await refetchListPhanCongThucHien()
      await refetchListThanhPhanHoiDong()
      setIsOpen(false)
      Swal.fire({
        icon: 'success',
        title: 'Thông báo',
        text: 'Cập nhật thành công!',
      })
    } catch (e) {
      console.log(e)
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
      drawerRef.current.open()
    } else {
      drawerRef.current.close()
    }
  }, [isOpen])

  return (
    <Drawer ref={drawerRef} onClosed={() => setForm({})}>
      <DrawerHeader>
        <h3 className="uppercase cursor-default text-uneti-primary-light ml-3 font-semibold whitespace-text max-w-[320px] md:max-w-[unset]">
          Cập nhật thông tin thành viên đoàn đánh giá ngoài
        </h3>
      </DrawerHeader>

      <DrawerContent>
        <div className="flex flex-col gap-1 md:gap-3">
          <div>
            <p className="text-vs-text ml-2">Mã nhân sự</p>
            <input
              value={form.KT_KDCL_CTDT_ThanhPhanHoiDong_MaNhanSu || ''}
              onChange={(event) =>
                setForm({
                  ...form,
                  KT_KDCL_CTDT_ThanhPhanHoiDong_MaNhanSu: event.target.value,
                })
              }
              className="base-input w-full"
              placeholder="Nhập mã nhân sự"
            />
          </div>
          <div className="mt-3">
            <p className="text-vs-text ml-2">Họ tên</p>
            <input
              value={form.KT_KDCL_CTDT_ThanhPhanHoiDong_HoTen || ''}
              onChange={(event) =>
                setForm({
                  ...form,
                  KT_KDCL_CTDT_ThanhPhanHoiDong_HoTen: event.target.value,
                })
              }
              className="base-input w-full"
              placeholder="Nhập họ tên"
            />
          </div>
          <div className="mt-3">
            <p className="text-vs-text ml-2">Chức vụ</p>
            <Select
              data={chucVu}
              label="Chọn chức vụ"
              modelValue={
                form.KT_KDCL_CTDT_ThanhPhanHoiDong_ChucVu?.length
                  ? form.KT_KDCL_CTDT_ThanhPhanHoiDong_ChucVu.split(';')
                  : []
              }
              onChange={(val) => {
                setForm({
                  ...form,
                  KT_KDCL_CTDT_ThanhPhanHoiDong_ChucVu: val.length
                    ? val.join(';')
                    : '',
                })
              }}
              triggerClass="w-full"
              multiple
            />
          </div>
          <div className="mt-3">
            <p className="text-vs-text ml-2">Nhiệm vụ</p>
            <Select
              data={keys(NhiemVuEnumText).map((key) => ({
                label: NhiemVuEnumText[key],
                value: key,
              }))}
              label="Chọn nhiệm vụ"
              modelValue={form.KT_KDCL_CTDT_ThanhPhanHoiDong_NhiemVu}
              onChange={(val) =>
                setForm({
                  ...form,
                  KT_KDCL_CTDT_ThanhPhanHoiDong_NhiemVu: val,
                })
              }
              triggerClass="w-full"
              labelKey="label"
              valueKey="value"
            />
          </div>

          {/* <div className="mt-3">
            <p className="text-vs-text ml-2">Loại nhân sự</p>
            <Select
              data={loaiNhanSu}
              label="Chọn Loại nhân sự"
              modelValue={form.KT_KDCL_CTDT_ThanhPhanHoiDong_LoaiNhanSu}
              onChange={(val) =>
                setForm({
                  ...form,
                  KT_KDCL_CTDT_ThanhPhanHoiDong_LoaiNhanSu: isNumber(val)
                    ? val
                    : '',
                })
              }
              valueKey="value"
              labelKey="label"
              triggerClass="w-full"
            />
          </div> */}

          <div className="mt-3">
            <p className="text-vs-text ml-2">Tiêu chuẩn phân công</p>
            <Select
              data={listTieuChuan}
              label="Chọn tiêu chuẩn"
              modelValue={form.KT_KDCL_DGDC_PhanCongThucHien_IDTieuChuan}
              onChange={(val) =>
                setForm({
                  ...form,
                  KT_KDCL_DGDC_PhanCongThucHien_IDTieuChuan: val,
                })
              }
              triggerClass="w-full"
              valueKey="KT_KDCL_TieuChuan_ID"
              labelKey="KT_KDCL_TieuChuan_Ma"
              dangerouslySetInnerHTML
            />
          </div>
        </div>
      </DrawerContent>

      <DrawerFooter>
        <div className="flex justify-end gap-2">
          <Button
            onClick={() => {
              drawerRef.current.close()
              setTimeout(() => {
                setIsOpen(false)
              }, 150)
            }}
            disabled={isPosting}
            color="danger"
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

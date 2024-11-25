import {
  useImperativeHandle,
  useRef,
  forwardRef,
  useEffect,
  useState,
} from 'react'
import { Drawer, Select } from '@/Components/Base'
import { includes, keys } from 'lodash-unified'
import { chucVu, NhiemVuEnumText } from '@/Services/Tokens'
import Button from '@/Components/Base/Button/Button'
import DialogChonThanhPhanHoiDong from './DialogChonThanhPhanHoiDong'
import { getHocHamHocVi } from '@/Apis/KDCL/CSDLDonVi/apiHocHamHocVi'
import { useQuery } from '@tanstack/react-query'

export default forwardRef(function DrawerCreateUpdateThanhPhanHoiDong(
  { form, setForm, formTitle, onSubmit, onCanceled, isOpenForm, isPosting },
  ref,
) {
  const drawerRef = useRef()

  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [_formChucVu] = useState(
    form.KT_KDCL_CTDT_ThanhPhanHoiDong_ChucVu?.split(';') || [],
  )

  const { data: listHocHamHocVi } = useQuery({
    queryKey: ['KT_KDCL_HocHamHocVi'],
    queryFn: async () => {
      const res = await getHocHamHocVi()
      return res.data.body
    },
  })

  const handleThemThanhVien = (thanhVienChuChot) => {
    setForm((p) => ({
      ...p,
      KT_KDCL_CTDT_ThanhPhanHoiDong_MaNhanSu:
        thanhVienChuChot.KT_KDCL_CanBoChuChot_MaNhanSu,
      KT_KDCL_CTDT_ThanhPhanHoiDong_HoTen:
        thanhVienChuChot.KT_KDCL_CanBoChuChot_HoDem +
        ' ' +
        thanhVienChuChot.KT_KDCL_CanBoChuChot_Ten,
      KT_KDCL_CTDT_ThanhPhanHoiDong_ChucVu:
        thanhVienChuChot.KT_KDCL_CanBoChuChot_ChucVu,
    }))
  }

  const _onCanceled = () => {
    onCanceled()
    drawerRef.current?.close()
  }

  useEffect(() => {
    if (isOpenForm) drawerRef.current?.open()
    else drawerRef.current?.close()
  }, [isOpenForm])

  useImperativeHandle(ref, () => ({
    open: () => drawerRef.current?.open(),
    close: () => drawerRef.current?.close(),
  }))

  return (
    <>
      <Drawer ref={drawerRef}>
        <Drawer.Header>
          <h3 className="text-uneti-primary font-medium text-lg px-1">
            {formTitle}
          </h3>
        </Drawer.Header>

        <Drawer.Content>
          <div className="w-80">
            <div>
              <div className="flex justify-between items-end mb-[2px]">
                <label
                  htmlFor="KT_KDCL_CTDT_ThanhPhanHoiDong_MaNhanSu"
                  className="text-vs-text/80 ml-2"
                >
                  Mã nhân sự <span className="text-red-400">*</span>
                </label>
                <span
                  onClick={() => {
                    setIsOpenDialog(true)
                  }}
                  className="underline hover:text-uneti-primary cursor-pointer select-none"
                >
                  Chọn từ danh sách
                </span>
              </div>
              <input
                value={form.KT_KDCL_CTDT_ThanhPhanHoiDong_MaNhanSu}
                onChange={(event) =>
                  setForm({
                    ...form,
                    KT_KDCL_CTDT_ThanhPhanHoiDong_MaNhanSu: event.target.value,
                  })
                }
                className="base-input w-full"
                placeholder="Nhập mã nhân sự"
                id="KT_KDCL_CTDT_ThanhPhanHoiDong_MaNhanSu"
              />
            </div>
            <div className="mt-3">
              <label
                htmlFor="KT_KDCL_CTDT_ThanhPhanHoiDong_HoTen"
                className="text-vs-text/80 ml-2"
              >
                Họ tên<span className="text-red-400">*</span>
              </label>
              <input
                value={form.KT_KDCL_CTDT_ThanhPhanHoiDong_HoTen}
                onChange={(event) =>
                  setForm({
                    ...form,
                    KT_KDCL_CTDT_ThanhPhanHoiDong_HoTen: event.target.value,
                  })
                }
                className="base-input w-full"
                placeholder="Nhập họ tên"
                id="KT_KDCL_CTDT_ThanhPhanHoiDong_HoTen"
              />
            </div>
            {/* <div className="mt-3">
            <p className="text-vs-text/80 ml-2">Loại nhân sự</p>
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
              <p className="text-vs-text/80 ml-2">
                Chức vụ
                <span className="text-red-400">*</span>
              </p>
              <Select
                data={[
                  ...chucVu,
                  ..._formChucVu.filter((e) => !includes(chucVu, e)),
                ].filter((e) => e)}
                label="Chọn chức vụ"
                modelValue={
                  form.KT_KDCL_CTDT_ThanhPhanHoiDong_ChucVu.length
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
                allowCreate
              />
            </div>
            <div className="mt-3">
              <p className="text-vs-text/80 ml-2">Học hàm/học vị</p>
              <Select
                data={listHocHamHocVi}
                label="Chọn học hàm/học vị"
                modelValue={
                  form.KT_KDCL_CTDT_ThanhPhanHoiDong_HocHamHocVi_Edit || ''
                }
                onChange={(val) => {
                  setForm({
                    ...form,
                    KT_KDCL_CTDT_ThanhPhanHoiDong_HocHamHocVi_Edit: val,
                  })
                }}
                triggerClass="w-full"
                labelKey="HocHamHocVi"
                valueKey="VietTat"
                allowCreate
              />
            </div>
            <div className="mt-3">
              <p className="text-vs-text/80 ml-2">
                Nhiệm vụ
                <span className="text-red-400">*</span>
              </p>
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
              <p className="text-gray-600 p-1 text-[13px]">
                * Nhiệm vụ sẽ nắm giữ trong quá trình kiểm định
              </p>
            </div>
          </div>
        </Drawer.Content>

        <Drawer.Footer>
          <div className="flex gap-2 justify-end">
            <Button disabled={isPosting} color="danger" onClick={_onCanceled}>
              Hủy
            </Button>
            <Button isLoading={isPosting} onClick={onSubmit}>
              Cập nhật
            </Button>
          </div>
        </Drawer.Footer>
      </Drawer>

      <DialogChonThanhPhanHoiDong
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
        onSubmit={handleThemThanhVien}
      />
    </>
  )
})

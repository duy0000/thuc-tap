import Button from '@/Components/Base/Button/Button'
import InputDebounce from '@/Components/Base/DebounceInput/DebounceInput'
import Dialog from '@/Components/Base/Dialog/Dialog'
import { filterNhapDiemThuongKy, enumGioiTinh } from './constant'
import { useState } from 'react'
import { Select } from '@/Components/Base'
const HeaderNDTKDialog = () => {
  return (
    <h4 className="text-base text-vs-text font-semibold">Tìm kiếm nâng cao</h4>
  )
}
const FooterNDTKDialog = () => {
  return <h4>Nhập điểm thường kỳ</h4>
}
export default function NhapDiemThuongKyViewDialog(params) {
  const { openDialog, setOpenDialog, setFilter } = params
  const [filterDialog, setFilterDialog] = useState({
    ...filterNhapDiemThuongKy,
  })
  const handleFilterDialog = () => {
    setFilter({ ...filterDialog })
    setOpenDialog(false)
    setFilterDialog({
      ...filterNhapDiemThuongKy,
    })
  }
  return (
    <Dialog
      isOpen={openDialog}
      setIsOpen={setOpenDialog}
      header={<HeaderNDTKDialog />}
      footer={<FooterNDTKDialog />}
      onClosed={() => {
        setFilterDialog({
          ...filterNhapDiemThuongKy,
        })
      }}
    >
      <div className="grid gap-4 p-2">
        <div className="grid gap-3">
          <div className="flex gap-2 justify-start items-center flex-wrap relative z-[10]  ">
            <div className="flex flex-col justify-start items-start gap-1 flex-wrap text-sm ">
              <span>Mã Sinh Viên:</span>
              <InputDebounce
                value={filterDialog.MaSinhVien}
                onChange={(e) => {
                  setFilterDialog((pre) => ({
                    ...pre,
                    MaSinhVien: e.target.value,
                  }))
                }}
                width={150}
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-1 flex-wrap text-sm ">
              <span>Họ Đệm:</span>
              <InputDebounce
                value={filterDialog.HoDem}
                onChange={(e) => {
                  setFilterDialog((pre) => ({
                    ...pre,
                    HoDem: e.target.value,
                  }))
                }}
                width={150}
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-1 flex-wrap text-sm ">
              <span>Tên:</span>
              <InputDebounce
                value={filterDialog.Ten}
                onChange={(e) => {
                  setFilterDialog((pre) => ({
                    ...pre,
                    Ten: e.target.value,
                  }))
                }}
                width={150}
              />
            </div>
            <div className="z-[30] flex flex-col justify-start items-start gap-1 flex-wrap text-sm ">
              <span>Giới tính:</span>
              <Select
                modelValue={filterDialog.GioiTinh}
                data={enumGioiTinh}
                onChange={(value) => {
                  setFilterDialog((pre) => ({
                    ...pre,
                    GioiTinh: value,
                  }))
                }}
                label="Chọn giới tính"
                valueKey="value"
                labelKey="label"
                clearable={false}
                filterable={false}
                className="z-[20]"
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-1 flex-wrap text-sm ">
              <span>Lớp học:</span>
              <InputDebounce
                value={filterDialog.TenLopHoc}
                onChange={(e) => {
                  setFilterDialog((pre) => ({
                    ...pre,
                    TenLopHoc: e.target.value,
                  }))
                }}
                width={150}
              />
            </div>
          </div>
          <div className="flex gap-4 justify-start items-center flex-wrap relative z-[5]  ">
            <div className="flex flex-col justify-start items-start gap-1 flex-wrap text-sm ">
              <span>Chuyên cần:</span>
              <InputDebounce
                type="number"
                className="no-spinner"
                value={filterDialog.DiemChuyenCan1}
                onChange={(e) => {
                  setFilterDialog((pre) => ({
                    ...pre,
                    DiemChuyenCan1: e.target.value,
                  }))
                }}
                width={80}
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-1 flex-wrap text-sm ">
              <span>Được dự thi:</span>
              <InputDebounce
                value={filterDialog.DuocDuThiKetThuc}
                onChange={(e) => {
                  setFilterDialog((pre) => ({
                    ...pre,
                    DuocDuThiKetThuc: e.target.value,
                  }))
                }}
                width={80}
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-1 flex-wrap text-sm ">
              <span>Điểm thực hành:</span>
              <InputDebounce
                type="number"
                className="no-spinner"
                value={filterDialog.DiemTBThucHanh}
                onChange={(e) => {
                  setFilterDialog((pre) => ({
                    ...pre,
                    DiemTBThucHanh: e.target.value,
                  }))
                }}
                width={80}
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-1 flex-wrap text-sm ">
              <span>Điểm TB thường kỳ:</span>
              <InputDebounce
                type="number"
                className="no-spinner"
                value={filterDialog.DiemTBThuongKy}
                onChange={(e) => {
                  setFilterDialog((pre) => ({
                    ...pre,
                    DiemTBThuongKy: e.target.value,
                  }))
                }}
                width={80}
              />
            </div>
          </div>
          <h4 cl>Điểm LT hệ số 1</h4>
          <div className="flex gap-2 justify-start items-center flex-wrap relative ">
            <div className="flex flex-col justify-start items-start gap-1 flex-wrap text-sm ">
              <span>1-1:</span>
              <InputDebounce
                type="number"
                className="no-spinner"
                value={filterDialog.DiemHeSo11}
                onChange={(e) => {
                  setFilterDialog((pre) => ({
                    ...pre,
                    DiemHeSo11: e.target.value,
                  }))
                }}
                width={50}
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-1 flex-wrap text-sm ">
              <span>1-2</span>
              <InputDebounce
                type="number"
                className="no-spinner"
                value={filterDialog.DiemHeSo12}
                onChange={(e) => {
                  setFilterDialog((pre) => ({
                    ...pre,
                    DiemHeSo12: e.target.value,
                  }))
                }}
                width={50}
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-1 flex-wrap text-sm ">
              <span>1-3:</span>
              <InputDebounce
                type="number"
                className="no-spinner"
                value={filterDialog.DiemHeSo13}
                onChange={(e) => {
                  setFilterDialog((pre) => ({
                    ...pre,
                    DiemHeSo13: e.target.value,
                  }))
                }}
                width={50}
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-1 flex-wrap text-sm ">
              <span>1-4:</span>
              <InputDebounce
                type="number"
                className="no-spinner"
                value={filterDialog.DiemHeSo14}
                onChange={(e) => {
                  setFilterDialog((pre) => ({
                    ...pre,
                    DiemHeSo14: e.target.value,
                  }))
                }}
                width={50}
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-1 flex-wrap text-sm ">
              <span>1-5:</span>
              <InputDebounce
                type="number"
                className="no-spinner"
                value={filterDialog.DiemHeSo15}
                onChange={(e) => {
                  setFilterDialog((pre) => ({
                    ...pre,
                    DiemHeSo15: e.target.value,
                  }))
                }}
                width={50}
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-1 flex-wrap text-sm ">
              <span>1-6:</span>
              <InputDebounce
                type="number"
                className="no-spinner"
                value={filterDialog.DiemHeSo16}
                onChange={(e) => {
                  setFilterDialog((pre) => ({
                    ...pre,
                    DiemHeSo16: e.target.value,
                  }))
                }}
                width={50}
              />
            </div>
          </div>
          <h4>Điểm LT hệ số 2</h4>
          <div className="flex gap-2 justify-start items-center flex-wrap relative z-[10]  ">
            <div className="flex flex-col justify-start items-start gap-1 flex-wrap text-sm ">
              <span>2-1:</span>
              <InputDebounce
                type="number"
                className="no-spinner"
                value={filterDialog.DiemHeSo21}
                onChange={(e) => {
                  setFilterDialog((pre) => ({
                    ...pre,
                    DiemHeSo21: e.target.value,
                  }))
                }}
                width={50}
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-1 flex-wrap text-sm ">
              <span>2-2</span>
              <InputDebounce
                type="number"
                className="no-spinner"
                value={filterDialog.DiemHeSo22}
                onChange={(e) => {
                  setFilterDialog((pre) => ({
                    ...pre,
                    DiemHeSo22: e.target.value,
                  }))
                }}
                width={50}
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-1 flex-wrap text-sm ">
              <span>2-3:</span>
              <InputDebounce
                type="number"
                className="no-spinner"
                value={filterDialog.DiemHeSo23}
                onChange={(e) => {
                  setFilterDialog((pre) => ({
                    ...pre,
                    DiemHeSo23: e.target.value,
                  }))
                }}
                width={50}
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-1 flex-wrap text-sm ">
              <span>2-4:</span>
              <InputDebounce
                type="number"
                className="no-spinner"
                value={filterDialog.DiemHeSo24}
                onChange={(e) => {
                  setFilterDialog((pre) => ({
                    ...pre,
                    DiemHeSo24: e.target.value,
                  }))
                }}
                width={50}
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-1 flex-wrap text-sm ">
              <span>2-5:</span>
              <InputDebounce
                type="number"
                className="no-spinner"
                value={filterDialog.DiemHeSo25}
                onChange={(e) => {
                  setFilterDialog((pre) => ({
                    ...pre,
                    DiemHeSo25: e.target.value,
                  }))
                }}
                width={50}
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-1 flex-wrap text-sm ">
              <span>2-6:</span>
              <InputDebounce
                type="number"
                className="no-spinner"
                value={filterDialog.DiemHeSo26}
                onChange={(e) => {
                  setFilterDialog((pre) => ({
                    ...pre,
                    DiemHeSo26: e.target.value,
                  }))
                }}
                width={50}
              />
            </div>
          </div>
        </div>
        <Button onClick={handleFilterDialog} className="font-semibold">
          Lọc
        </Button>
      </div>
    </Dialog>
  )
}

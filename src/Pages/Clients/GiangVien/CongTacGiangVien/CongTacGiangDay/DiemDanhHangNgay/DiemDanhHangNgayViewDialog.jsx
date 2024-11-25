import Button from '@/Components/Base/Button/Button'
import InputDebounce from '@/Components/Base/DebounceInput/DebounceInput'
import Dialog from '@/Components/Base/Dialog/Dialog'
import { useState } from 'react'
import { filterDiemDanhHangNgay } from './constant'

const HeaderDDHNVDialog = () => {
  return (
    <h4 className="text-base text-vs-text font-semibold">Tìm kiếm nâng cao </h4>
  )
}
const FooterDDHNVDialog = () => {
  return <h4>Điểm danh hằng ngày </h4>
}

export default function DiemDanhHangNgayViewDialog(params) {
  const { openDialog, setOpenDialog, setFilter } = params
  const [filterDialog, setFilterDialog] = useState({
    ...filterDiemDanhHangNgay,
  })
  const handleFilterDialog = () => {
    setFilter({ ...filterDialog })
    setOpenDialog(false)
    setFilterDialog({
      ...filterDiemDanhHangNgay,
    })
  }
  return (
    <Dialog
      isOpen={openDialog}
      setIsOpen={setOpenDialog}
      header={<HeaderDDHNVDialog />}
      footer={<FooterDDHNVDialog />}
      onClosed={() => {
        setFilterDialog({
          ...filterDiemDanhHangNgay,
        })
      }}
    >
      <div className="grid gap-4 p-2">
        <div className="grid gap-3">
          <div className="flex gap-3 justify-start items-center flex-wrap relative z-[10]  ">
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
            <div className="flex flex-col justify-start items-start gap-1 flex-wrap text-sm ">
              <span>Ngày sinh:</span>
              <InputDebounce
                type="date"
                value={filterDialog.NgaySinh}
                onChange={(e) => {
                  setFilterDialog((pre) => ({
                    ...pre,
                    NgaySinh: e.target.value,
                  }))
                }}
                width={150}
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-1 flex-wrap text-sm ">
              <span>Lớp học:</span>
              <InputDebounce
                value={filterDialog.TenLop}
                onChange={(e) => {
                  setFilterDialog((pre) => ({
                    ...pre,
                    TenLop: e.target.value,
                  }))
                }}
                width={150}
              />
            </div>
            <div className="flex gap-3 justify-start items-center flex-wrap relative z-[10]  ">
              <div className="flex flex-col justify-start items-start gap-1 flex-wrap text-sm ">
                <span>Có phép:</span>
                <InputDebounce
                  value={filterDialog.CoPhep}
                  onChange={(e) => {
                    setFilterDialog((pre) => ({
                      ...pre,
                      CoPhep: e.target.value,
                    }))
                  }}
                  width={50}
                />
              </div>
              <div className="flex flex-col justify-start items-start gap-1 flex-wrap text-sm ">
                <span>Không phép:</span>
                <InputDebounce
                  value={filterDialog.KhongPhep}
                  onChange={(e) => {
                    setFilterDialog((pre) => ({
                      ...pre,
                      KhongPhep: e.target.value,
                    }))
                  }}
                  width={50}
                />
              </div>
              <div className="flex flex-col justify-start items-start gap-1 flex-wrap text-sm ">
                <span>Số tiết:</span>
                <InputDebounce
                  type="number"
                  value={filterDialog.SoTiet}
                  onChange={(e) => {
                    setFilterDialog((pre) => ({
                      ...pre,
                      SoTiet: e.target.value,
                    }))
                  }}
                  width={50}
                  className="no-spinner"
                />
              </div>
              <div className="flex flex-col justify-start items-start gap-1 flex-wrap text-sm ">
                <span>Ghi chú:</span>
                <InputDebounce
                  value={filterDialog.GhiChu}
                  onChange={(e) => {
                    setFilterDialog((pre) => ({
                      ...pre,
                      GhiChu: e.target.value,
                    }))
                  }}
                  width={120}
                />
              </div>
              <div className="flex flex-col justify-start items-start gap-1 flex-wrap text-sm ">
                <span>Vắng có phép:</span>
                <InputDebounce
                  type="number"
                  className="no-spinner"
                  value={filterDialog.VangCoPhep}
                  onChange={(e) => {
                    setFilterDialog((pre) => ({
                      ...pre,
                      VangCoPhep: e.target.value,
                    }))
                  }}
                  width={50}
                />
              </div>
              <div className="flex flex-col justify-start items-start gap-1 flex-wrap text-sm ">
                <span>Vắng không phép:</span>
                <InputDebounce
                  type="number"
                  className="no-spinner"
                  value={filterDialog.VangKhongPhep}
                  onChange={(e) => {
                    setFilterDialog((pre) => ({
                      ...pre,
                      VangKhongPhep: e.target.value,
                    }))
                  }}
                  width={50}
                />
              </div>
              <div className="flex flex-col justify-start items-start gap-1 flex-wrap text-sm ">
                <span>Tổng số tiết:</span>
                <InputDebounce
                  type="number"
                  className="no-spinner"
                  value={filterDialog.TongSoTiet}
                  onChange={(e) => {
                    setFilterDialog((pre) => ({
                      ...pre,
                      TongSoTiet: e.target.value,
                    }))
                  }}
                  width={50}
                />
              </div>
              <div className="flex flex-col justify-start items-start gap-1 flex-wrap text-sm ">
                <span>Tỉ lệ vắng:</span>
                <InputDebounce
                  type="number"
                  className="no-spinner"
                  value={filterDialog.TiLeVang}
                  onChange={(e) => {
                    setFilterDialog((pre) => ({
                      ...pre,
                      TiLeVang: e.target.value,
                    }))
                  }}
                  width={50}
                />
              </div>
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

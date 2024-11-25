import { Select } from '@/Components/Base'
import Button from '@/Components/Base/Button/Button'
import Loading from '@/Components/Loading/Loading'
import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import { InputNumber } from '@/Components/Base/InputNumber'
import { Input } from '@/Components/Base/Input/Input'
import { enumCoSoUNETI, enumTrangThaiSinhVien, enumGioiTinh } from './constant'
import InputDebounce from '@/Components/Base/DebounceInput/DebounceInput'
import { MdOutlineFilterAltOff } from 'react-icons/md'
import Icon from '@/Components/Base/Icon/Icon'
import { Tooltip } from '@mui/material'
import NhapDiemThuongKyViewDialog from './NhapDiemThuongKyViewDialog'
import { filterNhapDiemThuongKy } from './constant'
import RequireIcon from '@/Components/Base/RequireIcon/RequireIcon'
import NhapDiemThuongKyDropdown from './NhapDiemThuongKyDropdown'
export default function NhapDiemThuongKyView(props) {
  const {
    home,
    breadcrumbs,
    isLoading,
    listHocKy,
    currentHocKy,
    setCurrentHocKy,
    currentCoSo,
    setCurrentCoSo,
    currentMonHoc,
    setCurrentMonHoc,
    currentLopHoc,
    setCurrentLopHoc,
    currentTrangThaiSinhVien,
    setCurrentTrangThaiSinhVien,
    currentMaLopHocPhan,
    setCurrentMaLopHocPhan,
    listDanhSachHocPhan,
    listNhapDiemThuongKy,
    filter,
    setFilter,
    openDialog,
    setOpenDialog,
    openDropdown,
    setOpenDropdown,
    dataSubmit,
    setDataSubmit,
  } = props
  return (
    <div className="bg-vs-theme-layout rounded-2xl mx-4 xl:mx-0 p-4">
      <div className="p-4 flex flex-col gap-4">
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />
        <h2 className="text-center uppercase text-lg md:text-2xl font-semibold text-sky-800">
          Nhập điểm thường kỳ
        </h2>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-4 p-4">
          <div>
            <RequireIcon />
            <span className="text-vs-text font-semibold">: Bắt buộc</span>
          </div>
          <div className="flex flex-col  justify-start gap-3 mb-4">
            <div className="grid grid-cols-[60%,40%] gap-4">
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-2 gap-y-3">
                <div className="grid gap-1">
                  <span className="font-semibold ">
                    Đợt <RequireIcon />
                  </span>
                  <Select
                    modelValue={currentHocKy}
                    data={listHocKy}
                    onChange={(value) => {
                      setCurrentHocKy(value)
                    }}
                    labelKey="label"
                    valueKey="value"
                    label="Chọn học kỳ"
                    clearable={false}
                    filterable={false}
                    triggerClass="w-full"
                  />
                </div>
                <div className="grid gap-1">
                  <span className="font-semibold ">
                    Cơ sở <RequireIcon />
                  </span>
                  <Select
                    modelValue={currentCoSo}
                    onChange={(value) => {
                      setCurrentCoSo(value)
                    }}
                    data={enumCoSoUNETI}
                    labelKey="label"
                    valueKey="value"
                    label="Chọn cơ sở"
                    clearable={false}
                    filterable={false}
                    triggerClass="w-full"
                  />
                </div>
                <div className="grid gap-1">
                  <span className="font-semibold ">Môn học</span>
                  <Input
                    value={currentMonHoc}
                    onChange={(value) => {
                      console.log(value)
                      setCurrentMonHoc(value)
                    }}
                  />
                </div>
                <div className="grid gap-1">
                  <span className="font-semibold ">Lớp học </span>
                  <Input
                    value={currentLopHoc}
                    onChange={(value) => {
                      setCurrentLopHoc(value)
                    }}
                  />
                </div>
                <div className="grid gap-1">
                  <span className="font-semibold ">Mã lớp học phần </span>
                  <Input
                    value={currentMaLopHocPhan}
                    onChange={(value) => {
                      setCurrentMaLopHocPhan(value)
                    }}
                  />
                </div>
                <div className="grid gap-1">
                  <span className="font-semibold ">Trạng thái sinh viên</span>
                  <Select
                    modelValue={currentTrangThaiSinhVien}
                    onChange={(value) => {
                      setCurrentTrangThaiSinhVien(value)
                    }}
                    data={enumTrangThaiSinhVien}
                    labelKey="label"
                    valueKey="value"
                    label="Chọn trạng thái"
                    clearable={false}
                    filterable={false}
                    triggerClass="w-full"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 overflow-auto ">
                <h4 className="font-semibold ">Danh sách lớp học phần</h4>
                {listDanhSachHocPhan && listDanhSachHocPhan.length > 0 && (
                  <NhapDiemThuongKyDropdown
                    currentHocKy={currentHocKy}
                    setDataSubmit={setDataSubmit}
                    label="hà nội"
                    items={listDanhSachHocPhan}
                  />
                )}
              </div>
            </div>
            <Button
              className="max-w-[200px] min-w-[120px] w-full item-center text-center mx-auto "
              onClick={() => {
                setDataSubmit({
                  MaGiangVien: '01011013',
                  HocKy: currentHocKy,
                  CoSo: currentCoSo,
                  MonHoc: currentMonHoc,
                  LopHoc: currentLopHoc,
                  MaLopHocPhan: currentMaLopHocPhan,
                  TrangThaiSinhVien: currentTrangThaiSinhVien,
                })
              }}
            >
              Tìm
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-vs-danger">Quy ước cột điểm QC_08_2021D</span>
            <div className="flex flex-wrap items-center justify-start gap-2 ">
              <Button>Tính điểm chuyên cần</Button>
              <Button>Lưu điểm</Button>
              <Button>Nhập bằng Excel</Button>
              <Button>Khóa điểm & Xét điều kiện dự thi</Button>
              <Button>Xuất excel</Button>
            </div>
          </div>
          <div>
            <Button
              className="max-w-[200px] text-sm"
              onClick={() => {
                setOpenDialog(true)
              }}
            >
              <span>Tìm kiếm nâng cao</span>
              <Icon>
                <MdOutlineFilterAltOff />
              </Icon>
            </Button>
            <NhapDiemThuongKyViewDialog
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
              setFilter={setFilter}
            />
          </div>

          <div className="w-full max-h-[600px] overflow-auto rounded-md border border-gray-300">
            <table className="min-w-max w-full border-spacing-0">
              <thead className="text-white sticky top-0 z-[10] h-[100px]">
                <tr>
                  <th
                    className={`z-[10] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2  w-[50px] relative xl:sticky xl:left-0`}
                    rowSpan={3}
                  >
                    STT
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </th>
                  <th
                    className={`z-[10] text-xs border border-gray-300  bg-uneti-primary p-2  w-[50px] relative xl:sticky xl:left-[50px]`}
                    colSpan={5}
                  >
                    Thông tin sinh viên
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </th>
                  <th
                    className={`z-[10] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2  w-[50px] relative xl:sticky xl:left-[550px] `}
                    rowSpan={3}
                  >
                    Chuyên cần
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </th>
                  <th
                    className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2  w-[50px] relative `}
                    colSpan={12}
                  >
                    Thường xuyên 40%
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </th>
                  <th
                    className={`text-xs border border-gray-300 bg-uneti-primary p-2 relative `}
                    rowSpan={3}
                  >
                    Được dự thi
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </th>
                  <th
                    className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2  w-[50px] relative `}
                    rowSpan={3}
                  >
                    Thực hành
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </th>
                  <th
                    className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2  w-[50px] relative `}
                    rowSpan={3}
                  >
                    TB thường kỳ
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </th>
                  <th
                    className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2  w-[50px] relative `}
                    rowSpan={3}
                  >
                    Ghi chú
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </th>
                </tr>
                <tr>
                  <th
                    className={`z-[10] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2  w-[50px] relative xl:sticky xl:left-[50px]`}
                    colSpan={5}
                  >
                    LHP :{' '}
                    {!!dataSubmit
                      ? dataSubmit.MaLopHocPhan +
                        '-' +
                        dataSubmit.MonHoc +
                        '-' +
                        dataSubmit.LopHoc
                      : 'Chưa chọn lớp học phần!'}
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </th>
                  <th
                    className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2  w-[50px] relative `}
                    colSpan={6}
                  >
                    LT hệ số 1
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </th>
                  <th
                    className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2  w-[50px] relative `}
                    colSpan={6}
                  >
                    LT hệ số 2
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </th>
                </tr>
                <tr>
                  <th
                    className={`z-[10] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2  w-[100px] relative xl:sticky xl:left-[50px]`}
                  >
                    Mã sinh viên
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </th>
                  <th
                    className={`z-[10] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 w-[100px]  relative xl:sticky xl:left-[150px]`}
                  >
                    Họ đệm
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </th>
                  <th
                    className={`z-[10] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2  w-[100px]  relative xl:sticky xl:left-[250px]`}
                  >
                    Tên
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </th>
                  <th
                    className={`z-[10] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 w-[100px]  relative xl:sticky xl:left-[350px]`}
                  >
                    Giới tính
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </th>
                  <th
                    className={`z-[10] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 w-[100px] relative xl:sticky xl:left-[450px]`}
                  >
                    Lớp học
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </th>
                  <th
                    className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2  w-[50px] relative `}
                  >
                    1
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </th>
                  <th
                    className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2  w-[50px] relative `}
                  >
                    2
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </th>
                  <th
                    className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2  w-[50px] relative `}
                  >
                    3
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </th>
                  <th
                    className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2  w-[50px] relative `}
                  >
                    4
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </th>
                  <th
                    className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2  w-[50px] relative `}
                  >
                    5
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </th>
                  <th
                    className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2  w-[50px] relative `}
                  >
                    6
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </th>
                  <th
                    className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2  w-[50px] relative `}
                  >
                    1
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </th>
                  <th
                    className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2  w-[50px] relative `}
                  >
                    2
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </th>
                  <th
                    className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2  w-[50px] relative `}
                  >
                    3
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </th>
                  <th
                    className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 w-[50px] relative `}
                  >
                    4
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </th>
                  <th
                    className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 w-[50px] relative `}
                  >
                    5
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </th>
                  <th
                    className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2  w-[50px] relative `}
                  >
                    6
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="sticky top-[100px] z-[11]">
                  <td className="text-xs z-[5] bg-white  border border-gray-300 border-l-0 p-2 relative lg:sticky lg:left-0 text-center">
                    <Tooltip title={`Xóa bộ lọc`}>
                      <button
                        onClick={() => {
                          setFilter({
                            ...filterNhapDiemThuongKy,
                          })
                        }}
                        className="rounded-md transition-all hover:bg-red-50 p-2 text-vs-danger"
                      >
                        <Icon>
                          <MdOutlineFilterAltOff />
                        </Icon>
                      </button>
                    </Tooltip>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </td>
                  <td className="text-xs z-[5] bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[50px] text-center">
                    <InputDebounce
                      className="no-spinner"
                      type="number"
                      value={filter.MaSinhVien}
                      onChange={(e) => {
                        setFilter((pre) => ({
                          ...pre,
                          MaSinhVien: e.target.value,
                        }))
                      }}
                    />
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </td>
                  <td className="text-xs z-[5] bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[150px] text-center">
                    <InputDebounce
                      value={filter.HoDem}
                      onChange={(e) => {
                        setFilter((pre) => ({
                          ...pre,
                          HoDem: e.target.value,
                        }))
                      }}
                    />
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </td>
                  <td className="text-xs z-[5] bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[250px] text-center">
                    <InputDebounce
                      value={filter.Ten}
                      onChange={(e) => {
                        setFilter((pre) => ({
                          ...pre,
                          Ten: e.target.value,
                        }))
                      }}
                    />
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </td>
                  <td className="text-xs z-[15] bg-white border border-gray-300 p-2 relative lg:sticky  lg:left-[350px] text-center">
                    <Select
                      data={enumGioiTinh}
                      placement="top"
                      modelValue={filter.GioiTinh}
                      onChange={(value) => {
                        setFilter((pre) => ({
                          ...pre,
                          GioiTinh: value,
                        }))
                      }}
                      labelKey="label"
                      valueKey="value"
                      label="Chọn giới tính"
                      clearable={false}
                      filterable={false}
                      triggerClass="!w-[80px]"
                    />
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </td>
                  <td className="text-xs z-[5] bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[450px] text-center">
                    <InputDebounce
                      value={filter.TenLopHoc}
                      onChange={(e) => {
                        setFilter((pre) => ({
                          ...pre,
                          TenLopHoc: e.target.value,
                        }))
                      }}
                    />
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </td>
                  <td className="text-xs z-[5] bg-white border border-gray-300 p-2  relative lg:sticky lg:left-[550px] text-center">
                    <InputDebounce
                      type="number"
                      className="no-spinner"
                      value={filter.DiemChuyenCan1}
                      onChange={(e) => {
                        setFilter((pre) => ({
                          ...pre,
                          DiemChuyenCan1: e.target.value,
                        }))
                      }}
                    />
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </td>
                  <td className="w-[50px] text-xs bg-white border border-gray-300 p-2   text-center">
                    <InputDebounce
                      type="number"
                      className="no-spinner"
                      value={filter.DiemHeSo11}
                      onChange={(e) => {
                        setFilter((pre) => ({
                          ...pre,
                          DiemHeSo11: e.target.value,
                        }))
                      }}
                    />
                  </td>
                  <td className="w-[50px] text-xs bg-white border border-gray-300 p-2 text-center">
                    <InputDebounce
                      type="number"
                      className="no-spinner"
                      value={filter.DiemHeSo12}
                      onChange={(e) => {
                        setFilter((pre) => ({
                          ...pre,
                          DiemHeSo12: e.target.value,
                        }))
                      }}
                    />
                  </td>
                  <td className="w-[50px] text-xs bg-white border border-gray-300 p-2 text-center">
                    <InputDebounce
                      type="number"
                      className="no-spinner"
                      value={filter.DiemHeSo13}
                      onChange={(e) => {
                        setFilter((pre) => ({
                          ...pre,
                          DiemHeSo13: e.target.value,
                        }))
                      }}
                    />
                  </td>
                  <td className="w-[50px] text-xs  border border-gray-300 p-2 text-center bg-white">
                    <InputDebounce
                      type="number"
                      className="no-spinner"
                      value={filter.DiemHeSo14}
                      onChange={(e) => {
                        setFilter((pre) => ({
                          ...pre,
                          DiemHeSo14: e.target.value,
                        }))
                      }}
                    />
                  </td>
                  <td className="w-[50px] text-xs bg-white border border-gray-300 p-2 text-center">
                    <InputDebounce
                      type="number"
                      className="no-spinner"
                      value={filter.DiemHeSo15}
                      onChange={(e) => {
                        setFilter((pre) => ({
                          ...pre,
                          DiemHeSo15: e.target.value,
                        }))
                      }}
                    />
                  </td>
                  <td className="w-[50px] text-xs bg-white border border-gray-300 p-2 text-center">
                    <InputDebounce
                      type="number"
                      className="no-spinner"
                      value={filter.DiemHeSo16}
                      onChange={(e) => {
                        setFilter((pre) => ({
                          ...pre,
                          DiemHeSo16: e.target.value,
                        }))
                      }}
                    />
                  </td>
                  <td className="w-[50px] text-xs bg-white border border-gray-300 p-2 text-center">
                    <InputDebounce
                      type="number"
                      className="no-spinner"
                      value={filter.DiemHeSo21}
                      onChange={(e) => {
                        setFilter((pre) => ({
                          ...pre,
                          DiemHeSo21: e.target.value,
                        }))
                      }}
                    />
                  </td>
                  <td className="w-[50px] text-xs bg-white border border-gray-300 p-2 text-center">
                    <InputDebounce
                      type="number"
                      className="no-spinner"
                      value={filter.DiemHeSo22}
                      onChange={(e) => {
                        setFilter((pre) => ({
                          ...pre,
                          DiemHeSo22: e.target.value,
                        }))
                      }}
                    />
                  </td>
                  <td className="w-[50px] text-xs bg-white border border-gray-300 p-2 text-center">
                    <InputDebounce
                      type="number"
                      className="no-spinner"
                      value={filter.DiemHeSo23}
                      onChange={(e) => {
                        setFilter((pre) => ({
                          ...pre,
                          DiemHeSo23: e.target.value,
                        }))
                      }}
                    />
                  </td>
                  <td className="w-[50px] text-xs bg-white border border-gray-300 p-2 text-center">
                    <InputDebounce
                      type="number"
                      className="no-spinner"
                      value={filter.DiemHeSo24}
                      onChange={(e) => {
                        setFilter((pre) => ({
                          ...pre,
                          DiemHeSo24: e.target.value,
                        }))
                      }}
                    />
                  </td>
                  <td className="w-[50px] text-xs bg-white border border-gray-300 p-2 text-center">
                    <InputDebounce
                      type="number"
                      className="no-spinner"
                      value={filter.DiemHeSo25}
                      onChange={(e) => {
                        setFilter((pre) => ({
                          ...pre,
                          DiemHeSo25: e.target.value,
                        }))
                      }}
                    />
                  </td>
                  <td className="w-[50px] text-xs bg-white border border-gray-300 p-2 text-center">
                    <InputDebounce
                      type="number"
                      className="no-spinner"
                      value={filter.DiemHeSo26}
                      onChange={(e) => {
                        setFilter((pre) => ({
                          ...pre,
                          DiemHeSo26: e.target.value,
                        }))
                      }}
                    />
                  </td>
                  <td className="w-[50px] text-xs bg-white border border-gray-300 p-2 text-center">
                    <InputDebounce
                      value={filter.DuocDuThiKetThuc}
                      onChange={(e) => {
                        setFilter((pre) => ({
                          ...pre,
                          DuocDuThiKetThuc: e.target.value,
                        }))
                      }}
                    />
                  </td>
                  <td className="w-[50px] text-xs bg-white border border-gray-300 p-2 text-center">
                    <InputDebounce
                      type="number"
                      className="no-spinner"
                      value={filter.DiemTBThucHanh}
                      onChange={(e) => {
                        setFilter((pre) => ({
                          ...pre,
                          DiemTBThucHanh: e.target.value,
                        }))
                      }}
                    />
                  </td>
                  <td className="w-[50px] text-xs bg-white border border-gray-300 p-2 text-center">
                    <InputDebounce
                      type="number"
                      className="no-spinner"
                      value={filter.DiemTBThuongKy}
                      onChange={(e) => {
                        setFilter((pre) => ({
                          ...pre,
                          DiemTBThuongKy: e.target.value,
                        }))
                      }}
                    />
                  </td>
                  <td className="w-[50px] text-xs bg-white border border-gray-300 p-2 text-center">
                    <InputDebounce
                      value={filter.GhiChu}
                      onChange={(e) => {
                        setFilter((pre) => ({
                          ...pre,
                          GhiChu: e.target.value,
                        }))
                      }}
                      width={160}
                    />
                  </td>
                </tr>
                {listNhapDiemThuongKy.length > 0 ? (
                  listNhapDiemThuongKy.map(
                    (
                      {
                        MaLopHocPhan,
                        TenLopHoc,
                        TenMonHoc,
                        MaSinhVien,
                        HoDem,
                        Ten,
                        GioiTinh,
                        TenLop,
                        DiemChuyenCan1,
                        DiemHeSo11,
                        DiemHeSo12,
                        DiemHeSo13,
                        DiemHeSo14,
                        DiemHeSo15,
                        DiemHeSo16,
                        DiemHeSo21,
                        DiemHeSo22,
                        DiemHeSo23,
                        DiemHeSo24,
                        DiemHeSo25,
                        DiemHeSo26,
                        DuocDuThiKetThuc,
                        DiemTBThucHanh,
                        DiemTBThuongKy,
                        GhiChu,
                      },
                      index,
                    ) => {
                      return (
                        <tr key={index}>
                          <td className="border-l-0 border-r-0 text-xs bg-vs-theme-layout border border-gray-300 p-2 relative xl:sticky xl:left-[0px] text-center">
                            {index + 1}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="z-[4] border-l-0 border-r-0 text-xs bg-vs-theme-layout border border-gray-300 p-2  relative xl:sticky xl:left-[50px] text-center">
                            {MaSinhVien}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="z-[4] border-l-0 border-r-0 text-xs bg-vs-theme-layout border border-gray-300 p-2 relative xl:sticky xl:left-[150px] text-center">
                            {HoDem}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="z-[4] border-l-0 border-r-0 text-xs bg-vs-theme-layout border border-gray-300 p-2 relative xl:sticky xl:left-[250px] text-center">
                            {Ten}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="z-[4] border-l-0 border-r-0 text-xs bg-vs-theme-layout border border-gray-300 p-2 relative xl:sticky xl:left-[350px] text-center">
                            {GioiTinh}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="z-[4] border-l-0 border-r-0 text-xs bg-vs-theme-layout border border-gray-300 p-2  relative xl:sticky xl:left-[450px] text-center">
                            {TenLopHoc}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="w-[50x] z-[4] border-l-0 border-r-0 text-xs  border border-gray-300 p-2 relative xl:sticky xl:left-[550px] text-center bg-vs-theme-layout">
                            {DiemChuyenCan1}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="w-[50px] z-[0] text-xs bg-white border  border-gray-300 p-2 text-center ">
                            {DiemHeSo11 ?? <InputNumber />}
                          </td>
                          <td className="w-[50px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {DiemHeSo12 ?? <InputNumber />}
                          </td>
                          <td className="w-[50px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {DiemHeSo13 ?? <InputNumber />}
                          </td>
                          <td className=" w-[50px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {DiemHeSo14 ?? <InputNumber />}
                          </td>
                          <td className="w-[50px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {DiemHeSo15 ?? <InputNumber />}
                          </td>
                          <td className="w-[50px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {DiemHeSo16 ?? <InputNumber />}
                          </td>
                          <td className="w-[50px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {DiemHeSo21 ?? <InputNumber />}
                          </td>
                          <td className="w-[50px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {DiemHeSo22 ?? <InputNumber />}
                          </td>
                          <td className="w-[50px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {DiemHeSo23 ?? <InputNumber />}
                          </td>
                          <td className="w-[50px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {DiemHeSo24 ?? <InputNumber />}
                          </td>
                          <td className="w-[50px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {DiemHeSo25 ?? <InputNumber />}
                          </td>
                          <td className="w-[50px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {DiemHeSo26 ?? <InputNumber />}
                          </td>
                          <td className="w-[50px] text-xs bg-white border border-gray-300 p-2 text-center ">
                            <input
                              type="checkbox"
                              className="size-4"
                              onChange={(value) => {
                                console.log(value)
                              }}
                            />
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {DiemTBThucHanh}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {DiemTBThuongKy}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {GhiChu === '' ? <Input /> : GhiChu}
                          </td>
                        </tr>
                      )
                    },
                  )
                ) : (
                  <tr className="bg-white border border-gray-300 border-r-0 border-b-0 p-2 font-semibold relative lg:sticky lg:left-0">
                    <td colSpan={12} className="p-2">
                      Danh sách trống
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

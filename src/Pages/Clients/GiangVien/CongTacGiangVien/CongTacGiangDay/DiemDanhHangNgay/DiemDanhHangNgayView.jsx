import { Select } from '@/Components/Base'
import Button from '@/Components/Base/Button/Button'
import InputDebounce from '@/Components/Base/DebounceInput/DebounceInput'
import Icon from '@/Components/Base/Icon/Icon'
import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import Loading from '@/Components/Loading/Loading'
import { Grid, TextareaAutosize, Tooltip } from '@mui/material'
import { MdOutlineFilterAltOff } from 'react-icons/md'
import DiemDanhHangNgayViewDialog from './DiemDanhHangNgayViewDialog'
import { InputNumber } from '@/Components/Base/InputNumber'
import { filterDiemDanhHangNgay } from './constant'
import RequireIcon from '@/Components/Base/RequireIcon/RequireIcon'
export default function DiemDanhHangNgayView(props) {
  const {
    breadcrumbs,
    home,
    isLoading,
    currentHocKy,
    setCurrentHocKy,
    listHocKy,
    ngayDiemDanh,
    setNgayDiemDanh,
    listDiemDanhHangNgay,
    listDanhSachLichGV,
    filter,
    setFilter,
    openDialog,
    setOpenDialog,
    setDataSubmit,
  } = props

  return (
    <div className="bg-vs-theme-layout rounded-2xl mx-4 xl:mx-0 p-4">
      <div className="p-4 flex flex-col gap-4">
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />
        <h2 className="text-center uppercase text-lg md:text-2xl font-semibold text-sky-800">
          Điểm danh hằng ngày
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
          <div className="flex gap-3 justify-start items-end flex-wrap relative z-[10] mb-5  ">
            <div className="grid gap-1 flex-wrap ">
              <span>
                Chọn học kỳ <RequireIcon />
              </span>
              <Select
                modelValue={currentHocKy}
                onChange={(value) => setCurrentHocKy(value)}
                data={listHocKy}
                labelKey="label"
                valueKey="value"
                label="Chọn học kỳ"
                clearable={false}
                filterable={false}
                triggerClass="h-[36px] rounded-xl"
              />
            </div>
            <div className="grid gap-1 z-[20] rounded-lg">
              <span>
                Ngày điểm danh <RequireIcon />
              </span>
              <InputDebounce
                className="h-[36px] border-none rounded-xl bg-input-bg px-2 "
                name="ngayDiemDanh"
                type="date"
                value={ngayDiemDanh}
                onChange={(e) => {
                  const { value } = e.target
                  setNgayDiemDanh(value)
                }}
              />
            </div>
            <div className="grid gap-1 z-[20]">
              <span>
                Chọn lớp học phần <RequireIcon />
              </span>
              <Select
                valueKey="value"
                label="Chọn lớp học phần"
                clearable={false}
                filterable={false}
                triggerClass="w-[400px] h-[36px] rounded-xl"
              />
            </div>
            <Button
              className="!h-[36px]"
              onClick={() => {
                setDataSubmit({
                  NgayDiemDanh: ngayDiemDanh,
                  HocKy: currentHocKy,
                  MaLopHocPhan: '010100043605',
                })
              }}
            >
              Tìm lịch
            </Button>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={2.5}>
              <div className="flex flex-col gap-3">
                <h4 className="text-vs-text text-base font-semibold">
                  Danh sách lịch
                </h4>
                <ul className="max-h-[300px] overflow-auto">
                  {listDanhSachLichGV?.length > 0 &&
                    listDanhSachLichGV.map(
                      (
                        { Thu, TuTiet, DenTiet, TenLopHoc, TenPhong },
                        index,
                      ) => {
                        return (
                          <li
                            key={index}
                            className="bg-vs-theme-bg my-1 text-vs-dark rounded-md p-1 duration-200 hover:cursor-pointer hover:text-white hover:bg-uneti-primary-lighter"
                          >
                            Thứ {Thu}: tiết {TuTiet} - {DenTiet} - {TenLopHoc} -{' '}
                            {TenPhong}
                          </li>
                        )
                      },
                    )}
                </ul>
              </div>
            </Grid>
            <Grid item xs={9.5} className="grid gap-3 ">
              <div className="w-full flex flex-col gap-2 ">
                <h4 className="text-vs-text text-base font-semibold">
                  Nhận xét lớp
                </h4>
                <TextareaAutosize className="p-2 border-vs-dark border-[0.5px] rounded-md outline-[0.1px]" />
              </div>
              <div className="flex flex-wrap items-center justify-between my-4 ">
                <div className="flex flex-wrap items-center justify-start gap-2 ">
                  <Button>Lưu điểm danh</Button>
                  <Button>Xuất Excel</Button>
                  <Button>Xuất file tổng hợp nội dung giảng dạy</Button>
                </div>
                <Button
                  onClick={() => {
                    setOpenDialog(true)
                  }}
                  className="rounded-md transition-all hover:bg-red-50 p-2 text-vs-theme-layout"
                >
                  <span className="text-vs-theme-layout">
                    Tìm kiếm nâng cao
                  </span>
                  <Icon>
                    <MdOutlineFilterAltOff />
                  </Icon>
                </Button>
                <DiemDanhHangNgayViewDialog
                  setFilter={setFilter}
                  openDialog={openDialog}
                  setOpenDialog={setOpenDialog}
                />
              </div>
              <div className="w-full max-h-[500px] overflow-auto rounded-md border border-gray-300">
                <table className="min-w-max w-full border-spacing-0 ">
                  <thead className="h-[65px] text-white sticky top-0 z-[15]">
                    <tr>
                      <th
                        className={`text-xs border border-gray-300  bg-uneti-primary p-2 rounded-tl-md w-[20px] relative `}
                      >
                        <input
                          className="hover:cursor-pointer size-4"
                          type="checkbox"
                        />
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </th>
                      <th
                        className={`text-xs border border-gray-300  bg-uneti-primary p-2  w-[30px] relative `}
                      >
                        STT
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </th>
                      <th
                        className={`text-xs border border-gray-300  bg-uneti-primary p-2  w-[75px] relative `}
                      >
                        Mã SV
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </th>
                      <th
                        className={`text-xs border border-gray-300  bg-uneti-primary p-2  w-[100px] relative `}
                      >
                        Họ đệm
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </th>
                      <th
                        className={`text-xs border border-gray-300  bg-uneti-primary p-2  w-[50px] relative `}
                      >
                        Tên
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </th>
                      <th
                        className={`text-xs border border-gray-300  bg-uneti-primary p-2  w-[80px] relative `}
                      >
                        Ngày sinh
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </th>
                      <th
                        className={`text-xs border border-gray-300  bg-uneti-primary p-2  w-[100px] relative`}
                      >
                        Lớp học
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </th>
                      <th
                        className={`text-xs border border-gray-300  bg-uneti-primary p-2  w-[30px] relative`}
                      >
                        Có phép
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </th>
                      <th
                        className={`text-xs border border-gray-300  bg-uneti-primary p-2  w-[30px] relative `}
                      >
                        Không phép
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </th>
                      <th
                        className={`text-xs border border-gray-300  bg-uneti-primary p-2  w-[50px] relative `}
                      >
                        Nhập số tiết
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </th>
                      <th
                        className={`text-xs border border-gray-300  bg-uneti-primary p-2  w-[70px] relative `}
                      >
                        Ghi chú
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </th>
                      <th
                        className={`text-xs border border-gray-300  bg-uneti-primary p-2  w-[50px] relative `}
                      >
                        Vắng có phép
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </th>
                      <th
                        className={`text-xs border border-gray-300  bg-uneti-primary p-2 w-[50px] relative`}
                      >
                        Vắng không phép
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </th>
                      <th
                        className={`text-xs border border-gray-300  bg-uneti-primary p-2  w-[50px] relative `}
                      >
                        Tổng số tiết
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </th>
                      <th
                        className={`text-xs border border-gray-300  bg-uneti-primary p-2 rounded-tr-md w-[50px] relative`}
                      >
                        Tỉ lệ vắng
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="z-[10]">
                    <tr className="sticky top-[65px] z-[10]">
                      <td className="text-xs bg-white border border-gray-300 border-l-0 p-2 relative  text-center">
                        <Tooltip title={`Xóa bộ lọc`}>
                          <button
                            onClick={() => {
                              setFilter({
                                ...filterDiemDanhHangNgay,
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
                      <td className="text-xs bg-white border border-gray-300 p-2 relative  text-center">
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </td>
                      <td className="text-xs bg-white border border-gray-300 p-2 relative  text-center">
                        <InputDebounce
                          type="number"
                          className="no-spinner"
                          value={filter.MaSinhVien}
                          onChange={(e) => {
                            setFilter((pre) => ({
                              ...pre,
                              MaSinhVien: e.target.value,
                            }))
                          }}
                          width={75}
                        />
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </td>
                      <td className="text-xs bg-white border border-gray-300 p-2 relative   text-center">
                        <InputDebounce
                          value={filter.HoDem}
                          onChange={(e) => {
                            setFilter((pre) => ({
                              ...pre,
                              HoDem: e.target.value,
                            }))
                          }}
                          width={75}
                        />
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </td>
                      <td className="text-xs bg-white border border-gray-300 p-2 relative   text-center">
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
                      <td className="text-xs bg-white border border-gray-300 p-2 relative   text-center">
                        <InputDebounce
                          type="date"
                          className="text-xs"
                          value={filter.NgaySinh}
                          onChange={(e) => {
                            setFilter((pre) => ({
                              ...pre,
                              NgaySinh: e.target.value,
                            }))
                          }}
                          width={110}
                        />
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </td>
                      <td className="text-xs bg-white border border-gray-300  p-2 relative   text-center">
                        <InputDebounce
                          value={filter.TenLop}
                          onChange={(e) => {
                            setFilter((pre) => ({
                              ...pre,
                              TenLop: e.target.value,
                            }))
                          }}
                        />
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </td>
                      <td className="text-xs bg-white border border-gray-300 p-2 relative   text-center">
                        <InputDebounce
                          value={filter.CoPhep}
                          onChange={(e) => {
                            setFilter((pre) => ({
                              ...pre,
                              CoPhep: e.target.value,
                            }))
                          }}
                        />
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </td>
                      <td className="text-xs bg-white border border-gray-300 p-2 relative   text-center">
                        <InputDebounce
                          value={filter.KhongPhep}
                          onChange={(e) => {
                            setFilter((pre) => ({
                              ...pre,
                              KhongPhep: e.target.value,
                            }))
                          }}
                        />
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </td>
                      <td className="text-xs bg-white border border-gray-300 p-2 relative   text-center">
                        <InputDebounce
                          type="number"
                          className="no-spinner"
                          value={filter.SoTiet}
                          onChange={(e) => {
                            setFilter((pre) => ({
                              ...pre,
                              SoTiet: e.target.value,
                            }))
                          }}
                        />
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </td>
                      <td className="text-xs  border border-gray-300 p-2 relative   text-center bg-white">
                        <InputDebounce
                          value={filter.GhiChu}
                          onChange={(e) => {
                            setFilter((pre) => ({
                              ...pre,
                              GhiChu: e.target.value,
                            }))
                          }}
                          width={70}
                        />
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </td>
                      <td className="text-xs bg-white border border-gray-300 p-2 relative   text-center">
                        <InputDebounce
                          type="number"
                          className="no-spinner"
                          value={filter.VangCoPhep}
                          onChange={(e) => {
                            setFilter((pre) => ({
                              ...pre,
                              VangCoPhep: e.target.value,
                            }))
                          }}
                        />
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </td>
                      <td className="text-xs bg-white border border-gray-300 p-2 relative   text-center">
                        <InputDebounce
                          type="number"
                          className="no-spinner"
                          value={filter.VangKhongPhep}
                          onChange={(e) => {
                            setFilter((pre) => ({
                              ...pre,
                              VangKhongPhep: e.target.value,
                            }))
                          }}
                        />
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </td>
                      <td className="text-xs bg-white border border-gray-300 p-2 relative   text-center">
                        <InputDebounce
                          type="number"
                          className="no-spinner"
                          value={filter.TongSoTiet}
                          onChange={(e) => {
                            setFilter((pre) => ({
                              ...pre,
                              TongSoTiet: e.target.value,
                            }))
                          }}
                        />
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </td>
                      <td className="text-xs bg-white border border-gray-300 p-2 relative   text-center">
                        <InputDebounce
                          type="number"
                          className="no-spinner"
                          value={filter.TiLeVang}
                          onChange={(e) => {
                            setFilter((pre) => ({
                              ...pre,
                              TiLeVang: e.target.value,
                            }))
                          }}
                        />
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </td>
                    </tr>
                    {listDiemDanhHangNgay.length ? (
                      listDiemDanhHangNgay.map(
                        (
                          {
                            GhiChu,
                            HoDem,
                            MaSinhVien,
                            NgaySinh,
                            SoTiet,
                            Ten,
                            TenLop,
                            TiLeVang,
                            TongSoTiet,
                            VangCoPhep,
                            VangKhongPhep,
                          },
                          index,
                        ) => {
                          return (
                            <tr key={index}>
                              <td className=" text-xs bg-transparent border border-gray-300 p-2 relative  text-center">
                                <input
                                  className="hover:cursor-pointer size-4"
                                  type="checkbox"
                                />
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                              </td>
                              <td className="text-xs bg-transparent border border-gray-300 p-2 relative  text-center">
                                {index + 1}
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                              </td>
                              <td className="text-xs bg-transparent border border-gray-300 p-2 relative text-center">
                                {MaSinhVien}
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                              </td>
                              <td className="text-xs bg-transparent border border-gray-300 p-2 relative text-center">
                                {HoDem}
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                              </td>
                              <td className="text-xs bg-transparent border border-gray-300 p-2 relative text-center">
                                {Ten}
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                              </td>
                              <td className="text-xs bg-transparent border border-gray-300 p-2 relative text-center">
                                {NgaySinh}
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                              </td>
                              <td className="text-xs bg-transparent border border-gray-300 p-2 relative text-center">
                                {TenLop}
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                              </td>
                              <td className="text-xs bg-transparent border border-gray-300 p-2 relative text-center">
                                <input
                                  className="hover:cursor-pointer size-4"
                                  type="checkbox"
                                />
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                              </td>
                              <td className="text-xs bg-transparent border border-gray-300 p-2 relative text-center">
                                <input
                                  className="hover:cursor-pointer size-4"
                                  type="checkbox"
                                />
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                              </td>
                              <td className="text-xs bg-transparent border border-gray-300 p-2 relative text-center">
                                {SoTiet ?? <InputNumber />}
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                              </td>
                              <td className="text-xs bg-transparent border border-gray-300  relative text-center">
                                <TextareaAutosize
                                  className="w-full h-full border-red-400 border-1 outline-none p-2"
                                  placeholder="..."
                                />
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                              </td>
                              <td className="text-xs bg-transparent border border-gray-300 p-2 relative text-center">
                                {VangCoPhep}
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                              </td>
                              <td className="text-xs bg-transparent border border-gray-300 p-2 relative text-center">
                                {VangKhongPhep}
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                              </td>
                              <td className="text-xs bg-transparent border border-gray-300 p-2 relative text-center">
                                {TongSoTiet}
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                              </td>
                              <td className="text-xs bg-transparent border border-gray-300 p-2 relative text-center">
                                {TiLeVang} <span> %</span>
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                              </td>
                            </tr>
                          )
                        },
                      )
                    ) : (
                      <tr className="bg-white border border-gray-300 border-r-0 border-b-0 p-2 font-semibold relative lg:sticky lg:left-0">
                        <td colSpan={6} className="p-2">
                          Danh sách trống
                          <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  )
}

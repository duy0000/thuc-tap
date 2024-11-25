import { Select } from '@/Components/Base'
import {
  arrLichHocThead,
  arrLichThiThead,
  arrHeaderLichHoc,
  confixArr,
  timeTable,
  arrHeaderLichThi,
  confixArrLichThi,
  defaultFilterValue,
} from './constants'
import { DebounceInput } from 'react-debounce-input'
import { useState } from 'react'
import { dayjs } from '@/Services/Utils/dayjs'
import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import Loading from '@/Components/Loading/Loading'
import ExcelExporter from '@/Components/CongTacGiangDay/ExcelExporter/ExcelExporter.jsx'
import { filterData } from '@/Services/Utils/filterData'
import Icon from '@/Components/Base/Icon/Icon'
import { Tooltip } from '@mui/material'
import { MdOutlineFilterAltOff } from 'react-icons/md'

export default function LichTheoTienDoView(props) {
  const {
    home,
    breadcrumbs,
    listHocKy,
    isLoading,
    currentHocKy,
    setCurrentHocKy,
    DanhSachLoaiLich,
    currentLoaiLich,
    setCurrentLoaiLich,
    listLichTheoTienDo,
    dataGV,
  } = props
  const dataInput = timeTable(listLichTheoTienDo)
  const [filterValue, setFilterValue] = useState(defaultFilterValue)

  const handleChangeFilter = (e) => {
    const { name, value } = e.target
    setFilterValue((prev) => ({
      ...prev,
      [name]: { ...prev[name], value },
    }))
  }

  const filteredData = filterData(
    dataInput,
    Object.fromEntries(
      Object.entries(filterValue).map(([key, { value }]) => [key, value]),
    ),
  )

  return (
    <div className="bg-vs-theme-layout rounded-2xl mx-4 lg:mx-0">
      <div className="p-4 flex flex-col gap-4">
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />

        <h2 className="text-center uppercase text-lg md:text-2xl font-semibold text-sky-800">
          Lịch theo tiến độ
        </h2>

        {isLoading ? (
          <Loading />
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 justify-start items-center flex-wrap">
              <span>Tìm kiếm: </span>

              <div className="flex justify-center items-center gap-2 flex-wrap relative z-[20]">
                <span>Học kỳ: </span>
                <Select
                  modelValue={currentHocKy}
                  onChange={(value) => setCurrentHocKy(value)}
                  data={listHocKy}
                  labelKey="label"
                  valueKey="value"
                  label="Chọn học kỳ"
                  clearable={false}
                  filterable={false}
                />
              </div>
              <div className="flex justify-start items-center gap-2 flex-wrap relative z-[20]">
                <span>Loại lịch: </span>
                <Select
                  modelValue={currentLoaiLich}
                  onChange={(value) => setCurrentLoaiLich(value)}
                  data={DanhSachLoaiLich}
                  labelKey="label"
                  valueKey="value"
                  label="Chọn loại lịch"
                  clearable={false}
                  filterable={false}
                />
              </div>
              <div className="flex justify-start items-center gap-2 flex-wrap relative z-[20]">
                <ExcelExporter
                  userInfo={dataGV}
                  data={
                    currentLoaiLich === 0
                      ? confixArr(dataInput, arrHeaderLichHoc)
                      : confixArrLichThi(dataInput, arrHeaderLichThi)
                  }
                  fileName={`DanhSach-${currentLoaiLich === 0 ? 'LichHoc' : 'LichThi'}-HocKi-${currentHocKy}`}
                  content="xuất ra excel"
                  hocKy={currentHocKy}
                  endCol={
                    currentLoaiLich === 0
                      ? arrHeaderLichHoc.length
                      : arrHeaderLichThi.length
                  }
                  loaiLich={currentLoaiLich}
                  className="bg-cyan-400 capitalize px-2 py-1 rounded-md border border-blue-300 text-white"
                  disabled={
                    Array.isArray(dataInput) && dataInput.length > 0
                      ? false
                      : true
                  }
                />
              </div>
            </div>
            <div className="w-full max-h-[700px] overflow-auto rounded-md border border-gray-300">
              <table className="min-w-max w-full border-spacing-0 text-sm text-gray-500">
                {currentLoaiLich === 0 ? (
                  <>
                    <thead className="sticky top-0 z-10 bg-sky-800 text-white shadow">
                      <tr>
                        {arrLichHocThead.map((item, Idx) => (
                          <th key={Idx} className={item.className}>
                            {item.content}
                          </th>
                        ))}
                      </tr>
                      <tr>
                        <td className="text-xs bg-white border border-gray-300 border-l-0 p-2 relative lg:sticky lg:left-0 text-center">
                          <Tooltip title={`Xóa bộ lọc`}>
                            <button
                              onClick={() => {
                                setFilterValue(defaultFilterValue)
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

                        {Object.keys(defaultFilterValue).map((key) => (
                          <td key={key} className={filterValue[key].className}>
                            <DebounceInput
                              debounceTimeout={1000}
                              type={filterValue[key].type}
                              name={key}
                              value={
                                filterValue[key].type === 'date'
                                  ? filterValue[key].value
                                    ? dayjs(filterValue[key].value).format(
                                        'YYYY-MM-DD',
                                      )
                                    : ''
                                  : filterValue[key].value
                              }
                              onChange={handleChangeFilter}
                              placeholder="Tìm..."
                              className="w-full rounded-md p-2 border-2 border-gray-300 text-black"
                            />
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {Array.isArray(filteredData) &&
                      filteredData.length > 0 ? (
                        filteredData.map((e, i) => {
                          return (
                            <tr key={i}>
                              <td className="text-xs bg-white border border-gray-300 border-l-0 p-2 relative lg:sticky lg:left-0 text-center z-2">
                                {i + 1}
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                              </td>
                              <td className="text-xs bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[49px] text-center z-2">
                                {e.MaLopHocPhan}
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                              </td>
                              <td className="text-xs bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[150px] text-center z-2">
                                {e.TenLopHoc}
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                              </td>
                              <td className="text-xs bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[300px] text-center z-2">
                                {e.Nhom}
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                              </td>
                              <td className="text-xs bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[360px] text-center z-[3]">
                                {e.TenMonHoc}
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                              </td>
                              <td className="text-xs bg-white border border-gray-300 p-2  text-center">
                                {e.SiSo}
                              </td>
                              <td className="text-xs bg-white border border-gray-300 p-2  text-center">
                                {e.Thu}
                              </td>
                              <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                                {dayjs(e.NgayBatDau).format('DD/MM/YYYY')}
                              </td>
                              <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                                {e.TuTiet}
                              </td>
                              <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                                {e.DenTiet}
                              </td>{' '}
                              <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                                {e.TietHoc}
                              </td>
                              <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                                {e.TenPhong}
                              </td>
                              <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                                {e.TenTrangThai}
                              </td>
                            </tr>
                          )
                        })
                      ) : (
                        <tr>
                          <td
                            colSpan={8}
                            className="bg-white border border-gray-300 border-r-0 border-b-0 p-2 font-semibold relative lg:sticky lg:left-0"
                          >
                            Danh sách trống
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </>
                ) : (
                  <>
                    <thead className="sticky top-0 z-10 bg-sky-800 text-white shadow">
                      <tr>
                        {arrLichThiThead.map((item, Idx) => (
                          <th key={Idx} className={item.className}>
                            {item.content}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(filteredData) &&
                      filteredData.length > 0 ? (
                        filteredData.map((e, i) => {
                          return (
                            <tr key={i}>
                              <td className="text-xs bg-white border border-gray-300 border-l-0 p-2 relative lg:sticky lg:left-0 text-center">
                                {i + 1}
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                              </td>
                              <td className="text-xs bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[50px] text-center">
                                {e.MaLopXepLichThi}
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                              </td>
                              <td className="text-xs bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[150px] text-center">
                                {e.LopDuKien}
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                              </td>
                              <td className="text-xs bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[250px] text-center">
                                {e.MaLopHocPhan}
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                              </td>{' '}
                              <td className="text-xs bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[350px] text-center">
                                {e.SiSo}
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                              </td>{' '}
                              <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                                {e.TenMonHoc}
                              </td>{' '}
                              <td className="text-xs bg-white border border-gray-300 p-2  text-center">
                                {e.Thu}
                              </td>
                              <td className="text-xs bg-white border border-gray-300 p-2  text-center">
                                {dayjs(e.NgayThi).format('DD/MM/YYYY')}
                              </td>
                              <td className="text-xs bg-white border border-gray-300 p-2  text-center">
                                {e.Nhom}
                              </td>
                              <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                                {e.TuTiet}
                              </td>
                              <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                                {e.DenTiet}
                              </td>
                              <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                                {e.ThoiGianThi}
                              </td>
                              <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                                {e.TenHinhThucThi}
                              </td>
                              <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                                {e.TenDonVi}
                              </td>
                              <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                                {e.TenPhong}
                              </td>
                              <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                                {e.HoTenGV1}
                              </td>
                              <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                                {e.HoTenGV2}
                              </td>
                              <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                                {e.GhiChu}
                              </td>
                            </tr>
                          )
                        })
                      ) : (
                        <tr>
                          <td
                            colSpan={8}
                            className="bg-white border border-gray-300 border-r-0 border-b-0 p-2 font-semibold relative lg:sticky lg:left-0"
                          >
                            Danh sách trống
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </>
                )}
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// import PropTypes from 'prop-types'
import SidebarTTHCGV from '../Sidebar/SidebarTTHCGV'
import { Link } from 'react-router-dom'
import { changeSlug } from '../../../../Services/Utils/stringUtils'
import moment from 'moment'
import Loading from './../../../../Components/Loading/Loading'
import { DebounceInput } from 'react-debounce-input'
import clsx from 'clsx'
import { memo } from 'react'
import PropTypes from 'prop-types'
import { IconButton, TablePagination } from '@mui/material'
import { MdOutlineFilterAltOff } from 'react-icons/md'
const CanBoNghiepVuView = memo(function CanBoNghiepVuView({
  loading,
  totalYeuCau,
  keywordSearch,
  currentPage,
  itemsPerPage,
  listTrangThaiHoSo,
  postShowTTHCGVGuiYeuCau,
  setPage,
  setItemsPerPage,
  onSearch,
  setSelectedTrangThai,
  dataFilterInit,
  dataFilter,
  setDataFilter,
}) {
  return (
    <>
      {loading ? (
        <div className="relative right-0 left-0 w-full flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-2">
            <SidebarTTHCGV />
          </div>
          {/* START: Danh sách các thủ tục/yêu cầu hỗ trợ */}
          <div className="col-span-12 lg:col-span-10">
            <div className="bg-white w-full rounded-xl px-2 py-4">
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="uneti-tthc__timkiem col-span-4 lg:col-span-2">
                  <DebounceInput
                    value={keywordSearch}
                    placeholder="Nhập nội dung tìm kiếm..."
                    className="block w-full h-full px-3 py-1 rounded-full border border-slate-300 focus:outline-none"
                    onChange={(e) => {
                      onSearch(e.target.value)
                    }}
                  />
                </div>
                <div className="uneti-tthc__timkiem col-span-4 lg:col-span-1">
                  <select
                    onChange={(e) => {
                      setSelectedTrangThai(e.target.value)
                    }}
                    className="w-full border border-[#336699] rounded-lg px-3 py-1 focus:outline-slate-300"
                    name=""
                    id=""
                  >
                    <option value="">Tất cả hồ sơ</option>
                    {listTrangThaiHoSo?.map((iTrangThai) => {
                      return (
                        <option
                          value={iTrangThai.MC_TTHC_GV_TrangThai_TenTrangThai}
                          key={iTrangThai.MC_TTHC_GV_TrangThai_TenTrangThai}
                        >
                          {iTrangThai.MC_TTHC_GV_TrangThai_TenTrangThai}
                        </option>
                      )
                    })}
                  </select>
                </div>
                <div className="uneti-tthc__timkiem col-span-4 lg:col-span-1">
                  <select
                    onChange={(e) => {
                      setItemsPerPage(e.target.value)
                    }}
                    className="w-full border border-[#336699] rounded-lg px-3 py-1 focus:outline-slate-300"
                  >
                    <option value="">Số lượng hồ sơ hiển thị</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </select>
                </div>
              </div>
              {/* END: Bộ lọc */}

              <div className="relative inset-0 z-[1] w-full mb-4 overflow-auto max-h-[600px]">
                <table className="w-full">
                  <thead className="sticky top-0 z-[1] w-full bg-white shadow">
                    <tr className=" bg-[#336699] text-white">
                      <th className="px-2 py-1 rounded-tl-lg border-r">STT</th>
                      <th className="px-2 py-1 border-r">Thông tin hồ sơ</th>
                      <th className="px-2 py-1 border-r">Đơn vị/Cá nhân gửi</th>
                      <th className="px-2 py-1 border-r">Đơn vị tiếp nhận</th>
                      <th className="px-2 py-1 border-r">Ngày nộp hồ sơ</th>
                      <th className="px-2 py-1 rounded-tr-lg">
                        Trạng thái hồ sơ
                      </th>
                    </tr>
                    <tr className="border border-gray-300">
                      <th className="border-r border-gray-300 text-center">
                        <p className="flex items-center justify-center">
                          <IconButton
                            color="error"
                            onClick={() => {
                              setDataFilter(dataFilterInit)
                            }}
                          >
                            <MdOutlineFilterAltOff size={22} />
                          </IconButton>
                        </p>
                      </th>
                      <th className="border-r border-gray-300">
                        <DebounceInput
                          placeholder={'Tìm tên hồ sơ'}
                          debounceTimeout={500}
                          value={dataFilter.MC_TTHC_GV_TenThuTuc}
                          onChange={(e) => {
                            setDataFilter({
                              ...dataFilter,
                              MC_TTHC_GV_TenThuTuc:
                                e.target.value.toLowerCase(),
                            })
                            setPage(0)
                          }}
                          className="h-full w-full px-2 py-1 bg-transparent text-black focus:outline-none"
                        />
                      </th>
                      <th className="border-r border-gray-300">
                        <DebounceInput
                          placeholder={'Tìm tên người gửi'}
                          debounceTimeout={500}
                          value={dataFilter.MC_TTHC_GV_NhanSuGui_HoTen}
                          onChange={(e) => {
                            setDataFilter({
                              ...dataFilter,
                              MC_TTHC_GV_NhanSuGui_HoTen:
                                e.target.value.toLowerCase(),
                            })
                            setPage(0)
                          }}
                          className="h-full w-full px-2 py-1 bg-transparent text-black focus:outline-none"
                        />
                      </th>
                      <th className="border-r border-gray-300">
                        <DebounceInput
                          placeholder={'Tìm đơn vị tiếp nhận'}
                          debounceTimeout={500}
                          value={dataFilter.MC_TTHC_GV_NoiTiepNhan}
                          onChange={(e) => {
                            setDataFilter({
                              ...dataFilter,
                              MC_TTHC_GV_NoiTiepNhan:
                                e.target.value.toLowerCase(),
                            })
                            setPage(0)
                          }}
                          className="h-full w-full px-2 py-1 bg-transparent text-black focus:outline-none"
                        />
                      </th>
                      <th className="border-r border-gray-300">
                        <DebounceInput
                          type="date"
                          debounceTimeout={500}
                          value={dataFilter.MC_TTHC_GV_GuiYeuCau_NgayGui}
                          onChange={(e) => {
                            setDataFilter({
                              ...dataFilter,
                              MC_TTHC_GV_GuiYeuCau_NgayGui:
                                e.target.value.toLowerCase(),
                            })
                            setPage(0)
                          }}
                          className="h-full w-full px-2 py-1 bg-transparent text-black focus:outline-none"
                        />
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {postShowTTHCGVGuiYeuCau?.length > 0 ? (
                      postShowTTHCGVGuiYeuCau?.map((itemYeuCau, index) => {
                        const titleSlug = changeSlug(
                          itemYeuCau.MC_TTHC_GV_TenThuTuc,
                        )
                        return (
                          <tr className="border" key={index}>
                            <td className="px-2 py-1 text-center border-r">
                              {currentPage * itemsPerPage + index + 1}
                            </td>
                            <td className="px-2 py-1 border-r">
                              <div className="flex flex-col gap-1 p-2">
                                <p className="font-semibold uppercase">
                                  {itemYeuCau.MC_TTHC_GV_TenThuTuc}
                                </p>
                                <div className="flex flex-wrap items-center gap-4">
                                  <Link
                                    to={`/admin/xu-ly-nghiep-vu/chi-tiet-yeu-cau/${titleSlug}/${itemYeuCau.MC_TTHC_GV_GuiYeuCau_ID}`}
                                    className="whitespace-nowrap lg:whitespace-normal text-sky-800 underline underline-offset-2 text-under  rounded-full hover:opacity-70"
                                  >
                                    Xử lý/Xem chi tiết
                                  </Link>
                                </div>
                              </div>
                            </td>
                            <td className="px-2 py-1 text-center border-r">
                              <table>
                                <tbody>
                                  <tr>
                                    <td className="whitespace-nowrap p-1">
                                      Họ tên:
                                    </td>
                                    <td className="font-semibold whitespace-nowrap text-left p-1">
                                      {itemYeuCau?.HoTen}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="whitespace-nowrap p-1">
                                      Đơn vị:
                                    </td>
                                    <td className="font-semibold whitespace-nowrap p-1">
                                      {
                                        itemYeuCau.MC_TTHC_GV_GuiYeuCau_NhanSuGui_Khoa
                                      }
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                            <td className="px-2 py-1 text-center border-r">
                              <p className="font-semibold">
                                {itemYeuCau?.MC_TTHC_GV_NoiTiepNhan}
                              </p>
                            </td>
                            <td className="px-2 py-1 text-center border-r">
                              <p className="font-semibold">
                                {moment(
                                  itemYeuCau?.MC_TTHC_GV_GuiYeuCau_NgayGui,
                                ).format('DD/MM/YYYY')}
                              </p>
                            </td>
                            <td className="px-2 py-1">
                              <p
                                className={clsx(
                                  'font-semibold flex flex-col text-white p-2 rounded-md',
                                  itemYeuCau?.IsHoanThanh
                                    ? 'bg-green-500'
                                    : itemYeuCau?.MC_TTHC_GV_GuiYeuCau_TrangThai_ID ===
                                        -1
                                      ? 'bg-red-500'
                                      : itemYeuCau?.MC_TTHC_GV_GuiYeuCau_TrangThai_ID !==
                                          0
                                        ? 'bg-sky-500'
                                        : 'bg-orange-500',
                                )}
                              >
                                <span className="text-center whitespace-nowrap">
                                  {itemYeuCau?.IsHoanThanh
                                    ? 'Đã hoàn thành'
                                    : itemYeuCau?.MC_TTHC_GV_GuiYeuCau_TrangThai_ID !==
                                        -1 &&
                                      itemYeuCau?.MC_TTHC_GV_TrangThai_TenTrangThai}
                                  {itemYeuCau?.MC_TTHC_GV_GuiYeuCau_TrangThai_ID ===
                                    -1 && 'Đã hủy trả'}
                                </span>
                              </p>
                            </td>
                          </tr>
                        )
                      })
                    ) : (
                      <tr>
                        <td colSpan={6}>
                          <p className="p-2 font-medium text-center w-full">
                            Chưa có yêu cầu nào được gửi lên.
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Phân trang */}
              {postShowTTHCGVGuiYeuCau?.length > 0 ? (
                <div className="grid grid-cols-4 items-center justify-between">
                  {postShowTTHCGVGuiYeuCau?.length > 0 && (
                    <div className="col-span-4 lg:col-span-1">
                      <p className="text-[#336699] font-medium whitespace-nowrap">
                        Tổng số: {totalYeuCau} yêu cầu
                      </p>
                    </div>
                  )}
                  <TablePagination
                    component={'div'}
                    count={totalYeuCau}
                    page={currentPage}
                    labelRowsPerPage="Số bản ghi trên trang"
                    rowsPerPage={itemsPerPage}
                    rowsPerPageOptions={[5, 10, 15, 20]}
                    onPageChange={(e, newPage) => {
                      setPage(newPage)
                    }}
                    onChangeRowsPerPage={(e) => {
                      setItemsPerPage(e.target.value)
                    }}
                    showFirstButton
                    showLastButton
                    className="col-span-4 lg:col-span-3"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  )
})

CanBoNghiepVuView.propTypes = {
  loading: PropTypes.bool.isRequired,
  totalYeuCau: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  keywordSearch: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  listTrangThaiHoSo: PropTypes.array.isRequired,
  postShowTTHCGVGuiYeuCau: PropTypes.array.isRequired,
  setPage: PropTypes.func.isRequired,
  setItemsPerPage: PropTypes.func.isRequired,
  handleTiepNhanHoSo: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  setSelectedTrangThai: PropTypes.func.isRequired,
}

export default CanBoNghiepVuView

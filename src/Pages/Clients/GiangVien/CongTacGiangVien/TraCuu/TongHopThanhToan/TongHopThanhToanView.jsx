import { Select } from '@/Components/Base'
import Icon from '@/Components/Base/Icon/Icon'
import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import Loading from '@/Components/Loading/Loading'
import { Checkbox, Pagination, Tooltip } from '@mui/material'
import { MdOutlineFilterAltOff } from 'react-icons/md'

export default function TongHopThanhToanView({
  home,
  breadcrumbs,
  listTongHopThanhToan,
  totalPage,
  currentPage,
  setCurrentPage,
  listNam,
  listHocKy,
  currentNam,
  setCurrentNam,
  currentHocKy,
  setCurrentHocKy,
  selectedItem,
  setSelectedItem,
  isLoading,
  listItemsPerPage,
  itemsPerPage,
  setItemsPerPage,
  filters,
  setFilters,
  currentMaNhanSu,
}) {
  return (
    <div className="bg-vs-theme-layout rounded-2xl mx-4 lg:mx-0 p-2">
      <div className="p-4 flex flex-col gap-4">
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />
        <h2 className="text-center uppercase text-lg md:text-2xl font-semibold text-sky-800">
          Tổng hợp thanh toán
        </h2>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex gap-3 justify-start items-center flex-wrap">
            <span>Tìm kiếm: </span>
            <div className="flex justify-start items-center gap-2 flex-wrap relative z-[20]">
              <span>Năm học: </span>
              <Select
                modelValue={currentNam}
                onChange={(value) => setCurrentNam(value)}
                data={listNam}
                labelKey="label"
                valueKey="value"
                label="Chọn năm"
                clearable={false}
                filterable={false}
              />
            </div>
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
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-full overflow-auto rounded-md border border-gray-300">
              <table className="min-w-max w-full border-spacing-0">
                <thead className="text-white">
                  <tr>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 w-[60px] relative lg:sticky lg:left-0`}
                      rowSpan={3}
                    >
                      CHỌN
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 w-[50px] relative lg:sticky lg:left-[60px]`}
                      rowSpan={3}
                    >
                      STT
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 relative lg:sticky lg:left-[110px]`}
                      rowSpan={2}
                      colSpan={4}
                    >
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                      rowSpan={2}
                      colSpan={2}
                    >
                      THÔNG TIN NHÂN SỰ
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                      rowSpan={2}
                      colSpan={2}
                    >
                      TRẠNG THÁI
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                      colSpan={9}
                    >
                      TỔNG HỢP KHỐI LƯỢNG
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                      colSpan={4}
                    >
                      PHÂN BỐ KHỐI LƯỢNG THỪA GIỜ (DỮ KIẾN)
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                      rowSpan={2}
                    >
                      LƯU Ý
                    </th>
                  </tr>
                  <tr>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 w-[80px]`}
                    >
                      KHỐI LƯỢNG ĐỊNH MỨC THỰC HIỆN
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 w-[80px]`}
                    >
                      TỔNG KHỐI LƯỢNG GIẢM TRỪ
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 w-[80px]`}
                    >
                      KHỐI LƯỢNG NGHIÊN CỨU KHOA HỌC
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 w-[80px]`}
                    >
                      KHỐI LƯỢNG COI CHẤM THI
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 w-[80px]`}
                    >
                      KHỐI LƯỢNG BÙ
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 w-[80px]`}
                      colSpan={2}
                    >
                      KHỐI LƯỢNG PHẢI THỰC HIỆN
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 w-[80px]`}
                    >
                      KHỐI LƯỢNG GIẢNG DẠY
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 w-[80px]`}
                    >
                      TỔNG HỢP CHUNG
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 w-[80px]`}
                    >
                      KHỐI LƯỢNG VƯỢT GIỜ
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 w-[80px]`}
                      colSpan={3}
                    >
                      KHỐI LƯỢNG HỢP ĐỒNG
                    </th>
                  </tr>
                  <tr>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 w-[100px] relative lg:sticky lg:left-[110px]`}
                    >
                      Học kỳ
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 w-[100px] relative lg:sticky lg:left-[210px]`}
                    >
                      Mã NS
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 w-[150px] relative lg:sticky lg:left-[310px]`}
                    >
                      Họ đệm
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 w-[100px] relative lg:sticky lg:left-[460px]`}
                    >
                      Tên
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                    >
                      Đơn vị quản lý NS
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                    >
                      Khoa chuyên môn
                    </th>
                    <th
                      className={`w-[80px] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                    >
                      Trạng thái
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                    >
                      Mô tả trạng thái
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                    >
                      Giờ
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                    >
                      Giờ
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                    >
                      Giờ
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                    >
                      Giờ
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                    >
                      Giờ
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                    >
                      Giờ
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                    >
                      Tiết
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                    >
                      Tiết
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                    >
                      Tiết
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                    >
                      Tiết
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                    >
                      Tiết
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                    >
                      SL HĐ
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                    >
                      Ghi chú
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                    >
                      Ghi chú
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-xs bg-white border border-gray-300 border-l-0 p-2 relative lg:sticky lg:left-0 text-center">
                      <Tooltip title={`Xóa bộ lọc`}>
                        <button
                          onClick={() => {
                            setFilters({
                              TTKL_THKL_MaNS: '',
                              TTKL_THKL_CoSo: '',
                              TTKL_THKL_HoDem: '',
                              TTKL_THKL_Ten: '',
                              TTKL_THKL_DonViQLNS: '',
                              TTKL_THKL_KhoaChuyenMon: '',
                              TTKL_THKL_TongKLThucHien: '',
                              TTKL_THKL_KLGT_QLDDT_Tong: '',
                              TTKL_THKL_KLGT_HTCMNVBDGV_Tong: '',
                              TTKL_THKL_KLGT_NCKH_Tong: '',
                              TTKL_THKL_KLGT_QLCSVC_Tong: '',
                              TTKL_THKL_KLGT_NCD_Tong: '',
                              TTKL_THKL_KLGT_HCTCM_Tong: '',
                              TTKL_THKL_KLGT_CTK_Tong: '',
                              TTKL_THKL_KLGT_TongKLGT: '',
                              TTKL_THKL_TongKLPTH: '',
                              TTKL_THKL_TongKLGiangDay: '',
                              TTKL_THKL_TongKLThua: '',
                              TTKL_THKL_TongKLThua_VuotGio: '',
                              TTKL_THKL_TongKLThua_VuotGio_SLHopDong: '',
                              TTKL_THKL_TongKLThua_VuotGio_SLHopDong_GhiChu: '',
                              TTKL_THKL_TongKLThua_HopDong: '',
                              TTKL_THKL_TongKLThua_HopDong_SLHopDong: '',
                              TTKL_THKL_TongKLThua_HopDong_SLHopDong_GhiChu: '',
                              TTKL_THKL_TrangThai: '',
                              TTKL_THKL_TrangThai_DaoTao: '',
                              TTKL_THKL_TrangThai_DaoTao_MoTa: '',
                              TTKL_KLCCT_TongKhoiLuong: '',
                              TTKL_KLB_TongKhoiLuongBu: '',
                              TTKL_TKBLHPGV_GhiChu: '',
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
                    <td className="text-xs bg-white border border-gray-300 border-l-0 p-2 relative lg:sticky lg:left-[60px] text-center">
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[110px] text-center">
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[210px] text-center">
                      {currentMaNhanSu == '01015045' ? (
                        <input
                          value={filters.TTKL_THKL_MaNS}
                          onChange={(e) => {
                            setFilters((_filters) => {
                              return {
                                ..._filters,
                                TTKL_THKL_MaNS: e.target.value,
                              }
                            })
                          }}
                          className="w-full rounded-md p-2 border-2 border-gray-300"
                        />
                      ) : null}
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[310px]">
                      <input
                        value={filters.TTKL_THKL_HoDem}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_THKL_HoDem: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[460px]">
                      <input
                        value={filters.TTKL_THKL_Ten}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_THKL_Ten: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />

                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <input
                        value={filters.TTKL_THKL_DonViQLNS}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_THKL_DonViQLNS: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <input
                        value={filters.TTKL_THKL_KhoaChuyenMon}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_THKL_KhoaChuyenMon: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                      <input
                        value={filters.TTKL_THKL_TrangThai}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_THKL_TrangThai: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <input
                        value={filters.TTKL_THKL_TrangThai_MoTa}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_THKL_TrangThai_MoTa: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                      <input
                        value={filters.TTKL_THKL_TongKLThucHien}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_THKL_TongKLThucHien: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                      <input
                        value={filters.TTKL_THKL_KLGT_TongKLGT}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_THKL_KLGT_TongKLGT: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                      <input
                        value={filters.TTKL_THKL_KLGT_NCKH_Tong}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_THKL_KLGT_NCKH_Tong: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                      <input
                        value={filters.TTKL_KLCCT_TongKhoiLuong}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_KLCCT_TongKhoiLuong: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                      <input
                        value={filters.TTKL_KLB_TongKhoiLuongBu}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_KLB_TongKhoiLuongBu: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                      <input
                        value={filters.TTKL_THKL_TongKLPTH}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_THKL_TongKLPTH: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                      <input
                        value={filters.TTKL_THKL_TongKLPTH_Tiet}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_THKL_TongKLPTH_Tiet: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                      <input
                        value={filters.TTKL_THKL_TongKLGiangDay}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_THKL_TongKLGiangDay: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2 text-center"></td>
                    <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                      <input
                        value={filters.TTKL_THKL_TongKLThua_VuotGio}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_THKL_TongKLThua_VuotGio: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                      <input
                        value={filters.TTKL_THKL_TongKLThua_HopDong}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_THKL_TongKLThua_HopDong: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                      <input
                        value={filters.TTKL_THKL_TongKLThua_HopDong_SLHopDong}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_THKL_TongKLThua_HopDong_SLHopDong:
                                e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                      <input
                        value={
                          filters.TTKL_THKL_TongKLThua_HopDong_SLHopDong_GhiChu
                        }
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_THKL_TongKLThua_HopDong_SLHopDong_GhiChu:
                                e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                      <input
                        value={filters.TTKL_THKL_GhiChu}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_THKL_GhiChu: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                  </tr>
                  {listTongHopThanhToan.length ? (
                    listTongHopThanhToan.map((e, i) => {
                      return (
                        <tr key={i}>
                          <td className="text-xs bg-white border border-gray-300 border-l-0 p-2 relative lg:sticky lg:left-0 text-center">
                            <Checkbox
                              checked={selectedItem === i}
                              onChange={() =>
                                setSelectedItem((_selectedItem) =>
                                  _selectedItem === i ? -1 : i,
                                )
                              }
                            />
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="text-xs bg-white border border-gray-300 border-l-0 p-2 relative lg:sticky lg:left-[60px] text-center">
                            {i + 1}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[110px] text-center">
                            {e.TTKL_THKL_HocKy}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[210px] text-center">
                            {e.TTKL_THKL_MaNS}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[310px]">
                            {e.TTKL_THKL_HoDem}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[460px]">
                            {e.TTKL_THKL_Ten}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2">
                            {e.TTKL_THKL_DonViQLNS}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2">
                            {e.TTKL_THKL_KhoaChuyenMon}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_THKL_TrangThai}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2">
                            {e.TTKL_THKL_TrangThai_MoTa}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_THKL_TongKLThucHien}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_THKL_KLGT_TongKLGT}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_THKL_KLGT_NCKH_Tong}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_KLCCT_TongKhoiLuong}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_KLB_TongKhoiLuongBu}
                          </td>
                          <td className="w-[80px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_THKL_TongKLPTH}
                          </td>
                          <td className="w-[80px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_THKL_TongKLPTH_Tiet}
                          </td>
                          <td className="w-[80px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_THKL_TongKLGiangDay}
                          </td>
                          <td className="w-[80px] text-xs bg-white border border-gray-300 p-2 text-center"></td>
                          <td className="w-[80px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_THKL_TongKLThua_VuotGio}
                          </td>
                          <td className="w-[80px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_THKL_TongKLThua_HopDong}
                          </td>
                          <td className="w-[80px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_THKL_TongKLThua_HopDong_SLHopDong}
                          </td>
                          <td className="w-[80px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_THKL_TongKLThua_HopDong_SLHopDong_GhiChu}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_THKL_GhiChu}
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="bg-white border border-gray-300 border-r-0 border-b-0 p-2 font-semibold relative lg:sticky lg:left-0"
                      >
                        Danh sách trống
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex justify-center items-center gap-2">
                <span>Số bản ghi trên trang</span>
                <Select
                  modelValue={itemsPerPage}
                  onChange={(value) => setItemsPerPage(value)}
                  data={listItemsPerPage}
                  labelKey="label"
                  valueKey="value"
                  clearable={false}
                  filterable={false}
                  triggerClass={`max-w-[80px]`}
                />
              </div>
              {totalPage > 1 ? (
                <Pagination
                  count={totalPage}
                  page={currentPage}
                  onChange={(e, value) => {
                    setCurrentPage(value)
                  }}
                  showFirstButton
                  showLastButton
                  shape="rounded"
                />
              ) : null}
            </div>
          </div>

          {selectedItem != -1 ? (
            <div className="flex flex-col mt-4 gap-4">
              <h2 className="text-center uppercase text-lg md:text-2xl font-semibold text-sky-800">
                Chi tiết
              </h2>
              <div className="w-full overflow-auto rounded-md border border-gray-300">
                <table className="min-w-max w-full border-spacing-0">
                  <thead className="text-white">
                    <tr>
                      <th
                        className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                      >
                        Mã LHP
                      </th>
                      <th
                        className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                      >
                        Tên môn học
                      </th>
                      <th
                        className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                      >
                        Tên lớp học
                      </th>
                      <th
                        className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                      >
                        Số nhóm
                      </th>
                      <th
                        className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                      >
                        Dự kiến loại khối lượng (DKLKL)
                      </th>
                      <th
                        className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                      >
                        Trạng thái (DKLKL)
                      </th>
                      <th
                        className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                      >
                        Ghi chú (DKLKL)
                      </th>
                      <th
                        className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                      >
                        Xác nhận (DKLKL)
                      </th>
                      <th
                        className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                      >
                        Trạng thái
                      </th>
                      <th
                        className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                      >
                        Quy đổi STTH GV1
                      </th>
                      <th
                        className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                      >
                        Ghi chú
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedItem != -1 &&
                    listTongHopThanhToan[selectedItem].Data_TTKL_THTT_Detail ? (
                      listTongHopThanhToan[selectedItem].Data_TTKL_THTT_Detail
                        .length > 0 ? (
                        listTongHopThanhToan[
                          selectedItem
                        ].Data_TTKL_THTT_Detail.map((e, i) => {
                          return (
                            <tr key={i}>
                              <td className="text-xs bg-white border border-l-0 border-gray-300 p-2 text-center">
                                {e.TTKL_TKBLHPGV_MaLopHocPhan}
                              </td>
                              <td className="text-xs bg-white border border-gray-300 p-2">
                                {e.TTKL_TKBLHPGV_TenMonHoc}
                              </td>
                              <td className="text-xs bg-white border border-gray-300 p-2">
                                {e.TTKL_TKBLHPGV_TenLopHoc}
                              </td>
                              <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                                {e.TTKL_TKBLHPGV_SLNhom}
                              </td>
                              <td className="w-[80px] text-xs bg-white border border-gray-300 p-2 text-center">
                                {e.TTKL_TKBLHPGV_XacDinhLoaiKhoiLuong}
                              </td>
                              <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                                {
                                  e.TTKL_TKBLHPGV_XacDinhLoaiKhoiLuong_XacDinh_TrangThai
                                }
                              </td>
                              <td className="text-left text-xs bg-white border border-gray-300 p-2">
                                {e.TTKL_TKBLHPGV_XacDinhLoaiKhoiLuong_GhiChu}
                              </td>
                              <td className="text-xs bg-white border border-gray-300 p-2">
                                {e.TTKL_TKBLHPGV_XacDinhLoaiKhoiLuong_XacDinh}
                              </td>
                              <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                                {e.TTKL_TKBLHPGV_TrangThai}
                              </td>
                              <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                                {e.TTKL_TKBLHPGV_QuyDoiSoTietThucHien_GV1}
                              </td>
                              <td className="text-left text-xs bg-white border border-r-0 border-gray-300 p-2">
                                {e.TTKL_TKBLHPGV_GhiChu}
                              </td>
                            </tr>
                          )
                        })
                      ) : (
                        <tr>
                          <td
                            colSpan={10}
                            className="bg-white border border-gray-300 border-l-0 border-r-0 border-b-0 p-2 font-semibold relative lg:sticky lg:left-0"
                          >
                            Danh sách trống
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                          </td>
                        </tr>
                      )
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

import { Select } from '@/Components/Base'
import Icon from '@/Components/Base/Icon/Icon'
import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import Loading from '@/Components/Loading/Loading'
import { DataCanBoGV } from '@/Services/Utils'
import { Checkbox, Pagination, Tooltip } from '@mui/material'
import { DebounceInput } from 'react-debounce-input'
import { MdOutlineFilterAltOff } from 'react-icons/md'

export default function LopHocPhanGiangVienView(props) {
  const {
    home,
    breadcrumbs,
    listLopHocPhan,
    listNam,
    currentNam,
    setCurrentNam,
    listHocKy,
    currentHocKy,
    setCurrentHocKy,
    totalPage,
    currentPage,
    setCurrentPage,
    isLoading,
    listItemsPerPage,
    itemsPerPage,
    setItemsPerPage,
    filters,
    setFilters,
  } = props

  const dataCBGV = DataCanBoGV()

  return (
    <div className="bg-vs-theme-layout rounded-2xl mx-4 xl:mx-0 p-4">
      <div className="p-4 flex flex-col gap-4">
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />

        <h2 className="text-center uppercase text-lg md:text-2xl font-semibold text-sky-800">
          Lớp học phần, Giảng viên
        </h2>

        {isLoading ? (
          <Loading />
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 justify-start items-center flex-wrap relative z-[20]">
              <span>Tìm kiếm: </span>
              <div className="flex justify-start items-center gap-2 flex-wrap c">
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
            <div className="w-full overflow-auto rounded-md border border-gray-300">
              <table className="min-w-max w-full border-spacing-0">
                <thead className="text-white">
                  <tr>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 rounded-tl-md w-[50px] relative xl:sticky xl:left-0`}
                      rowSpan={2}
                    >
                      STT
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 relative xl:sticky xl:left-[50px]`}
                      colSpan={9}
                    >
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                      colSpan={19}
                    >
                      THÔNG TIN LỚP HỌC PHẦN
                    </th>
                    <th
                      colSpan={2}
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                    >
                      LOẠI LỚP HP
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                      colSpan={3}
                    >
                      HỆ SỐ CHUNG
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                      colSpan={12}
                    >
                      GIẢNG VIÊN GIẢNG DẠY
                    </th>
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`}
                    >
                      LƯU Ý
                    </th>
                  </tr>
                  <tr>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[60px] relative xl:sticky xl:left-[50px]">
                      Cơ sở
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[100px] relative xl:sticky xl:left-[110px]">
                      Mã LHP
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[200px] relative xl:sticky xl:left-[210px]">
                      Tên môn học
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[100px] relative xl:sticky xl:left-[410px]">
                      Tên lớp học
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[100px] relative xl:sticky xl:left-[510px]">
                      Địa điểm HT
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[100px] relative xl:sticky xl:left-[610px]">
                      Xác định khối lượng
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[100px] relative xl:sticky xl:left-[710px]">
                      Loại khối lượng
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[100px] relative xl:sticky xl:left-[810px]">
                      Trạng thái
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[80px] relative xl:sticky xl:left-[910px]">
                      Số hợp đồng
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2">
                      Ghi chú (Loại khối lượng)
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2">
                      Mô tả trạng thái
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2">
                      Năm
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2">
                      Học kỳ
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2">
                      Khoa chủ quản HP
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2">
                      Môn học ngoài chương trình
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2">
                      Xếp lịch
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2">
                      Khóa học
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2">
                      Ngành
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2">
                      Hệ đào tạo
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2">
                      Loại hình đào tạo
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2">
                      Số TC
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2">
                      SS Đăng ký
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2">
                      Số tiết LT
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2">
                      Số tiết TH
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2">
                      Nhóm số
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2">
                      Sĩ số nhóm
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2">
                      SL GV dạy
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 max-w-[150px]">
                      Tổng số tiết của LHP (Số tiết thực tế EDU)
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2">
                      Lớp lý thuyết
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2">
                      Loại lớp HP
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2">
                      ĐTĐT
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2">
                      Giờ học
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2">
                      Quy mô lớp
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2">
                      Cơ sở GV1
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2">
                      Khoa GV1
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2">
                      Mã GV1
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2">
                      Họ tên GV1
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2">
                      Trình độ GV1
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2">
                      Trình độ (Thuộc đối tượng)
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2">
                      Hệ số trình độ
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2">
                      Hệ số ĐĐKCS GV1
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2">
                      Hệ số KCĐĐ GV1
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2">
                      Số tiết thực hiện GV1
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2">
                      Quy đổi STTH GV1
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2">
                      Ghi chú (Lớp HP)
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2">
                      Ghi chú
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="z-[10] text-xs bg-white border border-gray-300 border-l-0 p-2 relative xl:sticky xl:left-0 text-center">
                      <Tooltip title={`Xóa bộ lọc`}>
                        <button
                          onClick={() => {
                            setFilters({
                              TTKL_TKBLHPGV_TenCoSo: '',
                              TTKL_TKBLHPGV_MaLopHocPhan: '',
                              TTKL_TKBLHPGV_TenMonHoc: '',
                              TTKL_TKBLHPGV_TenLopHoc: '',
                              TTKL_TKBLHPGV_DiaDiemHocTap: '',
                              TTKL_TKBLHPGV_XacDinhKhoiLuong: '',
                              TTKL_TKBLHPGV_XacDinhLoaiKhoiLuong: '',
                              TTKL_TKBLHPGV_TrangThai: '',
                              TTKL_TKBLHPGV_HopDong_So: '',
                              TTKL_TKBLHPGV_XacDinhLoaiKhoiLuong_GhiChu: '',
                              TTKL_TKBLHPGV_XacDinhLoaiKhoiLuong_XacDinh_TrangThai:
                                '',
                              TTKL_TKBLHPGV_TenKhoaChuQuanHP: '',
                              TTKL_TKBLHPGV_IDMonHocNgoaiChuongTrinh: '',
                              TTKL_TKBLHPGV_IsXepLich: '',
                              TTKL_TKBLHPGV_TenKhoaHoc: '',
                              TTKL_TKBLHPGV_TenNganh: '',
                              TTKL_TKBLHPGV_TenHeDaoTao: '',
                              TTKL_TKBLHPGV_TenLoaiHinhDT: '',
                              TTKL_TKBLHPGV_SoTinChi: '',
                              TTKL_TKBLHPGV_SiSoDangKy: '',
                              TTKL_TKBLHPGV_SoTietLyThuyet: '',
                              TTKL_TKBLHPGV_SoTietThucHanh: '',
                              TTKL_TKBLHPGV_SLNhom: '',
                              TTKL_TKBLHPGV_SiSoNhom: '',
                              TTKL_TKBLHPGV_XepLichGiangDayCapGiangVien: '',
                              TTKL_TKBLHPGV_SoTiet_ThucTeEDU: '',
                              TTKL_TKBLHPGV_IsLyThuyet: '',
                              TTKL_TKBLHPGV_LoaiLopHocPhan: '',
                              TTKL_TKBLHPGV_HeSo_DoiTuongDaoTao: '',
                              TTKL_TKBLHPGV_HeSo_GioHoc: '',
                              TTKL_TKBLHPGV_HeSo_QuyMoLop: '',
                              TTKL_TKBLHPGV_CoSo_GiangVien1: '',
                              TTKL_TKBLHPGV_KhoaChuQuanGiangVien1: '',
                              TTKL_TKBLHPGV_MaNS: '',
                              TTKL_TKBLHPGV_TenGiangVien1: '',
                              TTKL_TKBLHPGV_TrinhDoGiangVien1: '',
                              TTKL_TKBLHPGV_TrinhDoGV_TrinhDo_DoiTuong1: '',
                              TTKL_TKBLHPGV_TrinhDoGV_TrinhDo_HeSo1: '',
                              TTKL_TKBLHPGV_HeSo_DiaDiemKhacCoSo_GV1: '',
                              TTKL_TKBLHPGV_HeSo_KhoangCachDiaDiem_GV1: '',
                              TTKL_TKBLHPGV_SoTietThucHien_GV1: '',
                              TTKL_TKBLHPGV_QuyDoiSoTietThucHien_GV1: '',
                              TTKL_TKBLHPGV_GhiChu: '',
                              TTKL_TKBLHPGV_GhiChu2: '',
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
                    <td className="z-[10] text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[50px] text-center">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_TenCoSo}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_TenCoSo: e.target.value,
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
                    <td className="z-[10] text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[110px] text-center">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_MaLopHocPhan}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_MaLopHocPhan: e.target.value,
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
                    <td className="z-[10] text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[210px]">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_TenMonHoc}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_TenMonHoc: e.target.value,
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
                    <td className="z-[10] text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[410px]">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_TenLopHoc}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_TenLopHoc: e.target.value,
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
                    <td className="z-[10] text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[510px]">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_DiaDiemHocTap}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_DiaDiemHocTap: e.target.value,
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
                    <td className="z-[10] text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[610px]">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_XacDinhKhoiLuong}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_XacDinhKhoiLuong: e.target.value,
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
                    <td className="z-[10] text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[710px]">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_XacDinhLoaiKhoiLuong}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_XacDinhLoaiKhoiLuong:
                                e.target.value,
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
                    <td className="z-[10] text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[810px] text-center">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_TrangThai}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_TrangThai: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                      {/* {e.x} */}
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="z-[10] text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[910px] text-center">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_HopDong_So}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_HopDong_So: e.target.value,
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
                      <DebounceInput
                        debounceTimeout={300}
                        value={
                          filters.TTKL_TKBLHPGV_XacDinhLoaiKhoiLuong_GhiChu
                        }
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_XacDinhLoaiKhoiLuong_GhiChu:
                                e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                      <DebounceInput
                        debounceTimeout={300}
                        value={
                          filters.TTKL_TKBLHPGV_XacDinhLoaiKhoiLuong_XacDinh_TrangThai
                        }
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_XacDinhLoaiKhoiLuong_XacDinh_TrangThai:
                                e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2"></td>
                    <td className="text-xs bg-white border border-gray-300 p-2"></td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_TenKhoaChuQuanHP}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_TenKhoaChuQuanHP: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_IDMonHocNgoaiChuongTrinh}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_IDMonHocNgoaiChuongTrinh:
                                e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <select
                        value={filters.TTKL_TKBLHPGV_IsXepLich}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_IsXepLich: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      >
                        <option value="">Tất cả</option>
                        <option value="true">Xếp lịch</option>
                        <option value="false">Không xếp lịch</option>
                      </select>
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_TenKhoaHoc}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_TenKhoaHoc: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_TenNganh}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_TenNganh: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_TenHeDaoTao}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_TenHeDaoTao: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_TenLoaiHinhDT}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_TenLoaiHinhDT: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_SoTinChi}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_SoTinChi: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_SiSoDangKy}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_SiSoDangKy: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_SoTietLyThuyet}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_SoTietLyThuyet: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_SoTietThucHanh}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_SoTietThucHanh: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_SLNhom}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_SLNhom: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_SiSoNhom}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_SiSoNhom: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={
                          filters.TTKL_TKBLHPGV_XepLichGiangDayCapGiangVien
                        }
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_XepLichGiangDayCapGiangVien:
                                e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_SoTiet_ThucTeEDU}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_SoTiet_ThucTeEDU: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                      <select
                        value={filters.TTKL_TKBLHPGV_IsLyThuyet}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_IsLyThuyet: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      >
                        <option value="">Tất cả</option>
                        <option value="true">Lớp lý thuyết</option>
                        <option value="false">Không phải lớp lý thuyết</option>
                      </select>
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_LoaiLopHocPhan}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_LoaiLopHocPhan: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_HeSo_DoiTuongDaoTao}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_HeSo_DoiTuongDaoTao: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_HeSo_GioHoc}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_HeSo_GioHoc: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_HeSo_QuyMoLop}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_HeSo_QuyMoLop: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_CoSo_GiangVien1}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_CoSo_GiangVien1: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_KhoaChuQuanGiangVien1}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_KhoaChuQuanGiangVien1:
                                e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      {dataCBGV.HT_GROUPUSER_ID.includes('1') ? (
                        <DebounceInput
                          debounceTimeout={300}
                          value={filters.TTKL_TKBLHPGV_MaNS}
                          onChange={(e) => {
                            setFilters((_filters) => {
                              return {
                                ..._filters,
                                TTKL_TKBLHPGV_MaNS: e.target.value,
                              }
                            })
                          }}
                          className="w-full rounded-md p-2 border-2 border-gray-300"
                        />
                      ) : null}
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_TenGiangVien1}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_TenGiangVien1: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_TrinhDoGiangVien1}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_TrinhDoGiangVien1: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={
                          filters.TTKL_TKBLHPGV_TrinhDoGV_TrinhDo_DoiTuong1
                        }
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_TrinhDoGV_TrinhDo_DoiTuong1:
                                e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_TrinhDoGV_TrinhDo_HeSo1}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_TrinhDoGV_TrinhDo_HeSo1:
                                e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_HeSo_DiaDiemKhacCoSo_GV1}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_HeSo_DiaDiemKhacCoSo_GV1:
                                e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_HeSo_KhoangCachDiaDiem_GV1}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_HeSo_KhoangCachDiaDiem_GV1:
                                e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_SoTietThucHien_GV1}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_SoTietThucHien_GV1: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_QuyDoiSoTietThucHien_GV1}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_QuyDoiSoTietThucHien_GV1:
                                e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_GhiChu}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_GhiChu: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 border-r-0 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_TKBLHPGV_GhiChu2}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_TKBLHPGV_GhiChu2: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                  </tr>
                  {listLopHocPhan.length ? (
                    listLopHocPhan.map((e, i) => {
                      return (
                        <tr key={i}>
                          <td className="z-[10] text-xs bg-white border border-gray-300 border-l-0 p-2 relative xl:sticky xl:left-0 text-center">
                            {(currentPage - 1) * itemsPerPage + i + 1}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="z-[10] text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[50px] text-center">
                            {e.TTKL_TKBLHPGV_TenCoSo}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="z-[10] text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[110px] text-center">
                            {e.TTKL_TKBLHPGV_MaLopHocPhan}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="z-[10] text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[210px]">
                            {e.TTKL_TKBLHPGV_TenMonHoc}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="z-[10] text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[410px]">
                            {e.TTKL_TKBLHPGV_TenLopHoc}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="z-[10] text-center text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[510px]">
                            {e.TTKL_TKBLHPGV_DiaDiemHocTap}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="z-[10] text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[610px]">
                            {e.TTKL_TKBLHPGV_XacDinhKhoiLuong}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="z-[10] text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[710px]">
                            {e.TTKL_TKBLHPGV_XacDinhLoaiKhoiLuong}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="z-[10] text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[810px] text-center">
                            {e.TTKL_TKBLHPGV_TrangThai_MoTa}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="z-[10] text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[910px] text-center">
                            {e.TTKL_TKBLHPGV_HopDong_SoDayDu}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="w-[80px] text-xs bg-white border border-gray-300 p-2">
                            {e.TTKL_TKBLHPGV_XacDinhLoaiKhoiLuong_GhiChu}
                          </td>
                          <td className="w-[80px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {
                              e.TTKL_TKBLHPGV_XacDinhLoaiKhoiLuong_XacDinh_TrangThai
                            }
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2">
                            {e.TTKL_TKBLHPGV_Nam}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2">
                            {e.TTKL_TKBLHPGV_TenDot}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2">
                            {e.TTKL_TKBLHPGV_TenKhoaChuQuanHP}
                          </td>
                          <td className="w-[40px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_TKBLHPGV_IDMonHocNgoaiChuongTrinh}
                          </td>
                          <td className="w-[100px] text-xs bg-white border border-gray-300 p-2 text-center">
                            <Checkbox
                              checked={e.TTKL_TKBLHPGV_IsXepLich}
                              disabled
                            />
                          </td>
                          <td className="w-[40px] text-xs bg-white border border-gray-300 p-2">
                            {e.TTKL_TKBLHPGV_TenKhoaHoc}
                          </td>
                          <td className="w-[80px] text-xs bg-white border border-gray-300 p-2">
                            {e.TTKL_TKBLHPGV_TenNganh}
                          </td>
                          <td className="w-[80px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_TKBLHPGV_TenHeDaoTao}
                          </td>
                          <td className="w-[80px] text-xs bg-white border border-gray-300 p-2">
                            {e.TTKL_TKBLHPGV_TenLoaiHinhDT}
                          </td>
                          <td className="w-[40px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_TKBLHPGV_SoTinChi}
                          </td>
                          <td className="w-[40px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_TKBLHPGV_SiSoDangKy}
                          </td>
                          <td className="w-[40px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_TKBLHPGV_SoTietLyThuyet}
                          </td>
                          <td className="w-[40px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_TKBLHPGV_SoTietThucHanh}
                          </td>
                          <td className="w-[40px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_TKBLHPGV_SLNhom}
                          </td>
                          <td className="w-[40px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_TKBLHPGV_SiSoNhom}
                          </td>
                          <td className="w-[40px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_TKBLHPGV_XepLichGiangDayCapGiangVien}
                          </td>
                          <td className="w-[80px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_TKBLHPGV_SoTiet_ThucTeEDU}
                          </td>
                          <td className="w-[100px] text-xs bg-white border border-gray-300 p-2 text-center">
                            <Checkbox checked={e.TTKL_TKBLHPGV_IsLyThuyet} />
                          </td>
                          <td className="w-[80px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_TKBLHPGV_LoaiLHP_TietChuan}
                          </td>
                          <td className="w-[40px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_TKBLHPGV_HeSo_DoiTuongDaoTao}
                          </td>
                          <td className="w-[60px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_TKBLHPGV_HeSo_GioHoc}
                          </td>
                          <td className="w-[80px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_TKBLHPGV_HeSo_QuyMoLop}
                          </td>
                          <td className="w-[80px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_TKBLHPGV_CoSo_GiangVien1}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2">
                            {e.TTKL_TKBLHPGV_KhoaChuQuanGiangVien1}
                          </td>
                          <td className="w-[40px] text-xs bg-white border border-gray-300 p-2">
                            {e.TTKL_TKBLHPGV_MaGiangVien1}
                          </td>
                          <td className="w-[100px] text-xs bg-white border border-gray-300 p-2">
                            {e.TTKL_TKBLHPGV_TenGiangVien1}
                          </td>
                          <td className="w-[60px] text-xs bg-white border border-gray-300 p-2">
                            {e.TTKL_TKBLHPGV_TrinhDoGiangVien1}
                          </td>
                          <td className="w-[80px] text-xs bg-white border border-gray-300 p-2">
                            {e.TTKL_TKBLHPGV_TrinhDoGV_TrinhDo_DoiTuong1}
                          </td>
                          <td className="w-[80px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_TKBLHPGV_TrinhDoGV_TrinhDo_HeSo1}
                          </td>
                          <td className="w-[80px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_TKBLHPGV_HeSo_DiaDiemKhacCoSo_GV1}
                          </td>
                          <td className="w-[40px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_TKBLHPGV_HeSo_KhoangCachDiaDiem_GV1}
                          </td>
                          <td className="w-[80px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_TKBLHPGV_SoTietThucHien_GV1}
                          </td>
                          <td className="w-[40px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_TKBLHPGV_QuyDoiSoTietThucHien_GV1}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2">
                            {e.TTKL_TKBLHPGV_GhiChu}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 border-r-0 p-2">
                            {e.TTKL_TKBLHPGV_GhiChu2}
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={10}
                        className="bg-white border border-gray-300 border-r-0 border-b-0 p-2 font-semibold relative xl:sticky xl:left-0"
                      >
                        Danh sách trống
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </td>
                    </tr>
                  )}
                  {listLopHocPhan.length ? (
                    <tr>
                      <td
                        colSpan={10}
                        className="z-[10] text-xs bg-white border border-gray-300 border-l-0 p-2 relative xl:sticky xl:left-0 text-center"
                      >
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </td>
                      <td className="text-xs bg-white border border-gray-300 p-2"></td>
                      <td className="text-xs bg-white border border-gray-300 p-2 text-center"></td>
                      <td className="text-xs bg-white border border-gray-300 p-2"></td>
                      <td className="text-xs bg-white border border-gray-300 p-2"></td>
                      <td className="text-xs bg-white border border-gray-300 p-2"></td>
                      <td className="text-xs bg-white border border-gray-300 p-2"></td>
                      <td className="text-xs bg-white border border-gray-300 p-2"></td>
                      <td className="text-xs bg-white border border-gray-300 p-2"></td>
                      <td className="text-xs bg-white border border-gray-300 p-2"></td>
                      <td className="text-xs bg-white border border-gray-300 p-2"></td>
                      <td className="text-xs bg-white border border-gray-300 p-2"></td>
                      <td className="text-xs bg-white border border-gray-300 p-2"></td>
                      <td className="text-xs bg-white border border-gray-300 p-2"></td>
                      <td className="text-xs bg-white border border-gray-300 p-2"></td>
                      <td className="text-xs bg-white border border-gray-300 p-2"></td>
                      <td className="text-xs bg-white border border-gray-300 p-2"></td>
                      <td className="text-xs bg-white border border-gray-300 p-2"></td>
                      <td className="text-xs bg-white border border-gray-300 p-2"></td>
                      <td className="text-xs bg-white border border-gray-300 p-2 text-center"></td>
                      <td className="text-xs bg-white border border-gray-300 p-2 text-center"></td>
                      <td className="text-xs bg-white border border-gray-300 p-2"></td>
                      <td className="text-xs bg-white border border-gray-300 p-2"></td>
                      <td className="text-xs bg-white border border-gray-300 p-2"></td>
                      <td className="text-xs bg-white border border-gray-300 p-2">
                        AVG ={' '}
                        {(
                          listLopHocPhan.reduce((accumulator, currentValue) => {
                            return (
                              accumulator +
                              +currentValue.TTKL_TKBLHPGV_HeSo_QuyMoLop
                            )
                          }, 0) / listLopHocPhan.length
                        ).toFixed(2)}
                      </td>
                      <td className="text-xs bg-white border border-gray-300 p-2"></td>
                      <td className="text-xs bg-white border border-gray-300 p-2"></td>
                      <td className="text-xs bg-white border border-gray-300 p-2"></td>
                      <td className="text-xs bg-white border border-gray-300 p-2"></td>
                      <td className="text-xs bg-white border border-gray-300 p-2"></td>
                      <td className="text-xs bg-white border border-gray-300 p-2"></td>
                      <td className="text-xs bg-white border border-gray-300 p-2"></td>
                      <td className="text-xs bg-white border border-gray-300 p-2"></td>
                      <td className="text-xs bg-white border border-gray-300 p-2"></td>
                      <td className="text-xs bg-white border border-gray-300 p-2"></td>
                      <td className="text-xs bg-white border border-gray-300 p-2"></td>
                      <td className="text-xs bg-white border border-gray-300 p-2"></td>
                      <td className="text-xs bg-white border border-gray-300 border-r-0 p-2"></td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex justify-center items-center gap-2 relative z-20">
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
        )}
      </div>
    </div>
  )
}

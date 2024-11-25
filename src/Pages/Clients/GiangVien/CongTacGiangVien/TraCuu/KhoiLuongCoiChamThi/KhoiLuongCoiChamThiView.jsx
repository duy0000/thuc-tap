import { getCoiChamThiDetail } from '@/Apis/ApiGiangVien/CongTacGiangVien/apiCTGVTraCuu'
import { Select } from '@/Components/Base'
import Icon from '@/Components/Base/Icon/Icon'
import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import Loading from '@/Components/Loading/Loading'
import {
  arrayBufferToBase64,
  DataCanBoGV,
  handleDownloadFileBase64,
} from '@/Services/Utils'
import { Pagination, Tooltip } from '@mui/material'
import { isNil } from 'lodash-unified'
import { DebounceInput } from 'react-debounce-input'
import { MdOutlineFilterAltOff } from 'react-icons/md'
import { toast } from 'react-toastify'

export default function KhoiLuongCoiChamThiView(props) {
  const {
    home,
    breadcrumbs,
    listCoiChamThi,
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

  const dataGV = DataCanBoGV()

  const downloadFile = async (id) => {
    try {
      const result = await getCoiChamThiDetail({
        TTKL_KLCCT_ID: id,
      })
      if (result.data?.code === 200) {
        const tenFile = result?.data?.body?.[0]?.TTKL_KLCCT_TenFile
        const dataFile = result?.data?.body?.[0]?.TTKL_KLCCT_DataFile?.data

        if (isNil(dataFile)) {
          toast.error('File không tồn tại hoặc không có dữ liệu')
        } else {
          handleDownloadFileBase64(tenFile, arrayBufferToBase64(dataFile)).then(
            (r) => r,
          )
        }
      } else {
        toast.error('Lỗi xảy ra khi lấy thông tin chi tiết!')
      }
    } catch (error) {
      toast.error('Lỗi xảy ra khi lấy thông tin chi tiết!')
    }
  }

  return (
    <div className="bg-vs-theme-layout rounded-2xl mx-4 xl:mx-0 p-4">
      <div className="flex flex-col gap-4">
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />

        <h2 className="text-center uppercase text-lg md:text-2xl font-semibold text-sky-800">
          Coi chấm thi
        </h2>

        {isLoading ? (
          <Loading />
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 justify-start items-center flex-wrap">
              <span>Tìm kiếm: </span>
              <div className="flex justify-start items-center gap-2 flex-wrap">
                <span>Năm học: </span>
                <Select
                  modelValue={currentNam}
                  onChange={(value) => {
                    setCurrentNam(value)
                  }}
                  data={listNam}
                  labelKey="label"
                  valueKey="value"
                  label="Chọn năm"
                  clearable={false}
                  filterable={false}
                />
              </div>
              <div className="flex justify-start items-center gap-2 flex-wrap">
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
                  <tr className="uppercase">
                    <th
                      className={`text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 rounded-tl-md w-[50px] relative xl:sticky xl:left-0`}
                      rowSpan={3}
                    >
                      STT
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>{' '}
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th
                      className="text-xs border border-gray-300 border-t-0 bg-uneti-primary p-2 relative xl:sticky xl:left-[50px]"
                      colSpan={9}
                    >
                      THÔNG TIN NHÂN SỰ
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>{' '}
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th
                      className="text-xs border border-gray-300 border-t-0 bg-uneti-primary p-2"
                      colSpan={7}
                    >
                      KHỐI LƯỢNG
                    </th>
                    <th
                      className="text-xs border border-gray-300 border-t-0 bg-uneti-primary p-2"
                      colSpan={2}
                      rowSpan={2}
                    >
                      FILE ĐÍNH KÈM
                    </th>
                    <th
                      className="text-xs border border-gray-300 border-t-0 border-r-0 bg-uneti-primary p-2 w-[160px]"
                      rowSpan={3}
                    >
                      GHI CHÚ
                    </th>
                  </tr>
                  <tr>
                    <th
                      className="text-xs border border-gray-300 border-t-0 bg-uneti-primary p-2 relative xl:sticky xl:left-[50px]"
                      colSpan={3}
                    >
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th
                      className="text-xs border border-gray-300 border-t-0 bg-uneti-primary p-2 relative xl:sticky xl:left-[300px]"
                      colSpan={5}
                    >
                      THÔNG TIN GIẢNG VIÊN
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th className="text-xs border border-gray-300 border-t-0 bg-uneti-primary p-2 relative xl:sticky xl:left-[950px]">
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th
                      className="text-xs border border-gray-300 border-t-0 bg-uneti-primary p-2"
                      colSpan={3}
                    ></th>
                    <th
                      className="text-xs border border-gray-300 border-t-0 bg-uneti-primary p-2"
                      colSpan={2}
                    >
                      KHỐI LƯỢNG KHÁC
                    </th>
                    <th
                      className="text-xs border border-gray-300 border-t-0 bg-uneti-primary p-2"
                      colSpan={2}
                    ></th>
                  </tr>
                  <tr>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[50px] relative xl:sticky xl:left-[50px]">
                      Năm
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[100px] relative xl:sticky xl:left-[100px]">
                      Học kỳ
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[100px] relative xl:sticky xl:left-[200px]">
                      Cơ sở
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[100px] relative xl:sticky xl:left-[300px]">
                      Mã NS
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[150px] relative xl:sticky xl:left-[400px]">
                      Họ đệm
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[100px] relative xl:sticky xl:left-[550px]">
                      Tên
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[150px] relative xl:sticky xl:left-[650px]">
                      Đơn vị quản lý nhân sự
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[150px] relative xl:sticky xl:left-[800px]">
                      Khoa chuyên môn
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[100px] relative xl:sticky xl:left-[950px]">
                      Trạng thái
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[60px]">
                      Coi thi (tiết) = 1
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[60px]">
                      Chấm thi (tiết) = 2
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[60px]">
                      Nghiên cứu KH (tiết)
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[80px]">
                      Tiết = 3
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[160px]">
                      Ghi chú
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[100px]">
                      Tổng (tiết) = (1 + 2 + 3)
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[100px]">
                      Tổng (Giờ) = (1 + 2 + 3)
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[160px]">
                      Mô tả
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[160px]">
                      Tên File
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-xs bg-white border border-gray-300 border-l-0 p-2 relative xl:sticky xl:left-0 text-center">
                      <Tooltip title={`Xóa bộ lọc`}>
                        <button
                          onClick={() => {
                            setFilters({
                              TTKL_KLCCT_MaNS: '',
                              TTKL_KLCCT_CoSo: '',
                              TTKL_KLCCT_HoDem: '',
                              TTKL_KLCCT_Ten: '',
                              TTKL_KLCCT_DVQLNS: '',
                              TTKL_KLCCT_KhoaChuyenMon: '',
                              TTKL_KLCCT_KLCoiThi: '',
                              TTKL_KLCCT_KLChamThi: '',
                              TTKL_KLCCT_KLNCKH: '',
                              TTKL_KLCCT_SoTiet: '',
                              TTKL_KLCCT_GhiChuKLK: '',
                              TTKL_KLCCT_TongKhoiLuong_Tiet: '',
                              TTKL_KLCCT_TongKhoiLuong: '',
                              TTKL_KLCCT_MoTaFile: '',
                              TTKL_KLCCT_TenFile: '',
                              TTKL_KLCCT_GhiChu: '',
                              TTKL_KLCCT_TrangThai: '',
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
                    <td className="text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[50px] text-center">
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[100px] text-center">
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[200px]">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_KLCCT_CoSo}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_KLCCT_CoSo: e.target.value,
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
                    <td className="text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[300px]">
                      {dataGV.HT_GROUPUSER_ID?.includes('1') ? (
                        <DebounceInput
                          debounceTimeout={300}
                          value={filters.TTKL_KLCCT_MaNS}
                          onChange={(e) => {
                            setFilters((_filters) => {
                              return {
                                ..._filters,
                                TTKL_KLCCT_MaNS: e.target.value,
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
                    <td className="text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[400px]">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_KLCCT_HoDem}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_KLCCT_HoDem: e.target.value,
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
                    <td className="text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[550px]">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_KLCCT_Ten}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_KLCCT_Ten: e.target.value,
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
                    <td className="text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[650px]">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_KLCCT_DVQLNS}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_KLCCT_DVQLNS: e.target.value,
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
                    <td className="text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[800px]">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_KLCCT_KhoaChuyenMon}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_KLCCT_KhoaChuyenMon: e.target.value,
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
                    <td className="text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[950px]">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_KLCCT_TrangThai}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_KLCCT_TrangThai: e.target.value,
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
                        value={filters.TTKL_KLCCT_KLCoiThi}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_KLCCT_KLCoiThi: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_KLCCT_KLChamThi}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_KLCCT_KLChamThi: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_KLCCT_KLNCKH}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_KLCCT_KLNCKH: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_KLCCT_SoTiet}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_KLCCT_SoTiet: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_KLCCT_GhiChuKLK}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_KLCCT_GhiChuKLK: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_KLCCT_TongKhoiLuong_Tiet}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_KLCCT_TongKhoiLuong_Tiet: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
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
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_KLCCT_MoTaFile}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_KLCCT_MoTaFile: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_KLCCT_TenFile}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_KLCCT_TenFile: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 border-r-0 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_KLCCT_GhiChu}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_KLCCT_GhiChu: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                  </tr>
                  {listCoiChamThi.length ? (
                    listCoiChamThi.map((e, i) => {
                      return (
                        <tr key={i}>
                          <td className="text-xs bg-white border border-gray-300 border-l-0 p-2 relative xl:sticky xl:left-0 text-center">
                            {(currentPage - 1) * itemsPerPage + i + 1}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[50px] text-center">
                            {e.TTKL_KLCCT_Nam}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[100px] text-center">
                            {e.TTKL_KLCCT_HocKy}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[200px] text-center">
                            {e.TTKL_KLCCT_CoSo}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[300px] text-center">
                            {e.TTKL_KLCCT_MaNS}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[400px]">
                            {e.TTKL_KLCCT_HoDem}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[550px]">
                            {e.TTKL_KLCCT_Ten}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[650px]">
                            {e.TTKL_KLCCT_DVQLNS}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[800px]">
                            {e.TTKL_KLCCT_KhoaChuyenMon}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[950px]">
                            {e.TTKL_KLCCT_TrangThai}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="max-w-[40px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_KLCCT_KLCoiThi}
                          </td>
                          <td className="w-[40px] text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_KLCCT_KLChamThi}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_KLCCT_KLNCKH}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_KLCCT_SoTiet}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2">
                            {e.TTKL_KLCCT_GhiChuKLK}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_KLCCT_TongKhoiLuong_Tiet}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_KLCCT_TongKhoiLuong}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2">
                            {e.TTKL_KLCCT_MoTaFile}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2">
                            <span
                              onClick={() =>
                                downloadFile(String(e.TTKL_KLCCT_ID))
                              }
                              className="font-bold text-sky-700 hover:opacity-70 cursor-pointer"
                            >
                              {e.TTKL_KLCCT_TenFile}
                            </span>
                          </td>
                          <td className="text-xs bg-white border border-gray-300 border-r-0 p-2">
                            {e.TTKL_KLCCT_GhiChu}
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
        )}
      </div>
    </div>
  )
}

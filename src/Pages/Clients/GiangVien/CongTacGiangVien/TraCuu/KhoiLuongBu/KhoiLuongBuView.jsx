import { getKhoiLuongBuDetail } from '@/Apis/ApiGiangVien/CongTacGiangVien/apiCTGVTraCuu'
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

export default function KhoiLuongBuView(props) {
  const {
    home,
    breadcrumbs,
    listKhoiLuongBu,
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

  const downloadFileById = async (id) => {
    try {
      const result = await getKhoiLuongBuDetail({
        TTKL_KLB_ID: id,
      })
      if (result.data?.code === 200) {
        const tenFile = result?.data?.body?.[0]?.TTKL_KLB_TenFile
        const dataFile = result?.data?.body?.[0]?.TTKL_KLB_DataFile?.data

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
      console.error(error)
      toast.error('Lỗi xảy ra khi lấy thông tin chi tiết!')
    }
  }

  return (
    <div className="bg-vs-theme-layout rounded-2xl mx-4 xl:mx-0 p-4">
      <div className="p-4 flex flex-col gap-4">
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />

        <h2 className="text-center uppercase text-lg md:text-2xl font-semibold text-sky-800">
          Khối lượng bù
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
                  onChange={(value) => setCurrentNam(value)}
                  data={listNam}
                  labelKey="label"
                  valueKey="value"
                  label="Chọn năm"
                  clearable={false}
                  filterable={false}
                />
              </div>
              <div className="flex justify-center items-center gap-2 flex-wrap">
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
                      className={`bordtext-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 rounded-tl-md w-[50px] relative xl:sticky xl:left-0`}
                      rowSpan={3}
                    >
                      STT
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th
                      className="bordtext-xs border border-gray-300 border-t-0 bg-uneti-primary p-2 relative xl:sticky xl:left-[50px]"
                      colSpan={9}
                    >
                      THÔNG TIN NHÂN SỰ
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th
                      className="text-xs border border-gray-300 border-t-0 bg-uneti-primary p-2"
                      colSpan={4}
                      rowSpan={2}
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
                      className="text-xs border border-gray-300 border-t-0 border-r-0 bg-uneti-primary p-2 w-[100px]"
                      rowSpan={3}
                    >
                      GHI CHÚ
                    </th>
                  </tr>
                  <tr>
                    <th
                      className="bordtext-xs border border-gray-300 border-t-0 bg-uneti-primary p-2 relative xl:sticky xl:left-[50px]"
                      colSpan={3}
                    >
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th
                      className="bordtext-xs border border-gray-300 border-t-0 bg-uneti-primary p-2 relative xl:sticky xl:left-[260px]"
                      colSpan={6}
                    >
                      Thông tin giảng viên
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                  </tr>
                  <tr>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[50px] relative xl:sticky xl:left-[50px]">
                      Năm
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[100px] relative xl:sticky xl:left-[100px]">
                      Học kỳ
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[60px] relative xl:sticky xl:left-[200px]">
                      Cơ sở
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[80px] relative xl:sticky xl:left-[260px]">
                      Mã NS
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[100px] relative xl:sticky xl:left-[340px]">
                      Họ đệm
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[80px] relative xl:sticky xl:left-[440px]">
                      Tên
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[120px] relative xl:sticky xl:left-[520px]">
                      Đơn vị quản lý nhân sự
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[100px] relative xl:sticky xl:left-[640px]">
                      Khoa chuyên môn
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[100px] relative xl:sticky xl:left-[740px]">
                      Trạng thái
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[100px]">
                      Bên ngoài (tiết) = 1
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[100px]">
                      Trên phần mềm (tiết) = 2
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[100px]">
                      Tổng tiết = (1 + 2)
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[100px]">
                      Tổng giờ = (1 + 2)
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[100px]">
                      Mô tả
                    </th>
                    <th className="text-xs border border-gray-300 bg-uneti-primary p-2 w-[100px]">
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
                              TTKL_KLB_Nam: '',
                              TTKL_KLB_HocKy: '',
                              TTKL_KLB_MaNS: '',
                              SoTrang: '',
                              SoBanGhiTrenTrang: '',
                              TTKL_KLB_CoSo: '',
                              TTKL_KLB_HoDem: '',
                              TTKL_KLB_Ten: '',
                              TTKL_KLB_DVQLNS: '',
                              TTKL_KLB_KhoaChuyenMon: '',
                              TTKL_KLB_KLBenNgoai: '',
                              TTKL_KLB_KLTrenPhanMem: '',
                              TTKL_KLB_KLKhac: '',
                              TTKL_KLB_TongKhoiLuongBu_Tiet: '',
                              TTKL_KLB_TongKhoiLuongBu: '',
                              TTKL_KLB_MoTaFile: '',
                              TTKL_KLB_TenFile: '',
                              TTKL_KLB_GhiChu: '',
                              TTKL_KLB_TrangThai: '',
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
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_KLB_Nam}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_KLB_Nam: e.target.value,
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
                    <td className="text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[100px] text-center">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_KLB_HocKy}
                        onChange={(e) => {
                          setCurrentHocKy(e.target.value)
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[200px]">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_KLB_CoSo}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_KLB_CoSo: e.target.value,
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
                    <td className="text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[260px]">
                      {dataGV.HT_GROUPUSER_ID?.includes('1') ? (
                        <DebounceInput
                          debounceTimeout={300}
                          value={filters.TTKL_KLB_MaNS}
                          onChange={(e) => {
                            setFilters((_filters) => {
                              return {
                                ..._filters,
                                TTKL_KLB_MaNS: e.target.value,
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
                    <td className="text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[340px]">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_KLB_HoDem}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_KLB_HoDem: e.target.value,
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
                    <td className="text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[440px]">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_KLB_Ten}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_KLB_Ten: e.target.value,
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
                    <td className="text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[520px]">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_KLB_DVQLNS}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_KLB_DVQLNS: e.target.value,
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
                    <td className="text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[640px]">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_KLB_KhoaChuyenMon}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_KLB_KhoaChuyenMon: e.target.value,
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
                    <td className="text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[740px]">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_KLB_TrangThai}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_KLB_TrangThai: e.target.value,
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
                        value={filters.TTKL_KLB_KLBenNgoai}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_KLB_KLBenNgoai: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_KLB_KLTrenPhanMem}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_KLB_KLTrenPhanMem: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_KLB_TongKhoiLuongBu_Tiet}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_KLB_TongKhoiLuongBu_Tiet: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
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
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_KLB_MoTaFile}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_KLB_MoTaFile: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_KLB_TenFile}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_KLB_TenFile: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                    <td className="text-xs bg-white border border-gray-300 border-r-0 p-2">
                      <DebounceInput
                        debounceTimeout={300}
                        value={filters.TTKL_KLB_GhiChu}
                        onChange={(e) => {
                          setFilters((_filters) => {
                            return {
                              ..._filters,
                              TTKL_KLB_GhiChu: e.target.value,
                            }
                          })
                        }}
                        className="w-full rounded-md p-2 border-2 border-gray-300"
                      />
                    </td>
                  </tr>
                  {listKhoiLuongBu.length ? (
                    listKhoiLuongBu.map((e, i) => {
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
                            {e.TTKL_KLB_Nam}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[100px] text-center">
                            {e.TTKL_KLB_HocKy}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[200px] text-center">
                            {e.TTKL_KLB_CoSo}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[260px] text-center">
                            {e.TTKL_KLB_MaNS}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[340px]">
                            {e.TTKL_KLB_HoDem}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[440px]">
                            {e.TTKL_KLB_Ten}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[520px]">
                            {e.TTKL_KLB_DVQLNS}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[640px]">
                            {e.TTKL_KLB_KhoaChuyenMon}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 relative xl:sticky xl:left-[740px] text-center">
                            {e.TTKL_KLB_TrangThai}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_KLB_KLBenNgoai}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_KLB_KLTrenPhanMem}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_KLB_TongKhoiLuongBu_Tiet}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_KLB_TongKhoiLuongBu}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2">
                            {e.TTKL_KLB_MoTaFile}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2">
                            <span
                              onClick={() =>
                                downloadFileById(String(e.TTKL_KLB_ID))
                              }
                              className="font-bold text-cyan-700 hover:opacity-70 cursor-pointer"
                            >
                              {e.TTKL_KLB_TenFile}
                            </span>
                          </td>
                          <td className="text-xs bg-white border border-gray-300 border-r-0 p-2">
                            {e.TTKL_KLB_GhiChu}
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
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
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

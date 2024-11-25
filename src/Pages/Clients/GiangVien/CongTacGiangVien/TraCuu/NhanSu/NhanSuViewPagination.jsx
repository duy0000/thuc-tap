import { Select } from '@/Components/Base'
import Icon from '@/Components/Base/Icon/Icon'
import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import Loading from '@/Components/Loading/Loading'
import { dayjs } from '@/Services/Utils/dayjs'
import { Pagination, Tooltip } from '@mui/material'
import { MdOutlineFilterAltOff } from 'react-icons/md'
import { DebounceInput } from 'react-debounce-input'

export default function NhanSuViewPagination(props) {
  const {
    home,
    breadcrumbs,
    listNhanSu,
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
    // currentMaNhanSu,
  } = props
  console.log('nhân sự được ruyền vào', listNhanSu)

  //arr để ren các ô input
  const filterFields = [
    {
      className:
        'text-xs bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[200px] text-center',
      value: 'filters.TTKL_NS_CoSo',
      changeValue: 'TTKL_NS_CoSo',
      showSpanElement: true,
      type: 'text',
    },
    {
      className:
        'text-xs bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[300px] text-center',
      value: 'filters.TTKL_NS_MaNS',
      changeValue: 'TTKL_NS_MaNS',
      showSpanElement: true,
      type: 'text',
    },
    {
      className:
        'text-xs bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[400px]',
      value: 'filters.TTKL_NS_HoDem',
      changeValue: 'TTKL_NS_HoDem',
      showSpanElement: true,
      type: 'text',
    },
    {
      className:
        'text-xs bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[500px]',
      value: 'filters.TTKL_NS_Ten',
      changeValue: 'TTKL_NS_Ten',
      showSpanElement: true,
      type: 'text',
    },
    {
      className:
        'text-xs bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[550px] text-center',
      value: 'filters.TTKL_NS_TrangThai',
      changeValue: 'TTKL_NS_TrangThai',
      showSpanElement: true,
      type: 'text',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2 ',
      value: 'filters.TTKL_NS_TrangThai_MoTa',
      changeValue: 'TTKL_NS_TrangThai_MoTa',
      type: 'text',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2 text-center',
      value: 'filters.TTKL_NS_ChucVu',
      changeValue: 'TTKL_NS_ChucVu',
      type: 'text',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2',
      value: 'filters.TTKL_NS_ChuyenNganh',
      changeValue: 'TTKL_NS_ChuyenNganh',
      type: 'text',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2',
      value: 'filters.TTKL_NS_NgaySinh',
      changeValue: 'TTKL_NS_NgaySinh',
      type: 'date',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2 text-center',
      value: 'filters.TTKL_NS_GioiTinh',
      changeValue: 'TTKL_NS_GioiTinh',
      type: 'text',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2 max-w-[250px]',
      value: 'filters.TTKL_NS_DiaChi',
      changeValue: 'TTKL_NS_DiaChi',
      type: 'text',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2',
      value: 'filters.TTKL_NS_SoDienThoai',
      changeValue: 'TTKL_NS_SoDienThoai',
      type: 'text',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2',
      value: 'filters.TTKL_NS_Email',
      changeValue: 'TTKL_NS_Email',
      type: 'text',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2',
      value: 'filters.TTKL_NS_MaSoThue',
      changeValue: 'TTKL_NS_MaSoThue',
      type: 'text',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2',
      value: 'filters.TTKL_NS_LoaiGV',
      changeValue: 'TTKL_NS_LoaiGV',
      type: 'text',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2',
      value: 'filters.TTKL_NS_LoaiGV2',
      changeValue: 'TTKL_NS_LoaiGV2',
      type: 'text',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2',
      value: 'filters.TTKL_NS_DonViQLNS',
      changeValue: 'TTKL_NS_DonViQLNS',
      type: 'text',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2',
      value: 'filters.TTKL_NS_KhoaChuyenMon',
      changeValue: 'TTKL_NS_KhoaChuyenMon',
      type: 'text',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2',
      value: 'filters.TTKL_NS_SoCMT',
      changeValue: 'TTKL_NS_SoCMT',
      type: 'text',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2',
      value: ' filters.TTKL_NS_NgayCap',
      changeValue: 'TTKL_NS_NgayCap',
      type: 'date',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2',
      value: 'filters.TTKL_NS_NoiCap',
      changeValue: 'TTKL_NS_NoiCap',
      type: 'text',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2',
      value: 'filters.TTKL_NS_SoTaiKhoan',
      changeValue: 'TTKL_NS_SoTaiKhoan',
      type: 'text',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2',
      value: 'filters.TTKL_NS_TenNganHang',
      changeValue: 'TTKL_NS_TenNganHang',
      type: 'text',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2',
      value: 'filters.TTKL_NS_TrinhDoGV_TrinhDo',
      changeValue: 'TTKL_NS_TrinhDoGV_TrinhDo',
      type: 'text',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2',
      value: 'filters.TTKL_NS_TrinhDoGV_TrinhDo_DoiTuong',
      changeValue: 'TTKL_NS_TrinhDoGV_TrinhDo_DoiTuong',
      type: 'text',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2 text-center',
      value: 'filters.TTKL_NS_TrinhDoGV_TrinhDo_HeSo',
      changeValue: 'TTKL_NS_TrinhDoGV_TrinhDo_HeSo',
      type: 'text',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2 text-center',
      value: 'filters.TTKL_NS_KLGT_QLDDT_TrongGioHC_CTQL_KLGT',
      changeValue: 'TTKL_NS_KLGT_QLDDT_TrongGioHC_CTQL_KLGT',
      type: 'text',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2 text-center',
      value: 'filters.TTKL_NS_KLGT_QLDDT_TrongGioHC_CTD_KLGT',
      changeValue: 'TTKL_NS_KLGT_QLDDT_TrongGioHC_CTD_KLGT',
      type: 'text',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2 text-center',
      value: 'filters.TTKL_NS_KLGT_QLDDT_TrongGioHC_CTDT_KLGT',
      changeValue: 'TTKL_NS_KLGT_QLDDT_TrongGioHC_CTDT_KLGT',
      type: 'text',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2 text-center',
      value: 'filters.TTKL_NS_KLGT_QLDDT_NgoaiGioHC_CTQL_KLGT',
      changeValue: 'TTKL_NS_KLGT_QLDDT_NgoaiGioHC_CTQL_KLGT',
      type: 'text',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2 text-center',
      value: 'filters.TTKL_NS_KLGT_QLDDT_NgoaiGioHC_CTD_KLGT',
      changeValue: 'TTKL_NS_KLGT_QLDDT_NgoaiGioHC_CTD_KLGT',
      type: 'text',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2 text-center',
      value: 'filters.TTKL_NS_KLGT_QLDDT_NgoaiGioHC_CTDT_KLGT',
      changeValue: 'TTKL_NS_KLGT_QLDDT_NgoaiGioHC_CTDT_KLGT',
      type: 'text',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2 text-center',
      value: 'filters.TTKL_NS_KLGT_HTCMNVBDGV_KLGT',
      changeValue: 'TTKL_NS_KLGT_HTCMNVBDGV_KLGT',
      type: 'text',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2 text-center',
      value: 'filters.TTKL_NS_KLGT_HTCMNVBDGV_KLGT',
      changeValue: 'TTKL_NS_KLGT_HTCMNVBDGV_KLGT',
      type: 'text',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2 text-center',
      value: 'filters.TTKL_NS_KLGT_NCD_KLGT',
      changeValue: 'TTKL_NS_KLGT_NCD_KLGT',
      type: 'text',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2 text-center',
      value: 'filters.TTKL_NS_KLGT_NCD_KLGT',
      changeValue: 'TTKL_NS_KLGT_NCD_KLGT',
      type: 'text',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2 text-center',
      value: 'filters.TTKL_NS_KLGT_CTK_KLGT',
      changeValue: 'TTKL_NS_KLGT_CTK_KLGT',
      type: 'text',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2 text-center',
      value: 'filters.TTKL_NS_KLGT_TongKLGT',
      changeValue: 'TTKL_NS_KLGT_TongKLGT',
      type: 'text',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2 text-center',
      value: 'filters.TTKL_NS_KLGT_NCKH_KLGT',
      changeValue: 'TTKL_NS_KLGT_NCKH_KLGT',
      type: 'text',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2 text-center',
      value: 'filters.TTKL_NS_TongKLThucHien',
      changeValue: 'TTKL_NS_TongKLThucHien',
      type: 'text',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2 text-center',
      value: 'filters.TTKL_NS_TongKLPTH',
      changeValue: 'TTKL_NS_TongKLPTH',
      type: 'text',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2 text-center',
      value: 'filters.TTKL_NS_TenFile',
      changeValue: 'TTKL_NS_TenFile',
      type: 'text',
    },
    {
      className: 'text-xs bg-white border border-gray-300 p-2 text-center',
      value: 'filters.TTKL_NS_TenFile',
      changeValue: 'TTKL_NS_TenFile',
      type: 'text',
    },
  ]
  //arr để ren các th trong thead của table
  const arrThead = [
    [
      {
        className: `text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 w-[50px] relative lg:sticky lg:left-0`,
        rowSpan: 5,
        content: 'STT',
        spanElement: true,
      },
      {
        className: `text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 relative lg:sticky lg:left-[50px]`,
        rowSpan: 4,
        colSpan: 7,
        content: '',
        spanElement: true,
      },
      {
        className: `text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        colSpan: 18,
        content: 'THÔNG TIN NHÂN SỰ',
      },
      {
        className: `text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        colSpan: 3,
        rowSpan: 4,
        content: 'TRÌNH ĐỘ GIẢNG VIÊN',
      },
      {
        className: `text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        colSpan: 12,
        content: 'KHỐI LƯỢNG GIẢM TRỪ',
      },
      {
        className: `text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 max-w-[150px]`,
        rowSpan: 4,
        content: 'NGHIÊN CỨU KHOA HỌC',
      },
      {
        className: `text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 max-w-[150px]`,
        rowSpan: 4,
        content: 'KHỐI LƯỢNG ĐỊNH MỨC THỰC HIỆN',
      },
      {
        className: `text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 max-w-[150px]`,
        rowSpan: 4,
        content: 'TỔNG KHỐI LƯỢNG PHẢI THỰC HIỆN',
      },
      {
        className: `text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 max-w-[150px]`,
        rowSpan: 4,
        content: 'FILE ĐÍNH KÈM',
      },
      {
        className: `text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        rowSpan: 4,
        content: 'LƯU Ý',
      },
    ],
    [
      {
        className: `text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        rowSpan: 3,
        colSpan: 13,
        content: '',
      },
      {
        className: `text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        rowSpan: 3,
        colSpan: 3,
        content: 'Chứng minh thư',
      },
      {
        className: `text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        rowSpan: 3,
        colSpan: 2,
        content: 'Ngân hàng',
      },
      {
        className: `text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        colSpan: 6,
        content: 'THAM GIA CÔNG TÁC QUẢN LÝ, ĐẢNG, ĐOÀN THỂ',
      },
      {
        className: `text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 max-w-[150px]`,
        rowSpan: 3,
        content:
          'CÔNG TÁC HỌC TẬP NÂNG CAO TRÌNH ĐỘ CHUYÊN MÔN, NGHIỆP VỤ, BỒI DƯỠNG GIẢNG VIÊN',
      },
      {
        className: `text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 max-w-[150px]`,
        rowSpan: 3,
        content: 'QUẢN LÝ CƠ SỞ VẬT CHẤT',
      },
      {
        className: `text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 max-w-[150px]`,
        rowSpan: 3,
        content: 'NGHỈ CHẾ ĐỘ',
      },
      {
        className: `text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 max-w-[150px]`,
        rowSpan: 3,
        content: 'HỌP CÔNG TÁC CHUYÊN MÔN',
      },
      {
        className: `text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 max-w-[150px]`,
        rowSpan: 3,
        content: 'CÔNG TÁC KHÁC',
      },
      {
        className: `text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2 max-w-[150px]`,
        rowSpan: 3,
        content: 'TỔNG KHỐI LƯỢNG GIẢM TRỪ',
      },
    ],
    [
      {
        className: `text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        colSpan: 3,
        content: 'Trong giờ hành chính',
      },
      {
        className: `text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        colSpan: 3,
        content: 'Ngoài giờ hành chính',
      },
    ],
    [
      {
        className: `text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: 'Công tác quản lý',
      },
      {
        className: `text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: 'Đảng',
      },
      {
        className: `text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: 'Đoàn thể',
      },
      {
        className: `text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: 'Công tác quản lí',
      },
      {
        className: `text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: 'Đảng',
      },
      {
        className: `text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: 'Đoàn thể',
      },
    ],
    [
      {
        className: `text-xs border border-gray-300 bg-uneti-primary p-2 w-[50px] relative lg:sticky lg:left-[50px]`,
        content: 'Năm',
        spanElement: true,
      },
      {
        className: `text-xs border border-gray-300 bg-uneti-primary p-2 w-[100px] relative lg:sticky lg:left-[100px]`,
        content: 'Học kì',
        spanElement: true,
      },
      {
        className: `text-xs border border-gray-300 bg-uneti-primary p-2 w-[100px] relative lg:sticky lg:left-[200px]`,
        content: 'Cơ sở',
        spanElement: true,
      },
      {
        className: `text-xs border border-gray-300 bg-uneti-primary p-2 w-[100px] relative lg:sticky lg:left-[300px]`,
        content: 'Mã NS',
        spanElement: true,
      },
      {
        className: `text-xs border border-gray-300 bg-uneti-primary p-2 w-[100px] relative lg:sticky lg:left-[400px]`,
        content: 'Họ đệm',
        spanElement: true,
      },
      {
        className: `text-xs border border-gray-300 bg-uneti-primary p-2 w-[50px] relative lg:sticky lg:left-[500px]`,
        content: 'Tên',
        spanElement: true,
      },
      {
        className: `text-xs border border-gray-300 bg-uneti-primary p-2 w-[80px] relative lg:sticky lg:left-[550px]`,
        content: 'Trạng thái',
        spanElement: true,
      },
      {
        className: `w-[80px] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: 'Mô tả trạng thái',
      },
      {
        className: `w-[80px] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: 'Chức vụ',
      },
      {
        className: `w-[80px] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: 'Chuyên ngành',
      },
      {
        className: `w-[80px] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: 'Ngày sinh',
      },
      {
        className: `w-[80px] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: 'Giới tính',
      },
      {
        className: `text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: 'Địa chỉ',
      },
      {
        className: `w-[80px] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: 'Điện thoại',
      },
      {
        className: `w-[80px] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: 'Email',
      },
      {
        className: `w-[80px] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: 'Mã số thuế',
      },
      {
        className: `w-[80px] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: 'Loại GV',
      },
      {
        className: `w-[80px] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: 'Ngạch GV',
      },
      {
        className: `text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: 'Đơn vị quản lí NS',
      },
      {
        className: `text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: 'Khoa chuyên môn',
      },
      {
        className: `w-[80px] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: 'Số CMT',
      },
      {
        className: `w-[80px] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: 'Ngày cấp',
      },
      {
        className: `w-[80px] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: 'Nơi cấp',
      },
      {
        className: `w-[80px] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: 'Tài khoản',
      },
      {
        className: `w-[100px] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: 'Ngân hàng',
      },
      {
        className: `w-[80px] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: 'Trình độ',
      },
      {
        className: `w-[100px] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: 'Trình độ (thuộc đối tượng)',
      },
      {
        className: `w-[40px] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: 'Hệ số trình độ',
      },
      {
        className: `w-[40px] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: '(01)',
      },
      {
        className: `w-[40px] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: '(02)',
      },
      {
        className: `w-[40px] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: '(03)',
      },
      {
        className: `w-[40px] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: '(04)',
      },
      {
        className: `w-[40px] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: '(05)',
      },
      {
        className: `w-[40px] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: '(06)',
      },
      {
        className: `w-[100px] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: '(07)',
      },
      {
        className: `w-[40px] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: '(08)',
      },
      {
        className: `w-[40px] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: '(09)',
      },
      {
        className: `w-[40px] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: '(10)',
      },
      {
        className: `w-[40px] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: '(11)',
      },
      {
        className: `w-[40px] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: 'Giờ',
      },
      {
        className: `w-[40px] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: 'Giờ',
      },
      {
        className: `w-[40px] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: 'Giờ',
      },
      {
        className: `w-[40px] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: 'Giờ',
      },
      {
        className: `w-[100px] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: 'Tên File',
      },
      {
        className: `w-[100px] text-xs border border-gray-300 border-l-0 border-t-0 bg-uneti-primary p-2`,
        content: 'Ghi Chú',
      },
    ],
  ]
  return (
    <div className="bg-vs-theme-layout rounded-2xl mx-4 lg:mx-0">
      <div className="p-4 flex flex-col gap-4">
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />

        <h2 className="text-center uppercase text-lg md:text-2xl font-semibold text-sky-800">
          NHÂN SỰ
        </h2>

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
            <div className="w-full overflow-auto rounded-md border border-gray-300">
              <table className="min-w-max w-full border-spacing-0">
                <thead className="text-white">
                  {arrThead.map((item, Idx) => (
                    <tr key={Idx}>
                      {/* Duyệt qua mỗi nhóm cột và tạo các th */}
                      {item.map((header, colIndex) => (
                        <th
                          className={header.className}
                          colSpan={header.colSpan}
                          rowSpan={header.rowSpan}
                          key={colIndex}
                        >
                          {header.content}
                          {header.spanElement && (
                            <>
                              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                            </>
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  <tr>
                    <td className="text-xs bg-white border border-gray-300 border-l-0 p-2 relative lg:sticky lg:left-0 text-center">
                      <Tooltip title={`Xóa bộ lọc`}>
                        <button
                          onClick={() => {
                            setFilters({
                              TTKL_NS_Nam: '',
                              TTKL_NS_HocKy: '',
                              TTKL_NS_CoSo: '',
                              TTKL_NS_MaNS: '',
                              TTKL_NS_HoDem: '',
                              TTKL_NS_Ten: '',
                              TTKL_NS_TrangThai: '',
                              TTKL_NS_TrangThai_MoTa: '',
                              TTKL_NS_ChucVu: '',
                              TTKL_NS_ChuyenNganh: '',
                              TTKL_NS_NgaySinh: '',
                              TTKL_NS_GioiTinh: '',
                              TTKL_NS_DiaChi: '',
                              TTKL_NS_SoDienThoai: '',
                              TTKL_NS_Email: '',
                              TTKL_NS_MaSoThue: '',
                              TTKL_NS_LoaiGV: '',
                              TTKL_NS_LoaiGV2: '',
                              TTKL_NS_DonViQLNS: '',
                              TTKL_NS_KhoaChuyenMon: '',
                              TTKL_NS_SoCMT: '',
                              TTKL_NS_NgayCap: '',
                              TTKL_NS_NoiCap: '',
                              TTKL_NS_SoTaiKhoan: '',
                              TTKL_NS_TenNganHang: '',
                              TTKL_NS_TrinhDoGV_TrinhDo: '',
                              TTKL_NS_TrinhDoGV_TrinhDo_DoiTuong: '',
                              TTKL_NS_TrinhDoGV_TrinhDo_HeSo: '',
                              TTKL_NS_KLGT_QLDDT_TrongGioHC_CTQL_KLGT: '',
                              TTKL_NS_KLGT_QLDDT_TrongGioHC_CTD_KLGT: '',
                              TTKL_NS_KLGT_QLDDT_TrongGioHC_CTDT_KLGT: '',
                              TTKL_NS_KLGT_QLDDT_NgoaiGioHC_CTQL_KLGT: '',
                              TTKL_NS_KLGT_QLDDT_NgoaiGioHC_CTD_KLGT: '',
                              TTKL_NS_KLGT_QLDDT_NgoaiGioHC_CTDT_KLGT: '',
                              TTKL_NS_KLGT_HTCMNVBDGV_KLGT: '',
                              TTKL_NS_KLGT_QLCSVC_KLGT: '',
                              TTKL_NS_KLGT_NCD_KLGT: '',
                              TTKL_NS_KLGT_HCTCM_KLGT: '',
                              TTKL_NS_KLGT_CTK_KLGT: '',
                              TTKL_NS_KLGT_TongKLGT: '',
                              TTKL_NS_KLGT_NCKH_KLGT: '',
                              TTKL_NS_TongKLThucHien: '',
                              TTKL_NS_TongKLPTH: '',
                              TTKL_NS_TenFile: '',
                              TTKL_NS_GhiChu: '',
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
                    <td className="text-xs bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[50px] text-center">
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="text-xs bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[100px] text-center">
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>

                    {filterFields.map((array, index) => {
                      const value =
                        array.type === 'date'
                          ? filters[array.changeValue]
                            ? dayjs(filters[array.changeValue]).format(
                                'YYYY-MM-DD',
                              )
                            : ''
                          : filters[array.changeValue] || ''

                      return (
                        <td key={index} className={array.className}>
                          <DebounceInput
                            debounceTimeout={1000}
                            value={value}
                            type={array.type}
                            onChange={(e) => {
                              setFilters((prevFilters) => ({
                                ...prevFilters,
                                [array.changeValue]: e.target.value,
                              }))
                            }}
                            className="w-full rounded-md p-2 border-2 border-gray-300"
                          />
                          {array.showSpanElement && (
                            <>
                              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                            </>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                  {Array.isArray(listNhanSu) && listNhanSu.length > 0 ? (
                    listNhanSu.map((e, i) => {
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
                            {e.TTKL_NS_Nam}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[100px] text-center">
                            {e.TTKL_NS_HocKy}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[200px] text-center">
                            {e.TTKL_NS_CoSo}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[300px] text-center">
                            {e.TTKL_NS_MaNS}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[400px]">
                            {e.TTKL_NS_HoDem}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[500px]">
                            {e.TTKL_NS_Ten}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 relative lg:sticky lg:left-[550px] text-center">
                            {e.TTKL_NS_TrangThai}
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                            <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                            <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 ">
                            {e.TTKL_NS_TrangThai_MoTa}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_NS_ChucVu}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2">
                            {e.TTKL_NS_ChuyenNganh}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {dayjs(e.TTKL_NS_NgaySinh).format('DD/MM/YYYY')}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_NS_GioiTinh}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 max-w-[250px]">
                            {e.TTKL_NS_DiaChi}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2">
                            {e.TTKL_NS_SoDienThoai}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2">
                            {e.TTKL_NS_Email}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2">
                            {e.TTKL_NS_MaSoThue}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2">
                            {e.TTKL_NS_LoaiGV}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2">
                            {e.TTKL_NS_LoaiGV2}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2">
                            {e.TTKL_NS_DonViQLNS}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2">
                            {e.TTKL_NS_KhoaChuyenMon}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2">
                            {e.TTKL_NS_SoCMT}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2">
                            {dayjs(e.TTKL_NS_NgayCap).format('DD/MM/YYYY')}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2">
                            {e.TTKL_NS_NoiCap}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2">
                            {e.TTKL_NS_SoTaiKhoan}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2">
                            {e.TTKL_NS_TenNganHang}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2">
                            {e.TTKL_NS_TrinhDoGV_TrinhDo}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2">
                            {e.TTKL_NS_TrinhDoGV_TrinhDo_DoiTuong}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_NS_TrinhDoGV_TrinhDo_HeSo}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_NS_KLGT_QLDDT_TrongGioHC_CTQL_KLGT}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_NS_KLGT_QLDDT_TrongGioHC_CTD_KLGT}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_NS_KLGT_QLDDT_TrongGioHC_CTDT_KLGT}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_NS_KLGT_QLDDT_TrongGioHC_CTDT_KLGT}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_NS_KLGT_QLDDT_NgoaiGioHC_CTD_KLGT}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_NS_KLGT_QLDDT_NgoaiGioHC_CTDT_KLGT}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_NS_KLGT_HTCMNVBDGV_KLGT}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_NS_KLGT_HTCMNVBDGV_KLGT}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_NS_KLGT_NCD_KLGT}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_NS_KLGT_NCD_KLGT}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_NS_KLGT_CTK_KLGT}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_NS_KLGT_TongKLGT}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_NS_KLGT_NCKH_KLGT}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_NS_TongKLThucHien}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2 text-center">
                            {e.TTKL_NS_TongKLPTH}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2">
                            {e.TTKL_NS_TenFile}
                          </td>
                          <td className="text-xs bg-white border border-gray-300 p-2">
                            {e.TTKL_NS_TenFile}
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

import { useEffect, useState } from 'react'
import { dayjs } from '@/Services/Utils/dayjs'
import {
  getAllHocKy,
  getAllNamHoc,
  getAllNhanSu,
} from '@/Apis/ApiGiangVien/CongTacGiangVien/apiCTGVTraCuu.js'
import Swal from 'sweetalert2'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV'
// import { retries } from '@/Services/Utils/requestUtils'
import NhanSuViewPagination from './NhanSuViewPagination'
import { CTGV_QUERY_KEY } from '@/Services/QueryStores/QueryKeyStores/CongTacGiangVien.querykey'
import { useQuery } from '@tanstack/react-query'
export default function NhanSu() {
  const home = {
    path: '/cong-tac-giang-vien',
    title: 'Công tác giảng viên',
  }
  const breadcrumbs = [
    {
      path: '/cong-tac-giang-vien/tra-cuu',
      title: 'Tra cứu',
    },
    {
      path: '/cong-tac-giang-vien/tra-cuu/nhan-su',
      title: 'Nhân sự',
    },
  ]
  const [currentNam, setCurrentNam] = useState('')
  const [currentHocKy, setCurrentHocKy] = useState('')
  const [totalPage, setTotalPage] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const dataGV = DataCanBoGV()
  const [listItemsPerPage] = useState([
    {
      label: 5,
      value: 5,
    },
    {
      label: 10,
      value: 10,
    },
    {
      label: 15,
      value: 15,
    },
    {
      label: 20,
      value: 20,
    },
    {
      label: 30,
      value: 30,
    },
    {
      label: 40,
      value: 40,
    },
    {
      label: 50,
      value: 50,
    },
  ])
  const [itemsPerPage, setItemsPerPage] = useState(listItemsPerPage[1].value)
  var reload = 0
  console.log('totalPage', totalPage)
  console.log('currentPage', currentPage)

  //query get nam hoc
  const {
    data: listNam,
    // isLoading: isLoading,
  } = useQuery({
    queryKey: ['TTKL-NS-GetYears'],
    queryFn: async () => {
      const { data } = await getAllNamHoc()

      if (data?.body) {
        return [
          {
            label: 'Tất cả',
            value: '',
          },
          ...data.body.map((e) => {
            return {
              label: e.TTKL_QLD_Nam,
              value: e.TTKL_QLD_Nam,
            }
          }),
        ]
      }

      throw new Error('Không có dữ liệu')
    },
    retry: 3,
    onError: (error) => {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Có lỗi xảy ra, vui lòng thử lại sau',
      })
    },
  })
  //query get hoc ky
  const {
    data: listHocKy,
    // isLoading: isLoading,
  } = useQuery({
    queryKey: ['TTKL-NS-GetSemester'],
    queryFn: async () => {
      const { data } = await getAllHocKy()

      if (data?.body) {
        return [
          {
            label: 'Tất cả',
            value: '',
          },
          ...data.body.map((e) => {
            return {
              label: e.TTKL_QLD_HocKy,
              value: e.TTKL_QLD_HocKy,
            }
          }),
        ]
      }

      throw new Error('Không có dữ liệu')
    },
    retry: 3,
    onError: (error) => {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Có lỗi xảy ra, vui lòng thử lại sau',
      })
    },
  })

  const [filters, setFilters] = useState({
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
  //query get nhan su
  const {
    data: listNhanSu,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      CTGV_QUERY_KEY.SP_TTKL_NS_TheoDoi_Load_ByMaNhanSu_TongSoTrang_Graft,
      currentHocKy,
      currentNam,
      currentPage,
      itemsPerPage,
      dataGV.MaNhanSu,
      filters,
    ],
    queryFn: async () => {
      const params = {
        SoTrang: currentPage,
        SoBanGhiTrenTrang: itemsPerPage,
        TTKL_NS_Nam: currentNam,
        TTKL_NS_HocKy: currentHocKy,
        TTKL_NS_CoSo: filters.TTKL_NS_CoSo,
        TTKL_NS_MaNS:
          dataGV.MaNhanSu === '01015045'
            ? filters.TTKL_NS_MaNS
            : dataGV.MaNhanSu,
        TTKL_NS_HoDem: filters.TTKL_NS_HoDem,
        TTKL_NS_Ten: filters.TTKL_NS_Ten,
        TTKL_NS_TrangThai: filters.TTKL_NS_TrangThai,
        TTKL_NS_TrangThai_MoTa: filters.TTKL_NS_TrangThai_MoTa,
        TTKL_NS_ChucVu: filters.TTKL_NS_ChucVu,
        TTKL_NS_ChuyenNganh: filters.TTKL_NS_ChuyenNganh,
        TTKL_NS_NgaySinh: filters.TTKL_NS_NgaySinh.length
          ? dayjs(filters.TTKL_NS_NgaySinh).format('YYYY-MM-DD')
          : '',
        TTKL_NS_GioiTinh: filters.TTKL_NS_GioiTinh,
        TTKL_NS_DiaChi: filters.TTKL_NS_DiaChi,
        TTKL_NS_SoDienThoai: filters.TTKL_NS_SoDienThoai,
        TTKL_NS_Email: filters.TTKL_NS_Email,
        TTKL_NS_MaSoThue: filters.TTKL_NS_MaSoThue,
        TTKL_NS_LoaiGV: filters.TTKL_NS_LoaiGV,
        TTKL_NS_LoaiGV2: filters.TTKL_NS_LoaiGV2,
        TTKL_NS_DonViQLNS: filters.TTKL_NS_DonViQLNS,
        TTKL_NS_KhoaChuyenMon: filters.TTKL_NS_KhoaChuyenMon,
        TTKL_NS_SoCMT: filters.TTKL_NS_SoCMT,
        TTKL_NS_NgayCap: filters.TTKL_NS_NgayCap.length
          ? dayjs(filters.TTKL_NS_NgayCap).format('YYYY-MM-DD')
          : '',
        TTKL_NS_NoiCap: filters.TTKL_NS_NoiCap,
        TTKL_NS_SoTaiKhoan: filters.TTKL_NS_SoTaiKhoan,
        TTKL_NS_TenNganHang: filters.TTKL_NS_TenNganHang,
        TTKL_NS_TrinhDoGV_TrinhDo: filters.TTKL_NS_TrinhDoGV_TrinhDo,
        TTKL_NS_TrinhDoGV_TrinhDo_DoiTuong:
          filters.TTKL_NS_TrinhDoGV_TrinhDo_DoiTuong,
        TTKL_NS_TrinhDoGV_TrinhDo_HeSo: filters.TTKL_NS_TrinhDoGV_TrinhDo_HeSo,
        TTKL_NS_KLGT_QLDDT_TrongGioHC_CTQL_KLGT:
          filters.TTKL_NS_KLGT_QLDDT_TrongGioHC_CTQL_KLGT,
        TTKL_NS_KLGT_QLDDT_TrongGioHC_CTD_KLGT:
          filters.TTKL_NS_KLGT_QLDDT_TrongGioHC_CTD_KLGT,
        TTKL_NS_KLGT_QLDDT_TrongGioHC_CTDT_KLGT:
          filters.TTKL_NS_KLGT_QLDDT_TrongGioHC_CTDT_KLGT,
        TTKL_NS_KLGT_QLDDT_NgoaiGioHC_CTQL_KLGT:
          filters.TTKL_NS_KLGT_QLDDT_NgoaiGioHC_CTQL_KLGT,
        TTKL_NS_KLGT_QLDDT_NgoaiGioHC_CTD_KLGT:
          filters.TTKL_NS_KLGT_QLDDT_NgoaiGioHC_CTD_KLGT,
        TTKL_NS_KLGT_QLDDT_NgoaiGioHC_CTDT_KLGT:
          filters.TTKL_NS_KLGT_QLDDT_NgoaiGioHC_CTDT_KLGT,
        TTKL_NS_KLGT_HTCMNVBDGV_KLGT: filters.TTKL_NS_KLGT_HTCMNVBDGV_KLGT,
        TTKL_NS_KLGT_QLCSVC_KLGT: filters.TTKL_NS_KLGT_QLCSVC_KLGT,
        TTKL_NS_KLGT_NCD_KLGT: filters.TTKL_NS_KLGT_NCD_KLGT,
        TTKL_NS_KLGT_HCTCM_KLGT: filters.TTKL_NS_KLGT_HCTCM_KLGT,
        TTKL_NS_KLGT_CTK_KLGT: filters.TTKL_NS_KLGT_CTK_KLGT,
        TTKL_NS_KLGT_TongKLGT: filters.TTKL_NS_KLGT_TongKLGT,
        TTKL_NS_KLGT_NCKH_KLGT: filters.TTKL_NS_KLGT_NCKH_KLGT,
        TTKL_NS_TongKLThucHien: filters.TTKL_NS_TongKLThucHien,
        TTKL_NS_TongKLPTH: filters.TTKL_NS_TongKLPTH,
        TTKL_NS_TenFile: filters.TTKL_NS_TenFile,
        TTKL_NS_GhiChu: filters.TTKL_NS_GhiChu,
      }
      const res = await getAllNhanSu(params)

      if (!res?.data?.List_NS || res.data.List_NS.length === 0) {
        throw new Error('Không có dữ liệu')
      }
      setTotalPage(res?.data?.TotalPage)
      const dataReturn = Array.isArray(res.data.List_NS) ? res.data.List_NS : []
      return dataReturn
    },
    retry: 3,
    retryDelay: 1000,
    onError: (error) => {
      console.log('Đã gặp lỗi', error)
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Có lỗi xảy ra, vui lòng thử lại sau',
      })
    },
  })
  console.log('reload', reload)

  useEffect(() => {
    setCurrentPage(1)
  }, [currentHocKy, currentNam, itemsPerPage])

  return (
    <NhanSuViewPagination
      home={home}
      breadcrumbs={breadcrumbs}
      listNhanSu={listNhanSu}
      listNam={listNam}
      currentNam={currentNam}
      setCurrentNam={setCurrentNam}
      listHocKy={listHocKy}
      currentHocKy={currentHocKy}
      setCurrentHocKy={setCurrentHocKy}
      totalPage={totalPage}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      isLoading={isLoading}
      listItemsPerPage={listItemsPerPage}
      itemsPerPage={itemsPerPage}
      setItemsPerPage={setItemsPerPage}
      filters={filters}
      setFilters={setFilters}
      currentMaNhanSu={dataGV.MaNhanSu}
    />
  )
}

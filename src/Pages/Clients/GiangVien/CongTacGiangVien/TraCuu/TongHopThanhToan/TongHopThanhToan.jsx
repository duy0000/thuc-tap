import { useEffect, useMemo, useState } from 'react'
import TongHopThanhToanView from './TongHopThanhToanView'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV'
import {
  getAllHocKy,
  getAllNamHoc,
  getAllTongHopThanhToan,
} from '@/Apis/ApiGiangVien/CongTacGiangVien/apiCTGVTraCuu.js'
import { CTGV_QUERY_KEY } from '@/Services/QueryStores/QueryKeyStores/CongTacGiangVien.querykey'
import { useQueries } from '@tanstack/react-query'

export default function TongHopThanhToan() {
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
      path: '/cong-tac-giang-vien/tra-cuu/tong-hop-thanh-toan',
      title: 'Tổng hợp thanh toán',
    },
  ]

  const [totalPage, setTotalPage] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentNam, setCurrentNam] = useState('')
  const [currentHocKy, setCurrentHocKy] = useState('')
  const [selectedItem, setSelectedItem] = useState(-1)

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

  const [filters, setFilters] = useState({
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

  const [hocKyQuery, namHocQuery, tongHopThanhToanQuery] = useQueries({
    queries: [
      {
        queryKey: ['GET_HOC_KY'],
        queryFn: async () => {
          const response = await getAllHocKy()

          console.log('GET_NAM_HOC: ', response)
          if (response.data?.code === 200 && response.data?.body.length > 0) {
            return response.data.body.map((e) => {
              return {
                label: e.TTKL_QLD_HocKy,
                value: e.TTKL_QLD_HocKy,
              }
            })
          } else {
            return []
          }
        },
        retry: 3,
        retryDelay: 1000,
      },
      {
        queryKey: ['GET_NAM_HOC'],
        queryFn: async () => {
          const response = await getAllNamHoc()
          if (response.data?.code === 200 && response.data?.body.length > 0) {
            return response.data.body.map((e) => {
              return {
                label: e.TTKL_QLD_Nam,
                value: e.TTKL_QLD_Nam,
              }
            })
          } else {
            return []
          }
        },
        retry: 3,
        retryDelay: 1000,
      },
      {
        queryKey: [
          CTGV_QUERY_KEY.CTGV_TraCuu_TongHopThanhToan_TheoDoi,
          currentHocKy,
          currentNam,
          currentPage,
          itemsPerPage,
          filters,
          dataGV.MaNhanSu,
          dataGV.HT_GROUPUSER_ID,
        ],
        queryFn: async () => {
          const res = await getAllTongHopThanhToan({
            TTKL_THKL_Nam: currentNam,
            TTKL_THKL_HocKy: currentHocKy,
            TTKL_THKL_MaNS: dataGV.HT_GROUPUSER_ID?.includes('1')
              ? dataGV.MaNhanSu
              : dataGV.MaNhanSu,
            SoTrang: currentPage,
            SoBanGhiTrenTrang: itemsPerPage,
            TTKL_THKL_CoSo: filters.TTKL_THKL_CoSo,
            TTKL_THKL_HoDem: filters.TTKL_THKL_HoDem,
            TTKL_THKL_Ten: filters.TTKL_THKL_Ten,
            TTKL_THKL_DonViQLNS: filters.TTKL_THKL_DonViQLNS,
            TTKL_THKL_KhoaChuyenMon: filters.TTKL_THKL_KhoaChuyenMon,
            TTKL_THKL_TongKLThucHien: filters.TTKL_THKL_TongKLThucHien,
            TTKL_THKL_KLGT_QLDDT_Tong: filters.TTKL_THKL_KLGT_QLDDT_Tong,
            TTKL_THKL_KLGT_HTCMNVBDGV_Tong:
              filters.TTKL_THKL_KLGT_HTCMNVBDGV_Tong,
            TTKL_THKL_KLGT_NCKH_Tong: filters.TTKL_THKL_KLGT_NCKH_Tong,
            TTKL_THKL_KLGT_QLCSVC_Tong: filters.TTKL_THKL_KLGT_QLCSVC_Tong,
            TTKL_THKL_KLGT_NCD_Tong: filters.TTKL_THKL_KLGT_NCD_Tong,
            TTKL_THKL_KLGT_HCTCM_Tong: filters.TTKL_THKL_KLGT_HCTCM_Tong,
            TTKL_THKL_KLGT_CTK_Tong: filters.TTKL_THKL_KLGT_CTK_Tong,
            TTKL_THKL_KLGT_TongKLGT: filters.TTKL_THKL_KLGT_TongKLGT,
            TTKL_THKL_TongKLPTH: filters.TTKL_THKL_TongKLPTH,
            TTKL_THKL_TongKLGiangDay: filters.TTKL_THKL_TongKLGiangDay,
            TTKL_THKL_TongKLThua: filters.TTKL_THKL_TongKLThua,
            TTKL_THKL_TongKLThua_VuotGio: filters.TTKL_THKL_TongKLThua_VuotGio,
            TTKL_THKL_TongKLThua_VuotGio_SLHopDong:
              filters.TTKL_THKL_TongKLThua_VuotGio_SLHopDong,
            TTKL_THKL_TongKLThua_VuotGio_SLHopDong_GhiChu:
              filters.TTKL_THKL_TongKLThua_VuotGio_SLHopDong_GhiChu,
            TTKL_THKL_TongKLThua_HopDong: filters.TTKL_THKL_TongKLThua_HopDong,
            TTKL_THKL_TongKLThua_HopDong_SLHopDong:
              filters.TTKL_THKL_TongKLThua_HopDong_SLHopDong,
            TTKL_THKL_TongKLThua_HopDong_SLHopDong_GhiChu:
              filters.TTKL_THKL_TongKLThua_HopDong_SLHopDong_GhiChu,
            TTKL_THKL_TrangThai: filters.TTKL_THKL_TrangThai,
            TTKL_THKL_TrangThai_DaoTao: filters.TTKL_THKL_TrangThai_DaoTao,
            TTKL_THKL_TrangThai_DaoTao_MoTa:
              filters.TTKL_THKL_TrangThai_DaoTao_MoTa,
            TTKL_KLCCT_TongKhoiLuong: filters.TTKL_KLCCT_TongKhoiLuong,
            TTKL_KLB_TongKhoiLuongBu: filters.TTKL_KLB_TongKhoiLuongBu,
            TTKL_TKBLHPGV_GhiChu: filters.TTKL_TKBLHPGV_GhiChu,
          })

          if (res.data?.code === 200) {
            setTotalPage(res.data?.TotalPage)
          }
          return res.data
        },
        retry: 3,
        retryDelay: 1000,
      },
    ],
  })

  useEffect(() => {
    setCurrentPage(1)
  }, [currentHocKy, currentNam, itemsPerPage])

  const __dataTongHopThanhToan = useMemo(() => {
    return tongHopThanhToanQuery?.data?.TTKL_THTT_HocKy || []
  }, [tongHopThanhToanQuery?.data?.TTKL_THTT_HocKy])

  useEffect(() => {
    setSelectedItem(-1)
  }, [__dataTongHopThanhToan, currentHocKy, currentNam, itemsPerPage, filters])

  return (
    <TongHopThanhToanView
      home={home}
      breadcrumbs={breadcrumbs}
      listNam={namHocQuery.data}
      listHocKy={hocKyQuery.data}
      listTongHopThanhToan={__dataTongHopThanhToan}
      totalPage={totalPage}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      currentNam={currentNam}
      setCurrentNam={setCurrentNam}
      currentHocKy={currentHocKy}
      setCurrentHocKy={setCurrentHocKy}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      isLoading={tongHopThanhToanQuery.isLoading}
      listItemsPerPage={listItemsPerPage}
      itemsPerPage={itemsPerPage}
      setItemsPerPage={setItemsPerPage}
      filters={filters}
      setFilters={setFilters}
      currentMaNhanSu={dataGV.MaNhanSu}
    />
  )
}

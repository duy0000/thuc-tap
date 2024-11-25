import { useEffect, useMemo, useState } from 'react'
import TongHopKhoiLuongView from './TongHopKhoiLuongView'
import {
  getAllHocKy,
  getAllNamHoc,
  getAllTongHopKhoiLuong,
} from '@/Apis/ApiGiangVien/CongTacGiangVien/apiCTGVTraCuu.js'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV'
import { CTGV_QUERY_KEY } from '@/Services/QueryStores/QueryKeyStores/CongTacGiangVien.querykey'
import { useQueries } from '@tanstack/react-query'

export default function TongHopKhoiLuong() {
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
      path: '/cong-tac-giang-vien/tra-cuu/tong-hop-khoi-luong',
      title: 'Tổng hợp khối lượng',
    },
  ]

  const [currentNam, setCurrentNam] = useState('')
  const [currentHocKy, setCurrentHocKy] = useState('')
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

  const [filters, setFilters] = useState({
    TTKL_THKL_Nam: '',
    TTKL_THKL_HocKy: '',
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
    TTKL_THKL_TongKLThua_DuKien: '',
    TTKL_THKL_TongKLThua_VuotGio: '',
    TTKL_THKL_TongKLThua_VuotGio_SLHopDong: '',
    TTKL_THKL_TongKLThua_VuotGio_SLHopDong_GhiChu: '',
    TTKL_THKL_TongKLThua_HopDon: '',
    TTKL_THKL_TongKLThua_HopDong_SLHopDong: '',
    TTKL_THKL_TongKLThua_HopDong_SLHopDong_GhiChu: '',
    TTKL_THKL_GhiChu: '',
    TTKL_THKL_TrangThai: '',
    TTKL_THKL_TrangThai_MoTa: '',
    TTKL_THKL_TrangThai_DaoTao: '',
    TTKL_THKL_TrangThai_DaoTao_MoTa: '',
    TTKL_THKL_XacDinhKhoiLuong: '',
    TTKL_THKL_TongKLPTH_Tiet: '',
    TTKL_THKL_TongKLGiangDay_Gio: '',
    TTKL_KLCCT_TongKhoiLuong: '',
    TTKL_KLB_TongKhoiLuongBu: '',
  })
  const [hocKyQuery, namHocQuery, tongHopKhoiLuongQuery] = useQueries({
    queries: [
      {
        queryKey: ['GET_HOC_KY'],
        queryFn: async () => {
          const response = await getAllHocKy()

          let dataHocKyList = [
            {
              label: 'Tất cả',
              value: '',
            },
          ]
          if (response.data?.code === 200 && response.data?.body.length > 0) {
            response.data.body.map((e) => {
              return dataHocKyList.push({
                label: e.TTKL_QLD_HocKy,
                value: e.TTKL_QLD_HocKy,
              })
            })
            return dataHocKyList
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
          let dataNamHocList = [
            {
              label: 'Tất cả',
              value: '',
            },
          ]
          if (response.data?.code === 200 && response.data?.body.length > 0) {
            response.data.body.map((e) => {
              return dataNamHocList.push({
                label: e.TTKL_QLD_Nam,
                value: e.TTKL_QLD_Nam,
              })
            })
            return dataNamHocList
          } else {
            return []
          }
        },
        retry: 3,
        retryDelay: 1000,
      },
      {
        queryKey: [
          CTGV_QUERY_KEY.CTGV_TraCuu_TongHopKhoiLuong_TheoDoi,
          currentHocKy,
          currentNam,
          currentPage,
          itemsPerPage,
          filters,
          dataGV.MaNhanSu,
        ],
        queryFn: async () => {
          const res = await getAllTongHopKhoiLuong({
            TTKL_THKL_Nam: currentNam,
            TTKL_THKL_HocKy: currentHocKy,
            TTKL_THKL_MaNS: dataGV.HT_GROUPUSER_ID?.includes('1')
              ? filters.TTKL_NS_MaNS
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
            TTKL_THKL_TongKLThua_DuKien: filters.TTKL_THKL_TongKLThua_DuKien,
            TTKL_THKL_TongKLThua_VuotGio: filters.TTKL_THKL_TongKLThua_VuotGio,
            TTKL_THKL_TongKLThua_VuotGio_SLHopDong:
              filters.TTKL_THKL_TongKLThua_VuotGio_SLHopDong,
            TTKL_THKL_TongKLThua_VuotGio_SLHopDong_GhiChu:
              filters.TTKL_THKL_TongKLThua_VuotGio_SLHopDong_GhiChu,
            TTKL_THKL_TongKLThua_HopDon: filters.TTKL_THKL_TongKLThua_HopDon,
            TTKL_THKL_TongKLThua_HopDong_SLHopDong:
              filters.TTKL_THKL_TongKLThua_HopDong_SLHopDong,
            TTKL_THKL_TongKLThua_HopDong_SLHopDong_GhiChu:
              filters.TTKL_THKL_TongKLThua_HopDong_SLHopDong_GhiChu,
            TTKL_THKL_GhiChu: filters.TTKL_THKL_GhiChu,
            TTKL_THKL_TrangThai: filters.TTKL_THKL_TrangThai,
            TTKL_THKL_TrangThai_MoTa: filters.TTKL_THKL_TrangThai_MoTa,
            TTKL_THKL_TrangThai_DaoTao: filters.TTKL_THKL_TrangThai_DaoTao,
            TTKL_THKL_TrangThai_DaoTao_MoTa:
              filters.TTKL_THKL_TrangThai_DaoTao_MoTa,
            TTKL_THKL_XacDinhKhoiLuong: filters.TTKL_THKL_XacDinhKhoiLuong,
            TTKL_THKL_TongKLPTH_Tiet: filters.TTKL_THKL_TongKLPTH_Tiet,
            TTKL_THKL_TongKLGiangDay_Gio: filters.TTKL_THKL_TongKLGiangDay_Gio,
            TTKL_KLCCT_TongKhoiLuong: filters.TTKL_KLCCT_TongKhoiLuong,
            TTKL_KLB_TongKhoiLuongBu: filters.TTKL_KLB_TongKhoiLuongBu,
          })
          return res.data
        },
        retry: 3,
        retryDelay: 1000,
      },
    ],
  })

  const __dataTongHopKhoiLuong = useMemo(() => {
    return tongHopKhoiLuongQuery?.data?.List_THKL || []
  }, [tongHopKhoiLuongQuery?.data?.List_THKL])

  const totalPage = useMemo(() => {
    return tongHopKhoiLuongQuery?.data?.TotalPage || 1
  }, [tongHopKhoiLuongQuery])

  useEffect(() => {
    setCurrentPage(1)
  }, [currentHocKy, currentNam, itemsPerPage])

  return (
    <TongHopKhoiLuongView
      home={home}
      breadcrumbs={breadcrumbs}
      listTongHopKhoiLuong={__dataTongHopKhoiLuong}
      listNam={namHocQuery.data}
      listHocKy={hocKyQuery.data}
      currentNam={currentNam}
      setCurrentNam={setCurrentNam}
      currentHocKy={currentHocKy}
      setCurrentHocKy={setCurrentHocKy}
      totalPage={totalPage}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      isLoading={tongHopKhoiLuongQuery.isLoading}
      listItemsPerPage={listItemsPerPage}
      itemsPerPage={itemsPerPage}
      setItemsPerPage={setItemsPerPage}
      filters={filters}
      setFilters={setFilters}
    />
  )
}

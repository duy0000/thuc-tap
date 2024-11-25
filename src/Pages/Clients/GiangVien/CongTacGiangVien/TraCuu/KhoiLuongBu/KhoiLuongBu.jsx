import { useEffect, useMemo, useState } from 'react'
import KhoiLuongBuView from './KhoiLuongBuView'
import {
  getAllHocKy,
  getAllKhoiLuongBu,
  getAllNamHoc,
} from '@/Apis/ApiGiangVien/CongTacGiangVien/apiCTGVTraCuu.js'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV'
import { useQueries } from '@tanstack/react-query'
import { CTGV_QUERY_KEY } from '@/Services/QueryStores/QueryKeyStores/CongTacGiangVien.querykey'

export default function KhoiLuongBu() {
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
      path: '/cong-tac-giang-vien/tra-cuu/khoi-luong-bu',
      title: 'Khối lượng bù',
    },
  ]

  const [currentNam, setCurrentNam] = useState('')
  const [currentHocKy, setCurrentHocKy] = useState('')
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
  const [currentPage, setCurrentPage] = useState(1)

  const dataGV = DataCanBoGV()

  const [filters, setFilters] = useState({
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

  const [hocKyQuery, namHocQuery, khoiLuongBuQuery] = useQueries({
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
          CTGV_QUERY_KEY.CTGV_TraCuu_KhoiLuongCoiChamThi_TheoDoi,
          currentHocKy,
          currentNam,
          currentPage,
          itemsPerPage,
          filters,
          dataGV.MaNhanSu,
        ],
        queryFn: async () => {
          const res = await getAllKhoiLuongBu({
            TTKL_KLB_Nam: filters.TTKL_KLB_Nam || currentNam,
            TTKL_KLB_HocKy: filters.TTKL_KLB_HocKy || currentHocKy,
            TTKL_KLB_MaNS: dataGV.HT_GROUPUSER_ID?.includes('1')
              ? filters.TTKL_KLB_MaNS
              : dataGV.MaNhanSu,
            SoTrang: currentPage,
            SoBanGhiTrenTrang: itemsPerPage,
            TTKL_KLB_CoSo: filters.TTKL_KLB_CoSo,
            TTKL_KLB_HoDem: filters.TTKL_KLB_HoDem,
            TTKL_KLB_Ten: filters.TTKL_KLB_Ten,
            TTKL_KLB_DVQLNS: filters.TTKL_KLB_DVQLNS,
            TTKL_KLB_KhoaChuyenMon: filters.TTKL_KLB_KhoaChuyenMon,
            TTKL_KLB_KLBenNgoai: filters.TTKL_KLB_KLBenNgoai,
            TTKL_KLB_KLTrenPhanMem: filters.TTKL_KLB_KLTrenPhanMem,
            TTKL_KLB_KLKhac: filters.TTKL_KLB_KLKhac,
            TTKL_KLB_TongKhoiLuongBu_Tiet:
              filters.TTKL_KLB_TongKhoiLuongBu_Tiet,
            TTKL_KLB_TongKhoiLuongBu: filters.TTKL_KLB_TongKhoiLuongBu,
            TTKL_KLB_MoTaFile: filters.TTKL_KLB_MoTaFile,
            TTKL_KLB_TenFile: filters.TTKL_KLB_TenFile,
            TTKL_KLB_GhiChu: filters.TTKL_KLB_GhiChu,
            TTKL_KLB_TrangThai: filters.TTKL_KLB_TrangThai,
          })
          return res.data
        },
        retry: 3,
        retryDelay: 1000,
      },
    ],
  })

  const __dataKhoiLuongBu = useMemo(() => {
    return khoiLuongBuQuery?.data?.List_KLB || []
  }, [khoiLuongBuQuery?.data?.List_KLB])

  const totalPage = useMemo(() => {
    return khoiLuongBuQuery?.data?.TotalPage || 1
  }, [khoiLuongBuQuery])

  useEffect(() => {
    setCurrentPage(1)
  }, [currentHocKy, currentNam, itemsPerPage])

  return (
    <KhoiLuongBuView
      home={home}
      breadcrumbs={breadcrumbs}
      listNam={namHocQuery.data}
      listHocKy={hocKyQuery.data}
      listKhoiLuongBu={__dataKhoiLuongBu}
      currentNam={currentNam}
      setCurrentNam={setCurrentNam}
      currentHocKy={currentHocKy}
      setCurrentHocKy={setCurrentHocKy}
      totalPage={totalPage}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      isLoading={khoiLuongBuQuery.isLoading}
      listItemsPerPage={listItemsPerPage}
      itemsPerPage={itemsPerPage}
      setItemsPerPage={setItemsPerPage}
      filters={filters}
      setFilters={setFilters}
    />
  )
}

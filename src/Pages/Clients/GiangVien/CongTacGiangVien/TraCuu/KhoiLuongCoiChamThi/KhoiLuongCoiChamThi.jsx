import { useEffect, useMemo, useState } from 'react'
import {
  getAllCoiChamThi,
  getAllHocKy,
  getAllNamHoc,
} from '@/Apis/ApiGiangVien/CongTacGiangVien/apiCTGVTraCuu.js'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV'
import KhoiLuongCoiChamThiView from './KhoiLuongCoiChamThiView'
import { useQueries } from '@tanstack/react-query'
import { CTGV_QUERY_KEY } from '@/Services/QueryStores/QueryKeyStores/CongTacGiangVien.querykey'

export default function KhoiLuongCoiChamThi() {
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
      path: '/cong-tac-giang-vien/tra-cuu/coi-cham-thi',
      title: 'Coi chấm thi',
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
  const [itemsPerPage, setItemsPerPage] = useState(listItemsPerPage[0].value)

  const [filters, setFilters] = useState({
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

  const [hocKyQuery, namHocQuery, coiChamThiQuery] = useQueries({
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
          const res = await getAllCoiChamThi({
            TTKL_KLCCT_Nam: currentNam,
            TTKL_KLCCT_HocKy: currentHocKy,
            TTKL_KLCCT_MaNS: dataGV.HT_GROUPUSER_ID.includes('1')
              ? filters.TTKL_KLCCT_MaNS
              : dataGV.MaNhanSu,
            SoTrang: currentPage,
            SoBanGhiTrenTrang: itemsPerPage,
            TTKL_KLCCT_CoSo: filters.TTKL_KLCCT_CoSo,
            TTKL_KLCCT_HoDem: filters.TTKL_KLCCT_HoDem,
            TTKL_KLCCT_Ten: filters.TTKL_KLCCT_Ten,
            TTKL_KLCCT_DVQLNS: filters.TTKL_KLCCT_DVQLNS,
            TTKL_KLCCT_KhoaChuyenMon: filters.TTKL_KLCCT_KhoaChuyenMon,
            TTKL_KLCCT_KLCoiThi: filters.TTKL_KLCCT_KLCoiThi,
            TTKL_KLCCT_KLChamThi: filters.TTKL_KLCCT_KLChamThi,
            TTKL_KLCCT_KLNCKH: filters.TTKL_KLCCT_KLNCKH,
            TTKL_KLCCT_SoTiet: filters.TTKL_KLCCT_SoTiet,
            TTKL_KLCCT_GhiChuKLK: filters.TTKL_KLCCT_GhiChuKLK,
            TTKL_KLCCT_TongKhoiLuong_Tiet:
              filters.TTKL_KLCCT_TongKhoiLuong_Tiet,
            TTKL_KLCCT_TongKhoiLuong: filters.TTKL_KLCCT_TongKhoiLuong,
            TTKL_KLCCT_MoTaFile: filters.TTKL_KLCCT_MoTaFile,
            TTKL_KLCCT_TenFile: filters.TTKL_KLCCT_TenFile,
            TTKL_KLCCT_GhiChu: filters.TTKL_KLCCT_GhiChu,
            TTKL_KLCCT_TrangThai: filters.TTKL_KLCCT_TrangThai,
          })
          return res.data
        },
        retry: 3,
        retryDelay: 1000,
      },
    ],
  })

  const __dataCoiChamThi = useMemo(() => {
    return coiChamThiQuery?.data?.List_KLCCT || []
  }, [coiChamThiQuery?.data?.List_KLCCT])

  const totalPage = useMemo(() => {
    return coiChamThiQuery?.data?.TotalPage || 1
  }, [coiChamThiQuery])

  useEffect(() => {
    setCurrentPage(1)
  }, [currentHocKy, currentNam, itemsPerPage])

  return (
    <KhoiLuongCoiChamThiView
      home={home}
      breadcrumbs={breadcrumbs}
      listCoiChamThi={__dataCoiChamThi}
      listNam={namHocQuery.data}
      currentNam={currentNam}
      setCurrentNam={setCurrentNam}
      listHocKy={hocKyQuery.data}
      currentHocKy={currentHocKy}
      setCurrentHocKy={setCurrentHocKy}
      totalPage={totalPage}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      isLoading={coiChamThiQuery.isLoading}
      listItemsPerPage={listItemsPerPage}
      itemsPerPage={itemsPerPage}
      setItemsPerPage={setItemsPerPage}
      filters={filters}
      setFilters={setFilters}
    />
  )
}

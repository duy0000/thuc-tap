import { useEffect, useMemo, useState } from 'react'
import {
  getAllHocKy,
  getAllLopHocPhanGiangVien,
  getAllNamHoc,
} from '@/Apis/ApiGiangVien/CongTacGiangVien/apiCTGVTraCuu.js'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV'
import LopHocPhanGiangVienView from './LopHocPhanGiangVienView'
import { useQueries } from '@tanstack/react-query'
import { CTGV_QUERY_KEY } from '@/Services/QueryStores/QueryKeyStores/CongTacGiangVien.querykey'

export default function LopHocPhanGiangVien() {
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
      path: '/cong-tac-giang-vien/tra-cuu/lop-hoc-phan-giang-vien',
      title: 'Lớp học phần giảng viên',
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
    TTKL_TKBLHPGV_XacDinhLoaiKhoiLuong_XacDinh_TrangThai: '',
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

  const [hocKyQuery, namHocQuery, lopHocPhanGiangVienQuery] = useQueries({
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
          CTGV_QUERY_KEY.CTGV_TraCuu_LHP_GV_TheoDoi,
          currentHocKy,
          currentNam,
          currentPage,
          itemsPerPage,
          filters,
          dataGV.MaNhanSu,
        ],
        queryFn: async () => {
          const res = await getAllLopHocPhanGiangVien({
            SoTrang: currentPage,
            SoBanGhiTrenTrang: itemsPerPage,
            TTKL_TKBLHPGV_TenCoSo: filters.TTKL_TKBLHPGV_TenCoSo,
            TTKL_TKBLHPGV_MaLopHocPhan: filters.TTKL_TKBLHPGV_MaLopHocPhan,
            TTKL_TKBLHPGV_TenMonHoc: filters.TTKL_TKBLHPGV_TenMonHoc,
            TTKL_TKBLHPGV_TenLopHoc: filters.TTKL_TKBLHPGV_TenLopHoc,
            TTKL_TKBLHPGV_DiaDiemHocTap: filters.TTKL_TKBLHPGV_DiaDiemHocTap,
            TTKL_TKBLHPGV_XacDinhKhoiLuong:
              filters.TTKL_TKBLHPGV_XacDinhKhoiLuong,
            TTKL_TKBLHPGV_XacDinhLoaiKhoiLuong:
              filters.TTKL_TKBLHPGV_XacDinhLoaiKhoiLuong,
            TTKL_TKBLHPGV_TrangThai: filters.TTKL_TKBLHPGV_TrangThai,
            TTKL_TKBLHPGV_HopDong_So: filters.TTKL_TKBLHPGV_HopDong_So,
            TTKL_TKBLHPGV_XacDinhLoaiKhoiLuong_GhiChu:
              filters.TTKL_TKBLHPGV_XacDinhLoaiKhoiLuong_GhiChu,
            TTKL_TKBLHPGV_XacDinhLoaiKhoiLuong_XacDinh_TrangThai:
              filters.TTKL_TKBLHPGV_XacDinhLoaiKhoiLuong_XacDinh_TrangThai,
            TTKL_TKBLHPGV_Nam: currentNam,
            TTKL_TKBLHPGV_TenDot: currentHocKy,
            TTKL_TKBLHPGV_TenKhoaChuQuanHP:
              filters.TTKL_TKBLHPGV_TenKhoaChuQuanHP,
            TTKL_TKBLHPGV_IDMonHocNgoaiChuongTrinh:
              filters.TTKL_TKBLHPGV_IDMonHocNgoaiChuongTrinh,
            TTKL_TKBLHPGV_IsXepLich: filters.TTKL_TKBLHPGV_IsXepLich,
            TTKL_TKBLHPGV_TenKhoaHoc: filters.TTKL_TKBLHPGV_TenKhoaHoc,
            TTKL_TKBLHPGV_TenNganh: filters.TTKL_TKBLHPGV_TenNganh,
            TTKL_TKBLHPGV_TenHeDaoTao: filters.TTKL_TKBLHPGV_TenHeDaoTao,
            TTKL_TKBLHPGV_TenLoaiHinhDT: filters.TTKL_TKBLHPGV_TenLoaiHinhDT,
            TTKL_TKBLHPGV_SoTinChi: filters.TTKL_TKBLHPGV_SoTinChi,
            TTKL_TKBLHPGV_SiSoDangKy: filters.TTKL_TKBLHPGV_SiSoDangKy,
            TTKL_TKBLHPGV_SoTietLyThuyet: filters.TTKL_TKBLHPGV_SoTietLyThuyet,
            TTKL_TKBLHPGV_SoTietThucHanh: filters.TTKL_TKBLHPGV_SoTietThucHanh,
            TTKL_TKBLHPGV_SLNhom: filters.TTKL_TKBLHPGV_SLNhom,
            TTKL_TKBLHPGV_SiSoNhom: filters.TTKL_TKBLHPGV_SiSoNhom,
            TTKL_TKBLHPGV_XepLichGiangDayCapGiangVien:
              filters.TTKL_TKBLHPGV_XepLichGiangDayCapGiangVien,
            TTKL_TKBLHPGV_SoTiet_ThucTeEDU:
              filters.TTKL_TKBLHPGV_SoTiet_ThucTeEDU,
            TTKL_TKBLHPGV_IsLyThuyet: filters.TTKL_TKBLHPGV_IsLyThuyet,
            TTKL_TKBLHPGV_LoaiLopHocPhan: filters.TTKL_TKBLHPGV_LoaiLopHocPhan,
            TTKL_TKBLHPGV_HeSo_DoiTuongDaoTao:
              filters.TTKL_TKBLHPGV_HeSo_DoiTuongDaoTao,
            TTKL_TKBLHPGV_HeSo_GioHoc: filters.TTKL_TKBLHPGV_HeSo_GioHoc,
            TTKL_TKBLHPGV_HeSo_QuyMoLop: filters.TTKL_TKBLHPGV_HeSo_QuyMoLop,
            TTKL_TKBLHPGV_CoSo_GiangVien1:
              filters.TTKL_TKBLHPGV_CoSo_GiangVien1,
            TTKL_TKBLHPGV_KhoaChuQuanGiangVien1:
              filters.TTKL_TKBLHPGV_KhoaChuQuanGiangVien1,
            TTKL_TKBLHPGV_MaNS: dataGV.HT_GROUPUSER_ID?.includes('1')
              ? filters.TTKL_TKBLHPGV_MaNS
              : dataGV.MaNhanSu,
            TTKL_TKBLHPGV_TenGiangVien1: filters.TTKL_TKBLHPGV_TenGiangVien1,
            TTKL_TKBLHPGV_TrinhDoGiangVien1:
              filters.TTKL_TKBLHPGV_TrinhDoGiangVien1,
            TTKL_TKBLHPGV_TrinhDoGV_TrinhDo_DoiTuong1:
              filters.TTKL_TKBLHPGV_TrinhDoGV_TrinhDo_DoiTuong1,
            TTKL_TKBLHPGV_TrinhDoGV_TrinhDo_HeSo1:
              filters.TTKL_TKBLHPGV_TrinhDoGV_TrinhDo_HeSo1,
            TTKL_TKBLHPGV_HeSo_DiaDiemKhacCoSo_GV1:
              filters.TTKL_TKBLHPGV_HeSo_DiaDiemKhacCoSo_GV1,
            TTKL_TKBLHPGV_HeSo_KhoangCachDiaDiem_GV1:
              filters.TTKL_TKBLHPGV_HeSo_KhoangCachDiaDiem_GV1,
            TTKL_TKBLHPGV_SoTietThucHien_GV1:
              filters.TTKL_TKBLHPGV_SoTietThucHien_GV1,
            TTKL_TKBLHPGV_QuyDoiSoTietThucHien_GV1:
              filters.TTKL_TKBLHPGV_QuyDoiSoTietThucHien_GV1,
            TTKL_TKBLHPGV_GhiChu: filters.TTKL_TKBLHPGV_GhiChu,
            TTKL_TKBLHPGV_GhiChu2: filters.TTKL_TKBLHPGV_GhiChu2,
          })
          return res.data
        },
        retry: 3,
        retryDelay: 1000,
      },
    ],
  })

  const __dataLopHocPhanGiangVien = useMemo(() => {
    return lopHocPhanGiangVienQuery?.data?.List_TKBLHPGV_TheoDoi || []
  }, [lopHocPhanGiangVienQuery?.data?.List_TKBLHPGV_TheoDoi])

  const totalPage = useMemo(() => {
    return lopHocPhanGiangVienQuery?.data?.TotalPage || 1
  }, [lopHocPhanGiangVienQuery])

  useEffect(() => {
    setCurrentPage(1)
  }, [currentHocKy, currentNam, itemsPerPage])

  return (
    <LopHocPhanGiangVienView
      home={home}
      breadcrumbs={breadcrumbs}
      listNam={namHocQuery.data}
      listHocKy={hocKyQuery.data}
      listLopHocPhan={__dataLopHocPhanGiangVien}
      currentNam={currentNam}
      setCurrentNam={setCurrentNam}
      currentHocKy={currentHocKy}
      setCurrentHocKy={setCurrentHocKy}
      totalPage={totalPage}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      isLoading={lopHocPhanGiangVienQuery.isLoading}
      listItemsPerPage={listItemsPerPage}
      itemsPerPage={itemsPerPage}
      setItemsPerPage={setItemsPerPage}
      filters={filters}
      setFilters={setFilters}
      currentMaNhanSu={dataGV.MaNhanSu}
    />
  )
}

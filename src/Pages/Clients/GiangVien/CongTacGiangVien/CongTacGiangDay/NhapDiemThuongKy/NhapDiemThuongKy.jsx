import React, { useMemo, useState } from 'react'
import { useQueries } from '@tanstack/react-query'
import NhapDiemThuongKyView from './NhapDiemThuongKyView'
import { filterNhapDiemThuongKy } from './constant'
import {
  getAllDanhSachLopHocPhan,
  getAllHocKy,
  getAllNamHoc,
  getAllNhapDiemThuongKy,
} from '@/Apis/ApiGiangVien/CongTacGiangVien/apiCTGVCongTacGiangDay'
import { CTGV_QUERY_KEY } from '@/Services/QueryStores/QueryKeyStores/CongTacGiangVien.querykey'
export default function NhapDiemThuongKy() {
  const [currentHocKy, setCurrentHocKy] = useState('')
  const [currentMaGiangVien, setCurrentMaGiangVien] = useState('')
  const [currentCoSo, setCurrentCoSo] = useState('')
  const [currentMonHoc, setCurrentMonHoc] = useState('')
  const [currentLopHoc, setCurrentLopHoc] = useState('')
  const [currentMaLopHocPhan, setCurrentMaLopHocPhan] = useState('')

  const [currentTrangThaiSinhVien, setCurrentTrangThaiSinhVien] = useState('')
  const [filter, setFilter] = useState({
    ...filterNhapDiemThuongKy,
  })
  const [openDialog, setOpenDialog] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(false)

  const [dataSubmit, setDataSubmit] = useState({
    MaGiangVien: '01011013',
    HocKy: '1 (2022 - 2023)',
    CoSo: 'Hà Nội',
    MonHoc: 'Triết học Mac - Lênin',
    LopHoc: 'DH TCNH 16A5HN',
    MaLopHocPhan: '010100153528',
    TrangThaiSinhVien: 'Đang học',
  })
  const home = {
    path: '/cong-tac-giang-vien',
    title: 'Công tác giảng viên',
  }
  const breadcrumbs = [
    {
      path: '/cong-tac-giang-vien/cong-tac-giang-day',
      title: 'Công tác giảng dạy',
    },
    {
      path: '/cong-tac-giang-vien/cong-tac-giang-day/nhap-diem-thuong-ky',
      title: 'Nhập điểm thường kỳ',
    },
  ]
  const [hocKyQuery, danhSachLopHocPhanQuery, nhapDiemThuongKyQuery] =
    useQueries({
      queries: [
        {
          queryKey: ['NDTK_GET_HOC_KY'],
          queryFn: async () => {
            try {
              const { data } = await getAllHocKy()
              if (data?.code === 200 && data?.body.length > 0) {
                setCurrentHocKy(data.body[0].TTKL_QLD_HocKy)
                return data.body.map((e) => {
                  return {
                    label: e.TTKL_QLD_HocKy,
                    value: e.TTKL_QLD_HocKy,
                  }
                })
              } else {
                return []
              }
            } catch (error) {
              console.error('Error fetching data:', error)
              throw error
            }
          },
          retry: 3,
          retryDelay: 1000,
        },
        {
          queryKey: ['NDTK_DANH_SACH_LOP_HOC_PHAN'],
          queryFn: async () => {
            try {
              const res = await getAllDanhSachLopHocPhan({
                MaGiangVien: '01011013',
                HocKy: '2 (2019 - 2020)',
                CoSo: 'Hà Nội',
                // MonHoc: '',
                // LopHoc: '',
                // MaLopHocPhan: '',
              })
              if (res.data?.code === 200) {
                return res.data.body
              } else {
                return []
              }
            } catch (error) {
              console.error('Error fetching data:', error)
              throw error
            }
          },
          retry: 3,
          retryDelay: 1000,
        },
        {
          queryKey: [
            CTGV_QUERY_KEY.CTGV_CongTacGiangDay_NhapDiemThuongKy,
            dataSubmit,
          ],
          queryFn: async () => {
            try {
              const { data } = await getAllNhapDiemThuongKy({
                ...dataSubmit,
              })
              if (data?.code === 200) {
                return data.body
              } else {
                return []
              }
            } catch (error) {
              console.error('Error fetching data:', error)
              throw error
            }
          },
          retry: 3,
          retryDelay: 1000,
        },
      ],
    })
  const __dataNhapDiemThuongKy = useMemo(() => {
    if (!nhapDiemThuongKyQuery.data) return []
    return nhapDiemThuongKyQuery.data.filter((item) => {
      return Object.keys(filter).every((key) => {
        if (!filter[key]) return true
        return item[key]
          ?.toString()
          .toLowerCase()
          .includes(filter[key].toString().toLowerCase())
      })
    })
  }, [nhapDiemThuongKyQuery.data, filter])
  return (
    <NhapDiemThuongKyView
      home={home}
      breadcrumbs={breadcrumbs}
      isLoading={nhapDiemThuongKyQuery.isLoading}
      listHocKy={hocKyQuery.data}
      currentHocKy={currentHocKy}
      setCurrentHocKy={setCurrentHocKy}
      currentCoSo={currentCoSo}
      setCurrentCoSo={setCurrentCoSo}
      currentMonHoc={currentMonHoc}
      setCurrentMonHoc={setCurrentMonHoc}
      currentLopHoc={currentLopHoc}
      setCurrentLopHoc={setCurrentLopHoc}
      currentTrangThaiSinhVien={currentTrangThaiSinhVien}
      setCurrentTrangThaiSinhVien={setCurrentTrangThaiSinhVien}
      currentMaLopHocPhan={currentMaLopHocPhan}
      setCurrentMaLopHocPhan={setCurrentMaLopHocPhan}
      listDanhSachHocPhan={danhSachLopHocPhanQuery.data}
      listNhapDiemThuongKy={__dataNhapDiemThuongKy}
      filter={filter}
      setFilter={setFilter}
      openDialog={openDialog}
      setOpenDialog={setOpenDialog}
      openDropdown={openDropdown}
      setOpenDropdown={setOpenDropdown}
      dataSubmit={dataSubmit}
      setDataSubmit={setDataSubmit}
    />
  )
}

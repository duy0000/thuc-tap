import React, { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  getAllHocKy,
  getAllDiemDanhHangNgay,
  getALlDanhSachLichGV,
} from '@/Apis/ApiGiangVien/CongTacGiangVien/apiCTGVCongTacGiangDay.js'
import { filterDiemDanhHangNgay } from './constant'
import DiemDanhHangNgayView from './DiemDanhHangNgayView'
import { CTGV_QUERY_KEY } from '@/Services/QueryStores/QueryKeyStores/CongTacGiangVien.querykey'
export default function DiemDanhHangNgay() {
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
      path: '/cong-tac-giang-vien/cong-tac-giang-day/diem-danh-hang-ngay',
      title: 'Điểm danh hằng ngày',
    },
  ]

  const currentDate = new Date()
  const day = currentDate.getDate()
  const month = currentDate.getMonth() + 1
  const year = currentDate.getFullYear()
  const dateNow = `${day}/${month}/${year}`

  const [currentHocKy, setCurrentHocKy] = useState('')
  const [maLopHocPhan, setMaLopHocPhan] = useState('')
  const [ngayDiemDanh, setNgayDiemDanh] = useState(dateNow)
  const [openDialog, setOpenDialog] = useState(false)
  const [filter, setFilter] = useState({
    ...filterDiemDanhHangNgay,
  })
  const [dataSubmit, setDataSubmit] = useState({
    NgayDiemDanh: '2022-04-13',
    MaLopHocPhan: '010100043605',
  })
  const { data: dataHocKy, isSuccess: isHocKySuccess } = useQuery({
    queryKey: ['DDHN_GET_HOC_KY'],
    queryFn: async () => {
      const { data } = await getAllHocKy()
      setCurrentHocKy(data.body[1].TTKL_QLD_HocKy)
      if (data?.body) {
        return [
          { label: 'Tất cả', value: '' },
          ...data.body.map((e) => {
            return {
              label: e.TTKL_QLD_HocKy,
              value: e.TTKL_QLD_HocKy,
            }
          }),
        ]
      }

      return []
    },
    retry: 3,
    retryDelay: 1000,
  })
  const { data: listDanhSachLichGV } = useQuery({
    queryKey: ['DDHN_DANH_SACH_LICH', currentHocKy],
    queryFn: async () => {
      try {
        const response = await getALlDanhSachLichGV({
          MaGiangVien: '01011013',
          HocKy: currentHocKy,
          LoaiLich: '0',
        })
        if (response.data.code === 200 && response.data.body.length > 0) {
          return response.data.body
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
  })
  // const { data: listDanhSachLopHocPhan } = useQuery({
  //   queryKey: ['DHHN_DANH_SACH_LOP_HOC_PHAN', currentHocKy, currentDate],
  //   // queryFn: async () => {
  //   //   try {
  //   //     const response = await getALlDanhSachLichGV({
  //   //       MaGiangVien: '01011013',
  //   //       HocKy: currentHocKy,
  //   //       LoaiLich: '0',
  //   //     })
  //   //     if (response.data.code === 200 && response.data.body.length > 0) {
  //   //       return response.data.body
  //   //     } else {
  //   //       return []
  //   //     }
  //   //   } catch (error) {
  //   //     console.error('Error fetching data:', error)
  //   //     throw error
  //   //   }
  //   // },
  //   retry: 3,
  //   retryDelay: 1000,
  //   enabled: isHocKySuccess && !!currentDate,
  // })
  const { data: listDiemDanhHangNgay, isLoading } = useQuery({
    queryKey: [
      CTGV_QUERY_KEY.CTGV_CongTacGiangDay_DiemDanhHangNgay,
      dataSubmit,
    ],
    queryFn: async () => {
      try {
        const response = await getAllDiemDanhHangNgay({
          ...dataSubmit,
          HocKy: currentHocKy,
        })
        if (response.data.code === 200) {
          return response.data.body
        } else {
          return []
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        throw error
      }
    },
    enabled: isHocKySuccess,
    retry: 3,
    retryDelay: 1000,
  })
  const __dataDiemDanhHangNgay = useMemo(() => {
    if (!listDiemDanhHangNgay) return []
    return listDiemDanhHangNgay.filter((item) => {
      return Object.keys(filter).every((key) => {
        if (!filter[key]) return true
        return item[key]
          ?.toString()
          .toLowerCase()
          .includes(filter[key].toString().toLowerCase())
      })
    })
  }, [listDiemDanhHangNgay, filter])

  return (
    <DiemDanhHangNgayView
      home={home}
      breadcrumbs={breadcrumbs}
      isLoading={isLoading}
      currentHocKy={currentHocKy}
      setCurrentHocKy={setCurrentHocKy}
      listHocKy={dataHocKy}
      listDiemDanhHangNgay={__dataDiemDanhHangNgay}
      ngayDiemDanh={ngayDiemDanh}
      setNgayDiemDanh={setNgayDiemDanh}
      listDanhSachLichGV={listDanhSachLichGV}
      filter={filter}
      setFilter={setFilter}
      openDialog={openDialog}
      setOpenDialog={setOpenDialog}
      setDataSubmit={setDataSubmit}
    />
  )
}

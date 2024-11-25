import { useState } from 'react'
import LichTheoTienDoView from './LichTheoTienDoView'
import {
  getAllHocKy,
  getSP_CVGV_TCCTGD_LichDayCoiThi_Load,
} from '@/Apis/ApiGiangVien/CongTacGiangVien/apiCongTacGiangDay'
import Swal from 'sweetalert2'
import { home, breadcrumbs, DanhSachLoaiLich } from './constants'
import { useQuery } from '@tanstack/react-query'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV'
import { CTGV_QUERY_KEY } from '@/Services/QueryStores/QueryKeyStores/CongTacGiangVien.querykey'
export default function LichTheoTienDo() {
  const dataGV = DataCanBoGV()
  const [currentLoaiLich, setCurrentLoaiLich] = useState(0)
  const [currentHocKy, setCurrentHocKy] = useState('')


  const { data: listHocKy } = useQuery({
    queryKey: [CTGV_QUERY_KEY.CTGD_lich_theo_tien_do_GetSemester],
    queryFn: async () => {
      const { data } = await getAllHocKy()
      setCurrentHocKy(data.body[0].TTKL_QLD_HocKy)
      if (data?.body) {
        return [
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
    onError: (error) => {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Có lỗi xảy ra, vui lòng thử lại sau',
      })
    },
  })

  const { data: listLichTheoTienDo, isLoading } = useQuery({
    queryKey: [
      CTGV_QUERY_KEY.SP_CVGV_TCCTGD_LichDayCoiThi_Load,
      currentHocKy,
      currentLoaiLich,
      dataGV.MaNhanSu,
    ],
    queryFn: async () => {
      const params = {
        HocKy: currentHocKy,
        LoaiLich: currentLoaiLich,
        MaGiangVien: dataGV.MaNhanSu,
      }
      const res = await getSP_CVGV_TCCTGD_LichDayCoiThi_Load(params)

      return res?.data?.body || []
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
  if (listLichTheoTienDo) {
    const datacheck = listLichTheoTienDo?.map((item) => {
      // Xóa các trường "HoTenGV3" và "HoTenGV4" khỏi mỗi phần tử
      delete item.HoTenGV3
      delete item.HoTenGV4

      // Trả về phần tử đã được xóa trường
      return item
    })
    console.log('listLichTheoTienDo', datacheck)
  }

  return (
    <LichTheoTienDoView
      home={home}
      breadcrumbs={breadcrumbs}
      setCurrentHocKy={setCurrentHocKy}
      setCurrentLoaiLich={setCurrentLoaiLich}
      DanhSachLoaiLich={DanhSachLoaiLich}
      listHocKy={listHocKy}
      currentHocKy={currentHocKy}
      currentLoaiLich={currentLoaiLich}
      listLichTheoTienDo={listLichTheoTienDo}
      isLoading={isLoading}
      dataGV={dataGV}
      // setFilterValue={setFilterValue}
    />
  )
}

import { useMemo, useState } from 'react'
import HomeTTHCGVView from './HomeTTHCGVView'
import { getThuTucHanhChinhByKeyWords } from '@/Apis/ApiGiangVien/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien'
import { TTHCGV_QUERY_KEY } from '@/Services/QueryStores/QueryKeyStores/TTHCGV.querykey'
import { useQuery } from '@tanstack/react-query'

const initialDataFilter = {
  PhongBan: '',
  MC_TTHC_GV_DieuKienLoc: '',
  TuKhoaTimKiem: '',
  MC_TTHC_GV_MaThuTuc: '',
  MC_TTHC_GV_TenThuTuc: '',
  MC_TTHC_GV_NoiTiepNhan: '',
  MC_TTHC_GV_LinhVuc: '',
  MC_TTHC_GV_Active: '',
}

function HomeTTHCGV() {
  const home = {
    path: '/tthc-giang-vien',
    title: 'TTHC Giảng Viên',
  }

  const [dataFilter, setDataFilter] = useState(initialDataFilter)
  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const { data: dataThuTucList, isLoading: isLoadingThuTucList } = useQuery({
    queryKey: [
      TTHCGV_QUERY_KEY.SP_MC_TTHC_GV_TimKiemThuTuc,
      dataFilter.PhongBan,
      dataFilter.MC_TTHC_GV_DieuKienLoc,
      dataFilter.TuKhoaTimKiem,
      dataFilter.MC_TTHC_GV_MaThuTuc,
      dataFilter.MC_TTHC_GV_TenThuTuc,
      dataFilter.MC_TTHC_GV_NoiTiepNhan,
      dataFilter.MC_TTHC_GV_LinhVuc,
      dataFilter.MC_TTHC_GV_Active,
    ],
    queryFn: async () => {
      const res = await getThuTucHanhChinhByKeyWords({
        PhongBan: '',
        MC_TTHC_GV_DieuKienLoc: dataFilter.MC_TTHC_GV_DieuKienLoc || '',
        TuKhoaTimKiem: dataFilter.TuKhoaTimKiem || '',
        MC_TTHC_GV_MaThuTuc: dataFilter.MC_TTHC_GV_MaThuTuc || '',
        MC_TTHC_GV_TenThuTuc: dataFilter.MC_TTHC_GV_TenThuTuc || '',
        MC_TTHC_GV_NoiTiepNhan: dataFilter.MC_TTHC_GV_NoiTiepNhan || '',
        MC_TTHC_GV_LinhVuc: dataFilter.MC_TTHC_GV_LinhVuc || '',
        MC_TTHC_GV_Active: dataFilter.MC_TTHC_GV_Active || '',
      })
      return res
    },
  })

  const __HoSoThuTucList = useMemo(() => {
    const list = dataThuTucList?.data?.body || []
    return list
  }, [dataThuTucList])

  const __dataPaginationList = useMemo(() => {
    if (__HoSoThuTucList.length > 0) {
      return __HoSoThuTucList.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage,
      )
    } else {
      return []
    }
  }, [__HoSoThuTucList, currentPage, itemsPerPage])

  return (
    <HomeTTHCGVView
      home={home}
      dataListHoSoThuTuc={__dataPaginationList}
      loading={isLoadingThuTucList}
      onChangeFilter={setDataFilter}
    />
  )
}

export default HomeTTHCGV

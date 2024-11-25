import { useQuery } from '@tanstack/react-query'
import {
  loadAllPhanCongThucHien,
  loadAllPhanCongThucHienThanhVien,
} from '@/Apis/KDCL'
import { useMemo } from 'react'

export const usePhanCongThucHienThanhVienStore = () => {
  const {
    data: listPhanCongThucHienThanhVien = [],
    isLoading: isLoading,
    isError: isError,
    refetch,
  } = useQuery({
    queryKey: ['PhanCongThucHienThanhVienStore'],
    queryFn: async () => {
      const res = await loadAllPhanCongThucHienThanhVien()
      return res.data.body
    },
    retry: 3,
    staleTime: 30 * 60 * 1000, // 30 Minutes
  })

  return {
    listPhanCongThucHienThanhVien,
    isLoading,
    isError,
    refetch,
  }
}

export const usePhanCongThucHienStore = ({
  hoiDong,
  nhomChuyenTrach = [],
  listTieuChuan = [],
} = {}) => {
  const {
    data: listPhanCongThucHien = [],
    isLoading: isLoading,
    isError: isError,
    refetch,
  } = useQuery({
    queryKey: ['PhanCongThucHienStore'],
    queryFn: async () => {
      const res = await loadAllPhanCongThucHien()
      return res.data.body
    },
    retry: 3,
    staleTime: 30 * 60 * 1000, // 30 Minutes
  })

  const listPhanCongThucHienTheoHoiDong = useMemo(
    () =>
      listPhanCongThucHien.filter(
        (e) =>
          e.KT_KDCL_CTDT_PhanCongThucHien_IDThanhLapHoiDong ==
          hoiDong?.KT_KDCL_CTDT_ThanhLapHoiDong_ID,
      ),
    [hoiDong, listPhanCongThucHien],
  )

  const listPhanCongThucHienMapped = useMemo(() => {
    return listTieuChuan.map((tc) => {
      const phanCongTheoTieuChuan = listPhanCongThucHienTheoHoiDong.find(
        (pc) =>
          pc.KT_KDCL_CTDT_PhanCongThucHien_IDTieuChuan ==
          tc.KT_KDCL_TieuChuan_ID,
      )

      let nhomCT = null
      if (phanCongTheoTieuChuan) {
        nhomCT = nhomChuyenTrach.find(
          (nhom) =>
            nhom.KT_KDCL_CTDT_NhomChuyenTrach_ID ==
            phanCongTheoTieuChuan.KT_KDCL_CTDT_PhanCongThucHien_IDNhomChuyenTrach,
        )
      }

      return {
        ...tc,
        KT_KDCL_CTDT_PhanCongThucHien_NhomPhanCong:
          nhomCT?.KT_KDCL_CTDT_NhomChuyenTrach_TenNhom,
        ...phanCongTheoTieuChuan,
      }
    })
  }, [listTieuChuan, nhomChuyenTrach, listPhanCongThucHienTheoHoiDong])

  return {
    refetch,
    listPhanCongThucHien,
    isLoading,
    isError,
    listPhanCongThucHienTheoHoiDong,
    listPhanCongThucHienMapped,
  }
}

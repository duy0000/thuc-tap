import { loadAllDanhGiaTieuChi, loadAllKeHoachHanhDong } from '@/Apis/KDCL'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export const useDanhGiaTieuChiStore = () => {
  const {
    data = [],
    isLoading: isLoading,
    isError: isError,
    refetch,
  } = useQuery({
    queryKey: ['DanhGiaTieuChiStore'],
    queryFn: async () => {
      const res = await loadAllDanhGiaTieuChi()
      return res.data.body
    },
    retry: 3,
    staleTime: 30 * 60 * 1000, // 30 Minutes
  })

  const listDanhGiaTieuChi = useMemo(
    () =>
      data.map((e) => ({
        ...e,
        KT_KDCL_CTDT_DanhGiaTieuChi_MocChuan_JSON:
          e.KT_KDCL_CTDT_DanhGiaTieuChi_MocChuan_JSON?.trim().length
            ? JSON.parse(e.KT_KDCL_CTDT_DanhGiaTieuChi_MocChuan_JSON)
            : [],
      })),
    [data],
  )

  return {
    listDanhGiaTieuChi,
    isLoading,
    isError,
    refetch,
  }
}

export const useKeHoachHanhDongStore = () => {
  const {
    data: listKeHoachHanhDong = [],
    isLoading: isLoading,
    isError: isError,
    refetch,
  } = useQuery({
    queryKey: ['KeHoachHanhDongStore'],
    queryFn: async () => {
      const res = await loadAllKeHoachHanhDong()
      return res.data.body
    },
    retry: 3,
    staleTime: 30 * 60 * 1000, // 30 Minutes
  })

  return {
    listKeHoachHanhDong,
    isLoading,
    isError,
    refetch,
  }
}

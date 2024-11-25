import { loadAllTieuChi } from '@/Apis/KDCL'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export const useTieuChiStore = () => {
  const {
    data = [],
    isLoading: isLoadingListTieuChi,
    isError: isErrorListTieuChi,
    refetch,
  } = useQuery({
    queryKey: ['TieuChiStore'],
    queryFn: async () => {
      const res = await loadAllTieuChi()
      return res.data.body
    },
    retry: 3,
    staleTime: 30 * 60 * 1000, // 30 Minutes
  })

  const listTieuChi = useMemo(() => {
    return data.map((e) => ({
      ...e,
      KT_KDCL_TieuChi_JSON_DATA: JSON.parse(e.KT_KDCL_TieuChi_JSON_DATA),
      KT_KDCL_TieuChi_MocChuan_JSON_DATA: e.KT_KDCL_TieuChi_MocChuan_JSON_DATA
        ? JSON.parse(e.KT_KDCL_TieuChi_MocChuan_JSON_DATA)
        : [],
    }))
  }, [data])

  return {
    listTieuChi,
    isLoadingListTieuChi,
    isErrorListTieuChi,
    refetch,
  }
}

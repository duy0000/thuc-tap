import { useQuery } from '@tanstack/react-query'
import { loadAllTieuChuan } from '@/Apis/KDCL'

export const useTieuChuanStore = () => {
  const {
    data: listTieuChuan = [],
    isLoading: isLoading,
    isError: isError,
    refetch,
  } = useQuery({
    queryKey: ['TieuChuanStore'],
    queryFn: async () => {
      const res = await loadAllTieuChuan()
      return res.data.body
    },
    retry: 3,
    staleTime: 30 * 60 * 1000, // 30 Minutes
  })

  return {
    listTieuChuan,
    isLoading,
    isError,
    refetch,
  }
}

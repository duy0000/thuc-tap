import { loadAllDkDanhGiaDongCap } from '@/Apis/KDCL'
import { useQuery } from '@tanstack/react-query'

export const useDkDanhGiaDongCapStore = () => {
  const {
    data: listDkDanhGiaDongCap = [],
    isLoading: isLoading,
    isError: isError,
    refetch,
  } = useQuery({
    queryKey: ['DkDanhGiaDongCapStore'],
    queryFn: async () => {
      const res = await loadAllDkDanhGiaDongCap()
      return res.data.body
    },
    retry: 3,
    staleTime: 30 * 60 * 1000, // 30 Minutes
  })

  return {
    listDkDanhGiaDongCap,
    isLoading,
    isError,
    refetch,
  }
}

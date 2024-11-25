import { loadAllKetQuaKiemDinh } from '@/Apis/KDCL'
import { useQuery } from '@tanstack/react-query'

export const useKetQuaKiemDinhStore = () => {
  const {
    data: listKetQuaKiemDinh = [],
    isLoading: isLoading,
    isError: isError,
    refetch,
  } = useQuery({
    queryKey: ['KetQuaKiemDinhStore'],
    queryFn: async () => {
      const res = await loadAllKetQuaKiemDinh()
      return res.data.body
    },
    retry: 3,
    staleTime: 30 * 60 * 1000, // 30 Minutes
  })

  return {
    listKetQuaKiemDinh,
    isLoading,
    isError,
    refetch,
  }
}

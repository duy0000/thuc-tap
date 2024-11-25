import { loadAllHoSoKiemDinh } from '@/Apis/KDCL'
import { useQuery } from '@tanstack/react-query'

export const useHoSoKiemDinhStore = () => {
  const {
    data: listHoSoKiemDinh = [],
    isLoading: isLoading,
    isError: isError,
    refetch,
  } = useQuery({
    queryKey: ['HoSoKiemDinhStore'],
    queryFn: async () => {
      const res = await loadAllHoSoKiemDinh()
      return res.data.body
    },
    retry: 3,
    staleTime: 30 * 60 * 1000, // 30 Minutes
  })

  return {
    listHoSoKiemDinh,
    isLoading,
    isError,
    refetch,
  }
}

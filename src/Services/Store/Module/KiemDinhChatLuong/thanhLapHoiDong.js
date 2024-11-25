import { useQuery } from '@tanstack/react-query'
import { loadAllThanhLapHoiDong } from '@/Apis/KDCL'

export const useThanhLapHoiDongStore = () => {
  const {
    data: listThanhLapHoiDong = [],
    isLoading: isLoading,
    isError: isError,
    refetch,
  } = useQuery({
    queryKey: ['ThanhLapHoiDongStore'],
    queryFn: async () => {
      const res = await loadAllThanhLapHoiDong()
      return res.data.body
    },
    retry: 3,
    staleTime: 30 * 60 * 1000, // 30 Minutes
  })

  return {
    listThanhLapHoiDong,
    isLoading,
    isError,
    refetch,
  }
}

import { useQuery } from '@tanstack/react-query'
import { loadAllThanhPhanHoiDong } from '@/Apis/KDCL'

export const useThanhPhanHoiDongStore = () => {
  const {
    data: listThanhPhanHoiDong = [],
    isLoading: isLoading,
    isError: isError,
    refetch,
  } = useQuery({
    queryKey: ['ThanhPhanHoiDongStore'],
    queryFn: async () => {
      const res = await loadAllThanhPhanHoiDong()
      return res.data.body
    },
    retry: 3,
    staleTime: 30 * 60 * 1000, // 30 Minutes
  })

  return {
    listThanhPhanHoiDong,
    isLoading,
    isError,
    refetch,
  }
}

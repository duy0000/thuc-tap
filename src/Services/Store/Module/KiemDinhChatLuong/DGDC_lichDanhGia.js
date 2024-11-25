import { loadAllDGDCLichTrich } from '@/Apis/KDCL'
import { useQuery } from '@tanstack/react-query'

export const useDGDC_LichDanhGiaStore = () => {
  const {
    data: listLichDanhGia = [],
    isLoading: isLoading,
    isError: isError,
    refetch,
  } = useQuery({
    queryKey: ['DGDC_LichDanhGiaStore'],
    queryFn: async () => {
      const res = await loadAllDGDCLichTrich()
      return res.data.body
    },
    retry: 3,
    staleTime: 30 * 60 * 1000, // 30 Minutes
  })

  return {
    listLichDanhGia,
    isLoading,
    isError,
    refetch,
  }
}

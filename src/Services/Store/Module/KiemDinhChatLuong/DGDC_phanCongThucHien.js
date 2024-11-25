import { loadAllDGDCPhanCongThucHien } from '@/Apis/KDCL'
import { useQuery } from '@tanstack/react-query'

export const useDGDC_PhanCongThucHienStore = () => {
  const {
    data: listPhanCongThucHien = [],
    isLoading: isLoading,
    isError: isError,
    refetch,
  } = useQuery({
    queryKey: ['DGDC_PhanCongThucHienStore'],
    queryFn: async () => {
      const res = await loadAllDGDCPhanCongThucHien()
      return res.data.body
    },
    retry: 3,
    staleTime: 30 * 60 * 1000, // 30 Minutes
  })

  return {
    listPhanCongThucHien,
    isLoading,
    isError,
    refetch,
  }
}

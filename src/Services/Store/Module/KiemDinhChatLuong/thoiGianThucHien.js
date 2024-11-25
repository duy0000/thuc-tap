import { loadAllThoiGianThucHien } from '@/Apis/KDCL'
import { useQuery } from '@tanstack/react-query'

export const useThoiGianThucHienStore = () => {
  const {
    data: listThoiGianThucHien = [],
    isLoading: isLoading,
    isError: isError,
    refetch,
  } = useQuery({
    queryKey: ['ThoiGianThucHienStore'],
    queryFn: async () => {
      const res = await loadAllThoiGianThucHien()
      return res.data.body
    },
    retry: 3,
    staleTime: 30 * 60 * 1000, // 30 Minutes
  })

  return {
    listThoiGianThucHien,
    isLoading,
    isError,
    refetch,
  }
}

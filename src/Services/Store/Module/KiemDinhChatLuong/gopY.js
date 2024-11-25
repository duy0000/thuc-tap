import { loadAllGopY } from '@/Apis/KDCL'
import { useQuery } from '@tanstack/react-query'

export const useGopYStore = () => {
  const {
    data: listGopY = [],
    isLoading: isLoading,
    isError: isError,
    refetch,
  } = useQuery({
    queryKey: ['GopYStore'],
    queryFn: async () => {
      const res = await loadAllGopY()
      return res.data.body
    },
    retry: 3,
    staleTime: 30 * 60 * 1000, // 30 Minutes
    refetchInterval: 30 * 1000, // 30 Seconds
  })

  return {
    listGopY,
    isLoading,
    isError,
    refetch,
  }
}

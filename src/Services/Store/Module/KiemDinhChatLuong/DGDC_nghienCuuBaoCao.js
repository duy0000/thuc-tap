import { loadAllDGDCNghienCuuBaoCao } from '@/Apis/KDCL'
import { useQuery } from '@tanstack/react-query'

export const useDGDC_NghienCuuBaoCaoStore = () => {
  const {
    data: listNghienCuuBaoCao = [],
    isLoading: isLoading,
    isError: isError,
    refetch,
  } = useQuery({
    queryKey: ['DGDC_NghienCuuBaoCaoStore'],
    queryFn: async () => {
      const res = await loadAllDGDCNghienCuuBaoCao()
      return res.data.body
    },
    retry: 3,
    staleTime: 30 * 60 * 1000, // 30 Minutes
  })

  return {
    listNghienCuuBaoCao,
    isLoading,
    isError,
    refetch,
  }
}

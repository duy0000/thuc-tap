import { getAllChuongTrinhDaoTao } from '@/Apis/KDCL/DamBaoChatLuong/apiChuongTrinhDaoTao'
import { useQuery } from '@tanstack/react-query'

export const useChuongTrinhDaoTaoStore = () => {
  const {
    data: listChuongTrinhDaoTao = [],
    isLoading: isLoading,
    isError: isError,
    refetch,
  } = useQuery({
    queryKey: ['ChuongTrinhDaoTaoStore'],
    queryFn: async () => {
      const res = await getAllChuongTrinhDaoTao()
      return res.data.body
    },
    retry: 3,
    staleTime: 30 * 60 * 1000, // 30 Minutes
  })

  return {
    listChuongTrinhDaoTao,
    isLoading,
    isError,
    refetch,
  }
}

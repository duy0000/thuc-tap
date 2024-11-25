import {
  loadAllThuThapMinhChung,
  loadAllThuThapMinhChungTieuChi,
} from '@/Apis/KDCL'
import { useQuery } from '@tanstack/react-query'

export const useThuThapMinhChungStore = () => {
  const {
    data: listThuThapMinhChung = [],
    isLoading: isLoading,
    isError: isError,
    refetch,
  } = useQuery({
    queryKey: ['ThuThapMinhChungStore'],
    queryFn: async () => {
      const res = await loadAllThuThapMinhChung()
      return res.data.body
    },
    retry: 3,
    staleTime: 30 * 60 * 1000, // 30 Minutes
  })

  return {
    listThuThapMinhChung,
    isLoading,
    isError,
    refetch,
  }
}

export const useThuThapMinhChungTieuChiStore = () => {
  const {
    data: listThuThapMinhChungTieuChi = [],
    isLoading: isLoading,
    isError: isError,
    refetch,
  } = useQuery({
    queryKey: ['ThuThapMinhChungTieuChiStore'],
    queryFn: async () => {
      const res = await loadAllThuThapMinhChungTieuChi()
      return res.data.body
    },
    retry: 3,
    staleTime: 30 * 60 * 1000, // 30 Minutes
  })

  return {
    listThuThapMinhChungTieuChi,
    isLoading,
    isError,
    refetch,
  }
}

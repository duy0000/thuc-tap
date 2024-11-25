import {
  loadAllPhanTichNoiHam,
  loadAllPhanTichNoiHamChiTiet,
} from '@/Apis/KDCL'
import { useQuery } from '@tanstack/react-query'

export const usePhanTichNoiHamStore = () => {
  const {
    data: listPhanTichNoiHam = [],
    isLoading: isLoading,
    isError: isError,
    refetch,
  } = useQuery({
    queryKey: ['PhanTichNoiHamStore'],
    queryFn: async () => {
      const res = await loadAllPhanTichNoiHam()
      return res.data.body
    },
    retry: 3,
    staleTime: 30 * 60 * 1000, // 30 Minutes
  })

  return {
    listPhanTichNoiHam,
    isLoading,
    isError,
    refetch,
  }
}

export const usePhanTichNoiHamChiTietStore = () => {
  const {
    data: listPhanTichNoiHamChiTiet = [],
    isLoading: isLoading,
    isError: isError,
    refetch,
  } = useQuery({
    queryKey: ['PhanTichNoiHamChiTietStore'],
    queryFn: async () => {
      const res = await loadAllPhanTichNoiHamChiTiet()
      return res.data.body
    },
    retry: 3,
    staleTime: 30 * 60 * 1000, // 30 Minutes
  })

  return {
    listPhanTichNoiHamChiTiet,
    isLoading,
    isError,
    refetch,
  }
}

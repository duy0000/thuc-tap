import { toNumber } from 'lodash-unified'
import { useQuery } from '@tanstack/react-query'
import {
  loadAllNhomChuyenTrach,
  loadAllNhomChuyenTrachThanhVien,
} from '@/Apis/KDCL'

export const useNhomChuyenTrachStore = () => {
  const {
    data: listNhomChuyenTrach = [],
    isLoading: isLoading,
    isError: isError,
    refetch,
  } = useQuery({
    queryKey: ['NhomChuyenTrachStore'],
    queryFn: async () => {
      const res = await loadAllNhomChuyenTrach()
      return res.data.body
    },
    retry: 3,
    staleTime: 30 * 60 * 1000, // 30 Minutes
  })

  return {
    listNhomChuyenTrach,
    isLoading,
    isError,
    refetch,
  }
}

export const useNhomChuyenTrachThanhVienStore = () => {
  const {
    data: listNhomChuyenTrachThanhVien = [],
    isLoading: isLoading,
    isError: isError,
    refetch,
  } = useQuery({
    queryKey: ['NhomChuyenTrachThanhVienStore'],
    queryFn: async () => {
      const res = await loadAllNhomChuyenTrachThanhVien()
      return res.data.body.map((tv) => ({
        ...tv,
        KT_KDCL_CTDT_NhomChuyenTrach_ThanhVien_IDThanhPhanHoiDong: toNumber(
          tv.KT_KDCL_CTDT_NhomChuyenTrach_ThanhVien_IDThanhPhanHoiDong,
        ),
      }))
    },
    retry: 3,
    staleTime: 30 * 60 * 1000, // 30 Minutes
  })

  return {
    listNhomChuyenTrachThanhVien,
    isLoading,
    isError,
    refetch,
  }
}

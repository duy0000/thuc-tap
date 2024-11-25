import {
  loadAllHoSoKiemDinh,
  loadAllKeHoach_TDG,
  loadAllKeHoach_TDG_DK_NguonLuc,
  loadAllKeHoach_TDG_HoatDong,
} from '@/Apis/KDCL'
import { useQuery } from '@tanstack/react-query'

export const useKeHoachTDGStore = () => {
  const {
    data: listKeHoachTuDanhGia = [],
    isLoading: isLoading,
    isError: isError,
    refetch,
  } = useQuery({
    queryKey: ['KeHoachTDGStore'],
    queryFn: async () => {
      const res = await loadAllKeHoach_TDG()
      return res.data.body
    },
    retry: 3,
    staleTime: 30 * 60 * 1000, // 30 Minutes
  })

  return {
    listKeHoachTuDanhGia,
    isLoading,
    isError,
    refetch,
  }
}

export const useKeHoachTDG_HoatDongStore = () => {
  const {
    data: listKeHoachHoatDong = [],
    isLoading: isLoading,
    isError: isError,
    refetch,
  } = useQuery({
    queryKey: ['KeHoachTDG_HoatDongStore'],
    queryFn: async () => {
      const res = await loadAllKeHoach_TDG_HoatDong()
      return res.data.body
    },
    retry: 3,
    staleTime: 30 * 60 * 1000, // 30 Minutes
  })

  return {
    listKeHoachHoatDong,
    isLoading,
    isError,
    refetch,
  }
}

export const useKeHoachTDG_DuKienNguonLucStore = () => {
  const {
    data: listKeHoachDuKienNguonLuc = [],
    isLoading: isLoading,
    isError: isError,
    refetch,
  } = useQuery({
    queryKey: ['KeHoachTDG_DuKienNguonLucStore'],
    queryFn: async () => {
      const res = await loadAllKeHoach_TDG_DK_NguonLuc()
      return res.data.body
    },
    retry: 3,
    staleTime: 30 * 60 * 1000, // 30 Minutes
  })

  return {
    listKeHoachDuKienNguonLuc,
    isLoading,
    isError,
    refetch,
  }
}

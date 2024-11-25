import { loadAllMinhChung } from '@/Apis/KDCL/MinhChung/apiMinhChung'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { MinhChungType } from '@/Services/Tokens/KDCL/CTDT/minhChung.js'

export const useMinhChungStore = () => {
  const {
    data: listMinhChung = [],
    isLoading: isLoading,
    isError: isError,
    refetch,
  } = useQuery({
    queryKey: ['MinhChungStore'],
    queryFn: async () => {
      const res = await loadAllMinhChung()
      return res.data.body
    },
    retry: 3,
    staleTime: 30 * 60 * 1000, // 30 Minutes
  })

  const listMinhChungPublic = useMemo(() => {
    return listMinhChung.filter(
      (e) => e.KT_KDCL_TaiLieu_Type === MinhChungType.Public,
    )
  }, [listMinhChung])

  return {
    listMinhChung,
    listMinhChungPublic,
    isLoading,
    isError,
    refetch,
  }
}

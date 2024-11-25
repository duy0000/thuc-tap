import { loadAllBoTieuChuan } from '@/Apis/KDCL'
import { useQuery } from '@tanstack/react-query'
import { ensureArray } from '@/Services/Utils/index.js'

export const useBoTieuChuanStore = () => {
  const {
    data: listBoTieuChuan = [],
    isLoading: isLoading,
    isError: isError,
    refetch,
  } = useQuery({
    queryKey: ['BoTieuChuanStore'],
    queryFn: async () => {
      const res = await loadAllBoTieuChuan()
      return res.data.body.map((e) => ({
        ...e,
        KT_KDCL_BoTieuChuan_JSON_DATA: ensureArray(
          JSON.parse(e.KT_KDCL_BoTieuChuan_JSON_DATA),
        )?.sort(
          (a, b) => a.KT_KDCL_BoTieuChuan_ThuTu < b.KT_KDCL_BoTieuChuan_ThuTu,
        ),
      }))
    },
    retry: 3,
    staleTime: 30 * 60 * 1000, // 30 Minutes
  })

  return {
    listBoTieuChuan,
    isLoading,
    isError,
    refetch,
  }
}

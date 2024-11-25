import { getCTGV_TTKL_NS_TheoDoi_Load_R_Para } from '@/Apis/ApiGiangVien/CongTacGiangVien/apiCTGVTraCuu'
import { CTGV_QUERY_KEY } from '@/Services/QueryStores/QueryKeyStores/CongTacGiangVien.querykey'
import { useQuery } from '@tanstack/react-query'

function useCTGVTTKLTheoDoiNhanSuStore() {
  const CTGVTTKLTheoDoiNSQuery = useQuery({
    queryKey: [CTGV_QUERY_KEY.CTGV_TraCuu_NhanSu_TheoDoi],
    queryFn: async () => {
      const response = await getCTGV_TTKL_NS_TheoDoi_Load_R_Para()
      return response.data
    },
  })

  return {
    ...CTGVTTKLTheoDoiNSQuery,
  }
}

export default useCTGVTTKLTheoDoiNhanSuStore

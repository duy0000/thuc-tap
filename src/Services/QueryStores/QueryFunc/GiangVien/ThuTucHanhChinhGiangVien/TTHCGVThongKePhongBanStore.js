import { getTTHCGVThongKeTheoPhongBan } from '@/Apis/ApiGiangVien/ThuTucHanhChinhGiangVien/apiThongKeTTHCGV'
import { TTHCGV_QUERY_KEY } from '@/Services/QueryStores/QueryKeyStores/TTHCGV.querykey'
import { useQuery } from '@tanstack/react-query'

export const useTTHCGVThongKePhongBanStore = (props) => {
  const {
    MC_TTHC_GV_LoaiTimKiem,
    MC_TTHC_GV_NamTimKiem,
    MC_TTHC_GV_ThangTimKiem,
  } = props

  const { data: thongKePhongBanQuery, isLoading } = useQuery({
    queryKey: [
      TTHCGV_QUERY_KEY.SP_MC_TTHC_GV_Load_ThongKe_TheoPhongBan,
      MC_TTHC_GV_LoaiTimKiem,
      MC_TTHC_GV_NamTimKiem,
      MC_TTHC_GV_ThangTimKiem,
    ],
    queryFn: async () => {
      return await getTTHCGVThongKeTheoPhongBan({
        MC_TTHC_GV_LoaiTimKiem,
        MC_TTHC_GV_NamTimKiem,
        MC_TTHC_GV_ThangTimKiem,
      })
    },
  })

  return {
    dataThongKePhongBan: thongKePhongBanQuery,
    loadingThongKePhongBan: isLoading,
  }
}

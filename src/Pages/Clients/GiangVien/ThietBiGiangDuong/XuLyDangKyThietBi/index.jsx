import { useQuery } from '@tanstack/react-query'
import XuLyDangKyThietBiView from './XuLyDangKyThietBiView'
import { getTBGDDanhSachDangKyThietBi } from '@/Apis/HoTroThietBiGiangDuong/apiDangKySuDungThietBi'
import { HoTroTBGD_QUERY_KEY } from '@/Services/QueryStores/QueryKeyStores/HoTroTBGD.querykey'

function XuLyDangKyThietBi() {
  const { data: listTBGDDangKyThietBi, loading: loadingTBGDDKTB } = useQuery({
    queryKey: [HoTroTBGD_QUERY_KEY.SP_DT_CVNB_TBGD_GuiYeuCau_XuLy_Load],
    queryFn: async () => {
      const response = await getTBGDDanhSachDangKyThietBi()
      return response
    },
    retry: 3,
    refetchInterval: 1 * 60 * 1000,
  })

  console.log(listTBGDDangKyThietBi)

  return (
    <XuLyDangKyThietBiView
      loading={loadingTBGDDKTB}
      listTBGDDangKyThietBi={listTBGDDangKyThietBi?.data?.body || []}
    />
  )
}

export default XuLyDangKyThietBi

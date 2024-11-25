import { toNumber } from 'lodash-unified'
import { lazy, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryParams } from '@/Services/Hooks'
import { useTieuChiStore } from '@/Services/Store'
import { HoSoKiemDinhCtx } from '@/Services/Tokens'
import { handleBackRoute } from '@/Services/Utils'
const Home = lazy(
  () =>
    import(
      '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/TuDanhGia/Buoc5/Home'
    ),
)

const DanhGiaTieuChi_ChiTiet = lazy(
  () =>
    import(
      '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/TuDanhGia/Buoc5/DanhGiaTieuChi_ChiTiet'
    ),
)

export default function Buoc5() {
  const navigate = useNavigate()
  const hoSoKiemDinh = useContext(HoSoKiemDinhCtx)
  const queryParams = useQueryParams()
  const { listTieuChi } = useTieuChiStore()

  const query = queryParams.q

  const [type, _IDTieuChuan, _IDTieuChi] = query?.split('.') || []
  const IDTieuChi = toNumber(_IDTieuChi)
  const IDTieuChuan = toNumber(_IDTieuChuan)

  const routes = {
    'danh-gia-tieu-chi': (
      <DanhGiaTieuChi_ChiTiet IDTieuChuan={IDTieuChuan} IDTieuChi={IDTieuChi} />
    ),
  }

  useEffect(() => {
    if (
      _IDTieuChi &&
      listTieuChi.length &&
      !listTieuChi.find(
        (tieuChi) => tieuChi.KT_KDCL_TieuChi_ID === IDTieuChi,
      ) &&
      _IDTieuChuan &&
      !hoSoKiemDinh.listTieuChuan?.find(
        (tieuChuan) => tieuChuan.KT_KDCL_TieuChuan_ID === IDTieuChuan,
      )
    ) {
      return handleBackRoute(navigate, '/dam-bao-chat-luong/chat-luong-ctdt')
    }
  }, [_IDTieuChi, _IDTieuChuan, listTieuChi, hoSoKiemDinh.listTieuChuan])

  return routes[type] ? routes[type] : <Home />
}

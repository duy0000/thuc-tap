import { lazy, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toNumber } from 'lodash-unified'

import { useQueryParams } from '@/Services/Hooks'
import { handleBackRoute } from '@/Services/Utils'
import { useTieuChiStore } from '@/Services/Store'
import { HoSoKiemDinhCtx } from '@/Services/Tokens'

const Home = lazy(
  () =>
    import(
      '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/TuDanhGia/Buoc4/Home'
    ),
)
const ThuThapMinhChung_TieuChi = lazy(
  () =>
    import(
      '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/TuDanhGia/Buoc4/ThuThapMinhChung/ThuThapMinhChung_TieuChi.jsx'
    ),
)
const PhanTichNoiHam_TieuChi = lazy(
  () =>
    import(
      '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/TuDanhGia/Buoc4/PhanTichTieuChi/PhanTichNoiHam_TieuChi.jsx'
    ),
)

export default function Buoc4() {
  const navigate = useNavigate()
  const hoSoKiemDinh = useContext(HoSoKiemDinhCtx)
  const queryParams = useQueryParams()
  const { listTieuChi } = useTieuChiStore()

  const query = queryParams.q

  const [type, _IDTieuChuan, _IDTieuChi] = query?.split('.') || []
  const IDTieuChi = toNumber(_IDTieuChi)
  const IDTieuChuan = toNumber(_IDTieuChuan)

  const routes = {
    'phan-tich-noi-ham': (
      <PhanTichNoiHam_TieuChi IDTieuChuan={IDTieuChuan} IDTieuChi={IDTieuChi} />
    ),
    'gan-minh-chung': (
      <ThuThapMinhChung_TieuChi
        IDTieuChuan={IDTieuChuan}
        IDTieuChi={IDTieuChi}
      />
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

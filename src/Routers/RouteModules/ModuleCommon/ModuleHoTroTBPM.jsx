import { lazy } from 'react'
const HomeTaiSan = lazy(() => import('@/Pages/Clients/Common/TaiSan/'))
const BaoHongTaiSan = lazy(
  () => import('@/Pages/Clients/Common/TaiSan/BaoHongTaiSan/BaoHongTaiSan'),
)
const SuaChuaTaiSan = lazy(
  () => import('@/Pages/Clients/Common/TaiSan/SuaChuaTaiSan/SuaChuaTaiSan'),
)
const TraCuuTaiSan = lazy(
  () => import('@/Pages/Clients/Common/TaiSan/TraCuuTaiSan/TraCuuTaiSan'),
)
const CapNhatTaiSan = lazy(
  () =>
    import('@/Pages/Clients/Common/TaiSan/CapNhatThongTinTaiSan/CapNhatTaiSan'),
)

export { HomeTaiSan, BaoHongTaiSan, SuaChuaTaiSan, TraCuuTaiSan, CapNhatTaiSan }

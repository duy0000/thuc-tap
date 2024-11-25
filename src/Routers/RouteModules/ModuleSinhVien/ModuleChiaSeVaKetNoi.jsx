import { lazy } from 'react'

const ChiaSeVaKetNoiLayout = lazy(
  () => import('@/Layouts/ChiaSeVaKetNoi/ChiaSeVaKetNoiLayout'),
)
const ChiaSeVaKetNoi = lazy(
  () => import('@/Pages/Clients/GiangVien/ChiaSevaKetNoi/ChiaSeVaKetNoi'),
)
const TaiLieuHocTap = lazy(
  () =>
    import(
      '@/Pages/Clients/GiangVien/ChiaSevaKetNoi/TaiLieuHocTap/TaiLieuHocTap'
    ),
)
const NhaO = lazy(
  () => import('@/Pages/Clients/GiangVien/ChiaSevaKetNoi/NhaO/NhaO'),
)
const DoDungCaNhan = lazy(
  () =>
    import(
      '@/Pages/Clients/GiangVien/ChiaSevaKetNoi/DoDungCaNhan/DoDungCaNhan'
    ),
)
const ViecLam = lazy(
  () => import('@/Pages/Clients/GiangVien/ChiaSevaKetNoi/ViecLam/ViecLam'),
)

export {
  ChiaSeVaKetNoiLayout,
  ChiaSeVaKetNoi,
  TaiLieuHocTap,
  NhaO,
  DoDungCaNhan,
  ViecLam,
}

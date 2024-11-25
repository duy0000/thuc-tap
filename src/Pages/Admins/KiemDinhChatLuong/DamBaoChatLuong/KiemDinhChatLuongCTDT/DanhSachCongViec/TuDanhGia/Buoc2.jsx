import { useContext, useMemo, lazy } from 'react'

import { HoSoKiemDinhCtx } from '@/Services/Tokens'
import { useQueryParams } from '@/Services/Hooks'
import { useKeHoachTDGStore } from '@/Services/Store/index.js'

const ThoiGianHoatDong = lazy(
  () =>
    import(
      '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/TuDanhGia/Buoc2/ThoiGianHoatDong.jsx'
    ),
)
const KeHoach = lazy(
  () =>
    import(
      '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/TuDanhGia/Buoc2/KeHoach.jsx'
    ),
)
const KeHoachForm = lazy(
  () =>
    import(
      '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/TuDanhGia/Buoc2/KeHoachForm.jsx'
    ),
)
const NhomCongTac = lazy(
  () =>
    import(
      '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/TuDanhGia/Buoc2/NhomCongTac.jsx'
    ),
)
const DuKienNguonLuc = lazy(
  () =>
    import(
      '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/TuDanhGia/Buoc2/DuKienNguonLuc.jsx'
    ),
)
const BanThuKy = lazy(
  () =>
    import(
      '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/TuDanhGia/Buoc2/BanThuKy.jsx'
    ),
)
const ThanhPhanHoiDong = lazy(
  () =>
    import(
      '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/TuDanhGia/Buoc2/ThanhPhanHoiDong.jsx'
    ),
)

export default function Buoc2() {
  const hoSoKiemDinhCtx = useContext(HoSoKiemDinhCtx)

  const queryParams = useQueryParams()
  const { listKeHoachTuDanhGia } = useKeHoachTDGStore()

  const keHoach = useMemo(() => {
    return listKeHoachTuDanhGia.find(
      (kh) =>
        kh.KT_KDCL_CTDT_KeHoach_TDG_IDHoSoKiemDinh ===
        hoSoKiemDinhCtx.hoSoKiemDinh?.KT_KDCL_CTDT_HoSoKiemDinh_ID,
    )
  }, [hoSoKiemDinhCtx.hoSoKiemDinh, listKeHoachTuDanhGia])

  const formSwitch = {
    'ke-hoach': <KeHoachForm keHoach={keHoach} />,
    'nhom-cong-tac': <NhomCongTac />,
    'dk-nguon-luc': <DuKienNguonLuc keHoach={keHoach} />,
    'thoi-gian-hoat-dong': <ThoiGianHoatDong keHoach={keHoach} />,
    'ban-thu-ky': <BanThuKy />,
    'thanh-phan-hoi-dong': <ThanhPhanHoiDong />,
  }

  return formSwitch[queryParams.q] ? (
    formSwitch[queryParams.q]
  ) : (
    <KeHoach keHoach={keHoach} />
  )
}

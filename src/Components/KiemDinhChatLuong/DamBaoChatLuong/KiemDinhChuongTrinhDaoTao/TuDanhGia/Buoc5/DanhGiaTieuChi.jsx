import TableTieuChuanTieuChi from '../TableTieuChuanTieuChi'
import { useContext, useMemo } from 'react'
import { HoSoKiemDinhCtx } from '@/Services/Tokens'
import {
  usePhanCongThucHienStore,
  usePhanCongThucHienThanhVienStore,
  useDanhGiaTieuChiStore,
} from '@/Services/Store'
import { flatten, values } from 'lodash-unified'
import { useNavigate } from 'react-router-dom'

export default function DanhGiaTieuChi() {
  const navigate = useNavigate()

  const hoSoKiemDinh = useContext(HoSoKiemDinhCtx)
  const { listDanhGiaTieuChi } = useDanhGiaTieuChiStore()
  const { listPhanCongThucHienThanhVien } = usePhanCongThucHienThanhVienStore()

  const { listPhanCongThucHienMapped } = usePhanCongThucHienStore({
    hoiDong: hoSoKiemDinh.hoiDong,
    listTieuChuan: hoSoKiemDinh.listTieuChuan,
    nhomChuyenTrach: hoSoKiemDinh.nhomChuyenTrach,
  })

  const handleClickTieuChi = ({ IDTieuChi, IDTieuChuan }) => {
    navigate(
      `/dam-bao-chat-luong/chat-luong-ctdt/${hoSoKiemDinh.hoSoKiemDinh?.KT_KDCL_CTDT_HoSoKiemDinh_ID}/tu-danh-gia/buoc-5?q=danh-gia-tieu-chi.${IDTieuChuan}.${IDTieuChi}`,
    )
  }

  const listDanhGiaTieuChiTrongHoiDong = useMemo(() => {
    if (!hoSoKiemDinh.hoiDong) return []

    return listDanhGiaTieuChi.filter(
      (e) =>
        e.KT_KDCL_CTDT_DanhGiaTieuChi_IDThanhLapHoiDong ===
        hoSoKiemDinh.hoiDong?.KT_KDCL_CTDT_ThanhLapHoiDong_ID,
    )
  }, [listDanhGiaTieuChi, hoSoKiemDinh.hoiDong])

  const listPhanCongThanhVienTrongNhom = useMemo(() => {
    if (!listPhanCongThucHienMapped.length) return []

    return listPhanCongThucHienThanhVien.filter((e) =>
      listPhanCongThucHienMapped.find(
        (pc) =>
          pc.KT_KDCL_CTDT_PhanCongThucHien_ID ===
          e.KT_KDCL_CTDT_PhanCongThucHien_IDPCTH,
      ),
    )
  }, [listPhanCongThucHienThanhVien, listPhanCongThucHienMapped])

  const danhSachTrangThai = useMemo(() => {
    if (!listPhanCongThanhVienTrongNhom.length) return {}

    return flatten(values(hoSoKiemDinh.listTieuChiMappedByTieuChuanID)).reduce(
      (acc, curr) => {
        const IDTieuChi = curr.KT_KDCL_TieuChi_ID

        if (!acc[IDTieuChi]) {
          const phanCongThanhVien = listPhanCongThanhVienTrongNhom.find(
            (pc) =>
              pc.KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_IDTieuChi ===
              IDTieuChi,
          )
          if (!phanCongThanhVien) return acc

          const minhChung = listDanhGiaTieuChiTrongHoiDong.find(
            (e) => e.KT_KDCL_CTDT_DanhGiaTieuChi_IDTieuChi === IDTieuChi,
          )

          acc[IDTieuChi] = {
            ...phanCongThanhVien,
            _TrangThai_:
              minhChung?.KT_KDCL_CTDT_DanhGiaTieuChi_TrangThai ?? false,
            ...minhChung,
          }
        }

        return acc
      },
      {},
    )
  }, [
    hoSoKiemDinh.listTieuChiMappedByTieuChuanID,
    listPhanCongThanhVienTrongNhom,
    listDanhGiaTieuChiTrongHoiDong,
  ])

  return (
    <div className="z-[2] mt-1 md:mt-4">
      <h3 className="uppercase cursor-default text-uneti-primary-light ml-3 font-semibold">
        Đánh giá tiêu chí
      </h3>

      <div className="flex gap-3 mt-1 overflow-x-auto">
        <TableTieuChuanTieuChi
          handleClickTieuChi={handleClickTieuChi}
          danhSachTrangThai={danhSachTrangThai}
        />
      </div>
    </div>
  )
}

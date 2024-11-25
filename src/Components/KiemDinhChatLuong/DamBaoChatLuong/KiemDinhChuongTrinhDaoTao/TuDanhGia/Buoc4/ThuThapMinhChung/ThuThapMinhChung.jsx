import { useNavigate } from 'react-router-dom'
import TableTieuChuanTieuChi from '../../TableTieuChuanTieuChi.jsx'
import { useContext, useMemo } from 'react'
import { HoSoKiemDinhCtx } from '@/Services/Tokens/index.js'
import {
  usePhanCongThucHienStore,
  usePhanCongThucHienThanhVienStore,
  useThuThapMinhChungStore,
} from '@/Services/Store/index.js'
import { flatten, values } from 'lodash-unified'
import BtnExportExcelTotal from './ExportExcel/BtnExportExcelTotal.jsx'

export default function ThuThapMinhChung() {
  const navigate = useNavigate()

  const hoSoKiemDinh = useContext(HoSoKiemDinhCtx)
  const { listThuThapMinhChung } = useThuThapMinhChungStore()
  const { listPhanCongThucHienThanhVien } = usePhanCongThucHienThanhVienStore()

  const { listPhanCongThucHienMapped } = usePhanCongThucHienStore({
    hoiDong: hoSoKiemDinh.hoiDong,
    listTieuChuan: hoSoKiemDinh.listTieuChuan,
    nhomChuyenTrach: hoSoKiemDinh.nhomChuyenTrach,
  })

  const handleClickTieuChi = ({ IDTieuChi, IDTieuChuan }) => {
    navigate(
      `/dam-bao-chat-luong/chat-luong-ctdt/${hoSoKiemDinh.hoSoKiemDinh?.KT_KDCL_CTDT_HoSoKiemDinh_ID}/tu-danh-gia/buoc-4?q=gan-minh-chung.${IDTieuChuan}.${IDTieuChi}`,
    )
  }

  const listThuThapMinhChungTrongHoiDong = useMemo(() => {
    if (!hoSoKiemDinh.hoiDong) return []

    return listThuThapMinhChung.filter(
      (e) =>
        e.KT_KDCL_CTDT_ThuThapMinhChung_IDThanhLapHoiDong ===
        hoSoKiemDinh.hoiDong?.KT_KDCL_CTDT_ThanhLapHoiDong_ID,
    )
  }, [listThuThapMinhChung, hoSoKiemDinh.hoiDong])

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

          const minhChung = listThuThapMinhChungTrongHoiDong.find(
            (e) => e.KT_KDCL_CTDT_ThuThapMinhChung_IDTieuChi === IDTieuChi,
          )

          acc[IDTieuChi] = {
            ...phanCongThanhVien,
            _TrangThai_:
              minhChung?.KT_KDCL_CTDT_ThuThapMinhChung_TrangThai ?? false,
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
    listThuThapMinhChungTrongHoiDong,
  ])

  return (
    <div className="z-[2] mt-1 md:mt-4">
      <div className="flex items-center justify-between">
        <h3 className="uppercase cursor-default text-uneti-primary-light ml-3 font-semibold">
          Thực hiện gán minh chứng
        </h3>
        <BtnExportExcelTotal />
      </div>

      <div className="mt-1 overflow-x-auto">
        <TableTieuChuanTieuChi
          handleClickTieuChi={handleClickTieuChi}
          danhSachTrangThai={danhSachTrangThai}
        />
      </div>
    </div>
  )
}

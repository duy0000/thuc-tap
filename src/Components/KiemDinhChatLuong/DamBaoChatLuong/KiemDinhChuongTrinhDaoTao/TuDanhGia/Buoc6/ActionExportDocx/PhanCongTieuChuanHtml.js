function PhanCongTieuChuanItem({ tenTieuChuan, nguoiPhanCong }) {
  return `<p style="line-height: 22pt; margin: 0;">${tenTieuChuan} do ${nguoiPhanCong} phụ trách.</p>`
}

export default function PhanCongTieuChuanHtml(
  {
    nhomChuyenTrachThanhVienGroupByIDNhomChuyenTrach,
    listTieuChuan,
    danhSachThanhPhanHoiDong,
  },
  listPhanCongThucHienMapped,
) {
  return `
    <meta charset="UTF-8">
		<body style="line-height: 1.5; font-size: 13pt;">
    <div style="margin-left: 0.5in">
  ${listTieuChuan
    .map((e) => {
      const phanCongThucHien = listPhanCongThucHienMapped.find(
        (pc) =>
          pc.KT_KDCL_CTDT_PhanCongThucHien_IDTieuChuan ==
          e.KT_KDCL_TieuChuan_ID,
      )

      if (!phanCongThucHien) {
        return PhanCongTieuChuanItem({
          tenTieuChuan: e.KT_KDCL_TieuChuan_Ma,
          nguoiPhanCong: '...',
        })
      }

      const truongNhomPhanCong =
        nhomChuyenTrachThanhVienGroupByIDNhomChuyenTrach[
          phanCongThucHien.KT_KDCL_CTDT_PhanCongThucHien_IDNhomChuyenTrach
        ]?.find((e) => e.KT_KDCL_CTDT_NhomChuyenTrach_ThanhVien_IsTruongNhom)

      const thanhPhanHoiDong = danhSachThanhPhanHoiDong.find(
        (e) =>
          e.KT_KDCL_CTDT_ThanhPhanHoiDong_MaNhanSu ==
          truongNhomPhanCong.KT_KDCL_CTDT_NhomChuyenTrach_ThanhVien_MaNhanSu,
      )

      return PhanCongTieuChuanItem({
        tenTieuChuan: e?.KT_KDCL_TieuChuan_Ma,
        nguoiPhanCong:
          thanhPhanHoiDong?.KT_KDCL_CTDT_ThanhPhanHoiDong_HoTen_ChucDanh,
      })
    })
    .join('')}
    </div>
    </body>
    `
}

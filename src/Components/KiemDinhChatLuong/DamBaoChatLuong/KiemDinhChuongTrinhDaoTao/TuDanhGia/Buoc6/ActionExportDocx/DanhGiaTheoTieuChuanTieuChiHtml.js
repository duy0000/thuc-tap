function DanhGiaTieuChuan(
  tieuChuan,
  listTieuChi,
  listDanhGiaTieuChiTrongHoiDong,
) {
  return ` <div>
      <h1 style="font-size: 13pt; line-height: 22pt; margin-top: 0; margin-bottom: 0">
        <b>${tieuChuan.KT_KDCL_TieuChuan_Ma}. ${tieuChuan.KT_KDCL_TieuChuan_Ten}</b>
      </h1>
      <h1 style="font-size: 13pt; line-height: 22pt; margin-top: 0; margin-bottom: 0"><b>Mở đầu</b></h1>
      <p style="margin: 0; margin-left: 0.5in">Giới thiệu về tiêu chuẩn.</p>
      <div>
        ${listTieuChi
          .map((tieuChi) => {
            const danhGiaTieuChi =
              listDanhGiaTieuChiTrongHoiDong.find(
                (e) =>
                  e.KT_KDCL_CTDT_DanhGiaTieuChi_IDTieuChi ===
                  tieuChi.KT_KDCL_TieuChi_ID,
              ) ?? {}

            return `<div style="margin-left: 0.5in">
            <p style="font-weight: 500; font-size: 13pt; margin: 0; line-height: 22pt;"><b>${tieuChi.KT_KDCL_TieuChi_Ma}:</b> ${tieuChi.KT_KDCL_TieuChi_JSON_DATA[0].KT_KDCL_BoTieuChuan_NoiDung}</p>
            <div style="line-height: 22pt; margin-top: 0; margin-bottom: 0">
              <i>1. Mô tả hiện trạng</i>
              ${danhGiaTieuChi.KT_KDCL_CTDT_DanhGiaTieuChi_MoTa ?? ''}
              ${danhGiaTieuChi.KT_KDCL_CTDT_DanhGiaTieuChi_MocChuan_JSON?.map(
                (e) =>
                  `<div style="line-height: 18px; margin: 0">${e.KT_KDCL_TieuChi_MocChuan_Ten}: ${e.KT_KDCL_TieuChi_MocChuan_MoTa}</div>`,
              ).join('')}
            </div>
            <div style="line-height: 22pt; margin-top: 0; margin-bottom: 0">
              <i>2. Điểm mạnh</i>
              ${danhGiaTieuChi.KT_KDCL_CTDT_DanhGiaTieuChi_DiemManh ?? ''}
            </div>
            <div style="line-height: 22pt; margin-top: 0; margin-bottom: 0">
              <i>3. Điểm tồn tại</i>
              ${danhGiaTieuChi.KT_KDCL_CTDT_DanhGiaTieuChi_DiemTonTai ?? ''}
            </div>
            <div style="line-height: 22pt; margin-top: 0; margin-bottom: 0">
              <i>4. Kế hoạch hành động</i>
              ${danhGiaTieuChi.KT_KDCL_CTDT_DanhGiaTieuChi_KeHoachHanhDong ?? ''}
            </div>
            <div style="line-height: 22pt; margin-top: 0; margin-bottom: 0">
              <i>5. Tự đánh giá</i>: ${danhGiaTieuChi.KT_KDCL_CTDT_DanhGiaTieuChi_DanhGia < 4 ? 'Chưa đạt' : 'Đạt'}, mức ${danhGiaTieuChi.KT_KDCL_CTDT_DanhGiaTieuChi_DanhGia ?? '...'}/7
            </div>
          </div>`
          })
          .join('')}

        <div style="margin-left: 0.5in">
          <h1 style="font-size: 13pt; margin-top: 0">Kết luận về ${tieuChuan.KT_KDCL_TieuChuan_Ma}</h1>
        </div>
      </div>
    </div>`
}

export default function DanhGiaTheoTieuChuanTieuChiHtml(
  { listTieuChuan, listTieuChiMappedByTieuChuanID },
  listDanhGiaTieuChiTrongHoiDong,
) {
  return `
    <meta charset="UTF-8">
    <style>
      * {
      margin: 0;
      box-sizing: border-box;
      line-height: 22pt;
    }
    </style>
		<body style="font-size: 13pt">

    ${listTieuChuan
      .map((e) =>
        DanhGiaTieuChuan(
          e,
          listTieuChiMappedByTieuChuanID[e.KT_KDCL_TieuChuan_ID],
          listDanhGiaTieuChiTrongHoiDong,
        ),
      )
      .join('')}
    </body>
  `
}

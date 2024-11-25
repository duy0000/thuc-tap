export default function BangTongHopKetQuaTuDanhGiaHtml(
  { listTieuChuan, listTieuChiMappedByTieuChuanID },
  listDanhGiaTieuChiTrongHoiDong,
) {
  const listTieuChuanMap = listTieuChuan.map((tieuChuan) => {
    let TongDiem = 0
    let SoTieuChi = 0
    let SoTieuChiDat = 0

    const ListTieuChi =
      listTieuChiMappedByTieuChuanID[tieuChuan.KT_KDCL_TieuChuan_ID]

    ListTieuChi.forEach((tieuChi, i) => {
      const danhGiaTieuChi = listDanhGiaTieuChiTrongHoiDong.find(
        (e) =>
          e.KT_KDCL_CTDT_DanhGiaTieuChi_IDTieuChi ===
          tieuChi.KT_KDCL_TieuChi_ID,
      )

      SoTieuChi++
      TongDiem += danhGiaTieuChi?.KT_KDCL_CTDT_DanhGiaTieuChi_DanhGia || 0
      SoTieuChiDat +=
        danhGiaTieuChi?.KT_KDCL_CTDT_DanhGiaTieuChi_DanhGia > 3 ? 1 : 0

      ListTieuChi[i].KT_KDCL_CTDT_DanhGiaTieuChi_DanhGia =
        danhGiaTieuChi?.KT_KDCL_CTDT_DanhGiaTieuChi_DanhGia
    })

    return {
      MaTieuChuan: tieuChuan.KT_KDCL_TieuChuan_Ma,
      ListTieuChi,
      DanhGiaTieuChi: {
        MucTrungBinh: Number((TongDiem / SoTieuChi).toFixed(2)),
        SoTieuChiDat,
        PhanTramDat: Number((SoTieuChiDat / SoTieuChi) * 100).toFixed(2),
      },
    }
  })

  const danhGiaChung = listTieuChuanMap.reduce(
    (acc, curr) => {
      acc.TongTrungBinh += curr.DanhGiaTieuChi.MucTrungBinh
      acc.TongTieuChiDat += curr.DanhGiaTieuChi.SoTieuChiDat
      acc.TongTieuChi += curr.ListTieuChi.length
      return acc
    },
    {
      TongTrungBinh: 0,
      TongTieuChiDat: 0,
      TongTieuChi: 0,
    },
  )

  return `
    <meta charset="UTF-8">
    <body style="font-size: 13pt">
      <table border="1" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th style="margin: 4px; margin-bottom: 6px;" rowSpan="2">Tiêu chuẩn, tiêu chí</th>
            <th style="margin: 4px; margin-bottom: 6px;" colSpan="7">Thang đánh giá</th>
            <th style="margin: 4px; margin-bottom: 6px;" colSpan="3">Tổng hợp theo tiêu chuẩn</th>
          </tr>
          <tr>
            <th style="margin: 4px; margin-bottom: 6px;" colSpan="3">
              Chưa đạt
            </th>
            <th style="margin: 4px; margin-bottom: 6px;" colSpan="4">
              Đạt
            </th>

            <th style="margin: 4px; margin-bottom: 6px;">Mức trung bình</th>
            <th style="margin: 4px; margin-bottom: 6px;">Số tiêu chí đạt</th>
            <th style="margin: 4px; margin-bottom: 6px;">Tỉ lệ số tiêu chí đạt (%)</th>
          </tr>
        </thead>

        <tbody>
          ${listTieuChuanMap
            .map((tieuChuan) => {
              return `
              <tr>
                <td colSpan="8" style="margin: 4px; margin-bottom: 6px;">
                  <b>
                    <i>${tieuChuan.MaTieuChuan}</i>
                  </b>
                </td>
                <td style="margin: 4px; margin-bottom: 6px; text-align: center; width: 56px;" rowSpan="${tieuChuan.ListTieuChi.length + 1}">${tieuChuan.DanhGiaTieuChi.MucTrungBinh}</td>
                <td style="margin: 4px; margin-bottom: 6px; text-align: center; width: 56px;" rowSpan="${tieuChuan.ListTieuChi.length + 1}">${tieuChuan.DanhGiaTieuChi.SoTieuChiDat}</td>
                <td style="margin: 4px; margin-bottom: 6px; text-align: center; width: 56px;" rowSpan="${tieuChuan.ListTieuChi.length + 1}">${tieuChuan.DanhGiaTieuChi.PhanTramDat}%</td>
              </tr>

            ${tieuChuan.ListTieuChi.map((tieuChi) => {
              return `
              <tr>
                <td style="margin: 4px; margin-bottom: 6px;">${tieuChi.KT_KDCL_TieuChi_Ma}</td>
                ${Array(7)
                  .fill(0)
                  .map((_, i) => {
                    return `<td style="margin: 4px; margin-bottom: 6px; width: 40px; text-align: center;">${tieuChi.KT_KDCL_CTDT_DanhGiaTieuChi_DanhGia == i + 1 ? 'x' : ''}</td>`
                  })
                  .join('')}
              </tr>
              `
            }).join('')}`
            })
            .join('')}

          <tr style="background-color: #f5f5f4;">
            <td style="margin: 4px; margin-bottom: 6px;" colSpan="8">
              <b>
                Đánh giá chung CTĐT
              </b>
            </td>
            <td style="margin: 4px; margin-bottom: 6px; text-align: center; width: 56px;">
              ${danhGiaChung.TongTrungBinh}
            </td>
            <td style="margin: 4px; margin-bottom: 6px; text-align: center; width: 56px;">
              ${danhGiaChung.TongTieuChiDat}
            </td>
            <td style="margin: 4px; margin-bottom: 6px; text-align: center; width: 56px;">
              ${Number(danhGiaChung.TongTrungBinh / danhGiaChung.TongTieuChi).toFixed(2)}%
            </td>
          </tr>
        </tbody>
      </table>
    </body>
  `
}

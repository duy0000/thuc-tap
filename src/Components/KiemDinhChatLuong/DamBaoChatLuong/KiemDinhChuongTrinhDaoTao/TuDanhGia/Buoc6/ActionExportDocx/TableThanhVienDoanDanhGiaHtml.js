import { ShortHocHamHocVi } from '@/Services/Static/Common/HocHamHocVi'
import { NhiemVuEnumText } from '@/Services/Tokens'

export default function TableThanhVienDoanDanhGiaHtml({ thanhPhanHoiDong }) {
  return `
		<meta charset="UTF-8">
		<body style="line-height: 1.5">
			<table style="width: 100%; border-collapse: collapse" border="1">
				<thead>
					<tr>
						<th style="width: 44px; margin: 4px">TT</th>
						<th style="width: 170px;margin: 4px">Họ và tên </th>
						<th style="margin: 4px">Chức danh, chức vụ</th>
						<th style="width: 120px;margin: 4px">Nhiệm vụ</th>
						<th style="width: 70px; margin: 4px">Chữ ký</th>
					</tr>
				</thead>

				<tbody>
					${thanhPhanHoiDong
            .map(
              (e, i) => `
						<tr>
							<td style="text-align: center; width: 44px; margin: 4px;">${i + 1}</td>
							<td style="text-align: left; margin: 4px;">${e.KT_KDCL_CTDT_ThanhPhanHoiDong_HocHamHocVi ? ShortHocHamHocVi[e.KT_KDCL_CTDT_ThanhPhanHoiDong_HocHamHocVi] + '. ' : ''}${e.KT_KDCL_CTDT_ThanhPhanHoiDong_HoTen}</td>
							<td style="text-align: left; margin: 4px;">${e.KT_KDCL_CTDT_ThanhPhanHoiDong_ChucVu.split(';').join(', ')}</td>
							<td style="text-align: center; margin: 4px;">${NhiemVuEnumText[e.KT_KDCL_CTDT_ThanhPhanHoiDong_NhiemVu]}</td>
							<td></td>
						</tr>
						`,
            )
            .join(' ')}
				</tbody>
			</table>
		</body>
	`
}

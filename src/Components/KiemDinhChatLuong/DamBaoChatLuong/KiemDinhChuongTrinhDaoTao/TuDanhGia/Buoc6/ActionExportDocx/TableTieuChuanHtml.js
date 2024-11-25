export default function TableTieuChuanHtml({ listTieuChuan }) {
  return `
		<meta charset="UTF-8">
		<body style="line-height: 16px">
			<table style="width: 100%; border-collapse: collapse" border="1">
				<thead>
					<tr>
						<th style="width: 44px; margin: 4px;">TT</th>
						<th style="margin: 4px;">Nội dung</th>
						<th style="margin: 4px;">Kết quả</th>
					</tr>
				</thead>

				<tbody>
					${listTieuChuan
            .map(
              (e, i) => `
						<tr>
							<td style="text-align: center; width: 44px; margin: 4px;">${i + 1}</td>
							<td style="text-align: left; margin: 4px;">${e.KT_KDCL_TieuChuan_Ma}</td>
							<td style="text-align: left; margin: 4px;">${e.KT_KDCL_TieuChuan_Ten}</td>
						</tr>
						`,
            )
            .join(' ')}
				</tbody>
			</table>
		</body>
	`
}

import { Table, TableColumn } from '@/Components/Base/index.js'
import { useContext } from 'react'
import { HoSoKiemDinhCtx, NhiemVuEnumText } from '@/Services/Tokens'
import Tag from '@/Components/Base/Tag/Tag'

export default function TableThanhPhanHoiDong({ loaiThanhPhan }) {
  const hoSoKiemDinhCtx = useContext(HoSoKiemDinhCtx)
  return (
    <Table
      data={hoSoKiemDinhCtx.thanhPhanHoiDong.filter(
        (e) => e.KT_KDCL_CTDT_ThanhPhanHoiDong_LoaiThanhPhan === loaiThanhPhan,
      )}
      maxHeight={500}
    >
      <TableColumn
        label="Họ tên"
        minWidth={200}
        prop="KT_KDCL_CTDT_ThanhPhanHoiDong_HoTen_ChucDanh"
      />
      <TableColumn label="Chức vụ" minWidth={200}>
        {(row) => (
          <div className="-ml-1">
            {row.KT_KDCL_CTDT_ThanhPhanHoiDong_ChucVu.split(';').map((e) => (
              <Tag key={e}>{e}</Tag>
            ))}
          </div>
        )}
      </TableColumn>
      <TableColumn label="Nhiệm vụ" minWidth={120}>
        {(row) => (
          <p> {NhiemVuEnumText[row.KT_KDCL_CTDT_ThanhPhanHoiDong_NhiemVu]}</p>
        )}
      </TableColumn>
    </Table>
  )
}

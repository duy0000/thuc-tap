import PropTypes from 'prop-types'

import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import Checkbox from '@mui/material/Checkbox'
import { memo, useMemo } from 'react'

const TableBodyDSTB = memo(function TableBodyDSTB({
  listDSTB,
  listThietBiSelected,
  onSelected,
  itemPerPage,
  currentPage,
  onChangeQuantity,
}) {
  const renderBody = useMemo(
    () =>
      listDSTB.map((tb, index) => {
        const isItemSelected =
          listThietBiSelected &&
          listThietBiSelected?.find(
            (tbs) => tbs.DT_CVNB_TBGD_GuiYeuCau_IDTaiSan === tb.DT_QLTS_TS_ID,
          )
        return (
          <TableRow key={index} style={{ borderBottom: '1px solid #ccc' }}>
            <TableCell
              component="th"
              scope="row"
              sx={{
                textAlign: 'center',
                borderRight: '1px solid #ccc',
              }}
            >
              {itemPerPage * currentPage + index + 1}
            </TableCell>
            {/* END: STT */}
            <TableCell
              component="th"
              scope="row"
              sx={{
                textAlign: 'center',
                width: 20,
                borderRight: '1px solid #ccc',
              }}
            >
              <Checkbox
                color="primary"
                checked={!!isItemSelected}
                onClick={() => onSelected('single', tb)}
                inputProps={{
                  'aria-label': 'select all desserts',
                }}
              />
            </TableCell>
            {/* END: Checkbox */}
            <TableCell
              sx={{
                border: 'none',
                color: 'black',
                textAlign: 'center',
                borderRight: '1px solid #ccc',
                width: 100,
              }}
            >
              <p className="whitespace-nowrap">
                {tb.DT_QLTS_TS_MaTaiSan ?? 'Không xác định'}
              </p>
            </TableCell>
            {/* END: Mã tài sản */}
            <TableCell
              sx={{
                border: 'none',
                color: 'black',
                textAlign: 'left',
                borderRight: '1px solid #ccc',
                width: 100,
              }}
            >
              <p className="whitespace-nowrap">
                {tb.DT_QLTS_TS_TenTaiSan ?? 'Không xác định'}
              </p>
            </TableCell>
            {/* END: Tên tài sản */}
            <TableCell
              sx={{
                border: 'none',
                color: 'black',
                textAlign: 'center',
                borderRight: '1px solid #ccc',
                width: 100,
              }}
            >
              <p className="whitespace-nowrap">
                {tb.DT_QLTS_TS_LoaiTaiSan ?? 'Không xác định'}
              </p>
            </TableCell>
            {/* END: Loại */}
            <TableCell
              sx={{
                border: 'none',
                color: 'black',
                textAlign: 'center',
                borderRight: '1px solid #ccc',
                width: 120,
              }}
            >
              <p className="whitespace-nowrap">
                {tb.DT_QLP_Phong_TenPhong ?? 'Không xác định'}
              </p>
            </TableCell>
            {/* END: Phòng hiện tại */}
            <TableCell
              sx={{
                border: 'none',
                color: 'black',
                textAlign: 'center',
                borderRight: '1px solid #ccc',
                width: 120,
              }}
            >
              <p className="whitespace-nowrap">
                {tb.DT_QLTS_TS_HTTS_NSQL_HoTen ?? 'Không xác định'}
              </p>
            </TableCell>
            {/* END: Người quản lý */}
            <TableCell
              sx={{
                border: 'none',
                color: 'black',
                textAlign: 'center',
                width: 120,
              }}
            >
              <input
                type="number"
                min={1}
                step={1}
                disabled={!isItemSelected}
                value={
                  isItemSelected?.DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_SoLuong ||
                  1
                }
                className="w-full rounded border border-gray-400 p-2 text-center"
                onChange={(e) => {
                  const quantity = e.target.value
                  onChangeQuantity(tb.DT_QLTS_TS_ID, quantity)
                }}
              />
            </TableCell>
            {/* END: Số lượng */}
          </TableRow>
        )
      }),
    [listDSTB, listThietBiSelected],
  )

  return (
    <TableBody>{listDSTB && listDSTB.length > 0 ? renderBody : null}</TableBody>
  )
})

TableBodyDSTB.propTypes = {
  listDSTB: PropTypes.array,
  onSelected: PropTypes.func,
  isSelected: PropTypes.func,
  itemPerPage: PropTypes.number,
  currentPage: PropTypes.number,
  onChangeQuantity: PropTypes.func,
}

export default TableBodyDSTB

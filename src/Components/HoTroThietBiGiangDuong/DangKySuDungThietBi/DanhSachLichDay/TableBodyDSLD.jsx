import PropTypes from 'prop-types'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import { dayjs } from '@/Services/Utils/dayjs'
import { memo, useMemo } from 'react'

const TableBodyDSLD = memo(function TableBodyDSLD({
  listLichDay,
  lichDaySelected,
  onSelected,
  itemPerPage,
  currentPage,
}) {
  const renderBody = useMemo(
    () =>
      listLichDay.map((ld, index) => {
        const isItemSelected =
          lichDaySelected &&
          lichDaySelected?.find((item) => item?.Id === ld?.Id)
        return (
          <TableRow key={index} style={{ borderBottom: '1px solid #000' }}>
            <TableCell
              component="th"
              scope="row"
              sx={{
                width: 20,
                textAlign: 'center',
                borderRight: '1px solid #ccc',
              }}
            >
              {itemPerPage * currentPage + index + 1}
            </TableCell>
            {/* END: STT */}
            <TableCell
              scope="col"
              sx={{
                padding: '10px',
                margin: 0,
                textAlign: 'center',
                width: 40,
                borderRight: '1px solid #ccc',
              }}
            >
              <Checkbox
                color="primary"
                checked={!!isItemSelected}
                onClick={() => onSelected('single', ld)}
                inputProps={{
                  'aria-label': 'select all desserts',
                }}
              />
            </TableCell>
            {/* END: Checkbox */}
            <TableCell
              sx={{
                padding: 0,
                margin: 0,
                color: 'black',
                textAlign: 'center',
                borderRight: '1px solid #ccc',
                width: 142,
              }}
            >
              <p className="whitespace-nowrap">
                {ld.DT_CVNB_TBGD_LichHoc_NgayBatDau
                  ? dayjs(ld.DT_CVNB_TBGD_LichHoc_NgayBatDau).format(
                      'DD/MM/YYYY',
                    )
                  : 'Không xác định'}
              </p>
            </TableCell>
            {/* END: Ngày dạy */}
            <TableCell
              sx={{
                margin: 0,
                color: 'black',
                textAlign: 'left',
                borderRight: '1px solid #ccc',
                width: 256,
              }}
            >
              <p className="whitespace-nowrap">
                {ld.DT_CVNB_TBGD_LichHoc_TenPhong ?? 'Không xác định'}
              </p>
            </TableCell>
            {/* END: Tên phòng học */}
            <TableCell
              sx={{
                color: 'black',
                textAlign: 'center',
                borderRight: '1px solid #ccc',
                width: 80,
              }}
            >
              <p className="whitespace-nowrap">
                {ld.DT_CVNB_TBGD_LichHoc_MaLopHocPhan ?? 'Không xác định'}
              </p>
            </TableCell>
            {/* END: Mã lớp học phần */}
            <TableCell
              sx={{
                color: 'black',
                textAlign: 'center',
                borderRight: '1px solid #ccc',
                width: 180,
              }}
            >
              <p className="whitespace-nowrap">
                {ld.DT_CVNB_TBGD_LichHoc_TenHocPhan ?? 'Không xác định'}
              </p>
            </TableCell>
            {/* END: Tên môn học */}
            <TableCell
              sx={{
                color: 'black',
                textAlign: 'center',
                borderRight: '1px solid #ccc',
                width: 60,
              }}
            >
              <p className="whitespace-nowrap">
                {ld.DT_CVNB_TBGD_LichHoc_TuTiet ?? 'Không xác định'}
              </p>
            </TableCell>
            {/* END: Từ tiết */}
            <TableCell
              sx={{
                color: 'black',
                textAlign: 'center',
                width: 60,
              }}
            >
              <p>{ld.DT_CVNB_TBGD_LichHoc_DenTiet ?? 'Không xác định'}</p>
            </TableCell>
            {/* END: Đến tiết */}
          </TableRow>
        )
      }),
    [listLichDay, lichDaySelected],
  )

  return (
    <TableBody>
      {listLichDay && listLichDay?.length > 0 ? renderBody : null}
    </TableBody>
  )
})

TableBodyDSLD.propTypes = {
  listLichDay: PropTypes.array,
  onSelected: PropTypes.func,
  isLichDaySelected: PropTypes.func,
  itemPerPage: PropTypes.number,
  currentPage: PropTypes.number,
}

export default TableBodyDSLD

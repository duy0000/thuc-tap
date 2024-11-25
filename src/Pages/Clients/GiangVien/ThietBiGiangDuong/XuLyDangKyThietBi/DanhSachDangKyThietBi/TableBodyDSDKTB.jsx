import PropTypes from 'prop-types'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import { dayjs } from '@/Services/Utils/dayjs'
import { memo, useMemo } from 'react'

const TableBodyDSDKTB = memo(function TableBodyDSDKTB({
  listDKSDTB,
  dangKySelected,
  onSelected,
  itemPerPage,
  currentPage,
}) {
  const renderBody = useMemo(
    () =>
      listDKSDTB.map((ld, index) => {
        const isItemSelected =
          dangKySelected &&
          dangKySelected?.find(
            (item) =>
              item?.DT_CVNB_TBGD_GuiYeuCau_ID === ld?.DT_CVNB_TBGD_GuiYeuCau_ID,
          )
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
                padding: '4px',
                margin: 0,
                textAlign: 'center',
                width: 20,
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
                width: 80,
              }}
            >
              <p className="whitespace-nowrap">
                {ld.DT_CVNB_TBGD_GuiYeuCau_NgayDay
                  ? dayjs(ld.DT_CVNB_TBGD_GuiYeuCau_NgayDay).format(
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
                textAlign: 'center',
                borderRight: '1px solid #ccc',
                width: 30,
                padding: '10px',
              }}
            >
              <p className="whitespace-nowrap">
                {ld.DT_CVNB_TBGD_GuiYeuCau_NhanSuMuon_MaNhanSu ??
                  'Không xác định'}
              </p>
            </TableCell>
            {/* END: Mã nhân sự */}
            <TableCell
              sx={{
                color: 'black',
                textAlign: 'center',
                borderRight: '1px solid #ccc',
                width: 80,
              }}
            >
              <p className="whitespace-nowrap">
                {ld.DT_CVNB_TBGD_GuiYeuCau_NhanSuMuon_HoTen ?? 'Không xác định'}
              </p>
            </TableCell>
            {/* END: Tên nhân sự mượn */}
            <TableCell
              sx={{
                color: 'black',
                textAlign: 'center',
                borderRight: '1px solid #ccc',
                width: 100,
              }}
            >
              <p className="">
                {ld.DT_CVNB_TBGD_GuiYeuCau_TenPhongBan ?? 'Không xác định'}
              </p>
            </TableCell>
            {/* END: Khoa chủ quản */}
            <TableCell
              sx={{
                color: 'black',
                textAlign: 'left',
                borderRight: '1px solid #ccc',
                width: 80,
              }}
            >
              <p className="whitespace-nowrap">
                {ld.DT_CVNB_TBGD_GuiYeuCau_MaTaiSan +
                  ' - ' +
                  ld.DT_CVNB_TBGD_GuiYeuCau_TenTaiSan ?? 'Không xác định'}
              </p>
            </TableCell>
            {/* END: Mã - Tên thiết bị mượn */}
            <TableCell
              sx={{
                color: 'black',
                textAlign: 'center',
                borderRight: '1px solid #ccc',
                width: 40,
              }}
            >
              <p>
                {ld.DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_SoLuong ??
                  'Không xác định'}
              </p>
            </TableCell>
            {/* END: Số lượng mượn */}
            <TableCell
              sx={{
                color: 'black',
                borderRight: '1px solid #ccc',
                width: 60,
                padding: '10px',
              }}
            >
              <p>
                <b>&#8226; Cơ sở: </b>
                <span className="whitespace-nowrap">
                  {ld?.DT_CVNB_TBGD_GuiYeuCau_CoSo}
                </span>
              </p>
              <p>
                <b>&#8226; Địa điểm: </b>
                <span>{ld?.DT_CVNB_TBGD_GuiYeuCau_TenDiaDiem}</span>
              </p>
              <p>
                <b>&#8226; Tòa nhà: </b>
                <span>{ld?.DT_CVNB_TBGD_GuiYeuCau_TenToaNha}</span>
              </p>
              <p>
                <b>&#8226; Phòng học: </b>
                <span>{ld?.DT_CVNB_TBGD_GuiYeuCau_TenPhong}</span>
              </p>
            </TableCell>
            {/* END: Vị trí sử dụng */}
            <TableCell
              sx={{
                color: 'black',
                textAlign: 'center',
                borderRight: '1px solid #ccc',
                width: 40,
                padding: '2px',
              }}
            >
              <p>{ld.DT_CVNB_TBGD_GuiYeuCau_TuTiet ?? 'Không xác định'}</p>
            </TableCell>
            {/* END: Từ tiết */}
            <TableCell
              sx={{
                color: 'black',
                textAlign: 'center',
                width: 40,
                padding: '2px',
              }}
            >
              <p>{ld.DT_CVNB_TBGD_GuiYeuCau_DenTiet ?? 'Không xác định'}</p>
            </TableCell>
            {/* END: Đến tiết */}
          </TableRow>
        )
      }),
    [listDKSDTB, dangKySelected],
  )

  return (
    <TableBody>
      {listDKSDTB && listDKSDTB?.length > 0 ? (
        renderBody
      ) : (
        <TableRow>
          <TableCell colSpan={11}>
            <p className="text-center text-red-600 font-semibold">
              Không có dữ liệu!
            </p>
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  )
})

TableBodyDSDKTB.propTypes = {
  listDKSDTB: PropTypes.array,
  onSelected: PropTypes.func,
  isLichDaySelected: PropTypes.func,
  itemPerPage: PropTypes.number,
  currentPage: PropTypes.number,
}

export default TableBodyDSDKTB

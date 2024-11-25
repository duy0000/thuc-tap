import { useMemo, useState } from 'react'
import {
  Box,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import { filterData } from '@/Services/Utils/filterData'
import { DebounceInput } from 'react-debounce-input'

const DanhSachTaiSanTraCuu = (props) => {
  const { listTaiSan, itemPerPage, setItemPerPage, maTaiSanTheoID } = props
  const [currentPage, setCurrentPage] = useState(0)

  // VARIABLES
  const [filters, setFilters] = useState({
    DT_QLTS_TS_MaTaiSan: maTaiSanTheoID,
    DT_QLTS_TS_TenTaiSan: '',
    DT_QLTS_TS_LoaiTaiSan: '',
    DT_QLTS_TS_TenPhongHienTai: '',
    DT_QLTS_TS_HTTS_SD_HoTen: '',
    DT_QLTS_TS_HTTS_QL_HoTen: '',
    DT_QLTS_TS_SerialNumber: '',
  })
  // MUI TABLE
  const filteredBaoHong = filterData(listTaiSan, filters)
  const postsShow = useMemo(() => {
    return filteredBaoHong?.slice(
      itemPerPage * currentPage,
      itemPerPage * currentPage + itemPerPage,
    )
  }, [filteredBaoHong, itemPerPage, currentPage])

  // event handlers
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setItemPerPage(parseInt(event.target.value, 10))
    setCurrentPage(0)
  }
  const handleChangeValueFilter = (e) => {
    const { id, value } = e.target
    setFilters((prevData) => {
      return { ...prevData, [id]: value }
    })
  }
  const handleClearFilter = () => {
    setFilters({
      DT_QLTS_TS_HoTroThietBi_BaoHong_MaTaiSan: '',
      DT_QLTS_TS_HoTroThietBi_BaoHong_TenTaiSan: '',
      DT_QLTS_TS_LoaiTaiSan: '',
      DT_QLTS_TS_TenPhongHienTai: '',
      DT_QLTS_TS_NhapKho_TenKho_Ten: '',
      DT_QLTS_TS_SerialNumber: '',
    })
  }

  // Table Head MUI
  function EnhancedTableHead() {
    return (
      <TableHead sx={{ backgroundColor: '#336699' }}>
        <TableRow>
          <TableCell
            align="center"
            sx={{
              fontWeight: '700',
              textTransform: 'uppercase',
              color: '#ffffff',
              borderRight: '1px solid #ccc',
            }}
          >
            STT
          </TableCell>
          <TableCell
            align="center"
            sx={{
              fontWeight: '700',
              textTransform: 'uppercase',
              color: '#ffffff',
              borderRight: '1px solid #ccc',
            }}
          >
            Mã tài sản
          </TableCell>
          <TableCell
            align="center"
            sx={{
              fontWeight: '700',
              textTransform: 'uppercase',
              color: '#ffffff',
              borderRight: '1px solid #ccc',
            }}
          >
            Tên tài sản
          </TableCell>
          <TableCell
            align="center"
            sx={{
              fontWeight: '700',
              textTransform: 'uppercase',
              color: '#ffffff',
              borderRight: '1px solid #ccc',
            }}
          >
            Loại tài sản
          </TableCell>
          <TableCell
            align="center"
            sx={{
              fontWeight: '700',
              textTransform: 'uppercase',
              color: '#ffffff',
              borderRight: '1px solid #ccc',
            }}
          >
            Phòng hiện tại
          </TableCell>

          <TableCell
            align="center"
            sx={{
              fontWeight: '700',
              textTransform: 'uppercase',
              color: '#ffffff',
              borderRight: '1px solid #ccc',
            }}
          >
            SerialNumber
          </TableCell>
          <TableCell
            align="center"
            sx={{
              fontWeight: '700',
              textTransform: 'uppercase',
              color: '#ffffff',
              borderRight: '1px solid #ccc',
            }}
          >
            Người quản lý
          </TableCell>
          <TableCell
            align="center"
            sx={{
              fontWeight: '700',
              textTransform: 'uppercase',
              color: '#ffffff',
              borderRight: '1px solid #ccc',
            }}
          >
            Người sử dụng
          </TableCell>
        </TableRow>
        <TableRow sx={{ backgroundColor: '#ffffff' }}>
          <TableCell
            align="center"
            sx={{ color: '#ccc', borderRight: '1px solid #ccc' }}
          >
            <button
              type="button"
              onClick={() => {
                handleClearFilter()
              }}
              className="text-red whitespace-nowrap rounded-lg border border-red-600 bg-white px-3 py-2 font-bold text-red-600 hover:bg-red-100"
            >
              Xóa lọc
            </button>
          </TableCell>

          <TableCell
            align="center"
            sx={{
              whiteSpace: 'nowrap',
              color: '#000',
              minWidth: '120px',
              borderRight: '1px solid #ccc',
            }}
          >
            <DebounceInput
              className="border-b p-2 focus:outline-slate-200 w-full"
              id="DT_QLTS_TS_MaTaiSan"
              minLength={0}
              debounceTimeout={1000}
              value={filters.DT_QLTS_TS_MaTaiSan ?? ''}
              onChange={handleChangeValueFilter}
              placeholder="Tìm mã tài sản"
            />
          </TableCell>
          <TableCell
            align="center"
            sx={{
              whiteSpace: 'nowrap',
              color: '#000',
              minWidth: '320px',
              borderRight: '1px solid #ccc',
            }}
          >
            <DebounceInput
              className="border-b p-2 focus:outline-slate-200  w-full"
              id="DT_QLTS_TS_TenTaiSan"
              minLength={0}
              debounceTimeout={1000}
              value={filters.DT_QLTS_TS_TenTaiSan ?? ''}
              onChange={handleChangeValueFilter}
              placeholder="Tìm tên tài sản"
            />
          </TableCell>
          <TableCell
            align="center"
            sx={{
              color: '#000',
              borderRight: '1px solid #ccc',
              minWidth: '130px',
            }}
          >
            <DebounceInput
              className="border-b p-2 focus:outline-slate-200 w-full"
              id="DT_QLTS_TS_LoaiTaiSan"
              minLength={0}
              debounceTimeout={1000}
              value={filters.DT_QLTS_TS_LoaiTaiSan ?? ''}
              onChange={handleChangeValueFilter}
              placeholder="Tìm loại tài sản"
            />
          </TableCell>
          <TableCell
            align="center"
            sx={{
              color: '#000',
              borderRight: '1px solid #ccc',
              minWidth: '160px',
            }}
          >
            <DebounceInput
              className="border-b p-2 focus:outline-slate-200 w-full"
              id="DT_QLTS_TS_TenPhongHienTai"
              minLength={0}
              debounceTimeout={1000}
              value={filters.DT_QLTS_TS_TenPhongHienTai ?? ''}
              onChange={handleChangeValueFilter}
              placeholder="Phòng hiện tại"
            />
          </TableCell>

          <TableCell
            align="center"
            sx={{
              color: '#000',
              borderRight: '1px solid #ccc',
              minWidth: '100px',
            }}
          >
            <DebounceInput
              className="border-b p-2 focus:outline-slate-200 w-full"
              id="DT_QLTS_TS_SerialNumber"
              minLength={0}
              debounceTimeout={1000}
              value={filters.DT_QLTS_TS_SerialNumber ?? ''}
              onChange={handleChangeValueFilter}
              placeholder="Tìm SerialNumber"
            />
          </TableCell>
          <TableCell
            align="center"
            sx={{
              color: '#000',
              borderRight: '1px solid #ccc',
              minWidth: '160px',
            }}
          >
            <DebounceInput
              className="border-b p-2 focus:outline-slate-200 w-full"
              id="DT_QLTS_TS_HTTS_QL_HoTen"
              minLength={0}
              debounceTimeout={1000}
              value={filters.DT_QLTS_TS_HTTS_QL_HoTen ?? ''}
              onChange={handleChangeValueFilter}
              placeholder="Tìm"
            />
          </TableCell>
          <TableCell
            align="center"
            sx={{
              color: '#000',
              borderRight: '1px solid #ccc',
              minWidth: '160px',
            }}
          >
            <DebounceInput
              className="border-b p-2 focus:outline-slate-200 w-full"
              id="DT_QLTS_TS_HTTS_SD_HoTen"
              minLength={0}
              debounceTimeout={1000}
              value={filters.DT_QLTS_TS_HTTS_SD_HoTen ?? ''}
              onChange={handleChangeValueFilter}
              placeholder="Tìm"
            />
          </TableCell>
        </TableRow>
      </TableHead>
    )
  }

  return (
    <>
      {listTaiSan.length > 0 ? (
        <Box sx={{ width: '100%', padding: '3rem 1rem' }}>
          <Paper
            sx={{
              width: '100%',
              mb: 2,
              overflow: 'hidden',
              backgroundColor: '#ffffff',
            }}
          >
            <TableContainer>
              <Table aria-labelledby="tableTitle" size={'small'}>
                <EnhancedTableHead rowCount={listTaiSan?.length} />
                {postsShow.map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                      sx={{
                        cursor: 'pointer',
                      }}
                    >
                      <TableCell
                        align="center"
                        sx={{ borderRight: '1px solid #ccc' }}
                      >
                        {itemPerPage * currentPage + index + 1}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        align="center"
                        sx={{ borderRight: '1px solid #ccc' }}
                        id={labelId}
                      >
                        {row.DT_QLTS_TS_MaTaiSan}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ borderRight: '1px solid #ccc' }}
                      >
                        {row.DT_QLTS_TS_TenTaiSan}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ borderRight: '1px solid #ccc' }}
                      >
                        {row.DT_QLTS_TS_LoaiTaiSan}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ borderRight: '1px solid #ccc' }}
                      >
                        {row.DT_QLTS_TS_TenPhongHienTai}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ borderRight: '1px solid #ccc' }}
                      >
                        {row.DT_QLTS_TS_SerialNumber}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ borderRight: '1px solid #ccc' }}
                      >
                        {row.DT_QLTS_TS_HTTS_QL_HoTen}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ borderRight: '1px solid #ccc' }}
                      >
                        {row.DT_QLTS_TS_HTTS_SD_HoTen}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </Table>
            </TableContainer>
            <TablePagination
              labelRowsPerPage="Số yêu cầu hiển thị"
              rowsPerPageOptions={[10, 20, 30, 40, 50, 100]}
              component="div"
              count={listTaiSan?.length}
              rowsPerPage={itemPerPage}
              page={currentPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      ) : (
        <p>Không có tài sản nào</p>
      )}
    </>
  )
}

export default DanhSachTaiSanTraCuu

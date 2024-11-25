import { useMemo, useState } from 'react'
import {
  Box,
  Checkbox,
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

const DanhSachTaiSan = (props) => {
  const {
    listTaiSan,
    selectedTaiSan,
    onSelectTaiSan,
    nhomBaoHong,
    onShowDetailTaiSan,
  } = props

  // VARIABLES
  const initialItemPerPage = 10
  const [itemPerPage, setItemPerPage] = useState(initialItemPerPage)
  const [currentPage, setCurrentPage] = useState(0)
  const [filters, setFilters] = useState({
    DT_QLTS_TS_HoTroThietBi_BaoHong_MaTaiSan: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_TenTaiSan: '',
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
              width: '40px',
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
            Chọn
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
            Mã <span>{nhomBaoHong.value ?? 'Tài sản'}</span>
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
            Tên <span>{nhomBaoHong.value ?? 'Tài sản'}</span>
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
            Xem chi tiết
          </TableCell>
        </TableRow>
        <TableRow sx={{ backgroundColor: '#ffffff' }}>
          <TableCell
            align="center"
            sx={{ color: '#ccc', borderRight: '1px solid #ccc' }}
          >
            #
          </TableCell>
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
              color: '#ccc',
              width: '60px',
              borderRight: '1px solid #ccc',
            }}
          >
            <DebounceInput
              className="border-b p-2 focus:outline-slate-200 w-28"
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
              color: '#333',
              minWidth: '140px',
              borderRight: '1px solid #ccc',
            }}
          >
            <DebounceInput
              className="border-b p-2 focus:outline-slate-200"
              id="DT_QLTS_TS_TenTaiSan"
              minLength={0}
              debounceTimeout={200}
              value={filters.DT_QLTS_TS_TenTaiSan ?? ''}
              onChange={handleChangeValueFilter}
              placeholder="Tìm tên tài sản"
            />
          </TableCell>
          <TableCell
            align="center"
            sx={{
              color: '#ccc',
              borderRight: '1px solid #ccc',
              width: '140px',
            }}
          ></TableCell>
        </TableRow>
      </TableHead>
    )
  }

  return (
    <>
      {listTaiSan && listTaiSan?.length > 0 ? (
        <Box sx={{ width: '100%', padding: '0' }}>
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
                <EnhancedTableHead
                  numSelected={selectedTaiSan?.length}
                  rowCount={listTaiSan?.length}
                />
                {postsShow.map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      //   aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      //   selected={isItemSelected}
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
                        padding="checkbox"
                        align="center"
                        sx={{ borderRight: '1px solid #ccc' }}
                      >
                        <Checkbox
                          color="primary"
                          onClick={(event) => onSelectTaiSan(event, row)}
                          checked={
                            row.DT_QLTS_TS_ID ===
                            selectedTaiSan[0]?.DT_QLTS_TS_ID
                          }
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
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
                        sx={{ color: '#ccc', borderRight: '1px solid #ccc' }}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            onShowDetailTaiSan(row)
                          }}
                          className="cursor-pointer rounded-full bg-sky-600 px-3 py-2 text-center text-white hover:opacity-80"
                        >
                          Xem chi tiết
                        </button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </Table>
            </TableContainer>
            <TablePagination
              labelRowsPerPage="Số yêu cầu hiển thị"
              rowsPerPageOptions={[5, 10, 15, 25]}
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
        <p className="text-center py-1 rounded bg-slate-100 font-semibold">
          Hiện tại chưa có thông tin thiết bị/phần mềm nào
        </p>
      )}
    </>
  )
}

export default DanhSachTaiSan

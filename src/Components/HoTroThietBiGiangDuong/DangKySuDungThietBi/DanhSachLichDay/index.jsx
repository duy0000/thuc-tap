import { memo, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'
import TableHeadDSLD from './TableHeadDSLD'
import TablePaginationDSLD from './TablePaginationDSLD'
import TableBodyDSLD from './TableBodyDSLD'
import { filterData } from '@/Services/Utils/filterData'

const DanhSachLichDay = memo(function DanhSachLichDay({
  listLichDay,
  lichDaySelected,
  onSelectedLichDay,
}) {
  const initialDataFilter = {
    DT_CVNB_TBGD_LichHoc_NgayBatDau: '',
    DT_CVNB_TBGD_LichHoc_TenPhong: '',
    DT_CVNB_TBGD_LichHoc_MaLopHocPhan: '',
    DT_CVNB_TBGD_LichHoc_TenHocPhan: '',
    DT_CVNB_TBGD_LichHoc_TuTiet: '',
    DT_CVNB_TBGD_LichHoc_DenTiet: '',
  }
  const [columnFilters, setColumnFilters] = useState(initialDataFilter)

  const [pagination, setPagination] = useState({
    currentPage: 0,
    itemPerPage: 5,
  })

  const filteredLichDay = filterData(listLichDay, columnFilters)
  const _showDataWithPagination = useMemo(() => {
    return filteredLichDay?.slice(
      pagination.itemPerPage * pagination.currentPage,
      pagination.itemPerPage * pagination.currentPage + pagination.itemPerPage,
    )
  }, [filteredLichDay, pagination.itemPerPage, pagination.currentPage])

  const handleChangeValueFilter = (e) => {
    const { id, value } = e.target
    setColumnFilters((prevData) => {
      return { ...prevData, [id]: value }
    })
  }
  // const handleClearFilter = () => {
  //   setColumnFilters(initialDataFilter)
  // }

  return (
    <div className="w-full overflow-x-auto">
      <TableContainer component={Paper}>
        <Table style={{ minWidth: 650, border: '1px solid #ccc' }}>
          <TableHeadDSLD
            numSelected={lichDaySelected?.length || 0}
            onSelectAllClick={onSelectedLichDay}
            rowCount={listLichDay?.length || 0}
            onChangeFilter={handleChangeValueFilter}
          />
          {_showDataWithPagination?.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={8}
                style={{
                  color: 'red',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                Không có dữ liệu
              </TableCell>
            </TableRow>
          )}
          <TableBodyDSLD
            listLichDay={_showDataWithPagination}
            currentPage={pagination.currentPage}
            itemPerPage={pagination.itemPerPage}
            lichDaySelected={lichDaySelected}
            onSelected={onSelectedLichDay}
          />
        </Table>
        <TablePaginationDSLD
          currentPage={pagination.currentPage}
          itemPerPage={pagination.itemPerPage}
          totalItem={listLichDay?.length || 0}
          onChangePage={(event, newPage) =>
            setPagination({ ...pagination, currentPage: newPage })
          }
          onRowsPerPageChange={(event) =>
            setPagination({ ...pagination, itemPerPage: event.target.value })
          }
        />
      </TableContainer>
    </div>
  )
})

DanhSachLichDay.propTypes = {
  listLichDay: PropTypes.array.isRequired,
  lichDaySelected: PropTypes.array.isRequired,
  onSelectedLichDay: PropTypes.func.isRequired,
}

export default DanhSachLichDay

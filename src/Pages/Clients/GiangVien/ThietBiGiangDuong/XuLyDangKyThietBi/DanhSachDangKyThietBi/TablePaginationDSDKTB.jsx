import PropTypes from 'prop-types'
import TablePagination from '@mui/material/TablePagination'
import { memo } from 'react'

const TablePaginationDSDKTB = memo(function TablePaginationDSDKTB({
  totalItem,
  itemPerPage,
  currentPage,
  onChangePage,
  onRowsPerPageChange,
}) {
  return (
    <TablePagination
      labelRowsPerPage="Số dòng hiển thị"
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={totalItem}
      rowsPerPage={itemPerPage}
      page={currentPage}
      onPageChange={onChangePage}
      onRowsPerPageChange={onRowsPerPageChange}
    />
  )
})

TablePaginationDSDKTB.propTypes = {
  totalItem: PropTypes.number,
  itemPerPage: PropTypes.number,
  currentPage: PropTypes.number,
  onChangePage: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
}

export default TablePaginationDSDKTB

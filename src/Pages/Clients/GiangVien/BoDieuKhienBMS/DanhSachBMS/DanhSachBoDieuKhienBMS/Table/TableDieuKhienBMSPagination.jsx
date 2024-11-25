import TablePagination from '@mui/material/TablePagination'
import { useState } from 'react'

const TableDieuKhienBMSPagination = (props) => {
  const {
    totalItem,
    itemPerPage,
    currentPage,
    onChangePage,
    onRowsPerPageChange,
  } = props
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
}

export default TableDieuKhienBMSPagination

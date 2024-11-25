import TablePagination from '@mui/material/TablePagination'

const TablePaginationDSTB = ({
  totalItem,
  itemPerPage,
  currentPage,
  onChangePage,
  onRowsPerPageChange,
}) => {
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

export default TablePaginationDSTB

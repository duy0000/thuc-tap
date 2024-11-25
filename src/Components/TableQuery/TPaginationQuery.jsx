import { TablePagination } from '@mui/material'
import PropTypes from 'prop-types'

function TPaginationQuery({ table, itemPerPage, currentPage }) {
  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 20, 30, 40, 50, 100]}
      component="div"
      count={table.getFilteredRowModel().rows.length}
      rowsPerPage={itemPerPage || 5}
      page={currentPage || 0}
      labelRowsPerPage="Số hàng/trang"
      slotProps={{
        select: {
          inputProps: { 'aria-label': 'Số hàng/trang' },
          native: true,
        },
      }}
      onPageChange={(_, page) => {
        table.setPageIndex(page)
      }}
      onRowsPerPageChange={(e) => {
        const size = e.target.value ? Number(e.target.value) : 10
        table.setPageSize(size)
      }}
    />
  )
}

TPaginationQuery.propTypes = {
  table: PropTypes.any,
}

TPaginationQuery.displayName = 'TPaginationQuery'

export default TPaginationQuery

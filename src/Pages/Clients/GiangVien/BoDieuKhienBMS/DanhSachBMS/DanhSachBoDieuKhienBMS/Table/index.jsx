import { Paper, Table, TableContainer } from '@mui/material'
import PropTypes from 'prop-types'
import TableDieuKhienBMSHeader from './TableDieuKhienBMSHeader'
import TableDieuKhienBMSBody from './TableDieuKhienBMSBody'
import TableDieuKhienBMSPagination from './TableDieuKhienBMSPagination'

const TableDieuKhienBMS = (props) => {
  const {
    listDieuKhienBMS,
    valueColumnFilters,
    valueItemPerPage,
    valueCurrentPage,
    numSelected,
    rowCount,
    onSelectAllClick,
    onSelected,
    isSelected,
    onIsHandling,
    onChangeValueFilter,
    onClearFilter,
    onChangePage,
    onChangeItemPerPage,
  } = props

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableDieuKhienBMSHeader
          onSelectAllClick={onSelectAllClick}
          numSelected={numSelected}
          rowCount={rowCount}
          onChangeFilter={onChangeValueFilter}
          onClearFilter={onClearFilter}
          dataFilter={valueColumnFilters}
        />
        <TableDieuKhienBMSBody
          itemPerPage={valueItemPerPage}
          currentPage={valueCurrentPage}
          listDieuKhienBMS={listDieuKhienBMS}
          onSelected={onSelected}
          isSelected={isSelected}
          onIsHandling={onIsHandling}
        />
      </Table>
      <TableDieuKhienBMSPagination
        totalItem={rowCount}
        itemPerPage={valueItemPerPage}
        currentPage={valueCurrentPage}
        onChangePage={onChangePage}
        onRowsPerPageChange={onChangeItemPerPage}
      />
    </TableContainer>
  )
}

TableDieuKhienBMS.propTypes = {
  listDieuKhienBMS: PropTypes.array,
  numSelected: PropTypes.number,
  rowCount: PropTypes.number,
  onSelectAllClick: PropTypes.func,
  onSelected: PropTypes.func,
  isSelected: PropTypes.func,
  onIsHandling: PropTypes.func,
}

export default TableDieuKhienBMS

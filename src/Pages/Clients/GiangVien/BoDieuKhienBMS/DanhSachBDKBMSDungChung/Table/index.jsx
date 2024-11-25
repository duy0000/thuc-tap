import { Paper, Table, TableContainer } from '@mui/material'
import PropTypes from 'prop-types'
import { useState } from 'react'
import TblHeaderBDKBMS from './TblHeaderBDKBMS'
import TblBodyBDKBMS from './TblBodyBDKBMS'
import TblPaginationBDKBMS from './TblPaginationBDKBMS'

const TableDanhSachBDKBMSDungChung = (props) => {
  const {
    listDieuKhienBMS,
    numSelected,
    rowCount,
    onSelectAllClick,
    onSelected,
    isSelected,
  } = props

  const [currentPage, setCurrentPage] = useState(0)
  const [itemPerPage, setItemPerPage] = useState(10)

  // List data for Pagination
  const visiableDataRows =
    listDieuKhienBMS?.length > 0
      ? listDieuKhienBMS.slice(
          currentPage * itemPerPage,
          currentPage * itemPerPage + itemPerPage,
        )
      : []

  // event: Change itemPerPage
  const handleChangeItemPerPage = (event) => {
    setItemPerPage(parseInt(event.target.value))
    setCurrentPage(0)
  }

  // event: Change Page
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage)
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TblHeaderBDKBMS
          onSelectAllClick={onSelectAllClick}
          numSelected={numSelected}
          rowCount={rowCount}
        />
        <TblBodyBDKBMS
          listDieuKhienBMS={visiableDataRows}
          onSelected={onSelected}
          isSelected={isSelected}
          itemPerPage={itemPerPage}
          currentPage={currentPage}
        />
      </Table>
      <TblPaginationBDKBMS
        totalItem={rowCount}
        itemPerPage={itemPerPage}
        currentPage={currentPage}
        onChangePage={handleChangePage}
        onRowsPerPageChange={handleChangeItemPerPage}
      />
    </TableContainer>
  )
}

TableDanhSachBDKBMSDungChung.propTypes = {
  listDieuKhienBMS: PropTypes.array,
  numSelected: PropTypes.number,
  rowCount: PropTypes.number,
  onSelectAllClick: PropTypes.func,
  onSelected: PropTypes.func,
  isSelected: PropTypes.func,
}

export default TableDanhSachBDKBMSDungChung

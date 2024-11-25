import { Paper, Table, TableContainer } from '@mui/material'
import TableBMSMKNHeader from './TableBMSMKNHeader'
import TableBMSMKNBody from './TableBMSMKNBody'
import TableBMSMKNPagination from './TableBMSMKNPagination'

const TableBMSMKN = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBMSMKNHeader />
        <TableBMSMKNBody />
      </Table>
      <TableBMSMKNPagination />
    </TableContainer>
  )
}

export default TableBMSMKN

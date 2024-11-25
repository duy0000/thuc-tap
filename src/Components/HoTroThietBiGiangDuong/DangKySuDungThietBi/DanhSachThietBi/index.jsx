import { Paper, Table, TableContainer } from '@mui/material'
import PropTypes from 'prop-types'
import { useMemo, useState } from 'react'
import TableHeadDSTB from './TableHeadDSTB'
import TableBodyDSTB from './TableBodyDSTB'
import TablePaginationDSTB from './TablePaginationDSTB'
import { filterData } from '@/Services/Utils/filterData'

function DanhSachThietBi({
  listThietBi,
  listThietBiSelected,
  onSelectedTaiSan,
  onChangeQuantity,
}) {
  const initialDataFilter = {
    DT_QLTS_TS_MaTaiSan: '',
    DT_QLTS_TS_TenTaiSan: '',
    DT_QLTS_TS_LoaiTaiSan: '',
    DT_QLP_Phong_TenPhong: '',
    DT_QLTS_TS_HTTS_NSQL_HoTen: '',
  }
  const [columnFilters, setColumnFilters] = useState(initialDataFilter)
  const [pagination, setPagination] = useState({
    currentPage: 0,
    itemPerPage: 5,
  })

  const filteredThietBi = filterData(listThietBi, columnFilters)
  const _showDataWithPagination = useMemo(() => {
    return filteredThietBi?.slice(
      pagination.itemPerPage * pagination.currentPage,
      pagination.itemPerPage * pagination.currentPage + pagination.itemPerPage,
    )
  }, [filteredThietBi, pagination.itemPerPage, pagination.currentPage])

  const handleChangeValueFilter = (e) => {
    const { id, value } = e.target
    setColumnFilters((prevData) => {
      return { ...prevData, [id]: value }
    })
  }

  return (
    <div className="w-full overflow-x-auto">
      <TableContainer component={Paper}>
        <Table style={{ minWidth: 650, border: '1px solid #ccc' }}>
          <TableHeadDSTB
            numSelected={listThietBiSelected?.length || 0}
            onSelectAllClick={onSelectedTaiSan}
            rowCount={listThietBi.length}
            onChangeValueFilter={handleChangeValueFilter}
          />
          <TableBodyDSTB
            listDSTB={_showDataWithPagination}
            listThietBiSelected={listThietBiSelected}
            currentPage={pagination.currentPage}
            itemPerPage={pagination.itemPerPage}
            onSelected={onSelectedTaiSan}
            onChangeQuantity={onChangeQuantity}
          />
        </Table>
        <TablePaginationDSTB
          totalItem={listThietBi.length}
          itemPerPage={pagination.itemPerPage}
          currentPage={pagination.currentPage}
          onChangePage={(event, newPage) =>
            setPagination((prevPagination) => ({
              ...prevPagination,
              currentPage: newPage,
            }))
          }
          onRowsPerPageChange={(event) => {
            setPagination((prevPagination) => ({
              ...prevPagination,
              itemPerPage: parseInt(event.target.value),
            }))
          }}
        />
      </TableContainer>
    </div>
  )
}

DanhSachThietBi.propTypes = {
  listThietBi: PropTypes.array.isRequired,
  listThietBiSelected: PropTypes.array.isRequired,
  onSelectedTaiSan: PropTypes.func.isRequired,
  onChangeQuantity: PropTypes.func.isRequired,
}

export default DanhSachThietBi

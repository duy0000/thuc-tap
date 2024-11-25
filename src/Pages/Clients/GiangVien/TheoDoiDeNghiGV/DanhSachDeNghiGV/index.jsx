import { memo, useMemo, useState } from 'react'
import { Paper, Table, TableContainer } from '@mui/material'
import { filterData } from '@/Services/Utils/filterData'
import Loading from '@/Components/Loading/Loading'
import TablePaginationDSDNGV from './TablePaginationDSDNGV'
import TableHeadDSDNGV from './TableHeadDSDNGV'
import TableBodyDSDNGV from './TableBodyDSDNGV'
import { useQuery } from '@tanstack/react-query'
import { apiTheoDoiDeNghiGV } from '@/Apis/ApiGiangVien/TheoDoiDeNghiGV'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV'
import { THEO_DOI_DE_NGHI_GV } from '@/Services/QueryStores/QueryKeyStores/TheoDoiDeNghiGV.querykey'

const DanhSachDeNghiGV = memo(function DanhSachDeNghiGV() {
  const DataCBGV = DataCanBoGV()
  const initialDataFilter = {
    NgayGui: '',
    TenThuTuc: '',
    TenTrangThai: '',
  }
  const [columnFilters, setColumnFilters] = useState(initialDataFilter)

  const [pagination, setPagination] = useState({
    currentPage: 0,
    itemPerPage: 5,
  })

  const { data: listDeNghiGV, isLoading } = useQuery({
    queryKey: [
      THEO_DOI_DE_NGHI_GV.SP_HT_USER_Load_YeuCau_ByMaNhanSu,
      DataCBGV.MaNhanSu,
    ],
    queryFn: async () => {
      const response = await apiTheoDoiDeNghiGV({
        MaNhanSu: DataCBGV.MaNhanSu,
      })
      return response
    },
  })
  const _listTheoDoiDeNghi = useMemo(() => {
    return listDeNghiGV?.data?.body
  }, [listDeNghiGV])

  const filterDeNghi = filterData(_listTheoDoiDeNghi, columnFilters)

  const _showDataWithPagination = useMemo(() => {
    return filterDeNghi?.slice(
      pagination.itemPerPage * pagination.currentPage,
      pagination.itemPerPage * pagination.currentPage + pagination.itemPerPage,
    )
  }, [
    filterDeNghi,
    pagination.itemPerPage,
    pagination.currentPage,
    listDeNghiGV,
    isLoading,
    _listTheoDoiDeNghi,
  ])

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
          <TableHeadDSDNGV onChangeFilter={handleChangeValueFilter} />
          {isLoading ? (
            <Loading />
          ) : (
            <TableBodyDSDNGV
              listTheoDoiDeNghi={_showDataWithPagination}
              currentPage={pagination.currentPage}
              itemPerPage={pagination.itemPerPage}
            />
          )}
        </Table>
        <TablePaginationDSDNGV
          currentPage={pagination.currentPage}
          itemPerPage={pagination.itemPerPage}
          totalItem={_listTheoDoiDeNghi?.length || 0}
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
export default DanhSachDeNghiGV

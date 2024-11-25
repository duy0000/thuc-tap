import { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import TableQuery from '@/Components/TableQuery'
import {
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { columns } from './makeData'
import useCTGVTTKLTheoDoiNhanSuStore from '@/Services/QueryStores/QueryFunc/GiangVien/CongTacGiangVien/CTGVTTKLTheoDoiNhanSuStore'
import Loading from './../../../../../../Components/Loading/Loading'

function NhanSuView(props) {
  // const [data, setData] = useState(makeData)

  const { data, isLoading } = useCTGVTTKLTheoDoiNhanSuStore()

  console.log('>>> 1 - NhanSuView - fetching NhanSu: ', data)

  const [columnFilters, setColumnFilters] = useState([])

  const table = useReactTable({
    data: data?.List_NS || [],
    columns,
    state: {
      columnFilters,
    },
    columnResizeMode: 'onChange',
    columnResizeDirection: 'rtl',
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client-side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(), // client-side faceting
    getFacetedUniqueValues: getFacetedUniqueValues(), // generate unique values for select filter/autocomplete
    getFacetedMinMaxValues: getFacetedMinMaxValues(), // generate min/max values for range filter
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  })

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="w-full max-h-[900px] overflow-x-auto">
      <TableQuery dataReactTable={table} classNameTable={'!w-full'}>
        <TableQuery.Header heads={table.getHeaderGroups()} />
        <TableQuery.Body rows={table.getGroupedRowModel().rows} />
        <TableQuery.Pagination table={table} />
      </TableQuery>
    </div>
  )
}

NhanSuView.propTypes = {}

export default NhanSuView

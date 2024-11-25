import { memo, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Paper, Table, TableContainer } from '@mui/material'
import TableHeadDSDKTB from './TableHeadDSDKTB'
import TableBodyDSDKTB from './TableBodyDSDKTB'
import TablePaginationDSDKTB from './TablePaginationDSDKTB'
import { filterDataWithMultipleGroupKey } from '@/Services/Utils/filterData'
import Loading from '@/Components/Loading/Loading'

const DanhSachDangKyThietBi = memo(function DanhSachDangKyThietBi({
  loading,
  listTBGDDKTB,
  dangKySelected,
  onSelectedDangKy,
}) {
  const initialDataFilter = {
    DT_CVNB_TBGD_GuiYeuCau_NgayDay: '',
    DT_CVNB_TBGD_GuiYeuCau_NhanSuMuon_MaNhanSu: '',
    DT_CVNB_TBGD_GuiYeuCau_NhanSuMuon_HoTen: '',
    DT_CVNB_TBGD_GuiYeuCau_TenPhongBan: '',
    DT_CVNB_TBGD_GuiYeuCau_MaTaiSan: '',
    DT_CVNB_TBGD_GuiYeuCau_TenTaiSan: '',
    DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_SoLuong: '',
    DT_CVNB_TBGD_GuiYeuCau_CoSo: '',
    DT_CVNB_TBGD_GuiYeuCau_TenDiaDiem: '',
    DT_CVNB_TBGD_GuiYeuCau_TenToaNha: '',
    DT_CVNB_TBGD_GuiYeuCau_TenPhong: '',
    DT_CVNB_TBGD_GuiYeuCau_TuTiet: '',
    DT_CVNB_TBGD_GuiYeuCau_DenTiet: '',
  }
  const [columnFilters, setColumnFilters] = useState(initialDataFilter)

  const [pagination, setPagination] = useState({
    currentPage: 0,
    itemPerPage: 5,
  })

  const searchFieldsGroupTaiSan = [
    'DT_CVNB_TBGD_GuiYeuCau_MaTaiSan',
    'DT_CVNB_TBGD_GuiYeuCau_TenTaiSan',
  ]

  const searchFieldsGroupViTri = [
    'DT_CVNB_TBGD_GuiYeuCau_CoSo',
    'DT_CVNB_TBGD_GuiYeuCau_TenDiaDiem',
    'DT_CVNB_TBGD_GuiYeuCau_TenToaNha',
    'DT_CVNB_TBGD_GuiYeuCau_TenPhong',
  ]

  const searchFieldsGroups = [
    ['DT_CVNB_TBGD_GuiYeuCau_NgayDay'],

    ['DT_CVNB_TBGD_GuiYeuCau_NhanSuMuon_MaNhanSu'],

    ['DT_CVNB_TBGD_GuiYeuCau_NhanSuMuon_HoTen'],

    ['DT_CVNB_TBGD_GuiYeuCau_TenPhongBan'],
    ['DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_SoLuong'],

    searchFieldsGroupTaiSan,
    searchFieldsGroupViTri,
    ['DT_CVNB_TBGD_GuiYeuCau_TuTiet'],
    ['DT_CVNB_TBGD_GuiYeuCau_DenTiet'],
  ]

  const filteredLichDay = filterDataWithMultipleGroupKey(
    listTBGDDKTB,
    columnFilters,
    searchFieldsGroups,
  )

  const _showDataWithPagination = useMemo(() => {
    return filteredLichDay?.slice(
      pagination.itemPerPage * pagination.currentPage,
      pagination.itemPerPage * pagination.currentPage + pagination.itemPerPage,
    )
  }, [filteredLichDay, pagination.itemPerPage, pagination.currentPage])

  const handleChangeValueFilter = (e) => {
    const { id, value } = e.target
    const ids = id.split(',')

    if (ids.length > 0) {
      setColumnFilters((prevData) => {
        const newFilters = { ...prevData }
        ids.forEach((singleId) => {
          newFilters[singleId.trim()] = value
        })
        return newFilters
      })
    } else {
      setColumnFilters((prevData) => {
        return { ...prevData, [id]: value }
      })
    }
  }

  return (
    <div className="w-full overflow-x-auto">
      <TableContainer component={Paper}>
        <Table style={{ minWidth: 650, border: '1px solid #ccc' }}>
          <TableHeadDSDKTB
            numSelected={dangKySelected?.length || 0}
            onSelectAllClick={onSelectedDangKy}
            rowCount={listTBGDDKTB?.length || 0}
            onChangeFilter={handleChangeValueFilter}
            searchFieldsGroupTaiSan={searchFieldsGroupTaiSan}
            searchFieldsGroupViTri={searchFieldsGroupViTri}
          />
          {loading ? (
            <Loading />
          ) : (
            <TableBodyDSDKTB
              listDKSDTB={_showDataWithPagination}
              currentPage={pagination.currentPage}
              itemPerPage={pagination.itemPerPage}
              dangKySelected={dangKySelected}
              onSelected={onSelectedDangKy}
            />
          )}
        </Table>
        <TablePaginationDSDKTB
          currentPage={pagination.currentPage}
          itemPerPage={pagination.itemPerPage}
          totalItem={listTBGDDKTB?.length || 0}
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

DanhSachDangKyThietBi.propTypes = {
  listLichDay: PropTypes.array,
  dangKySelected: PropTypes.array,
  onSelectedDangKy: PropTypes.func,
}

export default DanhSachDangKyThietBi

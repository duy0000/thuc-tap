import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { TableHead } from './TableHead'
import { TableBody } from './TableBody'
import { TablePagination } from '@mui/material'
import {
  initialColumnFiltersBMS,
  KEY_STORE_BMS,
  ROWS_ITEM_PERPAGE,
} from '../constants'
import { useQuery } from '@tanstack/react-query'
import { apiBMSController } from '@/Apis/ApiGiangVien/BoDieuKhienBMS'
import { SECONDS } from '@/Configs/constants'
import Loading from '@/Components/Loading/Loading'
import { every, isEmpty, isNil } from 'lodash-unified'

const initialColumnFilters = {
  ThongTinPhong: '',
  LichSuDungPhong: '',
  TrangThaiBMS: '',
  NguonDienDieuHoa: '',
  CheDoHoatDongBMS: '',
  NgayGioTrenBMS: '',
  NhietDoMin: '',
  NhietDoMax: '',
  ThongSoKyThuat: '',
}

const TableThietBiBMS = memo(function TableThietBiBMS({
  isLoading,
  dataSelectBMS,
  onSetBMSSelected,
  onTurnSingleOutputDevicesBMS,
  dataColumnFiltersBMS,
  onSetDataColumnFiltersBMS,
  dataPagination,
  onSetDataPagination,
}) {
  const tableBMSRef = useRef(null)
  const [columnFilters, setColumnFilters] = useState(initialColumnFilters)
  // const [pagination, setPagination] = useState({
  //   itemPerPage: 60,
  //   currentPage: 0,
  // })

  const { data: dataListBMSController, isLoading: isLoadingListBMS } = useQuery(
    {
      queryKey: [KEY_STORE_BMS.SP_BMS_Get_controller_By_Phong, columnFilters],
      queryFn: async () => {
        const res = await apiBMSController.getBMSControllerByPhong({
          ...columnFilters,
        })
        return res
      },
      retry: 3,
      refetchInterval: 3 * SECONDS, // Refresh dữ liệu mỗi 1 phút
      staleTime: 0, // Dữ liệu luôn là stale (dữ liệu cũ), để nó luôn refresh khi refetchInterval chạy [stale > 0 && refetchInterval > 0 => dữ liệu luôn được xem là mới nhất]
      gcTime: 0, // gcTime = cacheTime: Xóa dữ liệu khỏi cache sau 0 phút nếu không được sử dụng
    },
  )

  const listBMSController = useMemo(() => {
    return dataListBMSController ? dataListBMSController?.data?.body : []
  }, [dataListBMSController])

  const _totalItems = useMemo(() => {
    return listBMSController?.length || 0
  }, [listBMSController])

  const _showBMSController = useMemo(() => {
    return listBMSController?.slice(
      dataPagination.itemPerPage * dataPagination.currentPage,
      dataPagination.itemPerPage * dataPagination.currentPage +
        dataPagination.itemPerPage,
    )
  }, [
    listBMSController,
    dataPagination.itemPerPage,
    dataPagination.currentPage,
  ])

  const handleSelectAll = useCallback(
    (event) => {
      if (event.target.checked) {
        const newSelected = _showBMSController?.map((n) => n)
        // setSelectBMS(newSelected)
        onSetBMSSelected(newSelected)
        return
      }
      // setSelectBMS([])
      onSetBMSSelected([])
    },
    [_showBMSController],
  )

  const handleSelect = (event, bmsItem) => {
    const selectedItem = dataSelectBMS.some(
      (item) => item.ipadd === bmsItem.ipadd,
    )
    let newSelected = []
    if (selectedItem) {
      newSelected = dataSelectBMS.filter((item) => item.ipadd !== bmsItem.ipadd)
      // setSelectBMS(newSelected)
      onSetBMSSelected(newSelected)
    } else {
      newSelected = [...dataSelectBMS, bmsItem]
      // setSelectBMS(newSelected)
      onSetBMSSelected(newSelected)
    }
  }

  // function check row is selected
  const isSelected = (ipadd) =>
    dataSelectBMS?.some((item) => item.ipadd === ipadd)

  const handleChangePage = useCallback(
    (event, newPage) => {
      onSetDataPagination({ ...dataPagination, currentPage: newPage })
      onSetBMSSelected([])
    },
    [listBMSController, dataPagination.itemPerPage, dataPagination.currentPage],
  )

  const handleChangeItemPerPage = useCallback((event) => {
    onSetDataPagination({
      currentPage: 0,
      itemPerPage: parseInt(event.target.value, 10),
    })
  }, [])

  const handleChangeValueFilter = (e) => {
    const { name, value } = e.target
    setColumnFilters((prevData) => {
      return { ...prevData, [name]: value }
    })
    onSetDataColumnFiltersBMS &&
      onSetDataColumnFiltersBMS((prevData) => {
        return { ...prevData, [name]: value }
      })
  }

  const handleClearFilter = useCallback(() => {
    setColumnFilters(initialColumnFiltersBMS)
    onSetDataColumnFiltersBMS(initialColumnFiltersBMS)
  }, [])

  useEffect(() => {
    if (dataColumnFiltersBMS) {
      const isAllValuesInvalid = every(dataColumnFiltersBMS, (value) => {
        return isNil(value) || isEmpty(value)
      })
      if (!isAllValuesInvalid) {
        setColumnFilters({
          ...initialColumnFiltersBMS,
          ...dataColumnFiltersBMS,
        })
      }
    }
  }, [dataColumnFiltersBMS])

  // eslint-disable-next-line no-unused-vars
  const _heightTable = useMemo(() => {
    return _showBMSController?.length
      ? String(_showBMSController?.length * 162)
      : '750'
  }, [_showBMSController])

  if (isLoadingListBMS) {
    return <Loading />
  }

  return (
    <>
      <div
        className={`relative z-[1] inset-0 max-h-screen bg-white overflow-y-auto`}
      >
        <table className="w-full" ref={tableBMSRef}>
          <TableHead
            dataFilter={columnFilters}
            onChangeFilter={handleChangeValueFilter}
            // onChangeDateFilter={handleChangeDateFilter}
            onClearFilter={handleClearFilter}
            rowCount={_showBMSController?.length ?? 0}
            numSelected={dataSelectBMS?.length ?? 0}
            onSelectAll={handleSelectAll}
          />
          <TableBody
            isLoading={isLoading}
            listBMSController={_showBMSController}
            currentPage={dataPagination.currentPage}
            itemPerPage={dataPagination.itemPerPage}
            isSelected={isSelected}
            onSelect={handleSelect}
            onTurnSingleOutputDevicesBMS={onTurnSingleOutputDevicesBMS}
          />
        </table>
      </div>
      <TablePagination
        component={'div'}
        count={_totalItems}
        labelRowsPerPage="Số dòng hiển thị:"
        rowsPerPageOptions={ROWS_ITEM_PERPAGE}
        rowsPerPage={dataPagination.itemPerPage}
        page={dataPagination.currentPage}
        showFirstButton={true}
        showLastButton={true}
        onPageChange={handleChangePage ? handleChangePage : () => {}}
        onRowsPerPageChange={
          handleChangeItemPerPage ? handleChangeItemPerPage : () => {}
        }
      />
    </>
  )
})
export default TableThietBiBMS

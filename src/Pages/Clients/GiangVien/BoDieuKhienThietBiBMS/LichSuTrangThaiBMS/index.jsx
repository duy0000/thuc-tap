import { useQuery } from '@tanstack/react-query'
import { KEY_STORE_BMS } from '../constants'
import { apiBMSController } from '@/Apis/ApiGiangVien/BoDieuKhienBMS'
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TablePagination,
  Tooltip,
} from '@mui/material'
import { useMemo, useState } from 'react'
import Loading from '@/Components/Loading/Loading'
import clsx from 'clsx'
import { dayjs } from '@/Services/Utils'
import { DebounceInput } from 'react-debounce-input'
import { LuFilterX } from 'react-icons/lu'
import { FaAngleDown } from 'react-icons/fa6'

function LichSuTrangThaiBMS() {
  const initialPagination = {
    page: 1,
    rowPerPage: 60,
  }
  const initialColumnFilters = {
    ipadd: '',
    syn_service: '',
    DT_QLP_Phong_TenPhong: '',
    date_disconnect: '',
    date_connect: '',
    trang_thai: '',
  }
  const [pagination, setPagination] = useState(initialPagination)
  const [columnFilters, setColumnFilters] = useState(initialColumnFilters)

  const { data: dataListCommandHistoryBMS, isLoading } = useQuery({
    queryKey: [
      KEY_STORE_BMS.SP_BMS_tbl_Command_History_Load_Para,
      pagination,
      columnFilters,
    ],
    queryFn: async () => {
      const res = await apiBMSController.getHistoryStateBMSController({
        ipadd: columnFilters.ipadd,
        syn_service: columnFilters.syn_service,
        DT_QLP_Phong_TenPhong: columnFilters.DT_QLP_Phong_TenPhong,
        date_disconnect: columnFilters.date_disconnect,
        date_connect: columnFilters.date_connect,
        trang_thai: columnFilters.trang_thai,
        SoTrang: Number(pagination.page),
        SoBanGhiTrenTrang: Number(pagination.rowPerPage),
      })
      return res
    },
  })

  const _listCommandHistoryBMS = useMemo(() => {
    if (dataListCommandHistoryBMS?.data?.ListSearch?.length > 0) {
      return dataListCommandHistoryBMS?.data?.ListSearch
    } else {
      return []
    }
  }, [dataListCommandHistoryBMS])

  const _totalPage = useMemo(() => {
    return dataListCommandHistoryBMS?.data?.TotalPage || 0
  }, [dataListCommandHistoryBMS])
  const _totalItems = useMemo(() => {
    return Number(_totalPage) * Number(pagination.rowPerPage) || 0
  }, [dataListCommandHistoryBMS])

  const handleChangePage = (event, newPage) => {
    if (newPage === 0) {
      setPagination({ ...pagination, page: 1 })
    } else {
      setPagination({ ...pagination, page: newPage + 1 })
    }
  }

  const handleChangeItemPerPage = (event) => {
    setPagination({
      page: 1,
      rowPerPage: parseInt(event.target.value, 10),
    })
  }

  const handleChangeFilters = (e) => {
    const { name, value } = e.target
    setColumnFilters((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleClearFilters = () => {
    setColumnFilters(initialColumnFilters)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <section className=" relative inset-0 max-h-[750px] overflow-y-auto">
        <table className="w-full">
          <thead className="w-full border sticky top-0 z-10 bg-white">
            <tr className="border rounded-t-md">
              <th className="text-center p-1 font-semibold border-r border-slate-50 bg-cyan-700 text-white rounded-tl-xl">
                STT
              </th>
              <td className="text-center p-1 font-semibold border-r border-slate-50 bg-cyan-700 text-white">
                Phòng học
              </td>
              <td className="text-center p-1 font-semibold border-r border-slate-50 bg-cyan-700 text-white">
                Địa chỉ IP
              </td>
              <td className="text-center p-1 font-semibold border-r border-slate-50 bg-cyan-700 text-white">
                Trạng thái kết nối
              </td>
              <td className="text-center p-1 font-semibold border-r border-slate-50 bg-cyan-700 text-white">
                Thời gian kết nối
              </td>
              <td className="text-center p-1 font-semibold border-r border-slate-50 bg-cyan-700 text-white">
                Service
              </td>
            </tr>
            <tr className="border">
              <th className="text-center p-1 border-r">
                <Tooltip title="Xóa lọc" onClick={handleClearFilters}>
                  <IconButton>
                    <LuFilterX />
                  </IconButton>
                </Tooltip>
              </th>
              {/* 1. Xóa bộ lọc */}
              <th className="text-center p-1 border-r">
                <DebounceInput
                  debounceTimeout={1000}
                  className="w-full p-2 focus:outline-none border border-gray-200 focus:border-cyan-500"
                  placeholder={'Tìm ...'}
                  name="DT_QLP_Phong_TenPhong"
                  value={columnFilters.DT_QLP_Phong_TenPhong}
                  onChange={handleChangeFilters}
                />
              </th>
              {/* 2. Tìm Phòng học */}
              <th className="text-center p-1 border-r">
                <DebounceInput
                  debounceTimeout={1000}
                  className="w-full p-2 focus:outline-none border border-gray-200 focus:border-cyan-500"
                  placeholder={'Tìm ...'}
                  name="ipadd"
                  value={columnFilters.ipadd}
                  onChange={handleChangeFilters}
                />
              </th>
              {/* 3. Tìm địa chỉ IP nhận lệnh */}
              <th className="text-center p-1 border-r">
                <FormControl variant="standard" sx={{ m: 0, minWidth: 120 }}>
                  <InputLabel id="trang_thai">Trạng thái</InputLabel>
                  <Select
                    labelId="trang_thai"
                    id="trang_thai"
                    name="trang_thai"
                    value={columnFilters?.trang_thai}
                    onChange={handleChangeFilters}
                    label="Trạng thái thiết bị"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'1'}>Đang kết nối</MenuItem>
                    <MenuItem value={'0'}>Mất kết nối</MenuItem>
                  </Select>
                </FormControl>
              </th>
              {/* 4. Tìm Trạng thái kết nối */}
              <th className="text-center p-1 border-r">
                <DebounceInput
                  debounceTimeout={1000}
                  className="w-full p-2 focus:outline-none border border-gray-200 focus:border-cyan-500"
                  placeholder={'Tìm ...'}
                  name="manhansu"
                  value={columnFilters.manhansu}
                  onChange={handleChangeFilters}
                />
              </th>
              {/* 5. Mã nhân sự */}
              <th className="text-center p-1 border-r">
                <DebounceInput
                  debounceTimeout={1000}
                  className="w-full p-2 focus:outline-none border border-gray-200 focus:border-cyan-500"
                  placeholder={'Tìm ...'}
                  name="hoten"
                  value={columnFilters.hoten}
                  onChange={handleChangeFilters}
                />
              </th>
              {/* 6. Họ và tên */}
            </tr>
          </thead>
          {/* END: Table head */}
          <tbody>
            {_listCommandHistoryBMS?.length > 0 ? (
              _listCommandHistoryBMS?.map((e, indexParent) => {
                return (
                  <>
                    <tr key={indexParent} className={'border bg-slate-200'}>
                      <th colSpan={6} className="border-r px-6 py-3 text-left">
                        <p className="flex items-center gap-1">
                          {e?.records && e?.records?.length > 0 ? (
                            <p className="w-5 h-5 mr-4 flex items-center justify-center rounded-full bg-slate-100 hover:bg-cyan-400 hover:text-white">
                              <FaAngleDown
                                size={10}
                                className="cursor-pointer"
                              />
                            </p>
                          ) : null}
                          <span className="block w-24">{e.ipadd}</span>
                        </p>
                      </th>
                    </tr>
                    {e?.records &&
                      e?.records?.length > 0 &&
                      e?.records?.map((e, index) => {
                        return (
                          <tr key={index} className="border">
                            <th className="text-center p-2 border-r">
                              {/* {index + 1} */}
                            </th>
                            <th className="text-center p-2 border-r">
                              <p className="whitespace-nowrap">
                                {e?.DT_QLP_Phong_TenPhong}
                              </p>
                            </th>
                            <th className="text-center p-2 border-r">
                              <p>{e?.ipadd}</p>
                            </th>
                            <td className="text-center p-2 border-r">
                              <span
                                className={clsx(
                                  'px-2 py-1 rounded-xl text-white text-sm font-semibold ',
                                  e?.trang_thai === 1
                                    ? 'bg-green-600'
                                    : 'bg-red-600',
                                )}
                              >
                                {e?.trang_thai === 1
                                  ? 'Đang kết nối'
                                  : 'Mất kết nối'}
                              </span>
                            </td>
                            <th className="text-center p-2 border-r">
                              <p>
                                {e?.date_connect
                                  ? dayjs(e?.date_connect).format(
                                      'DD/MM/YYYY HH:mm',
                                    )
                                  : ''}
                              </p>
                            </th>
                            <th>
                              <p>{e?.syn_service}</p>
                            </th>
                          </tr>
                        )
                      })}
                  </>
                )
              })
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center font-bold py-2 text-red-600"
                >
                  <p>Không có dữ liệu</p>
                </td>
              </tr>
            )}
          </tbody>
          {/* END: Table body */}

          {/* END: Table Pagination */}
        </table>
      </section>
      <TablePagination
        component={'div'}
        labelRowsPerPage="Số dòng hiển thị:"
        count={_totalItems}
        showFirstButton
        showLastButton
        page={pagination.page - 1}
        rowsPerPage={pagination.rowPerPage}
        rowsPerPageOptions={[10, 20, 60, 100, 200]}
        onPageChange={handleChangePage ? handleChangePage : () => {}}
        onRowsPerPageChange={
          handleChangeItemPerPage ? handleChangeItemPerPage : () => {}
        }
      />
    </>
  )
}

export default LichSuTrangThaiBMS

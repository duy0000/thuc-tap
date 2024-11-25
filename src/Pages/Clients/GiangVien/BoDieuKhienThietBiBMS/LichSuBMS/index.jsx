import { useQuery } from '@tanstack/react-query'
import { generateOutputLabel, KEY_STORE_BMS } from '../constants'
import { apiBMSController } from '@/Apis/ApiGiangVien/BoDieuKhienBMS'
import { IconButton, TablePagination, Tooltip } from '@mui/material'
import { useMemo, useState } from 'react'
import Loading from '@/Components/Loading/Loading'
import clsx from 'clsx'
import { dayjs } from '@/Services/Utils'
import { DebounceInput } from 'react-debounce-input'
import { LuFilterX } from 'react-icons/lu'

function LichSuCommandBMS() {
  const initialPagination = {
    page: 1,
    rowPerPage: 60,
  }
  const initialColumnFilters = {
    date_insert: '',
    hoten: '',
    idcmd: '',
    ipadd: '',
    manhansu: '',
    coso: '',
    diadiem: '',
    toanha: '',
    tang: '',
    tenphong: '',
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
      const res = await apiBMSController.getHistoryCommandBMSController({
        date_insert: columnFilters.date_insert,
        hoten: columnFilters.hoten,
        idcmd: columnFilters.idcmd,
        ipadd: columnFilters.ipadd,
        manhansu: columnFilters.manhansu,
        coso: columnFilters.coso,
        diadiem: columnFilters.diadiem,
        toanha: columnFilters.toanha,
        tang: columnFilters.tang,
        tenphong: columnFilters.tenphong,
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

  return (
    <>
      <section className=" relative inset-0 max-h-[750px] overflow-y-auto">
        <table className="w-full">
          <thead className="w-full sticky top-0 z-10 bg-white">
            <tr className="border rounded-t-md">
              <th
                rowSpan={2}
                className="text-center p-1 font-semibold border-r border-slate-50 bg-cyan-700 text-white rounded-tl-xl"
              >
                STT
              </th>
              <td
                colSpan={5}
                className="text-center p-1 font-semibold border-r border-slate-50 bg-cyan-700 text-white"
              >
                Thông tin lệnh thực thi
              </td>
              <td
                colSpan={5}
                className="text-center p-1 font-semibold border-r border-slate-50 bg-cyan-700 text-white"
              >
                Thông tin phòng
              </td>
              <td
                colSpan={2}
                className="text-center p-1 font-semibold border-r border-slate-50 bg-cyan-700 text-white rounded-tr-xl"
              >
                Thông tin nhân sự thực thi
              </td>
            </tr>
            <tr>
              <td className="w-20 text-center p-1 font-semibold border-r border-slate-50 bg-cyan-700 text-white">
                Lệnh CMD
              </td>
              <td className="w-32 text-center p-1 font-semibold border-r border-slate-50 bg-cyan-700 text-white">
                Công tắc thao tác
              </td>
              <td className="text-center p-1 font-semibold border-r border-slate-50 bg-cyan-700 text-white whitespace-nowrap">
                Trạng thái thực thi
              </td>
              <td className="w-36 text-center p-1 font-semibold border-r border-slate-50 bg-cyan-700 text-white">
                Địa chỉ IP nhận lệnh
              </td>
              <td className="text-center p-1 font-semibold border-r border-slate-50 bg-cyan-700 text-white">
                Ngày thực thi
              </td>{' '}
              <td className="w-36 text-center p-1 font-semibold border-r border-slate-50 bg-cyan-700 text-white">
                Tên phòng học
              </td>
              <td className="w-20 text-center p-1 font-semibold border-r border-slate-50 bg-cyan-700 text-white">
                Cơ sở
              </td>
              <td className="text-center p-1 font-semibold border-r border-slate-50 bg-cyan-700 text-white">
                Địa điểm
              </td>
              <td className="w-20 text-center p-1 font-semibold border-r border-slate-50 bg-cyan-700 text-white">
                Tòa nhà
              </td>
              <td className="w-20 text-center p-1 font-semibold border-r border-slate-50 bg-cyan-700 text-white">
                Tầng
              </td>
              <td className="text-center p-1 font-semibold border-r border-slate-50 bg-cyan-700 text-white">
                Mã nhân sự
              </td>
              <td className="text-center p-1 font-semibold border-r border-slate-50 bg-cyan-700 text-white">
                Họ và tên
              </td>
            </tr>
            <tr>
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
                  name="idcmd"
                  value={columnFilters.idcmd}
                  onChange={handleChangeFilters}
                />
              </th>
              {/* 2. Tìm lệnh cmd */}
              <th className="text-center p-1 border-r">
                {/* <DebounceInput
                  debounceTimeout={1000}
                  className="w-full p-2 focus:outline-none border border-gray-200 focus:border-cyan-500"
                  placeholder={'Tìm ...'}
                  name="idcmd"
                  value={columnFilters.idcmd}
                  onChange={handleChangeFilters}
                /> */}
              </th>
              {/* 2. Tìm lệnh cmd */}
              <th className="text-center p-1 border-r">
                {/* <DebounceInput
                  debounceTimeout={1000}
                  className="w-full p-2 focus:outline-none border border-gray-200 focus:border-cyan-500"
                  placeholder={'Tìm ...'}
                  name="ipadd"
                  value={columnFilters.ipadd}
                  onChange={handleChangeFilters}
                /> */}
              </th>
              {/* 3. Trạng thái thực thi */}
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
              {/* 4. Tìm địa chỉ IP nhận lệnh */}
              <th className="text-center p-1 border-r">
                <DebounceInput
                  debounceTimeout={200}
                  className="w-full p-2 focus:outline-none border border-gray-200 focus:border-cyan-500"
                  placeholder={'Tìm ...'}
                  type="date"
                  name="date_insert"
                  value={columnFilters.date_insert}
                  onChange={handleChangeFilters}
                />
              </th>
              {/* 5. Tìm ngày thực thi */}
              <th className="text-center p-1 border-r">
                <DebounceInput
                  debounceTimeout={1000}
                  className="w-full p-2 focus:outline-none border border-gray-200 focus:border-cyan-500"
                  placeholder={'Tìm tên phòng'}
                  name="tenphong"
                  value={columnFilters.tenphong}
                  onChange={handleChangeFilters}
                />
              </th>
              {/* 6. Tên phòng */}
              <th className="text-center p-1 border-r">
                <DebounceInput
                  debounceTimeout={1000}
                  className="w-full p-2 focus:outline-none border border-gray-200 focus:border-cyan-500"
                  placeholder={'Tìm cơ sở'}
                  name="coso"
                  value={columnFilters.coso}
                  onChange={handleChangeFilters}
                />
              </th>
              {/* 7. Cơ sở */}
              <th className="text-center p-1 border-r">
                <DebounceInput
                  debounceTimeout={1000}
                  className="w-full p-2 focus:outline-none border border-gray-200 focus:border-cyan-500"
                  placeholder={'Tìm địa điểm'}
                  name="diadiem"
                  value={columnFilters.diadiem}
                  onChange={handleChangeFilters}
                />
              </th>
              {/* 8. Địa điểm */}
              <th className="text-center p-1 border-r">
                <DebounceInput
                  debounceTimeout={1000}
                  className="w-full p-2 focus:outline-none border border-gray-200 focus:border-cyan-500"
                  placeholder={'Tìm tòa nhà'}
                  name="toanha"
                  value={columnFilters.toanha}
                  onChange={handleChangeFilters}
                />
              </th>
              {/* 9. Tìm tòa nhà */}
              <th className="text-center p-1 border-r">
                <DebounceInput
                  debounceTimeout={1000}
                  className="w-full p-2 focus:outline-none border border-gray-200 focus:border-cyan-500"
                  placeholder={'Tìm tầng'}
                  name="tang"
                  value={columnFilters.tang}
                  onChange={handleChangeFilters}
                />
              </th>
              {/* 10. Tìm tầng */}
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
              {/* 6. Mã nhân sự */}
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
          {isLoading && <Loading />}
          <tbody>
            {_listCommandHistoryBMS?.length > 0 ? (
              _listCommandHistoryBMS?.map((e, index) => {
                return (
                  <tr
                    key={index}
                    className={clsx(
                      'border',
                      index % 2 === 0 ? 'bg-slate-100' : 'bg-white',
                    )}
                  >
                    <th className="border-r p-1 text-center">
                      {(pagination.page - 1) * pagination.rowPerPage +
                        index +
                        1}
                    </th>
                    <td className="border-r p-1 text-center">{e?.idcmd}</td>
                    <td className="border-r p-1 text-center">
                      {e?.json_data_cmd?.output &&
                        generateOutputLabel(e?.json_data_cmd?.output)}
                    </td>
                    <td className="border-r p-1 text-center py-2 whitespace-nowrap">
                      {e?.syn_status === 1 ? (
                        <span className="bg-green-600 text-white rounded-full text-xs px-2 py-1">
                          Đã thực thi xong
                        </span>
                      ) : (
                        <span className="bg-red-600 text-white rounded-full text-xs px-2 py-1">
                          Chưa thực thi xong
                        </span>
                      )}
                    </td>
                    <td className="border-r p-1 text-center">{e?.ipadd}</td>
                    <td className="border-r p-1 text-center">
                      {e?.date_insert_cmd
                        ? dayjs(e.date_insert_cmd)
                            .utc()
                            .format('DD/MM/YYYY HH:mm:ss')
                        : ''}
                    </td>

                    <td className="border-r p-1 text-center">{e?.tenphong}</td>
                    <td className="border-r p-1 text-center">{e?.coso}</td>
                    <td className="border-r p-1 text-center">{e?.diadiem}</td>
                    <td className="border-r p-1 text-center">{e?.toanha}</td>
                    <td className="border-r p-1 text-center">{e?.tang}</td>

                    <td className="border-r p-1 text-center">{e?.manhansu}</td>
                    <td className="border-r p-1 text-center">{e?.hoten}</td>
                  </tr>
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

export default LichSuCommandBMS

import SidebarTTHCGV from '../Sidebar/SidebarTTHCGV'
import {
  delThuTucHanhChinhByID,
  getAllLinhVuc,
  getThuTucHanhChinhByKeyWords,
  putHienThiHoSoThuTuc,
} from '@/Apis/ApiGiangVien/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien'
import { useMemo, useState } from 'react'
import { useEffect } from 'react'
import { FiSearch } from 'react-icons/fi'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { changeSlug } from '@/Services/Utils/stringUtils'
import { DebounceInput } from 'react-debounce-input'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import Loading from '@/Components/Loading/Loading'
import { typeEditThuTuc } from '../constants'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV'
import { QTHT_UNETI_ONLINE } from '@/Configs/constants'
import { IoEyeOffOutline, IoEyeOutline, IoTrashOutline } from 'react-icons/io5'
import Tooltip from '@mui/material/Tooltip'
import { FaRegPenToSquare } from 'react-icons/fa6'
import { IconButton, TablePagination } from '@mui/material'
import { MdOutlineFilterAltOff } from 'react-icons/md'
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query'
import { TTHCGV_QUERY_KEY } from '@/Services/QueryStores/QueryKeyStores/TTHCGV.querykey'

const PATH_TTHCGV = '/admin/quan-tri-TTHCGV/ho-so-thu-tuc'
const initialDataFilter = {
  PhongBan: '',
  MC_TTHC_GV_DieuKienLoc: '',
  TuKhoaTimKiem: '',
  MC_TTHC_GV_MaThuTuc: '',
  MC_TTHC_GV_TenThuTuc: '',
  MC_TTHC_GV_NoiTiepNhan: '',
  MC_TTHC_GV_LinhVuc: '',
  MC_TTHC_GV_Active: '',
}
function DanhSachHoSo() {
  const dataCBNV = DataCanBoGV()
  const [dataFilter, setDataFilter] = useState(initialDataFilter)

  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const queryClient = useQueryClient()
  const { data: dataThuTucList, isLoading: isLoadingThuTucList } = useQuery({
    queryKey: [
      TTHCGV_QUERY_KEY.SP_MC_TTHC_GV_TimKiemThuTuc,
      dataFilter.PhongBan,
      dataFilter.MC_TTHC_GV_DieuKienLoc,
      dataFilter.TuKhoaTimKiem,
      dataFilter.MC_TTHC_GV_MaThuTuc,
      dataFilter.MC_TTHC_GV_TenThuTuc,
      dataFilter.MC_TTHC_GV_NoiTiepNhan,
      dataFilter.MC_TTHC_GV_LinhVuc,
      dataFilter.MC_TTHC_GV_Active,
      dataCBNV?.TenPhongBan,
    ],
    queryFn: async () => {
      const res = await getThuTucHanhChinhByKeyWords({
        PhongBan: dataCBNV.HT_GROUPUSER_ID?.includes('1')
          ? ''
          : dataCBNV?.TenPhongBan
            ? dataCBNV?.TenPhongBan
            : dataFilter.PhongBan,
        MC_TTHC_GV_DieuKienLoc: dataFilter.MC_TTHC_GV_DieuKienLoc || '',
        TuKhoaTimKiem: dataFilter.TuKhoaTimKiem || '',
        MC_TTHC_GV_MaThuTuc: dataFilter.MC_TTHC_GV_MaThuTuc || '',
        MC_TTHC_GV_TenThuTuc: dataFilter.MC_TTHC_GV_TenThuTuc || '',
        MC_TTHC_GV_NoiTiepNhan: dataFilter.MC_TTHC_GV_NoiTiepNhan || '',
        MC_TTHC_GV_LinhVuc: dataFilter.MC_TTHC_GV_LinhVuc || '',
        MC_TTHC_GV_Active: dataFilter.MC_TTHC_GV_Active || '',
      })
      return res
    },
  })

  const __HoSoThuTucList = useMemo(() => {
    const list = dataThuTucList?.data?.body || []
    return list
  }, [dataThuTucList])

  const __dataPaginationList = useMemo(() => {
    if (__HoSoThuTucList.length > 0) {
      return __HoSoThuTucList.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage,
      )
    } else {
      return []
    }
  }, [__HoSoThuTucList, currentPage, itemsPerPage])

  const [areaQuery] = useQueries({
    queries: [
      {
        queryKey: [TTHCGV_QUERY_KEY.SP_MC_TTHC_GV_LinhVuc],
        queryFn: async () => {
          const res = await getAllLinhVuc()
          return res
        },
      },
    ],
  })
  const __dataAreaList = useMemo(() => {
    return areaQuery?.data?.data?.body || []
  }, [areaQuery])

  // event handlers
  const handleChangeValue = (e) => {
    const { id, name, value } = e.target

    if (id == 'records-number' || name == 'records-number') {
      value ? setItemsPerPage(parseInt(value)) : setItemsPerPage(10)
    }

    if (id == 'linhvuc' || name == 'linhvuc') {
      if (value && value !== 'lvnull') {
        setDataFilter({
          ...dataFilter,
          MC_TTHC_GV_DieuKienLoc: 'LinhVuc',
          MC_TTHC_GV_LinhVuc: value,
          TuKhoaTimKiem: value,
        })
        setCurrentPage(0)
      }
    }
  }
  const handeChangeRowsPerPage = (event) => {
    setItemsPerPage(event.target.value)
  }
  const handleHienThiThuTuc = async (idThuTuc, type) => {
    if (type === typeEditThuTuc.typeHidden) {
      Swal.fire({
        icon: 'question',
        title: 'Bạn có chắc chắn muốn ẩn thủ tục này không?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await putHienThiHoSoThuTuc(idThuTuc, type)
          if (res.status === 200) {
            queryClient.invalidateQueries({
              queryKey: [TTHCGV_QUERY_KEY.SP_MC_TTHC_GV_TimKiemThuTuc],
            })
            toast.success('Đã ẩn thành công thủ tục!')
          }
        }
      })
    }

    if (type === typeEditThuTuc.typeShow) {
      Swal.fire({
        icon: 'question',
        title: 'Bạn có chắc chắn muốn hiển thị thủ tục này không?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await putHienThiHoSoThuTuc(idThuTuc, type)
          if (res.status === 200) {
            queryClient.invalidateQueries({
              queryKey: [TTHCGV_QUERY_KEY.SP_MC_TTHC_GV_TimKiemThuTuc],
            })
            toast.success('Đã hiển thị thành công thủ tục!')
          }
        }
      })
    }
  }

  // event: Delete TTHC_GV By ID
  const handleDeleteThuTucHanhChinh = (id) => async () => {
    if (!dataCBNV.HT_GROUPUSER_ID.includes(QTHT_UNETI_ONLINE)) {
      Swal.fire({
        icon: 'error',
        title: 'Bạn không có quyền thực hiện xóa thủ tục!',
      })
      return
    }

    Swal.fire({
      icon: 'question',
      title: 'Bạn có chắc chắn muốn xóa thủ tục này không?',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          const res = await delThuTucHanhChinhByID(id)
          if (res.status === 200) {
            queryClient.invalidateQueries({
              queryKey: [TTHCGV_QUERY_KEY.SP_MC_TTHC_GV_TimKiemThuTuc],
            })
            toast.success('Đã xoá thủ tục thành công!')
          }
        }
      })
      .catch(() => {
        toast.error('Xoá thủ tục thất bại!')
      })
      .finally(() => {
        queryClient.invalidateQueries({
          queryKey: [TTHCGV_QUERY_KEY.SP_MC_TTHC_GV_TimKiemThuTuc],
        })
      })
  }

  // effects
  useEffect(() => {
    setCurrentPage(0)
  }, [itemsPerPage, dataFilter])

  return (
    <>
      {isLoadingThuTucList ? (
        <div className="relative left-0 right-0 w-full flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="px-5 lg:px-0 grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-2">
            <SidebarTTHCGV />
          </div>
          <div className="col-span-12 lg:col-span-10">
            <div className="w-full p-4 rounded-xl shadow-lg bg-white">
              <div className="flex flex-col gap-4 relative top-0 bottom-0 h-full">
                <div className="grid grid-cols-5 items-center gap-4 justify-between">
                  <div className="col-span-5">
                    <h3 className="text-xl lg:text-3xl text-center font-bold uppercase">
                      Danh sách quy trình hồ sơ
                    </h3>
                  </div>
                  <form className="col-span-5">
                    <div className="flex items-center gap-2  border border-slate-400 px-2 rounded-full">
                      <DebounceInput
                        type="search"
                        placeholder="Nhập mã thủ tục, tên thủ tục, ..."
                        className="px-3 py-1 bg-transparent w-full focus:outline-none"
                        value={dataFilter.TuKhoaTimKiem}
                        debounceTimeout={500}
                        onChange={(e) => {
                          setDataFilter({
                            ...dataFilter,
                            TuKhoaTimKiem: e.target.value.toLowerCase(),
                          })
                          setCurrentPage(0)
                        }}
                      />

                      <label className="">
                        <FiSearch size={22} className="text-[#336699]" />
                      </label>
                    </div>
                  </form>
                  <select
                    className="col-span-5 lg:col-span-1 rounded-full px-3 py-1  border border-slate-400 focus:outline-slate-300"
                    onChange={handleChangeValue}
                    value={dataFilter.MC_TTHC_GV_LinhVuc}
                    name="linhvuc"
                    id="linhvuc"
                  >
                    <option value={'lvnull'}>Lĩnh vực</option>
                    {__dataAreaList.map((item, index) => {
                      return (
                        <option value={item.MC_TTHC_GV_LinhVuc} key={index}>
                          {item.MC_TTHC_GV_LinhVuc}
                        </option>
                      )
                    })}
                  </select>
                  <select
                    className="col-span-5 lg:col-span-1 rounded-full px-3 py-1  border border-slate-400 focus:outline-slate-300"
                    onChange={handleChangeValue}
                    name="records-number"
                    id="records-number"
                  >
                    <option value="">Số bản ghi</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </select>
                </div>
                <div className="relative inset-0 z-[1] w-full overflow-y-auto max-h-[600px]">
                  <table className="mb-5">
                    <thead className="sticky top-0 z-[1] w-full bg-white shadow">
                      <tr className="bg-[#336699] text-white">
                        <th className="px-2 py-1 rounded-tl-lg border-r">
                          STT
                        </th>
                        <th className="px-2 py-1 border-r">
                          <div className="w-20">Mã thủ tục</div>
                        </th>
                        <th className="px-2 py-1 border-r">Thủ tục</th>
                        <th className="px-2 py-1 border-r">Đơn vị</th>
                        <th className="px-2 py-1 border-r">Lĩnh vực</th>
                        <th className="px-2 py-1 rounded-tr-lg w-8">Tác vụ</th>
                      </tr>
                      <tr className="border border-gray-300">
                        <th className="border-r border-gray-300 text-center">
                          <p className="flex items-center justify-center">
                            <IconButton
                              color="error"
                              onClick={() => {
                                setDataFilter(initialDataFilter)
                              }}
                            >
                              <MdOutlineFilterAltOff size={22} />
                            </IconButton>
                          </p>
                        </th>
                        <th className="border-r border-gray-300">
                          <DebounceInput
                            placeholder={'Tìm mã thủ tục'}
                            debounceTimeout={500}
                            value={dataFilter.MC_TTHC_GV_MaThuTuc}
                            onChange={(e) => {
                              setDataFilter({
                                ...dataFilter,
                                MC_TTHC_GV_MaThuTuc:
                                  e.target.value.toLowerCase(),
                              })
                              setCurrentPage(0)
                            }}
                            className="h-full w-full px-2 py-1 bg-transparent text-black focus:outline-none"
                          />
                        </th>
                        <th className="border-r border-gray-300">
                          <DebounceInput
                            placeholder={'Tìm tên thủ tục'}
                            debounceTimeout={500}
                            value={dataFilter.MC_TTHC_GV_TenThuTuc}
                            onChange={(e) => {
                              setDataFilter({
                                ...dataFilter,
                                MC_TTHC_GV_TenThuTuc:
                                  e.target.value.toLowerCase(),
                              })
                              setCurrentPage(0)
                            }}
                            className="h-full w-full px-2 py-1 bg-transparent text-black focus:outline-none"
                          />
                        </th>
                        <th className="border-r border-gray-300">
                          <DebounceInput
                            placeholder={'Tìm đơn vị'}
                            debounceTimeout={500}
                            value={dataFilter.MC_TTHC_GV_NoiTiepNhan}
                            onChange={(e) => {
                              setDataFilter({
                                ...dataFilter,
                                MC_TTHC_GV_NoiTiepNhan:
                                  e.target.value.toLowerCase(),
                              })
                              setCurrentPage(0)
                            }}
                            className="h-full w-full px-2 py-1 bg-transparent text-black focus:outline-none"
                          />
                        </th>
                        <th className="border-r border-gray-300">
                          <DebounceInput
                            placeholder={'Tìm lĩnh vực'}
                            debounceTimeout={500}
                            value={dataFilter.MC_TTHC_GV_LinhVuc}
                            onChange={(e) => {
                              setDataFilter({
                                ...dataFilter,
                                MC_TTHC_GV_LinhVuc:
                                  e.target.value.toLowerCase(),
                              })
                              setCurrentPage(0)
                            }}
                            className="h-full w-full px-2 py-1 bg-transparent text-black focus:outline-none"
                          />
                        </th>
                        <th className="border-r border-gray-300"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {__dataPaginationList?.length > 0 ? (
                        __dataPaginationList.map((itemThuTuc, index) => {
                          const titleSlug = changeSlug(
                            itemThuTuc.MC_TTHC_GV_TenThuTuc,
                          )
                          return (
                            <tr
                              className="border-b"
                              key={itemThuTuc.MC_TTHC_GV_ID}
                            >
                              <td className="px-2 py-1 border-r border-l border-slate-300 text-center font-semibold">
                                {index + 1 + currentPage * itemsPerPage}
                              </td>
                              <td className="px-2 py-1 border-r border-slate-300 text-center">
                                <p className="inline-block w-20 line-clamp-2">
                                  {itemThuTuc.MC_TTHC_GV_MaThuTuc}
                                </p>
                              </td>
                              <td className="px-2 py-1 border-r border-slate-300">
                                <div className="flex flex-col gap-1">
                                  <Link
                                    to={`${PATH_TTHCGV}/xem/chi-tiet/${titleSlug}/${itemThuTuc.MC_TTHC_GV_ID}`}
                                    className="font-semibold text-sky-700 hover:opacity-70"
                                  >
                                    {itemThuTuc.MC_TTHC_GV_TenThuTuc}
                                  </Link>
                                  <p className="flex flex-row items-center gap-2">
                                    <span className="text-sm">
                                      Trạng thái thủ tục:{' '}
                                    </span>
                                    <span
                                      className={clsx(
                                        'block px-2 rounded-sm font-semibold drop-shadow-sm text-white min-w-[100px] text-center',
                                        itemThuTuc.MC_TTHC_GV_Active === true
                                          ? 'bg-green-500'
                                          : 'bg-red-500',
                                      )}
                                    >
                                      {itemThuTuc.MC_TTHC_GV_Active === true
                                        ? 'Đang hiển thị'
                                        : 'Đang ẩn'}
                                    </span>
                                  </p>
                                  <p className="flex flex-row items-center gap-2">
                                    <span className="text-sm">Mức độ:</span>
                                    <span
                                      className={clsx(
                                        'w-4 h-4 text-center text-white rounded-full text-xs font-semibold',
                                        parseInt(
                                          itemThuTuc.MC_TTHC_GV_IDMucDo,
                                        ) == 1
                                          ? 'bg-red-300'
                                          : '',
                                        parseInt(
                                          itemThuTuc.MC_TTHC_GV_IDMucDo,
                                        ) == 2
                                          ? 'bg-red-400'
                                          : '',
                                        parseInt(
                                          itemThuTuc.MC_TTHC_GV_IDMucDo,
                                        ) == 3
                                          ? 'bg-red-500'
                                          : '',
                                        parseInt(
                                          itemThuTuc.MC_TTHC_GV_IDMucDo,
                                        ) == 4
                                          ? 'bg-red-600'
                                          : '',
                                      )}
                                    >
                                      {parseInt(itemThuTuc.MC_TTHC_GV_IDMucDo)}
                                    </span>
                                  </p>
                                </div>
                              </td>
                              <td className="px-2 py-1 border-r border-slate-300">
                                <p>{itemThuTuc.MC_TTHC_GV_NoiTiepNhan}</p>
                              </td>
                              <td className="px-2 py-1 border-r border-slate-300 text-center">
                                {itemThuTuc.MC_TTHC_GV_LinhVuc}
                              </td>
                              <td className="px-2 py-1 border-r border-slate-300">
                                <div className="flex items-center justify-around gap-2 w-28">
                                  <Tooltip title="Sửa thủ tục">
                                    <Link
                                      to={`${PATH_TTHCGV}/xem/chi-tiet/${titleSlug}/${itemThuTuc.MC_TTHC_GV_ID}`}
                                      className="flex items-center justify-center w-8 h-8 bg-sky-100 text-sky-900 text-center font-semibold rounded-full border px-2 py-1 hover:bg-sky-800 hover:text-white"
                                    >
                                      <FaRegPenToSquare />
                                    </Link>
                                  </Tooltip>

                                  <Tooltip
                                    title={
                                      itemThuTuc.MC_TTHC_GV_Active
                                        ? 'Ẩn thủ tục'
                                        : 'Hiển thị thủ tục'
                                    }
                                  >
                                    <button
                                      type="button"
                                      onClick={() => {
                                        handleHienThiThuTuc(
                                          itemThuTuc.MC_TTHC_GV_ID,
                                          itemThuTuc.MC_TTHC_GV_Active
                                            ? typeEditThuTuc.typeHidden
                                            : typeEditThuTuc.typeShow,
                                        )
                                      }}
                                      className="flex items-center justify-center w-8 h-8 bg-blue-50 text-blue-500 text-center font-semibold rounded-full border px-2 py-1 hover:bg-blue-600 hover:text-blue-100"
                                    >
                                      {itemThuTuc.MC_TTHC_GV_Active ? (
                                        <IoEyeOutline />
                                      ) : (
                                        <IoEyeOffOutline />
                                      )}
                                    </button>
                                  </Tooltip>

                                  <Tooltip
                                    title="Xóa thủ tục"
                                    style={{
                                      display:
                                        !dataCBNV.HT_GROUPUSER_ID.includes(
                                          QTHT_UNETI_ONLINE,
                                        ) && 'none',
                                    }}
                                  >
                                    <button
                                      type="button"
                                      onClick={handleDeleteThuTucHanhChinh(
                                        itemThuTuc.MC_TTHC_GV_ID,
                                      )}
                                      className={
                                        'flex items-center justify-center w-8 h-8 bg-red-100 text-red-600 text-center font-semibold rounded-full border px-2 py-1 hover:bg-red-600 hover:text-white'
                                      }
                                    >
                                      <IoTrashOutline />
                                    </button>
                                  </Tooltip>
                                </div>
                              </td>
                            </tr>
                          )
                        })
                      ) : (
                        <tr>
                          <td colSpan={6}>
                            <p className="font-semibold text-red-600 text-center border">
                              Chưa có hồ sơ/thủ tục nào được tạo.
                            </p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {/* Phân trang */}
                <div
                  className={clsx(
                    'grid grid-cols-3 items-center justify-between',
                    __HoSoThuTucList?.length <= 0 && 'hidden',
                  )}
                >
                  {__HoSoThuTucList?.length == 0 ? null : (
                    <div className="col-span-3 lg:col-span-1 flex flex-row items-center">
                      <p className="font-semibold text-[#336699]">
                        Tổng số:{' '}
                        <span>{__HoSoThuTucList?.length} hồ sơ/thủ tục</span>
                      </p>
                    </div>
                  )}
                  {__HoSoThuTucList?.length >= 5 ? (
                    <TablePagination
                      component={'div'}
                      count={__HoSoThuTucList?.length}
                      page={currentPage}
                      onPageChange={(event, newValue) => {
                        setCurrentPage(newValue)
                      }}
                      rowsPerPageOptions={[5, 10, 15, 20]}
                      rowsPerPage={itemsPerPage}
                      onRowsPerPageChange={handeChangeRowsPerPage}
                      labelRowsPerPage="Số bản ghi trên trang"
                      showFirstButton
                      showLastButton
                      className="col-span-3 lg:col-span-2"
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DanhSachHoSo

import PropTypes from 'prop-types'
import { getThuTucHanhChinhByKeyWords } from '@/Apis/ApiGiangVien/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien'
import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import Loading from '@/Components/Loading/Loading'
import { TTHCGV_QUERY_KEY } from '@/Services/QueryStores/QueryKeyStores/TTHCGV.querykey'
import { changeSlug } from '@/Services/Utils/stringUtils'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { isEmpty } from 'lodash-unified'
import { useEffect, useMemo, useState } from 'react'
import { DebounceInput } from 'react-debounce-input'
import { FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { TablePagination } from '@mui/material'

function DanhSachThuTuc({
  department,
  rule,
  keywordsSearch,
  dataSearchParams,
  dataFilter,
  onChangeFilter,
  onRemoveKeySearchParams,
  onSearchParams,
  pagination,
}) {
  const home = {
    path: '/tthc-giang-vien',
    title: 'TTHC Giảng Viên',
  }

  const [dataPagination, setDatapagination] = useState({
    currentPage: pagination.page || 0,
    itemsPerPage: pagination.size || 20,
    pageCount: 0,
  })

  const { data: listTTHCGV, isLoading } = useQuery({
    queryKey: [
      TTHCGV_QUERY_KEY.SP_MC_TTHC_GV_TimKiemThuTuc,
      department,
      rule,
      keywordsSearch,
    ],
    queryFn: async () => {
      return await getThuTucHanhChinhByKeyWords({
        PhongBan: department,
        MC_TTHC_GV_DieuKienLoc: rule,
        TuKhoaTimKiem: keywordsSearch || '',
        MC_TTHC_GV_MaThuTuc: '',
        MC_TTHC_GV_TenThuTuc: '',
        MC_TTHC_GV_NoiTiepNhan: '',
        MC_TTHC_GV_LinhVuc: '',
        MC_TTHC_GV_Active: '',
      })
    },
  })

  const __dsThuTucHanhChinhActive = useMemo(() => {
    return (
      listTTHCGV?.data.body?.filter(
        (tthc) => tthc.MC_TTHC_GV_Active !== false,
      ) || []
    )
  }, [listTTHCGV?.data.body])

  const displayData = useMemo(() => {
    return __dsThuTucHanhChinhActive?.slice(
      dataPagination.currentPage * dataPagination.itemsPerPage,
      (dataPagination.currentPage + 1) * dataPagination.itemsPerPage,
    )
  }, [
    listTTHCGV,
    dataPagination.itemsPerPage,
    dataPagination.currentPage,
    isLoading,
  ])

  // Effects
  useEffect(() => {
    setDatapagination({
      ...dataPagination,
      currentPage: pagination.page,
      itemsPerPage: pagination.size,
    })
  }, [pagination])

  useEffect(() => {
    if (!isLoading && listTTHCGV?.data.body.length) {
      setDatapagination({
        ...dataPagination,
        pageCount: Math.ceil(
          listTTHCGV?.data.body?.length / dataPagination.itemsPerPage,
        ),
        displayData: listTTHCGV?.data.body?.slice(
          dataPagination.currentPage * dataPagination.itemsPerPage,
          (dataPagination.currentPage + 1) * dataPagination.itemsPerPage,
        ),
      })
    }
  }, [listTTHCGV, isLoading])

  return (
    <div className="grow bg-white w-full p-4 shadow rounded-md">
      {isLoading && <Loading />}
      <Breadcrumb home={home} breadcrumbs={[]} />
      {/* START: Form search */}
      <div className="mt-5">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <form className="w-full flex items-center gap-2 border px-2 rounded-full">
            <DebounceInput
              type="search"
              placeholder="Nhập từ khóa tìm kiếm"
              className="px-3 py-1 bg-transparent w-full focus:outline-none"
              onChange={(e) => {
                const valueSearch = e.target.value
                if (isEmpty(valueSearch)) {
                  onRemoveKeySearchParams()
                } else {
                  onChangeFilter({
                    ...dataFilter,
                    keywords: valueSearch.toLowerCase(),
                  })
                  onSearchParams({
                    ...Object.fromEntries([...dataSearchParams]),
                    keywords: valueSearch.toLowerCase(),
                  })
                }
              }}
              value={dataFilter.keywords}
              debounceTimeout={1000}
            />
            <FiSearch size={24} className="font-semibold" />
          </form>
          <select
            className="w-full md:w-auto px-3 py-2 border rounded-full font-semibold focus:outline-none"
            name="records-number"
            id="records-number"
            onChange={(event) => {
              setDatapagination({
                ...dataPagination,
                itemsPerPage: Number(event.target.value),
                currentPage: 0,
              })
            }}
          >
            <option value="10">Số thủ tục hiển thị</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
      </div>
      {/* END: Form search */}
      {/* START: Table DS Thủ tục */}
      <div className="my-5 relative inset-0 w-full z-[1] max-h-[800px] overflow-y-auto">
        {listTTHCGV?.data.body?.length <= 0 && (
          <p className="text-center p-2 font-semibold border mb-2">
            Hiện tại không có thủ tục nào.
          </p>
        )}
        {listTTHCGV?.data.body?.length > 0 && (
          <>
            <table className="w-full table-auto">
              <thead className="bg-[#075985] text-white rounded-t-xl">
                <tr>
                  <th className="border-r px-2 py-1 rounded-tl-xl">STT</th>
                  <th className="border-r px-2 py-1">Tên thủ tục</th>
                  <th className="px-2 py-1 rounded-tr-xl">Lĩnh vực</th>
                </tr>
              </thead>
              <tbody>
                {listTTHCGV?.data.body &&
                  displayData.map((iData, index) => {
                    const nameSlug = changeSlug(iData.MC_TTHC_GV_TenThuTuc)
                    return (
                      <tr key={index}>
                        <td className="border border-slate-300 text-center">
                          {index +
                            1 +
                            dataPagination.currentPage *
                              dataPagination.itemsPerPage}
                        </td>
                        <td className="border border-slate-300">
                          <div className="p-3">
                            <ul>
                              <li>
                                <Link
                                  to={`/tthc-giang-vien/chi-tiet/${nameSlug}/${iData.MC_TTHC_GV_ID}`}
                                  className="uppercase font-semibold text-[#0C4A6E]"
                                >
                                  {iData.MC_TTHC_GV_TenThuTuc}
                                </Link>
                              </li>
                              <li>
                                <span className="flex items-center gap-2">
                                  Mức độ:{' '}
                                  <span
                                    className={clsx(
                                      'inline-block w-4 h-4 rounded-full text-center font-semibold text-white text-xs',
                                      parseInt(iData.MC_TTHC_GV_IDMucDo) == 1
                                        ? 'bg-red-300'
                                        : '',
                                      parseInt(iData.MC_TTHC_GV_IDMucDo) == 2
                                        ? 'bg-red-400'
                                        : '',
                                      parseInt(iData.MC_TTHC_GV_IDMucDo) == 3
                                        ? 'bg-red-500'
                                        : '',
                                      parseInt(iData.MC_TTHC_GV_IDMucDo) >= 4
                                        ? 'bg-red-600'
                                        : '',
                                    )}
                                  >
                                    {iData.MC_TTHC_GV_IDMucDo}
                                  </span>
                                </span>
                              </li>
                            </ul>
                          </div>
                        </td>
                        <td className="border border-slate-300">
                          <p className="px-2 text-center">
                            {iData.MC_TTHC_GV_LinhVuc}
                          </p>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </>
        )}
      </div>
      {/* END: Table DS Thủ tục */}
      <div className="grid grid-cols-4 mt-5 items-center justify-between">
        <div className="col-span-4 lg:col-span-1 flex flex-row items-center">
          <p className="font-semibold text-[#336699]">
            Tổng số:{' '}
            <span>{__dsThuTucHanhChinhActive?.length} hồ sơ/thủ tục</span>
          </p>
        </div>
        <TablePagination
          component={'div'}
          className="col-span-4 lg:col-span-3"
          count={__dsThuTucHanhChinhActive?.length || 0}
          page={dataPagination.currentPage}
          rowsPerPage={dataPagination.itemsPerPage}
          labelRowsPerPage={'Số thủ tục hiển thị'}
          rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 100]}
          onPageChange={(event, newPage) => {
            setDatapagination({
              ...dataPagination,
              currentPage: Number(newPage),
            })
          }}
          onChangeRowsPerPage={(event) => {
            setDatapagination({
              ...dataPagination,
              itemsPerPage: event.target.value,
              currentPage: 0,
            })
          }}
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  )
}

DanhSachThuTuc.propTypes = {
  dataFilter: PropTypes.shape({
    phongBan: PropTypes.string,
    dieuKienLoc: PropTypes.string.isRequired,
    keywords: PropTypes.string,
  }).isRequired,
  onChangeFilter: PropTypes.func.isRequired,
  pagination: PropTypes.shape({
    page: PropTypes.number,
    size: PropTypes.number,
  }).isRequired,
}

export default DanhSachThuTuc

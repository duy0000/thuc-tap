import PropTypes from 'prop-types'

import {
  getAllLinhVuc,
  getListDonVi,
} from '@/Apis/ApiGiangVien/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien'
import {
  filterConditional,
  homeSwitcher,
} from '@/Pages/Clients/GiangVien/ThuTucHanhChinhGiangVien/constants.js'
import { TTHCGV_QUERY_KEY } from '@/Services/QueryStores/QueryKeyStores/TTHCGV.querykey'
import { useQueries } from '@tanstack/react-query'
import clsx from 'clsx'
import { useState } from 'react'
import { FaAngleRight } from 'react-icons/fa6'

function HomeMenuLeft({
  homeSwitch,
  onChangeHomeView,
  dataFilter,
  onChangeFilter,
  dataSearchParams,
  onSearchParams,
  dataPagination,
  onChangePagination,
}) {
  const [itemSelected, setItemSelected] = useState(null)

  // Query Data
  const [DonViToChucQuery, LinhVucQuery] = useQueries({
    queries: [
      {
        queryKey: [TTHCGV_QUERY_KEY.SP_MC_TTHC_GV_DanhSachPhongBan],
        queryFn: async () => {
          return await getListDonVi()
        },
      },
      {
        queryKey: [TTHCGV_QUERY_KEY.SP_MC_TTHC_GV_LinhVuc],
        queryFn: async () => {
          return await getAllLinhVuc()
        },
      },
    ],
  })

  return (
    <div className="menu-left bg-white rounded-md min-h-full shadow w-full p-2 flex flex-col gap-2">
      {Object.keys(homeSwitcher).map((item, index) => {
        const itemActive = index === itemSelected
        return (
          <div key={index}>
            <div
              onClick={() => {
                onChangeHomeView(homeSwitcher[item])
                setItemSelected(index)
                onSearchParams({
                  ...dataSearchParams,
                  page: homeSwitcher[item],
                })
              }}
              className={clsx(
                'p-2 bg-gray-200 rounded-md hover:bg-sky-800 hover:text-white font-semibold hover:cursor-pointer flex items-center justify-between',
                homeSwitch === homeSwitcher[item]
                  ? 'bg-sky-800 text-white font-semibold'
                  : '',
                index === 0 ? 'rounded-md' : '',
              )}
            >
              <p>{homeSwitcher[item]}</p>
              <FaAngleRight
                className={clsx(
                  'font-semibold',
                  homeSwitcher[item] === homeSwitcher.home
                    ? itemActive
                      ? 'transform rotate-90'
                      : ''
                    : 'hidden',
                )}
              />
            </div>
          </div>
        )
      })}
      <div
        className={clsx(
          homeSwitch === homeSwitcher.home
            ? 'flex flex-col border border-gray-200 border-b-0'
            : 'hidden',
        )}
      >
        <div className="flex items-center justify-between p-2 border-b border-gray-200">
          {filterConditional.map((item, index) => {
            return (
              <label
                htmlFor={item.value}
                className="font-semibold flex items-center gap-1 cursor-pointer"
                key={index}
                onClick={() => {
                  onChangeFilter({
                    ...dataFilter,
                    dieuKienLoc: item.value,
                  })
                }}
              >
                <input
                  type="radio"
                  defaultChecked={dataFilter.dieuKienLoc === item.value}
                  name="luachon"
                  id={item.value}
                />
                <span>{item.label}</span>
              </label>
            )
          })}
        </div>
        {/* START: List Đơn vị/Tổ chức */}
        <div
          className={clsx(
            dataFilter.dieuKienLoc === filterConditional[0].value
              ? ''
              : 'hidden',
          )}
        >
          {DonViToChucQuery.data &&
            DonViToChucQuery.data.data?.body.map((pb, index) => {
              return (
                <p
                  key={index}
                  onClick={() => {
                    onChangeFilter({
                      ...dataFilter,
                      dieuKienLoc: filterConditional[0].value,
                      keywords: pb.MC_TTHC_GV_NoiTiepNhan,
                    })
                    onSearchParams({
                      ...Object.fromEntries([...dataSearchParams]),
                      keywords: pb.MC_TTHC_GV_NoiTiepNhan,
                    })
                    onChangePagination({
                      ...dataPagination,
                      page: 0,
                    })
                  }}
                  className={clsx(
                    'border-b border-gray-200 p-2 cursor-pointer hover:bg-sky-800 hover:text-white hover:font-semibold',
                    dataFilter.keywords === pb.MC_TTHC_GV_NoiTiepNhan
                      ? 'bg-sky-800 text-white font-semibold'
                      : '',
                  )}
                >
                  {pb.MC_TTHC_GV_NoiTiepNhan}
                </p>
              )
            })}
        </div>
        {/* END: List Đơn vị/Tổ chức */}
        {/* START: List Lĩnh vực */}
        <div
          className={clsx(
            dataFilter.dieuKienLoc === filterConditional[1].value
              ? ''
              : 'hidden',
          )}
        >
          {LinhVucQuery.data &&
            LinhVucQuery.data.data?.body.map((lv, index) => {
              return (
                <p
                  key={index}
                  onClick={() => {
                    onChangeFilter({
                      ...dataFilter,
                      dieuKienLoc: filterConditional[1].value,
                      keywords: lv.MC_TTHC_GV_LinhVuc,
                    })
                    onSearchParams({
                      ...Object.fromEntries([...dataSearchParams]),
                      keywords: lv.MC_TTHC_GV_LinhVuc,
                    })
                    onChangePagination({
                      ...dataPagination,
                      page: 0,
                    })
                  }}
                  className={clsx(
                    'border-b border-gray-200 p-2 cursor-pointer hover:bg-sky-800 hover:text-white hover:font-semibold',
                    dataFilter.keywords === lv.MC_TTHC_GV_LinhVuc
                      ? 'bg-sky-800 text-white font-semibold'
                      : '',
                  )}
                >
                  {lv.MC_TTHC_GV_LinhVuc}
                </p>
              )
            })}
        </div>
        {/* END: List lĩnh vực */}
      </div>
    </div>
  )
}

HomeMenuLeft.propTypes = {
  homeSwitch: PropTypes.string.isRequired,
  onChangeHomeView: PropTypes.func.isRequired,
  dataFilter: PropTypes.shape({
    phongBan: PropTypes.string,
    dieuKienLoc: PropTypes.string.isRequired,
    keywords: PropTypes.string,
  }).isRequired,
  onChangeFilter: PropTypes.func.isRequired,
}

export default HomeMenuLeft

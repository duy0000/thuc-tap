import { DataCanBoGV } from '@/Services/Utils'
import { memo, useCallback, useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { CV_HT_TrangThai, generateLoaiCongViecFilter } from '../constants'
import { QLCV_QUERY_KEY } from '@/Services/QueryStores/QueryKeyStores/QuanLyCongViec.querykey'
import { apiQuanLyCongViec } from '@/Apis/ApiGiangVien/QuanLyCongViec'
import { useQuery } from '@tanstack/react-query'
import ListSkeletonCongViec from './ListSkeletonCongViec'
import moment from 'moment'
import { Tooltip } from '@mui/material'
import {
  FaCompressArrowsAlt,
  FaExpandArrowsAlt,
  FaSyncAlt,
} from 'react-icons/fa'
import ChiTietCongViec from './ChiTietCongViec'
import FormCapNhatTienDo from '../FormCapNhatTienDo'

const CongViecDangThucHien = memo(function CongViecDangThucHien({
  zoomTab,
  onZoomTab,
}) {
  const dataCBGV = DataCanBoGV()
  const [tab, dataSearch] = useOutletContext()
  const [showDetail, setShowDetail] = useState(false)
  const [dataCongViec, setDataCongViec] = useState(null)
  const [showModalUpdate, setShowModalUpdate] = useState(false)

  const _LoaiCongViec = useMemo(() => {
    return generateLoaiCongViecFilter(tab)
  }, [tab])

  const { data: dataCVDangThucHien, isLoading } = useQuery({
    queryKey: [
      QLCV_QUERY_KEY.GET_CV_DangThucHien,
      dataSearch?.optionSearch,
      dataSearch?.keywordSearch,
      _LoaiCongViec,
      CV_HT_TrangThai.CV_DANG_THUC_HIEN,
    ],
    queryFn: async () => {
      return await apiQuanLyCongViec.getCongViec_ByMaNhanSu({
        TrangThai: CV_HT_TrangThai.CV_DANG_THUC_HIEN,
        MaNhanSu: dataCBGV.MaNhanSu.toString(),
        Loai: _LoaiCongViec,
        Loc: dataSearch?.optionSearch || '',
        TextLoc: dataSearch?.keywordSearch || '',
      })
    },
  })

  const _listCongViecDangThucHien = useMemo(() => {
    return dataCVDangThucHien?.data?.body ?? []
  }, [dataCVDangThucHien])

  const handleShowDetailCongViec = useCallback(() => {
    setShowDetail(true)
  }, [])

  const handleCloseDetailCongViec = useCallback(() => {
    setShowDetail(false)
  }, [])

  return (
    <>
      <div className="w-full">
        <h3 className="flex items-center justify-between p-4 bg-blue-200 rounded-md mb-2">
          <span>
            <span className="font-bold">Đang thực hiện </span>
            <span> ({_listCongViecDangThucHien?.length ?? 0} công việc)</span>
          </span>
          <i
            onClick={() => {
              if (zoomTab === CV_HT_TrangThai.CV_DANG_THUC_HIEN) {
                onZoomTab(null)
              } else {
                onZoomTab(CV_HT_TrangThai.CV_DANG_THUC_HIEN)
              }
            }}
            className="hidden lg:flex w-8 h-8 rounded-full bg-white items-center justify-center cursor-pointer hover:bg-slate-100"
          >
            {zoomTab !== CV_HT_TrangThai.CV_DANG_THUC_HIEN ? (
              <FaExpandArrowsAlt size={16} color="red" />
            ) : (
              <FaCompressArrowsAlt size={16} color="red" />
            )}
          </i>
        </h3>
        {/* END: Heading */}
        {isLoading && <ListSkeletonCongViec />}
        <div className="max-h-[600px] overflow-y-auto">
          {_listCongViecDangThucHien?.length > 0
            ? _listCongViecDangThucHien.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-full relative group cursor-pointer"
                  >
                    <div className="absolute inset-0 z-[1] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-900/50 pointer-events-none text-white text-2xl font-bold rounded-md">
                      {item.CV_HT_PhanCongThucHien_XacNhan_PhanTram}%
                    </div>
                    <Tooltip
                      key={index}
                      title={
                        item.CV_HT_PhanCongThucHien_QuaHan ? (
                          <span className=" text-white text-sm font-bold p-2 rounded shadow-lg">
                            Quá hạn
                          </span>
                        ) : (
                          ''
                        )
                      }
                      arrow
                      placement="top"
                    >
                      <div className="relative p-2 bg-slate-200 rounded-md mb-2 flex gap-2 cursor-pointer hover:shadow-md hover:bg-sky-200">
                        <div
                          onClick={() => {
                            handleShowDetailCongViec()
                            setDataCongViec(item)
                          }}
                          className="w-full bg-white p-2 rounded-md"
                        >
                          <h3 className="font-bold">
                            {item.CV_HT_PhanCongThucHien_TenCongViec}
                          </h3>
                          <p className="line-clamp-3">
                            {item.CV_HT_PhanCongThucHien_GhiChu}
                          </p>
                          <p>
                            <span className="font-bold">
                              Nhân sự thực hiện:{' '}
                            </span>
                            {item.CV_HT_PhanCongThucHien_NhanSuThucHien_HoTen}
                          </p>
                          <p>
                            <span className="font-bold">Ngày bắt đầu: </span>
                            {item?.CV_HT_PhanCongThucHien_NgayBatDau &&
                              moment(
                                item?.CV_HT_PhanCongThucHien_NgayBatDau,
                              ).format('DD/MM/YYYY HH:mm')}
                          </p>
                          <p>
                            <span className="font-bold">Ngày kết thúc: </span>
                            {item?.CV_HT_PhanCongThucHien_NgayKetThuc &&
                              moment(
                                item?.CV_HT_PhanCongThucHien_NgayKetThuc,
                              ).format('DD/MM/YYYY HH:mm')}
                          </p>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2">
                          {item.CV_HT_PhanCongThucHien_NhanSuThucHien_MaNhanSu ===
                            dataCBGV.MaNhanSu && (
                            <Tooltip
                              title="Cập nhật tiến độ"
                              arrow
                              placement="top"
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  setShowModalUpdate(true)
                                  setDataCongViec(item)
                                }}
                                className="w-9 h-9 rounded-full bg-green-200 text-green-600 flex items-center justify-center font-bold"
                              >
                                <FaSyncAlt size={16} />
                              </button>
                            </Tooltip>
                          )}
                        </div>
                      </div>
                    </Tooltip>
                  </div>
                )
              })
            : null}
        </div>
      </div>
      {/* START: Show detail */}
      <ChiTietCongViec
        open={showDetail}
        onClose={handleCloseDetailCongViec}
        dataCongViec={dataCongViec}
      />
      {/* END: Show detail */}
      {/* START: Cập nhật tiến độ */}
      <FormCapNhatTienDo
        title={'Cập nhật tiến độ'}
        open={showModalUpdate}
        onHideSafeDialog={() => {
          setShowModalUpdate(false)
        }}
        onClose={() => {
          setShowModalUpdate(false)
          setDataCongViec(null)
        }}
        dataCongViec={dataCongViec}
      />
      {/* END: Cập nhật tiến độ */}
    </>
  )
})

export default CongViecDangThucHien

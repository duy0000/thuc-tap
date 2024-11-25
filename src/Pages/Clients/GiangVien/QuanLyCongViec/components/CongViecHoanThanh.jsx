import { DataCanBoGV } from '@/Services/Utils'
import { memo, useCallback, useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { CV_HT_TrangThai, generateLoaiCongViecFilter } from '../constants'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QLCV_QUERY_KEY } from '@/Services/QueryStores/QueryKeyStores/QuanLyCongViec.querykey'
import { apiQuanLyCongViec } from '@/Apis/ApiGiangVien/QuanLyCongViec'
import ListSkeletonCongViec from './ListSkeletonCongViec'
import moment from 'moment'
import {
  FaCheck,
  FaCheckDouble,
  FaCompressArrowsAlt,
  FaExpandArrowsAlt,
} from 'react-icons/fa'
import { Checkbox, Tooltip } from '@mui/material'
import ChiTietCongViec from './ChiTietCongViec'
import FormKiemTraCongViec from '../FormKiemTraCongViec'
import Swal from 'sweetalert2'
import { asyncPool } from '@/Services/Utils/poolData'

const CongViecHoanThanh = memo(function CongViecHoanThanh({
  zoomTab,
  onZoomTab,
}) {
  const dataCBGV = DataCanBoGV()
  const queryClient = useQueryClient()
  const [tab, dataSearch] = useOutletContext()
  const [showDetail, setShowDetail] = useState(false)
  const [openModalKiemTra, setOpenModalKiemTra] = useState(false)
  const [dataCongViec, setDataCongViec] = useState(null)
  const [selectCongViec, setSelectCongViec] = useState([])

  const _LoaiCongViec = useMemo(() => {
    return generateLoaiCongViecFilter(tab)
  }, [tab])

  const { data: dataCVDaHoanThanh, isLoading } = useQuery({
    queryKey: [
      QLCV_QUERY_KEY.GET_CV_DaHoanThanh,
      dataSearch?.optionSearch,
      dataSearch?.keywordSearch,
      _LoaiCongViec,
      CV_HT_TrangThai.CV_DA_HOAN_THANH,
    ],
    queryFn: async () => {
      return await apiQuanLyCongViec.getCongViec_ByMaNhanSu({
        TrangThai: CV_HT_TrangThai.CV_DA_HOAN_THANH,
        MaNhanSu: dataCBGV.MaNhanSu.toString(),
        Loai: _LoaiCongViec,
        Loc: dataSearch?.optionSearch || '',
        TextLoc: dataSearch?.keywordSearch || '',
      })
    },
  })

  const { mutateAsync: mutateKiemTraCVAsync } = useMutation({
    mutationFn: async (data) => {
      const response = await apiQuanLyCongViec.editKiemTraCongViec(data)
      return response
    },
  })

  const _listCongViecDaHoanThanh = useMemo(() => {
    return dataCVDaHoanThanh?.data?.body ?? []
  }, [dataCVDaHoanThanh])

  const handleShowDetailCongViec = useCallback(() => {
    setShowDetail(true)
  }, [])

  const handleCloseDetailCongViec = useCallback(() => {
    setShowDetail(false)
  }, [])

  const handleSelectCongViecKiemTra = (cv) => {
    setSelectCongViec((prev) => {
      const isExist = prev.find(
        (item) =>
          item.CV_HT_PhanCongThucHien_ID === cv.CV_HT_PhanCongThucHien_ID,
      )
      if (isExist) {
        return prev.filter(
          (item) =>
            item.CV_HT_PhanCongThucHien_ID !== cv.CV_HT_PhanCongThucHien_ID,
        )
      }
      return [...prev, cv]
    })
  }

  // console.log('cv Select: ', selectCongViec)
  const handleAcceptSuccessJob = async () => {
    if (selectCongViec.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng chọn công việc cần xác nhận hoàn thành!',
      })
      return
    }

    const isSelectedJobNotRoleCheck = selectCongViec.some(
      (i) =>
        i.CV_HT_PhanCongThucHien_NhanSuKiemTra_MaNhanSu !== dataCBGV.MaNhanSu,
    )
    if (isSelectedJobNotRoleCheck) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng chỉ chọn những công việc mà Thầy/Cô được kiểm tra!',
      })
      return
    }

    Swal.fire({
      icon: 'question',
      title: 'Thầy/Cô chắc chắn muốn xác nhận hoàn thành công việc?',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log('OK')
        try {
          const multipleResponse = await asyncPool(
            5,
            selectCongViec,
            mutateKiemTraCVAsync,
          )
          if (multipleResponse?.length === selectCongViec?.length) {
            Swal.fire({
              icon: 'success',
              title: 'Thành công',
            })
            queryClient.invalidateQueries({
              queryKey: [QLCV_QUERY_KEY.GET_CV_DaHoanThanh],
            })
          }
        } catch (error) {
          console.log('Check ERROR: ', error)
          Swal.fire({
            icon: 'error',
            title: 'Đã có lỗi xảy ra. Vui lòng thử lại sau!',
          })
        }
      }
    })
  }

  return (
    <>
      <div className="w-full">
        <h3 className="flex items-center justify-between p-4 bg-green-200 rounded-md mb-2">
          <span>
            <span className="font-bold">Đã hoàn thành </span>
            <span> ({_listCongViecDaHoanThanh?.length ?? 0} công việc)</span>
          </span>
          <div className="flex items-center gap-2">
            <i
              onClick={handleAcceptSuccessJob}
              className="hidden lg:flex w-8 h-8 rounded-full bg-white items-center justify-center cursor-pointer hover:bg-green-100"
            >
              <FaCheckDouble color="#16a34a" />
            </i>
            <i
              onClick={() => {
                if (zoomTab === CV_HT_TrangThai.CV_DA_HOAN_THANH) {
                  onZoomTab(null)
                } else {
                  onZoomTab(CV_HT_TrangThai.CV_DA_HOAN_THANH)
                }
              }}
              className="hidden lg:flex w-8 h-8 rounded-full bg-white items-center justify-center cursor-pointer hover:bg-slate-100"
            >
              {zoomTab !== CV_HT_TrangThai.CV_DA_HOAN_THANH ? (
                <FaExpandArrowsAlt size={16} color="red" />
              ) : (
                <FaCompressArrowsAlt size={16} color="red" />
              )}
            </i>
          </div>
        </h3>
        {/* END: Heading */}
        {isLoading && <ListSkeletonCongViec />}
        <div className="max-h-[600px] overflow-y-auto">
          {_listCongViecDaHoanThanh?.length > 0
            ? _listCongViecDaHoanThanh.map((item, index) => {
                const isSelected = selectCongViec.find(
                  (cv) =>
                    cv.CV_HT_PhanCongThucHien_ID ===
                    item.CV_HT_PhanCongThucHien_ID,
                )
                return (
                  <div
                    key={index}
                    className="p-2 bg-slate-200 rounded-md mb-2 flex items-center gap-1 cursor-pointer hover:bg-sky-200"
                  >
                    <Checkbox
                      checked={!!isSelected}
                      size="small"
                      onClick={() => {
                        handleSelectCongViecKiemTra(item)
                      }}
                    />
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
                        <span className="font-bold">Nhân sự thực hiện: </span>
                        {item.CV_HT_PhanCongThucHien_NhanSuThucHien_HoTen}
                      </p>
                      <p>
                        <span className="font-bold">Nhân sự kiểm tra: </span>
                        {item.CV_HT_PhanCongThucHien_NhanSuKiemTra_HoTen}
                      </p>
                      <div className="flex items-center justify-between gap-1">
                        <p>
                          <span className="font-bold">Ngày bắt đầu: </span>
                          {item?.CV_HT_PhanCongThucHien_NgayBatDau &&
                            moment(
                              item?.CV_HT_PhanCongThucHien_NgayBatDau,
                            ).format('DD/MM/YYYY')}
                        </p>
                        <p>
                          <span className="font-bold">Ngày kết thúc: </span>
                          {item?.CV_HT_PhanCongThucHien_NgayKetThuc &&
                            moment(
                              item?.CV_HT_PhanCongThucHien_NgayKetThuc,
                            ).format('DD/MM/YYYY')}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Tooltip title="Kiểm tra công việc" arrow placement="top">
                        {item.CV_HT_PhanCongThucHien_NhanSuKiemTra_MaNhanSu ===
                          dataCBGV.MaNhanSu && (
                          <button
                            type="button"
                            onClick={() => {
                              setOpenModalKiemTra(true)
                              setDataCongViec(item)
                            }}
                            className="w-9 h-9 rounded-full bg-green-200 text-green-700 flex items-center justify-center font-bold"
                          >
                            <FaCheck size={16} />
                          </button>
                        )}
                      </Tooltip>
                    </div>
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
      {/* START: Form kiểm tra công việc */}
      <FormKiemTraCongViec
        open={openModalKiemTra}
        onClose={() => {
          setOpenModalKiemTra(false)
        }}
        dataCongViec={dataCongViec}
        onSetDataCongViec={setDataCongViec}
      />
      {/* END: Form kiểm tra công việc */}
    </>
  )
})

export default CongViecHoanThanh

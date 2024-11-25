import { apiQuanLyCongViec } from '@/Apis/ApiGiangVien/QuanLyCongViec'
import { QLCV_QUERY_KEY } from '@/Services/QueryStores/QueryKeyStores/QuanLyCongViec.querykey'
import { DataCanBoGV } from '@/Services/Utils'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { BiSolidEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { CV_HT_TrangThai, generateLoaiCongViecFilter } from '../constants'
import {
  useNavigate,
  useOutletContext,
  useSearchParams,
} from 'react-router-dom'
import { memo, useCallback, useMemo, useState } from 'react'
import ListSkeletonCongViec from './ListSkeletonCongViec'
import moment from 'moment'
import { Tooltip } from '@mui/material'
import {
  FaCompressArrowsAlt,
  FaExpandArrowsAlt,
  FaSyncAlt,
} from 'react-icons/fa'
import FormCongViec from '../FormCongViec'
import ChiTietCongViec from './ChiTietCongViec'
import Swal from 'sweetalert2'
import FormCapNhatTienDo from '../FormCapNhatTienDo'

const CongViecChuaThucHien = memo(function CongViecChuaThucHien({
  zoomTab,
  onZoomTab,
}) {
  const dataCBGV = DataCanBoGV()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [tab, dataSearch] = useOutletContext()
  const [openModal, setOpenModal] = useState({
    formAddEdit: false,
    formCNTD: false,
  })
  const [showDetail, setShowDetail] = useState(false)
  const [dataCongViec, setDataCongViec] = useState(null)
  const queryClient = useQueryClient()

  const _LoaiCongViec = useMemo(() => {
    return generateLoaiCongViecFilter(tab)
  }, [tab])

  const { data: dataCVChuaThucHien, isLoading } = useQuery({
    queryKey: [
      QLCV_QUERY_KEY.GET_CV_ChuaThucHien,
      dataSearch?.optionSearch,
      dataSearch?.keywordSearch,
      _LoaiCongViec,
      CV_HT_TrangThai.CV_CHUA_THUC_HIEN,
    ],
    queryFn: async () => {
      return await apiQuanLyCongViec.getCongViec_ByMaNhanSu({
        TrangThai: CV_HT_TrangThai.CV_CHUA_THUC_HIEN,
        MaNhanSu: dataCBGV.MaNhanSu.toString(),
        Loai: _LoaiCongViec,
        Loc: dataSearch?.optionSearch || '',
        TextLoc: dataSearch?.keywordSearch || '',
      })
    },
  })

  const {
    mutateAsync: mutateDeleteKhoiTaoCVAsync,
    isLoading: isLoadingDelete,
  } = useMutation({
    mutationFn: async (taskId) => {
      return await apiQuanLyCongViec.delCongViec({
        CV_HT_KhoiTaoCV_ID: taskId,
      })
    },
  })
  const {
    mutateAsync: mutateDeletePhanCongThucHienAsync,
    isLoading: isLoadingDeletePCTH,
  } = useMutation({
    mutationFn: async (taskId) => {
      return await apiQuanLyCongViec.delCongViecPhanCong({
        CV_HT_PhanCongThucHien_IDKhoiTaoCV: taskId,
      })
    },
  })

  const _listCongViecChuaThucHien = useMemo(() => {
    return dataCVChuaThucHien?.data?.body ?? []
  }, [dataCVChuaThucHien])

  const handleShowDetailCongViec = useCallback(() => {
    setShowDetail(true)
  }, [])

  const handleCloseDetailCongViec = useCallback(() => {
    setShowDetail(false)
    setDataCongViec(null)
  }, [])

  const handleAddActionEdit = () => {
    const currentParams = new URLSearchParams(searchParams)
    currentParams.set('action', 'edit')
    navigate({
      pathname: '/quan-ly-cong-viec',
      search: `?${currentParams.toString()}`,
    })
  }

  const handleDeleteActionEdit = () => {
    const currentParams = new URLSearchParams(searchParams)
    console.log('check - currentParams: ', currentParams)
    currentParams.delete('action')
    navigate({
      pathname: '/quan-ly-cong-viec',
      search: `?${currentParams.toString()}`,
    })
  }

  const handleDeleteCongViec = (taskId) => {
    Swal.fire({
      icon: 'question',
      title: 'Thầy/Cô chắc chắn muốn xóa công việc này?',
      text: '',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      showConfirmButton: true,
      confirmButtonText: 'Đồng ý',
      confirmButtonColor: '#dc2626',
      confirmButtonAriaLabel: 'Xác nhận',
    }).then((result) => {
      if (result.isConfirmed) {
        const delResponse = Promise.all([
          mutateDeleteKhoiTaoCVAsync(taskId),
          mutateDeletePhanCongThucHienAsync(taskId),
        ])
        delResponse
          .then(() => {
            Swal.fire('Thông báo', 'Công việc đã được xóa.', 'success')
            queryClient.invalidateQueries({
              queryKey: [QLCV_QUERY_KEY.GET_CV_ChuaThucHien],
            })
          })
          .catch((errors) => {
            Swal.fire('Lỗi!', 'Đã có lỗi xảy ra khi xóa công việc.', 'error')
            console.error('Lỗi khi xóa công việc', errors)
          })
          .finally(() => {
            queryClient.invalidateQueries({
              queryKey: [QLCV_QUERY_KEY.GET_CV_ChuaThucHien],
            })
          })
      }
    })
  }

  return (
    <>
      <div className="w-full">
        <h3 className="flex items-center justify-between p-4 bg-red-200 rounded-md mb-2">
          <span>
            <span className="font-bold">Chưa thực hiện </span>
            <span> ({_listCongViecChuaThucHien?.length || 0} công việc)</span>
          </span>
          <i
            onClick={() => {
              if (zoomTab === CV_HT_TrangThai.CV_CHUA_THUC_HIEN) {
                onZoomTab(null)
              } else {
                onZoomTab(CV_HT_TrangThai.CV_CHUA_THUC_HIEN)
              }
            }}
            className="hidden lg:flex w-8 h-8 rounded-full bg-white items-center justify-center cursor-pointer hover:bg-slate-100"
          >
            {zoomTab !== CV_HT_TrangThai.CV_CHUA_THUC_HIEN ? (
              <FaExpandArrowsAlt size={16} color="red" />
            ) : (
              <FaCompressArrowsAlt size={16} color="red" />
            )}
          </i>
        </h3>
        {/* END: Heading */}
        {isLoading && <ListSkeletonCongViec />}
        <div className="max-h-[600px] overflow-y-auto">
          {_listCongViecChuaThucHien?.length > 0
            ? _listCongViecChuaThucHien.map((item, index) => {
                return (
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
                    <div className="p-2 bg-slate-200 rounded-md mb-2 flex items-center justify-evenly gap-2 cursor-pointer hover:shadow-md hover:bg-sky-200">
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
                      <div className="flex flex-col gap-2">
                        {item.HT_USER_Create === dataCBGV.HT_USER_ID && (
                          <>
                            <Tooltip
                              title="Chỉnh sửa công việc"
                              arrow
                              placement="right"
                            >
                              <button
                                disabled={
                                  isLoadingDelete || isLoadingDeletePCTH
                                }
                                onClick={() => {
                                  setOpenModal({
                                    ...openModal,
                                    formAddEdit: true,
                                    formCNTD: false,
                                  })
                                  setDataCongViec(item)
                                  handleAddActionEdit()
                                }}
                                type="button"
                                className="w-9 h-9 rounded-full bg-blue-300 flex items-center justify-center font-bold"
                              >
                                <BiSolidEdit size={16} />
                              </button>
                            </Tooltip>
                            <Tooltip
                              title="Xóa công việc"
                              arrow
                              placement="right"
                              hidden={
                                item.HT_USER_Create !== dataCBGV.HT_USER_ID
                              }
                            >
                              <button
                                disabled={
                                  isLoadingDelete || isLoadingDeletePCTH
                                }
                                type="button"
                                onClick={() => {
                                  handleDeleteCongViec(
                                    item?.CV_HT_PhanCongThucHien_IDKhoiTaoCV,
                                  )
                                }}
                                className="w-9 h-9 rounded-full bg-red-200 text-red-600 flex items-center justify-center font-bold"
                              >
                                <AiFillDelete size={16} />
                              </button>
                            </Tooltip>
                          </>
                        )}
                        {item.CV_HT_PhanCongThucHien_NhanSuThucHien_MaNhanSu ===
                          dataCBGV.MaNhanSu && (
                          <Tooltip
                            disabled={isLoadingDelete || isLoadingDeletePCTH}
                            title="Cập nhật tiến độ"
                            arrow
                            placement="right"
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setOpenModal({
                                  ...openModal,
                                  formAddEdit: false,
                                  formCNTD: true,
                                })
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
      {/* START: Form Công việc */}
      <FormCongViec
        title={'Chỉnh sửa công việc'}
        open={openModal.formAddEdit}
        onClose={() => {
          setOpenModal({
            ...openModal,
            formAddEdit: false,
          })
          handleDeleteActionEdit()
        }}
        onSetDataCongViec={setDataCongViec}
        dataDetail={dataCongViec}
      />
      {/* END: Form Công việc */}
      <FormCapNhatTienDo
        title={'Cập nhật tiến độ'}
        open={openModal.formCNTD}
        onHideSafeDialog={() => {
          setOpenModal({
            ...openModal,
            formCNTD: false,
          })
        }}
        onClose={() => {
          setOpenModal({
            ...openModal,
            formCNTD: false,
          })
          setDataCongViec(null)
        }}
        dataCongViec={dataCongViec}
      />
    </>
  )
})

export default CongViecChuaThucHien

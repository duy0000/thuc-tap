import { apiQuanLyCongViec } from '@/Apis/ApiGiangVien/QuanLyCongViec'
import Button from '@/Components/Base/Button/Button'
import { QLCV_QUERY_KEY } from '@/Services/QueryStores/QueryKeyStores/QuanLyCongViec.querykey'
import { DataCanBoGV, dayjs } from '@/Services/Utils'
import { asyncPool } from '@/Services/Utils/poolData'
import { Checkbox, Dialog, Slide } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { memo, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const DanhSachCongViecDinhKy = memo(function DanhSachCongViecDinhKy({
  open,
  onClose,
}) {
  const queryClient = useQueryClient()
  const dataCBGV = DataCanBoGV()
  const [selectCongViec, setSelectCongViec] = useState([])

  const { data: dataCVDinhKy } = useQuery({
    queryKey: [QLCV_QUERY_KEY.GET_CONG_VIEC_DINH_KY, dataCBGV.CV_HT_NhanSu_ID],
    queryFn: async () => {
      const response = await apiQuanLyCongViec.getCVDinhKy({
        CV_HT_KhoiTaoCV_KeHoach_IDNhanSu: dataCBGV.CV_HT_NhanSu_ID,
      })
      return response.data
    },
  })

  const { mutateAsync: mutateSyncCongViec } = useMutation({
    mutationFn: async (data) => {
      return await apiQuanLyCongViec.addCVDinhKy(data)
    },
  })

  const __listCongViecDinhKy = useMemo(() => {
    return dataCVDinhKy?.body || []
  }, [dataCVDinhKy])

  const handleSelectCongViec = (cv) => {
    setSelectCongViec((prev) => {
      const index = prev.findIndex(
        (i) => i.CV_HT_PhanCongThucHien_ID === cv.CV_HT_PhanCongThucHien_ID,
      )
      if (index === -1) {
        return [...prev, cv]
      } else {
        return prev.filter(
          (i) => i.CV_HT_PhanCongThucHien_ID !== cv.CV_HT_PhanCongThucHien_ID,
        )
      }
    })
  }

  const handleSyncCongViec = async () => {
    let _countSuccess = 0,
      _countErorr = 0

    if (selectCongViec.length === 0) {
      toast.error('Vui lòng chọn công việc cần đồng bộ!')
      return
    }

    const _newDataSubmitSelected = selectCongViec.map((cv) => ({
      CV_HT_KhoiTaoCV_KhoiTao_TenNhomThucHien:
        cv.CV_HT_PhanCongThucHien_NhomThucHien,
      CV_HT_KhoiTaoCV_KhoiTao_GiaoNhanViec:
        cv.CV_HT_PhanCongThucHien_GiaoNhanViec,
      CV_HT_KhoiTaoCV_KeHoach_XacDinhCongViec:
        cv.CV_HT_KhoiTaoCV_KeHoach_LoaiCongViec,
      CV_HT_KhoiTaoCV_KeHoach_UuTien: cv.CV_HT_PhanCongThucHien_UuTien,
      CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCha:
        cv.CV_HT_PhanCongThucHien_NhomCongViecCha,
      CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCon:
        cv.CV_HT_PhanCongThucHien_NhomCongViecCon,
      CV_HT_KhoiTaoCV_KeHoach_TenCongViec:
        cv.CV_HT_PhanCongThucHien_TenCongViec,
      CV_HT_KhoiTaoCV_KeHoach_TenFile: '',
      CV_HT_KhoiTaoCV_KeHoach_DataFile: '',
      CV_HT_KhoiTaoCV_KeHoach_IDNhanSu:
        cv.CV_HT_PhanCongThucHien_NhanSuThucHien_ID,
      CV_HT_KhoiTaoCV_KeHoach_LoaiGiaoViec: 'Giao việc trực tiếp',
      CV_HT_KhoiTaoCV_KeHoach_NgayBatDau: cv.CV_HT_PhanCongThucHien_NgayBatDau,
      CV_HT_KhoiTaoCV_KeHoach_NgayKetThuc:
        cv.CV_HT_PhanCongThucHien_NgayKetThuc,
      CV_HT_KhoiTaoCV_KeHoach_GhiChu: cv.CV_HT_PhanCongThucHien_GhiChu,
      IDNhanSu: cv.CV_HT_PhanCongThucHien_NhanSuKiemTra_ID,
      HT_USER_Create: cv.HT_USER_Create,
      CV_HT_KhoiTaoCV_HienThi: 'true',
      CV_HT_KhoiTaoCV_SuDung: '',
    }))

    onClose && onClose()
    Swal.fire({
      icon: 'question',
      title: 'Thầy/Cô xác nhận muốn đồng bộ công việc?',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      showConfirmButton: true,
      confirmButtonText: 'Xác nhận',
    }).then(async ({ isConfirmed }) => {
      if (isConfirmed) {
        try {
          const __multiResSyncJob = await asyncPool(
            5,
            _newDataSubmitSelected,
            mutateSyncCongViec,
          )

          __multiResSyncJob.some((res) => {
            if (res.data.code === 200) {
              _countSuccess++
            } else {
              _countErorr++
            }
          })

          Swal.fire({
            icon: 'info',
            title: 'Đồng bộ công việc',
            html: `<p>Số công việc đồng bộ thành công: ${_countSuccess}</p>
                <p>Số công việc đồng bộ thất bại: ${_countErorr}</p>`,
          })
        } catch (error) {
          toast.error('Đồng bộ công việc thất bại!')
        } finally {
          queryClient.invalidateQueries({
            queryKey: [QLCV_QUERY_KEY.GET_CONG_VIEC_DINH_KY],
          })
          setSelectCongViec([])
          queryClient.invalidateQueries({
            queryKey: [QLCV_QUERY_KEY.GET_CV_ChuaThucHien],
          })
        }
      }
    })
  }

  return (
    <>
      <Dialog
        fullWidth
        maxWidth={'lg'}
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <div className="w-full flex items-center justify-between bg-sky-800 p-4">
          <h3 className="text-xl font-bold text-white">
            Đồng bộ công việc định kỳ
          </h3>
        </div>
        {/* END: Header */}

        <div className="w-full p-3">
          <div className="relative inset-0 w-full overflow-auto max-h-[500px] rounded-lg">
            <table>
              <thead className="sticky top-0 z-[1] bg-sky-800 text-white">
                <tr>
                  <td className="p-2 border-r font-bold text-center whitespace-nowrap rounded-tl-lg">
                    Chọn
                  </td>
                  <td className="p-2 border-r font-bold text-center whitespace-nowrap">
                    Tên công việc
                  </td>
                  <td className="p-2 border-r font-bold text-center whitespace-nowrap">
                    Nội dung chi tiết công việc
                  </td>
                  <td className="p-2 border-r font-bold text-center whitespace-nowrap">
                    Loại công việc
                  </td>
                  <td className="p-2 border-r font-bold text-center whitespace-nowrap">
                    Nhân sự thực hiện
                  </td>
                  <td className="p-2 border-r font-bold text-center whitespace-nowrap">
                    Ngày bắt đầu
                  </td>
                  <td className="p-2 border-r font-bold text-center whitespace-nowrap">
                    Ngày kết thúc
                  </td>
                  <td className="p-2 border-r font-bold text-center whitespace-nowrap">
                    Dự án công việc cụ thể
                  </td>
                  <td className="p-2 border-r font-bold text-center whitespace-nowrap">
                    Nhóm công việc cha
                  </td>
                  <td className="p-2 border-r font-bold text-center whitespace-nowrap">
                    Nhóm công việc con
                  </td>
                  <td className="p-2 border-r font-bold text-center whitespace-nowrap">
                    Ưu tiên
                  </td>
                  <td className="p-2 border-r font-bold text-center whitespace-nowrap">
                    Mức độ khó
                  </td>
                  <td className="p-2 border-r font-bold text-center whitespace-nowrap">
                    Mã nhân sự
                  </td>
                  <td className="p-2 border-r font-bold text-center whitespace-nowrap">
                    Tên nhân sự
                  </td>
                  <td className="p-2 border-r font-bold text-center whitespace-nowrap">
                    Nhóm chuyên môn
                  </td>
                  <td className="p-2 border-r font-bold text-center whitespace-nowrap">
                    Khả năng chuyên môn
                  </td>
                  <td className="p-2 border-r font-bold text-center whitespace-nowrap">
                    Mã nhân sự kiểm tra
                  </td>
                  <td className="p-2 font-bold whitespace-nowrap rounded-tr-lg">
                    Tên nhân sự kiểm tra
                  </td>
                </tr>
              </thead>
              <tbody>
                {__listCongViecDinhKy?.length > 0 ? (
                  __listCongViecDinhKy.map((cv, index) => {
                    return (
                      <tr
                        key={cv?.CV_HT_PhanCongThucHien_ID || index}
                        className="border-b"
                      >
                        <td className="p-2 border-r border-l">
                          <Checkbox
                            size="small"
                            onChange={() => handleSelectCongViec(cv)}
                          />
                        </td>
                        <td className="p-2 border-r">
                          {cv?.CV_HT_PhanCongThucHien_TenCongViec}
                        </td>
                        <td className="p-2 border-r">
                          {cv?.CV_HT_PhanCongThucHien_GhiChu}
                        </td>
                        <td className="p-2 border-r">
                          {cv?.CV_HT_KhoiTaoCV_KeHoach_LoaiCongViec}
                        </td>
                        <td className="p-2 border-r">
                          {cv?.CV_HT_PhanCongThucHien_NhanSuThucHien_HoTen}
                        </td>
                        <td className="p-2 border-r">
                          {cv?.CV_HT_PhanCongThucHien_NgayBatDau
                            ? dayjs(
                                cv?.CV_HT_PhanCongThucHien_NgayBatDau,
                              ).format('HH:mm, DD/MM/YYYY')
                            : 'N/A'}
                        </td>
                        <td className="p-2 border-r">
                          {cv?.CV_HT_PhanCongThucHien_NgayKetThuc
                            ? dayjs(
                                cv?.CV_HT_PhanCongThucHien_NgayKetThuc,
                              ).format('HH:mm, DD/MM/YYYY')
                            : 'N/A'}
                        </td>
                        <td className="p-2 border-r">
                          {cv?.CV_HT_PhanCongThucHien_NhomThucHien}
                        </td>
                        <td className="p-2 border-r">
                          {cv?.CV_HT_PhanCongThucHien_NhomCongViecCha}
                        </td>
                        <td className="p-2 border-r">
                          {cv?.CV_HT_PhanCongThucHien_NhomCongViecCon}
                        </td>
                        <td className="p-2 border-r">
                          <p className="w-20">
                            {cv?.CV_HT_PhanCongThucHien_UuTien}
                          </p>
                        </td>
                        <td className="p-2 border-r">
                          {cv?.CV_HT_PhanCongThucHien_ThoiHan_MucDoKho}
                        </td>
                        <td className="p-2 border-r">
                          {cv?.CV_HT_PhanCongThucHien_NhanSuXacNhan_MaNhanSu}
                        </td>
                        <td className="p-2 border-r">
                          {cv?.CV_HT_PhanCongThucHien_NhanSuXacNhan_HoTen}
                        </td>
                        <td className="p-2 border-r">
                          {
                            cv?.CV_HT_PhanCongThucHien_NhanSuThucHien_NhomChuyenMon
                          }
                        </td>
                        <td className="p-2 border-r">
                          {
                            cv?.CV_HT_PhanCongThucHien_NhanSuThucHien_KhaNangChuyenMon
                          }
                        </td>
                        <td className="p-2 border-r">
                          {cv?.CV_HT_PhanCongThucHien_NhanSuKiemTra_MaNhanSu}
                        </td>
                        <td className="p-2 border-r">
                          {cv?.CV_HT_PhanCongThucHien_NhanSuKiemTra_HoTen}
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={9}
                      className="text-red-600 p-3 font-bold text-center"
                    >
                      Không có công việc định kỳ nào!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-4 flex items-center justify-end gap-2 bg-slate-200">
          <Button
            // disabled={isLoading}
            color="danger"
            onClick={() => {
              onClose && onClose()
            }}
          >
            Hủy
          </Button>
          <Button
            // disabled={isLoading}
            onClick={handleSyncCongViec}
          >
            Đồng bộ
          </Button>
        </div>
        {/* END: Footer */}
      </Dialog>
    </>
  )
})

export default DanhSachCongViecDinhKy

import { Fragment, Suspense, useContext, useMemo, useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import Button from '@/Components/Base/Button/Button'
import Icon from '@/Components/Base/Icon/Icon'
import { Brush } from '@/Components/Base/Icons/Brush'
import { Trash } from '@/Components/Base/Icons/Trash'
import DrawerLichDanhGia from './DrawerLichDanhGia'
import Loading from '@/Components/Loading/Loading'
import {
  useDGDC_LichDanhGiaStore,
  useThoiGianThucHienStore,
} from '@/Services/Store'
import { isEmpty, keys } from 'lodash-unified'
import { HoSoKiemDinhCtx, stepStatusEnum } from '@/Services/Tokens'
import dayjs from 'dayjs'
import Swal from 'sweetalert2'
import { deleteDGDCLichTrich, putThoiGianThucHien } from '@/Apis/KDCL'

export default function LichDanhGia() {
  const hoSoKiemDinh = useContext(HoSoKiemDinhCtx)
  const { listLichDanhGia, refetch: refetchListLichDanhGia } =
    useDGDC_LichDanhGiaStore()
  const { refetch: refetchListThoiGianThucHien } = useThoiGianThucHienStore()

  const [isOpen, setIsOpen] = useState(false)
  const [form, setForm] = useState()
  const [isCompleting, setIsCompleting] = useState(false)

  const lichDanhGiaGroupByDate = useMemo(() => {
    return listLichDanhGia
      .filter(
        (e) =>
          e.KT_KDCL_LapKH_DanhGiaDongCap_IDHoSoKiemDinh ===
          hoSoKiemDinh.hoSoKiemDinh.KT_KDCL_CTDT_HoSoKiemDinh_ID,
      )
      .reduce((acc, curr) => {
        if (!acc[curr.KT_KDCL_LapKH_DanhGiaDongCap_ThoiGian]) {
          acc[curr.KT_KDCL_LapKH_DanhGiaDongCap_ThoiGian] = []
        }

        acc[curr.KT_KDCL_LapKH_DanhGiaDongCap_ThoiGian].push(curr)
        return acc
      }, {})
  }, [listLichDanhGia, hoSoKiemDinh.hoSoKiemDinh])

  const isCompleted = useMemo(() => {
    return (
      hoSoKiemDinh.thoiGianQuyTrinh?.KT_KDCL_CTDT_ThoiGianThucHien_TrangThai ===
      stepStatusEnum.DaHoanThanh
    )
  }, [hoSoKiemDinh.thoiGianQuyTrinh])

  const handleDelete = async (row) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Thông báo',
      html: `Xác nhận xoá nội dung lịch trình đánh giá ngoài <b>${row.KT_KDCL_LapKH_DanhGiaDongCap_NoiDung}</b>?`,
      showCancelButton: true,
      confirmButtonColor: '#336699',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    })
    if (!result.isConfirmed) return

    await deleteDGDCLichTrich(row.KT_KDCL_LapKH_DanhGiaDongCap_ID)
    await refetchListLichDanhGia()
  }

  const handleUpdateStepStatus = async () => {
    if (isCompleting) return
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Thông báo',
      html: `Xác nhận hoàn thành bước này?`,
      showCancelButton: true,
      confirmButtonColor: '#336699',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    })

    if (!result.isConfirmed) return

    try {
      setIsCompleting(true)
      await putThoiGianThucHien({
        ...hoSoKiemDinh.thoiGianQuyTrinh,
        KT_KDCL_CTDT_ThoiGianThucHien_TrangThai: stepStatusEnum.DaHoanThanh,
      })
      await refetchListThoiGianThucHien()
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Thông báo',
        text: 'Có lỗi xảy ra, vui lòng thử lại sau hoặc liên hệ quản trị viên!',
      })
    } finally {
      setIsCompleting(false)
    }
  }

  return (
    <div className="z-[2] mt-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
        <h3 className="uppercase cursor-default text-uneti-primary-light ml-3 font-semibold">
          lịch trình đánh giá ngoài chương trình đào tạo tại đơn vị
        </h3>

        {!isCompleted && (
          <div className="flex gap-2 justify-end items-center ml-auto">
            <Button isLoading={isCompleting} onClick={handleUpdateStepStatus}>
              Hoàn thành
            </Button>
            <Button onClick={() => setIsOpen(true)}>Thêm mới</Button>
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-1 overflow-x-auto">
        <table className="uneti-u-table">
          <thead>
            <tr className="bg-uneti-primary">
              <th className="p-2 text-white !text-left min-w-[160px]">
                Nội dung
              </th>
              <th className="p-2 text-white min-w-[200px]">Địa điểm</th>
              <th className="p-2 text-white min-w-[160px]">Lưu ý</th>
              {!isCompleted && <th className="p-2 text-white w-44">Tác vụ</th>}
            </tr>
          </thead>
          <tbody>
            {isEmpty(lichDanhGiaGroupByDate) && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center text-base text-uneti-primary font-medium"
                >
                  Không có dữ liệu
                </td>
              </tr>
            )}
            {keys(lichDanhGiaGroupByDate)
              .sort((a, b) => {
                return dayjs(a).isBefore(dayjs(b)) ? -1 : 1
              })
              .map((key, i) => (
                <Fragment key={i}>
                  <tr key={'group-' + i}>
                    <td className="!bg-[#F4F7F8]">
                      <b>Ngày làm việc thứ {i + 1}</b>
                    </td>
                    <td className="!bg-[#F4F7F8]" colSpan={2}>
                      <b>{dayjs(key).format('DD/MM/YYYY')}</b>
                    </td>
                    {!isCompleted && (
                      <td className="!bg-[#F4F7F8] !py-2">
                        <button
                          onClick={() => {
                            setForm({
                              KT_KDCL_LapKH_DanhGiaDongCap_ThoiGian: key,
                            })
                            setIsOpen(true)
                          }}
                          className="icon-btn mx-auto"
                        >
                          <Icon>
                            <BiPlus />
                          </Icon>
                        </button>
                      </td>
                    )}
                  </tr>
                  {lichDanhGiaGroupByDate[key].map((e) => (
                    <tr key={e}>
                      <td className="!pl-5 md:!pl-7">
                        {e.KT_KDCL_LapKH_DanhGiaDongCap_NoiDung}
                      </td>
                      <td>{e.KT_KDCL_LapKH_DanhGiaDongCap_DiaDiem}</td>
                      <td>{e.KT_KDCL_LapKH_DanhGiaDongCap_LuuY}</td>
                      {!isCompleted && (
                        <td>
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => {
                                setForm(e)
                                setIsOpen(true)
                              }}
                              className="icon-btn"
                            >
                              <Icon>
                                <Brush />
                              </Icon>
                            </button>
                            <button
                              onClick={() => handleDelete(e)}
                              className="icon-btn"
                            >
                              <Icon>
                                <Trash />
                              </Icon>
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </Fragment>
              ))}
          </tbody>
        </table>
      </div>

      <Suspense fallback={<Loading />}>
        {isOpen && (
          <DrawerLichDanhGia
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            form={form}
          />
        )}
      </Suspense>
    </div>
  )
}

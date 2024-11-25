import { useContext, useState } from 'react'
import Swal from 'sweetalert2'
import { isNil } from 'lodash-unified'

import { putThoiGianThucHien } from '@/Apis/KDCL'
import Button from '@/Components/Base/Button/Button'
import { useThoiGianThucHienStore } from '@/Services/Store'
import { HoSoKiemDinhCtx, stepStatusEnum } from '@/Services/Tokens'
import TickCircle from '@/Components/Base/Icons/TickCircle.jsx'
import Icon from '@/Components/Base/Icon/Icon'

export default function ActionPheDuyet({
  validate = () => true,
  IDQuyTrinhKiemDinhTiepTheo = undefined,
}) {
  const hoSoKiemDinhCtx = useContext(HoSoKiemDinhCtx)
  const [isPosting, setIsPosting] = useState(false)
  const { refetch: refetchThoiGianThucHien } = useThoiGianThucHienStore()

  const capNhatTrangThaiQuyTrinh = async (trangThai) => {
    const thoiGianQuyTrinh = hoSoKiemDinhCtx.thoiGianQuyTrinh

    if (!thoiGianQuyTrinh) {
      Swal.fire({
        icon: 'warning',
        title: 'Thông báo',
        html: `Vui lòng cập nhật cấu hình thời gian kiểm định tại <b>Bước 1: Thành lập hội đồng</b>`,
      })
      return
    }

    if (isPosting || !validate(trangThai)) return

    try {
      setIsPosting(true)
      await putThoiGianThucHien({
        ...thoiGianQuyTrinh,
        KT_KDCL_CTDT_ThoiGianThucHien_TrangThai: trangThai,
      })

      if (
        !isNil(IDQuyTrinhKiemDinhTiepTheo) &&
        trangThai == stepStatusEnum.DaPheDuyet
      ) {
        await putThoiGianThucHien({
          ...hoSoKiemDinhCtx.thoiGianThucHien.find(
            (thoiGianThucHien) =>
              thoiGianThucHien.KT_KDCL_CTDT_ThoiGianThucHien_IDQuyTrinhKiemDinh ==
              IDQuyTrinhKiemDinhTiepTheo,
          ),
          KT_KDCL_CTDT_ThoiGianThucHien_TrangThai: stepStatusEnum.DangThucHien,
        })
      }

      await refetchThoiGianThucHien()
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Thông báo',
        text: 'Có lỗi xảy ra, vui lòng thử lại sau!',
      })
    } finally {
      setIsPosting(false)
    }
  }

  switch (
    hoSoKiemDinhCtx.thoiGianQuyTrinh?.KT_KDCL_CTDT_ThoiGianThucHien_TrangThai
  ) {
    case stepStatusEnum.DaTrinhGui:
      if (hoSoKiemDinhCtx.isChuTich || hoSoKiemDinhCtx.isPhoChuTich) {
        return (
          <div>
            <Button
              disabled={isPosting}
              onClick={() =>
                capNhatTrangThaiQuyTrinh(stepStatusEnum.DaPheDuyet)
              }
            >
              Phê duyệt
            </Button>
            <Button
              disabled={isPosting}
              onClick={() =>
                capNhatTrangThaiQuyTrinh(stepStatusEnum.KhongPheDuyet)
              }
              className="mt-2"
              type="border"
            >
              Từ chối
            </Button>
          </div>
        )
      }
      return (
        <p className="text-uneti-primary font-medium">
          Đã gửi yêu cầu phê duyệt
        </p>
      )

    case stepStatusEnum.DaPheDuyet:
      return (
        <div className="flex items-center bg-green-700/80 text-white px-2 py-[2px] rounded gap-1 w-max">
          <Icon size={20}>
            <TickCircle />
          </Icon>
          Đã phê duyệt
        </div>
      )

    case stepStatusEnum.KhongPheDuyet:
    case stepStatusEnum.DangThucHien:
      if (
        hoSoKiemDinhCtx.isChuTich ||
        hoSoKiemDinhCtx.isPhoChuTich ||
        hoSoKiemDinhCtx.isBanThuKy
      ) {
        return (
          <Button
            disabled={isPosting}
            onClick={() => capNhatTrangThaiQuyTrinh(stepStatusEnum.DaTrinhGui)}
          >
            Gửi phê duyệt
          </Button>
        )
      }
      return ''

    case stepStatusEnum.ChuaThucHien:
      if (
        hoSoKiemDinhCtx.isChuTich ||
        hoSoKiemDinhCtx.isPhoChuTich ||
        hoSoKiemDinhCtx.isBanThuKy
      ) {
        return (
          <Button
            disabled={isPosting}
            onClick={() =>
              capNhatTrangThaiQuyTrinh(stepStatusEnum.DangThucHien)
            }
          >
            Bắt đầu thực hiện
          </Button>
        )
      }
  }

  return (
    <p className="text-base font-medium text-uneti-primary-light">
      Đang cập nhật
    </p>
  )
}

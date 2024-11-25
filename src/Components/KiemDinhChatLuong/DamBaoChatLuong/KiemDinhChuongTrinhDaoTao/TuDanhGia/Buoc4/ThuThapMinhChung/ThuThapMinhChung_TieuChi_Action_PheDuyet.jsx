import { useContext, useState } from 'react'
import {
  HoSoKiemDinhCtx,
  stepStatusEnum,
  stepStatusTextEnum,
} from '@/Services/Tokens/index.js'
import Swal from 'sweetalert2'
import { putMinhChung } from '@/Apis/KDCL/index.js'
import Button from '@/Components/Base/Button/Button.jsx'
import { useMinhChungStore } from '@/Services/Store/Module/KiemDinhChatLuong/minhChung.js'
import Tag from '@/Components/Base/Tag/Tag.jsx'

export default function ThuThapMinhChung_TieuChi_Action_PheDuyet({
  MinhChung,
}) {
  const hoSoKiemDinhCtx = useContext(HoSoKiemDinhCtx)

  const [isPosting, setIsPosting] = useState(false)
  const { refetch } = useMinhChungStore()

  const capNhatTrangThai = async (trangThai) => {
    if (isPosting) return

    try {
      setIsPosting(true)

      await putMinhChung({
        ...MinhChung,
        KT_KDCL_TaiLieu_TrangThai_PheDuyet: trangThai,
      })
      await refetch()
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

  switch (MinhChung.KT_KDCL_TaiLieu_TrangThai_PheDuyet) {
    case stepStatusEnum.DaTrinhGui:
      if (
        hoSoKiemDinhCtx.isChuTich ||
        hoSoKiemDinhCtx.isPhoChuTich ||
        hoSoKiemDinhCtx.isBanThuKy
      ) {
        return (
          <div className="flex gap-1 items-center">
            <Button
              disabled={isPosting}
              onClick={() => capNhatTrangThai(stepStatusEnum.DaPheDuyet)}
              color="success"
              type="border"
            >
              Phê duyệt
            </Button>
            <Button
              disabled={isPosting}
              onClick={() => capNhatTrangThai(stepStatusEnum.KhongPheDuyet)}
              type="border"
              color="danger"
            >
              Từ chối
            </Button>
          </div>
        )
      }
      return (
        <p className="text-uneti-primary font-medium">Đã yêu cầu phê duyệt</p>
      )

    case stepStatusEnum.KhongPheDuyet:
    case stepStatusEnum.DangThucHien:
      return (
        <Button
          disabled={isPosting}
          onClick={() => capNhatTrangThai(stepStatusEnum.DaTrinhGui)}
        >
          Gửi phê duyệt
        </Button>
      )

    case stepStatusEnum.DaPheDuyet:
      return (
        <Tag color="success">
          {stepStatusTextEnum[stepStatusEnum.DaPheDuyet]}
        </Tag>
      )

    default:
      null
  }
}

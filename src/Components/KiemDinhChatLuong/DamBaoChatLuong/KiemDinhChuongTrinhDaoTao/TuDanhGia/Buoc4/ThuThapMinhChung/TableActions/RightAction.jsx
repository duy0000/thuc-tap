import Swal from 'sweetalert2'
import { isNil } from 'lodash-unified'
import Button from '@/Components/Base/Button/Button.jsx'
import { postThuThapMinhChung, putThuThapMinhChung } from '@/Apis/KDCL/index.js'
import { useThuThapMinhChungStore } from '@/Services/Store/index.js'
import { useContext } from 'react'
import { HoSoKiemDinhCtx } from '@/Services/Tokens/index.js'
import BtnExportExcel from '../ExportExcel/BtnExportExcel'
import Icon from '@/Components/Base/Icon/Icon'
import { RiCheckFill } from 'react-icons/ri'
import { HiOutlineDocument, HiPlus } from 'react-icons/hi2'

export default function RightAction({
  thuThapMinhChung,
  handleChonMinhChung,
  handleThemMoiMinhChung,
  tieuChuan,
  tieuChi,
  IDTieuChi,
  listThuThapMinhChungTieuChi,
}) {
  const hoSoKiemDinh = useContext(HoSoKiemDinhCtx)
  const { refetch: refetchListThuThapMinhChung } = useThuThapMinhChungStore()

  const onComplete = async () => {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Thông báo',
      html: `Xác nhận hoàn thành thu thập minh chứng tiêu chí <span>${tieuChi?.KT_KDCL_TieuChi_Ma}</span>`,
      showCancelButton: true,
      confirmButtonColor: '#336699',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    })
    if (!result.isConfirmed) return

    let action = null

    let data = {
      ...thuThapMinhChung,
      KT_KDCL_CTDT_ThuThapMinhChung_IDTieuChi: IDTieuChi,
      KT_KDCL_CTDT_ThuThapMinhChung_IDThanhLapHoiDong:
        hoSoKiemDinh.hoiDong.KT_KDCL_CTDT_ThanhLapHoiDong_ID,
      KT_KDCL_CTDT_ThuThapMinhChung_TrangThai: true,
    }

    if (isNil(thuThapMinhChung?.KT_KDCL_CTDT_ThuThapMinhChung_ID)) {
      action = postThuThapMinhChung
    } else {
      action = putThuThapMinhChung
    }

    await action(data)
    await refetchListThuThapMinhChung()
  }

  return (
    <div className="flex py-2 items-center ml-auto justify-end gap-2 flex-wrap">
      <BtnExportExcel
        tieuChuan={tieuChuan}
        tieuChi={tieuChi}
        listThuThapMinhChungTieuChi={listThuThapMinhChungTieuChi}
      />

      {!thuThapMinhChung?.KT_KDCL_CTDT_ThuThapMinhChung_TrangThai && (
        <>
          <Button onClick={onComplete}>
            <Icon>
              <RiCheckFill />
            </Icon>
            Hoàn thành
          </Button>
          <Button onClick={handleChonMinhChung}>
            <Icon className="text-white">
              <HiOutlineDocument />
            </Icon>
            Chọn tài liệu
          </Button>
          <Button onClick={handleThemMoiMinhChung}>
            <Icon>
              <HiPlus />
            </Icon>
            Thêm mới minh chứng
          </Button>
        </>
      )}
    </div>
  )
}

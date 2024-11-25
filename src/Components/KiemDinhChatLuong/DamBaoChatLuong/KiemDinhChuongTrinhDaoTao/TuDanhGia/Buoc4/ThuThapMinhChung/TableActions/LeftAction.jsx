import Icon from '@/Components/Base/Icon/Icon.jsx'
import { CgClose } from 'react-icons/cg'
import { AiOutlineCloudDownload } from 'react-icons/ai'
import { RiGlobalLine } from 'react-icons/ri'
import { HoSoKiemDinhCtx, stepStatusEnum } from '@/Services/Tokens/index.js'
import {
  convertBufferToBase64,
  handleDownloadFileBase64,
} from '@/Services/Utils/index.js'
import { loadMinhChung_R_Para_File, postMinhChung } from '@/Apis/KDCL/index.js'
import Swal from 'sweetalert2'
import { useContext, useState } from 'react'
import Loading from '@/Components/Base/Icons/Loading.jsx'
import { cloneDeep } from 'lodash-unified'
import { MinhChungType } from '@/Services/Tokens/KDCL/CTDT/minhChung.js'
import { useMinhChungStore } from '@/Services/Store/Module/KiemDinhChatLuong/minhChung.js'

export default function LeftAction({
  minhChungSelected,
  setMinhChungSelected,
}) {
  const hoSoKiemDinhCtx = useContext(HoSoKiemDinhCtx)
  const { refetch: refetchListMinhChung } = useMinhChungStore()
  const [isDownloading, setIsDownloading] = useState(false)
  const [isDuplicating, setIsDuplicating] = useState(false)

  const loadTaiLieu_R_Para = async () => {
    const res = await loadMinhChung_R_Para_File(
      minhChungSelected.KT_KDCL_TaiLieu_ID,
    )

    const file = res.data.body[0]?.KT_KDCL_TaiLieu_DataFile?.data
    if (!file) return ''
    return convertBufferToBase64(file)
  }

  const handleDownloadFile = async () => {
    if (isDownloading) return

    try {
      setIsDownloading(true)
      const filebase64 = await loadTaiLieu_R_Para()
      if (!filebase64) {
        Swal.fire({
          title: 'Không thể tải file',
          text: 'Có lỗi xảy ra khi tải file đính kèm, vui lòng thử lại sau hoặc liên hệ quản trị viên!',
          icon: 'error',
        })
        return
      }

      handleDownloadFileBase64(
        minhChungSelected.KT_KDCL_TaiLieu_TenFile,
        filebase64,
      )
    } finally {
      setIsDownloading(false)
    }
  }

  const handleDuaVaoMucDungChung = async () => {
    const res = await Swal.fire({
      title: 'Xác nhận thao tác',
      text: 'Bạn có chắc chắn muốn đưa minh chứng này vào mục dùng chung?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy',
    })

    if (!res.isConfirmed || isDuplicating) return

    try {
      setIsDuplicating(true)
      const res = await loadMinhChung_R_Para_File(
        minhChungSelected.KT_KDCL_TaiLieu_ID,
      )
      const minhChung = res.data.body[0]
      if (!minhChung) return

      const minhChungDuplicated = cloneDeep(minhChung)
      minhChungDuplicated.KT_KDCL_TaiLieu_DataFile = convertBufferToBase64(
        minhChungDuplicated.KT_KDCL_TaiLieu_DataFile.data,
      )
      minhChungDuplicated.KT_KDCL_TaiLieu_Type = MinhChungType.Public
      minhChungDuplicated.KT_KDCL_TaiLieu_Ma = ''

      await postMinhChung(minhChungDuplicated)
      refetchListMinhChung()
    } catch {
      Swal.fire({
        title: 'Có lỗi xảy ra',
        text: 'Có lỗi xảy ra khi thực hiện thao tác, vui lòng thử lại sau hoặc liên hệ quản trị viên!',
        icon: 'error',
      })
    } finally {
      setIsDuplicating(false)
    }
  }

  if (!minhChungSelected) return null

  return (
    <div className="bg-white shadow-2xl px-4 py-2 rounded-lg flex items-center gap-3">
      <button
        onClick={() => setMinhChungSelected(null)}
        className="px-2 rounded flex items-center gap-1 hover:underline focus:!border-dashed active:border-dashed border-transparent border focus:border-uneti-primary"
      >
        <Icon size={13}>
          <CgClose />
        </Icon>
        Bỏ chọn
      </button>

      {minhChungSelected.KT_KDCL_TaiLieu_TenFile && (
        <div className="border-l pl-4">
          <button
            onClick={handleDownloadFile}
            className="px-2 rounded flex items-end gap-1 hover:underline focus:!border-dashed active:border-dashed border-transparent border focus:border-uneti-primary"
          >
            {isDownloading && (
              <Icon className="loading">
                <Loading />
              </Icon>
            )}
            <Icon size={18}>
              <AiOutlineCloudDownload />
            </Icon>
            Tải file đính kèm
          </button>
        </div>
      )}

      {(hoSoKiemDinhCtx.isChuTich ||
        hoSoKiemDinhCtx.isPhoChuTich ||
        hoSoKiemDinhCtx.isBanThuKy) &&
        minhChungSelected.KT_KDCL_TaiLieu_TrangThai_PheDuyet ===
          stepStatusEnum.DaPheDuyet && (
          <div className="border-l pl-4">
            <button
              onClick={handleDuaVaoMucDungChung}
              className="px-2 rounded flex items-end gap-1 hover:underline focus:!border-dashed active:border-dashed border-transparent border focus:border-uneti-primary"
            >
              {isDuplicating && (
                <Icon className="loading">
                  <Loading />
                </Icon>
              )}
              <Icon size={18}>
                <RiGlobalLine />
              </Icon>
              Đưa vào mục dùng chung
            </button>
          </div>
        )}
    </div>
  )
}

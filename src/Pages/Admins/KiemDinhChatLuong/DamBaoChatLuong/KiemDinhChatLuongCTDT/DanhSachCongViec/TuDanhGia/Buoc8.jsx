import { useContext } from 'react'
import { FiDownloadCloud, FiUploadCloud } from 'react-icons/fi'

import {
  convertBufferToBase64,
  handleDownloadFileBase64,
} from '@/Services/Utils'
import { HoSoKiemDinhCtx, stepStatusEnum } from '@/Services/Tokens'
import Icon from '@/Components/Base/Icon/Icon'
import { useDkDanhGiaDongCapStore } from '@/Services/Store/Module/KiemDinhChatLuong/dangKyDanhGiaDongCap'
import FileUpload from '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/TuDanhGia/Buoc8/FileUpload'
import { useQuery } from '@tanstack/react-query'
import { loadDkDanhGiaDongCap } from '@/Apis/KDCL'

export default function Buoc8() {
  const hoSoKiemDinh = useContext(HoSoKiemDinhCtx)

  const { listDkDanhGiaDongCap = [] } = useDkDanhGiaDongCapStore()

  const { data: hoSoDangKy, refetch: refetchHoSoDangKy } = useQuery({
    queryKey: ['KDCL_CTDT_DK_DanhGiaDongCap'],
    queryFn: async () => {
      const ID = listDkDanhGiaDongCap.find(
        (e) =>
          e.KT_KDCL_CTDT_DK_DanhGiaDongCap_IDHoSoKiemDinh ===
          hoSoKiemDinh.hoSoKiemDinh?.KT_KDCL_CTDT_HoSoKiemDinh_ID,
      ).KT_KDCL_CTDT_DK_DanhGiaDongCap_ID

      if (!ID) return {}

      const res = await loadDkDanhGiaDongCap(ID)
      return res.data.body[0]
    },
  })

  if (
    hoSoDangKy?.KT_KDCL_CTDT_DK_DanhGiaDongCap_TrangThai ===
    stepStatusEnum.DaPheDuyet
  ) {
    return (
      <div className="flex flex-col gap-2 px-2 py-2 md:px-5 md:py-6 rounded-lg shadow-sm bg-white">
        <div
          onClick={() =>
            handleDownloadFileBase64(
              hoSoDangKy.KT_KDCL_CTDT_DK_DanhGiaDongCap_TenFile,
              convertBufferToBase64(
                hoSoDangKy.KT_KDCL_CTDT_DK_DanhGiaDongCap_DataFile.data,
              ),
            )
          }
          className="border border-uneti-primary-lighter bg-uneti-primary-lighter/5 rounded-lg p-3 cursor-pointer"
        >
          <div className="text-center text-uneti-primary-light">
            <Icon size={44}>
              <FiDownloadCloud />
            </Icon>

            <p>{hoSoDangKy?.KT_KDCL_CTDT_DK_DanhGiaDongCap_TenFile}</p>
          </div>

          <h3 className="text-center text-uneti-primary font-semibold">
            Hồ sơ đăng ký đánh giá ngoài đã được phê duyệt
          </h3>
        </div>
      </div>
    )
  }

  if (
    hoSoKiemDinh.isChuTich ||
    hoSoKiemDinh.isPhoChuTich ||
    hoSoKiemDinh.isBanThuKy
  ) {
    return (
      <FileUpload
        hoSoDangKy={hoSoDangKy}
        refetchHoSoDangKy={refetchHoSoDangKy}
      />
    )
  }

  return (
    <div className="flex flex-col gap-2 p-3 md:px-5 md:py-6 rounded-lg shadow-sm bg-white">
      <div className="border border-dashed border-slate-300/90 rounded-lg p-3 cursor-not-allowed">
        <p className="text-center text-slate-300">
          <Icon size={44}>
            <FiUploadCloud />
          </Icon>
        </p>

        <h3 className="text-center text-slate-400 font-semibold">
          Tải lên báo cáo tự đánh giá đã được thẩm định
        </h3>
      </div>
    </div>
  )
}

import { useContext } from 'react'
import { HoSoKiemDinhCtx, IDQuyTrinhKiemDinhEnum } from '@/Services/Tokens'
import ActionPheDuyet from '../../ActionPheDuyet'
import ActionUploadFile from '../../ActionUploadFile'

export default function Actions() {
  const hoSoKiemDinh = useContext(HoSoKiemDinhCtx)

  return (
    <div className="mt-0 md:mt-10 rounded-lg p-4 bg-white flex-1 h-max flex gap-3 flex-col md:max-w-[270px]">
      <ActionPheDuyet
        IDQuyTrinhKiemDinhTiepTheo={IDQuyTrinhKiemDinhEnum.DanhGiaDongCap.Buoc5}
      />
      <ActionUploadFile dialogTitle="Tải lên báo cáo đánh giá tiêu chí" />

      {hoSoKiemDinh.fileQuyTrinh?.KT_KDCL_HoSoLuuTru_TenFile && (
        <div>
          <h4 className="text-uneti-primary">
            <p className="font-medium">Báo cáo đánh giá tiêu chí</p>
          </h4>
          <p
            onClick={() => hoSoKiemDinh.downloadFileHoSoLuuTru()}
            className="hover:underline cursor-pointer text-uneti-primary-lighter break-words"
          >
            {hoSoKiemDinh.fileQuyTrinh.KT_KDCL_HoSoLuuTru_TenFile}
          </p>
        </div>
      )}
    </div>
  )
}

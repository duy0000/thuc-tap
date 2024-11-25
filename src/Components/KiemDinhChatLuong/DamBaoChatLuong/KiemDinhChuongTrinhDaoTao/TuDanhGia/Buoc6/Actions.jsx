import { useContext } from 'react'
import { HoSoKiemDinhCtx, IDQuyTrinhKiemDinhEnum } from '@/Services/Tokens'
import ActionPheDuyet from '../../ActionPheDuyet'
import ActionUploadFile from '../../ActionUploadFile'
import ActionExportDocx from '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/TuDanhGia/Buoc6/ActionExportDocx/ActionExportDocx.jsx'

export default function Actions() {
  const hoSoKiemDinh = useContext(HoSoKiemDinhCtx)

  return (
    <div className="rounded-lg p-3 md:p-4 bg-white flex-1 h-max flex gap-3 flex-col md:max-w-[270px]">
      <ActionPheDuyet
        IDQuyTrinhKiemDinhTiepTheo={IDQuyTrinhKiemDinhEnum.TuDanhGia.Buoc7}
      />
      <ActionUploadFile
        buttonText="Upload báo cáo TĐG"
        dialogTitle="Tải lên báo cáo TĐG"
      />

      {hoSoKiemDinh.fileQuyTrinh?.KT_KDCL_HoSoLuuTru_TenFile && (
        <div>
          <h4 className="text-uneti-primary">
            <p className="font-medium">Báo cáo TĐG</p>
          </h4>
          <p
            onClick={() => hoSoKiemDinh.downloadFileHoSoLuuTru()}
            className="hover:underline cursor-pointer text-uneti-primary-lighter break-words"
          >
            {hoSoKiemDinh.fileQuyTrinh.KT_KDCL_HoSoLuuTru_TenFile}
          </p>
        </div>
      )}

      <ActionExportDocx />
    </div>
  )
}

import { useContext } from 'react'
import { HoSoKiemDinhCtx } from '@/Services/Tokens'
import ActionUploadFile from '../../ActionUploadFile'

export default function Actions() {
  const hoSoKiemDinh = useContext(HoSoKiemDinhCtx)

  return (
    <div className="rounded-lg p-3 md:p-4 bg-white flex-1 h-max flex gap-3 flex-col md:max-w-[270px]">
      <ActionUploadFile
        buttonText="Chỉnh sửa báo cáo TĐG"
        dialogTitle="Tải lên bản chỉnh sửa báo cáo TĐG"
      />

      {hoSoKiemDinh.fileQuyTrinh?.KT_KDCL_HoSoLuuTru_TenFile && (
        <div>
          <h4 className="text-uneti-primary">
            <p className="font-medium">Báo cáo TĐG chờ thẩm định</p>
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

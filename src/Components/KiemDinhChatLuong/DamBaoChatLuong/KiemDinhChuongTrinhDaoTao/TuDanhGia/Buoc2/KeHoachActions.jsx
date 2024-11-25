import { useContext } from 'react'
import KeHoachActionPheDuyet from './KeHoachActionPheDuyet'
import KeHoachActionUploadFile from './KeHoachActionUploadFile'
import { HoSoKiemDinhCtx } from '@/Services/Tokens'

export default function KeHoachActions({ keHoach }) {
  const hoSoKiemDinh = useContext(HoSoKiemDinhCtx)

  return (
    <div className="rounded-lg p-4 bg-white flex-1 h-max flex gap-3 flex-col md:max-w-[270px]">
      <KeHoachActionPheDuyet keHoach={keHoach} />
      <KeHoachActionUploadFile keHoach={keHoach} />

      {hoSoKiemDinh.fileQuyTrinh?.KT_KDCL_HoSoLuuTru_TenFile && (
        <div>
          <h4 className="text-uneti-primary">
            <p className="font-medium">Phiếu phân tích đã ký</p>
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

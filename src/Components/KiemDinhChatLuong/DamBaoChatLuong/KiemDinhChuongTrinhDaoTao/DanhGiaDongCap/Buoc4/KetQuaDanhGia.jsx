import { useNamespace } from '@/Services/Hooks'
import { useDGDC_PhanCongThucHienStore } from '@/Services/Store'
import { HoSoKiemDinhCtx, stepStatusTextEnum } from '@/Services/Tokens'
import { useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

export default function KetQuaDanhGia() {
  const navigate = useNavigate()
  const hoSoKiemDinh = useContext(HoSoKiemDinhCtx)
  const tableNamespace = useNamespace('u-table')

  const { listPhanCongThucHien } = useDGDC_PhanCongThucHienStore()

  const listPhanCongTrongHoiDong = useMemo(() => {
    return listPhanCongThucHien.filter((item) =>
      hoSoKiemDinh.thanhPhanHoiDong.find(
        (e) =>
          e.KT_KDCL_CTDT_ThanhPhanHoiDong_ID ===
          item.KT_KDCL_DGDC_PhanCongThucHien_IDThanhPhanHoiDong,
      ),
    )
  }, [listPhanCongThucHien, hoSoKiemDinh.thanhPhanHoiDong])

  const handleClickTieuChuan = ({ IDTieuChuan }) => {
    navigate(
      `/dam-bao-chat-luong/chat-luong-ctdt/${hoSoKiemDinh.hoSoKiemDinh?.KT_KDCL_CTDT_HoSoKiemDinh_ID}/danh-gia-ngoai/buoc-4?q=ket-qua-danh-gia.${IDTieuChuan}`,
    )
  }

  return (
    <div className="z-[2] mt-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="uppercase cursor-default text-uneti-primary-light ml-3 font-semibold">
          danh sách kết quả đánh giá chất lượng đồng cấp
        </h3>
      </div>

      <div className="flex gap-3 mt-1 overflow-x-auto">
        <table className={tableNamespace.b()}>
          <thead>
            <tr>
              <th style={{ width: 50 }}>STT</th>
              <th className="min-w-[150px] !text-left">Tiêu chuẩn</th>
              <th className="min-w-[200px]">Nội dung tiêu chuẩn</th>
              <th className="min-w-[140px]">Người thực hiện</th>
              <th className="min-w-[130px]">Trạng thái</th>
            </tr>
          </thead>

          <tbody>
            {hoSoKiemDinh.listTieuChuan.map((tieuChuan, i) => (
              <tr key={i}>
                <td className="text-center">{i + 1}</td>
                <td>
                  <div
                    onClick={() =>
                      handleClickTieuChuan({
                        IDTieuChuan: tieuChuan.KT_KDCL_TieuChuan_ID,
                      })
                    }
                    className="text-cyan-700 hover:underline cursor-pointer"
                    dangerouslySetInnerHTML={{
                      __html: tieuChuan.KT_KDCL_TieuChuan_Ma,
                    }}
                  />
                </td>
                <td>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: tieuChuan.KT_KDCL_TieuChuan_Ten,
                    }}
                  />
                </td>
                <td>
                  {
                    hoSoKiemDinh.thanhPhanHoiDong.find(
                      (tphd) =>
                        tphd.KT_KDCL_CTDT_ThanhPhanHoiDong_ID ===
                        listPhanCongTrongHoiDong.find(
                          (e) =>
                            e.KT_KDCL_DGDC_PhanCongThucHien_IDTieuChuan ===
                            tieuChuan.KT_KDCL_TieuChuan_ID,
                        )?.KT_KDCL_DGDC_PhanCongThucHien_IDThanhPhanHoiDong,
                    )?.KT_KDCL_CTDT_ThanhPhanHoiDong_HoTen
                  }
                </td>
                <td>
                  {
                    stepStatusTextEnum[
                      listPhanCongTrongHoiDong.find(
                        (e) =>
                          e.KT_KDCL_DGDC_PhanCongThucHien_IDTieuChuan ===
                          tieuChuan.KT_KDCL_TieuChuan_ID,
                      )?.KT_KDCL_DGDC_PhanCongThucHien_TrangThaiDanhGia
                    ]
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

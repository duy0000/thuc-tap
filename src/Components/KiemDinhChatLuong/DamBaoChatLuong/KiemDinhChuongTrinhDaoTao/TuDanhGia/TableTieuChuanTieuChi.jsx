import { HoSoKiemDinhCtx, stepStatusEnum } from '@/Services/Tokens'
import { transformCls } from '@/Services/Utils'
import { isNil } from 'lodash-unified'
import { useContext } from 'react'

export default function TableTieuChuanTieuChi({
  handleClickTieuChi,
  danhSachTrangThai,
}) {
  const hoSoKiemDinh = useContext(HoSoKiemDinhCtx)

  return (
    <table className="uneti-u-table">
      <thead>
        <tr>
          <th style={{ width: 50 }}>STT</th>
          <th className="!text-left">Tiêu chuẩn</th>
          <th className="!text-left">Nội dung tiêu chuẩn</th>
          <th>Tiêu chí</th>
        </tr>
      </thead>

      <tbody>
        {hoSoKiemDinh.listTieuChuan?.map((tieuChuan, index) => (
          <tr key={tieuChuan.KT_KDCL_TieuChuan_ID}>
            <td className="text-center">{index + 1}</td>
            <td>
              <div
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
              <div className="flex flex-wrap items-center gap-1 !w-32 md:!w-auto max-w-[300px]">
                {hoSoKiemDinh.listTieuChiMappedByTieuChuanID[
                  tieuChuan.KT_KDCL_TieuChuan_ID
                ]?.map((tieuChi, tcIndex) => (
                  <button
                    key={tcIndex}
                    className={transformCls([
                      'icon-btn',
                      isNil(
                        danhSachTrangThai?.[tieuChi.KT_KDCL_TieuChi_ID]
                          ?._TrangThai_,
                      )
                        ? ''
                        : danhSachTrangThai[tieuChi.KT_KDCL_TieuChi_ID]
                              ._TrangThai_ == true ||
                            danhSachTrangThai[tieuChi.KT_KDCL_TieuChi_ID]
                              ._TrangThai_ == stepStatusEnum.DaPheDuyet
                          ? 'bg-uneti-primary text-white hover:bg-uneti-primary'
                          : danhSachTrangThai[tieuChi.KT_KDCL_TieuChi_ID]
                                ._TrangThai_ == stepStatusEnum.KhongPheDuyet
                            ? 'bg-vs-danger text-white hover:bg-red-600'
                            : danhSachTrangThai[tieuChi.KT_KDCL_TieuChi_ID]
                                  ._TrangThai_ == stepStatusEnum.DaTrinhGui
                              ? 'bg-vs-warn text-white hover:bg-orange-400'
                              : 'bg-uneti-primary-lighter text-white hover:bg-uneti-primary-light',
                    ])}
                    onClick={() =>
                      handleClickTieuChi({
                        IDTieuChi: tieuChi.KT_KDCL_TieuChi_ID,
                        IDTieuChuan: tieuChuan.KT_KDCL_TieuChuan_ID,
                      })
                    }
                  >
                    {tcIndex + 1}
                  </button>
                ))}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

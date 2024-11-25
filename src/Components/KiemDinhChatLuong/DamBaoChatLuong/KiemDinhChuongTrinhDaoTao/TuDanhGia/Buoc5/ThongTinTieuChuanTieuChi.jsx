import { Skeleton } from '@/Components/Base/index.js'

export default function ThongTinTieuChuanTieuChi({
  isLoadingListTieuChi,
  listPhanCongThucHienLoading,
  tieuChuan,
  tieuChi,
}) {
  return (
    <>
      <div className="flex gap-1">
        <b>Tiêu chuẩn:</b>
        <Skeleton loading={listPhanCongThucHienLoading}>
          <div>
            {tieuChuan?.KT_KDCL_TieuChuan_Ma} -{' '}
            {tieuChuan?.KT_KDCL_TieuChuan_Ten}
          </div>
        </Skeleton>
      </div>
      <div className="flex gap-1">
        <b>Tiêu chí:</b>
        <Skeleton loading={isLoadingListTieuChi}>
          <div
            dangerouslySetInnerHTML={{
              __html: tieuChi?.KT_KDCL_TieuChi_Ma,
            }}
          />{' '}
          - {tieuChi?.KT_KDCL_TieuChi_JSON_DATA[0].KT_KDCL_BoTieuChuan_NoiDung}
        </Skeleton>
      </div>
    </>
  )
}

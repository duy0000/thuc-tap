import Button from '@/Components/Base/Button/Button'
import Icon from '@/Components/Base/Icon/Icon'
import { dayjs, transformCls } from '@/Services/Utils'
import { BsEye } from 'react-icons/bs'

export default function TableLichSu({
  TotalPage,
  paginate,
  setPaginate,
  ListDanhGia_LichSu,
  showDiff,
}) {
  return (
    <div className="w-[500px]">
      {/*  Paginate*/}
      {TotalPage > 1 && (
        <div className={'flex justify-end gap-2 mb-2 items-center'}>
          <span>
            Trang {paginate.SoTrang}/{TotalPage}
          </span>
          <button
            onClick={() => {
              if (paginate.SoTrang == 1) return
              setPaginate({
                ...paginate,
                SoTrang: paginate.SoTrang - 1,
              })
            }}
            className={transformCls([
              'border px-3 py-1 rounded-lg',
              paginate.SoTrang == 1
                ? 'bg-slate-50 cursor-not-allowed'
                : 'hover:bg-slate-100',
            ])}
          >
            Trang trước
          </button>
          <button
            onClick={() => {
              if (paginate.SoTrang == TotalPage) return
              setPaginate({
                ...paginate,
                SoTrang: paginate.SoTrang + 1,
              })
            }}
            className={transformCls([
              'border px-3 py-1 rounded-lg',
              paginate.SoTrang == TotalPage
                ? 'bg-slate-50 cursor-not-allowed'
                : 'hover:bg-slate-100',
            ])}
          >
            Trang sau
          </button>
        </div>
      )}

      <table className="uneti-u-table w-full">
        <thead>
          <tr>
            <th style={{ minWidth: 120, textAlign: 'center' }}>
              Ngày chỉnh sửa
            </th>
            <th>Người chỉnh sửa</th>
            <th>So sánh</th>
          </tr>
        </thead>
        <tbody>
          {ListDanhGia_LichSu.map((item, i, arr) => {
            const tags = []

            if (
              dayjs(
                item.KT_KDCL_CTDT_DanhGiaTieuChi_DateEditor ??
                  item.KT_KDCL_CTDT_DanhGiaTieuChi_DateCreate,
              ).format('DD/MM/YYYY') !=
                dayjs(
                  arr[i - 1]?.KT_KDCL_CTDT_DanhGiaTieuChi_DateEditor ??
                    arr[i - 1]?.KT_KDCL_CTDT_DanhGiaTieuChi_DateCreate,
                ).format('DD/MM/YYYY') ||
              i == 0
            ) {
              tags.push(
                <tr key={`${i}-head`}>
                  <td colSpan={3} className="px-5 py-1">
                    <p className="text-gray-600 font-medium">
                      Ngày{' '}
                      {dayjs(
                        item.KT_KDCL_CTDT_DanhGiaTieuChi_DateEditor ??
                          item.KT_KDCL_CTDT_DanhGiaTieuChi_DateCreate,
                      ).format('DD/MM/YYYY')}
                    </p>
                  </td>
                </tr>,
              )
            }

            tags.push(
              <tr key={i}>
                <td style={{ minWidth: 120 }} className="px-5">
                  {dayjs(
                    item.KT_KDCL_CTDT_DanhGiaTieuChi_DateEditor ??
                      item.KT_KDCL_CTDT_DanhGiaTieuChi_DateCreate,
                  )
                    .utc()
                    .format('HH:mm:ss')}
                </td>
                <td className="px-5">
                  {item.KT_KDCL_CTDT_DanhGiaTieuChi_TenNhanSu_Edit ??
                    item.KT_KDCL_CTDT_DanhGiaTieuChi_TenNhanSu_Create}
                </td>
                <td className="px-5">
                  {i != arr.length - 1 && (
                    <Button
                      type="flat"
                      icon
                      className="mx-auto"
                      onClick={() => showDiff(item, arr[i + 1])}
                    >
                      <Icon>
                        <BsEye />
                      </Icon>
                    </Button>
                  )}
                </td>
              </tr>,
            )

            return tags
          })}
        </tbody>
      </table>
    </div>
  )
}

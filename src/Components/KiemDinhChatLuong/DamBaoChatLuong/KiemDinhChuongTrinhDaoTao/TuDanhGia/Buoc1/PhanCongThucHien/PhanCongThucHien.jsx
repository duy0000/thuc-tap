import { lazy, Suspense, useContext, useMemo, useState } from 'react'
import Swal from 'sweetalert2'
import { isNil } from 'lodash-unified'

import { delPhanCongThucHien } from '@/Apis/KDCL'
import { HoSoKiemDinhCtx } from '@/Services/Tokens'
import { usePhanCongThucHienStore } from '@/Services/Store'

import { TableColumn, Table } from '@/Components/Base'
import Icon from '@/Components/Base/Icon/Icon'
import { Brush } from '@/Components/Base/Icons/Brush'
import { Trash } from '@/Components/Base/Icons/Trash'
import Loading from '@/Components/Loading/Loading'

const DialogPhanCongChiTiet = lazy(() => import('./DialogPhanCongChiTiet'))

export default function PhanCongThucHien() {
  const hoSoKiemDinhCtx = useContext(HoSoKiemDinhCtx)
  const [isOpenUpdateDetail, setIsOpenUpdateDetail] = useState(false)
  const [IDTieuChuanSelected, setIDTieuChuanSelected] = useState()

  const { listPhanCongThucHienMapped, refetch: refetchListPhanCongThucHien } =
    usePhanCongThucHienStore({
      listTieuChuan: hoSoKiemDinhCtx.listTieuChuan,
      nhomChuyenTrach: hoSoKiemDinhCtx.nhomChuyenTrach,
      hoiDong: hoSoKiemDinhCtx.hoiDong,
    })

  const phanCongThucHienSelected = useMemo(() => {
    return listPhanCongThucHienMapped.find(
      (pc) => pc.KT_KDCL_TieuChuan_ID === IDTieuChuanSelected,
    )
  }, [listPhanCongThucHienMapped, IDTieuChuanSelected])

  const handleDelPhanCong = async (row) => {
    const result = await Swal.fire({
      title: `Bạn chắc chắn muốn xóa mục phân công này khỏi danh sách?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Gửi',
      denyButtonText: `Hủy`,
    })

    if (!result.isConfirmed) return

    try {
      await delPhanCongThucHien(row.KT_KDCL_CTDT_PhanCongThucHien_ID)
      refetchListPhanCongThucHien()
      Swal.fire({
        icon: 'success',
        html: `Cập nhật thành công`,
      })
    } catch (e) {
      console.log(e)
      Swal.fire({
        title: 'Lỗi',
        icon: 'error',
        text: 'Có lỗi xảy ra, vui lòng thử lại sau',
      })
    }
  }

  return (
    <>
      <div className="z-[2] mt-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="uppercase cursor-default text-uneti-primary-light ml-3 font-semibold">
            Phân công thực hiện
          </h3>
        </div>
        <div className="flex gap-3 mt-2">
          <Table data={listPhanCongThucHienMapped}>
            <TableColumn label="Tiêu chuẩn" minWidth={200}>
              {(row) => (
                <div
                  dangerouslySetInnerHTML={{
                    __html: row.KT_KDCL_TieuChuan_Ma,
                  }}
                />
              )}
            </TableColumn>
            <TableColumn
              label="Nhóm phân công"
              prop="KT_KDCL_CTDT_PhanCongThucHien_NhomPhanCong"
              minWidth={140}
            />
            <TableColumn
              label="Ghi chú"
              prop="KT_KDCL_CTDT_PhanCongThucHien_GhiChu"
              minWidth={120}
            />
            <TableColumn label="Tác vụ" align="center" width={120}>
              {(row) => (
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => {
                      setIDTieuChuanSelected(row.KT_KDCL_TieuChuan_ID)
                      setIsOpenUpdateDetail(true)
                    }}
                    className="icon-btn"
                  >
                    <Icon>
                      <Brush />
                    </Icon>
                  </button>
                  {!isNil(row.KT_KDCL_CTDT_PhanCongThucHien_ID) && (
                    <button
                      onClick={() => handleDelPhanCong(row)}
                      className="icon-btn"
                    >
                      <Icon>
                        <Trash />
                      </Icon>
                    </button>
                  )}
                </div>
              )}
            </TableColumn>
          </Table>
        </div>
      </div>

      <Suspense fallback={<Loading />}>
        {isOpenUpdateDetail && (
          <DialogPhanCongChiTiet
            isOpen={isOpenUpdateDetail}
            setIsOpen={setIsOpenUpdateDetail}
            phanCongTieuChuan={phanCongThucHienSelected}
            setIDTieuChuanSelected={setIDTieuChuanSelected}
          />
        )}
      </Suspense>
    </>
  )
}

import { Checkbox } from '@/Components/Base/Checkbox/index.js'
import { dayjs, transformCls } from '@/Services/Utils/index.js'
import ThuThapMinhChung_TieuChi_Action_PheDuyet from '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/TuDanhGia/Buoc4/ThuThapMinhChung/ThuThapMinhChung_TieuChi_Action_PheDuyet.jsx'
import Icon from '@/Components/Base/Icon/Icon.jsx'
import { Brush } from '@/Components/Base/Icons/Brush.jsx'
import { Trash } from '@/Components/Base/Icons/Trash.jsx'
import { useThuThapMinhChungTieuChiStore } from '@/Services/Store/index.js'
import Swal from 'sweetalert2'
import { deleteThuThapMinhChungTieuChi } from '@/Apis/KDCL/index.js'
import { useState } from 'react'

export default function TableTieuChi({
  thuThapMinhChung,
  listThuThapMinhChungTieuChi,
  handleUpdateMinhChung,
  setMinhChungSelected,
  minhChungSelected,
}) {
  const { refetch: refetchListThuThapMinhChungTieuChi } =
    useThuThapMinhChungTieuChiStore()
  const [idDeleting, setIDDeleting] = useState(null)

  const handleDelete = async (rowDeleting) => {
    const result = await Swal.fire({
      title: 'Xác nhận xóa',
      text: 'Vui lòng xác nhận trước khi xóa nội dung phân tích này, thao tác này sẽ không thể hoàn lại!',
      showCancelButton: true,
      icon: 'warning',
      confirmButtonColor: '#336699',
      cancelButtonColor: '#dd3333',
    })

    if (!result.isConfirmed || idDeleting != null) return

    setIDDeleting(rowDeleting.KT_KDCL_CTDT_ThuThapMinhChung_ChiTiet_ID)
    try {
      await deleteThuThapMinhChungTieuChi(
        rowDeleting.KT_KDCL_CTDT_ThuThapMinhChung_ChiTiet_ID,
      )
      await refetchListThuThapMinhChungTieuChi()
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Thông báo',
        text: 'Có lỗi xảy ra, vui lòng thử lại sau hoặc liên hệ với quản trị viên!',
      })
    } finally {
      setIDDeleting(null)
    }
  }

  return (
    <div className="mt-2 overflow-x-auto">
      <table className="uneti-u-table">
        <thead>
          <tr>
            <th style={{ width: 50 }}>STT</th>
            <th style={{ width: 50 }}>Chọn</th>
            <th>
              <p className="text-left min-w-[130px]">Mã minh chứng</p>
            </th>
            <th>
              <p className="text-left min-w-[130px]">Tên minh chứng</p>
            </th>
            <th>
              <p className="text-left min-w-[150px]">
                Số, ngày ban hành, thời điểm khảo sát điều tra...
              </p>
            </th>
            <th>
              <p className="text-left min-w-[170px]">
                Nơi ban hành hoặc nhóm/cá nhân thực hiện
              </p>
            </th>
            <th>
              <p className="text-left min-w-[170px]">Trạng thái phê duyệt</p>
            </th>

            {!thuThapMinhChung?.KT_KDCL_CTDT_ThuThapMinhChung_TrangThai && (
              <th>Tác vụ</th>
            )}
          </tr>
        </thead>

        <tbody>
          {!listThuThapMinhChungTieuChi.length ? (
            <tr>
              <td
                colSpan={10}
                className="text-center text-base !py-3 text-uneti-primary"
              >
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            listThuThapMinhChungTieuChi.map((e, i) => (
              <tr
                key={i}
                onClick={() => {
                  setMinhChungSelected(e)
                }}
              >
                <td className="text-center">{i + 1}</td>
                <td>
                  <Checkbox
                    checked={
                      minhChungSelected?.KT_KDCL_TaiLieu_ID ==
                      e.KT_KDCL_TaiLieu_ID
                    }
                    onChange={() => {
                      setMinhChungSelected(e)
                    }}
                  />
                </td>
                <td>{e.KT_KDCL_TaiLieu_Ma}</td>
                <td>{e.KT_KDCL_TaiLieu_Ten}</td>
                <td>
                  {e.KT_KDCL_TaiLieu_SoBanHanh} -{' '}
                  {dayjs(e.KT_KDCL_TaiLieu_NgayBanHanh).format('DD/MM/YYYY')}
                </td>
                <td>{e.KT_KDCL_TaiLieu_NoiBanHanh}</td>
                <td>
                  <ThuThapMinhChung_TieuChi_Action_PheDuyet MinhChung={e} />
                </td>
                {!thuThapMinhChung?.KT_KDCL_CTDT_ThuThapMinhChung_TrangThai && (
                  <td>
                    <div className="flex gap-1 justify-center">
                      <button
                        onClick={() => handleUpdateMinhChung(e)}
                        className="icon-btn text-orange-500"
                      >
                        <Icon>
                          <Brush />
                        </Icon>
                      </button>
                      <button
                        onClick={() => handleDelete(e)}
                        className={transformCls([
                          'icon-btn text-red-500',
                          idDeleting ===
                          e.KT_KDCL_CTDT_ThuThapMinhChung_ChiTiet_ID
                            ? 'cursor-not-allowed disabled pointer-event-none'
                            : '',
                        ])}
                      >
                        <Icon>
                          <Trash />
                        </Icon>
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

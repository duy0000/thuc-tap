import { Suspense, useContext, useState } from 'react'
import Button from '@/Components/Base/Button/Button'
import Icon from '@/Components/Base/Icon/Icon'
import { Brush } from '@/Components/Base/Icons/Brush'
import Loading from '@/Components/Base/Icons/Loading'
import { Trash } from '@/Components/Base/Icons/Trash'
import { HoSoKiemDinhCtx, NhiemVuEnumText } from '@/Services/Tokens'
import DrawerThanhPhanHoiDong from './DrawerThanhPhanHoiDong'
import Swal from 'sweetalert2'
import { delThanhPhanHoiDong } from '@/Apis/KDCL'
import { useThanhPhanHoiDongStore } from '@/Services/Store'
import { useDGDC_PhanCongThucHienStore } from '@/Services/Store/Module/KiemDinhChatLuong/DGDC_phanCongThucHien'
import Tag from '@/Components/Base/Tag/Tag'

export default function ThanhVienDoanDanhGiaDongCap() {
  const hoSoKiemDinhCtx = useContext(HoSoKiemDinhCtx)

  const { listPhanCongThucHien } = useDGDC_PhanCongThucHienStore()
  const { refetch: refetchListThanhPhanHoiDong } = useThanhPhanHoiDongStore()

  const [isOpenForm, setIsOpenForm] = useState(false)
  const [form, setForm] = useState({})

  const handleDelete = async (row) => {
    const result = await Swal.fire({
      title: 'Bạn chắc chắn muốn xóa dữ liệu này?',
      text: 'Sau khi xóa sẽ không thể khôi phục lại được',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    })

    if (!result.isConfirmed) return

    await delThanhPhanHoiDong(row.KT_KDCL_CTDT_ThanhPhanHoiDong_ID)
    await refetchListThanhPhanHoiDong()
  }

  return (
    <div className="z-[2] mt-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="uppercase cursor-default text-uneti-primary-light ml-3 font-semibold">
          Danh sách thành viên đoàn đánh giá ngoài
        </h3>

        <Button onClick={() => setIsOpenForm(true)} type="shadow">
          Thêm thành viên
        </Button>
      </div>

      <div className="flex gap-3 mt-1 overflow-x-auto">
        <table className="uneti-u-table">
          <thead>
            <tr>
              <th style={{ width: 50 }}>STT</th>
              <th>
                <p className="min-w-[120px] text-left">Họ tên</p>
              </th>
              <th>
                <p className="text-left min-w-[120px]">Chức vụ</p>
              </th>
              <th>
                <p className="text-left min-w-[120px]">Nhiệm vụ</p>
              </th>
              <th>
                <p className="text-left min-w-[100px]">
                  Tiêu chuẩn được phân công
                </p>
              </th>
              <th>Tác vụ</th>
            </tr>
          </thead>

          <tbody>
            {hoSoKiemDinhCtx.thanhPhanHoiDong.map((row, index) => (
              <tr key={index}>
                <td className="text-center">{index + 1}</td>
                <td>{row.KT_KDCL_CTDT_ThanhPhanHoiDong_HoTen}</td>
                <td>
                  <div className="-ml-1 flex flex-wrap">
                    {row.KT_KDCL_CTDT_ThanhPhanHoiDong_ChucVu.split(';').map(
                      (e) => (
                        <Tag key={e}>{e}</Tag>
                      ),
                    )}
                  </div>
                </td>
                <td>
                  {NhiemVuEnumText[row.KT_KDCL_CTDT_ThanhPhanHoiDong_NhiemVu]}
                </td>
                <td>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: hoSoKiemDinhCtx.listTieuChuan.find(
                        (tieuChuan) =>
                          tieuChuan.KT_KDCL_TieuChuan_ID ===
                          listPhanCongThucHien.find(
                            (e) =>
                              e.KT_KDCL_DGDC_PhanCongThucHien_IDThanhPhanHoiDong ===
                              row.KT_KDCL_CTDT_ThanhPhanHoiDong_ID,
                          )?.KT_KDCL_DGDC_PhanCongThucHien_IDTieuChuan,
                      )?.KT_KDCL_TieuChuan_Ma,
                    }}
                  />
                </td>
                <td>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => {
                        const phanCong = listPhanCongThucHien.find(
                          (e) =>
                            e.KT_KDCL_DGDC_PhanCongThucHien_IDThanhPhanHoiDong ===
                            row.KT_KDCL_CTDT_ThanhPhanHoiDong_ID,
                        )
                        setForm({
                          ...row,
                          KT_KDCL_DGDC_PhanCongThucHien_IDTieuChuan:
                            phanCong?.KT_KDCL_DGDC_PhanCongThucHien_IDTieuChuan,
                          KT_KDCL_DGDC_PhanCongThucHien: phanCong,
                        })
                        setIsOpenForm(true)
                      }}
                      className="icon-btn"
                    >
                      <Icon size={20}>
                        <Brush />
                      </Icon>
                    </button>
                    <button
                      onClick={() => handleDelete(row)}
                      className="icon-btn"
                    >
                      <Icon size={20}>
                        <Trash />
                      </Icon>
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {!hoSoKiemDinhCtx.thanhPhanHoiDong.length && (
              <tr>
                <td
                  colSpan={6}
                  className="bg-white font-medium text-uneti-primary text-center"
                >
                  <p className="py-2">Không có dữ liệu</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Suspense fallback={<Loading />}>
        {isOpenForm && (
          <DrawerThanhPhanHoiDong
            isOpen={isOpenForm}
            setIsOpen={setIsOpenForm}
            form={form}
            setForm={setForm}
          />
        )}
      </Suspense>
    </div>
  )
}

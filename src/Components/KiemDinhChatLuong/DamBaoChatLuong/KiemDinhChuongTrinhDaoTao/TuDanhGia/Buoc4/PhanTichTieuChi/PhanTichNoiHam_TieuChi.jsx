import { lazy, Suspense, useContext, useEffect, useMemo, useState } from 'react'
import { isNil } from 'lodash-unified'
import Swal from 'sweetalert2'

import {
  usePhanCongThucHienStore,
  usePhanCongThucHienThanhVienStore,
  usePhanTichNoiHamChiTietStore,
  usePhanTichNoiHamStore,
  useTieuChiStore,
} from '@/Services/Store/index.js'
import Button from '@/Components/Base/Button/Button.jsx'
import {
  DataCanBoGV,
  handleBackRoute,
  transformCls,
} from '@/Services/Utils/index.js'
import { useNavigate } from 'react-router-dom'
import { HoSoKiemDinhCtx } from '@/Services/Tokens/index.js'
import { Skeleton, SkeletonItem } from '@/Components/Base/index.js'
import {
  deletePhanTichNoiHamChiTiet,
  postPhanTichNoiHam,
  putPhanTichNoiHam,
} from '@/Apis/KDCL/index.js'
import Loading from '@/Components/Loading/Loading.jsx'
import Icon from '@/Components/Base/Icon/Icon.jsx'
import { Brush } from '@/Components/Base/Icons/Brush.jsx'
import { Trash } from '@/Components/Base/Icons/Trash.jsx'
import UserKhongDuocPhanCong from '../../UserKhongDuocPhanCong.jsx'

const DrawerPhanTichNoiHam_TieuChi = lazy(
  () => import('./DrawerPhanTichNoiHam_TieuChi.jsx'),
)

export default function PhanTichNoiHam_TieuChi({ IDTieuChi, IDTieuChuan }) {
  const navigate = useNavigate()
  const dataUser = DataCanBoGV()

  const hoSoKiemDinh = useContext(HoSoKiemDinhCtx)

  const [isOpenDrawer, setIsOpenDrawer] = useState(false)

  const { listTieuChi, isLoadingListTieuChi } = useTieuChiStore()
  const { listPhanTichNoiHam, refetch: refetchListPhanTichNoiHam } =
    usePhanTichNoiHamStore()
  const {
    listPhanTichNoiHamChiTiet,
    refetch: refetchListPhanTichNoiHamChiTiet,
  } = usePhanTichNoiHamChiTietStore()

  const [noiHamEditing, setNoiHamEditing] = useState(null)

  const [idDeleting, setIDDeleting] = useState(null)

  const { listPhanCongThucHienMapped, isLoading: listPhanCongThucHienLoading } =
    usePhanCongThucHienStore({
      listTieuChuan: hoSoKiemDinh.listTieuChuan,
      nhomChuyenTrach: hoSoKiemDinh.nhomChuyenTrach,
      hoiDong: hoSoKiemDinh.hoiDong,
    })

  const { listPhanCongThucHienThanhVien } = usePhanCongThucHienThanhVienStore()

  const tieuChi = useMemo(
    () =>
      listTieuChi.find((tieuChi) => tieuChi.KT_KDCL_TieuChi_ID == IDTieuChi),
    [listTieuChi, IDTieuChi],
  )

  const phanCongThucHien = useMemo(
    () =>
      listPhanCongThucHienMapped.find(
        (e) => e.KT_KDCL_TieuChuan_ID === IDTieuChuan,
      ),
    [listPhanCongThucHienMapped],
  )

  const phanCongThucHienThanhVien = useMemo(() => {
    const _phanCongThucHienThanhVien = listPhanCongThucHienThanhVien.find(
      (e) =>
        e.KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_IDTieuChi === IDTieuChi &&
        phanCongThucHien?.KT_KDCL_CTDT_PhanCongThucHien_ID ===
          e.KT_KDCL_CTDT_PhanCongThucHien_IDPCTH,
    )

    if (_phanCongThucHienThanhVien === undefined) {
      return null
    }

    _phanCongThucHienThanhVien.KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_HoTen_ChucDanh =
      hoSoKiemDinh.thanhPhanHoiDong.find(
        (tphd) =>
          tphd.KT_KDCL_CTDT_ThanhPhanHoiDong_ID ===
          _phanCongThucHienThanhVien.KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_IDThanhPhanHoiDong,
      )?.KT_KDCL_CTDT_ThanhPhanHoiDong_HoTen_ChucDanh

    return _phanCongThucHienThanhVien
  }, [
    phanCongThucHien,
    listPhanCongThucHienThanhVien,
    hoSoKiemDinh.thanhPhanHoiDong,
  ])

  const phanTichNoiHam = useMemo(() => {
    if (!hoSoKiemDinh.hoiDong) return null

    return listPhanTichNoiHam.find(
      (e) =>
        e.KT_KDCL_CTDT_PhanTichNoiHam_IDTieuChi === IDTieuChi &&
        e.KT_KDCL_CTDT_PhanTichNoiHam_IDThanhLapHoiDong ===
          hoSoKiemDinh.hoiDong.KT_KDCL_CTDT_ThanhLapHoiDong_ID,
    )
  }, [hoSoKiemDinh.hoiDong, listPhanTichNoiHam])

  const listPhanTichNoiHamTieuChi = useMemo(() => {
    if (!phanTichNoiHam) return []

    return listPhanTichNoiHamChiTiet.filter(
      (e) =>
        e.KT_KDCL_CTDT_PhanTichNoiHam_ChiTiet_IDPhanTichNoiHam &&
        e.KT_KDCL_CTDT_PhanTichNoiHam_ChiTiet_IDPhanTichNoiHam ===
          phanTichNoiHam.KT_KDCL_CTDT_PhanTichNoiHam_ID,
    )
  }, [listPhanTichNoiHamChiTiet, phanTichNoiHam])

  const isAssignToMe = useMemo(
    () =>
      phanCongThucHienThanhVien?.KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_MaNhanSu ===
        dataUser.MaNhanSu ||
      hoSoKiemDinh.isChuTich ||
      hoSoKiemDinh.isPhoChuTich ||
      hoSoKiemDinh.isBanThuKy,
    [phanCongThucHienThanhVien, dataUser, hoSoKiemDinh],
  )

  const onComplete = async () => {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Thông báo',
      html: `Xác nhận hoàn thành phân tích nội hàm tiêu chí <span>${tieuChi?.KT_KDCL_TieuChi_Ma}</span>`,
      showCancelButton: true,
      confirmButtonColor: '#336699',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    })
    if (!result.isConfirmed) return

    let action = null

    let data = {
      ...phanTichNoiHam,
      KT_KDCL_CTDT_PhanTichNoiHam_IDTieuChi: IDTieuChi,
      KT_KDCL_CTDT_PhanTichNoiHam_IDThanhLapHoiDong:
        hoSoKiemDinh.hoiDong.KT_KDCL_CTDT_ThanhLapHoiDong_ID,
      KT_KDCL_CTDT_PhanTichNoiHam_TrangThai: true,
    }

    if (isNil(phanTichNoiHam?.KT_KDCL_CTDT_PhanTichNoiHam_ID)) {
      action = postPhanTichNoiHam
    } else {
      action = putPhanTichNoiHam
    }

    await action(data)
    await refetchListPhanTichNoiHam()
  }

  const handleDelete = async (NoiHamDeleting) => {
    const result = await Swal.fire({
      title: 'Xác nhận xóa',
      text: 'Vui lòng xác nhận trước khi xóa nội dung phân tích này, thao tác này sẽ không thể hoàn lại!',
      showCancelButton: true,
      icon: 'warning',
      confirmButtonColor: '#336699',
      cancelButtonColor: '#dd3333',
    })

    if (!result.isConfirmed || idDeleting != null) return

    setIDDeleting(NoiHamDeleting.KT_KDCL_CTDT_PhanTichNoiHam_ChiTiet_ID)
    try {
      await deletePhanTichNoiHamChiTiet(
        NoiHamDeleting.KT_KDCL_CTDT_PhanTichNoiHam_ChiTiet_ID,
      )
      await refetchListPhanTichNoiHamChiTiet()
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

  useEffect(() => {
    if (!hoSoKiemDinh.hoiDong) return
    if (phanTichNoiHam === null) return

    if (phanTichNoiHam === undefined && phanCongThucHienThanhVien) {
      postPhanTichNoiHam({
        KT_KDCL_CTDT_PhanTichNoiHam_IDThanhLapHoiDong:
          hoSoKiemDinh.hoiDong.KT_KDCL_CTDT_ThanhLapHoiDong_ID,
        KT_KDCL_CTDT_PhanTichNoiHam_IDTieuChi: IDTieuChi,
        KT_KDCL_CTDT_PhanTichNoiHam_TrangThai: false,
      }).then(refetchListPhanTichNoiHam)
    }
  }, [phanTichNoiHam, hoSoKiemDinh.hoiDong])

  return (
    <div className="mt-5">
      <div className="flex items-center justify-between">
        <Skeleton
          loading={!hoSoKiemDinh.hoSoKiemDinh}
          animated
          template={<SkeletonItem variant="button" />}
        >
          <Button
            type="border"
            onClick={() =>
              handleBackRoute(
                navigate,
                `/dam-bao-chat-luong/chat-luong-ctdt/${hoSoKiemDinh.hoSoKiemDinh?.KT_KDCL_CTDT_HoSoKiemDinh_ID}/tu-danh-gia/buoc-4`,
              )
            }
          >
            Quay lại
          </Button>
        </Skeleton>
        <p className="uppercase text-uneti-primary text-xs">
          <b>Phân tích nội hàm, đánh giá tiêu chí</b>
        </p>
      </div>

      {/* Alert */}
      {!phanCongThucHienThanhVien && (
        <div className="relative z-0 mt-3">
          <div className="absolute-full border-l border-l-2 pl-4 border-orange-400 bg-orange-300/10 rounded-lg z-[100] "></div>
          <div className="flex flex-col gap-1 p-3">
            <div className="flex gap-1">
              <b className="shrink-0">Tiêu chuẩn:</b>
              <Skeleton loading={listPhanCongThucHienLoading}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: phanCongThucHien?.KT_KDCL_TieuChuan_Ma,
                  }}
                  className="whitespace-nowrap"
                />

                {' - '}

                <div
                  dangerouslySetInnerHTML={{
                    __html: phanCongThucHien?.KT_KDCL_TieuChuan_Ten,
                  }}
                />
              </Skeleton>
            </div>
            <div className="flex gap-1">
              <b className="shrink-0">Tiêu chí:</b>
              <Skeleton loading={isLoadingListTieuChi}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: tieuChi?.KT_KDCL_TieuChi_Ma,
                  }}
                  className="whitespace-nowrap"
                />
                {' - '}
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      tieuChi?.KT_KDCL_TieuChi_JSON_DATA[0]
                        .KT_KDCL_BoTieuChuan_NoiDung,
                  }}
                />
              </Skeleton>
            </div>
            <p className="text-orange-700 text-[14px] md:text-[15px]">
              Tiêu chí này chưa được phân công cho thành viên nào thực hiện!
            </p>
          </div>
        </div>
      )}

      {/* Data */}
      {phanCongThucHienThanhVien && (
        <>
          <div className="p-3 bg-white rounded-lg my-3 border-l-uneti-primary-lighter border-l-2 shadow-sm">
            <div className="flex gap-1 items-center">
              <b className="shrink-0">Nhóm/Cá nhân thực hiện: </b>
              <Skeleton loading={listPhanCongThucHienLoading}>
                {phanCongThucHien?.KT_KDCL_CTDT_PhanCongThucHien_NhomPhanCong} -{' '}
                {
                  phanCongThucHienThanhVien?.KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_HoTen_ChucDanh
                }
              </Skeleton>
            </div>

            <div className="flex gap-1">
              <b className="shrink-0">Tiêu chuẩn:</b>
              <Skeleton loading={listPhanCongThucHienLoading}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: phanCongThucHien?.KT_KDCL_TieuChuan_Ma,
                  }}
                  className="whitespace-nowrap"
                />

                {' - '}

                <div
                  dangerouslySetInnerHTML={{
                    __html: phanCongThucHien?.KT_KDCL_TieuChuan_Ten,
                  }}
                />
              </Skeleton>
            </div>

            <div className="flex gap-1">
              <b className="shrink-0">Tiêu chí:</b>
              <Skeleton loading={isLoadingListTieuChi}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: tieuChi?.KT_KDCL_TieuChi_Ma,
                  }}
                  className="whitespace-nowrap shrink-0"
                />
                {' - '}
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      tieuChi?.KT_KDCL_TieuChi_JSON_DATA[0]
                        .KT_KDCL_BoTieuChuan_NoiDung,
                  }}
                />
              </Skeleton>
            </div>
          </div>

          {isAssignToMe ||
          hoSoKiemDinh.isChuTich ||
          hoSoKiemDinh.isPhoChuTich ||
          hoSoKiemDinh.isBanThuKy ? (
            <>
              <div className="flex items-center justify-end gap-2">
                {!phanTichNoiHam?.KT_KDCL_CTDT_PhanTichNoiHam_TrangThai && (
                  <>
                    <Button onClick={onComplete}>Hoàn thành</Button>
                    <Button
                      onClick={() => {
                        setIsOpenDrawer(true)
                      }}
                    >
                      Thêm mới
                    </Button>
                  </>
                )}
              </div>

              <div className="mt-2 overflow-x-auto">
                <table className="uneti-u-table">
                  <thead>
                    <tr>
                      <th style={{ width: 50 }} rowSpan={2}>
                        STT
                      </th>
                      <th rowSpan={2}>
                        <p className="min-w-[120px]">Yêu cầu</p>
                      </th>
                      <th rowSpan={2}>
                        <p className="min-w-[100px]">Câu hỏi đặt ra</p>
                      </th>
                      <th colSpan={3}>
                        <p className="min-w-[140px]">Thông tin, minh chứng</p>
                      </th>
                      <th rowSpan={2}>
                        <p className="min-w-[100px]">Ghi chú</p>
                      </th>
                      {!phanTichNoiHam?.KT_KDCL_CTDT_PhanTichNoiHam_TrangThai && (
                        <th style={{ width: 100 }} rowSpan={2}>
                          Tác vụ
                        </th>
                      )}
                    </tr>
                    <tr>
                      <th>
                        <p className="min-w-[100px]">Cần thu thập</p>
                      </th>
                      <th>
                        <p className="min-w-[100px]">Nơi thu thập</p>
                      </th>
                      <th>
                        <p className="min-w-[100px]">Phương pháp thu thập</p>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {!listPhanTichNoiHamTieuChi.length ? (
                      <tr>
                        <td
                          colSpan={
                            7 +
                            !phanTichNoiHam?.KT_KDCL_CTDT_PhanTichNoiHam_TrangThai
                          }
                          className="text-[15px] text-center text-uneti-primary font-medium !py-3"
                        >
                          Không có dữ liệu
                        </td>
                      </tr>
                    ) : (
                      listPhanTichNoiHamTieuChi.map((e, i) => (
                        <tr key={i}>
                          <td className="text-center">{i + 1}</td>
                          <td>
                            {e.KT_KDCL_CTDT_PhanTichNoiHam_ChiTiet_YeuCau}
                          </td>
                          <td>
                            {e.KT_KDCL_CTDT_PhanTichNoiHam_ChiTiet_CauHoi}
                          </td>
                          <td>
                            {
                              e.KT_KDCL_CTDT_PhanTichNoiHam_ChiTiet_ThongTinThuThap
                            }
                          </td>
                          <td>
                            {e.KT_KDCL_CTDT_PhanTichNoiHam_ChiTiet_NoiThuThap}
                          </td>
                          <td>
                            {
                              e.KT_KDCL_CTDT_PhanTichNoiHam_ChiTiet_PhuongPhapThuThap
                            }
                          </td>
                          <td>
                            {e.KT_KDCL_CTDT_PhanTichNoiHam_ChiTiet_GhiChu}
                          </td>
                          {!phanTichNoiHam?.KT_KDCL_CTDT_PhanTichNoiHam_TrangThai && (
                            <td>
                              <div className="flex gap-1 justify-center">
                                <button
                                  onClick={() => {
                                    setNoiHamEditing(e)
                                    setIsOpenDrawer(true)
                                  }}
                                  className={transformCls([
                                    'icon-btn',
                                    idDeleting ===
                                    e.KT_KDCL_CTDT_PhanTichNoiHam_ChiTiet_ID
                                      ? 'cursor-not-allowed disabled pointer-event-none'
                                      : '',
                                  ])}
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
                                    e.KT_KDCL_CTDT_PhanTichNoiHam_ChiTiet_ID
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
            </>
          ) : (
            <UserKhongDuocPhanCong />
          )}

          <Suspense fallback={<Loading />}>
            {isOpenDrawer && (
              <DrawerPhanTichNoiHam_TieuChi
                isOpen={isOpenDrawer}
                setIsOpen={setIsOpenDrawer}
                IDPhanTichNoiHam={
                  phanTichNoiHam?.KT_KDCL_CTDT_PhanTichNoiHam_ID
                }
                noiHam={noiHamEditing}
              />
            )}
          </Suspense>
        </>
      )}
    </div>
  )
}

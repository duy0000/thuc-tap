import { Skeleton, SkeletonItem } from '@/Components/Base'
import Button from '@/Components/Base/Button/Button'
import Icon from '@/Components/Base/Icon/Icon'
import { Brush } from '@/Components/Base/Icons/Brush'
import Loading from '@/Components/Loading/Loading'
import { useNamespace } from '@/Services/Hooks'
import {
  useDGDC_PhanCongThucHienStore,
  useThanhPhanHoiDongStore,
} from '@/Services/Store'
import { useDGDC_NghienCuuBaoCaoStore } from '@/Services/Store/Module/KiemDinhChatLuong/DGDC_nghienCuuBaoCao'
import { HoSoKiemDinhCtx, stepStatusEnum } from '@/Services/Tokens'
import { handleBackRoute } from '@/Services/Utils'
import { Suspense, useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DrawerNghienCuuBaoCaoTieuChi from './DrawerNghienCuuBaoCaoTieuChi'
import Swal from 'sweetalert2'
import { putDGDCPhanCongThucHien } from '@/Apis/KDCL'

export default function NghienCuuBaoCao_ChiTiet({ IDTieuChuan }) {
  const navigate = useNavigate()
  const hoSoKiemDinh = useContext(HoSoKiemDinhCtx)

  const nsTable = useNamespace('u-table')

  const [isOpen, setIsOpen] = useState(false)
  const [form, setForm] = useState({})

  const { isLoading: isLoadingThanhPhanHoiDong } = useThanhPhanHoiDongStore()
  const { listPhanCongThucHien, refetch: refetchListPhanCongThucHien } =
    useDGDC_PhanCongThucHienStore()
  const { listNghienCuuBaoCao } = useDGDC_NghienCuuBaoCaoStore()

  const tieuChuan = useMemo(() => {
    return hoSoKiemDinh.listTieuChuan.find(
      (e) => e.KT_KDCL_TieuChuan_ID === IDTieuChuan,
    )
  }, [IDTieuChuan, hoSoKiemDinh.listTieuChuan])

  const phanCongThucHien = useMemo(() => {
    return listPhanCongThucHien.find(
      (item) =>
        item.KT_KDCL_DGDC_PhanCongThucHien_IDThanhLapHoiDong ===
          hoSoKiemDinh.hoiDong?.KT_KDCL_CTDT_ThanhLapHoiDong_ID &&
        item.KT_KDCL_DGDC_PhanCongThucHien_IDTieuChuan === IDTieuChuan &&
        hoSoKiemDinh.thanhPhanHoiDong.find(
          (e) =>
            e.KT_KDCL_CTDT_ThanhPhanHoiDong_ID ===
            item.KT_KDCL_DGDC_PhanCongThucHien_IDThanhPhanHoiDong,
        ),
    )
  }, [
    listPhanCongThucHien,
    hoSoKiemDinh.hoiDong,
    hoSoKiemDinh.thanhPhanHoiDong,
    IDTieuChuan,
  ])

  const listNghienCuuBaoCaoMappedByPhanCongThucHien_GroupByIDTieuChi =
    useMemo(() => {
      return listNghienCuuBaoCao
        .filter(
          (e) =>
            e.KT_KDCL_DGDC_NghienCuu_BaoCao_IDPCTHCha ===
            phanCongThucHien?.KT_KDCL_DGDC_PhanCongThucHien_ID,
        )
        .reduce((acc, curr) => {
          if (!acc[curr.KT_KDCL_DGDC_NghienCuu_BaoCao_IDTieuChi]) {
            acc[curr.KT_KDCL_DGDC_NghienCuu_BaoCao_IDTieuChi] = curr
          }
          return acc
        }, {})
    }, [listNghienCuuBaoCao, phanCongThucHien])

  const [isCompleting, setIsCompleting] = useState(false)

  const handleUpdateStatus = async () => {
    if (isCompleting) return
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Thông báo',
      html: `Xác nhận hoàn thành mục nghiên cứu báo cáo của tiêu chuẩn này?`,
      showCancelButton: true,
      confirmButtonColor: '#336699',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    })

    if (!result.isConfirmed) return

    try {
      setIsCompleting(true)
      await putDGDCPhanCongThucHien({
        ...phanCongThucHien,
        KT_KDCL_DGDC_PhanCongThucHien_TrangThaiNghienCuu:
          stepStatusEnum.DaHoanThanh,
      })
      await refetchListPhanCongThucHien()
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Thông báo',
        text: 'Có lỗi xảy ra, vui lòng thử lại sau hoặc liên hệ quản trị viên!',
      })
    } finally {
      setIsCompleting(false)
    }
  }

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
                `/dam-bao-chat-luong/chat-luong-ctdt/${hoSoKiemDinh.hoSoKiemDinh?.KT_KDCL_CTDT_HoSoKiemDinh_ID}/tu-danh-gia/buoc-3`,
              )
            }
          >
            Quay lại
          </Button>
        </Skeleton>
        <p className="uppercase text-uneti-primary text-xs">
          <b>Kết quả nghiên cứu báo cáo tự đánh giá</b>
        </p>
      </div>

      {!phanCongThucHien && !isLoadingThanhPhanHoiDong && (
        <div className="relative z-0 mt-3">
          <div className="absolute-full border-l border-l-2 pl-4 border-orange-400 bg-orange-300/10 rounded-lg z-[100] "></div>
          <div className="flex flex-col gap-1 p-3">
            <div className="flex gap-1">
              <b>Tiêu chuẩn:</b>
              <div
                dangerouslySetInnerHTML={{
                  __html: tieuChuan?.KT_KDCL_TieuChuan_Ma,
                }}
              />
            </div>
            <div className="flex gap-1">
              <b>Nội dung tiêu chuẩn:</b>
              <div
                dangerouslySetInnerHTML={{
                  __html: tieuChuan?.KT_KDCL_TieuChuan_Ten,
                }}
              />
            </div>
            <p className="text-orange-700 text-[15px]">
              Tiêu chuẩn này chưa được phân công cho thành viên nào thực hiện!
            </p>
          </div>
        </div>
      )}

      {(phanCongThucHien || isLoadingThanhPhanHoiDong) && (
        <>
          <div className="p-3 flex justify-between items-center bg-white rounded-lg my-3 border-l-uneti-primary-lighter border-l-2 shadow-sm">
            <div>
              <div className="flex gap-1 items-center">
                <b>Người thực hiện: </b>
                <Skeleton loading={isLoadingThanhPhanHoiDong}>
                  {phanCongThucHien?.KT_KDCL_DGDC_PhanCongThucHien_HoTen}
                </Skeleton>
              </div>

              <div className="flex gap-1">
                <b>Tiêu chuẩn:</b>
                <div
                  dangerouslySetInnerHTML={{
                    __html: tieuChuan?.KT_KDCL_TieuChuan_Ma,
                  }}
                />
              </div>
              <div className="flex gap-1">
                <b>Nội dung tiêu chuẩn:</b>
                <div
                  dangerouslySetInnerHTML={{
                    __html: tieuChuan?.KT_KDCL_TieuChuan_Ten,
                  }}
                />
              </div>
            </div>

            {phanCongThucHien?.KT_KDCL_DGDC_PhanCongThucHien_TrangThaiNghienCuu ===
              stepStatusEnum.DangThucHien && (
              <Button isLoading={isCompleting} onClick={handleUpdateStatus}>
                Hoàn thành
              </Button>
            )}
          </div>

          <div className="mt-2 overflow-x-auto">
            <table className={nsTable.b()}>
              <thead>
                <tr>
                  <th style={{ width: 50 }}>STT</th>
                  <th className="min-w-[130px]">Tiêu chí</th>
                  <th className="min-w-[400px]">Nội dung tiêu chí</th>
                  <th className="min-w-[130px]">Điểm mạnh</th>
                  <th className="min-w-[130px]">Lĩnh vực cần cải tiến</th>
                  <th className="min-w-[150px]">
                    Minh chứng/thông tin cần bổ sung
                  </th>
                  <th className="min-w-[130px]">Dự kiến kết quả/đánh giá</th>
                  {phanCongThucHien?.KT_KDCL_DGDC_PhanCongThucHien_TrangThaiNghienCuu !==
                    stepStatusEnum.DaHoanThanh && (
                    <th className="min-w-[80px]">Tác vụ</th>
                  )}
                </tr>
              </thead>

              <tbody>
                {hoSoKiemDinh.listTieuChiMappedByTieuChuanID[
                  tieuChuan?.KT_KDCL_TieuChuan_ID
                ]?.map((tieuChi, i) => (
                  <tr key={i}>
                    <td className="text-center">{i + 1}</td>
                    <td>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: tieuChi.KT_KDCL_TieuChi_Ma,
                        }}
                      />
                    </td>
                    <td>
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            tieuChi.KT_KDCL_TieuChi_JSON_DATA[0]
                              .KT_KDCL_BoTieuChuan_NoiDung,
                        }}
                      />
                    </td>
                    <td>
                      {
                        listNghienCuuBaoCaoMappedByPhanCongThucHien_GroupByIDTieuChi[
                          tieuChi.KT_KDCL_TieuChi_ID
                        ]?.KT_KDCL_DGDC_NghienCuu_BaoCao_DiemManh
                      }
                    </td>
                    <td>
                      {
                        listNghienCuuBaoCaoMappedByPhanCongThucHien_GroupByIDTieuChi[
                          tieuChi.KT_KDCL_TieuChi_ID
                        ]?.KT_KDCL_DGDC_NghienCuu_BaoCao_LinhVuc
                      }
                    </td>
                    <td>
                      {
                        listNghienCuuBaoCaoMappedByPhanCongThucHien_GroupByIDTieuChi[
                          tieuChi.KT_KDCL_TieuChi_ID
                        ]?.KT_KDCL_DGDC_NghienCuu_BaoCao_MC_TTBS
                      }
                    </td>
                    <td>
                      {
                        listNghienCuuBaoCaoMappedByPhanCongThucHien_GroupByIDTieuChi[
                          tieuChi.KT_KDCL_TieuChi_ID
                        ]?.KT_KDCL_DGDC_NghienCuu_BaoCao_DuKien_KQDG
                      }
                    </td>
                    {phanCongThucHien?.KT_KDCL_DGDC_PhanCongThucHien_TrangThaiNghienCuu ===
                      stepStatusEnum.DangThucHien && (
                      <td>
                        <button
                          onClick={() => {
                            setForm({
                              ...listNghienCuuBaoCaoMappedByPhanCongThucHien_GroupByIDTieuChi[
                                tieuChi.KT_KDCL_TieuChi_ID
                              ],
                              KT_KDCL_DGDC_NghienCuu_BaoCao_IDTieuChi:
                                tieuChi.KT_KDCL_TieuChi_ID,
                              KT_KDCL_DGDC_NghienCuu_BaoCao_IDPCTHCha:
                                phanCongThucHien.KT_KDCL_DGDC_PhanCongThucHien_ID,
                            })
                            setIsOpen(true)
                          }}
                          className="mx-auto icon-btn"
                        >
                          <Icon>
                            <Brush />
                          </Icon>
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <Suspense fallback={<Loading />}>
        {isOpen && (
          <DrawerNghienCuuBaoCaoTieuChi
            isOpen={isOpen}
            setForm={setForm}
            setIsOpen={setIsOpen}
            form={form}
          />
        )}
      </Suspense>
    </div>
  )
}

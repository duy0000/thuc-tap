import { postDanhGiaTieuChi, putDanhGiaTieuChi } from '@/Apis/KDCL'
import { Skeleton, SkeletonItem } from '@/Components/Base'
import Button from '@/Components/Base/Button/Button'
import Icon from '@/Components/Base/Icon/Icon'
import TickCircle from '@/Components/Base/Icons/TickCircle'
import { TextEditor } from '@/Components/TextEditor/TextEditor'
import {
  useDanhGiaTieuChiStore,
  usePhanCongThucHienStore,
  usePhanCongThucHienThanhVienStore,
  useTieuChiStore,
} from '@/Services/Store'
import { HoSoKiemDinhCtx, stepStatusEnum } from '@/Services/Tokens'
import { DataCanBoGV, handleBackRoute, transformCls } from '@/Services/Utils'
import { required } from '@/Services/Validators/required'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { isTrue } from '@/Services/Validators/index.js'
import AlertChuaPhanCongThucHien from '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/TuDanhGia/Buoc5/AlertChuaPhanCongThucHien.jsx'
import ThongTinTieuChuanTieuChi from '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/TuDanhGia/Buoc5/ThongTinTieuChuanTieuChi.jsx'
import DialogChonMinhChung from '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/TuDanhGia/Buoc5/DialogChonMinhChung.jsx'
import UserKhongDuocPhanCong from '../UserKhongDuocPhanCong'
import { isEmpty, isEqual } from 'lodash-unified'
import LichSuChinhSua from './LichSuChinhSua/LichSuChinhSua'

export default function DanhGiaTieuChi_ChiTiet({ IDTieuChi, IDTieuChuan }) {
  const navigate = useNavigate()

  const dataUser = DataCanBoGV()
  const textEditorRef = useRef()
  const [isPosting, setIsPosting] = useState(false)
  const [isSendRequesting, setIsSendRequesting] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)
  const [isApproving, setIsApproving] = useState(false)
  const [isOpendialogChonMC, setIsOpenDialogChonMC] = useState(false)

  const [countUpdated, setCountUpdated] = useState(0)

  const hoSoKiemDinh = useContext(HoSoKiemDinhCtx)
  const { listTieuChi, isLoadingListTieuChi } = useTieuChiStore()
  const { listDanhGiaTieuChi, refetch: refetchListDanhGiaTieuChi } =
    useDanhGiaTieuChiStore()
  const { listPhanCongThucHienMapped, isLoading: listPhanCongThucHienLoading } =
    usePhanCongThucHienStore({
      listTieuChuan: hoSoKiemDinh.listTieuChuan,
      nhomChuyenTrach: hoSoKiemDinh.nhomChuyenTrach,
      hoiDong: hoSoKiemDinh.hoiDong,
    })

  const { listPhanCongThucHienThanhVien } = usePhanCongThucHienThanhVienStore()

  const [form, setForm] = useState()

  const tieuChi = useMemo(() => {
    return listTieuChi.find(
      (tieuChi) => tieuChi.KT_KDCL_TieuChi_ID == IDTieuChi,
    )
  }, [listTieuChi, IDTieuChi])

  const tieuChuan = useMemo(
    () =>
      hoSoKiemDinh.listTieuChuan.find(
        (tieuChuan) => tieuChuan.KT_KDCL_TieuChuan_ID == IDTieuChuan,
      ),
    [hoSoKiemDinh.listTieuChuan, IDTieuChuan],
  )

  const phanCongThucHien = useMemo(
    () =>
      listPhanCongThucHienMapped.find(
        (e) => e.KT_KDCL_CTDT_PhanCongThucHien_IDTieuChuan === IDTieuChuan,
      ),
    [listPhanCongThucHienMapped],
  )

  const phanCongThucHienThanhVien = useMemo(
    () =>
      listPhanCongThucHienThanhVien.find(
        (e) =>
          e.KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_IDTieuChi === IDTieuChi &&
          phanCongThucHien?.KT_KDCL_CTDT_PhanCongThucHien_ID ===
            e.KT_KDCL_CTDT_PhanCongThucHien_IDPCTH,
      ),
    [phanCongThucHien, listPhanCongThucHienThanhVien],
  )

  const isAssignToMe = useMemo(
    () =>
      phanCongThucHienThanhVien?.KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_MaNhanSu ===
        dataUser.MaNhanSu ||
      hoSoKiemDinh.isChuTich ||
      hoSoKiemDinh.isPhoChuTich ||
      hoSoKiemDinh.isBanThuKy,
    [phanCongThucHienThanhVien, dataUser, hoSoKiemDinh],
  )

  const danhGiaTieuChiChiTiet = useMemo(() => {
    if (!tieuChi || !hoSoKiemDinh.hoiDong) return null
    let danhGiaTieuChi = listDanhGiaTieuChi.find(
      (e) =>
        e.KT_KDCL_CTDT_DanhGiaTieuChi_IDThanhLapHoiDong ==
          hoSoKiemDinh.hoiDong.KT_KDCL_CTDT_ThanhLapHoiDong_ID &&
        e.KT_KDCL_CTDT_DanhGiaTieuChi_IDTieuChi == tieuChi.KT_KDCL_TieuChi_ID,
    ) || {
      KT_KDCL_CTDT_DanhGiaTieuChi_MocChuan_JSON:
        tieuChi.KT_KDCL_TieuChi_MocChuan_JSON_DATA,
    }

    if (isEmpty(danhGiaTieuChi.KT_KDCL_CTDT_DanhGiaTieuChi_MocChuan_JSON)) {
      danhGiaTieuChi.KT_KDCL_CTDT_DanhGiaTieuChi_MocChuan_JSON =
        tieuChi.KT_KDCL_TieuChi_MocChuan_JSON_DATA
    }

    return danhGiaTieuChi
  }, [listDanhGiaTieuChi, hoSoKiemDinh.hoiDong, tieuChi])

  const isDisabledUpdate = useMemo(() => {
    return (
      !isAssignToMe ||
      danhGiaTieuChiChiTiet?.KT_KDCL_CTDT_DanhGiaTieuChi_TrangThai ===
        stepStatusEnum.DaPheDuyet
    )
  }, [isAssignToMe, danhGiaTieuChiChiTiet])

  const handleChangeMocChuan = (KT_KDCL_TieuChi_MocChuan_Ten, value) => {
    const newMocChuan = form?.KT_KDCL_CTDT_DanhGiaTieuChi_MocChuan_JSON

    const index = newMocChuan.findIndex(
      (mocChuan) =>
        mocChuan.KT_KDCL_TieuChi_MocChuan_Ten === KT_KDCL_TieuChi_MocChuan_Ten,
    )

    newMocChuan[index].KT_KDCL_TieuChi_MocChuan_MoTa = value

    setForm({
      ...form,
      KT_KDCL_CTDT_DanhGiaTieuChi_MocChuan_JSON: newMocChuan,
    })
  }

  const validate = () =>
    [
      required(form?.KT_KDCL_CTDT_DanhGiaTieuChi_MoTa, 'Vui lòng nhập mô tả'),
    ].every(isTrue)

  const handleSubmit = async (trangThai, isLoading, setIsLoading) => {
    if (!form || isLoading || !validate()) return

    try {
      setIsLoading(true)

      let action = postDanhGiaTieuChi

      if (form.KT_KDCL_CTDT_DanhGiaTieuChi_ID) {
        action = putDanhGiaTieuChi
      }
      await action({
        ...form,
        KT_KDCL_CTDT_DanhGiaTieuChi_IDThanhLapHoiDong:
          hoSoKiemDinh.hoiDong?.KT_KDCL_CTDT_ThanhLapHoiDong_ID,
        KT_KDCL_CTDT_DanhGiaTieuChi_IDTieuChi: IDTieuChi,
        KT_KDCL_CTDT_DanhGiaTieuChi_TrangThai:
          trangThai ?? form.KT_KDCL_CTDT_DanhGiaTieuChi_TrangThai,
      })
      refetchListDanhGiaTieuChi()
      setCountUpdated((p) => p + 1)
      Swal.fire({
        icon: 'success',
        title: 'Thông báo',
        text: 'Cập nhật thành công!',
      })
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Thông báo',
        text: 'Có lỗi xảy ra, vui lòng thử lại sau hoặc liên hệ quản trị viên!',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInsertMinhChung = (minhChung, trichDanMinhChung) => {
    const editor = textEditorRef.current.reactQuillRef.current.editor
    const KT_KDCL_TaiLieu_Ma = minhChung.KT_KDCL_TaiLieu_Ma

    const selection = editor.getSelection(true)

    const insertText = `[${KT_KDCL_TaiLieu_Ma}] (${trichDanMinhChung})`

    editor.deleteText(selection.index, selection.length)
    editor.insertText(selection.index, insertText, 'user')
    editor.setSelection(selection.index, insertText.length + 2)
    editor.theme.tooltip.edit(
      'link',
      `${window.location.origin}/dam-bao-chat-luong/chat-luong-ctdt/${hoSoKiemDinh.hoSoKiemDinh.KT_KDCL_CTDT_HoSoKiemDinh_ID}/tu-danh-gia/buoc-4?q=gan-minh-chung.${IDTieuChuan}.${IDTieuChi}&MC=${minhChung.KT_KDCL_TaiLieu_ID}`,
    )
    editor.theme.tooltip.save()
  }

  useEffect(() => {
    if (danhGiaTieuChiChiTiet && !isEqual(danhGiaTieuChiChiTiet, form)) {
      setForm({ ...form, ...danhGiaTieuChiChiTiet })
    }
  }, [danhGiaTieuChiChiTiet])

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
                `/dam-bao-chat-luong/chat-luong-ctdt/${hoSoKiemDinh.hoSoKiemDinh?.KT_KDCL_CTDT_HoSoKiemDinh_ID}/tu-danh-gia/buoc-5`,
              )
            }
          >
            Quay lại
          </Button>
        </Skeleton>
        <p className="uppercase text-uneti-primary text-xs">
          <b>Đánh giá tiêu chí</b>
        </p>
      </div>

      {!phanCongThucHienThanhVien ? (
        <AlertChuaPhanCongThucHien
          listPhanCongThucHienLoading={listPhanCongThucHienLoading}
          isLoadingListTieuChi={isLoadingListTieuChi}
          tieuChuan={tieuChuan}
          tieuChi={tieuChi}
        />
      ) : (
        <>
          <div className="p-3 bg-white rounded-lg my-3 border-l-uneti-primary-lighter border-l-2 shadow-sm">
            <div className="flex gap-1 items-center">
              <b>Nhóm/Cá nhân thực hiện: </b>
              <Skeleton loading={listPhanCongThucHienLoading}>
                {phanCongThucHien?.KT_KDCL_CTDT_PhanCongThucHien_NhomPhanCong} -{' '}
                {
                  phanCongThucHienThanhVien?.KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_HoTen_ChucDanh
                }
              </Skeleton>
            </div>

            <ThongTinTieuChuanTieuChi
              listPhanCongThucHienLoading={listPhanCongThucHienLoading}
              isLoadingListTieuChi={isLoadingListTieuChi}
              tieuChuan={tieuChuan}
              tieuChi={tieuChi}
            />
          </div>

          {isAssignToMe ||
          hoSoKiemDinh.isChuTich ||
          hoSoKiemDinh.isPhoChuTich ||
          hoSoKiemDinh.isBanThuKy ? (
            <>
              <div className="bg-white rounded-lg px-5 pb-2 pt-1 shadow-sm">
                <div className="mt-4 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <LichSuChinhSua
                      countUpdated={countUpdated}
                      danhGiaTieuChiChiTiet={danhGiaTieuChiChiTiet}
                    />

                    <div className="flex gap-2 justify-end ml-auto">
                      {danhGiaTieuChiChiTiet?.KT_KDCL_CTDT_DanhGiaTieuChi_TrangThai ==
                      stepStatusEnum.DaPheDuyet ? (
                        <div className="flex items-center bg-green-700/80 text-white px-2 py-[2px] rounded gap-1">
                          <Icon>
                            <TickCircle />
                          </Icon>
                          Đã phê duyệt
                        </div>
                      ) : danhGiaTieuChiChiTiet?.KT_KDCL_CTDT_DanhGiaTieuChi_TrangThai ==
                          stepStatusEnum.DaTrinhGui &&
                        (hoSoKiemDinh.isChuTich ||
                          hoSoKiemDinh.isPhoChuTich) ? (
                        <>
                          <Button
                            onClick={() =>
                              handleSubmit(
                                stepStatusEnum.KhongPheDuyet,
                                isRejecting,
                                setIsRejecting,
                              )
                            }
                            isLoading={isRejecting}
                            disabled={isApproving || isPosting}
                            color="danger"
                          >
                            Từ chối phê duyệt
                          </Button>

                          <Button
                            onClick={() =>
                              handleSubmit(
                                stepStatusEnum.DaPheDuyet,
                                isApproving,
                                setIsApproving,
                              )
                            }
                            isLoading={isApproving}
                            disabled={isRejecting || isPosting}
                          >
                            Phê duyệt
                          </Button>
                        </>
                      ) : (
                        (hoSoKiemDinh.isBanThuKy ||
                          hoSoKiemDinh.isChuTich ||
                          hoSoKiemDinh.isPhoChuTich) && (
                          <>
                            <Button
                              onClick={() =>
                                handleSubmit(
                                  stepStatusEnum.DaTrinhGui,
                                  isSendRequesting,
                                  setIsSendRequesting,
                                )
                              }
                              isLoading={isSendRequesting}
                              disabled={isApproving || isRejecting || isPosting}
                            >
                              Gửi phê duyệt
                            </Button>
                          </>
                        )
                      )}

                      {isAssignToMe && !isDisabledUpdate ? (
                        <Button
                          onClick={() =>
                            handleSubmit(undefined, isPosting, setIsPosting)
                          }
                          isLoading={isPosting}
                        >
                          Cập nhật
                        </Button>
                      ) : (
                        danhGiaTieuChiChiTiet?.KT_KDCL_CTDT_DanhGiaTieuChi_TrangThai !==
                          stepStatusEnum.DaPheDuyet && (
                          <span className="text-orange-600 font-medium">
                            Tiêu chí đang được thực hiện đánh giá!
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="mb-1 ml-2 uppercase font-medium">
                        1. Mô tả hiện trạng
                      </h3>
                      {!isDisabledUpdate && (
                        <Button onClick={() => setIsOpenDialogChonMC(true)}>
                          Chọn minh chứng
                        </Button>
                      )}
                    </div>
                    <TextEditor
                      ref={textEditorRef}
                      onChange={(val) => {
                        if (!isAssignToMe) return
                        setForm({
                          ...form,
                          KT_KDCL_CTDT_DanhGiaTieuChi_MoTa: val,
                        })
                      }}
                      value={form?.KT_KDCL_CTDT_DanhGiaTieuChi_MoTa}
                      disabled={isDisabledUpdate}
                    />

                    {form?.KT_KDCL_CTDT_DanhGiaTieuChi_MocChuan_JSON?.length ? (
                      <div className="mt-3">
                        <p className="text-[15px] font-medium ml-3">
                          * Các mốc chuẩn cần đạt được
                        </p>
                        <ul className="flex flex-wrap gap-1">
                          {form.KT_KDCL_CTDT_DanhGiaTieuChi_MocChuan_JSON.map(
                            (mocChuan, i) => (
                              <li key={i} className="w-full">
                                <p className="pl-2 font-medium text-slate-600">
                                  {mocChuan.KT_KDCL_TieuChi_MocChuan_Ten}
                                </p>
                                <TextEditor
                                  value={mocChuan.KT_KDCL_TieuChi_MocChuan_MoTa}
                                  onChange={(value) => {
                                    if (!isAssignToMe) return
                                    handleChangeMocChuan(
                                      mocChuan.KT_KDCL_TieuChi_MocChuan_Ten,
                                      value,
                                    )
                                  }}
                                  className={transformCls([
                                    isDisabledUpdate && 'disabled',
                                    'w-full base-input h-auto',
                                  ])}
                                />
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <h3 className="mb-1 ml-2 uppercase font-medium">
                      2. Điểm mạnh
                    </h3>

                    <TextEditor
                      onChange={(value) =>
                        setForm({
                          ...form,
                          KT_KDCL_CTDT_DanhGiaTieuChi_DiemManh: value,
                        })
                      }
                      value={form?.KT_KDCL_CTDT_DanhGiaTieuChi_DiemManh}
                      className={transformCls([
                        isDisabledUpdate && 'disabled',
                        'w-full base-input h-auto',
                      ])}
                    />
                  </div>
                  <div>
                    <h3 className="mb-1 ml-2 uppercase font-medium">
                      3. Điểm tồn tại
                    </h3>

                    <TextEditor
                      onChange={(value) =>
                        setForm({
                          ...form,
                          KT_KDCL_CTDT_DanhGiaTieuChi_DiemTonTai: value,
                        })
                      }
                      value={form?.KT_KDCL_CTDT_DanhGiaTieuChi_DiemTonTai}
                      className={transformCls([
                        isDisabledUpdate && 'disabled',
                        'w-full base-input h-auto',
                      ])}
                    />
                  </div>
                  <div>
                    <h3 className="mb-1 ml-2 uppercase font-medium">
                      4. Kế hoạch hành động
                    </h3>

                    <TextEditor
                      onChange={(value) =>
                        setForm({
                          ...form,
                          KT_KDCL_CTDT_DanhGiaTieuChi_KeHoachHanhDong: value,
                        })
                      }
                      value={form?.KT_KDCL_CTDT_DanhGiaTieuChi_KeHoachHanhDong}
                      className={transformCls([
                        isDisabledUpdate && 'disabled',
                        'w-full base-input h-auto',
                      ])}
                    />
                  </div>
                  <div>
                    <h3 className="mb-1 ml-2 uppercase font-medium">
                      5. tự đánh giá mức đạt được của tiêu chí
                    </h3>

                    <table className="uneti-u-table">
                      <thead>
                        <tr>
                          <th colSpan={7}>Thang đánh giá</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr className="text-center">
                          <td colSpan={3}>
                            <b className="text-orange-600">Chưa đạt</b>
                          </td>
                          <td colSpan={4}>
                            <b className="text-uneti-primary-lighter">Đạt</b>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <button
                              onClick={() =>
                                setForm({
                                  ...form,
                                  KT_KDCL_CTDT_DanhGiaTieuChi_DanhGia: 1,
                                })
                              }
                              className={transformCls([
                                'icon-btn mx-auto',
                                form?.KT_KDCL_CTDT_DanhGiaTieuChi_DanhGia === 1
                                  ? 'bg-uneti-primary text-white hover:bg-uneti-primary-light'
                                  : '',
                              ])}
                            >
                              1
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() =>
                                setForm({
                                  ...form,
                                  KT_KDCL_CTDT_DanhGiaTieuChi_DanhGia: 2,
                                })
                              }
                              className={transformCls([
                                'icon-btn mx-auto',
                                form?.KT_KDCL_CTDT_DanhGiaTieuChi_DanhGia === 2
                                  ? 'bg-uneti-primary text-white hover:bg-uneti-primary-light'
                                  : '',
                              ])}
                            >
                              2
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() =>
                                setForm({
                                  ...form,
                                  KT_KDCL_CTDT_DanhGiaTieuChi_DanhGia: 3,
                                })
                              }
                              className={transformCls([
                                'icon-btn mx-auto',
                                form?.KT_KDCL_CTDT_DanhGiaTieuChi_DanhGia === 3
                                  ? 'bg-uneti-primary text-white hover:bg-uneti-primary-light'
                                  : '',
                              ])}
                            >
                              3
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() =>
                                setForm({
                                  ...form,
                                  KT_KDCL_CTDT_DanhGiaTieuChi_DanhGia: 4,
                                })
                              }
                              className={transformCls([
                                'icon-btn mx-auto',
                                form?.KT_KDCL_CTDT_DanhGiaTieuChi_DanhGia === 4
                                  ? 'bg-uneti-primary text-white hover:bg-uneti-primary-light'
                                  : '',
                              ])}
                            >
                              4
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() =>
                                setForm({
                                  ...form,
                                  KT_KDCL_CTDT_DanhGiaTieuChi_DanhGia: 5,
                                })
                              }
                              className={transformCls([
                                'icon-btn mx-auto',
                                form?.KT_KDCL_CTDT_DanhGiaTieuChi_DanhGia === 5
                                  ? 'bg-uneti-primary text-white hover:bg-uneti-primary-light'
                                  : '',
                              ])}
                            >
                              5
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() =>
                                setForm({
                                  ...form,
                                  KT_KDCL_CTDT_DanhGiaTieuChi_DanhGia: 6,
                                })
                              }
                              className={transformCls([
                                'icon-btn mx-auto',
                                form?.KT_KDCL_CTDT_DanhGiaTieuChi_DanhGia === 6
                                  ? 'bg-uneti-primary text-white hover:bg-uneti-primary-light'
                                  : '',
                              ])}
                            >
                              6
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() =>
                                setForm({
                                  ...form,
                                  KT_KDCL_CTDT_DanhGiaTieuChi_DanhGia: 7,
                                })
                              }
                              className={transformCls([
                                'icon-btn mx-auto',
                                form?.KT_KDCL_CTDT_DanhGiaTieuChi_DanhGia === 7
                                  ? 'bg-uneti-primary text-white hover:bg-uneti-primary-light'
                                  : '',
                              ])}
                            >
                              7
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <UserKhongDuocPhanCong />
          )}

          <DialogChonMinhChung
            isOpen={isOpendialogChonMC}
            setIsOpen={setIsOpenDialogChonMC}
            onSubmit={handleInsertMinhChung}
            IDTieuChuan={IDTieuChuan}
            IDTieuChi={IDTieuChi}
          />
        </>
      )}
    </div>
  )
}

import {
  lazy,
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { isArray, isNil } from 'lodash-unified'
import Swal from 'sweetalert2'
import {
  usePhanCongThucHienStore,
  usePhanCongThucHienThanhVienStore,
  useThuThapMinhChungTieuChiStore,
  useThuThapMinhChungStore,
  useTieuChiStore,
} from '@/Services/Store/index.js'
import Button from '@/Components/Base/Button/Button.jsx'
import {
  checkConditionObject,
  convertBufferToBase64,
  DataCanBoGV,
  handleBackRoute,
} from '@/Services/Utils/index.js'
import { useNavigate } from 'react-router-dom'
import { HoSoKiemDinhCtx, stepStatusEnum } from '@/Services/Tokens/index.js'
import { Skeleton, SkeletonItem } from '@/Components/Base/index.js'
import {
  loadMinhChung_R_Para_File,
  postMinhChung,
  postThuThapMinhChung,
  postThuThapMinhChungTieuChi,
} from '@/Apis/KDCL/index.js'
import Loading from '@/Components/Loading/Loading.jsx'
import { DrawerCreateMinhChung } from '@/Components/KiemDinhChatLuong/QuanLyMinhChung/DrawerCreateMinhChung.jsx'
import { useMinhChungStore } from '@/Services/Store/Module/KiemDinhChatLuong/minhChung.js'
import { MinhChungType } from '@/Services/Tokens/KDCL/CTDT/minhChung.js'
import { DrawerUpdateMinhChung } from '@/Components/KiemDinhChatLuong/QuanLyMinhChung/DrawerUpdateMinhChung.jsx'
import {
  guiMailThongBaoCapNhatMinhChung,
  guiThongBaoUngDung,
} from '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/TuDanhGia/Buoc4/ThuThapMinhChung/notify.js'
import LeftAction from '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/TuDanhGia/Buoc4/ThuThapMinhChung/TableActions/LeftAction.jsx'
import RightAction from '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/TuDanhGia/Buoc4/ThuThapMinhChung/TableActions/RightAction.jsx'
import UserKhongDuocPhanCong from '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/TuDanhGia/UserKhongDuocPhanCong.jsx'
import TableTieuChi from '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/TuDanhGia/Buoc4/ThuThapMinhChung/TableTieuChi.jsx'
import { useQueryParams } from '@/Services/Hooks/index.js'

const DialogThuThapMinhChung_TieuChi = lazy(
  () => import('./DialogThuThapMinhChung_TieuChi.jsx'),
)

export default function ThuThapMinhChung_TieuChi({ IDTieuChi, IDTieuChuan }) {
  const navigate = useNavigate()
  const dataUser = DataCanBoGV()
  const [queryIDMinhChung] = useState(useQueryParams().MC)
  const [showDetailByQuery, setShowDetailByQuery] = useState(false)

  const hoSoKiemDinh = useContext(HoSoKiemDinhCtx)

  const [isOpenDialog, setIsOpenDialog] = useState(false)

  const { listMinhChung, refetch: refetchListMinhChung } = useMinhChungStore()
  const { listTieuChi, isLoadingListTieuChi } = useTieuChiStore()
  const { listThuThapMinhChung, refetch: refetchListThuThapMinhChung } =
    useThuThapMinhChungStore()
  const {
    listThuThapMinhChungTieuChi: _listThuThapMinhChungTieuChi,
    refetch: refetchListThuThapMinhChungTieuChi,
  } = useThuThapMinhChungTieuChiStore()

  const drawerCreateMinhChungRef = useRef()
  const drawerUpdateMinhChungRef = useRef()

  const [minhChungUpdating, setMinhChungUpdating] = useState()

  const { listPhanCongThucHienMapped, isLoading: listPhanCongThucHienLoading } =
    usePhanCongThucHienStore({
      listTieuChuan: hoSoKiemDinh.listTieuChuan,
      nhomChuyenTrach: hoSoKiemDinh.nhomChuyenTrach,
      hoiDong: hoSoKiemDinh.hoiDong,
    })
  const [minhChungSelected, setMinhChungSelected] = useState()

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
    if (!_phanCongThucHienThanhVien) return {}
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

  const isAssignToMe = useMemo(
    () =>
      phanCongThucHienThanhVien?.KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_MaNhanSu ===
        dataUser.MaNhanSu ||
      hoSoKiemDinh.isChuTich ||
      hoSoKiemDinh.isPhoChuTich ||
      hoSoKiemDinh.isBanThuKy,
    [phanCongThucHienThanhVien, dataUser, hoSoKiemDinh],
  )

  const guiThongBaoCapNhatMinhChung = (minhChung) => {
    if (
      !checkConditionObject(
        {
          ...minhChung,
          KT_KDCL_TaiLieu_DataFile: ' ',
        },
        {
          ...minhChungUpdating,
          KT_KDCL_TaiLieu_DataFile: ' ',
        },
      )
    )
      return

    if (
      !phanCongThucHienThanhVien ||
      phanCongThucHienThanhVien.KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_MaNhanSu ===
        dataUser.MaNhanSu ||
      !phanCongThucHienThanhVien.KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_EmailUneti ||
      !minhChung?.KT_KDCL_TaiLieu_ID
    ) {
      return
    }

    guiMailThongBaoCapNhatMinhChung(
      dataUser,
      minhChungUpdating,
      minhChung,
      phanCongThucHienThanhVien,
      hoSoKiemDinh.hoSoKiemDinh.KT_KDCL_CTDT_HoSoKiemDinh_ID,
      IDTieuChuan,
      IDTieuChi,
    )
    guiThongBaoUngDung(
      dataUser,
      minhChungUpdating,
      minhChung,
      phanCongThucHienThanhVien,
      hoSoKiemDinh.hoSoKiemDinh.KT_KDCL_CTDT_HoSoKiemDinh_ID,
      hoSoKiemDinh.stepActive.IDQuyTrinhKiemDinh,
      hoSoKiemDinh.childStepActive?.IDQuyTrinhKiemDinh,
      'KT_KDCL_CTDT_ThuThapMinhChung',
      IDTieuChuan,
      IDTieuChi,
    )
  }

  const thuThapMinhChung = useMemo(() => {
    if (!hoSoKiemDinh.hoiDong) return null

    return listThuThapMinhChung.find(
      (e) =>
        e.KT_KDCL_CTDT_ThuThapMinhChung_IDTieuChi === IDTieuChi &&
        e.KT_KDCL_CTDT_ThuThapMinhChung_IDThanhLapHoiDong ===
          hoSoKiemDinh.hoiDong.KT_KDCL_CTDT_ThanhLapHoiDong_ID,
    )
  }, [hoSoKiemDinh.hoiDong, listThuThapMinhChung])

  const listThuThapMinhChungTieuChi = useMemo(() => {
    if (!thuThapMinhChung || !listMinhChung.length) return []

    return _listThuThapMinhChungTieuChi
      .filter(
        (e) =>
          e.KT_KDCL_CTDT_ThuThapMinhChung_ChiTiet_IDThuThapMinhChung &&
          e.KT_KDCL_CTDT_ThuThapMinhChung_ChiTiet_IDThuThapMinhChung ===
            thuThapMinhChung.KT_KDCL_CTDT_ThuThapMinhChung_ID,
      )
      .map((e) => {
        const minhChung = listMinhChung.find(
          (mc) =>
            mc.KT_KDCL_TaiLieu_ID ===
            e.KT_KDCL_CTDT_ThuThapMinhChung_ChiTiet_IDMinhChung,
        )

        return {
          ...e,
          ...minhChung,
        }
      })
  }, [_listThuThapMinhChungTieuChi, thuThapMinhChung, listMinhChung])

  const [isPosting, setIsPosting] = useState(false)

  const createThuThapMinhChung = async () => {
    const res = await postThuThapMinhChung({
      KT_KDCL_CTDT_ThuThapMinhChung_IDTieuChi: IDTieuChi,
      KT_KDCL_CTDT_ThuThapMinhChung_IDThanhLapHoiDong:
        hoSoKiemDinh.hoiDong.KT_KDCL_CTDT_ThanhLapHoiDong_ID,
      KT_KDCL_CTDT_ThuThapMinhChung_TrangThai: false,
    })

    await refetchListThuThapMinhChung()
    return res.data.body[0].KT_KDCL_CTDT_ThuThapMinhChung_ID
  }

  const createNewMinhChung = async (minhChung) => {
    const res = await postMinhChung(minhChung)
    return res.data.body[0].KT_KDCL_TaiLieu_ID
  }

  const loadMinhChungChiTiet = async (IDMinhChung) => {
    const res = await loadMinhChung_R_Para_File(IDMinhChung)
    const minhChung = res.data.body[0]
    minhChung.KT_KDCL_TaiLieu_DataFile = isArray(
      minhChung.KT_KDCL_TaiLieu_DataFile?.data,
    )
      ? convertBufferToBase64(minhChung.KT_KDCL_TaiLieu_DataFile.data)
      : ''
    return minhChung
  }

  const hanldePostThuThapMinhChung = async (IDMinhChung) => {
    if (isPosting || !IDMinhChung) return

    let IDThuThapMinhChung = thuThapMinhChung?.KT_KDCL_CTDT_ThuThapMinhChung_ID
    try {
      setIsPosting(true)

      if (isNil(IDThuThapMinhChung)) {
        IDThuThapMinhChung = await createThuThapMinhChung()
      }

      // load minh chung chi tiet
      const minhChung = await loadMinhChungChiTiet(IDMinhChung)

      // copy từ thùng minh chứng dùng chung sang minh chứng của riêng chương trình kiểm định
      const newIDMinhChung = await createNewMinhChung({
        ...minhChung,
        KT_KDCL_TaiLieu_Type: MinhChungType.Draft,
        KT_KDCL_TaiLieu_TrangThai_PheDuyet: stepStatusEnum.DangThucHien,
      })

      await postThuThapMinhChungTieuChi({
        KT_KDCL_CTDT_ThuThapMinhChung_ChiTiet_IDMinhChung: newIDMinhChung,
        KT_KDCL_CTDT_ThuThapMinhChung_ChiTiet_IDThuThapMinhChung:
          IDThuThapMinhChung,
      })

      await refetchListMinhChung()
      await refetchListThuThapMinhChungTieuChi()
    } catch (e) {
      console.error(e)
      Swal.fire({
        icon: 'error',
        title: 'Thông báo',
        text: 'Có lỗi xảy ra, vui lòng thử lại sau!',
      })
    } finally {
      setIsPosting(false)
    }
  }

  const onMinhChungCreated = async (minhChung) => {
    await refetchListMinhChung()
    hanldePostThuThapMinhChung(minhChung.KT_KDCL_TaiLieu_ID)
  }

  useEffect(() => {
    if (!hoSoKiemDinh.hoiDong) return
    if (thuThapMinhChung === null) return

    if (thuThapMinhChung === undefined && phanCongThucHienThanhVien) {
      postThuThapMinhChung({
        KT_KDCL_CTDT_ThuThapMinhChung_IDThanhLapHoiDong:
          hoSoKiemDinh.hoiDong.KT_KDCL_CTDT_ThanhLapHoiDong_ID,
        KT_KDCL_CTDT_ThuThapMinhChung_IDTieuChi: IDTieuChi,
        KT_KDCL_CTDT_ThuThapMinhChung_TrangThai: false,
      }).then(refetchListThuThapMinhChung)
    }
  }, [thuThapMinhChung, hoSoKiemDinh.hoiDong])

  useEffect(() => {
    if (
      !queryIDMinhChung ||
      showDetailByQuery ||
      !drawerUpdateMinhChungRef.current ||
      !listPhanCongThucHienMapped.length ||
      !phanCongThucHienThanhVien ||
      !listThuThapMinhChungTieuChi.length
    )
      return

    const minhChung = listThuThapMinhChungTieuChi.find(
      (e) => e.KT_KDCL_TaiLieu_ID == queryIDMinhChung,
    )

    setMinhChungUpdating(minhChung)
    setMinhChungSelected(minhChung)
    drawerUpdateMinhChungRef.current.open()
    setShowDetailByQuery(true)
  }, [
    queryIDMinhChung,
    listThuThapMinhChungTieuChi,
    drawerUpdateMinhChungRef.current,
    listPhanCongThucHienMapped,
    phanCongThucHienThanhVien,
  ])

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
          <b>Gán minh chứng liên quan cho các tiêu chí</b>
        </p>
      </div>

      {!phanCongThucHienThanhVien ? (
        <div className="relative z-0 mt-3">
          <div className="absolute-full border-l-2 pl-4 border-orange-400 bg-orange-300/10 rounded-lg z-[100] "></div>
          <div className="flex flex-col gap-1 p-3">
            <div className="flex gap-1">
              <b className="shrink-0">Tiêu chuẩn:</b>
              <Skeleton loading={listPhanCongThucHienLoading}>
                {phanCongThucHien?.KT_KDCL_TieuChuan_Ma}
                {' - '}
                {phanCongThucHien?.KT_KDCL_TieuChuan_Ten}
              </Skeleton>
            </div>
            <div className="flex gap-1">
              <b className="shrink-0">Tiêu chí:</b>
              <Skeleton loading={isLoadingListTieuChi}>
                {tieuChi?.KT_KDCL_TieuChi_Ma}
                {' - '}
                {
                  tieuChi?.KT_KDCL_TieuChi_JSON_DATA[0]
                    .KT_KDCL_BoTieuChuan_NoiDung
                }
              </Skeleton>
            </div>
            <p className="text-orange-700 text-[14px] md:text-[15px]">
              Tiêu chí này chưa được phân công cho thành viên nào thực hiện!
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="p-3 bg-white rounded-lg my-3 border-l-uneti-primary-lighter border-l-2 shadow-sm">
            <div className="flex gap-1 items-center">
              <b className="shrink-0">Nhóm/Cá nhân thực hiện: </b>
              <Skeleton loading={listPhanCongThucHienLoading}>
                {phanCongThucHien?.KT_KDCL_CTDT_PhanCongThucHien_NhomPhanCong} -{' '}
                {
                  phanCongThucHienThanhVien.KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_HoTen_ChucDanh
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
          </div>

          {isAssignToMe ||
          hoSoKiemDinh.isChuTich ||
          hoSoKiemDinh.isPhoChuTich ||
          hoSoKiemDinh.isBanThuKy ? (
            <>
              <div className="flex items-center justify-end md:justify-between gap-2 flex-wrap-reverse">
                <LeftAction
                  minhChungSelected={minhChungSelected}
                  setMinhChungSelected={setMinhChungSelected}
                />

                <RightAction
                  handleThemMoiMinhChung={() => {
                    drawerCreateMinhChungRef.current?.open()
                  }}
                  thuThapMinhChung={thuThapMinhChung}
                  handleChonMinhChung={() => setIsOpenDialog(true)}
                  tieuChi={tieuChi}
                  tieuChuan={phanCongThucHien}
                  IDTieuChi={IDTieuChi}
                  listThuThapMinhChungTieuChi={listThuThapMinhChungTieuChi}
                />
              </div>

              <TableTieuChi
                handleUpdateMinhChung={(minhChung) => {
                  setMinhChungUpdating(minhChung)
                  drawerUpdateMinhChungRef.current?.open()
                }}
                thuThapMinhChung={thuThapMinhChung}
                listThuThapMinhChungTieuChi={listThuThapMinhChungTieuChi}
                setMinhChungSelected={setMinhChungSelected}
                minhChungSelected={minhChungSelected}
              />
            </>
          ) : (
            <UserKhongDuocPhanCong />
          )}

          <Suspense fallback={<Loading />}>
            {isOpenDialog && (
              <DialogThuThapMinhChung_TieuChi
                isOpen={isOpenDialog}
                setIsOpen={setIsOpenDialog}
                IDThuThapMinhChung={
                  thuThapMinhChung?.KT_KDCL_CTDT_ThuThapMinhChung_ID
                }
                hanldePostThuThapMinhChung={hanldePostThuThapMinhChung}
                isPosting={isPosting}
              />
            )}

            <DrawerCreateMinhChung
              ref={drawerCreateMinhChungRef}
              onCreated={onMinhChungCreated}
              KT_KDCL_TaiLieu_Type={MinhChungType.Draft}
              KT_KDCL_TaiLieu_TrangThai_PheDuyet={stepStatusEnum.DangThucHien}
            />

            <DrawerUpdateMinhChung
              ref={drawerUpdateMinhChungRef}
              minhChungUpdating={minhChungUpdating}
              onUpdated={(dataUpdate) => {
                setMinhChungSelected(null)

                // check neu la ban thu ky cap nhat minh chung thi gui thong bao
                guiThongBaoCapNhatMinhChung(dataUpdate)
              }}
              KT_KDCL_TaiLieu_Type={MinhChungType.Draft}
              KT_KDCL_TaiLieu_TrangThai_PheDuyet={stepStatusEnum.DangThucHien}
            />
          </Suspense>
        </>
      )}
    </div>
  )
}

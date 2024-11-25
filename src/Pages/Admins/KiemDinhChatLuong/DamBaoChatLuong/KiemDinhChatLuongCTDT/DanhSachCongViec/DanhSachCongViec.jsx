import { Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { isEmpty, isNil, isNumber } from 'lodash-unified'
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import {
  isStringNumber,
  transformCls,
  retries,
  dayjs,
  DataCanBoGV,
  convertDataFileToBase64,
  convertBufferToBase64,
  handleDownloadFileBase64,
} from '@/Services/Utils'
import {
  loadHoSoKiemDinh,
  loadBoTieuChuan,
  loadThanhLapHoiDong,
  postHoSoLuuTru,
  loadHoSoLuuTru,
  putHoSoLuuTru,
} from '@/Apis/KDCL'
import {
  HoSoKiemDinhCtx,
  IDQuyTrinhKiemDinhEnum,
  LoaiThanhPhanHoiDongEnum,
  NhiemVuEnum,
  stepMetadata,
  stepStatusEnum,
  stepStatusTextEnum,
} from '@/Services/Tokens'
import {
  useBoTieuChuanStore,
  useThanhPhanHoiDongStore,
  useTieuChuanStore,
  useChuongTrinhDaoTaoStore,
  useNhomChuyenTrachStore,
  useNhomChuyenTrachThanhVienStore,
  useThoiGianThucHienStore,
  useTieuChiStore,
} from '@/Services/Store'
import {
  Popper,
  PopperContent,
  PopperTrigger,
  Skeleton,
} from '@/Components/Base/index.js'
import Loading from '@/Components/Loading/Loading.jsx'
import Swal from 'sweetalert2'
import { MIME_TYPE_EXTENSION_COMMON } from '@/Configs/constants'
import { ShortHocHamHocVi } from '@/Services/Static/Common/HocHamHocVi'
import Notifications from '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/Notifications/Notifications'

const HoiDongCache = new Map()
const FileHoSoLuuTruCache = new Map()

export default function DanhSachCongViec() {
  const { id } = useParams()
  const location = useLocation()
  const navigator = useNavigate()

  const dataUser = DataCanBoGV()

  const [hoSoKiemDinh, setHoSoKiemDinh] = useState()
  const [boTieuChuan, setBoTieuChuan] = useState()
  const [steps] = useState(stepMetadata)

  const [hoiDong, setHoiDong] = useState()
  const { listBoTieuChuan } = useBoTieuChuanStore()
  const { listChuongTrinhDaoTao } = useChuongTrinhDaoTaoStore()
  const { listTieuChuan } = useTieuChuanStore()
  const { listTieuChi } = useTieuChiStore()
  const { listThanhPhanHoiDong } = useThanhPhanHoiDongStore()
  const { listNhomChuyenTrach } = useNhomChuyenTrachStore()
  const { listThoiGianThucHien, isLoading: isLoadingThoiGianThucHien } =
    useThoiGianThucHienStore()
  const { listNhomChuyenTrachThanhVien } = useNhomChuyenTrachThanhVienStore()

  const [danhSachThanhPhanHoiDong, setDanhSachThanhPhanHoiDong] = useState([])
  const [danhSachBanThuKy, setDanhSachBanThuKy] = useState([])
  const [fileQuyTrinh, setFileQuyTrinh] = useState()

  const pathLocation = useMemo(
    () => location.pathname.split('/'),
    [location.pathname],
  )
  const stepActive = useMemo(() => {
    return steps.find((e) => pathLocation.includes(e.route))
  }, [steps, pathLocation])

  const childStepActive = useMemo(() => {
    return stepActive.children?.find((e) => e.route === pathLocation.at(-1))
  }, [stepActive, pathLocation])

  const fetchHoiDong = useCallback(async () => {
    if (!hoSoKiemDinh || !stepActive.children?.length) return

    const key = `${hoSoKiemDinh.KT_KDCL_CTDT_HoSoKiemDinh_ID}_${stepActive.children[0].IDQuyTrinhKiemDinh}`

    if (!HoiDongCache.get(key)) {
      const res = await loadThanhLapHoiDong({
        KT_KDCL_CTDT_ThanhLapHoiDong_IDHoSoKiemDinh:
          hoSoKiemDinh.KT_KDCL_CTDT_HoSoKiemDinh_ID,
        KT_KDCL_CTDT_ThanhLapHoiDong_IDQuyTrinh:
          stepActive.children[0].IDQuyTrinhKiemDinh,
      })
      HoiDongCache.set(key, res.data.body[0])
    }

    setHoiDong(HoiDongCache.get(key))
  }, [hoSoKiemDinh, stepActive])

  useEffect(() => {
    fetchHoiDong()
  }, [hoSoKiemDinh, stepActive])

  useEffect(() => {
    const thanhPhanHoiDong = [],
      banThuKy = []
    const thanhVienTrongHoiDong = listThanhPhanHoiDong.filter(
      (hd) =>
        hd.KT_KDCL_CTDT_ThanhPhanHoiDong_IDThanhLapHoiDong ===
        hoiDong?.KT_KDCL_CTDT_ThanhLapHoiDong_ID,
    )
    for (let thanhPhan of thanhVienTrongHoiDong) {
      if (
        thanhPhan.KT_KDCL_CTDT_ThanhPhanHoiDong_LoaiThanhPhan ===
        LoaiThanhPhanHoiDongEnum.TDG_ThanhPhanHoiDong
      ) {
        thanhPhanHoiDong.push(thanhPhan)
      } else {
        banThuKy.push(thanhPhan)
      }
    }

    if (!isEmpty(thanhPhanHoiDong))
      setDanhSachThanhPhanHoiDong(thanhPhanHoiDong)

    if (!isEmpty(banThuKy)) setDanhSachBanThuKy(banThuKy)
  }, [listThanhPhanHoiDong, hoiDong])

  const listTieuChuanByBoTieuChuan = useMemo(() => {
    return listTieuChuan.filter(
      (tc) =>
        tc.KT_KDCL_TieuChuan_IDBoTieuChuan ===
        boTieuChuan?.KT_KDCL_BoTieuChuan_ID,
    )
  }, [listTieuChuan, boTieuChuan])

  const listTieuChiMappedByTieuChuanID = useMemo(() => {
    return listTieuChi.reduce((acc, curr) => {
      if (!acc[curr.KT_KDCL_TieuChi_IDTieuChuan]) {
        acc[curr.KT_KDCL_TieuChi_IDTieuChuan] = []
      }
      acc[curr.KT_KDCL_TieuChi_IDTieuChuan].push(curr)

      return acc
    }, {})
  }, [listTieuChi])

  const listNhomChuyenTrachTrongHoiDong = useMemo(() => {
    return listNhomChuyenTrach.filter(
      (e) =>
        e.KT_KDCL_CTDT_NhomChuyenTrach_IDThanhLapHoiDong ===
        hoiDong?.KT_KDCL_CTDT_ThanhLapHoiDong_ID,
    )
  }, [listNhomChuyenTrach, hoiDong])

  const thanhPhanHoiDong = useMemo(() => {
    return listThanhPhanHoiDong
      .filter(
        (hd) =>
          hd.KT_KDCL_CTDT_ThanhPhanHoiDong_IDThanhLapHoiDong ===
          hoiDong?.KT_KDCL_CTDT_ThanhLapHoiDong_ID,
      )
      .map((e) => ({
        ...e,
        KT_KDCL_CTDT_ThanhPhanHoiDong_HoTen_ChucDanh:
          (e.KT_KDCL_CTDT_ThanhPhanHoiDong_HocHamHocVi_Edit
            ? e.KT_KDCL_CTDT_ThanhPhanHoiDong_HocHamHocVi_Edit + '. '
            : e.KT_KDCL_CTDT_ThanhPhanHoiDong_HocHamHocVi
              ? (ShortHocHamHocVi[
                  e.KT_KDCL_CTDT_ThanhPhanHoiDong_HocHamHocVi
                ] || e.KT_KDCL_CTDT_ThanhPhanHoiDong_HocHamHocVi) + '. '
              : '') + e.KT_KDCL_CTDT_ThanhPhanHoiDong_HoTen,
      }))
  }, [listThanhPhanHoiDong, hoiDong])

  const listNhomChuyenTrachThanhVienTrongHoiDong = useMemo(() => {
    return listNhomChuyenTrachThanhVien
      .filter((thanhVien) =>
        listNhomChuyenTrachTrongHoiDong.find(
          (nhomChuyenTrach) =>
            nhomChuyenTrach.KT_KDCL_CTDT_NhomChuyenTrach_ID ===
            thanhVien.KT_KDCL_CTDT_NhomChuyenTrach_ThanhVien_IDNhomChuyenTrach,
        ),
      )
      .map((e) => ({
        ...e,
        KT_KDCL_CTDT_NhomChuyenTrach_ThanhVien_HoTen_ChucDanh:
          thanhPhanHoiDong.find(
            (tphd) =>
              tphd.KT_KDCL_CTDT_ThanhPhanHoiDong_ID ==
              e.KT_KDCL_CTDT_NhomChuyenTrach_ThanhVien_IDThanhPhanHoiDong,
          )?.KT_KDCL_CTDT_ThanhPhanHoiDong_HoTen_ChucDanh,
      }))
  }, [
    listNhomChuyenTrachThanhVien,
    listNhomChuyenTrachTrongHoiDong,
    thanhPhanHoiDong,
  ])

  const nhomChuyenTrachThanhVienGroupByIDNhomChuyenTrach = useMemo(
    () =>
      listNhomChuyenTrachThanhVienTrongHoiDong.reduce((acc, curr) => {
        const IDNhomChuyenTrach =
          curr.KT_KDCL_CTDT_NhomChuyenTrach_ThanhVien_IDNhomChuyenTrach
        if (!acc[IDNhomChuyenTrach]) {
          acc[IDNhomChuyenTrach] = []
        }
        acc[IDNhomChuyenTrach].push(curr)
        return acc
      }, {}),
    [listNhomChuyenTrachThanhVienTrongHoiDong],
  )
  const thoiGianThucHien = useMemo(() => {
    return listThoiGianThucHien.filter(
      (tg) =>
        tg.KT_KDCL_CTDT_ThoiGianThucHien_IDThanhLapHoiDong ===
        hoiDong?.KT_KDCL_CTDT_ThanhLapHoiDong_ID,
    )
  }, [listThoiGianThucHien, hoiDong, childStepActive])

  const thoiGianQuyTrinh = useMemo(() => {
    return thoiGianThucHien?.find(
      (tg) =>
        tg.KT_KDCL_CTDT_ThoiGianThucHien_IDQuyTrinhKiemDinh ===
        childStepActive?.IDQuyTrinhKiemDinh,
    )
  }, [thoiGianThucHien, childStepActive])

  const hoSoKiemDinhMapped = useMemo(() => {
    if (!hoSoKiemDinh) return {}

    return {
      ...hoSoKiemDinh,
      ...listBoTieuChuan.find(
        (btc) =>
          btc.KT_KDCL_BoTieuChuan_ID ===
          hoSoKiemDinh.KT_KDCL_CTDT_HoSoKiemDinh_IDBoTieuChuan,
      ),
    }
  }, [hoSoKiemDinh, listBoTieuChuan, listChuongTrinhDaoTao])

  const _loadHoSoKiemDinh = async () => {
    const res = await loadHoSoKiemDinh(id)
    if (!res.data.body[0]?.KT_KDCL_CTDT_HoSoKiemDinh_ID) {
      navigator('/dam-bao-chat-luong/chat-luong-ctdt')
      return
    }
    setHoSoKiemDinh(res.data.body[0])
  }

  const _loadBoTieuChuan = async () => {
    const res = await loadBoTieuChuan(
      hoSoKiemDinh.KT_KDCL_CTDT_HoSoKiemDinh_IDBoTieuChuan,
    )

    setBoTieuChuan(res.data.body[0])
  }

  const loadFileHoSoLuuTru = async (IDQuyTrinh, forceReload = false) => {
    if (!hoSoKiemDinh?.KT_KDCL_CTDT_HoSoKiemDinh_ID) return

    const key = `${IDQuyTrinh}_${hoSoKiemDinh.KT_KDCL_CTDT_HoSoKiemDinh_ID}`

    let hoSoLuuTru = FileHoSoLuuTruCache.get(key)

    if (!forceReload && hoSoLuuTru) {
      if (
        IDQuyTrinh === childStepActive?.IDQuyTrinhKiemDinh ||
        IDQuyTrinh === stepActive.IDQuyTrinhKiemDinh
      ) {
        setFileQuyTrinh(hoSoLuuTru)
      }
      return hoSoLuuTru
    }

    const res = await loadHoSoLuuTru({
      KT_KDCL_HoSoLuuTru_IDQuyTrinh: IDQuyTrinh,
      KT_KDCL_HoSoLuuTru_IDHoSoKiemDinh:
        hoSoKiemDinh.KT_KDCL_CTDT_HoSoKiemDinh_ID,
    })

    const hoSo = res.data.body[0]

    if (!hoSo) {
      if (
        IDQuyTrinh === childStepActive?.IDQuyTrinhKiemDinh ||
        IDQuyTrinh === stepActive.IDQuyTrinhKiemDinh
      ) {
        setFileQuyTrinh()
      }
      return undefined
    }

    const fileExt = hoSo.KT_KDCL_HoSoLuuTru_TenFile.split('.').pop()
    const mineType = MIME_TYPE_EXTENSION_COMMON.find(
      (e) => e.extension == `.${fileExt}`,
    ).mimeType
    const base64Data = convertBufferToBase64(
      hoSo.KT_KDCL_HoSoLuuTru_DataFile.data,
    )
    const base64WithMineType = `data:${mineType};base64,${base64Data}`

    hoSoLuuTru = {
      ...hoSo,
      KT_KDCL_HoSoLuuTru_DataFile: base64WithMineType,
      KT_KDCL_HoSoLuuTru_DataFile_Base64: base64Data,
      KT_KDCL_HoSoLuuTru_DataFile_Buffer: hoSo.KT_KDCL_HoSoLuuTru_DataFile.data,
    }

    FileHoSoLuuTruCache.set(key, hoSoLuuTru)

    if (
      IDQuyTrinh === childStepActive?.IDQuyTrinhKiemDinh ||
      IDQuyTrinh === stepActive.IDQuyTrinhKiemDinh
    ) {
      setFileQuyTrinh(hoSoLuuTru)
    }
    return hoSoLuuTru
  }

  const downloadFileHoSoLuuTru = async (IDQuyTrinh) => {
    if (!IDQuyTrinh) {
      IDQuyTrinh = childStepActive
        ? childStepActive.IDQuyTrinhKiemDinh
        : stepActive.IDQuyTrinhKiemDinh
    }

    let file = await loadFileHoSoLuuTru(IDQuyTrinh)
    if (!file) {
      file = await loadFileHoSoLuuTru(IDQuyTrinh, true)

      if (!file) {
        Swal.fire({
          icon: 'warning',
          title: 'Thông báo',
          text: 'Không tìm thấy file!',
        })
        return
      }
    }

    await handleDownloadFileBase64(
      file.KT_KDCL_HoSoLuuTru_TenFile,
      file.KT_KDCL_HoSoLuuTru_DataFile_Base64,
    )
  }

  const postFileHoSoLuuTru = async ({ file, IDQuyTrinh }) => {
    if (!file || !hoSoKiemDinh?.KT_KDCL_CTDT_HoSoKiemDinh_ID) {
      Swal.fire({
        icon: 'warning',
        title: 'Thông báo',
        text: 'Có lỗi xảy ra, vui lòng tải lại trang rồi thử lại sau, hoặc liên hệ quản trị viên!',
      })
      return
    }

    const hoSoLuuTru = await loadFileHoSoLuuTru(IDQuyTrinh)

    let action = postHoSoLuuTru

    if (hoSoLuuTru?.KT_KDCL_HoSoLuuTru_ID) {
      action = putHoSoLuuTru
    }

    const dataFileBase64 = await convertDataFileToBase64(file)
    const filename = file.name

    await retries(() =>
      action({
        ...hoSoLuuTru,
        KT_KDCL_HoSoLuuTru_TenFile: filename,
        KT_KDCL_HoSoLuuTru_DataFile: dataFileBase64.split(';base64,').pop(),
        KT_KDCL_HoSoLuuTru_IDQuyTrinh: IDQuyTrinh,
        KT_KDCL_HoSoLuuTru_IDHoSoKiemDinh:
          hoSoKiemDinh.KT_KDCL_CTDT_HoSoKiemDinh_ID,
      }),
    )

    await loadFileHoSoLuuTru(IDQuyTrinh, true)
  }

  const thanhPhanHoiDongUser = useMemo(
    () =>
      thanhPhanHoiDong.find(
        (e) =>
          e.KT_KDCL_CTDT_ThanhPhanHoiDong_IDThanhLapHoiDong ===
            hoiDong?.KT_KDCL_CTDT_ThanhLapHoiDong_ID &&
          e.KT_KDCL_CTDT_ThanhPhanHoiDong_MaNhanSu === dataUser?.MaNhanSu,
      ),
    [thanhPhanHoiDong, dataUser, hoiDong],
  )

  const isChuTich = useMemo(() => {
    return (
      thanhPhanHoiDongUser?.KT_KDCL_CTDT_ThanhPhanHoiDong_NhiemVu ==
      NhiemVuEnum.ChuTich
    )
  }, [thanhPhanHoiDongUser])
  const isPhoChuTich = useMemo(() => {
    return (
      thanhPhanHoiDongUser?.KT_KDCL_CTDT_ThanhPhanHoiDong_NhiemVu ==
      NhiemVuEnum.PhoChuTich
    )
  }, [thanhPhanHoiDongUser])
  const isBanThuKy = useMemo(() => {
    return (
      thanhPhanHoiDongUser?.KT_KDCL_CTDT_ThanhPhanHoiDong_LoaiThanhPhan ==
      LoaiThanhPhanHoiDongEnum.TDG_BanThuKy
    )
  }, [thanhPhanHoiDongUser])
  const isTruongNhom = useMemo(() => {
    return listNhomChuyenTrachThanhVienTrongHoiDong.find(
      (tv) =>
        tv.KT_KDCL_CTDT_ThanhPhanHoiDong_ID ==
        thanhPhanHoiDongUser?.KT_KDCL_CTDT_ThanhPhanHoiDong_ID,
    )?.KT_KDCL_CTDT_NhomChuyenTrach_ThanhVien_IsTruongNhom
  }, [listNhomChuyenTrachThanhVienTrongHoiDong, thanhPhanHoiDongUser])

  useEffect(() => {
    if (hoSoKiemDinh) {
      retries(_loadBoTieuChuan)
    }
  }, [hoSoKiemDinh])

  useEffect(() => {
    const IDQuyTrinh = childStepActive
      ? childStepActive.IDQuyTrinhKiemDinh
      : stepActive.IDQuyTrinhKiemDinh

    if (!hoSoKiemDinh || IDQuyTrinh === IDQuyTrinhKiemDinhEnum.HoSoLuuTru)
      return

    loadFileHoSoLuuTru(IDQuyTrinh)
  }, [hoSoKiemDinh, childStepActive, stepActive])

  useEffect(() => {
    if (!isStringNumber(id) && !isNumber(id)) {
      navigator('/dam-bao-chat-luong/chat-luong-ctdt')
      return
    }
    if (!stepActive) {
      navigator(`/dam-bao-chat-luong/chat-luong-ctdt/${id}/tu-danh-gia/buoc-1`)
      return
    }

    retries(_loadHoSoKiemDinh)
  }, [id])

  return (
    <HoSoKiemDinhCtx.Provider
      value={{
        hoSoKiemDinh: hoSoKiemDinhMapped,
        loadHoSoKiemDinh: () => retries(_loadHoSoKiemDinh),
        boTieuChuan,
        listTieuChuan: listTieuChuanByBoTieuChuan,
        listTieuChiMappedByTieuChuanID,
        nhomChuyenTrach: listNhomChuyenTrachTrongHoiDong,

        fetchHoiDong,
        hoiDong,
        danhSachThanhPhanHoiDong,
        danhSachBanThuKy,
        thanhPhanHoiDong,

        // Quy trinh kiem dinh
        stepActive,
        childStepActive,
        thoiGianQuyTrinh,
        thoiGianThucHien,

        // Nhom chuyen trach
        nhomChuyenTrachThanhVienGroupByIDNhomChuyenTrach,
        listNhomChuyenTrachThanhVienTrongHoiDong,

        // Vai tro trong hoi dong cua nguoi hien tai dang login
        isTruongNhom,
        isChuTich,
        isPhoChuTich,
        isBanThuKy,
        thanhPhanHoiDongUser,

        // Ho so luu tru
        postFileHoSoLuuTru,
        loadFileHoSoLuuTru,
        fileQuyTrinh,
        downloadFileHoSoLuuTru,
      }}
    >
      <div className="px-3 py-3 bg-white rounded-lg">
        {/* header */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className={'flex gap-1'}>
              <p>Chương trình kiểm định:</p>{' '}
              <Skeleton loading={!hoSoKiemDinh} variant="h3">
                <p className="text-slate-700 font-medium text-[15px]">
                  {hoSoKiemDinhMapped.KT_KDCL_CTDT_HoSoKiemDinh_TenNganh}
                </p>
              </Skeleton>
            </h3>
            <div className="text-sm mt-2 flex justify-start gap-1">
              <p className="hidden md:block shrink-0">Tên đơn vị: </p>
              <Skeleton loading={!hoSoKiemDinh} variant="p">
                <p className="font-medium">
                  {hoSoKiemDinh?.KT_KDCL_CTDT_HoSoKiemDinh_TenKhoa}
                </p>
              </Skeleton>
            </div>
          </div>

          <Notifications />
        </div>

        <div className="uneti-divider" />

        <div className="flex rounded-xl overflow-x-auto md:mt-5 p-1 gap-1 bg-gray-200/70">
          {steps.map((e, i) => (
            <Link
              to={`/dam-bao-chat-luong/chat-luong-ctdt/${id}/${e.route}${!isNil(e.children) ? `/${e.children?.[0].route}` : ''}`}
              key={i}
              className={transformCls([
                'uppercase whitespace-nowrap px-3 md:px-4 text-[12px] cursor-pointer flex-1 text-center py-2 rounded-lg',
                pathLocation.includes(e.route)
                  ? 'bg-uneti-primary text-white'
                  : 'text-uneti-primary hover:bg-gray-300/60',
              ])}
            >
              <b>{e.title}</b>
            </Link>
          ))}
        </div>

        {stepActive?.children && (
          <>
            <div className="flex justify-between items-center mt-3 md:mt-5">
              {stepActive.children?.map((step, i) => (
                <div
                  key={i}
                  className={`flex items-center ${i != 0 ? 'flex-1' : ''}`}
                >
                  {i != 0 && <div className="h-1 flex-1 bg-gray-200"></div>}
                  <Popper trigger="hover">
                    <PopperTrigger>
                      <Link
                        to={`${stepActive.route}/${step.route}`}
                        className={transformCls([
                          'w-7 h-7 select-none cursor-pointer rounded-full flex items-center justify-center',
                          pathLocation.at(-1) == step.route
                            ? 'bg-uneti-primary text-white'
                            : 'bg-gray-300/60 hover:bg-gray-300 text-uneti-primary',
                        ])}
                      >
                        <b>{i + 1}</b>
                      </Link>
                    </PopperTrigger>
                    <PopperContent>
                      <b className="text-uneti-primary">{step.title}</b>
                    </PopperContent>
                  </Popper>
                </div>
              ))}
            </div>
            <div className="mt-2">
              <h3 className="uppercase font-bold text-uneti-primary">
                {childStepActive.title}
              </h3>

              {childStepActive.ShouldShowStatus && (
                <div className={transformCls(['my-2 flex gap-1 md:gap-2'])}>
                  Trạng thái:{' '}
                  <Skeleton loading={isLoadingThoiGianThucHien} variant="p">
                    {isNil(
                      thoiGianQuyTrinh?.KT_KDCL_CTDT_ThoiGianThucHien_TrangThai,
                    ) ? (
                      stepStatusTextEnum[stepStatusEnum.ChuaThucHien]
                    ) : (
                      <p
                        className={transformCls([
                          thoiGianQuyTrinh?.KT_KDCL_CTDT_ThoiGianThucHien_TrangThai ==
                            stepStatusEnum.KhongPheDuyet &&
                            'bg-red-400 rounded px-1 text-stone-50',
                        ])}
                      >
                        {
                          stepStatusTextEnum[
                            thoiGianQuyTrinh
                              ?.KT_KDCL_CTDT_ThoiGianThucHien_TrangThai
                          ]
                        }
                      </p>
                    )}
                  </Skeleton>
                </div>
              )}

              {childStepActive.ShouldShowTimeline &&
                thoiGianQuyTrinh?.KT_KDCL_CTDT_ThoiGianThucHien_DenNgay && (
                  <div className="flex gap-1 md:gap-2">
                    Deadline:
                    <Skeleton loading={isLoadingThoiGianThucHien} variant="p">
                      <b className="text-red-500">
                        {dayjs(
                          thoiGianQuyTrinh.KT_KDCL_CTDT_ThoiGianThucHien_DenNgay,
                        ).format('DD/MM/YYYY')}
                      </b>
                    </Skeleton>
                  </div>
                )}
            </div>
          </>
        )}
      </div>

      <div className="mt-2 md:mt-3">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </div>
    </HoSoKiemDinhCtx.Provider>
  )
}

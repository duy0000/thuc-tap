import createReport from 'docx-templates'
import {
  convertBufferToBase64,
  dayjs,
  handleDownloadFileBase64,
} from '@/Services/Utils/index.js'
import Button from '@/Components/Base/Button/Button.jsx'
import { useContext, useMemo, useState } from 'react'
import { HoSoKiemDinhCtx } from '@/Services/Tokens/index.js'
import TableTieuChuanHtml from '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/TuDanhGia/Buoc6/ActionExportDocx/TableTieuChuanHtml.js'
import TableThanhVienDoanDanhGiaHtml from './TableThanhVienDoanDanhGiaHtml.js'
import { flatten, values } from 'lodash-unified'
import PhanCongTieuChuanHtml from './PhanCongTieuChuanHtml.js'
import {
  useDanhGiaTieuChiStore,
  usePhanCongThucHienStore,
} from '@/Services/Store/index.js'
import DanhGiaTheoTieuChuanTieuChiHtml from './DanhGiaTheoTieuChuanTieuChiHtml.js'
import Swal from 'sweetalert2'
import BangTongHopKetQuaTuDanhGiaHtml from './BangTongHopKetQuaTuDanhGiaHtml.js'

export default function ActionExportDocx() {
  const hoSoKiemDinh = useContext(HoSoKiemDinhCtx)
  const { listPhanCongThucHienTheoHoiDong } = usePhanCongThucHienStore({
    listTieuChuan: hoSoKiemDinh.listTieuChuan,
    nhomChuyenTrach: hoSoKiemDinh.nhomChuyenTrach,
    hoiDong: hoSoKiemDinh.hoiDong,
  })

  const { listDanhGiaTieuChi } = useDanhGiaTieuChiStore()
  const listDanhGiaTieuChiTrongHoiDong = useMemo(() => {
    if (!hoSoKiemDinh.hoiDong) return []

    return listDanhGiaTieuChi.filter(
      (e) =>
        e.KT_KDCL_CTDT_DanhGiaTieuChi_IDThanhLapHoiDong ===
        hoSoKiemDinh.hoiDong?.KT_KDCL_CTDT_ThanhLapHoiDong_ID,
    )
  }, [listDanhGiaTieuChi, hoSoKiemDinh.hoiDong])

  const [isExporting, setIsExporting] = useState(false)

  const exportDocx = async () => {
    if (isExporting) return
    try {
      setIsExporting(true)
      const template = await fetch(
        ' /doc/mau-bao-cao-chat-luong-kiem-dinh.docx',
      ).then((res) => res.arrayBuffer())

      const report = await createReport({
        template,
        data: {
          ten_nganh_kiem_dinh:
            hoSoKiemDinh.hoSoKiemDinh.KT_KDCL_CTDT_HoSoKiemDinh_TenNganh,
          ma_nganh_kiem_dinh:
            hoSoKiemDinh.hoSoKiemDinh.KT_KDCL_CTDT_HoSoKiemDinh_MaCTDT,
          ten_viet_tat_ctdt:
            hoSoKiemDinh.hoSoKiemDinh.KT_KDCL_CTDT_HoSoKiemDinh_TenNganh.split(
              ' ',
            )
              .map((e) => e[0].toUpperCase())
              .join(''),
          ten_he_dao_tao:
            hoSoKiemDinh.hoSoKiemDinh.KT_KDCL_CTDT_HoSoKiemDinh_TenHeDaoTao.replace(
              'Chương trình đào tạo',
              '',
            ),
          ten_bo_tieu_chuan: hoSoKiemDinh.hoSoKiemDinh.KT_KDCL_BoTieuChuan_Ten,
          ten_khoa_kiem_dinh:
            hoSoKiemDinh.hoSoKiemDinh.KT_KDCL_CTDT_HoSoKiemDinh_TenKhoa,
          nam_kiem_dinh: `tháng ${dayjs().month()} - ${dayjs().year()}`,
          ngay_quyet_dinh_thanh_lap: `ngày ${dayjs(
            hoSoKiemDinh.hoiDong.KT_KDCL_CTDT_ThanhLapHoiDong_NgayThanhLap,
          ).format('DD')} tháng ${dayjs(
            hoSoKiemDinh.hoiDong.KT_KDCL_CTDT_ThanhLapHoiDong_NgayThanhLap,
          ).format('MM')} năm ${dayjs(
            hoSoKiemDinh.hoiDong.KT_KDCL_CTDT_ThanhLapHoiDong_NgayThanhLap,
          ).format('YYYY')}`,
          ngay_hien_hanh: `ngày ${dayjs().format('DD')} tháng ${dayjs().format(
            'MM',
          )} năm ${dayjs().format('YYYY')}`,
          so_quyet_dinh:
            hoSoKiemDinh.hoiDong.KT_KDCL_CTDT_ThanhLapHoiDong_SoQuyetDinh,
          list_tieu_chuan_html: TableTieuChuanHtml(hoSoKiemDinh),
          list_thanh_vien_doan_danh_gia_html:
            TableThanhVienDoanDanhGiaHtml(hoSoKiemDinh),
          danh_gia_tieu_chuan_tieu_chi_html: DanhGiaTheoTieuChuanTieuChiHtml(
            hoSoKiemDinh,
            listDanhGiaTieuChiTrongHoiDong,
          ),
          phan_cong_tieu_chuan_html: PhanCongTieuChuanHtml(
            hoSoKiemDinh,
            listPhanCongThucHienTheoHoiDong,
          ),
          mo_ta_hien_trang_html: '',
          so_luong_tieu_chuan: hoSoKiemDinh.listTieuChuan.length,
          so_luong_tieu_chi: flatten(
            values(hoSoKiemDinh.listTieuChiMappedByTieuChuanID),
          ).length,

          bang_tong_hop_ket_qua_tu_danh_gia_html:
            BangTongHopKetQuaTuDanhGiaHtml(
              hoSoKiemDinh,
              listDanhGiaTieuChiTrongHoiDong,
            ),
        },
        cmdDelimiter: ['{', '}'],
        noSandbox: true,
      })

      await handleDownloadFileBase64(
        'template-file.docx',
        convertBufferToBase64(report),
      )
    } catch (e) {
      console.error(e)
      Swal.fire({
        title: 'Lỗi',
        text: 'Có lỗi xảy ra khi kết xuất báo cáo, vui lòng thử lại sau hoặc liên hệ quản trị viên',
        icon: 'error',
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Button
      isLoading={isExporting}
      disabled={!hoSoKiemDinh.hoiDong}
      onClick={exportDocx}
    >
      Xuất quyển
    </Button>
  )
}

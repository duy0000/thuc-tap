// import { apiSendEmailUNETI } from '@/Apis/Emails/apiEmail.js'
import { postThongBaoCapNhat } from '@/Apis/KDCL/DamBaoChatLuong/apiThongBaoCapNhat'
import { dayjs } from '@/Services/Utils/index.js'

export const guiMailThongBaoCapNhatMinhChung = () =>
  // DataGVXuLy,
  // MinhChungCu,
  // MinhChungMoi,
  // PhanCongThanhVien,
  // IDHoSoKiemDinh,
  // IDTieuChuan,
  // IDTieuChi,
  {
    return
    /**
  apiSendEmailUNETI({
    to: PhanCongThanhVien.KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_EmailUneti,
    subject: `Thông báo cập nhật minh chứng ${MinhChungCu.KT_KDCL_TaiLieu_Ten} (Email tự động, vui lòng không trả lời)`,
    text: null,
    tenfile: null,
    dulieu: null,
    html: `<div>
\t<p>Kính gửi thầy/cô: <b>${PhanCongThanhVien.KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_HoTen}</b>,</p>
</div>
<div>
\t<p>Phòng Khảo thí và đảm bảo chất lượng đã cập nhật minh chứng ${MinhChungCu.KT_KDCL_TaiLieu_Ten}, với thông tin như sau:</p>
</div>
<div>
\t<h4 style="margin-bottom: 0;">A. THÔNG TIN NGƯỜI CẬP NHẬT:</h4>
\t<p style="margin: 0;">1.1. Mã nhân sự: <b>${DataGVXuLy.MaNhanSu}</b></p>
\t<p style="margin: 0;">1.2. Họ và tên: <b>${DataGVXuLy.HoDem} ${DataGVXuLy.Ten}</b></p>
\t<p style="margin: 0;">1.3. Đơn vị quản lý nhân sự: <b>${DataGVXuLy.TenPhongBan}</b></p>
</div>
<div>
\t<h4 style="margin-bottom: 0;">B. NỘI DUNG CẬP NHẬT:</h4>
\t<p style="margin: 4px 0 0;">1. <b>Thông tin cũ</b></p>
\t<p style="margin: 0;">- Mã minh chứng: <b>${MinhChungCu.KT_KDCL_TaiLieu_Ma}</b></p>
\t<p style="margin: 0;">- Tên minh chứng: <b>${MinhChungCu.KT_KDCL_TaiLieu_Ten}</b></p>
\t<p style="margin: 0;">- Số ban hành: <b>${MinhChungCu.KT_KDCL_TaiLieu_SoBanHanh}</b></p>
\t<p style="margin: 0;">- Ngày ban hành: <b>${dayjs(MinhChungCu.KT_KDCL_TaiLieu_NgayBanHanh).format('DD/MM/YYYY')}</b></p>
\t<p style="margin: 0;">- Nơi ban hành: <b>${MinhChungCu.KT_KDCL_TaiLieu_NoiBanHanh}</b></p>
\t<p style="margin: 0;">- Trích yếu: <b>${MinhChungCu.KT_KDCL_TaiLieu_TrichYeu}</b></p>
\t<p style="margin: 0;">- File đính kèm: <b>${MinhChungCu.KT_KDCL_TaiLieu_TenFile}</b></p>

\t<p style="margin: 4px 0 0;">2. <b>Thông tin mới</b></p>
\t<p style="margin: 0;">- Mã minh chứng: <b>${MinhChungMoi.KT_KDCL_TaiLieu_Ma}</b></p>
\t<p style="margin: 0;">- Tên minh chứng: <b>${MinhChungMoi.KT_KDCL_TaiLieu_Ten}</b></p>
\t<p style="margin: 0;">- Số ban hành: <b>${MinhChungMoi.KT_KDCL_TaiLieu_SoBanHanh}</b></p>
\t<p style="margin: 0;">- Ngày ban hành: <b>${dayjs(MinhChungMoi.KT_KDCL_TaiLieu_NgayBanHanh).format('DD/MM/YYYY')}</b></p>
\t<p style="margin: 0;">- Nơi ban hành: <b>${MinhChungMoi.KT_KDCL_TaiLieu_NoiBanHanh}</b></p>
\t<p style="margin: 0;">- Trích yếu: <b>${MinhChungMoi.KT_KDCL_TaiLieu_TrichYeu}</b></p>
\t<p style="margin: 0;">- File đính kèm: <b>${MinhChungMoi.KT_KDCL_TaiLieu_TenFile}</b></p>

\t<p style="margin: 4px 0 0;">3. Chi tiết xem <a href="${window.location.origin}/dam-bao-chat-luong/chat-luong-ctdt/${IDHoSoKiemDinh}/tu-danh-gia/buoc-4?q=gan-minh-chung.${IDTieuChuan}.${IDTieuChi}&MC=${MinhChungMoi.KT_KDCL_TaiLieu_ID}">tại đây!</a></p>
\t<p style="margin: 0;"></p>
\t<p style="margin: 0;"></p>
\t<p style="margin: 0;"></p>
\t<p style="margin: 0;"></p>
</div>
<div>
\t<p>Thân chào!</p>
</div>
<div>
\t<h4 style="margin-bottom: 0;">LƯU Ý:</h4>
\t<p style="margin: 0;">- Đây là email tự động, vui lòng không trả lời (no reply), chúng tôi sẽ không nhận được email của Thầy/Cô,</p>
\t<p style="margin: 0;">- Nếu cần tư vấn hoặc giải đáp thắc mắc về NỘI DUNG GIẢI QUYẾT ĐỀ NGHỊ. Thầy/Cô vui lòng liên hệ (trong giờ hành chính) với nhân sự sau:</p>
\t<p style="margin: 0;">&emsp;+ Họ và tên: ${DataGVXuLy.HoDem} ${DataGVXuLy.Ten}</p>
\t<p style="margin: 0;">&emsp;+ Điện thoại: ${DataGVXuLy.SoDienThoai}</p>
\t<p style="margin: 0;">&emsp;+ Email: ${DataGVXuLy.EmailUneti}</p>
</div>`,
  }) */
  }

export const guiMailThongBaoMinhChungPheDuyet = () => {}

export const guiThongBaoUngDung = (
  DataGVXuLy,
  MinhChungCu,
  MinhChungMoi,
  PhanCongThanhVien,
  IDHoSoKiemDinh,
  IDQuyTrinhCha,
  IDQuyTrinhCon,
  TenBang,
  IDTieuChuan,
  IDTieuChi,
) => {
  postThongBaoCapNhat({
    MC_TrangThai_YeuCau_SinhVien_IDBang: MinhChungMoi.KT_KDCL_TaiLieu_ID,
    MC_TrangThai_YeuCau_SinhVien_IDSinhVien: DataGVXuLy.IDNhanSu,
    MC_TrangThai_YeuCau_SinhVien_MaSinhVien: DataGVXuLy.MaNhanSu,
    MC_TrangThai_YeuCau_SinhVien_TenBang: TenBang,
    MC_TrangThai_YeuCau_SinhVien_NhomThongBao: 'Module_KiemDinhChatLuong',
    MC_TrangThai_YeuCau_SinhVien_NhomYeuCau: '',
    MC_TrangThai_YeuCau_SinhVien_TenYeuCau: '',
    MC_TrangThai_YeuCau_SinhVien_Cap1: `${IDHoSoKiemDinh}`,
    MC_TrangThai_YeuCau_SinhVien_Cap2: `${IDQuyTrinhCha}`,
    MC_TrangThai_YeuCau_SinhVien_Cap3: `${IDQuyTrinhCon}` ?? '',
    MC_TrangThai_YeuCau_SinhVien_Cap4: `${PhanCongThanhVien.KT_KDCL_CTDT_PhanCongThucHien_ThanhVien_ID}`, // ID thanh vien duoc phan cong
    MC_TrangThai_YeuCau_SinhVien_NgayGui: dayjs().format('YYYY-MM-DD'),
    MC_TrangThai_YeuCau_SinhVien_TuNgay: dayjs().format('YYYY-MM-DD'),
    MC_TrangThai_YeuCau_SinhVien_DenNgay: dayjs().format('YYYY-MM-DD'),
    MC_TrangThai_YeuCau_SinhVien_IsGiangVien: true,
    MC_TrangThai_YeuCau_SinhVien_TrangThai: '',
    MC_TrangThai_YeuCau_SinhVien_JSON_DATA: JSON.stringify({
      NoiDung: `${DataGVXuLy.HoDem} ${DataGVXuLy.Ten} đã cập nhật minh chứng ${MinhChungMoi.KT_KDCL_TaiLieu_Ten}`,
      NoiDung_Cu: MinhChungCu,
      NoiDung_ThayDoi: MinhChungMoi,
      Url: `/dam-bao-chat-luong/chat-luong-ctdt/${IDHoSoKiemDinh}/tu-danh-gia/buoc-4?q=gan-minh-chung.${IDTieuChuan}.${IDTieuChi}&MC=${MinhChungMoi.KT_KDCL_TaiLieu_ID}`,
    }),
  })
}

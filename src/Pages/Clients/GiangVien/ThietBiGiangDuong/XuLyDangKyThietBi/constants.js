import { apiSendEmailUNETI } from '@/Apis/Emails/apiEmail'
import { dayjs } from '@/Services/Utils/dayjs'

export const home = {
  path: '/ho-tro-thiet-bi-giang-duong',
  title: 'Hỗ trợ thiết bị giảng đường',
}

export const breadcrumbs = [
  {
    path: '/ho-tro-thiet-bi-giang-duong/xu-ly-dang-ky-thiet-bi',
    title: 'Xử lý đăng ký thiết bị',
  },
]

export const sendEmail_HTTBGD_XuLyDangKyThietBi = async ({
  mnsNguoiDK,
  hoVaTenNguoiDK,
  dvNguoiDK,
  emailNguoiDK,
  thongTinDangKy,
  dataNguoiXuLy,
  noiDungXuLy,
}) => {
  let subjectEmail = `Thông báo xác nhận đăng ký sử dụng thiết bị theo thông tin đăng ký (Email tự động, vui lòng không trả lời)`

  let _listNoiDungDangKy = thongTinDangKy
    .map((item, index) => {
      return `
      <div style="margin: 0;">
        <p style="margin: 0;">Thiết bị ${index + 1}: ${item.DT_CVNB_TBGD_GuiYeuCau_TenTaiSan}</p>
        <p style="margin: 0;">&emsp;&emsp;Số lượng: ${item.DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_SoLuong}</p>
        <p style="margin: 0;">&emsp;&emsp;Lịch dạy: Ngày ${item.DT_CVNB_TBGD_GuiYeuCau_NgayDay ? dayjs(item.DT_CVNB_TBGD_GuiYeuCau_NgayDay).format('DD/MM/YYYY') : ''}, từ tiết ${item.DT_CVNB_TBGD_GuiYeuCau_TuTiet} đến tiết ${item.DT_CVNB_TBGD_GuiYeuCau_DenTiet} tại ${item.DT_CVNB_TBGD_GuiYeuCau_TenPhong}</p>
      </div>
    `
    })
    .join('')

  let emailHtml = `
        <div>
            <p>Kính gửi Thầy/Cô ${hoVaTenNguoiDK},</p>
        </div>
        <div>
            <p>Tôi đã xem xét yêu cầu đăng ký sử dụng thiết bị của quý Thầy/Cô, với thông tin như sau:</p>
        </div>
        <div>
            <h4 style="margin-bottom: 0;">A. THÔNG TIN ĐĂNG KÝ:</h4>
            <p style="margin: 0;"><b>1. Người đăng ký:</b></p>
            <p style="margin: 0;">&emsp;&emsp;1.1. Mã nhân sự: <b>${mnsNguoiDK}</b></p>
            <p style="margin: 0;">&emsp;&emsp;1.2. Họ và tên: <b>${hoVaTenNguoiDK}</b></p>
            <p style="margin: 0;">&emsp;&emsp;1.3. Đơn vị quản lý nhân sự: <b>${dvNguoiDK}</b></p>

            <p style="margin-bottom: 0;"><b>2. Nội dung đăng ký:</b></p>
            ${_listNoiDungDangKy}
        </div>
        <div>
            <h4 style="margin-bottom: 0;">B. THÔNG TIN XỬ LÝ:</h4>
            <p style="margin: 0;"><b>1. Người xử lý:</b></p>
            <p style="margin: 0;">&emsp;&emsp;1.1. Mã nhân sự: <b>${dataNguoiXuLy?.MaNhanSu}</b></p>
            <p style="margin: 0;">&emsp;&emsp;1.2. Họ và tên: <b>${dataNguoiXuLy?.HoDem + ' ' + dataNguoiXuLy?.Ten}</b></p>
            <p style="margin: 0;">&emsp;&emsp;1.3. Đơn vị quản lý nhân sự: <b>${dataNguoiXuLy?.TenPhongBan}</b></p>

            
            ${
              noiDungXuLy
                ? `
              <p style="margin-bottom: 0;"><b>2. Nội dung xác nhận:</b></p>
              <p style="margin: 0;">&emsp;&emsp;${noiDungXuLy}<p>
              `
                : ''
            }
        </div>
        <div>
            <p>Trân trọng!</p>
        </div>
        <div>
            <h4 style="margin-bottom: 0;">LƯU Ý:</h4>
            <p style="margin: 0;">- Đây là email tự động, vui lòng không trả lời (no reply), chúng tôi sẽ không nhận được email của Thầy/Cô,</p>
            <p style="margin: 0;">- Nếu cần hỗ trợ gấp, Thầy/Cô vui lòng liên hệ (trong giờ hành chính) với nhân sự sau:</p>
            <p style="margin: 0;">&emsp;+ Họ và tên: ${
              dataNguoiXuLy?.HoDem + ' ' + dataNguoiXuLy?.Ten
            }</p>
            <p style="margin: 0;">&emsp;+ Điện thoại: ${dataNguoiXuLy?.SoDienThoai}</p>
            <p style="margin: 0;">&emsp;+ Email: ${dataNguoiXuLy?.EmailUneti}</p>
        </div>
    `

  const dataSendEmail = {
    to: emailNguoiDK,
    subject: subjectEmail,
    text: '',
    tenfile: null,
    dulieu: null,
    html: emailHtml,
  }
  const res = await apiSendEmailUNETI(dataSendEmail)
  return res
}

export const sendEmail_HTTBGD_HuyTraDangKyThietBi = async ({
  mnsNguoiDK,
  hoVaTenNguoiDK,
  dvNguoiDK,
  emailNguoiDK,
  thongTinDangKy,
  dataNguoiXuLy,
  noiDungXuLy,
}) => {
  let subjectEmail = `Thông báo hủy trả đăng ký sử dụng thiết bị theo thông tin đăng ký (Email tự động, vui lòng không trả lời)`

  let _listNoiDungDangKy = thongTinDangKy
    .map((item, index) => {
      return `
      <div style="margin: 0;">
        <p style="margin: 0;">Thiết bị ${index + 1}: ${item.DT_CVNB_TBGD_GuiYeuCau_TenTaiSan}</p>
        <p style="margin: 0;">&emsp;&emsp;Số lượng: ${item.DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_SoLuong}</p>
        <p style="margin: 0;">&emsp;&emsp;Lịch dạy: Ngày ${item.DT_CVNB_TBGD_GuiYeuCau_NgayDay ? dayjs(item.DT_CVNB_TBGD_GuiYeuCau_NgayDay).format('DD/MM/YYYY') : ''}, từ tiết ${item.DT_CVNB_TBGD_GuiYeuCau_TuTiet} đến tiết ${item.DT_CVNB_TBGD_GuiYeuCau_DenTiet} tại ${item.DT_CVNB_TBGD_GuiYeuCau_TenPhong}</p>
      </div>
    `
    })
    .join('')

  let emailHtml = `
        <div>
            <p>Kính gửi Thầy/Cô ${hoVaTenNguoiDK},</p>
        </div>
        <div>
            <p>Tôi đã xem xét yêu cầu đăng ký sử dụng thiết bị của quý Thầy/Cô, với thông tin như sau:</p>
        </div>
        <div>
            <h4 style="margin-bottom: 0;">A. THÔNG TIN ĐĂNG KÝ:</h4>
            <p style="margin: 0;"><b>1. Người đăng ký:</b></p>
            <p style="margin: 0;">&emsp;&emsp;1.1. Mã nhân sự: <b>${mnsNguoiDK}</b></p>
            <p style="margin: 0;">&emsp;&emsp;1.2. Họ và tên: <b>${hoVaTenNguoiDK}</b></p>
            <p style="margin: 0;">&emsp;&emsp;1.3. Đơn vị quản lý nhân sự: <b>${dvNguoiDK}</b></p>

            <p style="margin-bottom: 0;"><b>2. Nội dung đăng ký:</b></p>
            ${_listNoiDungDangKy}
        </div>
        <div>
            <h4 style="margin-bottom: 0;">B. THÔNG TIN XỬ LÝ:</h4>
            <p style="margin: 0;"><b>1. Người xử lý:</b></p>
            <p style="margin: 0;">&emsp;&emsp;1.1. Mã nhân sự: <b>${dataNguoiXuLy?.MaNhanSu}</b></p>
            <p style="margin: 0;">&emsp;&emsp;1.2. Họ và tên: <b>${dataNguoiXuLy?.HoDem + ' ' + dataNguoiXuLy?.Ten}</b></p>
            <p style="margin: 0;">&emsp;&emsp;1.3. Đơn vị quản lý nhân sự: <b>${dataNguoiXuLy?.TenPhongBan}</b></p>

            
            ${
              noiDungXuLy
                ? `
              <p style="margin-bottom: 0;"><b>2. Nội dung hủy trả:</b></p>
              <p style="margin: 0;">&emsp;&emsp;${noiDungXuLy}<p>
              `
                : ''
            }
        </div>
        <div>
            <p>Trân trọng!</p>
        </div>
        <div>
            <h4 style="margin-bottom: 0;">LƯU Ý:</h4>
            <p style="margin: 0;">- Đây là email tự động, vui lòng không trả lời (no reply), chúng tôi sẽ không nhận được email của Thầy/Cô,</p>
            <p style="margin: 0;">- Nếu cần hỗ trợ gấp, Thầy/Cô vui lòng liên hệ (trong giờ hành chính) với nhân sự sau:</p>
            <p style="margin: 0;">&emsp;+ Họ và tên: ${
              dataNguoiXuLy?.HoDem + ' ' + dataNguoiXuLy?.Ten
            }</p>
            <p style="margin: 0;">&emsp;+ Điện thoại: ${dataNguoiXuLy?.SoDienThoai}</p>
            <p style="margin: 0;">&emsp;+ Email: ${dataNguoiXuLy?.EmailUneti}</p>
        </div>
    `

  const dataSendEmail = {
    to: emailNguoiDK,
    subject: subjectEmail,
    text: '',
    tenfile: null,
    dulieu: null,
    html: emailHtml,
  }
  const res = await apiSendEmailUNETI(dataSendEmail)
  return res
}

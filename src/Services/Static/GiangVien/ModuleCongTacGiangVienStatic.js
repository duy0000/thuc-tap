// thumbnails
import iconCTGVTraCuu from '@/assets/Icons/GiangVien/ModuleCongTacGiangVien/iconCTGVTraCuu.png'
import iconCTGVTraCuu_NhanSu from '@/assets/Icons/GiangVien/ModuleCongTacGiangVien/iconCTGVTraCuu_NhanSu.png'
import iconCTGVTraCuu_LopHPGV from '@/assets/Icons/GiangVien/ModuleCongTacGiangVien/iconCTGVTraCuu_LopHPGV.png'
import iconCTGVTraCuu_KLCoiChamThi from '@/assets/Icons/GiangVien/ModuleCongTacGiangVien/iconCTGVTraCuu_KLCoiChamThi.png'
import iconCTGVTraCuu_KhoiLuongBu from '@/assets/Icons/GiangVien/ModuleCongTacGiangVien/iconCTGVTraCuu_KhoiLuongBu.png'
import iconCTGVTraCuu_TongHopThanhToan from '@/assets/Icons/GiangVien/ModuleCongTacGiangVien/iconCTGVTraCuu_TongHopThanhToan.png'
import iconCTGVTraCuu_TongHopKhoiLuong from '@/assets/Icons/GiangVien/ModuleCongTacGiangVien/iconCTGVTraCuu_TongHopKhoiLuong.png'
import iconCTGVTraCuu_ThanhToanHDNgoai from '@/assets/Icons/GiangVien/ModuleCongTacGiangVien/iconCTGVTraCuu_ThanhToanHDNgoai.png'
import { ROLES } from '@/Routers/constants'

const homeCongTacGiangVien = [
  {
    id: 1,
    title: 'Tra cứu',
    desc: 'Tra cứu các thông tin: Nhân sự, Lớp học phần giảng viên, Khối lượng coi chấm thi, Khối lượng bù, Tổng hợp khối lượng, Tổng hợp thanh toán, Thanh toán hợp đồng ngoài.',
    path: '/tra-cuu',
    thumbnail: iconCTGVTraCuu,
    roleActive: [ROLES.G0101],
    moduleActive: true,
  },
  {
    id: 2,
    title: 'Công Tác Giảng Dạy',
    desc: 'Tra cứu các thông tin: Nhân sự, Lớp học phần giảng viên, Khối lượng coi chấm thi, Khối lượng bù, Tổng hợp khối lượng, Tổng hợp thanh toán, Thanh toán hợp đồng ngoài.',
    path: '/cong-tac-giang-day',
    thumbnail: iconCTGVTraCuu,
    roleActive: [ROLES.G0101],
    moduleActive: true,
  },
]

const homeCTGV_TraCuu = [
  {
    id: 1,
    title: 'Nhân sự',
    desc: 'Tra cứu các thông tin nhân sự',
    path: '/nhan-su',
    thumbnail: iconCTGVTraCuu_NhanSu,
    roleActive: [ROLES.G0101],
    moduleActive: true,
  },
  {
    id: 2,
    title: 'Lớp học phần giảng viên',
    desc: 'Tra cứu các thông tin Lớp học phần giảng viên.',
    path: '/lop-hoc-phan-giang-vien',
    thumbnail: iconCTGVTraCuu_LopHPGV,
    roleActive: [ROLES.G0101],
    moduleActive: true,
  },
  {
    id: 3,
    title: 'Khối lượng coi chấm thi',
    desc: 'Tra cứu các thông tin Khối lượng coi chấm thi.',
    path: '/khoi-luong-coi-cham-thi',
    thumbnail: iconCTGVTraCuu_KLCoiChamThi,
    roleActive: [ROLES.G0101],
    moduleActive: true,
  },
  {
    id: 4,
    title: 'Khối lượng bù',
    desc: 'Tra cứu các thông tin Khối lượng bù.',
    path: '/khoi-luong-bu',
    thumbnail: iconCTGVTraCuu_KhoiLuongBu,
    roleActive: [ROLES.G0101],
    moduleActive: true,
  },
  {
    id: 5,
    title: 'Tổng hợp khối lượng',
    desc: 'Tra cứu các thông tin Tổng hợp khối lượng.',
    path: '/tong-hop-khoi-luong',
    thumbnail: iconCTGVTraCuu_TongHopKhoiLuong,
    roleActive: [ROLES.G0101],
    moduleActive: true,
  },
  {
    id: 6,
    title: 'Tổng hợp thanh toán',
    desc: 'Tra cứu các thông tin Tổng hợp thanh toán.',
    path: '/tong-hop-thanh-toan',
    thumbnail: iconCTGVTraCuu_TongHopThanhToan,
    roleActive: [ROLES.G0101],
    moduleActive: true,
  },
  {
    id: 7,
    title: 'Thanh toán hợp đồng ngoài',
    desc: 'Tra cứu các thông tin Thanh toán hợp đồng ngoài.',
    path: '/thanh-toan-hop-dong-ngoai',
    thumbnail: iconCTGVTraCuu_ThanhToanHDNgoai,
    roleActive: [ROLES.G0101],
    moduleActive: true,
  },
]

const homeCTGV_CongTacGiangDay = [
  {
    id: 1,
    title: 'Lịch Theo Tiến Độ',
    desc: 'Tra cứu các thông tin nhân sự',
    path: '/lich-theo-tien-do',
    thumbnail: iconCTGVTraCuu_NhanSu,
    roleActive: [ROLES.G0101],
    moduleActive: true,
  },
  {
    id: 2,
    title: 'Điểm danh hằng ngày',
    desc: 'Điểm danh sĩ số sinh viên từng lớp.',
    path: '/diem-danh-hang-ngay',
    thumbnail: iconCTGVTraCuu_LopHPGV,
    roleActive: [ROLES.G0101],
    moduleActive: true,
  },
  {
    id: 3,
    title: 'Nhập điểm thường kỳ',
    desc: 'Nhập điểm đầy đủ học tập các sinh viên.',
    path: '/nhap-diem-thuong-ky',
    thumbnail: iconCTGVTraCuu_NhanSu,
    roleActive: [ROLES.G0101],
    moduleActive: true,
  },
]

export default {
  homeCongTacGiangVien,
  homeCTGV_TraCuu,
  homeCTGV_CongTacGiangDay,
}

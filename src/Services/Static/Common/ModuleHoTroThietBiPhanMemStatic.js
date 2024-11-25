// icons - homeTaiSan
import imgUneti from '@/assets/Images/Logo_Uneti_04_01.png'
import icoTeamView from '@/assets/Icons/icoTeamviewer.png'
import icoUltraView from '@/assets/Icons/icoUltraview.png'
import icoZalo from '@/assets/Icons/icoZalo.png'
import icoTraCuuTS from '@/assets/Icons/icoTraCuuTS.png'
import iconHTTBGDBaoHong from '@/assets/Icons/icoHTTBGDBaoHong.png'
import iconHTTBGDXuLySuCo from '@/assets/Icons/icoHTTBGDXuLySuCo.png'
import iconHTTBGDGopY from '@/assets/Icons/icoHTTBGDGopY.png'

import { ROLES } from '@/Routers/constants'

const homeHoTroThietBiPhanMem = {
  listFeatures: [
    {
      id: 1,
      title: 'Báo hỏng',
      name: 'Báo hỏng',
      path: '/bao-hong-tai-san',
      desc: '<b>Báo hỏng</b>: Các thiết bị đang sử dụng, đang quản lý.',
      thumbnail: iconHTTBGDBaoHong,
      roleActive: [ROLES.A0000, ROLES.G0101, ROLES.CBNV0],
      moduleActive: true,
    },
    {
      id: 2,
      title: 'Tra cứu',
      name: 'Tra cứu',
      path: '/tra-cuu-tai-san',
      desc: '<b>Tra cứu</b>: Thông tin tài sản, thông tin nhóm thiết bị đi kèm, nhân sự quản lý, nhân sự sử dụng.',
      thumbnail: icoTraCuuTS,
      roleActive: [ROLES.A0000, ROLES.G0101, ROLES.CBNV0],
      moduleActive: true,
    },
    {
      id: 3,
      title: 'Sửa chữa',
      name: 'Sửa chữa',
      path: '/sua-chua-tai-san',
      desc: '<b>Sửa chữa</b>: Những thiết bị, tài sản được báo hỏng.',
      thumbnail: iconHTTBGDXuLySuCo,
      roleActive: [ROLES.A0000, ROLES.G0101, ROLES.CBNV0],
      moduleActive: true,
    },
    {
      id: 4,
      title: 'Cập nhật thông tin',
      name: 'Cập nhật thông tin',
      path: '/cap-nhat-tai-san',
      desc: '<b>Cập nhật</b>: Thông tin tài sản, thông tin nhóm thiết bị đi kèm, nhân sự quản lý, nhân sự sử dụng.',
      thumbnail: iconHTTBGDGopY,
      roleActive: [ROLES.A0000, ROLES.G0101, ROLES.CBNV0],
      moduleActive: false,
    },
  ],
  listCanBoHoTro: [
    {
      id: 1,
      name: 'Tống Bá Quang Anh',
      position: 'KT',
      phone: '0334350166',
    },
    {
      id: 2,
      name: 'Nguyễn Mạnh Quân',
      position: 'KT',
      phone: '0334350166',
    },

    {
      id: 3,
      name: 'Nguyễn Thành Trung',
      position: 'KT',
      phone: '0334350166',
    },

    {
      id: 4,
      name: 'Ngô Mạnh Cường',
      phone: '0334350166',
      position: 'QTM',
      phone: '0334350166',
    },

    {
      id: 5,
      name: 'Tô Thành Công',
      position: 'QTM',
      phone: '0334350166',
    },
    {
      id: 6,
      name: 'Hà Đăng Huy',
      position: 'KT',
      phone: '0334350166',
    },
    {
      id: 7,
      name: 'Vũ Xuân Tuấn',
      position: 'STU',
      phone: '0334350166',
    },
  ],
  listHotlines: [
    {
      id: 1,
      name: 'Cơ sở Hà Nội',
      user: 'Phí Thị Kiều Liên',
      phone: '0985408866',
      logo: imgUneti,
    },
    {
      id: 2,
      name: 'Cơ sở Nam Định',
      user: 'Phí Thị Kiều Liên',
      phone: '0985408866',
      logo: imgUneti,
    },
  ],
  listAppSupport: [
    {
      id: 1,
      name: 'Teamviewer',
      logo: icoTeamView,
      link: 'https://dl.teamviewer.com/download/TeamViewerQS_x64.exe?ref=https%3A%2F%2Fwww.teamviewer.com%2Fvi%2Fsolutions%2Fuse-cases%2Fquicksupport%2F',
    },
    {
      id: 2,
      name: 'Ultraview',
      logo: icoUltraView,
      link: 'https://dl2.ultraviewer.net/UltraViewer_setup_6.6_vi.exe',
    },
    {
      id: 3,
      name: 'Zalo App',
      logo: icoZalo,
      link: 'https://zalo.me/pc',
    },
  ],
}

export default homeHoTroThietBiPhanMem

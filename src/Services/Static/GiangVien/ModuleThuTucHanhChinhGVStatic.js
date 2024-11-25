// icons - thumbnails Module TTHCGV
import icoTTHCGVHome from '@/assets/Icons/icoHome.png'
import icoTTHCGVAssociation from '@/assets/Icons/icoAssociation.png'
import icoTTHCGVProcessing from '@/assets/Icons/icoProcessing.png'
import { ROLES } from '@/Routers/constants'

const homeTTHCGV = [
  {
    id: 1,
    title: 'Trang chủ',
    name: 'Trang chủ',
    path: '/tthc-giang-vien',
    moduleActive: true,
    thumbnail: icoTTHCGVHome,
    roleActive: [ROLES.A0000, ROLES.G0101, ROLES.CBNV0],
  },
  {
    id: 2,
    title: 'Xử lý nghiệp vụ',
    name: 'Xử lý nghiệp vụ',
    path: '/admin/xu-ly-nghiep-vu',
    moduleActive: true,
    thumbnail: icoTTHCGVProcessing,
    roleActive: [ROLES.CBNV0],
  },
  {
    id: 3,
    title: 'Quản trị đơn vị',
    name: 'Quản trị đơn vị',
    path: '/admin/quan-tri-TTHCGV',
    moduleActive: true,
    thumbnail: icoTTHCGVAssociation,
    roleActive: [ROLES.A0000],
  },
]

export default homeTTHCGV

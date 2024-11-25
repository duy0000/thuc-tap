import clsx from 'clsx'
import { FaUsersCog } from 'react-icons/fa'
import { FaUserGraduate } from 'react-icons/fa6'
import { MdAdminPanelSettings } from 'react-icons/md'
import { IoSettingsSharp } from 'react-icons/io5'
import { IoNewspaperOutline } from 'react-icons/io5'
import { RxDotFilled } from 'react-icons/rx'
import RenderMenuAdminNested from './RenderMenuAdminNested'

const menuAside = [
  {
    label: 'Dashboard',
    icon: <MdAdminPanelSettings size={16} />,
    path: '',
  },
  {
    label: 'Thủ tục hành chính sinh viên',
    icon: <FaUserGraduate size={16} />,
    path: 'thu-tuc-hanh-chinh-sinh-vien',
  },
  {
    label: 'Cán bộ, Giảng viên',
    icon: <FaUsersCog size={16} />,
    children: [
      {
        label: 'TTHC giảng viên',
        icon: <RxDotFilled size={16} />,
        path: 'thu-tuc-hanh-chinh-giang-vien',
      },
      {
        label: 'Thiêt bị giảng đường',
        icon: <RxDotFilled size={16} />,
        path: 'thiet-bi-giang-duong',
      },
      {
        label: 'Công tác giảng viên',
        icon: <RxDotFilled size={16} />,
        path: 'cong-tac-giang-vien',
      },
    ],
  },
  {
    label: 'Quản trị hệ thống',
    icon: <IoSettingsSharp size={16} />,
    children: [
      {
        label: 'Quản trị tin tức',
        icon: <IoNewspaperOutline size={16} />,
        path: 'quan-tri-tin-tuc',
      },
    ],
  },
]

export default function SidebarAdmin() {
  return (
    <aside
      className={clsx(
        'fixed inset-y-0 left-0 top-[70px] bottom-[285px] z-[2] w-60 hidden flex-col border-r rounded-tr-lg rounded-br-lg bg-white sm:flex shadow',
      )}
    >
      <h1 className="text-center pt-4 pb-2 font-bold bg-sky-800 text-white rounded-tr-lg">
        Trường Đại học Kinh tế - Kỹ thuật Công nghiệp
      </h1>
      <ul className="overflow-y-auto">
        <RenderMenuAdminNested menu={menuAside} />
      </ul>
    </aside>
  )
}

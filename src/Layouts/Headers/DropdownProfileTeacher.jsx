import PropTypes from 'prop-types'
import { MdLogout, MdNotificationImportant } from 'react-icons/md'
import { LuShieldCheck } from 'react-icons/lu'
import DropdownProfileItem from './DropdownProfileItem'
import { useLocation } from 'react-router-dom'
import { homeHTTBGD, homeTTHCGV } from '@/Services/Static/GiangVien'
import { homeHoTroThietBiPhanMem } from '@/Services/Static/Common'
import { useEffect, useState } from 'react'

function DropdownProfileTeacher(props) {
  const { handleLogout } = props
  const { pathname } = useLocation()

  const [moduleItems, setModuleItems] = useState([])

  useEffect(() => {
    setModuleItems([])
    if (pathname.includes('ho-tro-thiet-bi-giang-duong'))
      setModuleItems(
        homeHTTBGD.map((e) => ({
          ...e,
          path: `ho-tro-thiet-bi-giang-duong${e.path}`,
        })),
      )
    if (pathname.includes('ho-tro-thiet-bi-phan-mem'))
      setModuleItems(
        homeHoTroThietBiPhanMem.listFeatures.map((e) => ({
          ...e,
          path: `ho-tro-thiet-bi-phan-mem${e.path}`,
        })),
      )
    if (
      pathname.includes('tthc-giang-vien') ||
      pathname.includes('admin/xu-ly-nghiep-vu') ||
      pathname.includes('admin/quan-tri-TTHCGV')
    )
      setModuleItems(homeTTHCGV.map((e) => ({ ...e, path: `${e.path}` })))
  }, [pathname])
  return (
    <>
      {moduleItems.length > 0 && (
        <div className="p-3">
          {moduleItems.map(
            (item, index) =>
              item.moduleActive && (
                <DropdownProfileItem
                  key={index}
                  to={item.path}
                  icon={
                    <img height="20" width="20" src={item.thumbnail} /> ||
                    item.ico
                  }
                  text={item.title}
                />
              ),
          )}
        </div>
      )}

      <div className="p-3" aria-labelledby="user-menu-button">
        <DropdownProfileItem
          to="tthc-giang-vien/theo-doi-quy-trinh"
          icon={<MdNotificationImportant className="text-xl" />}
          text="Theo dõi đề nghị"
        />
        <DropdownProfileItem
          to="chinh-sach-bao-mat"
          icon={<LuShieldCheck className="text-xl" />}
          text="Chính sách bảo mật"
        />
        <DropdownProfileItem
          onClick={handleLogout}
          icon={<MdLogout className="text-xl" />}
          text="Đăng xuất"
        />
      </div>
    </>
  )
}

DropdownProfileTeacher.propTypes = {
  handleLogout: PropTypes.func.isRequired,
}

export default DropdownProfileTeacher

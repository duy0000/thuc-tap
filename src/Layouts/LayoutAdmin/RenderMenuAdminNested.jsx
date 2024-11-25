import clsx from 'clsx'
import { useState } from 'react'
import { FaAngleRight } from 'react-icons/fa6'
import { Link, useLocation } from 'react-router-dom'

export default function RenderMenuAdminNested({ menu = [] }) {
  const [activeMenuIndex, setActiveMenuIndex] = useState(null)
  const [activePath, setActivePath] = useState('')
  const location = useLocation()

  const handleActive = (path, index) => {
    setActivePath(path || location.pathname) // Nếu path là '', lấy location.pathname làm activePath
    setActiveMenuIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  if (!Array.isArray(menu) || menu.length === 0) return null

  return menu.map((item, index) => {
    const isActive = index === activeMenuIndex
    const isPathActive = activePath === item.path && item.path !== '' // Chỉ active nếu path không phải là chuỗi rỗng

    return (
      <div key={index} className="w-full">
        {Array.isArray(item.children) && item.children.length > 0 ? (
          <div
            onClick={() => handleActive(item.path, index)}
            className={clsx(
              'p-3 flex items-center justify-between cursor-pointer hover:bg-sky-700 hover:text-white',
              isPathActive && 'bg-sky-700 text-white', // Active chỉ khi path không rỗng
            )}
          >
            <p className="flex items-center gap-x-1">
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </p>
            {item.children && item.children.length > 0 && (
              <FaAngleRight
                className={
                  isActive
                    ? 'animate__animated rotate-90 transition ease-in-out'
                    : ''
                }
              />
            )}
          </div>
        ) : (
          <Link
            onClick={() => handleActive(item.path, index)}
            to={item.path}
            className={clsx(
              'p-3 flex items-center hover:bg-sky-700 hover:text-white',
              (isPathActive || isActive) && 'bg-sky-700 text-white',
            )}
          >
            <span className="flex items-center gap-x-1">
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </span>
          </Link>
        )}
        <div className="ml-6">
          {isActive && item.children && item.children.length > 0 && (
            <RenderMenuAdminNested menu={item.children} />
          )}
        </div>
      </div>
    )
  })
}

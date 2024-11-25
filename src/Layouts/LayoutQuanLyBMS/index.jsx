import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { pathModuleBoDieuKhienBMS } from '@/Services/Static/PathStatic'
import { useNamespace } from '@/Services/Hooks'
import SidebarBMS from './SidebarBMS'
import './LayoutQuanLyBMS.scss'
function LayoutQuanLyBMS() {
  const bem = useNamespace('main')
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <>
      <section className={bem.b()}>
        <SidebarBMS
          category={pathModuleBoDieuKhienBMS}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
        {/* END: .sidebar */}
        <div className={bem.e('content')}>
          <Outlet />
        </div>
      </section>
      <button
        className={bem.e('toggle-sidebar')}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <svg
          className={`${bem.is('active', !showSidebar)} ${bem.e('show')}`}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 7H21"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M9.48999 12H21"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M3 12H5.99"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M3 17H21"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>

        <svg
          className={`${bem.is('active', showSidebar)} ${bem.e('close')}`}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 18V6"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 12H18"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 12H11.66"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 18V6"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  )
}

export default LayoutQuanLyBMS

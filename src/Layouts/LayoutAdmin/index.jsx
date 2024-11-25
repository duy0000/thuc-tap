import clsx from 'clsx'
import { Outlet } from 'react-router-dom'
import SidebarAdmin from './SidebarAdmin'

export default function LayoutAdmin() {
  return (
    <section>
      <SidebarAdmin />
      <div className={clsx('-mt-14 min-h-[555px] sm:ml-56')}>
        <Outlet />
      </div>
    </section>
  )
}

import {
  homeHTTBGD,
  homeMain,
  homeOnLuyen,
  homeTTHCGV,
} from '@/Services/Static/dataStatic'

import { homeMotCua, homeHocTap, homeTraCuu } from '@/Services/Static/SinhVien'
import homeHoTroThietBiPhanMem from '@/Services/Static/Common/ModuleHoTroThietBiPhanMemStatic'

import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

const CheckActiveModuleMiddleware = () => {
  const { pathname } = useLocation()

  let listModuleActive = [
    homeMain,
    homeMotCua,
    homeHTTBGD,
    homeHoTroThietBiPhanMem,
    homeTTHCGV,
    homeHocTap,
    homeTraCuu,
    homeOnLuyen,
  ]
    .flat()
    .map((item) => {
      return { path: item.path, moduleActive: item.moduleActive }
    })

  useEffect(() => {
    const matchedRoute = listModuleActive.some((module) => {
      return pathname.includes(module?.path) && !module.moduleActive
    })
    if (matchedRoute === true) {
      //   return (window.location.href = '/uneti')
    } else {
      return undefined
    }
  }, [listModuleActive, pathname])

  return <Outlet />
}

export default CheckActiveModuleMiddleware

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { DataSinhVien } from '@/Services/Utils/dataSinhVien'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV'
import { simpleSHA256 } from '@/Services/Utils/stringUtils'
import { isNull } from 'lodash-unified'

function AuthMiddleware() {
  const location = useLocation()

  const dataSV = DataSinhVien()
  const dataCBGV = DataCanBoGV()

  let role = null
  if (dataSV) {
    role = dataSV.Role
  } else if (dataCBGV) {
    role = dataCBGV.Role
  } else {
    role = null
  }

  const dataAuth = useSelector(
    (state) => state.auth?.login?.currentToken?.token,
  )

  const pathUrl = isNull(location.search)
    ? location.pathname
    : location.pathname + location.search

  useEffect(() => {
    localStorage.setItem('currentUrl', pathUrl)
  }, [location.pathname, location.search])

  if (
    dataAuth == null ||
    dataAuth == undefined ||
    dataAuth == '' ||
    role == null ||
    role == simpleSHA256('') ||
    role == undefined
  ) {
    return <Navigate to={'/dang-nhap'} />
  } else {
    return <Outlet />
  }
}

export default AuthMiddleware

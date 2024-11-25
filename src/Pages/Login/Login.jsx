import { useState } from 'react'
import { toast } from 'react-toastify'
import { apiLogin, userGVLogin, userSVLogin } from '@/Apis/apiLogin.js'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import LoginView from './LoginView'
import { encryptAESWithKey } from '@/Services/Utils/cryptographyUtils'

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleChangevalue = async (e) => {
    if (e.target.id === 'taikhoan') {
      setUsername(e.target.value)
    }

    if (e.target.id === 'matkhau') {
      setPassword(e.target.value)
    }
  }

  const checkedSinhVien = async (username) => {
    try {
      setLoading(true)
      const dataSV = await userSVLogin(
        { TC_SV_MaSinhVien: encryptAESWithKey(username) },
        dispatch,
      )

      if (!dataSV) return null

      const { LoaiHinhDaoTao, Email_TruongCap, TrangThaiHocTap } = dataSV

      if (!LoaiHinhDaoTao) return 'Invalid-LoaiHinhDaoTao'
      if (!Email_TruongCap) return 'Invalid-Email'

      if (TrangThaiHocTap === 'Đang học') return 'SV'
      if (TrangThaiHocTap === 'Đã tốt nghiệp') return 'SV-Done'

      return null
    } catch (error) {
      console.error('Error in checkedSinhVien:', error)
      return null
    } finally {
      setLoading(false)
    }
  }

  const checkedGiangVien = async (username, password) => {
    try {
      setLoading(true)
      const dataGV = await userGVLogin(
        {
          HT_USER_TenDN: encryptAESWithKey(username),
          HT_USER_MK: encryptAESWithKey(password),
        },
        dispatch,
        navigate,
      )

      if (!dataGV) return null

      return dataGV?.LoaiTaiKhoan === 'Giảng viên' ? 'CB' : null
    } catch (error) {
      console.error('Error in checkedGiangVien:', error)
      return null
    } finally {
      setLoading(false)
    }
  }

  // login event
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    const showToastError = (message) => {
      setLoading(false)
      return toast.error(message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    }

    if (!username) {
      return showToastError('Vui lòng nhập tài khoản!')
    }

    if (!password) {
      return showToastError('Vui lòng nhập mật khẩu!')
    }

    try {
      const isLogin = await apiLogin(
        {
          TenDangNhap: encryptAESWithKey(username),
          MatKhau: encryptAESWithKey(password),
        },
        dispatch,
      )

      if (isLogin) {
        const sinhvien = await checkedSinhVien(username)
        const giangvien = await checkedGiangVien(username, password)

        if (!sinhvien && !giangvien) {
          return showToastError(
            'Thông tin đăng nhập không chính xác. Vui lòng kiểm tra lại!',
          )
        }

        switch (sinhvien) {
          case 'Invalid-Email': {
            return showToastError(
              'Tài khoản của bạn thiếu thông tin email của trường cấp không thể đăng nhập. Vui lòng đợi cập nhật thông tin và quay lại sau!',
            )
          }
          case 'Invalid-LoaiHinhDaoTao': {
            return showToastError(
              'Tài khoản của bạn thiếu thông tin bậc đào tạo không thể đăng nhập. Vui lòng đợi cập nhật thông tin và quay lại sau!',
            )
          }
          case 'SV-Done': {
            return showToastError(
              'Tài khoản đã tốt nghiệp không thể sử dụng hệ thống UNETI.',
            )
          }
          default: {
            const currentUrl = localStorage.getItem('currentUrl') ?? '/uneti'
            navigate(currentUrl)
            setLoading(false)
            break
          }
        }
      } else {
        return showToastError(
          'Thông tin đăng nhập không chính xác. Vui lòng kiểm tra lại!',
        )
      }
    } catch (error) {
      setLoading(false)
      console.error('Login error:', error)
      return showToastError(
        'Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại sau!',
      )
    }
  }

  // enter login event
  const handleEnterPressKey = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e)
    }
  }

  // event show/hide password
  const handleShowHidePassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <LoginView
      loading={loading}
      onChangeValue={handleChangevalue}
      onLogin={handleLogin}
      onPressEnter={handleEnterPressKey}
      onShowHidePassword={handleShowHidePassword}
      visiblePassword={showPassword}
    />
  )
}

export default Login

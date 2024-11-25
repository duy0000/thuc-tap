import axios from 'axios'
import {
  tokenFailure,
  tokenStart,
  tokenSuccess,
} from '@/Services/Redux/Slice/authSlice.js'
import {
  userFailure,
  userStart,
  userSuccess,
} from '@/Services/Redux/Slice/userSlice.js'
import http from '@/Configs/http.js'

/**
 * API Đăng nhập All in One: GV-SV-NguoiDung
 *
 * @param {Object} user - An object containing the username and password of the user.
 * @param {string} user.TenDangNhap - The username of the user.
 * @param {string} user.MatKhau - The password of the user.
 * @param {function} dispatch - A function that is used to dispatch actions to the Redux store.
 * @return {Promise<Object>} A Promise that resolves to the response data if the login is successful, or rejects with an error if the login fails.
 */
export const apiLogin = async ({ TenDangNhap, MatKhau }, dispatch) => {
  dispatch(tokenStart())
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/jwt_NguoiDung/Login_NguoiDung`,
      { TenDangNhap, MatKhau },
    )

    if (res.status === 200) {
      dispatch(tokenSuccess(res.data))
      return res.data
    }
  } catch (error) {
    console.log('apiLogin - error: ', error)
    dispatch(tokenFailure())
  }
}

// data token
export const tokenSVLogin = async (user, dispatch) => {
  dispatch(tokenStart())

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/jwt/Login`,
      user,
    )
    if (res.status === 200) {
      dispatch(tokenSuccess(res.data))
      return res.data
    }
  } catch (error) {
    dispatch(tokenFailure())
  }
}

export const tokenGVLogin = async (user, dispatch) => {
  dispatch(tokenStart())

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/jwtGV/LoginGV`,
      user,
    )
    if (res.status === 200) {
      dispatch(tokenSuccess(res.data))
      return res.data
    }
  } catch (error) {
    dispatch(tokenFailure())
  }
}

// data user
export const userSVLogin = async (username, dispatch) => {
  dispatch(userStart())
  try {
    const res = await http.post(`/SP_MC_MaSinhVien/Load_Web_App_Para`, username)
    if (res.status === 200) {
      dispatch(userSuccess(res.data?.body[0]))
      return res.data?.body[0]
    }
  } catch (error) {
    dispatch(userFailure())
  }
}

export const userGVLogin = async (user, dispatch) => {
  dispatch(userStart())
  try {
    const res = await http.post(`/SP_HT_USER_GIANGVIEN/Load_MaND_HRM`, user)
    if (res.status === 200) {
      dispatch(userSuccess(res.data?.body[0]))
      return res.data?.body[0]
    }
  } catch (error) {
    dispatch(userFailure())
  }
}

export const refreshDataToken = async (refreshToken = '') => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/jwt/RefreshToken`,
      { refreshToken },
    )
    if (res.status === 200) {
      return res.data
    }
  } catch (error) {
    console.log(`[87]::System UNETI RF Checking Successfully ${error.message}`)
  }
}

// POST: Lịch sử đăng nhập
export const postLichSuDangNhap = async (
  data = {
    HT_LichSuDangNhap_MaNguoiDung: '',
    HT_LichSuDangNhap_LoaiNguoiDung: '',
    HT_LichSuDangNhap_NguonTiepNhan: '1',
  },
) => {
  try {
    const res = await http.post(`/SP_HT_LichSuDangNhap_TiepNhan/Add_Para`, data)
    if (res.status === 200) {
      return res.data?.body[0]
    }
  } catch (error) {
    console.info(
      'Handle save history data user login system UNETI successfully!',
    )
  }
}

import PropTypes from 'prop-types'
import logoUneti from '@/assets/Images/LOGO_UNETI.ico'
import { FaSquareFacebook } from 'react-icons/fa6'
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineGlobal,
  AiOutlineYoutube,
} from 'react-icons/ai'

import Loading from '@/Components/Loading/Loading'
import { Link } from 'react-router-dom'

const LoginView = (props) => {
  const {
    loading,
    onChangeValue,
    onLogin,
    onPressEnter,
    onShowHidePassword,
    visiblePassword,
  } = props
  return (
    <section
      className={`absolute right-0 left-0 top-0 bottom-0 w-full h-full flex justify-center items-center bg-center bg-no-repeat  bg-gray-400 bg-blend-multiply px-4 lg:px-0`}
      style={{
        backgroundImage: `url("images/uneti-banner.webp")`,
        backgroundPositionY: `86%`,
      }}
    >
      {loading ? (
        <div className="fixed bg-[#4d4d4d3a] inset-0 flex items-center justify-center z-50">
          <Loading />
        </div>
      ) : (
        <div className="w-[600px] p-10 bg-white rounded-xl">
          <div className="login-brand flex justify-center mb-6">
            <img src={logoUneti} className="w-32" width={128} alt="" />
          </div>
          <h3 className="font-semibold uppercase text-3xl text-sky-700 mb-10 text-center">
            Đăng nhập hệ thống UNETI
          </h3>
          <form
            onSubmit={onLogin}
            onKeyDown={onPressEnter}
            className="flex flex-col justify-center"
          >
            <div className="flex flex-col mb-4">
              <label htmlFor="taikhoan" className="font-semibold text-sky-900">
                Tài khoản
              </label>
              <input
                id="taikhoan"
                type="text"
                className="px-4 py-2 border border-slate-300 rounded-full outline-none valid:bg-white"
                placeholder="Tài khoản"
                onChange={onChangeValue}
                autoComplete="on"
              />
            </div>
            <div className="flex flex-col  mb-4">
              <label htmlFor="matkhau" className="font-semibold text-sky-900">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  id="matkhau"
                  autoComplete="current-password"
                  type={visiblePassword ? 'text' : 'password'}
                  className="px-4 py-2 border border-slate-300 w-full rounded-full outline-none valid:bg-white"
                  placeholder="Mật khẩu"
                  onChange={onChangeValue}
                />
                <span
                  className="absolute right-5 top-3 cursor-pointer text-xl"
                  onClick={onShowHidePassword}
                >
                  {!visiblePassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="px-3 py-2 rounded-full bg-white text-sky-800 font-semibold border border-sky-800 hover:bg-sky-800 hover:text-white"
            >
              Đăng nhập
            </button>
          </form>

          <div className="login-bottom text-center mt-6">
            <p>Trường Đại Học Kinh Tế - Kỹ Thuật Công Nghiệp</p>
            <p>Tel: (024)38621504 - (0228)3848706</p>
            <div className="flex justify-center gap-4 mt-2">
              <Link to={'https://uneti.edu.vn'} target="_blank">
                <AiOutlineGlobal size={24} />
              </Link>
              <Link
                to={'https://www.facebook.com/Daihoc.uneti'}
                target="_blank"
              >
                <FaSquareFacebook size={24} />
              </Link>
              <Link to={'https://www.youtube.com/@nokia88e1'} target="_blank">
                <AiOutlineYoutube size={24} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

LoginView.propTypes = {
  loading: PropTypes.bool,
  visiblePassword: PropTypes.bool,
  onChangeValue: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onPressEnter: PropTypes.func,
  onShowHidePassword: PropTypes.func,
}

export default LoginView

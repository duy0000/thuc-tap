/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import DanhSachBMSMatKetNoi from './DanhSachBMS/DanhSachBMSMatKetNoi/DanhSachBMSMatKetNoi'
import DanhSachBoDieuKhienBMS from './DanhSachBMS/DanhSachBoDieuKhienBMS'

const BoDieuKhienBMSView = (props) => {
  return (
    <section className="bg-white rounded-lg p-2 h-full shadow-sm">
      <h3 className="font-bold text-center text-2xl uppercase text-cyan-600">
        Thiết lập thủ công
      </h3>
      {/* END: Header Dashboard */}
      <div className="view-index-bms">
        <div className="hidden">
          <DanhSachBMSMatKetNoi />
        </div>
        <DanhSachBoDieuKhienBMS />
      </div>
      {/* END: Danh sách thiết bị mất kết nối */}
    </section>
  )
}

BoDieuKhienBMSView.propTypes = {}

export default BoDieuKhienBMSView

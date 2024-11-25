import clsx from 'clsx'
import PropTypes from 'prop-types'
import { FaAngleRight } from 'react-icons/fa6'
import { TABS } from '../../../constants'
import { EditPhanQuyenThuTuc } from '../EditPhanQuyenThuTuc/EditPhanQuyenThuTuc'

const PhanQuyenChiTiet = (props) => {
  const {
    showPhanQuyen,
    showEditPhanQuyen,
    dataPhanQuyen,
    dataTTHC_GV_ID,
    onShowView,
    onDeleteRow,
    onSetShowEditPhanQuyen,
    onSetLoading,
    onGetDataDetailHoSoThuTuc,
  } = props

  return (
    <div className="TTHC-GV_PhanQuyen mb-4">
      {/* header */}
      <div className="flex flex-row items-center lg:justify-between bg-gray-100 shadow-md p-2 rounded-md mb-4">
        <div className="flex flex-row items-center gap-2 text-sky-700">
          {showPhanQuyen ? (
            <FaAngleRight
              onClick={() => {
                onShowView(TABS.tabPhanQuyen)
              }}
              size={20}
              className="cursor-pointer hover:opacity-70 mt-1 rotate-90"
            />
          ) : (
            <FaAngleRight
              onClick={() => {
                onShowView(TABS.tabPhanQuyen)
              }}
              size={20}
              className="cursor-pointer hover:opacity-70 mt-1"
            />
          )}
          <h4 className="text-xl uppercase font-medium">Phân quyền</h4>
        </div>
      </div>
      {/* contents */}

      <div
        className={clsx(
          showPhanQuyen ? 'flex flex-col gap-4 overflow-x-auto' : 'hidden',
        )}
      >
        <div className="">
          <button
            onClick={() => {
              onSetShowEditPhanQuyen(true)
            }}
            className="px-3 py-2 bg-sky-800 text-white hover:opacity-70 rounded-md"
          >
            Thêm phân quyền mới
          </button>

          {showEditPhanQuyen ? (
            <EditPhanQuyenThuTuc
              idTTHCGoc={dataTTHC_GV_ID}
              onLoading={onSetLoading}
              onGetDataDetailHoSoThuTuc={onGetDataDetailHoSoThuTuc}
              onShowEditPhanQuyen={onSetShowEditPhanQuyen}
            />
          ) : null}
        </div>
        <table className="w-full">
          <thead className="bg-[#075985] text-white rounded-t-xl">
            <tr>
              <th className="border-r px-2 py-1 rounded-tl-xl">STT</th>
              <th className="border-r px-2 py-1">Mã nhân sự</th>
              <th className="border-r px-2 py-1">Họ và tên</th>
              <th className="border-r px-2 py-1">Đơn vị</th>
              <th className="border-r px-2 py-1">Tổ</th>
              <th className="border-r px-2 py-1">Nhóm</th>
              <th className="px-2 py-1 rounded-tr-xl">Tác vụ</th>
            </tr>
          </thead>
          <tbody>
            {dataPhanQuyen.map((iPhanQuyen, index) => (
              <tr className="border-b" key={iPhanQuyen.MC_TTHC_GV_PhanQuyen_ID}>
                <td className="border-r border-l px-2 py-1 text-center">
                  {index + 1}
                </td>
                <td className="border-r px-2 py-1 text-center">
                  {iPhanQuyen.MC_TTHC_GV_PhanQuyen_MaNhanSu}
                </td>
                <td className="border-r px-2 py-1 text-center">
                  {iPhanQuyen.MC_TTHC_GV_PhanQuyen_HoTen}
                </td>
                <td className="border-r px-2 py-1 text-center">
                  {iPhanQuyen.MC_TTHC_GV_PhanQuyen_DonVi}
                </td>
                <td className="border-r px-2 py-1 text-center">
                  {iPhanQuyen.MC_TTHC_GV_PhanQuyen_To}
                </td>
                <td className="border-r px-2 py-1 text-center">
                  {iPhanQuyen.MC_TTHC_GV_PhanQuyen_Nhom}
                </td>
                <td className="border-r px-2 py-1 text-center">
                  <div className="flex flex-col lg:flex-row items-center justify-center gap-2">
                    <button
                      type="button"
                      className="px-3 py-1 bg-[#336699] text-white hover:opacity-70"
                      onClick={() => onDeleteRow(TABS.tabPhanQuyen, iPhanQuyen)}
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

PhanQuyenChiTiet.propTypes = {
  showPhanQuyen: PropTypes.bool.isRequired,
  showEditPhanQuyen: PropTypes.bool.isRequired,
  dataPhanQuyen: PropTypes.array.isRequired,
  dataTTHC_GV_ID: PropTypes.any,
  onShowView: PropTypes.func.isRequired,
  onDeleteRow: PropTypes.func.isRequired,
  onSetShowEditPhanQuyen: PropTypes.func.isRequired,
  onSetLoading: PropTypes.func.isRequired,
  onGetDataDetailHoSoThuTuc: PropTypes.func.isRequired,
}

export default PhanQuyenChiTiet

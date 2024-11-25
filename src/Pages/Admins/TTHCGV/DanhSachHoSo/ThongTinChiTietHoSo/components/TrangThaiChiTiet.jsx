import PropTypes from 'prop-types'
import { FaAngleRight } from 'react-icons/fa6'
import { TABS } from '../../../constants'
import clsx from 'clsx'

const TrangThaiChiTiet = (props) => {
  const {
    showTrangThai,
    dataTrangThai,
    dataEditType,
    dataEditRowIndex,
    dataEditValueRow,
    onShowView,
    onEditRow,
    onDeleteRow,
    onChangeValue,
    onUpdate,
    onCancelUpdateRow,
  } = props

  return (
    <div className="TTHC-GV_TrangThai mb-4">
      {/* header */}
      <div className="flex flex-row items-center lg:justify-between bg-gray-100 shadow-md p-2 rounded-md mb-4">
        <div className="flex flex-row items-center gap-2 text-sky-700">
          {showTrangThai ? (
            <FaAngleRight
              onClick={() => {
                onShowView(TABS.tabTrangThai)
              }}
              size={20}
              className="cursor-pointer hover:opacity-70 mt-1 rotate-90"
            />
          ) : (
            <FaAngleRight
              onClick={() => {
                onShowView(TABS.tabTrangThai)
              }}
              size={20}
              className="cursor-pointer hover:opacity-70 mt-1"
            />
          )}
          <h4 className="text-xl uppercase font-medium">Trạng thái</h4>
        </div>
      </div>
      {/* contents */}
      <div className={clsx(showTrangThai ? 'flex flex-col gap-4' : 'hidden')}>
        <table className="w-full">
          <thead className="bg-[#075985] text-white rounded-t-xl">
            <tr>
              <th className="border-r px-2 py-1 rounded-tl-xl">STT</th>
              <th className="border-r px-2 py-1">Tên trạng thái</th>
              <th className="border-r px-2 py-1">Mô tả</th>
              <th className="border-r px-2 py-1">Hiển thị thông tin xử lý</th>
              <th className="px-2 py-1 rounded-tr-xl">Tác vụ</th>
            </tr>
          </thead>
          <tbody>
            {dataTrangThai.map((iTrangThai, index) => (
              <tr className="border-b" key={iTrangThai.MC_TTHC_GV_TrangThai_ID}>
                {dataEditType === TABS.tabTrangThai &&
                dataEditRowIndex === index ? (
                  <>
                    <td className="border-r border-l px-2 py-1 text-center">
                      {index + 1}
                    </td>
                    <td className="border-r px-2 py-1 text-center">
                      <div className="">
                        <input
                          type="text"
                          className="w-full focus:outline-slate-400 px-3 py-2 border-2 border-gray-400 bg-gray-50"
                          value={
                            dataEditValueRow.MC_TTHC_GV_TrangThai_TenTrangThai ||
                            ''
                          }
                          name="MC_TTHC_GV_TrangThai_TenTrangThai"
                          id="MC_TTHC_GV_TrangThai_TenTrangThai"
                          onChange={(e) => {
                            onChangeValue(TABS.tabTrangThai, e)
                          }}
                        />
                      </div>
                    </td>
                    <td className="border-r px-2 py-1 text-center">
                      <div className="">
                        <input
                          type="text"
                          className="w-full focus:outline-slate-400 px-3 py-2 border-2 border-gray-400 bg-gray-50"
                          value={
                            dataEditValueRow.MC_TTHC_GV_TrangThai_MoTa || ''
                          }
                          name="MC_TTHC_GV_TrangThai_MoTa"
                          id="MC_TTHC_GV_TrangThai_MoTa"
                          onChange={(e) => {
                            onChangeValue(TABS.tabTrangThai, e)
                          }}
                        />
                      </div>
                    </td>
                    <td className="border-r px-2 py-1 text-center">
                      <div className="">
                        <input
                          type="checkbox"
                          className="w-full focus:outline-slate-400 px-3 py-2 border-2 border-gray-400 bg-gray-50"
                          checked={
                            dataEditValueRow?.MC_TTHC_GV_TrangThai_IsHienThiThongTin ||
                            false
                          }
                          name="MC_TTHC_GV_TrangThai_IsHienThiThongTin"
                          id="MC_TTHC_GV_TrangThai_IsHienThiThongTin"
                          onChange={(e) => {
                            onChangeValue(TABS.tabTrangThai, e)
                          }}
                        />
                      </div>
                    </td>
                    <td className="border-r px-2 py-1 text-center">
                      <div className="flex flex-col lg:flex-row items-center justify-center gap-2">
                        <button
                          type="button"
                          className="px-3 py-1 bg-[#336699] text-white hover:opacity-70"
                          onClick={() =>
                            onUpdate(TABS.tabTrangThai, dataEditValueRow)
                          }
                        >
                          Lưu
                        </button>
                        <button
                          type="button"
                          className="px-3 py-1 bg-[#336699] text-white hover:opacity-70"
                          onClick={onCancelUpdateRow}
                        >
                          Hủy
                        </button>
                        <button
                          type="button"
                          className="hidden px-3 py-1 bg-[#336699] text-white hover:opacity-70"
                          onClick={() =>
                            onDeleteRow(TABS.tabTrangThai, iTrangThai)
                          }
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border-r border-l px-2 py-1 text-center">
                      {index + 1}
                    </td>
                    <td className="border-r px-2 py-1 text-center">
                      {iTrangThai.MC_TTHC_GV_TrangThai_TenTrangThai}
                    </td>
                    <td className="border-r px-2 py-1 text-center">
                      {iTrangThai.MC_TTHC_GV_TrangThai_MoTa}
                    </td>
                    <td className="border-r px-2 py-1 text-center">
                      <input
                        type="checkbox"
                        checked={
                          iTrangThai.MC_TTHC_GV_TrangThai_IsHienThiThongTin
                        }
                        disabled={true}
                      />
                    </td>
                    <td className="border-r px-2 py-1 text-center">
                      <div className="flex flex-col lg:flex-row items-center justify-center gap-2">
                        <button
                          type="button"
                          className="px-3 py-1 bg-[#336699] text-white hover:opacity-70"
                          onClick={() =>
                            onEditRow(index, TABS.tabTrangThai, iTrangThai)
                          }
                        >
                          Sửa
                        </button>
                        <button
                          type="button"
                          className="hidden px-3 py-1 bg-[#336699] text-white hover:opacity-70"
                          onClick={() =>
                            onDeleteRow(TABS.tabTrangThai, iTrangThai)
                          }
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

TrangThaiChiTiet.propTypes = {
  showTrangThai: PropTypes.bool.isRequired,
  dataTrangThai: PropTypes.array.isRequired,
  dataEditType: PropTypes.string.isRequired,
  dataEditRowIndex: PropTypes.number.isRequired,
  dataEditValueRow: PropTypes.object.isRequired,
  onShowView: PropTypes.func,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onChangeValue: PropTypes.func,
  onUpdate: PropTypes.func,
  onCancelUpdateRow: PropTypes.func,
}

export default TrangThaiChiTiet

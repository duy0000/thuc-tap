import PropTypes from 'prop-types'
import clsx from 'clsx'
import { FaAngleRight } from 'react-icons/fa6'
import { TABS } from '../../../constants'
import { DebounceInput } from 'react-debounce-input'

const TrinhTuThucHienChiTiet = (props) => {
  const {
    showTrinhTuThucHien,
    dataTrinhTuThucHien,
    dataEditType,
    dataEditRowIndex,
    dataEditValueRow,
    onShowView,
    onChangeValue,
    onEditRow,
    onDeleteRow,
    onUpdate,
    onCancelUpdateRow,
  } = props

  return (
    <div className="TTHC-GV_TrinhTuThucHien mb-4">
      {/* header */}
      <div className="flex flex-row items-center lg:justify-between bg-gray-100 shadow-md p-2 rounded-md mb-4">
        <div className="flex flex-row items-center gap-2 text-sky-700">
          {showTrinhTuThucHien ? (
            <FaAngleRight
              onClick={() => {
                onShowView(TABS.tabTrinhTuThucHien)
              }}
              size={20}
              className="cursor-pointer hover:opacity-70 mt-1 rotate-90"
            />
          ) : (
            <FaAngleRight
              onClick={() => {
                onShowView(TABS.tabTrinhTuThucHien)
              }}
              size={20}
              className="cursor-pointer hover:opacity-70 mt-1"
            />
          )}
          <h4 className="text-xl uppercase font-medium">Trình tự thực hiện</h4>
        </div>
      </div>
      {/* contents */}
      <div
        className={clsx(showTrinhTuThucHien ? 'flex flex-col gap-4' : 'hidden')}
      >
        <div className="max-w-full overflow-x-scroll">
          <table className="w-full">
            <thead className="bg-[#075985] text-white rounded-t-xl">
              <tr>
                <th className="border-r px-2 py-1 rounded-tl-xl w-[40px]">
                  <p className=" w-[40px]">Bước</p>
                </th>
                <th className="border-r px-2 py-1">
                  <p className="w-[100px]">Tên công việc</p>
                </th>
                <th className="border-r px-2 py-1">
                  <p className="w-[120px]">Cách thức thực hiện</p>
                </th>
                <th className="border-r px-2 py-1">Địa chỉ nhận/trả hồ sơ</th>
                <th className="border-r px-2 py-1">Đơn vị thực hiện</th>
                <th className="border-r px-2 py-1">Đơn vị phối hợp</th>
                <th className="border-r px-2 py-1">
                  <p className="w-[120px]">Thời gian thực hiện</p>
                </th>
                <th className="border-r px-2 py-1">
                  <p className="w-[140px]">Kết quả</p>
                </th>
                <th className="px-2 py-1 rounded-tr-xl">Tác vụ</th>
              </tr>
            </thead>
            <tbody>
              {dataTrinhTuThucHien?.map((iTrinhTu, index) => {
                let listKetQuaTrinhTu =
                  iTrinhTu?.MC_TTHC_GV_TrinhTuThucHien_KetQua?.split(
                    /[-+]/,
                  ).filter((item) => item.trim() !== '')
                return (
                  <tr
                    className="border-b"
                    key={iTrinhTu.MC_TTHC_GV_TrinhTuThucHien_ID}
                  >
                    {dataEditType === TABS.tabTrinhTuThucHien &&
                    dataEditRowIndex === index ? (
                      <>
                        <td className="border-r border-l px-2 py-1 text-center">
                          {index + 1}
                        </td>
                        <td className="border-r px-2 py-1 text-left">
                          <div className="">
                            <DebounceInput
                              className="block border-2 border-slate-400 px-3 py-2 focus:outline-slate-400"
                              minLength={2}
                              debounceTimeout={300}
                              value={
                                iTrinhTu.MC_TTHC_GV_TrinhTuThucHien_TenCongViec
                              }
                              name="MC_TTHC_GV_TrinhTuThucHien_TenCongViec"
                              onChange={(e) => {
                                onChangeValue(TABS.tabTrinhTuThucHien, e)
                              }}
                            />
                          </div>
                        </td>
                        <td className="border-r px-2 py-1 text-left">
                          <div className="">
                            <DebounceInput
                              element={'textarea'}
                              className="block w-full max-h-full border-2 border-slate-400 px-3 py-2 focus:outline-slate-400"
                              style={{
                                minHeight: '200px',
                              }}
                              minLength={2}
                              debounceTimeout={300}
                              value={
                                iTrinhTu.MC_TTHC_GV_TrinhTuThucHien_CachThucThucHien
                              }
                              name="MC_TTHC_GV_TrinhTuThucHien_CachThucThucHien"
                              onChange={(e) => {
                                onChangeValue(TABS.tabTrinhTuThucHien, e)
                              }}
                            />
                          </div>
                        </td>
                        <td className="border-r px-2 py-1 text-left">
                          <div className="">
                            <DebounceInput
                              className="block border-2 border-slate-400 px-3 py-2 focus:outline-slate-400"
                              minLength={2}
                              debounceTimeout={300}
                              value={
                                iTrinhTu.MC_TTHC_GV_TrinhTuThucHien_DiaChiNhanTra
                              }
                              name="MC_TTHC_GV_TrinhTuThucHien_DiaChiNhanTra"
                              onChange={(e) => {
                                onChangeValue(TABS.tabTrinhTuThucHien, e)
                              }}
                            />
                          </div>
                        </td>
                        <td className="border-r px-2 py-1 text-left">
                          <div className="">
                            <DebounceInput
                              className="block border-2 border-slate-400 px-3 py-2 focus:outline-slate-400"
                              minLength={2}
                              debounceTimeout={300}
                              value={
                                iTrinhTu.MC_TTHC_GV_TrinhTuThucHien_DonViThucHien
                              }
                              name="MC_TTHC_GV_TrinhTuThucHien_DonViThucHien"
                              onChange={(e) => {
                                onChangeValue(TABS.tabTrinhTuThucHien, e)
                              }}
                            />
                          </div>
                        </td>
                        <td className="border-r px-2 py-1 text-center">
                          <div className="">
                            <DebounceInput
                              className="block border-2 border-slate-400 px-3 py-2 focus:outline-slate-400"
                              minLength={2}
                              debounceTimeout={300}
                              value={
                                iTrinhTu.MC_TTHC_GV_TrinhTuThucHien_DonViPhoiHop
                              }
                              name="MC_TTHC_GV_TrinhTuThucHien_DonViPhoiHop"
                              onChange={(e) => {
                                onChangeValue(TABS.tabTrinhTuThucHien, e)
                              }}
                            />
                          </div>
                        </td>
                        <td className="border-r px-2 py-1 text-center">
                          <div className="">
                            <DebounceInput
                              type={'number'}
                              className="block w-full border-2 border-slate-400 px-3 py-2 focus:outline-slate-400"
                              min={0}
                              step={0.1}
                              value={
                                iTrinhTu.MC_TTHC_GV_TrinhTuThucHien_ThoiGianNgay
                              }
                              name="MC_TTHC_GV_TrinhTuThucHien_ThoiGianNgay"
                              onChange={(e) => {
                                onChangeValue(TABS.tabTrinhTuThucHien, e)
                              }}
                            />
                          </div>
                        </td>
                        <td className="border-r px-2 py-1 text-left">
                          <div className="">
                            <DebounceInput
                              element={'textarea'}
                              className="block w-full border-2 border-slate-400 px-3 py-2 focus:outline-slate-400"
                              style={{
                                minHeight: '200px',
                              }}
                              minLength={2}
                              debounceTimeout={300}
                              value={iTrinhTu.MC_TTHC_GV_TrinhTuThucHien_KetQua}
                              name="MC_TTHC_GV_TrinhTuThucHien_KetQua"
                              onChange={(e) => {
                                onChangeValue(TABS.tabTrinhTuThucHien, e)
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
                                onUpdate(
                                  TABS.tabTrinhTuThucHien,
                                  dataEditValueRow,
                                )
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
                              className="hidden spx-3 py-1 bg-[#336699] text-white hover:opacity-70"
                              onClick={() =>
                                onDeleteRow(TABS.tabTrinhTuThucHien, iTrinhTu)
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
                        <td className="border-r px-2 py-1 text-left">
                          {iTrinhTu.MC_TTHC_GV_TrinhTuThucHien_TenCongViec}
                        </td>
                        <td className="border-r px-2 py-1 text-left">
                          {iTrinhTu.MC_TTHC_GV_TrinhTuThucHien_CachThucThucHien}
                        </td>
                        <td className="border-r px-2 py-1 text-left">
                          {iTrinhTu.MC_TTHC_GV_TrinhTuThucHien_DiaChiNhanTra}
                        </td>
                        <td className="border-r px-2 py-1 text-left">
                          {iTrinhTu.MC_TTHC_GV_TrinhTuThucHien_DonViThucHien}
                        </td>
                        <td className="border-r px-2 py-1 text-center">
                          {iTrinhTu.MC_TTHC_GV_TrinhTuThucHien_DonViPhoiHop}
                        </td>
                        <td className="border-r px-2 py-1 text-center">
                          {iTrinhTu.MC_TTHC_GV_TrinhTuThucHien_ThoiGianNgay}
                        </td>
                        <td className="border-r px-2 py-1 text-left">
                          {
                            <div className="w-full">
                              {listKetQuaTrinhTu?.map((item, index) => (
                                <p key={index}>{'- ' + item.trim()}</p>
                              ))}
                            </div>
                          }
                        </td>
                        <td className="border-r px-2 py-1 text-center">
                          <div className="flex flex-col lg:flex-row items-center justify-center gap-2">
                            <button
                              type="button"
                              className="px-3 py-1 bg-[#336699] text-white hover:opacity-70"
                              onClick={() =>
                                onEditRow(
                                  index,
                                  TABS.tabTrinhTuThucHien,
                                  iTrinhTu,
                                )
                              }
                            >
                              Sửa
                            </button>
                            <button
                              type="button"
                              className="hidden px-3 py-1 bg-[#336699] text-white hover:opacity-70"
                              onClick={() =>
                                onDeleteRow(TABS.tabTrinhTuThucHien, iTrinhTu)
                              }
                            >
                              Xóa
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

TrinhTuThucHienChiTiet.propTypes = {
  showTrinhTuThucHien: PropTypes.bool.isRequired,
  dataTrinhTuThucHien: PropTypes.array.isRequired,
  dataEditType: PropTypes.string.isRequired,
  dataEditRowIndex: PropTypes.number.isRequired,
  dataEditValueRow: PropTypes.object.isRequired,
  onShowView: PropTypes.func,
  onChangeValue: PropTypes.func,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onUpdate: PropTypes.func,
  onCancelUpdateRow: PropTypes.func,
}

export default TrinhTuThucHienChiTiet

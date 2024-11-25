import clsx from 'clsx'
import PropTypes from 'prop-types'
import { FaAngleRight } from 'react-icons/fa6'
import { TABS } from '../../../constants'
import {
  convertBufferToBase64,
  convertDataFileToBase64,
} from '@/Services/Utils/stringUtils'
import { handleDownloadFileBase64 } from '@/Services/Utils/fileUtils'
import { MdDelete } from 'react-icons/md'
import Swal from 'sweetalert2'

const TPHSDeNghiChiTiet = (props) => {
  const {
    showTPHSDeNghi,
    dataTPHSDeNghi,
    dataEditType,
    dataEditRowIndex,
    dataEditValueRow,
    onShowView,
    onChangeValue,
    onEditRow,
    onSetEditValueRow,
    onDeleteRow,
    onUpdate,
    onCancelUpdateRow,
  } = props

  return (
    <div className="TTHC-GV_ThanhPhanHoSoDeNghi mb-4">
      {/* header */}
      <div className="flex flex-row items-center lg:justify-between bg-gray-100 shadow-md p-2 rounded-md mb-4">
        <div className="flex flex-row items-center gap-2 text-sky-700">
          {showTPHSDeNghi ? (
            <FaAngleRight
              onClick={() => {
                onShowView(TABS.tabTPHSDeNghi)
              }}
              size={20}
              className="cursor-pointer hover:opacity-70 mt-1 rotate-90"
            />
          ) : (
            <FaAngleRight
              onClick={() => {
                onShowView(TABS.tabTPHSDeNghi)
              }}
              size={20}
              className="cursor-pointer hover:opacity-70 mt-1"
            />
          )}
          <h4 className="text-xl uppercase font-medium">
            Thành phần hồ sơ đề nghị
          </h4>
        </div>
      </div>
      {/* content */}
      <div className={clsx(showTPHSDeNghi ? 'flex flex-col gap-4' : 'hidden')}>
        <table className="w-full">
          <thead className="bg-[#075985] text-white rounded-t-xl">
            <tr>
              <th className="border-r px-2 py-1 rounded-tl-xl">STT</th>
              <th className="border-r px-2 py-1">Tên giấy tờ</th>
              <th className="border-r px-2 py-1">Mẫu hồ sơ/Hướng dẫn</th>
              <th className="border-r px-2 py-1">Bản chính</th>
              <th className="border-r px-2 py-1">Bản sao</th>
              <th className="border-r px-2 py-1">Bắt buộc</th>
              <th className="px-2 py-1 rounded-tr-xl">Tác vụ</th>
            </tr>
          </thead>
          <tbody>
            {dataTPHSDeNghi.map((iThanhPhan, index) => {
              return (
                <tr
                  className="border-b"
                  key={iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_ID}
                >
                  {dataEditType === TABS.tabTPHSDeNghi &&
                  dataEditRowIndex === index ? (
                    <>
                      <td className="border-r border-l px-2 py-1 text-center">
                        {index + 1}
                      </td>
                      <td className="border-r px-2 py-1 text-center">
                        <textarea
                          type="text"
                          className="w-full border border-slate-300 rounded-md px-2 focus:outline-slate-300"
                          placeholder="Nhập tên giấy tờ..."
                          value={
                            dataEditValueRow.MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo ||
                            ''
                          }
                          name="MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo"
                          onChange={(e) => {
                            onChangeValue(TABS.tabTPHSDeNghi, e)
                          }}
                        ></textarea>
                      </td>
                      <td className="border-r px-2 py-1 text-center">
                        <div className="">
                          <p className="font-semibold ">
                            Xem mẫu hồ sơ/hướng dẫn (trước đấy):{' '}
                            <span
                              to={iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_TenFile}
                              target="_blank"
                              className="text-[#336699] cursor-pointer hover:opacity-70"
                              onClick={() => {
                                const dataFileBase64WithoutPrefix =
                                  convertBufferToBase64(
                                    iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_DataFile
                                      ?.data,
                                  )
                                handleDownloadFileBase64(
                                  iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_TenFile,
                                  dataFileBase64WithoutPrefix,
                                )
                              }}
                            >
                              {iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo}
                            </span>
                          </p>
                          {dataEditValueRow?.MC_TTHC_GV_ThanhPhanHoSo_DataFile ? (
                            <p className="border p-1 flex items-center justify-between gap-2 my-2">
                              <span className="text-left">
                                {
                                  dataEditValueRow?.MC_TTHC_GV_ThanhPhanHoSo_TenFile
                                }
                              </span>
                              <MdDelete
                                className="hover:text-red-600 cursor-pointer"
                                onClick={() => {
                                  onSetEditValueRow({
                                    ...dataEditValueRow,
                                    MC_TTHC_GV_ThanhPhanHoSo_TenFile: null,
                                    MC_TTHC_GV_ThanhPhanHoSo_DataFile: null,
                                  })
                                }}
                              />
                            </p>
                          ) : (
                            <label
                              htmlFor="MC_TTHC_GV_ThanhPhanHoSo_TenFile_Update"
                              className="block my-4 text-left border bg-slate-200 hover:opacity-70 cursor-pointer"
                            >
                              <input
                                type="file"
                                name="MC_TTHC_GV_ThanhPhanHoSo_TenFile_Update"
                                id="MC_TTHC_GV_ThanhPhanHoSo_TenFile_Update"
                                onChange={async (e) => {
                                  const file = e.target.files[0]
                                  const base64String =
                                    await convertDataFileToBase64(file)

                                  const maxSizeInBytes = 5 * 1024 * 1024 // 5MB
                                  if (
                                    !file.name.match(
                                      /\.(pdf|docx|doc|jpeg|jpg|png|gif)$/i,
                                    )
                                  ) {
                                    Swal.fire({
                                      icon: 'error',
                                      title:
                                        'Tệp tải lên không đúng định dạng yêu cầu. Vui lòng kiểm tra lại.',
                                      text: 'Các loại file tải lên phải có dạng PDF, DOC, DOCX, PNG, JPG, JPEG hoặc GIF(Kích thước tối đa 5MB)',
                                    })
                                    return
                                  } else {
                                    if (file.size > maxSizeInBytes) {
                                      Swal.fire({
                                        icon: 'error',
                                        title:
                                          'Tệp tải lên vượt quá kích thước cho phép!',
                                        text: 'Kích thước tối đa 5MB.',
                                      })
                                      return
                                    } else {
                                      onSetEditValueRow({
                                        ...dataEditValueRow,
                                        MC_TTHC_GV_ThanhPhanHoSo_TenFile:
                                          file.name,
                                        MC_TTHC_GV_ThanhPhanHoSo_DataFile:
                                          base64String.split(',')[1],
                                      })
                                    }
                                  }
                                }}
                              />
                            </label>
                          )}

                          <p className="text-sm text-left text-slate-500">
                            Các loại file tải lên phải có dạng{' '}
                            <span className="font-medium">PDF</span>,{' '}
                            <span className="font-medium">DOC</span>,{' '}
                            <span className="font-medium">DOCX</span>,{' '}
                            <span className="font-medium">PNG</span>,{' '}
                            <span className="font-medium">JPG</span>,{' '}
                            <span className="font-medium">JPEG</span> hoặc{' '}
                            <span className="font-medium">GIF</span>
                            <span className="ml-1 font-medium text-red-600">
                              (Kích thước tối đa 5MB)
                            </span>
                          </p>
                        </div>
                      </td>
                      <td className="border-r px-2 py-1 text-center">
                        <div className="">
                          <input
                            type="number"
                            className="w-12 border border-slate-200 focus:outline-slate-400"
                            value={
                              +dataEditValueRow.MC_TTHC_GV_ThanhPhanHoSo_BanChinh ??
                              0
                            }
                            name="MC_TTHC_GV_ThanhPhanHoSo_BanChinh"
                            id="MC_TTHC_GV_ThanhPhanHoSo_BanChinh"
                            onChange={(e) => {
                              onChangeValue(TABS.tabTPHSDeNghi, e)
                            }}
                          />
                        </div>
                      </td>
                      <td className="border-r px-2 py-1 text-center">
                        <div className="">
                          <input
                            type="number"
                            className="w-12 border border-slate-200 focus:outline-slate-400"
                            value={
                              +dataEditValueRow.MC_TTHC_GV_ThanhPhanHoSo_BanSao ??
                              0
                            }
                            name="MC_TTHC_GV_ThanhPhanHoSo_BanSao"
                            id="MC_TTHC_GV_ThanhPhanHoSo_BanSao"
                            onChange={(e) => {
                              onChangeValue(TABS.tabTPHSDeNghi, e)
                            }}
                          />
                        </div>
                      </td>
                      <td className="border-r px-2 py-1 text-center">
                        <div className="">
                          <input
                            type="checkbox"
                            defaultChecked={
                              dataEditValueRow.MC_TTHC_GV_ThanhPhanHoSo_BatBuoc
                            }
                            name="MC_TTHC_GV_ThanhPhanHoSo_BatBuoc"
                            id="MC_TTHC_GV_ThanhPhanHoSo_BatBuoc"
                            onChange={(e) => {
                              onChangeValue(TABS.tabTPHSDeNghi, e)
                            }}
                          />
                        </div>
                      </td>
                      <td className="border-r px-2 py-1 text-center">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <button
                            type="button"
                            className="px-3 py-1 w-full bg-[#336699] text-white hover:opacity-70"
                            onClick={() =>
                              onUpdate(TABS.tabTPHSDeNghi, dataEditValueRow)
                            }
                          >
                            Lưu
                          </button>
                          <button
                            type="button"
                            className="px-3 py-1 w-full bg-[#336699] text-white hover:opacity-70"
                            onClick={onCancelUpdateRow}
                          >
                            Hủy
                          </button>
                          <button
                            type="button"
                            className="hidden px-3 py-1 w-full bg-[#336699] text-white hover:opacity-70"
                            onClick={() =>
                              onDeleteRow(TABS.tabTPHSDeNghi, iThanhPhan)
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
                        {iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo}
                      </td>
                      <td className="border-r px-2 py-1 text-center">
                        {iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_TenFile &&
                        iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_DataFile ? (
                          <p className="font-semibold ">
                            Xem mẫu hồ sơ/hướng dẫn:{' '}
                            <span
                              onClick={() => {
                                const dataFileBase64WithoutPrefix =
                                  convertBufferToBase64(
                                    iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_DataFile
                                      ?.data,
                                  )
                                handleDownloadFileBase64(
                                  iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_TenFile,
                                  dataFileBase64WithoutPrefix,
                                )
                              }}
                              className="text-[#336699] cursor-pointer hover:opacity-70"
                            >
                              {iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_TenFile}
                            </span>
                          </p>
                        ) : null}
                      </td>
                      <td className="border-r px-2 py-1 text-center">
                        <input
                          type="number"
                          disabled={true}
                          className="w-10 text-center"
                          value={
                            iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_BanChinh ?? 0
                          }
                          name=""
                          id=""
                        />
                      </td>
                      <td className="border-r px-2 py-1 text-center">
                        <input
                          type="number"
                          disabled={true}
                          className="w-10 text-center"
                          value={
                            iThanhPhan.MC_TTHC_GV_ThanhPhanHoSo_BanSao ?? 0
                          }
                          name=""
                          id=""
                        />
                      </td>
                      <td className="border-r px-2 py-1 text-center">
                        <input
                          type="checkbox"
                          disabled={true}
                          checked={
                            iThanhPhan?.MC_TTHC_GV_ThanhPhanHoSo_BatBuoc
                              ? true
                              : false
                          }
                        />
                      </td>
                      <td className="border-r px-2 py-1 text-center">
                        <div className="flex flex-col lg:flex-row items-center justify-center gap-2">
                          <button
                            type="button"
                            className="px-3 py-1 bg-[#336699] text-white hover:opacity-70"
                            onClick={() =>
                              onEditRow(index, TABS.tabTPHSDeNghi, iThanhPhan)
                            }
                          >
                            Sửa
                          </button>
                          <button
                            type="button"
                            className="hidden px-3 py-1 bg-[#336699] text-white hover:opacity-70"
                            onClick={() =>
                              onDeleteRow(TABS.tabTPHSDeNghi, iThanhPhan)
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
  )
}

TPHSDeNghiChiTiet.propTypes = {
  dataTPHSDeNghi: PropTypes.array,
  showTPHSDeNghi: PropTypes.bool,
  dataEditType: PropTypes.string.isRequired,
  dataEditRowIndex: PropTypes.number.isRequired,
  dataEditValueRow: PropTypes.object.isRequired,
  onShowView: PropTypes.func,
  onChangeValue: PropTypes.func,
  onEditRow: PropTypes.func,
  onSetEditValueRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onUpdate: PropTypes.func,
  onCancelUpdateRow: PropTypes.func,
}

export default TPHSDeNghiChiTiet

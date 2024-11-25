import { TextEditor } from '@/Components/TextEditor/TextEditor'
import { handleDownloadFileBase64 } from '@/Services/Utils/fileUtils'
import {
  convertBufferToBase64,
  convertDataFileToBase64,
} from '@/Services/Utils/stringUtils'
import clsx from 'clsx'
import { marked } from 'marked'
import PropTypes from 'prop-types'
import { FaAngleRight } from 'react-icons/fa6'
import { TfiReload } from 'react-icons/tfi'
import { TABS } from '../../../constants'
import { MdDelete } from 'react-icons/md'
import Swal from 'sweetalert2'

const ThongTinChungHoSoChiTiet = (props) => {
  const {
    showThongTinHoSo,
    dataThongTinHoSoChung,
    dataQuyTrinhThucHien,
    dataUpdateTepThuTuc,
    dataEditThongTinChung,
    onShowView,
    onUpdateThongTinChung,
    onChangeValue,
    onSetDataQuyTrinhThucHien,
    onUpdateTepThuTuc,
    onEditThongTinChung,
  } = props

  return (
    <div className="TTHC-GV_ThongTinHoSo mb-4">
      <div className="flex flex-row items-center lg:justify-between bg-gray-100 shadow-md p-2 rounded-md mb-4">
        <div className="flex flex-row items-center gap-2 text-sky-700">
          {showThongTinHoSo ? (
            <FaAngleRight
              size={20}
              className="cursor-pointer hover:opacity-70 mt-1 rotate-90"
              onClick={() => {
                onShowView(TABS.tabThongTinHoSo)
              }}
            />
          ) : (
            <FaAngleRight
              size={20}
              className="cursor-pointer hover:opacity-70 mt-1"
              onClick={() => {
                onShowView(TABS.tabThongTinHoSo)
              }}
            />
          )}
          <h4 className="lg:text-xl uppercase font-medium">Thông tin hồ sơ</h4>
        </div>
        <button
          type="button"
          className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2"
          onClick={() => {
            onUpdateThongTinChung(TABS.tabThongTinHoSo, dataThongTinHoSoChung)
          }}
        >
          <TfiReload className="mx-2 font-semibold" />
          Cập nhật thông tin
        </button>
      </div>
      <div
        className={clsx(showThongTinHoSo ? 'grid grid-cols-4 gap-4' : 'hidden')}
      >
        {/* Tên thủ tục */}
        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="MC_TTHC_GV_TenThuTuc" className="font-semibold">
              Tên thủ tục <span className="text-red-600 font-semibold">*</span>
            </label>
            <input
              type="text"
              className="px-3 py-1 w-full border border-slate-200 rounded-md focus:outline-none"
              defaultValue={dataThongTinHoSoChung?.MC_TTHC_GV_TenThuTuc}
              placeholder="Nhập tên thủ tục"
              name="MC_TTHC_GV_TenThuTuc"
              id="MC_TTHC_GV_TenThuTuc"
              onChange={(e) => {
                onChangeValue(TABS.tabThongTinHoSo, e)
              }}
            />
          </div>
        </div>
        {/* Mã thủ tục */}
        <div className="col-span-4 lg:col-span-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="MC_TTHC_GV_MaThuTuc" className="font-semibold">
              Mã thủ tục
            </label>
            <input
              type="text"
              className="px-3 py-1 w-full border border-slate-200 rounded-md focus:outline-none"
              defaultValue={dataThongTinHoSoChung?.MC_TTHC_GV_MaThuTuc}
              placeholder="Nhập mã thủ tục"
              name="MC_TTHC_GV_MaThuTuc"
              id="MC_TTHC_GV_MaThuTuc"
              onChange={(e) => {
                onChangeValue(TABS.tabThongTinHoSo, e)
              }}
            />
          </div>
        </div>
        <div className="col-span-4 lg:col-span-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="MC_TTHC_GV_IDMucDo" className="font-semibold">
              Mức độ <span className="text-red-600 font-semibold">*</span>
            </label>
            <input
              type="number"
              min={1}
              max={4}
              className="px-3 py-1 w-full border border-slate-200 rounded-md focus:outline-none"
              defaultValue={
                dataThongTinHoSoChung?.MC_TTHC_GV_IDMucDo
                  ? dataThongTinHoSoChung?.MC_TTHC_GV_IDMucDo
                  : ''
              }
              placeholder="Nhập mức độ"
              name="MC_TTHC_GV_IDMucDo"
              id="MC_TTHC_GV_IDMucDo"
              onChange={(e) => {
                onChangeValue(TABS.tabThongTinHoSo, e)
              }}
            />
          </div>
        </div>
        {/* Lĩnh vực */}
        <div className="col-span-4 lg:col-span-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="MC_TTHC_GV_LinhVuc" className="font-semibold">
              Lĩnh vực
            </label>
            <input
              type="text"
              className="px-3 py-1 w-full border border-slate-200 rounded-md focus:outline-none"
              defaultValue={dataThongTinHoSoChung?.MC_TTHC_GV_LinhVuc}
              placeholder="Nhập tên lĩnh vực"
              name="MC_TTHC_GV_LinhVuc"
              id="MC_TTHC_GV_LinhVuc"
              onChange={(e) => {
                onChangeValue(TABS.tabThongTinHoSo, e)
              }}
            />
          </div>
        </div>
        {/* Đối tượng thực hiện */}
        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="MC_TTHC_GV_DoiTuongThucHien"
              className="font-semibold"
            >
              Đối tượng thực hiện
            </label>
            <input
              type="text"
              className="px-3 py-1 w-full bg-slate-300 border border-slate-200 rounded-md focus:outline-none"
              defaultValue={dataThongTinHoSoChung?.MC_TTHC_GV_DoiTuongThucHien}
              disabled={true}
              name="MC_TTHC_GV_DoiTuongThucHien"
              id="MC_TTHC_GV_DoiTuongThucHien"
              title="Không thể chỉnh sửa đối tượng thực hiện"
            />
          </div>
        </div>
        {/* Quy trình thực hiện */}
        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="MC_TTHC_GV_QuyTrinhThucHien"
              className="font-semibold"
            >
              Quy trình thực hiện
            </label>
            {/* textarea */}
            <TextEditor
              id="MC_TTHC_GV_QuyTrinhThucHien"
              value={
                dataQuyTrinhThucHien ? marked.parse(dataQuyTrinhThucHien) : ''
              }
              onChange={onSetDataQuyTrinhThucHien}
            />
          </div>
        </div>
        {/* Căn cứ pháp lý của Thủ tục hành chính */}
        <div className="col-span-4 lg:col-span-2">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="MC_TTHC_GV_CanCuPhapLyCuaTTHC"
              className="font-semibold"
            >
              Căn cứ pháp lý của Thủ tục hành chính
            </label>
            <input
              type="text"
              className="px-3 py-1 w-full border border-slate-200 rounded-md focus:outline-slate-400"
              defaultValue={
                dataThongTinHoSoChung?.MC_TTHC_GV_CanCuPhapLyCuaTTHC ??
                'Không có'
              }
              name="MC_TTHC_GV_CanCuPhapLyCuaTTHC"
              id="MC_TTHC_GV_CanCuPhapLyCuaTTHC"
              onChange={(e) => {
                onChangeValue(TABS.tabThongTinHoSo, e)
              }}
            />
          </div>
        </div>
        <div className="col-span-4 lg:col-span-2">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="MC_TTHC_GV_DieuKienThucHien"
              className="font-semibold"
            >
              Điều kiện thực hiện
            </label>
            <input
              type="text"
              className="px-3 py-1 w-full border border-slate-200 rounded-md focus:outline-slate-400"
              defaultValue={
                dataThongTinHoSoChung?.MC_TTHC_GV_DieuKienThucHien ?? 'Không có'
              }
              name="MC_TTHC_GV_DieuKienThucHien"
              id="MC_TTHC_GV_DieuKienThucHien"
              onChange={(e) => {
                onChangeValue(TABS.tabThongTinHoSo, e)
              }}
            />
          </div>
        </div>
        {/* START: Thủ tục cần Trưởng/Phó đơn vị phê duyệt */}
        <div className="col-span-4 lg:col-span-2 bg-slate-300 w-full flex-1 flex items-center gap-4 border px-3 py-1 rounded-md">
          <input
            type="checkbox"
            className="w-4 h-4 px-3 py-1 bg-slate-300 border border-slate-200 rounded-md focus:outline-none"
            defaultChecked={
              dataThongTinHoSoChung?.MC_TTHC_GV_IsTruongPhongPheDuyet
            }
            disabled={true}
            name="MC_TTHC_GV_IsTruongPhongPheDuyet"
            id="MC_TTHC_GV_IsTruongPhongPheDuyet"
          />
          <label htmlFor="MC_TTHC_GV_IsTruongPhongPheDuyet">
            Thủ tục cần Trưởng/Phó đơn vị phê duyệt
          </label>
        </div>
        {/* END: Thủ tục cần Trưởng/Phó đơn vị phê duyệt */}

        {/* START: Thủ tục cần BGH phê duyệt */}
        <div className="col-span-4 lg:col-span-2 bg-slate-300 w-full flex items-center gap-4 border px-3 py-1 rounded-md">
          <input
            type="checkbox"
            className="w-4 h-4 px-3 py-1 bg-slate-300 border border-slate-200 rounded-md focus:outline-none"
            defaultChecked={dataThongTinHoSoChung?.MC_TTHC_GV_IsBGHPheDuyet}
            disabled={true}
            name="MC_TTHC_GV_IsBGHPheDuyet"
            id="MC_TTHC_GV_IsBGHPheDuyet"
          />
          <label htmlFor="MC_TTHC_GV_IsBGHPheDuyet">
            Thủ tục cần Ban giám hiệu phê duyệt
          </label>
        </div>
        {/* END: Thủ tục cần BGH phê duyệt */}

        {/* START: Thủ tục liên thông */}
        <div className="col-span-4 lg:col-span-2 bg-slate-300 w-full flex items-center gap-4 border px-3 py-1 rounded-md">
          <input
            type="checkbox"
            className="w-4 h-4 px-3 py-1 bg-slate-300 border border-slate-200 rounded-md focus:outline-none"
            defaultChecked={dataThongTinHoSoChung?.MC_TTHC_GV_ThuTucLienThong}
            disabled={true}
            name="MC_TTHC_GV_ThuTucLienThong"
            id="MC_TTHC_GV_ThuTucLienThong"
          />
          <label htmlFor="MC_TTHC_GV_ThuTucLienThong">Thủ tục liên thông</label>
        </div>
        {/* END: Thủ tục liên thông */}

        {/* START: Thủ tục không áp dụng trực tuyến */}
        <div className="col-span-4 lg:col-span-2 bg-slate-300 w-full flex items-center gap-4 border px-3 py-1 rounded-md">
          <input
            type="checkbox"
            className="w-4 h-4 px-3 py-1 bg-slate-300 border border-slate-200 rounded-md focus:outline-none"
            defaultChecked={
              dataThongTinHoSoChung?.MC_TTHC_GV_ThuTucKhongApDungTrucTuyen
            }
            disabled={true}
            name="MC_TTHC_GV_ThuTucKhongApDungTrucTuyen"
            id="MC_TTHC_GV_ThuTucKhongApDungTrucTuyen"
          />
          <label htmlFor="MC_TTHC_GV_ThuTucKhongApDungTrucTuyen">
            Thủ tục không áp dụng trực tuyến
          </label>
        </div>
        {/* END: thủ tục không áp dụng trực tuyến */}
        {/* START: Tệp thủ tục kèm theo */}
        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="MC_TTHC_GV_TepThuTuc_TenFile">
              <span className="font-semibold">Tệp thủ tục kèm theo</span>{' '}
              <button
                className="text-red-600 font-medium hover:opacity-70"
                onClick={() => {
                  onUpdateTepThuTuc(!dataUpdateTepThuTuc)
                  onEditThongTinChung({
                    ...dataEditThongTinChung,
                    MC_TTHC_GV_TepThuTuc_TenFile: '',
                    MC_TTHC_GV_TepThuTuc_DataFileFile: '',
                  })
                }}
              >
                {dataUpdateTepThuTuc ? '(Hủy)' : '(Thay đổi)'}
              </button>
            </label>
            {dataUpdateTepThuTuc ? (
              <p className="flex items-center justify-between gap-2 p-2 border">
                <span
                  className="text-sky-800 font-semibold hover:opacity-70 cursor-pointer"
                  onClick={() => {
                    handleDownloadFileBase64(
                      dataEditThongTinChung?.MC_TTHC_GV_TepThuTuc_TenFile,
                      dataEditThongTinChung?.MC_TTHC_GV_TepThuTuc_DataFileFile,
                    )
                  }}
                >
                  {dataEditThongTinChung?.MC_TTHC_GV_TepThuTuc_TenFile}
                </span>
                <span>
                  <MdDelete
                    className="cursor-pointer hover:text-red-600"
                    onClick={() => {
                      onEditThongTinChung((prevState) => {
                        return {
                          ...prevState,
                          MC_TTHC_GV_TepThuTuc_DataFileFile: null,
                          MC_TTHC_GV_TepThuTuc_TenFile: null,
                        }
                      })
                    }}
                  />
                </span>
              </p>
            ) : null}
            {dataUpdateTepThuTuc ? (
              <>
                <label
                  htmlFor="MC_TTHC_GV_TepThuTuc"
                  className="block w-full cursor-pointer hover:bg-slate-600 hover:text-white p-2 border border-gray-600 hover:border-gray-600"
                >
                  <span className="font-semibold p-1 border">Chọn tệp</span>{' '}
                  <span className="text-sm ml-2">
                    Chưa có tệp nào được tải lên
                  </span>
                </label>
                <input
                  type="file"
                  className="hidden w-full text-sm text-gray-900 border border-gray-300 p-2 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 hover:bg-sky-800 hover:text-white"
                  onChange={async (e) => {
                    const file = e.target.files[0]
                    const dataFile = await convertDataFileToBase64(file)
                    const maxSizeInBytes = 5 * 1024 * 1024 // 5MB
                    if (
                      !file.name.match(/\.(pdf|docx|doc|jpeg|jpg|png|gif)$/i)
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
                          title: 'Tệp tải lên vượt quá kích thước cho phép!',
                          text: 'Kích thước tối đa 5MB.',
                        })
                        return
                      } else {
                        onEditThongTinChung({
                          ...dataEditThongTinChung,
                          MC_TTHC_GV_TepThuTuc_TenFile: file.name,
                          MC_TTHC_GV_TepThuTuc_DataFileFile:
                            dataFile.split(',')[1],
                        })
                      }
                    }
                  }}
                  name=""
                  id="MC_TTHC_GV_TepThuTuc"
                />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
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
              </>
            ) : null}
            {dataThongTinHoSoChung?.MC_TTHC_GV_TepThuTuc_TenFile ? (
              <div className="flex justify-between border p-2">
                <p>{dataThongTinHoSoChung?.MC_TTHC_GV_TepThuTuc_TenFile}</p>
                <button
                  type="button"
                  onClick={async () => {
                    const dataFileBase64WithoutPrefix = convertBufferToBase64(
                      dataThongTinHoSoChung?.MC_TTHC_GV_TepThuTuc_DataFileFile
                        ?.data,
                    )
                    handleDownloadFileBase64(
                      dataThongTinHoSoChung?.MC_TTHC_GV_TepThuTuc_TenFile,
                      dataFileBase64WithoutPrefix,
                    )
                  }}
                  className="text-red-700 hover:opacity-70 font-semibold"
                >
                  (Xem chi tiết file)
                </button>
              </div>
            ) : null}
          </div>
        </div>
        {/* END: Tệp thủ tục kèm theo */}
        {/* START: Đơn vị tiếp nhận */}
        <div className="col-span-4 lg:col-span-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="MC_TTHC_GV_NoiTiepNhan" className="font-semibold">
              Đơn vị tiếp nhận{' '}
              <span className="text-red-600 font-semibold">*</span>
            </label>
            <input
              type="text"
              className="px-3 py-1 w-full border border-slate-200 rounded-md focus:outline-slate-400"
              defaultValue={dataThongTinHoSoChung?.MC_TTHC_GV_NoiTiepNhan}
              name="MC_TTHC_GV_NoiTiepNhan"
              id="MC_TTHC_GV_NoiTiepNhan"
              onChange={(e) => {
                onChangeValue(TABS.tabThongTinHoSo, e)
              }}
            />
          </div>
        </div>
        {/* END: Đơn vị tiếp nhận */}

        {/* START: Nơi trả kết quả */}
        <div className="hidden col-span-4 lg:col-span-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="MC_TTHC_GV_NoiTraKetQua" className="font-semibold">
              Nơi trả kết quả{' '}
              <span className="text-red-600 font-semibold">*</span>
            </label>
            <input
              type="text"
              className="px-3 py-1 w-full border border-slate-200 rounded-md focus:outline-slate-400"
              defaultValue={dataThongTinHoSoChung?.MC_TTHC_GV_NoiTraKetQua}
              name="MC_TTHC_GV_NoiTraKetQua"
              id="MC_TTHC_GV_NoiTraKetQua"
              onChange={(e) => {
                onChangeValue(TABS.tabThongTinHoSo, e)
              }}
            />
          </div>
        </div>
        {/* END: Nơi trả kết quả */}
      </div>
    </div>
  )
}

ThongTinChungHoSoChiTiet.propTypes = {
  showThongTinHoSo: PropTypes.bool.isRequired,
  dataThongTinHoSoChung: PropTypes.object,
  dataQuyTrinhThucHien: PropTypes.string,
  dataUpdateTepThuTuc: PropTypes.bool.isRequired,
  dataEditThongTinChung: PropTypes.object,
  onShowView: PropTypes.func.isRequired,
  onUpdateThongTinChung: PropTypes.func.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  onSetDataQuyTrinhThucHien: PropTypes.func.isRequired,
  onUpdateTepThuTuc: PropTypes.func.isRequired,
  onEditThongTinChung: PropTypes.func.isRequired,
}

export default ThongTinChungHoSoChiTiet

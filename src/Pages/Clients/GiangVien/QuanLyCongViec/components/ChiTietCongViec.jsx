import Button from '@/Components/Base/Button/Button'
import { Checkbox } from '@mui/material'
import clsx from 'clsx'
import moment from 'moment'
import { memo, useState } from 'react'
import { BsDownload } from 'react-icons/bs'
import { dayjs } from '@/Services/Utils/index.js'

const ChiTietCongViec = memo(function ChiTietCongViec({
  open,
  onClose,
  dataCongViec,
}) {
  const [showMore, setShowMore] = useState(true)

  const _renderShowLess = () => {
    return (
      <>
        <div className="w-full grid grid-cols-2 gap-10">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex flex-col gap-4">
              <span className="hidden text-white bg-red-600 px-4 py-1 rounded-full">
                Công việc quá hạn
              </span>
              <div className="w-full">
                <h3 className="font-semibold text-gray-700">
                  Nội dung chi tiết công việc:
                </h3>
                <textarea
                  className="border border-gray-300 rounded-md w-full p-2"
                  disabled
                  rows={12}
                  value={dataCongViec?.CV_HT_PhanCongThucHien_GhiChu}
                />
              </div>
              {/* END: Nội dung chi tiết công việc */}
              <div className="w-full">
                <h3 className="font-semibold text-gray-700 mb-1">
                  Dự án/Công việc cụ thể:
                </h3>
                <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                  {dataCongViec?.CV_HT_PhanCongThucHien_NhomThucHien}
                </p>
              </div>
              {/* END: Dự án/Công việc cụ thể */}
              <button className="flex items-center gap-2 bg-sky-700 text-white px-4 py-2 h-10 rounded-md cursor-pointer hover:opacity-80">
                <BsDownload />
                <span>Download file đề nghị kèm theo</span>
              </button>
              <div className="w-full">
                <h3 className="font-semibold text-gray-700 mb-1">
                  Tên công việc:
                </h3>
                <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                  {dataCongViec?.CV_HT_PhanCongThucHien_TenCongViec}
                </p>
              </div>
              {/* END: Tên công việc */}
              <div className="w-full">
                <h3 className="font-semibold text-gray-700 mb-1">
                  Loại công việc:
                </h3>
                <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                  {dataCongViec?.CV_HT_KhoiTaoCV_KeHoach_LoaiCongViec}
                </p>
              </div>
              {/* END: Dự án/Công việc cụ thể */}
              <button className="flex items-center gap-2 bg-sky-700 text-white px-4 py-2 h-10 rounded-md cursor-pointer hover:opacity-80">
                <BsDownload />
                <span>Download file triển khai công việc</span>
              </button>
            </div>
          </div>
          {/* END: Content left */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex flex-col gap-4">
              <div className="w-full">
                <h3 className="font-semibold text-gray-700 mb-1">
                  Nhân sự thực hiện:
                </h3>
                <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                  {dataCongViec?.CV_HT_PhanCongThucHien_NhanSuThucHien_HoTen}
                </p>
              </div>
              {/* END: Nhân sự thực hiện */}
              <div className="w-full">
                <h3 className="font-semibold text-gray-700 mb-1">Vai trò:</h3>
                <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                  {dataCongViec?.CV_HT_PhanCongThucHien_GiaoNhanViec}
                </p>
              </div>
              {/* END: Vai trò */}
              <div className="w-full">
                <h3 className="font-semibold text-gray-700 mb-1">
                  Ngày bắt đầu:
                </h3>
                <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                  {dataCongViec?.CV_HT_PhanCongThucHien_NgayBatDau
                    ? moment(
                        dataCongViec?.CV_HT_PhanCongThucHien_NgayBatDau,
                      ).format('HH:mm, DD/MM/YYYY')
                    : ''}
                </p>
              </div>
              {/* END: Ngày bắt đầu */}
              <div className="w-full">
                <h3 className="font-semibold text-gray-700 mb-1">
                  Ngày kết thúc:
                </h3>
                <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                  {dataCongViec?.CV_HT_PhanCongThucHien_NgayKetThuc
                    ? moment(
                        dataCongViec?.CV_HT_PhanCongThucHien_NgayKetThuc,
                      ).format('HH:mm, DD/MM/YYYY')
                    : ''}
                </p>
              </div>
              {/* END: Ngày kết thúc */}
              <div className="w-full">
                <h3 className="font-semibold text-gray-700">
                  Nội dung công việc chưa đạt:
                </h3>
                <textarea
                  className="border border-gray-300 rounded-md w-full"
                  rows={12}
                  value={dataCongViec?.CV_HT_PhanCongThucHien_KiemTra_MoTa}
                  disabled
                />
              </div>
              {/* END: Nội dung chi tiết công việc */}
              <button className="flex items-center gap-2 bg-sky-700 text-white px-4 py-2 h-10 rounded-md cursor-pointer hover:opacity-80">
                <BsDownload />
                <span>Download file kiểm tra công việc chưa đạt</span>
              </button>
            </div>
          </div>
          {/* END: Content right */}
        </div>
      </>
    )
  }

  const _renderShowMore = () => {
    return (
      <>
        <div className="w-full grid grid-cols-4 gap-10 lg:gap-5 mb-6">
          <div className="col-span-4 lg:col-span-1">
            <div className="relative w-full border border-dashed border-red-600 p-2 rounded-xl">
              <h3 className="absolute -top-4 right-4 text-red-600 bg-white px-2 font-semibold xl:text-xl">
                Thông tin chính công việc
              </h3>
              <div className="flex flex-col gap-4">
                <div className="w-full">
                  <h3 className="font-semibold text-gray-700">Phần trăm:</h3>
                  <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                    {dataCongViec?.CV_HT_PhanCongThucHien_XacNhan_PhanTram ?? 0}{' '}
                    %
                  </p>
                </div>
                {/* END: Phần trăm */}
                <div className="w-full">
                  <h3 className="font-semibold text-gray-700">
                    Tên công việc:
                  </h3>
                  <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                    {dataCongViec?.CV_HT_PhanCongThucHien_TenCongViec}
                  </p>
                </div>
                {/* END: Tên công việc */}
                <div className="w-full">
                  <h3 className="font-semibold text-gray-700">
                    Nội dung chi tiết công việc:
                  </h3>
                  <textarea
                    className="border border-gray-300 rounded-md w-full"
                    rows={12}
                    disabled
                    value={dataCongViec?.CV_HT_PhanCongThucHien_GhiChu}
                  />
                </div>
                {/* END: Nội dung chi tiết công việc */}
                <div className="flex items-center gap-2">
                  <div className="w-full">
                    <h3 className="font-semibold text-gray-700 mb-1">
                      Ngày bắt đầu:
                    </h3>
                    <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                      {dataCongViec?.CV_HT_PhanCongThucHien_NgayBatDau
                        ? moment(
                            dataCongViec?.CV_HT_PhanCongThucHien_NgayBatDau,
                          ).format('HH:mm, DD/MM/YYYY')
                        : ''}
                    </p>
                  </div>
                  {/* END: Ngày bắt đầu */}
                  <div className="w-full">
                    <h3 className="font-semibold text-gray-700 mb-1">
                      Ngày kết thúc:
                    </h3>
                    <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                      {dataCongViec?.CV_HT_PhanCongThucHien_NgayKetThuc
                        ? moment(
                            dataCongViec?.CV_HT_PhanCongThucHien_NgayKetThuc,
                          ).format('HH:mm, DD/MM/YYYY')
                        : ''}
                    </p>
                  </div>
                  {/* END: Ngày kết thúc */}
                </div>
                {/* END: Thời hạn công việc */}
                <div className="w-full">
                  <h3 className="font-semibold text-gray-700 mb-1">
                    Dự án/Công việc cụ thể:
                  </h3>
                  <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                    {dataCongViec?.CV_HT_PhanCongThucHien_NhomThucHien}
                  </p>
                </div>
                {/* END: Dự án/Công việc cụ thể */}
              </div>
            </div>
          </div>
          {/* END: Thông tin chính công việc */}

          <div className="col-span-4 lg:col-span-1">
            <div className="relative w-full border border-dashed border-gray-600 p-2 rounded-xl">
              <h3 className="absolute -top-4 right-4 text-gray-600 bg-white px-2 font-semibold xl:text-xl">
                Thuộc tính công việc
              </h3>
              <div className="flex flex-col gap-4 overflow-y-auto">
                <div className="flex items-center gap-2">
                  <div className="w-full">
                    <h3 className="font-semibold text-gray-700 mb-1">ID:</h3>
                    <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                      {dataCongViec?.CV_HT_PhanCongThucHien_ID}
                    </p>
                  </div>
                  {/* END: ID */}
                  <div className="w-full">
                    <h3 className="font-semibold text-gray-700 mb-1">
                      Loại công việc:
                    </h3>
                    <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                      {dataCongViec?.CV_HT_KhoiTaoCV_KeHoach_LoaiCongViec}
                    </p>
                  </div>
                  {/* END: Loại công việc */}
                </div>
                {/* END: ID - Loại công việc */}
                <div className="w-full">
                  <h3 className="font-semibold text-gray-700">
                    Nhóm công việc cha:
                  </h3>
                  <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                    {dataCongViec?.CV_HT_PhanCongThucHien_NhomCongViecCha}
                  </p>
                </div>
                {/* END: Nhóm công việc cha */}
                <div className="w-full">
                  <h3 className="font-semibold text-gray-700">
                    Nhóm công việc con:
                  </h3>
                  <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                    {dataCongViec?.CV_HT_PhanCongThucHien_NhomCongViecCon}
                  </p>
                </div>
                {/* END: Nhóm công việc con */}
                <div className="flex items-center gap-2">
                  <div className="w-full">
                    <h3 className="font-semibold text-gray-700 mb-1">
                      Ưu tiên:
                    </h3>
                    <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                      {dataCongViec?.CV_HT_PhanCongThucHien_UuTien}
                    </p>
                  </div>
                  {/* END: Ưu tiên */}
                  <div className="w-full">
                    <h3 className="font-semibold text-gray-700 mb-1">
                      Mức độ khó:
                    </h3>
                    <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                      {dataCongViec?.CV_HT_PhanCongThucHien_ThoiHan_MucDoKho}
                    </p>
                  </div>
                  {/* END: Mức độ khó */}
                </div>
                {/* END: Thời hạn công việc */}
                <div className="w-full">
                  <h3 className="font-semibold text-gray-700 mb-1">
                    Trạng thái:
                  </h3>
                  <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                    {dataCongViec?.CV_HT_PhanCongThucHien_XacNhan_TrangThai}
                  </p>
                </div>
                {/* END: Trạng thái */}
                <div className="w-full">
                  <h3 className="font-semibold text-gray-700 mb-1">
                    Số ngày thực hiện:
                  </h3>
                  <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                    {
                      dataCongViec?.CV_HT_PhanCongThucHien_ThoiHan_SoNgayThucHien
                    }
                  </p>
                </div>
                {/* END: Số ngày thực hiện */}
                <div className="w-full">
                  <h3 className="font-semibold text-gray-700 mb-1">
                    Số giờ thực hiện:
                  </h3>
                  <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                    {dataCongViec?.CV_HT_PhanCongThucHien_ThoiHan_SoGioThucHien}
                  </p>
                </div>
                {/* END: Số giờ thực hiện */}
                <div className="w-full">
                  <h3 className="font-semibold text-gray-700 mb-1">
                    Số phút thực hiện:
                  </h3>
                  <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                    {
                      dataCongViec?.CV_HT_PhanCongThucHien_ThoiHan_SoPhutThucHien
                    }
                  </p>
                </div>
                {/* END: Số phút thực hiện */}
                <div className="flex items-center gap-2">
                  <div className="w-full">
                    <h3 className="font-semibold text-gray-700 mb-1">STT1:</h3>
                    <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                      {dataCongViec?.CV_HT_PhanCongThucHien_STT1}
                    </p>
                  </div>
                  {/* END: STT1 */}
                  <div className="w-full">
                    <h3 className="font-semibold text-gray-700 mb-1">STT2:</h3>
                    <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                      {dataCongViec?.CV_HT_PhanCongThucHien_STT2}
                    </p>
                  </div>
                  {/* END: STT2 */}
                </div>
                {/* END: STT1 - STT2 */}
                <button className="flex items-center gap-2 bg-sky-700 text-white px-4 py-2 h-10 rounded-md cursor-pointer hover:opacity-80">
                  <BsDownload />
                  <span>File khởi tạo công việc</span>
                </button>
                <button className="flex items-center gap-2 bg-sky-700 text-white px-4 py-2 h-10 rounded-md cursor-pointer hover:opacity-80">
                  <BsDownload />
                  <span>File đề nghị công việc</span>
                </button>
              </div>
            </div>
          </div>
          {/* END: Thuộc tính công việc */}

          <div className="col-span-4 lg:col-span-1">
            <div className="relative w-full border border-dashed border-gray-600 p-2 rounded-xl mb-8">
              <h3 className="absolute -top-4 right-4 text-gray-600 bg-white px-2 font-semibold xl:text-xl">
                Thông tin nhân sự thực hiện
              </h3>
              <div className="flex flex-col gap-4">
                <div className="w-full">
                  <h3 className="font-semibold text-gray-700">Mã nhân sự:</h3>
                  <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                    {
                      dataCongViec?.CV_HT_PhanCongThucHien_NhanSuXacNhan_MaNhanSu
                    }
                  </p>
                </div>
                {/* END: Mã nhân sự */}
                <div className="w-full">
                  <h3 className="font-semibold text-gray-700">Tên nhân sự:</h3>
                  <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                    {dataCongViec?.CV_HT_PhanCongThucHien_NhanSuXacNhan_HoTen}
                  </p>
                </div>
                {/* END: Tên nhân sự */}
                <div className="w-full">
                  <h3 className="font-semibold text-gray-700 mb-1">
                    Nhóm chuyên môn:
                  </h3>
                  <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                    {
                      dataCongViec?.CV_HT_PhanCongThucHien_NhanSuThucHien_NhomChuyenMon
                    }
                  </p>
                </div>
                {/* END: Nhóm chuyên môn */}
                <div className="w-full">
                  <h3 className="font-semibold text-gray-700 mb-1">
                    Khả năng chuyên môn:
                  </h3>
                  <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                    {
                      dataCongViec?.CV_HT_PhanCongThucHien_NhanSuThucHien_KhaNangChuyenMon
                    }
                  </p>
                </div>
                {/* END: Khả năng chuyên môn */}
              </div>
            </div>
            {/* END: Thông tin nhân sự thực hiện */}
            <div className="relative w-full border border-dashed border-blue-600 p-2 rounded-xl">
              <h3 className="absolute -top-4 right-4 text-blue-600 bg-white px-2 font-semibold xl:text-xl">
                Xác nhận công việc
              </h3>
              <div className="flex flex-col gap-4">
                <div className="pt-2 flex gap-4">
                  <div className="w-full">
                    <h3 className="font-semibold text-gray-700">
                      Ngày xác nhận:
                    </h3>
                    <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                      {dataCongViec?.CV_HT_PhanCongThucHien_XacNhan_NgayXacNhan
                        ? dayjs(
                            dataCongViec?.CV_HT_PhanCongThucHien_XacNhan_NgayXacNhan,
                          )
                            .utc()
                            .format('HH:mm, DD/MM/YYYY')
                        : ''}
                    </p>
                  </div>
                  {/* END: Ngày xác nhận */}
                  <div className="w-full">
                    <h3 className="font-semibold text-gray-700">Xác nhận:</h3>
                    <Checkbox
                      checked={
                        dataCongViec?.CV_HT_PhanCongThucHien_XacNhan_XacNhan
                          ? true
                          : false
                      }
                      size="small"
                    />
                  </div>
                  {/* END: Ngày xác nhận */}
                </div>
                <div className="w-full">
                  <h3 className="font-semibold text-gray-700">Mã nhân sự:</h3>
                  <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                    {
                      dataCongViec?.CV_HT_PhanCongThucHien_NhanSuXacNhan_MaNhanSu
                    }
                  </p>
                </div>
                {/* END: Mã nhân sự */}
                <div className="w-full">
                  <h3 className="font-semibold text-gray-700">Tên nhân sự:</h3>
                  <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                    {dataCongViec?.CV_HT_PhanCongThucHien_NhanSuXacNhan_HoTen}
                  </p>
                </div>
                {/* END: Tên nhân sự */}
                <button className="flex items-center gap-2 bg-sky-700 text-white px-4 py-2 h-10 rounded-md cursor-pointer hover:opacity-80">
                  <BsDownload />
                  <span>File xác nhận công việc</span>
                </button>
                <div className="w-full">
                  <h3 className="font-semibold text-gray-700 mb-1">
                    Mô tả xác nhận:
                  </h3>
                  <textarea
                    value={dataCongViec?.CV_HT_PhanCongThucHien_XacNhan_MoTa}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100"
                    rows={6}
                    disabled
                  />
                </div>
                {/* END: Mô tả xác nhận */}
              </div>
            </div>
          </div>
          {/* END: Thông tin nhân sự thực hiện - Xác nhận công việc */}

          <div className="col-span-4 lg:col-span-1">
            <div className="relative w-full border border-dashed border-green-600 p-2 rounded-xl mb-8">
              <h3 className="absolute -top-4 right-4 text-green-600 bg-white px-2 font-semibold xl:text-xl">
                Kiểm tra công việc
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 pt-2">
                  <div className="w-full">
                    <h3 className="font-semibold text-gray-700">
                      Ngày kiểm tra:
                    </h3>
                    <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                      {dataCongViec?.CV_HT_PhanCongThucHien_KiemTra_NgayKiemTra
                        ? moment(
                            dataCongViec?.CV_HT_PhanCongThucHien_KiemTra_NgayKiemTra,
                          ).format('HH:mm, DD/MM/YYYY')
                        : ''}
                    </p>
                  </div>
                  {/* END: Ngày kiểm tra */}
                  <div className="w-full">
                    <h3 className="font-semibold text-gray-700">Kiểm tra:</h3>
                    <Checkbox
                      checked={
                        dataCongViec?.CV_HT_PhanCongThucHien_KiemTra_XacNhan
                          ? true
                          : false
                      }
                      size="small"
                    />
                  </div>
                  {/* END: Kiểm tra */}
                </div>
                {/* END: Ngày kiểm tra - xác nhận */}
                <div className="w-full">
                  <h3 className="font-semibold text-gray-700">Mã nhân sự:</h3>
                  <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                    {
                      dataCongViec?.CV_HT_PhanCongThucHien_NhanSuKiemTra_MaNhanSu
                    }
                  </p>
                </div>
                {/* END: Mã nhân sự */}
                <div className="w-full">
                  <h3 className="font-semibold text-gray-700">Tên nhân sự:</h3>
                  <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                    {dataCongViec?.CV_HT_PhanCongThucHien_NhanSuKiemTra_HoTen}
                  </p>
                </div>
                {/* END: Tên nhân sự */}
                <button className="flex items-center gap-2 bg-sky-700 text-white px-4 py-2 h-10 rounded-md cursor-pointer hover:opacity-80">
                  <BsDownload />
                  <span>File kiểm tra công việc</span>
                </button>
                <div className="w-full">
                  <h3 className="font-semibold text-gray-700 mb-1">
                    Mô tả kiểm tra:
                  </h3>
                  <textarea
                    value={dataCongViec?.CV_HT_PhanCongThucHien_KiemTra_MoTa}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100"
                    rows={6}
                    disabled
                  />
                </div>
                {/* END: Mô tả kiểm tra */}
              </div>
            </div>
            {/* END: Kiểm tra công việc */}
            <div className="relative w-full border border-dashed border-green-600 p-2 rounded-xl mb-8">
              <h3 className="absolute -top-4 right-4 text-green-600 bg-white px-2 font-semibold xl:text-xl">
                Đánh giá công việc
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 pt-2">
                  <div className="w-full">
                    <h3 className="font-semibold text-gray-700">
                      Ngày đánh giá:
                    </h3>
                    <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                      {dataCongViec?.CV_HT_PhanCongThucHien_DanhGia_NgayDanhGia
                        ? moment(
                            dataCongViec?.CV_HT_PhanCongThucHien_DanhGia_NgayDanhGia,
                          ).format('HH:mm, DD/MM/YYYY')
                        : ''}
                    </p>
                  </div>
                  {/* END: Ngày Đánh giá */}
                  <div className="w-full">
                    <h3 className="font-semibold text-gray-700">Đánh giá:</h3>
                    <Checkbox
                      checked={
                        dataCongViec?.CV_HT_PhanCongThucHien_DanhGia_XacNhan
                          ? true
                          : false
                      }
                      size="small"
                    />
                  </div>
                  {/* END: Đánh giá */}
                </div>
                {/* END: Ngày Đánh giá - xác nhận */}
                <div className="w-full">
                  <h3 className="font-semibold text-gray-700">Mã nhân sự:</h3>
                  <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                    {
                      dataCongViec?.CV_HT_PhanCongThucHien_NhanSuDanhGia_MaNhanSu
                    }
                  </p>
                </div>
                {/* END: Mã nhân sự */}
                <div className="w-full">
                  <h3 className="font-semibold text-gray-700">Tên nhân sự:</h3>
                  <p className="px-4 py-2 h-10 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100">
                    {dataCongViec?.CV_HT_PhanCongThucHien_NhanSuDanhGia_HoTen}
                  </p>
                </div>
                {/* END: Tên nhân sự */}
                <button className="flex items-center gap-2 bg-sky-700 text-white px-4 py-2 h-10 rounded-md cursor-pointer hover:opacity-80">
                  <BsDownload />
                  <span>File Đánh giá công việc</span>
                </button>
                <div className="w-full">
                  <h3 className="font-semibold text-gray-700 mb-1">
                    Mô tả đánh giá:
                  </h3>
                  <textarea
                    value={dataCongViec?.CV_HT_PhanCongThucHien_DanhGia_MoTa}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl text-gray-800 font-semibold bg-slate-100"
                    rows={6}
                    disabled
                  />
                </div>
                {/* END: Mô tả Đánh giá */}
              </div>
            </div>
          </div>
          {/* END: Kiểm tra công việc - Đánh giá công việc */}
        </div>
      </>
    )
  }

  return (
    <div
      className={clsx(
        open ? 'block' : 'hidden',
        'w-full fixed z-50 inset-0 bg-slate-500/30 p-2 lg:p-10 flex items-center justify-center',
      )}
    >
      <div
        className={clsx(
          'relative overflow-hidden bg-white rounded-xl h-[700px] lg:h-[900px]',
          showMore ? 'w-full' : 'w-full lg:w-1/2',
        )}
      >
        <div className="bg-sky-700 rounded-t-xl p-4 sticky top-0">
          <h3 className="text-white text-lg lg:text-xl font-bold text-center">
            Chi tiết công việc
            <span
              className={clsx(
                'lg:absolute mt-1 left-4 top-4 text-red-600 text-sm font-bold cursor-pointer block bg-red-50 border-2 border-red-600 px-4 py-1 rounded-xl',
                !dataCongViec?.CV_HT_PhanCongThucHien_QuaHan && 'hidden',
              )}
            >
              {dataCongViec?.CV_HT_PhanCongThucHien_QuaHan
                ? 'Công việc quá hạn'
                : ''}
            </span>
          </h3>
        </div>
        {/* END: Header */}
        <div className="p-4 h-[580px] lg:h-[780px] overflow-y-auto">
          {showMore ? _renderShowMore() : _renderShowLess()}
        </div>
        {/* END: Body */}
        <div className="bg-slate-200 rounded-b-xl p-4 flex gap-4 justify-end absolute bottom-0 left-0 right-0">
          <Button
            onClick={() => {
              onClose && onClose()
              setShowMore(true)
            }}
          >
            Đóng
          </Button>
          <Button onClick={() => setShowMore(!showMore)}>
            {showMore ? 'Ẩn bớt' : 'Xem thêm'}
          </Button>
        </div>
        {/* END: Footer */}
      </div>
    </div>
  )
})

export default ChiTietCongViec

import Accordion from '@/Components/Base/Accordion/Accordion'
import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import { useState } from 'react'
import Dialog from '@/Components/Base/Dialog/Dialog'
import './DiemDanh.scss'
import { getDiemDanhChiTiket } from '@/Apis/TraCuu/apiDiemDanh'
import clsx from 'clsx'
import Swal from 'sweetalert2'
import dayjs from 'dayjs'
function DiemDanhView(props) {
  const { home, breadcrumbs, listDiemDanh, listHocKy, IDSinhVien } = props
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [diemDanhChiTiet, setDiemDanhChiTiet] = useState(null)
  const [sumCoPhep, setSumCoPhep] = useState(0)
  const [sumKhongPhep, setSumKhongPhep] = useState(0)
  const [sumToTal, setSumToTal] = useState(0)
  const handleOpenModalChiTietDiemDanh = async (
    TC_SV_KetQuaHocTap_IDLopHocPhan,
  ) => {
    setIsOpenDialog(true)
    setDiemDanhChiTiet([])
    setSumCoPhep(0)
    setSumKhongPhep(0)
    setSumToTal(0)
    try {
      const res = await getDiemDanhChiTiket(
        IDSinhVien,
        TC_SV_KetQuaHocTap_IDLopHocPhan,
      )
      const data = await res.data?.body
      if (data?.length > 0) {
        setDiemDanhChiTiet(data)
        setSumCoPhep(data?.reduce((a, b) => a + b?.CoPhep, 0))
        setSumKhongPhep(data?.reduce((a, b) => a + b?.KhongPhep, 0))
        setSumToTal(data?.reduce((a, b) => a + b?.Tong, 0))
      } else {
        setDiemDanhChiTiet([])
        setSumCoPhep(0)
        setSumKhongPhep(0)
        setSumToTal(0)
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Có lỗi xảy ra!',
        text: 'Vui lòng liên hệ bộ phận kỹ thuật để khắc phục!',
      })
    }
  }

  return (
    <div className="bg-white shadow-module-item rounded-md">
      <div className="p-4 flex flex-col">
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />
        <div className="w-full rounded-md mt-4 p-3 flex flex-col justify-center items-center">
          <h3 className="text-3xl uppercase text-center mb-4 font-semibold my-3 text-uneti-primary">
            THÔNG TIN ĐIỂM DANH
          </h3>
          <div className="w-full">
            {listHocKy.length
              ? listHocKy.map((hk, index) => (
                  <Accordion key={index} className="mb-2">
                    <Accordion.Label className="bg-uneti-primary text-white">
                      Học kỳ {hk.hocKy}
                    </Accordion.Label>
                    <Accordion.Content>
                      <div className="w-full min-h-[300px] my-4 overflow-x-scroll rounded-2xl border border-solid border-uneti-primary border-opacity-30">
                        <table className="text-vs-text text-sm rounded-3xl">
                          <thead className="font-semibold">
                            <tr>
                              <th
                                rowSpan={2}
                                className=" py-4 min-w-[130px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-t-0 border-l-0"
                              >
                                Mã lớp học phần
                              </th>
                              <th
                                rowSpan={2}
                                className=" py-4 min-w-[200px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-t-0"
                              >
                                Tên lớp học phần
                              </th>
                              <th
                                rowSpan={2}
                                className=" py-4 min-w-[160px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-t-0"
                              >
                                Tên lớp học
                              </th>
                              <th
                                rowSpan={2}
                                className=" py-4 min-w-[60px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-t-0"
                              >
                                Số tín chỉ
                              </th>
                              <th
                                rowSpan={2}
                                className=" py-4 min-w-[120px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-t-0"
                              >
                                Giảng viên giảng dạy
                              </th>
                              <th
                                colSpan={3}
                                className=" py-4 min-w-[140px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-t-0 border-r"
                              >
                                Số buổi nghỉ
                              </th>
                              <th
                                rowSpan={2}
                                className=" py-4 min-w-[80px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-t-0 border-l-0"
                              >
                                Tổng số tiết vắng theo học phần
                              </th>
                              <th
                                rowSpan={2}
                                className=" py-4 min-w-[80px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-t-0 border-l-0"
                              >
                                Tổng số tiết theo học phần
                              </th>
                              <th
                                rowSpan={2}
                                className=" py-4 min-w-[80px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-t-0 border-l-0"
                              >
                                % vắng theo lớp học phần
                              </th>

                              <th
                                rowSpan={2}
                                className="py-4 min-w-[60px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-t-0 border-l-0"
                              >
                                Chi tiết
                              </th>
                            </tr>
                            <tr>
                              <th className=" py-4 px-2 w-[5px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30 border-l-0">
                                Có phép
                              </th>
                              <th className=" py-4 px-2 w-[5px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30">
                                Không phép
                              </th>
                              <th className=" py-4 px-2 w-[40px] bg-[#F0FBFF] border border-solid border-uneti-primary border-opacity-30">
                                Tổng số ca nghỉ
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {listDiemDanh.map((mh, i) => {
                              if (
                                mh.TC_SV_KetQuaHocTap_DiemDanhSinhVien_TenDot ===
                                hk.hocKy
                              ) {
                                return (
                                  <tr
                                    key={i}
                                    className="hover:bg-slate-200 cursor-pointer transition-all duration-[100ms]"
                                  >
                                    <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0 border-l-0">
                                      {
                                        mh.TC_SV_KetQuaHocTap_DiemDanhSinhVien_MaLopHocPhan
                                      }
                                    </td>
                                    <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                                      {
                                        mh.TC_SV_KetQuaHocTap_DiemDanhSinhVien_TenLopHocPhan
                                      }
                                    </td>
                                    <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                                      {
                                        mh.TC_SV_KetQuaHocTap_DiemDanhSinhVien_TenLopHoc
                                      }
                                    </td>
                                    <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                                      {
                                        mh.TC_SV_KetQuaHocTap_DiemDanhSinhVien_SoTinChi
                                      }
                                    </td>
                                    <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                                      {
                                        mh.TC_SV_KetQuaHocTap_DiemDanhSinhVien_TenGiangVien
                                      }
                                    </td>
                                    <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                                      {
                                        mh.TC_SV_KetQuaHocTap_DiemDanhSinhVien_CoPhep
                                      }
                                    </td>
                                    <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                                      {
                                        mh.TC_SV_KetQuaHocTap_DiemDanhSinhVien_KhongPhep
                                      }
                                    </td>
                                    <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                                      {
                                        mh.TC_SV_KetQuaHocTap_DiemDanhSinhVien_TongNghi
                                      }
                                    </td>
                                    <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                                      {
                                        mh.TC_SV_KetQuaHocTap_DiemDanhSinhVien_SoTietNghi
                                      }
                                    </td>
                                    <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                                      {
                                        mh.TC_SV_KetQuaHocTap_DiemDanhSinhVien_SoTiet
                                      }
                                    </td>
                                    <td className=" py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0">
                                      {mh.TC_SV_KetQuaHocTap_DiemDanhSinhVien_PhanTramVang +
                                        '%'}
                                    </td>

                                    <td
                                      className={clsx(
                                        'py-2 px-2 text-center border border-solid border-uneti-primary border-opacity-30 border-b-0',
                                      )}
                                    >
                                      <p
                                        onClick={() =>
                                          handleOpenModalChiTietDiemDanh(
                                            mh.TC_SV_KetQuaHocTap_DiemDanhSinhVien_IDLopHocPhan,
                                          )
                                        }
                                        className="text-blue-500 font-semibold"
                                      >
                                        Xem chi tiết
                                      </p>
                                    </td>
                                  </tr>
                                )
                              }
                              return null
                            })}
                            <tr className="hidden">
                              <td
                                className="font-semibold text-center py-2 px-4 border border-solid border-uneti-primary border-opacity-30 border-b-0 border-l-0"
                                colSpan={5}
                              >
                                Tổng
                              </td>
                              <td className="text-center font-semibold py-2 px-4 border border-solid border-uneti-primary border-opacity-30 border-b-0 border-l-0">
                                {hk.coPhep}
                              </td>
                              <td className="text-center font-semibold py-2 px-4 border border-solid border-uneti-primary border-opacity-30 border-b-0 border-l-0">
                                {hk.khongPhep}
                              </td>
                              <td className="text-center font-semibold py-2 px-4 border border-solid border-uneti-primary border-opacity-30 border-b-0 border-l-0">
                                {hk.tong}
                              </td>
                              <td
                                colSpan={4}
                                className="text-center font-semibold py-2 px-4 border border-solid border-uneti-primary border-opacity-30 border-b-0 border-l-0"
                              ></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </Accordion.Content>
                  </Accordion>
                ))
              : null}
          </div>
        </div>
      </div>

      {/* START: Dialog Điểm danh chi tiết */}
      <Dialog isOpen={isOpenDialog} setIsOpen={setIsOpenDialog}>
        <div className="overflow-x-scroll">
          <table className={`border-2 border-slate-200`}>
            <thead>
              <tr>
                <th
                  rowSpan={2}
                  className="border p-3 sticky top-0 z-[2] min-w-[50px]"
                >
                  Ngày học
                </th>
                <th
                  rowSpan={2}
                  className={`border shadow-scroll-th p-3 sticky top-0 left-0 z-[3] min-w-[100px]`}
                >
                  Thứ
                </th>
                <th
                  rowSpan={2}
                  className="border p-3 sticky top-0 z-[2] min-w-[80px]"
                >
                  Từ tiết đến tiết
                </th>
                <th
                  colSpan={4}
                  className="border p-3 sticky top-0 z-[2] min-w-[80px]"
                >
                  Số tiết nghỉ
                </th>
              </tr>
              <tr>
                <th className="border p-3 sticky top-0 z-[2] min-w-[80px]">
                  Có Phép
                </th>
                <th className="border p-3 sticky top-0 z-[2] min-w-[80px]">
                  Không phép
                </th>
                <th className="border p-3 sticky top-0 z-[2] min-w-[80px]">
                  Tổng
                </th>
                <th className="border p-3 sticky top-0 z-[2] min-w-[80px]">
                  Lý do
                </th>
              </tr>
            </thead>
            <tbody>
              {diemDanhChiTiet?.length && diemDanhChiTiet.length > 0 ? (
                <>
                  {diemDanhChiTiet.map((item) => {
                    return (
                      <tr key={item.NgayDiemDanh}>
                        <td className="border p-3 sticky top-0 z-[2] min-w-[50px]">
                          {item?.NgayDiemDanh
                            ? dayjs(item?.NgayDiemDanh).format('DD/MM/YYYY')
                            : 'Không xác định'}
                        </td>
                        <td className="border p-3 sticky top-0 z-[2] w-[20px] text-center">
                          {item?.Thu ? item?.Thu : 'Không xác định'}
                        </td>
                        <td className="border p-3 sticky top-0 z-[2] min-w-[80px] text-center">
                          {item?.TuTiet && item?.DenTiet
                            ? item?.TuTiet + ' - ' + item?.DenTiet
                            : 'Không xác định'}
                        </td>
                        <td className="border p-3 sticky top-0 z-[2] min-w-[80px] text-center">
                          {item?.CoPhep ?? 0}
                        </td>
                        <td className="border p-3 sticky top-0 z-[2] min-w-[80px] text-center">
                          {item?.KhongPhep ?? 0}
                        </td>
                        <td className="border p-3 sticky top-0 z-[2] min-w-[80px] text-center">
                          {item?.Tong ?? 0}
                        </td>
                        <td className="border p-3 sticky top-0 z-[2] min-w-[80px]">
                          {item?.LyDo ?? ''}
                        </td>
                      </tr>
                    )
                  })}
                </>
              ) : (
                <tr>
                  <th colSpan={7} className="p-2 text-uneti-primary-lighter">
                    Hiện tại không có thông tin điểm danh chi tiết cho môn học
                    này.
                  </th>
                </tr>
              )}
              <tr>
                <th
                  colSpan={3}
                  className="border p-3 sticky top-0 z-[2] min-w-[80px] text-center"
                >
                  Tổng số tiết nghỉ
                </th>
                <td className="border p-3 sticky top-0 z-[2] min-w-[80px] text-center">
                  {sumCoPhep}
                </td>
                <td className="border p-3 sticky top-0 z-[2] min-w-[80px] text-center">
                  {sumKhongPhep}
                </td>
                <td className="border p-3 sticky top-0 z-[2] min-w-[80px] text-center">
                  {sumToTal}
                </td>
                <td className="border p-3 sticky top-0 z-[2] min-w-[80px] text-center"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Dialog>
      {/* END: Dialog Điểm danh chi tiết */}
    </div>
  )
}

export default DiemDanhView

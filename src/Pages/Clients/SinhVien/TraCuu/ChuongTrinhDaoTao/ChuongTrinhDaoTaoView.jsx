import Accordion from '@/Components/Base/Accordion/Accordion'
import CommonLayout from '@/Layouts/Common/CommonLayout'
import { keys } from 'lodash-unified'

import './ChuongTrinhDaoTao.scss'
import { useNamespace } from '@/Services/Hooks'
import Icon from '@/Components/Base/Icon/Icon'
import TickCircle from '@/Components/Base/Icons/TickCircle'
import { useEffect, useState } from 'react'
import { Tooltip } from '@mui/material'
import Dialog from '@/Components/Base/Dialog/Dialog'
import Loading from '@/Components/Loading/Loading'
import clsx from 'clsx'

const ChuongTrinhDaoTaoView = ({
  chuongTrinhDaoTao,
  listChuongTrinhDaoTaoGoc = [],
  sinhVienKhoa,
  loading,
}) => {
  // check log
  // console.log('>>>chuongTrinhDaoTao: ', chuongTrinhDaoTao)

  const home = {
    path: '/uneti',
    title: 'Trang chủ',
  }

  const breadcrumbs = [
    {
      path: '/tra-cuu',
      title: 'Tra cứu',
    },
    {
      path: '/tra-cuu/chuong-trinh-dao-tao',
      title: 'Chương trình đào tạo',
    },
  ]

  const ns = useNamespace('ctdt')

  const [state, setState] = useState({
    NganhHoc: '',
    KhoaHoc: '',
    DuDieuKienThiCDRTiengAnh: '',
    SoTinChi: 0,
    SoTinChiTinhTBC: 0,
    SoTinChiKhongTinhTBC: 0,
  })
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [monTuongDuong, setMonTuongDuong] = useState([])

  const handleOpenDialogXemMonHocTD = (monTuongDuong) => {
    setMonTuongDuong(monTuongDuong)
    setIsOpenDialog(true)
  }

  useEffect(() => {
    const obj = {
      NganhHoc: listChuongTrinhDaoTaoGoc?.[0]?.NganhHoc,
      KhoaHoc: listChuongTrinhDaoTaoGoc?.[0]?.KhoaHoc,
      SoTinChi: 0,
      SoTinChiTinhTBC: 0,
      SoTinChiKhongTinhTBC: 0,
    }
    let totalTiengAnhCDR = 0
    let successTiengAnhCDR = 0
    let countTinChiChuyeNganhRieng = 0
    let countSTCTinhTBChuyenNganhRieng = 0
    let countSTCKhongTinhTBChuyenNganhRieng = 0
    let listLoaiChuyeNganhRieng = []
    let totalSoTinChiChung = 0
    let totalSoTinChiTinhTBC = 0
    let totalSoTinChiKhongTinhTBC = 0

    listChuongTrinhDaoTaoGoc.forEach((item) => {
      // Kiểm tra loại ngành học khác 'Bắt buộc' và không trùng với danh sách đã có
      if (item.LoaiNganhHoc !== 'Bắt buộc') {
        listLoaiChuyeNganhRieng.push(item.LoaiNganhHoc)
        listLoaiChuyeNganhRieng = [...new Set(listLoaiChuyeNganhRieng)]
      }

      // Tính tổng số tín chỉ
      if (item.LoaiHocPhan !== 'Chuyên ngành riêng') {
        obj.SoTinChi += item.SoTinChi
      } else {
        countTinChiChuyeNganhRieng += item.SoTinChi
      }
      totalSoTinChiChung =
        parseInt(obj.SoTinChi) +
        parseInt(countTinChiChuyeNganhRieng / listLoaiChuyeNganhRieng?.length)

      // Tính số tín chỉ: Tính TBC và không tính TBC
      if (item.IsTinhTBC) {
        if (item.LoaiHocPhan !== 'Chuyên ngành riêng') {
          obj.SoTinChiTinhTBC += item.SoTinChi
        } else {
          countSTCTinhTBChuyenNganhRieng += item.SoTinChi
        }
      } else {
        if (item.LoaiHocPhan !== 'Chuyên ngành riêng') {
          obj.SoTinChiKhongTinhTBC += item.SoTinChi
        } else {
          countSTCKhongTinhTBChuyenNganhRieng += item.SoTinChi
        }
      }
      totalSoTinChiTinhTBC =
        parseInt(obj.SoTinChiTinhTBC) +
        parseInt(
          countSTCTinhTBChuyenNganhRieng / listLoaiChuyeNganhRieng?.length,
        )
      totalSoTinChiKhongTinhTBC =
        parseInt(obj.SoTinChiKhongTinhTBC) +
        parseInt(
          countSTCKhongTinhTBChuyenNganhRieng / listLoaiChuyeNganhRieng?.length,
        )

      if (
        item.Khoa.toLowerCase().includes('ngoại ngữ') ||
        item.Khoa.toLowerCase().includes('nn')
      ) {
        totalTiengAnhCDR += 1
        if (item.DiemTongKet >= 4) successTiengAnhCDR += 1
      }
    })

    setState({
      ...obj,
      SoTinChi: totalSoTinChiChung,
      SoTinChiTinhTBC: totalSoTinChiTinhTBC,
      SoTinChiKhongTinhTBC: totalSoTinChiKhongTinhTBC,
      DuDieuKienThiCDRTiengAnh: `${successTiengAnhCDR}/${totalTiengAnhCDR} ${+successTiengAnhCDR === +totalTiengAnhCDR ? ' - Đủ điều kiện' : ' - Chưa đủ điều kiện'}`,
    })
  }, [listChuongTrinhDaoTaoGoc])

  return (
    <>
      <CommonLayout home={home} breadcrumbs={breadcrumbs}>
        <div>
          <h3 className="text-center text-lg uppercase text-uneti-primary-light font-bold">
            <p>Chương trình đào tạo</p>
            <p>Ngành {state.NganhHoc}</p>
          </h3>
          <div className="mt-4">
            <h3 className="w-full p-2 bg-uneti-primary text-white rounded-lg">
              1. Thông tin chung
            </h3>

            <div className="ml-6 mt-2 flex flex-col gap-2">
              <p>
                Áp dụng cho khóa:
                <span className="text-blue-600 font-medium ml-2">
                  {state.KhoaHoc}
                </span>
                <sup className="pl-1">(1)</sup>
              </p>
              <p>
                Tổng số tín chỉ:
                <span className="text-blue-600 font-medium ml-2">
                  {state.SoTinChi}
                </span>
                <sup className="pl-1">(2)</sup>
              </p>
              <p>
                Tổng số tín chỉ tính trung bình chung tích lũy:
                <span className="text-blue-600 font-medium ml-2">
                  {state.SoTinChiTinhTBC}
                </span>
                <sup className="pl-1">(3)</sup>
              </p>
              <p>
                Tổng số tín chỉ không tính trung bình chung tích lũy:
                <span className="text-blue-600 font-medium ml-2">
                  {state.SoTinChiKhongTinhTBC}
                </span>
                <sup className="pl-1">(4)</sup>
              </p>
              <p>
                Đủ điều kiện thi Chuẩn đầu ra Tiếng Anh:
                <span className="text-blue-600 font-medium ml-2">
                  {sinhVienKhoa === '' ? '' : state.DuDieuKienThiCDRTiengAnh}
                </span>
                <sup className="px-1">(5)</sup>
                <span> - (Không áp dụng cho sinh viên ngành Ngôn ngữ Anh)</span>
              </p>
            </div>
          </div>
        </div>
        {/* END: header - Thông tin chung */}
        {loading && <Loading />}
        {keys(chuongTrinhDaoTao).map((nganhHoc) => {
          return (
            <div key={nganhHoc} className="my-4">
              <div className="bg-uneti-primary text-white rounded-lg p-2 pl-3 cursor-default">
                <h3>2. Thông tin chi tiết</h3>
              </div>
              <div className="pt-1 ml-3 flex flex-col gap-1">
                {keys(chuongTrinhDaoTao[nganhHoc]).map((loaiHocPhan) => (
                  <Accordion key={loaiHocPhan}>
                    <Accordion.Label
                      showIcon={true}
                      className="bg-uneti-primary text-white !p-1 !pl-4 !rounded-lg !underline mb-4"
                    >
                      <div>
                        Loại học phần:{' '}
                        <span className="font-medium">{loaiHocPhan}</span>
                      </div>
                    </Accordion.Label>
                    <Accordion.Content>
                      <div className="">
                        {keys(chuongTrinhDaoTao[nganhHoc][loaiHocPhan]).map(
                          (loaiMonHoc, i) => {
                            let tongSoTinChi = 0,
                              soMonTinhTBC = 0,
                              soMonBatBuoc = 0,
                              soTietLT = 0,
                              soTietTH = 0,
                              soTietTuHoc = 0,
                              soMonDat = 0
                            return (
                              <div className="-py-8 mt-4" key={i}>
                                <div
                                  className={clsx(
                                    '!pl-16 bg-uneti-primary-lighter text-white font-semibold rounded-sm ml-3',
                                    loaiHocPhan === 'Chuyên ngành riêng'
                                      ? 'block'
                                      : 'hidden',
                                  )}
                                >
                                  <p className="py-2">
                                    Loại chuyên ngành:{' '}
                                    <span className="font-medium">
                                      {loaiMonHoc}
                                    </span>
                                  </p>
                                </div>
                                {/* END: Header Loại chuyên ngành */}
                                <div
                                  key={i}
                                  className="p-3 pr-0 overflow-hidden rounded-xl"
                                >
                                  <div className="overflow-scroll max-h-[400px]">
                                    <table
                                      key={loaiMonHoc}
                                      className={`border-2 border-slate-200 ${ns.e('table')}`}
                                    >
                                      <thead>
                                        <tr>
                                          <th className="border p-3 sticky top-0 z-[2] min-w-[80px]">
                                            Lọai môn học
                                          </th>
                                          <th
                                            className={`border shadow-scroll-th p-3 sticky top-0 left-0 z-[3] w-[100px]`}
                                          >
                                            STT
                                          </th>
                                          <th
                                            className={`border shadow-scroll-th p-3 sticky top-0 left-0 z-[3] min-w-[160px]`}
                                          >
                                            Tên học phần
                                          </th>
                                          <th className="border p-3 sticky top-0 z-[2] min-w-[80px]">
                                            Mã học phần
                                          </th>
                                          <th className="border p-3 sticky top-0 z-[2] min-w-[160px]">
                                            Khoa chủ quản
                                          </th>
                                          <th className="border p-3 sticky top-0 z-[2] w-[70px]">
                                            Số tín chỉ
                                          </th>
                                          <th className="border p-3 sticky top-0 z-[2] min-w-[80px]">
                                            <Tooltip title="Môn học có tính vào điểm trung bình chung tích lũy hay không">
                                              <span>Tính TBC</span>
                                            </Tooltip>
                                          </th>
                                          <th className="border p-3 sticky top-0 z-[2] w-[80px]">
                                            <Tooltip title="Số tiết lý thuyết">
                                              <span>Tiết LT</span>
                                            </Tooltip>
                                          </th>
                                          <th className="border p-3 sticky top-0 z-[2] w-[80px]">
                                            <Tooltip title="Số tiết tự học">
                                              <span>Tiết tự học/LT</span>
                                            </Tooltip>
                                          </th>
                                          <th className="border p-3 sticky top-0 z-[2] w-[80px]">
                                            <Tooltip title="Số tiết thực hành">
                                              <span>Tiết TH</span>
                                            </Tooltip>
                                          </th>
                                          <th className="border p-3 sticky top-0 z-[2] w-[80px]">
                                            Điểm hệ 4
                                          </th>
                                          <th className="border p-3 sticky top-0 z-[2] w-[80px]">
                                            Đạt
                                          </th>
                                          <th className="border p-3 sticky top-0 z-[2] w-[90px]">
                                            Bắt buộc
                                          </th>
                                          <th className="border p-3 sticky top-0 z-[2] w-[90px]">
                                            <Tooltip title="Xem môn học tương đương">
                                              <span>Có môn học TĐ</span>
                                            </Tooltip>
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {chuongTrinhDaoTao[nganhHoc][
                                          loaiHocPhan
                                        ][loaiMonHoc].map((monHoc, i) => {
                                          tongSoTinChi += monHoc.SoTinChi
                                          soMonTinhTBC += monHoc.IsTinhTBC
                                            ? 1
                                            : 0
                                          soMonBatBuoc += monHoc.BatBuoc ? 1 : 0
                                          soTietLT += monHoc.SoTietLyThuyet
                                          soTietTH += monHoc.SoTietThucHanh
                                          soTietTuHoc += monHoc.SoTietTuHoc
                                          soMonDat +=
                                            Number(monHoc.DiemTongKet) > 4

                                          return (
                                            <tr key={i}>
                                              {i == 0 && (
                                                <td
                                                  className="border p-3 !text-white !bg-uneti-primary align-top"
                                                  rowSpan={
                                                    chuongTrinhDaoTao[nganhHoc][
                                                      loaiHocPhan
                                                    ][loaiMonHoc].length + 1
                                                  }
                                                >
                                                  <div className="h-full max-h-[200px] sticky top-[120px]">
                                                    {monHoc.LoaiMonHoc}
                                                  </div>
                                                </td>
                                              )}
                                              <td
                                                className={`left-0 sticky z-[1] shadow-scroll-td`}
                                              >
                                                <div>{i + 1}</div>
                                              </td>
                                              <td
                                                className={`left-0 sticky z-[1] shadow-scroll-td`}
                                              >
                                                <div>{monHoc.TenHocPhan}</div>
                                              </td>
                                              <td>
                                                <div>{monHoc.MaHocPhan}</div>
                                              </td>
                                              <td>
                                                <div>{monHoc.Khoa}</div>
                                              </td>
                                              <td>
                                                <div>{monHoc.SoTinChi}</div>
                                              </td>
                                              <td>
                                                <div>
                                                  {monHoc.IsTinhTBC ? (
                                                    <Icon>
                                                      <TickCircle />
                                                    </Icon>
                                                  ) : (
                                                    ''
                                                  )}
                                                </div>
                                              </td>
                                              <td>
                                                <div>
                                                  {monHoc.SoTietLyThuyet}
                                                </div>
                                              </td>
                                              <td>
                                                <div>{monHoc.SoTietTuHoc}</div>
                                              </td>
                                              <td>
                                                <div>
                                                  {monHoc.SoTietThucHanh}
                                                </div>
                                              </td>
                                              <td>
                                                <div>{monHoc.DiemTinChi}</div>
                                              </td>
                                              <td>
                                                <div>
                                                  {monHoc.DiemTongKet == null
                                                    ? ''
                                                    : Number(
                                                          monHoc.DiemTongKet,
                                                        ) > 4
                                                      ? 'Đạt'
                                                      : 'Không đạt'}
                                                </div>
                                              </td>
                                              <td>
                                                <div>
                                                  {monHoc.BatBuoc ? (
                                                    <Icon>
                                                      <TickCircle />
                                                    </Icon>
                                                  ) : (
                                                    ''
                                                  )}
                                                </div>
                                              </td>
                                              <td>
                                                <div>
                                                  {monHoc.IsMonTuongDuong && (
                                                    <span
                                                      onClick={() =>
                                                        handleOpenDialogXemMonHocTD(
                                                          monHoc.MonTuongDuong,
                                                        )
                                                      }
                                                      className="underline text-uneti-primary p-1 cursor-pointer"
                                                    >
                                                      Xem
                                                    </span>
                                                  )}
                                                </div>
                                              </td>
                                            </tr>
                                          )
                                        })}
                                        <tr>
                                          <td colSpan={4}>
                                            <div>Tổng</div>
                                          </td>
                                          <td>
                                            <div>{tongSoTinChi}</div>
                                          </td>
                                          <td>
                                            <div>{soMonTinhTBC}</div>
                                          </td>
                                          <td>
                                            <div>{soTietLT}</div>
                                          </td>
                                          <td>
                                            <div>{soTietTuHoc}</div>
                                          </td>
                                          <td>
                                            <div>{soTietTH}</div>
                                          </td>
                                          <td>
                                            <div></div>
                                          </td>
                                          <td>
                                            <div>{soMonDat}</div>
                                          </td>
                                          <td>
                                            <div>{soMonBatBuoc}</div>
                                          </td>
                                          <td>
                                            <div></div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                                {/* END: Content Môn học chuyên ngành */}
                              </div>
                            )
                          },
                        )}
                      </div>
                    </Accordion.Content>
                  </Accordion>
                ))}
              </div>

              <div className="mt-3">
                <p className="text-red-500 font-semibold">
                  <span>(*)</span> <i>Chú thích</i>:
                </p>
                <ul className="ml-3 flex flex-col gap-3">
                  <li>
                    (1): Chương trình khung hiện tại đang áp dụng cho khóa tuyển
                    sinh năm {state.KhoaHoc}
                  </li>
                  <li>
                    (2): Tổng số tín chỉ bắt buộc là tổng số tín chỉ cần tích
                    lũy đạt được để đủ điều kiện tốt nghiệp
                  </li>
                  <li>
                    (3) : Tổng số tín chỉ tính trung bình chung tích lũy là tổng
                    số tín chỉ được tính vào điểm trung bình tích lũy để xếp
                    loại học lực
                  </li>
                  <li>
                    (4) : Tổng số tín chỉ không tính trung bình chung tích lũy
                    là tổng số tín chỉ không được tính vào điểm trung bình tích
                    lũy để xếp loại học lực
                  </li>
                  <li>
                    <p>
                      (5) : Đủ điều kiện thi Chuẩn đầu ra Tiếng Anh: X/Y - Z
                    </p>
                    <ul className="ml-4 flex flex-col gap-2">
                      <li>
                        - Với X là tổng số môn học đã đạt được để đủ điều kiện
                        thi chuẩn Đầu ra Tiếng Anh
                      </li>
                      <li>
                        - Với Y là tổng số môn học cần đạt được để đủ điều kiện
                        thi chuẩn Đầu ra Tiếng Anh
                      </li>

                      <li>
                        - Với Z là "Đủ điều kiện" hoặc "Chưa đủ điều kiện" để
                        thi Chuẩn đầu ra Tiếng Anh
                      </li>
                    </ul>
                  </li>

                  <li>
                    <p>Đối với loại môn học: </p>
                    <ul className="ml-4 flex flex-col gap-2">
                      <li>
                        - Bắt buộc là các môn học sinh viên cần phải học theo
                        chương trình đào tạo và theo chuyên ngành sinh viên đã
                        đăng ký
                      </li>
                      <li>
                        - Khóa luận tốt nghiệp là dành cho các sinh viên đủ điều
                        kiện tích lũy theo yêu cầu
                      </li>
                      <li>
                        - Môn học thay thế là các môn học sinh viên cần phải học
                        nếu không đủ điều kiện làm khóa luận tốt nghiệp
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          )
        })}
      </CommonLayout>
      <Dialog isOpen={isOpenDialog} setIsOpen={setIsOpenDialog}>
        <div className="overflow-x-scroll">
          <table className={`border-2 border-slate-200 ${ns.e('table')}`}>
            <thead>
              <tr>
                <th className="border p-3 sticky top-0 z-[2] min-w-[50px]">
                  STT
                </th>
                <th
                  className={`border shadow-scroll-th p-3 sticky top-0 left-0 z-[3] min-w-[100px]`}
                >
                  Tên học phần
                </th>
                <th className="border p-3 sticky top-0 z-[2] min-w-[80px]">
                  Mã học phần
                </th>
                <th className="border p-3 sticky top-0 z-[2] min-w-[80px]">
                  Số tín chỉ
                </th>
                <th className="border p-3 sticky top-0 z-[2] min-w-[80px]">
                  Điểm tín chỉ
                </th>
                <th className="border p-3 sticky top-0 z-[2] min-w-[80px]">
                  Điểm tổng kết
                </th>
              </tr>
            </thead>
            <tbody>
              {monTuongDuong.map((monhoc, i) => (
                <tr key={i}>
                  <td className="left-0 sticky z-[1] shadow-scroll-td">
                    <div>{i + 1}</div>
                  </td>
                  <td className="left-0 sticky z-[1] shadow-scroll-td">
                    <div>{monhoc.TC_SV_ChuongTrinhKhung_TenHocPhan}</div>
                  </td>
                  <td>
                    <div>{monhoc.TC_SV_ChuongTrinhKhung_MaHocPhan}</div>
                  </td>
                  <td>
                    <div>{monhoc.TC_SV_ChuongTrinhKhung_SoTinChi}</div>
                  </td>
                  <td>
                    <div>{monhoc.TC_SV_ChuongTrinhKhung_DiemTinChi}</div>
                  </td>
                  <td>
                    <div>{monhoc.TC_SV_ChuongTrinhKhung_DiemTongKet}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Dialog>
    </>
  )
}

export default ChuongTrinhDaoTaoView

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  getDetailEditStatusYeuCau,
  getHoSoGuiYeuCauById,
  getTrangThaiXuLyYeuCauById,
} from '@/Apis/ApiGiangVien/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien'
import moment from 'moment'
import clsx from 'clsx'
import Loading from '@/Components/Loading/Loading'
import { getThanhPhanHoSoGuiYeuCauById } from '@/Apis/ApiGiangVien/ThuTucHanhChinhGiangVien/apiThanhPhanHoSo'
import { convertBufferToBase64 } from '@/Services/Utils/stringUtils'
import { handleDownloadFileBase64 } from '@/Services/Utils/fileUtils'

function TheoDoiDeNghiTTHCGVChiTiet() {
  const { id } = useParams()

  const [loading, setLoading] = useState(true)
  const [infoProcedure, setInfoProcedure] = useState(null)
  const [listThanhPhanHoSoYeuCau, setListThanhPhanHoSoYeuCau] = useState(null)
  const [listTrangThai, setListTrangThai] = useState(null)
  const [currentStatusByProcedure] = useState(0)
  const [indexActive, setIndexActive] = useState(-1)
  const [detailEditStatus, setDetailEditStatus] = useState([])
  const [activeDetail, setActiveDetail] = useState(false)
  const [tenTrangThai, setTenTrangThai] = useState('')
  // event handlers
  const handleActive = async (currentDataStatus, index) => {
    setTenTrangThai(currentDataStatus?.MC_TTHC_GV_TrangThai_TenTrangThai)
    getDetailEditStatusYeuCau(
      id,
      currentDataStatus?.MC_TTHC_GV_TrangThai_TenTrangThai,
    )
      .then(async (resDetail) => {
        if (resDetail.status === 200) {
          setDetailEditStatus(resDetail.data?.body)
        }
      })
      .catch((err) => {
        console.log(err.message)
      })

    if (indexActive === index) {
      setIndexActive(null)
      setActiveDetail(!activeDetail)
    } else {
      setIndexActive(index)
      setActiveDetail(true)
    }
  }

  // effect
  useEffect(() => {
    const fetcherData = async () => {
      try {
        const resChiTetHoSoYeuCau = await getHoSoGuiYeuCauById(id)
        if (resChiTetHoSoYeuCau.status === 200) {
          setInfoProcedure(resChiTetHoSoYeuCau.data?.body[0])
        }

        const resFileThanhPhanHoSoYeuCau =
          await getThanhPhanHoSoGuiYeuCauById(id)
        if (resFileThanhPhanHoSoYeuCau.status === 200) {
          setListThanhPhanHoSoYeuCau(resFileThanhPhanHoSoYeuCau.data?.body)
        }

        const resTrangThaiXuLyYeuCau = await getTrangThaiXuLyYeuCauById(id)
        if (resTrangThaiXuLyYeuCau.status === 200) {
          setListTrangThai(resTrangThaiXuLyYeuCau.data?.body)
        }
      } catch (err) {
        console.log(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetcherData()
  }, [id])

  return (
    <div>
      {loading ? (
        <div className="fixed bg-[#4d4d4d3a] inset-0 flex items-center justify-center z-50">
          <Loading />
        </div>
      ) : (
        <>
          <div className="mb-4 border p-2 bg-white">
            <h3 className="text-xl uppercase font-semibold mb-4 underline">
              Thông tin hồ sơ:
            </h3>
            <div className="flex flex-col lg:flex-row gap-2">
              <table className="w-full lg:w-1/2 border">
                <tbody>
                  <tr className="border-b">
                    <td className="text-left px-2 font-semibold border-r">
                      Thủ tục
                    </td>
                    <td className="p-2">
                      {infoProcedure?.MC_TTHC_GV_TenThuTuc}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="text-left px-2 font-semibold border-r">
                      Mã hồ sơ
                    </td>
                    <td className="p-2">
                      {infoProcedure?.MC_TTHC_GV_MaThuTuc}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="text-left px-2 font-semibold border-r">
                      Người nộp hồ sơ
                    </td>
                    <td className="p-2">{infoProcedure?.HoTen}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="text-left px-2 font-semibold border-r">
                      Ngày gửi
                    </td>
                    <td className="p-2">
                      {moment(
                        infoProcedure?.MC_TTHC_GV_GuiYeuCau_NgayGui,
                      ).format('DD/MM/YYYY')}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td
                      className={clsx('text-left px-2 font-semibold border-r')}
                    >
                      Nội dung yêu cầu
                    </td>
                    <td
                      className={clsx(
                        'p-2',
                        infoProcedure?.MC_TTHC_GV_GuiYeuCau_TrangThai_ID === -1
                          ? 'text-red-600 font-semibold'
                          : 'text-gray-600',
                      )}
                    >
                      {infoProcedure?.MC_TTHC_GV_GuiYeuCau_YeuCau_GhiChu}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td
                      className={clsx('text-left px-2 font-semibold border-r')}
                    >
                      Trạng thái
                    </td>
                    <td
                      className={clsx(
                        'p-2',
                        infoProcedure?.MC_TTHC_GV_GuiYeuCau_TrangThai_ID === -1
                          ? 'text-red-600 font-semibold'
                          : 'text-gray-600',
                      )}
                    >
                      {infoProcedure?.MC_TTHC_GV_GuiYeuCau_TrangThai_ID !== -1
                        ? infoProcedure?.MC_TTHC_GV_TrangThai_TenTrangThai
                        : infoProcedure?.MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className={clsx('text-left px-2 font-semibold border-r')}
                    >
                      Thành phần hồ sơ kèm theo
                    </td>
                    <td
                      className={clsx(
                        'p-2',
                        infoProcedure?.MC_TTHC_GV_GuiYeuCau_TrangThai_ID === -1
                          ? 'text-red-600 font-semibold'
                          : 'text-gray-600',
                      )}
                    >
                      {listThanhPhanHoSoYeuCau &&
                      listThanhPhanHoSoYeuCau?.length > 0
                        ? listThanhPhanHoSoYeuCau?.map((tp, index) => {
                            return (
                              <p
                                key={index}
                                onClick={() => {
                                  const base64StringWithoutPrefix =
                                    convertBufferToBase64(
                                      tp
                                        ?.MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_DataFile
                                        ?.data,
                                    )
                                  handleDownloadFileBase64(
                                    tp?.MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_TenFile,
                                    base64StringWithoutPrefix,
                                  )
                                }}
                                className="text-cyan-600 font-semibold cursor-pointer hover:underline"
                              >
                                <span>{index + 1}. </span>
                                <span>
                                  {tp?.MC_TTHC_GV_ThanhPhanHoSo_TenGiayTo}
                                </span>{' '}
                                <span>
                                  (
                                  {
                                    tp?.MC_TTHC_GV_ThanhPhanHoSo_GuiYeuCau_TenFile
                                  }
                                  )
                                </span>
                              </p>
                            )
                          })
                        : 'Không có'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mb-4 border p-2 bg-white">
            <h3 className="text-xl uppercase font-semibold mb-4 underline">
              Quá trình xử lý:
            </h3>
            <div className="w-full flex flex-col lg:flex-row justify-between gap-10">
              <table
                className={clsx(
                  '',
                  activeDetail ? 'w-full max-h-[200px]' : 'w-1/2',
                )}
              >
                <thead className="bg-[#336699] text-white">
                  <tr>
                    <th className="border-r rounded-tl-xl">Bước</th>
                    <th className="border-r">Công việc</th>
                    <th className="border-r">Ngày xử lý</th>
                    <th className="rounded-tr-xl"></th>
                  </tr>
                </thead>
                <tbody className="border">
                  {listTrangThai?.length > 0 &&
                    listTrangThai?.map((iTrangThai, index) => {
                      return (
                        <tr
                          key={index}
                          className={clsx(
                            'border-b ',
                            currentStatusByProcedure ==
                              iTrangThai?.MC_TTHC_GV_TrangThai_ID
                              ? 'bg-slate-300'
                              : '',
                          )}
                        >
                          <td className="text-center border-r">
                            {iTrangThai?.MC_TTHC_GV_TrangThai_STT}
                          </td>
                          <td className="text-center border-r">
                            {iTrangThai?.MC_TTHC_GV_TrangThai_TenTrangThai}
                          </td>
                          <td className="text-center border-r">
                            {iTrangThai?.MC_TTHC_GV_GuiYeuCau_DateEditor
                              ? moment(
                                  iTrangThai?.MC_TTHC_GV_GuiYeuCau_DateEditor,
                                ).format('DD/MM/YYYY')
                              : null}
                          </td>
                          <td className="text-center py-2">
                            <button
                              type="button"
                              className="px-2 py-1 border border-sky-800 rounded-md text-sky-800 hover:border-white hover:bg-sky-800 hover:text-white"
                              onClick={() => {
                                handleActive(iTrangThai, index)
                              }}
                            >
                              Xem chi tiết
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>

              {activeDetail ? (
                <div className="flex flex-col gap-4 w-full">
                  <h4 className="font-semibold">
                    Chi tiết thực hiện của công việc:{' '}
                    {tenTrangThai.toUpperCase()}
                  </h4>
                  <div className="w-full max-h-[500px] overflow-y-scroll">
                    <table className="w-full">
                      <thead className="bg-sky-800 text-white sticky">
                        <tr>
                          <th className="px-2 whitespace-nowrap border">STT</th>
                          <th className="px-2 whitespace-nowrap border">
                            Người xử lý
                          </th>
                          <th className="px-2 whitespace-nowrap border">
                            Ngày hẹn trả
                          </th>
                          <th className="px-2 whitespace-nowrap border">
                            Nơi trả kết quả
                          </th>
                          <th className="px-2 whitespace-nowrap border">
                            Ngày xử lý
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailEditStatus.map((iDetail, index) => {
                          return (
                            <tr className="border" key={index}>
                              <td className="px-2 py-1 text-center border-r">
                                {index + 1}
                              </td>
                              <td className="px-2 py-1 text-center border-r">
                                {iDetail?.HoTen}
                              </td>
                              <td className="px-2 py-1 text-center border-r">
                                {iDetail?.MC_TTHC_GV_GuiYeuCau_NgayHenTra &&
                                  moment(
                                    iDetail?.MC_TTHC_GV_GuiYeuCau_NgayHenTra,
                                  ).format('DD/MM/YYYY')}
                              </td>
                              <td className="px-2 py-1 text-center border-r">
                                {iDetail?.MC_TTHC_GV_GuiYeuCau_NoiTraKetQua}
                              </td>
                              <td className="px-2 py-1 text-center border-r">
                                {iDetail?.MC_TTHC_GV_GuiYeuCau_DateEditor
                                  ? moment(
                                      iDetail?.MC_TTHC_GV_GuiYeuCau_DateEditor,
                                    ).format('DD/MM/YYYY')
                                  : null}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default TheoDoiDeNghiTTHCGVChiTiet

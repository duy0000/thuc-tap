import { memo, useRef } from 'react'
import PropTypes from 'prop-types'
import Dialog from '@/Components/Base/Dialog/Dialog'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getTBGDDangKySuDungThietBiByID } from '@/Apis/HoTroThietBiGiangDuong/apiDangKySuDungThietBi'
import clsx from 'clsx'
import {
  colorStatusWithModule,
  MODULE_DE_NGHI,
  statusHTTBGD_DKSDTB,
} from '../constants'
import { dayjs } from '@/Services/Utils/dayjs'
import Button from '@/Components/Base/Button/Button'
import { handleCancelRequest_HTTBGD_DKSDTB } from '../DanhSachDeNghiGV/constants'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV'
import { THEO_DOI_DE_NGHI_GV } from '@/Services/QueryStores/QueryKeyStores/TheoDoiDeNghiGV.querykey'

const TheoDoiDeNghiHTTBGD = memo(function TheoDoiDeNghiHTTBGD({
  DT_CVNB_TBGD_GuiYeuCau_ID,
  showModal,
  onHideModal,
}) {
  const DataCBGV = DataCanBoGV()
  const dialogRef = useRef()
  const queryClient = useQueryClient()
  const { data: dataDetail } = useQuery({
    queryKey: [
      THEO_DOI_DE_NGHI_GV.THEO_DOI_DE_NGHI_HTTBGD,
      DT_CVNB_TBGD_GuiYeuCau_ID,
    ],
    queryFn: async () => {
      const response = await getTBGDDangKySuDungThietBiByID({
        DT_CVNB_TBGD_GuiYeuCau_ID,
      })
      return response
    },
    enabled: !!DT_CVNB_TBGD_GuiYeuCau_ID,
  })

  const _refreshTheoDoiDeNghi = () => {
    queryClient.invalidateQueries({
      queryKey: [THEO_DOI_DE_NGHI_GV.SP_HT_USER_Load_YeuCau_ByMaNhanSu],
    })
  }

  const handleCancelRequest = ({ idYeuCau }) => {
    handleCancelRequest_HTTBGD_DKSDTB({
      idYeuCau,
      DataCBGV,
      onRefresh: _refreshTheoDoiDeNghi,
    })
  }

  console.log('>>>Check data detail: ', dataDetail)

  return (
    <>
      <Dialog
        ref={dialogRef}
        isOpen={showModal}
        setIsOpen={onHideModal}
        header={
          <h2 className="uppercase text-uneti-primary text-lg font-semibold text-center">
            Chi tiết yêu cầu <br /> đăng ký sử dụng thiết bị
          </h2>
        }
        footer={
          <div className="flex gap-x-4 justify-end">
            {dataDetail?.data?.body[0]
              ?.DT_CVNB_TBGD_GuiYeuCau_NhanSuXacNhan_XacNhan === 0 && (
              <Button
                onClick={() => {
                  onHideModal()
                  handleCancelRequest({
                    idYeuCau: DT_CVNB_TBGD_GuiYeuCau_ID,
                  })
                }}
                color="danger"
              >
                Hủy yêu cầu
              </Button>
            )}
            <button
              onClick={onHideModal}
              className="rounded-xl outline-none border-none px-8 py-2 bg-uneti-primary text-white"
            >
              OK
            </button>
          </div>
        }
      >
        <h2 className="text-uneti-primary text-opacity-80 italic font-semibold">
          1. Thông tin đăng ký
        </h2>
        <div className="mb-6">
          <div>
            <h3 className="font-semibold py-2">
              1.1: Mã - Họ tên nhân sự:{' '}
              <span className="text-cyan-800">
                {dataDetail?.data?.body[0]
                  ?.DT_CVNB_TBGD_GuiYeuCau_NhanSuMuon_MaNhanSu +
                  ' - ' +
                  dataDetail?.data?.body[0]
                    ?.DT_CVNB_TBGD_GuiYeuCau_NhanSuMuon_HoTen}
              </span>
            </h3>
          </div>
          <div>
            <h3 className="font-semibold italic py-2">
              1.2: Nội dung đăng ký:
            </h3>
            <table className="border p-4 w-full md:w-full lg:w-full">
              <tbody>
                <tr className="border-b">
                  <td scope="col" className="p-2 border-r w-1/2">
                    - Thời gian đăng ký sử dụng{' '}
                  </td>
                  <td scope="col" className="p-2">
                    <span>
                      {dataDetail?.data?.body[0]
                        ?.DT_CVNB_TBGD_GuiYeuCau_NgayBatDau
                        ? dayjs(
                            dataDetail?.data?.body[0]
                              ?.DT_CVNB_TBGD_GuiYeuCau_NgayBatDau,
                          )
                            .utc()
                            .format('DD/MM/YYYY')
                        : ''}
                    </span>
                    <br />
                    <span>
                      Từ tiết{' '}
                      {dataDetail?.data?.body[0]?.DT_CVNB_TBGD_GuiYeuCau_TuTiet}{' '}
                      đến tiết{' '}
                      {
                        dataDetail?.data?.body[0]
                          ?.DT_CVNB_TBGD_GuiYeuCau_DenTiet
                      }{' '}
                    </span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td scope="col" className="p-2 border-r">
                    - Thiết bị mượn{' '}
                  </td>
                  <td scope="col" className="p-2">
                    <span>
                      {
                        dataDetail?.data?.body[0]
                          ?.DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_Ten
                      }
                    </span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td scope="col" className="p-2 border-r">
                    - Số lượng mượn{' '}
                  </td>
                  <td scope="col" className="p-2">
                    <span>
                      {
                        dataDetail?.data?.body[0]
                          ?.DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_SoLuong
                      }
                    </span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td scope="col" className="p-2 border-r">
                    - Vị trí sử dụng{' '}
                  </td>
                  <td scope="col" className="p-2">
                    <span>
                      {
                        dataDetail?.data?.body[0]
                          ?.DT_CVNB_TBGD_GuiYeuCau_TenPhong
                      }
                    </span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td scope="col" className="p-2 border-r">
                    - Lý do mượn{' '}
                  </td>
                  <td scope="col" className="p-2">
                    <span>
                      {
                        dataDetail?.data?.body[0]
                          ?.DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_LyDo
                      }
                    </span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td scope="col" className="p-2 border-r">
                    - Mô tả{' '}
                  </td>
                  <td scope="col" className="p-2">
                    <span>
                      {
                        dataDetail?.data?.body[0]
                          ?.DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_MoTa
                      }
                    </span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td scope="col" className="p-2 border-r">
                    - Ghi chú{' '}
                  </td>
                  <td scope="col" className="p-2">
                    <span>
                      {
                        dataDetail?.data?.body[0]
                          ?.DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_GhiChu
                      }
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* 1.2. Nội dung đăng ký */}
        </div>
        <h2 className="text-uneti-primary text-opacity-80 italic font-semibold">
          2. Thông tin xử lý
        </h2>
        {dataDetail?.data?.body[0]
          ?.DT_CVNB_TBGD_GuiYeuCau_NhanSuXacNhan_XacNhan === 0 && (
          <p>
            <span>Trạng thái xử lý: </span>
            <span
              className={clsx(
                colorStatusWithModule(
                  MODULE_DE_NGHI.DT_CVNB_TBGD_GuiYeuCau,
                  statusHTTBGD_DKSDTB(
                    dataDetail?.data?.body[0]
                      ?.DT_CVNB_TBGD_GuiYeuCau_NhanSuXacNhan_XacNhan,
                  ),
                ),
                'font-semibold',
              )}
            >
              {statusHTTBGD_DKSDTB(
                dataDetail?.data?.body[0]
                  ?.DT_CVNB_TBGD_GuiYeuCau_NhanSuXacNhan_XacNhan,
              )}
            </span>
          </p>
        )}
        <div
          className={clsx(
            dataDetail?.data?.body[0]
              ?.DT_CVNB_TBGD_GuiYeuCau_NhanSuXacNhan_XacNhan !== 0
              ? 'block'
              : 'hidden',
          )}
        >
          <div>
            <h3 className="font-semibold py-2">
              2.1: Mã - Họ tên nhân sự xử lý:{' '}
              <span className="text-cyan-800">
                {dataDetail?.data?.body[0]
                  ?.DT_CVNB_TBGD_GuiYeuCau_NhanSuXacNhan_MaNhanSu +
                  ' - ' +
                  dataDetail?.data?.body[0]
                    ?.DT_CVNB_TBGD_GuiYeuCau_NhanSuXacNhan_HoTen}
              </span>
            </h3>
          </div>
          <div className="">
            <h3 className="font-semibold italic py-2">2.2: Nội dung xử lý:</h3>
            <table className="border p-4 w-full md:w-full lg:w-full">
              <tbody>
                <tr className="border-b">
                  <td scope="col" className="p-2 border-r w-1/2">
                    - Thời gian xử lý{' '}
                  </td>
                  <td scope="col" className="p-2">
                    <span>
                      {
                        dataDetail?.data?.body[0]
                          ?.DT_CVNB_TBGD_GuiYeuCau_ThietBiMuon_Ten
                      }
                    </span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td scope="col" className="p-2 border-r">
                    - Trạng thái xử lý{' '}
                  </td>
                  <td scope="col" className="p-2">
                    <span
                      className={colorStatusWithModule(
                        MODULE_DE_NGHI.DT_CVNB_TBGD_GuiYeuCau,
                        statusHTTBGD_DKSDTB(
                          dataDetail?.data?.body[0]
                            ?.DT_CVNB_TBGD_GuiYeuCau_NhanSuXacNhan_XacNhan,
                        ),
                      )}
                    >
                      {statusHTTBGD_DKSDTB(
                        dataDetail?.data?.body[0]
                          ?.DT_CVNB_TBGD_GuiYeuCau_NhanSuXacNhan_XacNhan,
                      )}
                    </span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td scope="col" className="p-2 border-r">
                    - Ghi chú{' '}
                  </td>
                  <td scope="col" className="p-2">
                    <span>
                      {
                        dataDetail?.data?.body[0]
                          ?.DT_CVNB_TBGD_GuiYeuCau_NhanSuXacNhan_GhiChu
                      }
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* 2. Thông tin xử lý */}
      </Dialog>
    </>
  )
})

TheoDoiDeNghiHTTBGD.propTypes = {
  DT_CVNB_TBGD_GuiYeuCau_ID: PropTypes.number,
  showModal: PropTypes.bool,
  onHideModal: PropTypes.func,
}

export default TheoDoiDeNghiHTTBGD

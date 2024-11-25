import PropTypes from 'prop-types'
import Breadcrumb from '@/Components/Breadcumb/Breadcrumb'
import {
  breadcrumbs,
  home,
  sendEmail_HTTBGD_XuLyDangKyThietBi,
  sendEmail_HTTBGD_HuyTraDangKyThietBi,
} from './constants'
import DanhSachDangKyThietBi from './DanhSachDangKyThietBi'
import { useMemo, useState } from 'react'
import clsx from 'clsx'
import { isEmpty } from 'lodash-unified'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { putTBGDDangKySuDungThietBi_XuLy } from '@/Apis/HoTroThietBiGiangDuong/apiDangKySuDungThietBi'
import Swal from 'sweetalert2'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV'
import { HoTroTBGD_QUERY_KEY } from '@/Services/QueryStores/QueryKeyStores/HoTroTBGD.querykey'
import { asyncPool } from '@/Services/Utils/poolData'
import { groupArrayByFields } from '@/Services/Utils/arrayUtils'

function XuLyDangKyThietBiView({ loading, listTBGDDangKyThietBi }) {
  const DataCBGV = DataCanBoGV()
  const queryClient = useQueryClient()
  const inititalDataSubmit = {
    DT_CVNB_TBGD_GuiYeuCau_ID: '',
    DT_CVNB_TBGD_GuiYeuCau_NhanSuXacNhan_Email: DataCBGV.EmailUneti,
    DT_CVNB_TBGD_GuiYeuCau_NhanSuXacNhan_HoTen:
      DataCBGV.HoDem + ' ' + DataCBGV.Ten,
    DT_CVNB_TBGD_GuiYeuCau_NhanSuXacNhan_MaNhanSu: DataCBGV.MaNhanSu,
    DT_CVNB_TBGD_GuiYeuCau_NhanSuXacNhan_SoDienThoai:
      DataCBGV.SoDienThoai || '',
    DT_CVNB_TBGD_GuiYeuCau_NhanSuXacNhan_XacNhan: '',
    DT_CVNB_TBGD_GuiYeuCau_NhanSuXacNhan_Ngay: new Date().toISOString(),
    DT_CVNB_TBGD_GuiYeuCau_NhanSuXacNhan_GhiChu: '',
  }

  const [dangKySelected, setDangKySelected] = useState([])
  const [dataSubmit, setDataSubmit] = useState(inititalDataSubmit)

  const {
    mutateAsync: mutateXuLyDangKyThietBiAsync,
    isLoading: isLoadingXuLyDangKyThietBi,
  } = useMutation({
    mutationFn: async (data) => {
      const response = await putTBGDDangKySuDungThietBi_XuLy(data)
      return response
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text:
          error.response.data.userMsg ||
          'Đã có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ bộ phận kỹ thuật để khắc phục!',
        showConfirmButton: false,
        timer: 1500,
      })
    },
  })
  const _isEmptyData = useMemo(() => {
    return isEmpty(dangKySelected) || dangKySelected.length === 0
  }, [dangKySelected])
  const handleChangeValue = (e) => {
    const { name, value } = e.target
    setDataSubmit({ ...dataSubmit, [name]: value })
  }
  const handleSelectedDangKy = (type = 'single' | 'all', dataDangKy) => {
    if (type === 'single') {
      setDangKySelected((prev) =>
        prev.some(
          (item) =>
            item?.DT_CVNB_TBGD_GuiYeuCau_ID ===
            dataDangKy?.DT_CVNB_TBGD_GuiYeuCau_ID,
        )
          ? prev.filter(
              (item) =>
                item.DT_CVNB_TBGD_GuiYeuCau_ID !==
                dataDangKy?.DT_CVNB_TBGD_GuiYeuCau_ID,
            )
          : [...prev, dataDangKy],
      )
    } else {
      setDangKySelected((prev) => {
        const allDangKy = listTBGDDangKyThietBi?.map((item) => item) || []

        return prev.length === allDangKy.length ? [] : allDangKy
      })
    }
  }

  const handleSubmitData = async () => {
    let _listAcceptDataSubmit = [],
      _countSuccess = 0,
      _countErorr = 0
    dangKySelected.forEach((dk) => {
      _listAcceptDataSubmit.push({
        ...dataSubmit,
        DT_CVNB_TBGD_GuiYeuCau_ID: dk.DT_CVNB_TBGD_GuiYeuCau_ID,
        DT_CVNB_TBGD_GuiYeuCau_NhanSuXacNhan_XacNhan: 1,
      })
    })

    let dataGVGroupSendEmail = groupArrayByFields(dangKySelected, [
      'DT_CVNB_TBGD_GuiYeuCau_NhanSuMuon_Email',
    ])
    // console.log(dataGVGroupSendEmail)
    // return

    try {
      const multiRes = await asyncPool(
        5,
        _listAcceptDataSubmit,
        mutateXuLyDangKyThietBiAsync,
      )
      multiRes.some((res) => {
        if (
          res.data.code === 200 &&
          res.data?.message !== 'Bản ghi bị trùng.'
        ) {
          _countSuccess++
        } else {
          _countErorr++
        }
      })
      if (_countSuccess > 0 && _countErorr > 0) {
        Swal.fire({
          icon: 'success',
          title: 'Thông báo',
          html: `
            <ul>
              <li>- Thầy/Cô đã xử lý đăng ký mượn ${_countSuccess} thiết bị thành công!</li>
              <li style="color: red">- Thầy/Cô đã xử lý đăng ký mượn ${_countErorr} thiết bị thất bại. Vui lòng thử lại hoặc liên hệ bộ phân kỹ thuật để khắc phục!</li>
            </ul>
          `,
        })
      } else if (_countSuccess > 0 && _countErorr === 0) {
        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          text: 'Thầy/Cô đã xử lý đăng ký mượn thiết bị thành công!',
        })
      } else if (_countSuccess === 0 && _countErorr > 0) {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi!',
          text: `Thầy/Cô đã xử lý đăng ký mượn ${_countErorr} thiết bị thất bại. Vui lòng thử lại hoặc liên hệ bộ phân kỹ thuật để khắc phục!`,
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Đã có lỗi xảy ra!',
          text: 'Thầy/Cô vui lòng đăng nhập và thực hiện lại hoặc liên hệ bộ phận kỹ thuật để khắc phục sự cố. Xin cảm ơn!',
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Đã có lỗi xảy ra!',
        message:
          'Thầy/Cô vui lòng đăng nhập và thực hiện lại hoặc liên hệ bộ phận kỹ thuật để khắc phục sự cố. Xin cảm ơn!',
      })
      console.log('>>> error: ', error)
    }
    queryClient.invalidateQueries({
      queryKey: [HoTroTBGD_QUERY_KEY.SP_DT_CVNB_TBGD_GuiYeuCau_XuLy_Load],
    })

    dataGVGroupSendEmail.map(async (dk) => {
      await sendEmail_HTTBGD_XuLyDangKyThietBi({
        dataNguoiXuLy: DataCBGV,
        dvNguoiDK: dk?.value[0]?.DT_CVNB_TBGD_GuiYeuCau_TenPhongBan || '--',
        emailNguoiDK: dk?.key || '--',
        hoVaTenNguoiDK:
          dk?.value[0]?.DT_CVNB_TBGD_GuiYeuCau_NhanSuMuon_HoTen || '--',
        mnsNguoiDK:
          dk?.value[0]?.DT_CVNB_TBGD_GuiYeuCau_NhanSuMuon_MaNhanSu || '--',
        thongTinDangKy: dk?.value || '--',
        noiDungXuLy:
          dataSubmit.DT_CVNB_TBGD_GuiYeuCau_NhanSuXacNhan_GhiChu || '--',
      })
    })
    setDangKySelected([])
    setDataSubmit(inititalDataSubmit)
  }

  const handleCancelSuggest = async () => {
    let _listCancelDataSubmit = [],
      _countSuccess = 0,
      _countErorr = 0
    dangKySelected.forEach((dk) => {
      _listCancelDataSubmit.push({
        ...dataSubmit,
        DT_CVNB_TBGD_GuiYeuCau_ID: dk.DT_CVNB_TBGD_GuiYeuCau_ID,
        DT_CVNB_TBGD_GuiYeuCau_NhanSuXacNhan_XacNhan: -1,
      })
    })
    let dataGVGroupSendEmail = groupArrayByFields(dangKySelected, [
      'DT_CVNB_TBGD_GuiYeuCau_NhanSuMuon_Email',
    ])

    Swal.fire({
      icon: 'question',
      title: 'Thầy/Cô chắc chắn muốn hủy yêu cầu đăng ký thiết bị này không?',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const multiRes = await asyncPool(
            5,
            _listCancelDataSubmit,
            mutateXuLyDangKyThietBiAsync,
          )
          multiRes.some((res) => {
            if (
              res.data.code === 200 &&
              res.data?.message !== 'Bản ghi bị trùng.'
            ) {
              _countSuccess++
            } else {
              _countErorr++
            }
          })
          if (_countSuccess > 0 && _countErorr > 0) {
            Swal.fire({
              icon: 'success',
              title: 'Thông báo',
              html: `
            <ul>
              <li>- Thầy/Cô đã xử lý hủy yêu cầu đăng ký mượn ${_countSuccess} thiết bị thành công!</li>
              <li style="color: red">- Thầy/Cô đã xử lý hủy yêu cầu đăng ký mượn ${_countErorr} thiết bị thất bại. Vui lòng thử lại hoặc liên hệ bộ phân kỹ thuật để khắc phục!</li>
            </ul>
          `,
            })
          } else if (_countSuccess > 0 && _countErorr === 0) {
            Swal.fire({
              icon: 'success',
              title: 'Thành công',
              text: 'Thầy/Cô đã xử lý hủy yêu cầu đăng ký mượn thiết bị thành công!',
            })
          } else if (_countSuccess === 0 && _countErorr > 0) {
            Swal.fire({
              icon: 'error',
              title: 'Lỗi!',
              text: `Thầy/Cô đã xử lý hủy yêu cầu đăng ký mượn ${_countErorr} thiết bị thất bại. Vui lòng thử lại hoặc liên hệ bộ phân kỹ thuật để khắc phục!`,
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Đã có lỗi xảy ra!',
              text: 'Thầy/Cô vui lòng đăng nhập và thực hiện lại hoặc liên hệ bộ phận kỹ thuật để khắc phục sự cố. Xin cảm ơn!',
            })
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Đã có lỗi xảy ra!',
            message:
              'Thầy/Cô vui lòng đăng nhập và thực hiện lại hoặc liên hệ bộ phận kỹ thuật để khắc phục sự cố. Xin cảm ơn!',
          })
          console.log('>>> error: ', error)
        }
        queryClient.invalidateQueries({
          queryKey: [HoTroTBGD_QUERY_KEY.SP_DT_CVNB_TBGD_GuiYeuCau_XuLy_Load],
        })
        setDangKySelected([])
        setDataSubmit(inititalDataSubmit)

        setDataSubmit(inititalDataSubmit)
      }
    })
    dataGVGroupSendEmail.map(async (dk) => {
      await sendEmail_HTTBGD_HuyTraDangKyThietBi({
        dataNguoiXuLy: DataCBGV,
        dvNguoiDK: dk?.value[0]?.DT_CVNB_TBGD_GuiYeuCau_TenPhongBan || '--',
        emailNguoiDK: dk?.key || '--',
        hoVaTenNguoiDK:
          dk?.value[0]?.DT_CVNB_TBGD_GuiYeuCau_NhanSuMuon_HoTen || '--',
        mnsNguoiDK:
          dk?.value[0]?.DT_CVNB_TBGD_GuiYeuCau_NhanSuMuon_MaNhanSu || '--',
        thongTinDangKy: dk?.value || '--',
        noiDungXuLy:
          dataSubmit.DT_CVNB_TBGD_GuiYeuCau_NhanSuXacNhan_GhiChu || '--',
      })
    })
  }

  return (
    <div className="bg-vs-theme-layout rounded-2xl mx-4 lg:mx-0">
      <div className="p-4 flex flex-col gap-4">
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />

        <div className="form-submit flex flex-col w-full justify-center p-2 lg:px-4">
          <h2 className="text-center uppercase text-lg md:text-2xl font-semibold text-sky-800 mb-3 md:mb-6">
            Xử lý đăng ký thiết bị
          </h2>

          <div className="relative border border-gray-400 rounded-2xl p-4 mb-8">
            <h4 className="absolute -top-3 left-6 bg-white text-gray-900 px-2 text-sm font-medium">
              Danh sách đăng ký:
            </h4>
            <DanhSachDangKyThietBi
              loading={loading}
              listTBGDDKTB={listTBGDDangKyThietBi || []}
              onSelectedDangKy={handleSelectedDangKy}
              dangKySelected={dangKySelected}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="note"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ghi chú
            </label>
            <textarea
              id="note"
              name="DT_CVNB_TBGD_GuiYeuCau_NhanSuXacNhan_GhiChu"
              rows={5}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-blue-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nhập ghi chú..."
              onChange={handleChangeValue}
              value={dataSubmit.DT_CVNB_TBGD_GuiYeuCau_NhanSuXacNhan_GhiChu}
            />
          </div>
          {/* END: Ghi chú */}
          <div className="uneti-action flex justify-center gap-2">
            <button
              disabled={_isEmptyData || isLoadingXuLyDangKyThietBi}
              onClick={handleCancelSuggest}
              className={clsx(
                'duration-200 px-3 py-2 bg-red-600 text-white font-semibold border border-red-600 rounded-xl',
                _isEmptyData ? '' : 'cursor-pointer hover:opacity-80',
              )}
            >
              Hủy yêu cầu
            </button>
            <button
              disabled={_isEmptyData || isLoadingXuLyDangKyThietBi}
              onClick={handleSubmitData}
              className={clsx(
                'duration-200 px-3 py-2 bg-white text-sky-800 font-semibold border border-sky-800 rounded-xl',
                _isEmptyData
                  ? ''
                  : 'cursor-pointer hover:bg-sky-800 hover:text-white',
              )}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

XuLyDangKyThietBiView.propTypes = {
  loading: PropTypes.bool,
}

export default XuLyDangKyThietBiView

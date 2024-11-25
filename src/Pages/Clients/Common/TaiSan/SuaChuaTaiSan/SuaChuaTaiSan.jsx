import { useEffect, useState } from 'react'
import SuaChuaTaiSanView from './SuaChuaTaiSanView'
import {
  putNgayXuLyYeuCauBaoHong,
  putXacNhanSuaChuaHoanThanh,
} from '@/Apis/HoTroThietBi/apiTaiSan'
import Swal from 'sweetalert2'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV'
import {
  sendEmail_HTTB_CBNV_NguoiBaoHong,
  sendEmail_HTTB_CBNV_SVBaoHong,
  sendEmail_HTTB_HuyTra_NguoiBaoHong,
  sendEmail_HTTB_HuyTra_SVBaoHong,
  sendEmail_HTTB_XacNhanHoanThanh_NguoiBaoHong,
} from '@/Services/Utils/emailUtils'
import dayjs from 'dayjs'
import { sendEmail_HTTB_XacNhanHoanThanh_SVBaoHong } from '@/Services/Utils/emailUtils'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getAllKhacPhucXuLySuCo,
  getAllNguyenNhanXuLySuCo,
} from '@/Apis/HoTroThietBiGiangDuong/apiXuLySuCo'
import { isEmpty, isNull } from 'lodash-unified'
import { HoTroTBPM_QUERY_KEY } from '@/Services/QueryStores/QueryKeyStores/HoTroTBPM.querykey'
import apiHoTroTBPM from '@/Apis/Common/apiHoTroTBPM'

const SuaChuaTaiSan = () => {
  const [loading, setLoading] = useState(false)
  const initialItemPerPage = 5
  const [isModeHandle, setIsModeHandle] = useState('handle')
  const [itemPerPage, setItemPerPage] = useState(initialItemPerPage)
  const [page, setPage] = useState(0)
  const [selected, setSelected] = useState([])
  const [selectedNguyenNhan, setSelectedNguyenNhan] = useState([])
  const [selectedKQKP, setSelectedKQKP] = useState([])
  const [dataSuccessDetail, setDataSuccessDetail] = useState({
    descNguyenNhan: '',
    descKhacPhuc: '',
  })
  const [suCoBaoHongSelected, setSuCoBaoHongSelected] = useState(
    selected[0]?.DT_QLTS_TS_HoTroThietBi_BaoHong_TenSuCo || '',
  )
  const [zoom, setZoom] = useState(false)
  const [filters, setFilters] = useState({
    DT_QLTS_TS_HoTroThietBi_BaoHong_MaTaiSan: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_TenTaiSan: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_CoSo: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_DiaDiem: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_ToaNha: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_Tang: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_TenPhong: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_TenSuCo: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_MoTa: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_NgayGui: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_MaNhanSu: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_HoTen: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_TenPhongBan: '',
    DT_QLTS_TS_HoTroThietBi_BaoHong_SoDienThoai: '',
    DT_QLTS_TS_HoTroThietBi_XuLy_MaNhanSu: '',
    DT_QLTS_TS_HoTroThietBi_XuLy_HoTen: '',
    DT_QLTS_TS_HoTroThietBi_XuLy_TenPhongBan: '',
    DT_QLTS_TS_HoTroThietBi_XuLy_SoDienThoai: '',
    DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy: '',
  })

  const dataCBGV = DataCanBoGV()
  const queryClient = useQueryClient()
  // React Query
  const { data: dataBaoHongArrQuery, isLoading } = useQuery({
    queryKey: [HoTroTBPM_QUERY_KEY.GET_DS_BAO_HONG],
    queryFn: async () => {
      const res = await apiHoTroTBPM.getDanhSachBaoHong()
      return res?.data?.code === 200 ? res?.data?.body : []
    },
    refetchInterval: 1000 * 60 * 30,
  })

  const { data: listNguyenNhan } = useQuery({
    queryKey: ['HTTB_SuaChua_NguyenNhan', suCoBaoHongSelected],
    queryFn: async () => {
      const response = await getAllNguyenNhanXuLySuCo({
        DT_CVNB_TBGD_TL_Nhom1: 'HoTroThietBi',
        DT_CVNB_TBGD_TL_Nhom2: 'NguyenNhan',
        DT_CVNB_TBGD_TL_Nhom3: '',
        DT_CVNB_TBGD_TL_Nhom4: suCoBaoHongSelected || '',
      })

      return response.data.body
    },
  })

  const { data: listKetQuaKhacPhuc } = useQuery({
    queryKey: [
      'HTTB_SuaChua_KhacPhucSuCo',
      suCoBaoHongSelected,
      selectedNguyenNhan,
    ],
    queryFn: async () => {
      const response = await getAllKhacPhucXuLySuCo({
        DT_CVNB_TBGD_TL_Nhom1: 'HoTroThietBi',
        DT_CVNB_TBGD_TL_Nhom2: 'KetQuaKhacPhuc',
        DT_CVNB_TBGD_TL_Nhom3: '',
        DT_CVNB_TBGD_TL_Nhom4:
          selectedNguyenNhan.map((nn) => nn.DT_CVNB_TBGD_TL_Ten).join('; ') ||
          '',
      })

      return response.data.body
    },
    enabled: selectedNguyenNhan.length > 0,
  })

  useEffect(() => {
    if (selected[0]?.DT_QLTS_TS_HoTroThietBi_BaoHong_TenSuCo) {
      setSuCoBaoHongSelected(
        selected[0]?.DT_QLTS_TS_HoTroThietBi_BaoHong_TenSuCo,
      )
    }
  }, [selected[0]?.DT_QLTS_TS_HoTroThietBi_BaoHong_TenSuCo])

  // event handlers
  // event: Lọc từng cột
  const handleChangeValueFilter = (e) => {
    const { id, value } = e.target
    setFilters((prevData) => {
      return { ...prevData, [id]: value }
    })
  }

  const handleUpdateItemSelected = (obj, updateData) => {
    const updatedArr = selected?.map((item) => {
      if (item.DT_QLTS_TS_HoTroThietBi_ID === obj.DT_QLTS_TS_HoTroThietBi_ID) {
        // Chỉ cập nhật thuộc tính tương ứng nếu khớp
        return {
          ...item,
          ...updateData,
        }
      }
      return item
    })
    setSelected(updatedArr)
  }

  // event: Nhập mô tả NN, KQKP
  const handleChangeDescSuccess = (e) => {
    const { id, value } = e.target
    setDataSuccessDetail({
      ...dataSuccessDetail,
      [id]: value,
    })
  }

  // event: Xác nhận ngày xử lý
  const handleConfirmNgayXuLy = async () => {
    setLoading(true)
    console.log(selected)
    if (selected.length === 0) {
      setLoading(false)
      return Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng chọn 1 yêu cầu để xử lý!',
      })
    }

    if (
      !isNull(selected[0].DT_QLTS_TS_HoTroThietBi_XuLy_MaNhanSu) &&
      dataCBGV.MaNhanSu !== selected[0].DT_QLTS_TS_HoTroThietBi_XuLy_MaNhanSu
    ) {
      setLoading(false)
      return Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Bạn không thể tiếp nhận công việc của nhân sự khác!',
      })
    }

    let hasError = false // Biến để kiểm tra xem có lỗi nào không

    try {
      const fetchListUpdate = selected.map(async (obj) => {
        if (!obj.DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy) {
          hasError = true
          Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Vui lòng nhập ngày xử lý!',
          })
          setLoading(false)
          return Promise.resolve()
        }

        if (
          obj.DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy === 'Invalid date' ||
          dayjs(new Date(obj.DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy)) <
            dayjs(new Date())
        ) {
          Swal.fire({
            icon: 'error',
            title: 'Vui lòng nhập đúng thông tin ngày xử lý',
            text: 'Vui lòng nhập đúng thông tin ngày xử lý!',
          })
          setLoading(false)
          return Promise.resolve()
        }

        const shouldConfirmEmail =
          obj.DT_QLTS_TS_HoTroThietBi_XuLy_GuiMail === null ||
          obj.DT_QLTS_TS_HoTroThietBi_XuLy_GuiMail === false ||
          obj.DT_QLTS_TS_HoTroThietBi_XuLy_GuiMail === undefined

        if (shouldConfirmEmail) {
          return Swal.fire({
            icon: 'question',
            title: 'Bạn muốn xác nhận xử lý mà không gửi email thông báo?',
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: 'Hủy',
            confirmButtonText: 'Đồng ý',
          }).then((result) => {
            if (result.isConfirmed) {
              const data = {
                DT_QLTS_TS_HoTroThietBi_ID:
                  obj.DT_QLTS_TS_HoTroThietBi_ID.toString(),
                DT_QLTS_TS_HoTroThietBi_XuLy_MaNhanSu: dataCBGV.MaNhanSu,
                DT_QLTS_TS_HoTroThietBi_XacNhan_HoanThanh: '0',
                DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy:
                  obj.DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy,
                DT_QLTS_TS_HoTroThietBi_XuLy_GuiMail:
                  obj.DT_QLTS_TS_HoTroThietBi_XuLy_GuiMail,
              }

              return putNgayXuLyYeuCauBaoHong(data).then(() => {
                queryClient.invalidateQueries({
                  queryKey: [HoTroTBPM_QUERY_KEY.GET_DS_BAO_HONG],
                })
                setSelected([])
                Swal.fire({
                  icon: 'success',
                  title: 'Đã xác nhận xử lý yêu cầu báo hỏng thành công!',
                })
              })
            }
          })
        } else {
          // Nếu không cần xác nhận gửi email, thực hiện trực tiếp mà không hiển thị Swal.fire
          const data = {
            DT_QLTS_TS_HoTroThietBi_ID:
              obj.DT_QLTS_TS_HoTroThietBi_ID.toString(),
            DT_QLTS_TS_HoTroThietBi_XuLy_MaNhanSu: dataCBGV.MaNhanSu,
            DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy:
              obj.DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy,
            DT_QLTS_TS_HoTroThietBi_XuLy_GuiMail:
              obj.DT_QLTS_TS_HoTroThietBi_XuLy_GuiMail,
          }
          setLoading(true)

          putNgayXuLyYeuCauBaoHong(data)
            .then(() => {
              queryClient.invalidateQueries({
                queryKey: [HoTroTBPM_QUERY_KEY.GET_DS_BAO_HONG],
              })
              setSelected([])
              setLoading(false)
              Swal.fire({
                icon: 'success',
                title: 'Đã xác nhận xử lý yêu cầu báo hỏng thành công!',
              })
            })
            .catch(() => {
              setLoading(false)
              Swal.fire({
                icon: 'error',
                title: 'Lỗi!',
                text: 'Đã có lỗi xảy ra. Vui lòng liên hệ bộ phận kỹ thuật để khắc phục!',
              })
            })
            .finally(async () => {
              if (obj.DT_QLTS_TS_HoTroThietBi_BaoHong_LoaiTaiKhoan === 'SV') {
                setLoading(false)
                await sendEmail_HTTB_CBNV_SVBaoHong(
                  obj.DT_QLTS_TS_HoTroThietBi_BaoHong_Email,
                  obj.DT_QLTS_TS_HoTroThietBi_BaoHong_TenTaiSan,
                  obj.DT_QLTS_TS_HoTroThietBi_BaoHong_MaNhanSu,
                  obj.DT_QLTS_TS_HoTroThietBi_BaoHong_HoTen,
                  obj.DT_QLTS_TS_HoTroThietBi_BaoHong_TenPhongBan,
                  obj.DT_QLTS_TS_HoTroThietBi_BaoHong_TenSuCo,
                  obj.DT_QLTS_TS_HoTroThietBi_BaoHong_MoTa,
                  obj.DT_QLTS_TS_HoTroThietBi_BaoHong_NgayGui,
                  obj.DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy,
                  dataCBGV,
                )
              }

              if (obj.DT_QLTS_TS_HoTroThietBi_BaoHong_LoaiTaiKhoan === 'GV') {
                setLoading(false)
                await sendEmail_HTTB_CBNV_NguoiBaoHong(
                  obj.DT_QLTS_TS_HoTroThietBi_BaoHong_Email,
                  obj.DT_QLTS_TS_HoTroThietBi_BaoHong_TenTaiSan,
                  obj.DT_QLTS_TS_HoTroThietBi_BaoHong_MaNhanSu,
                  obj.DT_QLTS_TS_HoTroThietBi_BaoHong_HoTen,
                  obj.DT_QLTS_TS_HoTroThietBi_BaoHong_TenPhongBan,
                  obj.DT_QLTS_TS_HoTroThietBi_BaoHong_TenSuCo,
                  obj.DT_QLTS_TS_HoTroThietBi_BaoHong_MoTa,
                  obj.DT_QLTS_TS_HoTroThietBi_BaoHong_NgayGui,
                  obj.DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy,
                  dataCBGV,
                )
              }
            })
        }
      })

      if (!hasError) {
        setLoading(false)
        await Promise.all(fetchListUpdate)
        queryClient.invalidateQueries({
          queryKey: [HoTroTBPM_QUERY_KEY.GET_DS_BAO_HONG],
        })
        setSelected([])
      }
    } catch (error) {
      console.error('Error fetching data:', error.message)
    }
  }

  // event: Xác nhận hoàn thành
  const handleConfirmSuccess = async () => {
    if (
      dataCBGV.MaNhanSu !== selected[0]?.DT_QLTS_TS_HoTroThietBi_XuLy_MaNhanSu
    ) {
      return Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Bạn không thể hoàn thành công việc của người khác!',
      })
    }

    if (selected.length === 0) {
      return Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng chọn ít nhất 1 yêu cầu để xác nhận hoàn thành!',
      })
    }

    if (!selected[0]?.DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy) {
      return Swal.fire({
        icon: 'warning',
        title: 'Lỗi',
        text: 'Yêu cầu báo hỏng chưa được xác nhận ngày xử lý!',
      })
    }

    if (
      selectedNguyenNhan.length <= 0 ||
      isEmpty(dataSuccessDetail.descNguyenNhan)
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng chọn và nhập mô tả đầy đủ cho phần nguyên nhân!',
      })
      return
    }

    if (selectedKQKP.length <= 0 || isEmpty(dataSuccessDetail.descKhacPhuc)) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng chọn và nhập mô tả đầy đủ cho phần kết quả khắc phục!',
      })
      return
    }

    const shouldConfirmEmail =
      selected[0]?.DT_QLTS_TS_HoTroThietBi_XuLy_GuiMail === null ||
      selected[0]?.DT_QLTS_TS_HoTroThietBi_XuLy_GuiMail === false ||
      selected[0]?.DT_QLTS_TS_HoTroThietBi_XuLy_GuiMail === undefined

    if (shouldConfirmEmail) {
      return Swal.fire({
        icon: 'question',
        title: 'Bạn muốn xác nhận hoàn thành mà không gửi email thông báo?',
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonText: 'Hủy',
        confirmButtonText: 'Đồng ý',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await putXacNhanSuaChuaHoanThanh({
              DT_QLTS_TS_HoTroThietBi_ID:
                selected[0]?.DT_QLTS_TS_HoTroThietBi_ID,
              DT_QLTS_TS_HoTroThietBi_XacNhan_NguyenNhan: selectedNguyenNhan
                .map((nn) => nn.DT_CVNB_TBGD_TL_Ten)
                .join('; '),
              DT_QLTS_TS_HoTroThietBi_XacNhan_NguyenNhan_MoTa:
                dataSuccessDetail.descNguyenNhan,
              DT_QLTS_TS_HoTroThietBi_XacNhan_KetQua: selectedKQKP
                .map((kq) => kq.DT_CVNB_TBGD_TL_Ten)
                .join('; '),
              DT_QLTS_TS_HoTroThietBi_XacNhan_KetQua_MoTa:
                dataSuccessDetail.descKhacPhuc,
              DT_QLTS_TS_HoTroThietBi_XacNhan_HoanThanh: '1',
              DT_QLTS_TS_HoTroThietBi_XacNhan_HoanThanh_MoTa: '',
            }).then(async () => {
              Swal.fire({
                icon: 'success',
                title: `Xác nhận hoàn thành sửa chữa tài sản ${selected[0]?.DT_QLTS_TS_HoTroThietBi_BaoHong_TenTaiSan} thành công!`,
              })

              queryClient.invalidateQueries({
                queryKey: [HoTroTBPM_QUERY_KEY.GET_DS_BAO_HONG],
              })
              setSelected([])
              return
            })
          } catch (error) {
            console.log(error)
            Swal.fire({
              icon: 'error',
              title: 'Lỗi',
              text: 'Đã có lỗi xảy ra. Vui lòng liên hệ bộ phận kỹ thuật để khắc phục!',
            })
          }
        }
      })
    } else {
      try {
        await putXacNhanSuaChuaHoanThanh({
          DT_QLTS_TS_HoTroThietBi_ID: selected[0]?.DT_QLTS_TS_HoTroThietBi_ID,
          DT_QLTS_TS_HoTroThietBi_XacNhan_NguyenNhan: selectedNguyenNhan
            .map((nn) => nn.DT_CVNB_TBGD_TL_Ten)
            .join('; '),
          DT_QLTS_TS_HoTroThietBi_XacNhan_NguyenNhan_MoTa:
            dataSuccessDetail.descNguyenNhan,
          DT_QLTS_TS_HoTroThietBi_XacNhan_KetQua: selectedKQKP
            .map((kq) => kq.DT_CVNB_TBGD_TL_Ten)
            .join('; '),
          DT_QLTS_TS_HoTroThietBi_XacNhan_KetQua_MoTa:
            dataSuccessDetail.descKhacPhuc,
          DT_QLTS_TS_HoTroThietBi_XacNhan_HoanThanh: '1',
          DT_QLTS_TS_HoTroThietBi_XacNhan_HoanThanh_MoTa: '',
        }).then(async () => {
          Swal.fire({
            icon: 'success',
            title: `Xác nhận hoàn thành sửa chữa tài sản ${selected[0]?.DT_QLTS_TS_HoTroThietBi_BaoHong_TenTaiSan} thành công!`,
          })

          if (
            selected[0].DT_QLTS_TS_HoTroThietBi_BaoHong_LoaiTaiKhoan === 'SV'
          ) {
            await sendEmail_HTTB_XacNhanHoanThanh_SVBaoHong(
              selected[0].DT_QLTS_TS_HoTroThietBi_BaoHong_Email,
              selected[0].DT_QLTS_TS_HoTroThietBi_BaoHong_TenTaiSan,
              selected[0].DT_QLTS_TS_HoTroThietBi_BaoHong_MaNhanSu,
              selected[0].DT_QLTS_TS_HoTroThietBi_BaoHong_HoTen,
              selected[0].DT_QLTS_TS_HoTroThietBi_BaoHong_TenPhongBan,
              selected[0].DT_QLTS_TS_HoTroThietBi_BaoHong_TenSuCo,
              selected[0].DT_QLTS_TS_HoTroThietBi_BaoHong_MoTa,
              selected[0].DT_QLTS_TS_HoTroThietBi_BaoHong_NgayGui,
              selected[0].DT_QLTS_TS_HoTroThietBi_XacNhan_NgayXacNhan,
              dataCBGV,
            )
          }

          if (
            selected[0].DT_QLTS_TS_HoTroThietBi_BaoHong_LoaiTaiKhoan === 'GV'
          ) {
            await sendEmail_HTTB_XacNhanHoanThanh_NguoiBaoHong(
              selected[0].DT_QLTS_TS_HoTroThietBi_BaoHong_Email,
              selected[0].DT_QLTS_TS_HoTroThietBi_BaoHong_TenTaiSan,
              selected[0].DT_QLTS_TS_HoTroThietBi_BaoHong_MaNhanSu,
              selected[0].DT_QLTS_TS_HoTroThietBi_BaoHong_HoTen,
              selected[0].DT_QLTS_TS_HoTroThietBi_BaoHong_TenPhongBan,
              selected[0].DT_QLTS_TS_HoTroThietBi_BaoHong_TenSuCo,
              selected[0].DT_QLTS_TS_HoTroThietBi_BaoHong_MoTa,
              selected[0].DT_QLTS_TS_HoTroThietBi_BaoHong_NgayGui,
              selected[0].DT_QLTS_TS_HoTroThietBi_XacNhan_NgayXacNhan,
              dataCBGV,
            )
          }
          queryClient.invalidateQueries({
            queryKey: [HoTroTBPM_QUERY_KEY.GET_DS_BAO_HONG],
          })
          setSelected([])
          return
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  // event: Hủy trả yêu cầu
  const handleCancel = async () => {
    if (selected.length === 0) {
      return Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng chọn ít nhất 1 yêu cầu để xác nhận hoàn thành!',
      })
    }

    const checkedDateConfirm = selected.map((obj) =>
      isNull(obj.DT_QLTS_TS_HoTroThietBi_XacNhan_NgayXacNhan),
    )

    if (!checkedDateConfirm[0]) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Yêu cầu đã được xác nhận sửa chữa. Vui lòng không hủy trả!',
      })
      return
    }
    const shouldConfirmEmail =
      selected[0]?.DT_QLTS_TS_HoTroThietBi_XuLy_GuiMail === null ||
      selected[0]?.DT_QLTS_TS_HoTroThietBi_XuLy_GuiMail === false ||
      selected[0]?.DT_QLTS_TS_HoTroThietBi_XuLy_GuiMail === undefined

    if (shouldConfirmEmail) {
      return Swal.fire({
        icon: 'question',
        title: 'Bạn muốn xác nhận hủy trả mà không gửi email thông báo?',
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonText: 'Hủy',
        confirmButtonText: 'Đồng ý',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await putXacNhanSuaChuaHoanThanh({
              DT_QLTS_TS_HoTroThietBi_ID:
                selected[0]?.DT_QLTS_TS_HoTroThietBi_ID,
              DT_QLTS_TS_HoTroThietBi_XacNhan_HoanThanh: '-1',
            }).then(async () => {
              Swal.fire({
                icon: 'success',
                title: `Xác nhận hủy trả sửa chữa tài sản ${selected[0]?.DT_QLTS_TS_HoTroThietBi_BaoHong_TenTaiSan} thành công!`,
              })

              queryClient.invalidateQueries({
                queryKey: [HoTroTBPM_QUERY_KEY.GET_DS_BAO_HONG],
              })
              setSelected([])
              return
            })
          } catch (error) {
            console.log(error)
          }
        }
      })
    } else {
      await Swal.fire({
        title: 'Nhập nội dung hủy trả',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off',
        },
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        preConfirm: async (noiDungHuyTra) => {
          try {
            if (isEmpty(noiDungHuyTra.trim()) || isNull(noiDungHuyTra)) {
              Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Vui lòng nhập nội dung hủy trả!',
                timer: 3000,
              })
              return
            }

            await putXacNhanSuaChuaHoanThanh({
              DT_QLTS_TS_HoTroThietBi_ID:
                selected[0]?.DT_QLTS_TS_HoTroThietBi_ID,
              DT_QLTS_TS_HoTroThietBi_XacNhan_HoanThanh: '-1',
            }).then(async () => {
              Swal.fire({
                icon: 'success',
                title: `Xác nhận hủy trả sửa chữa tài sản ${selected[0]?.DT_QLTS_TS_HoTroThietBi_BaoHong_TenTaiSan} thành công!`,
              })

              if (
                selected[0].DT_QLTS_TS_HoTroThietBi_BaoHong_LoaiTaiKhoan ===
                'SV'
              ) {
                await sendEmail_HTTB_HuyTra_SVBaoHong(
                  selected[0].DT_QLTS_TS_HoTroThietBi_BaoHong_Email,
                  selected[0].DT_QLTS_TS_HoTroThietBi_BaoHong_TenTaiSan,
                  selected[0].DT_QLTS_TS_HoTroThietBi_BaoHong_MaNhanSu,
                  selected[0].DT_QLTS_TS_HoTroThietBi_BaoHong_HoTen,
                  selected[0].DT_QLTS_TS_HoTroThietBi_BaoHong_TenPhongBan,
                  selected[0].DT_QLTS_TS_HoTroThietBi_BaoHong_TenSuCo,
                  selected[0].DT_QLTS_TS_HoTroThietBi_BaoHong_MoTa,
                  selected[0].DT_QLTS_TS_HoTroThietBi_BaoHong_NgayGui,
                  noiDungHuyTra,
                  dataCBGV,
                )
              }

              if (
                selected[0].DT_QLTS_TS_HoTroThietBi_BaoHong_LoaiTaiKhoan ===
                'GV'
              ) {
                await sendEmail_HTTB_HuyTra_NguoiBaoHong(
                  selected[0].DT_QLTS_TS_HoTroThietBi_BaoHong_Email,
                  selected[0].DT_QLTS_TS_HoTroThietBi_BaoHong_TenTaiSan,
                  selected[0].DT_QLTS_TS_HoTroThietBi_BaoHong_MaNhanSu,
                  selected[0].DT_QLTS_TS_HoTroThietBi_BaoHong_HoTen,
                  selected[0].DT_QLTS_TS_HoTroThietBi_BaoHong_TenPhongBan,
                  selected[0].DT_QLTS_TS_HoTroThietBi_BaoHong_TenSuCo,
                  selected[0].DT_QLTS_TS_HoTroThietBi_BaoHong_MoTa,
                  selected[0].DT_QLTS_TS_HoTroThietBi_BaoHong_NgayGui,
                  noiDungHuyTra,
                  dataCBGV,
                )
              }
              queryClient.invalidateQueries({
                queryKey: [HoTroTBPM_QUERY_KEY.GET_DS_BAO_HONG],
              })
              setSelected([])
              return
            })
          } catch (error) {
            console.log(error)
          }
        },
      })
    }
  }

  const handleClearFilter = () => {
    setFilters({
      DT_QLTS_TS_HoTroThietBi_BaoHong_MaTaiSan: '',
      DT_QLTS_TS_HoTroThietBi_BaoHong_TenTaiSan: '',
      DT_QLTS_TS_HoTroThietBi_BaoHong_CoSo: '',
      DT_QLTS_TS_HoTroThietBi_BaoHong_DiaDiem: '',
      DT_QLTS_TS_HoTroThietBi_BaoHong_ToaNha: '',
      DT_QLTS_TS_HoTroThietBi_BaoHong_Tang: '',
      DT_QLTS_TS_HoTroThietBi_BaoHong_TenPhong: '',
      DT_QLTS_TS_HoTroThietBi_BaoHong_TenSuCo: '',
      DT_QLTS_TS_HoTroThietBi_BaoHong_MoTa: '',
      DT_QLTS_TS_HoTroThietBi_BaoHong_NgayGui: '',
      DT_QLTS_TS_HoTroThietBi_BaoHong_MaNhanSu: '',
      DT_QLTS_TS_HoTroThietBi_BaoHong_HoTen: '',
      DT_QLTS_TS_HoTroThietBi_BaoHong_TenPhongBan: '',
      DT_QLTS_TS_HoTroThietBi_BaoHong_SoDienThoai: '',
      DT_QLTS_TS_HoTroThietBi_XuLy_MaNhanSu: '',
      DT_QLTS_TS_HoTroThietBi_XuLy_HoTen: '',
      DT_QLTS_TS_HoTroThietBi_XuLy_TenPhongBan: '',
      DT_QLTS_TS_HoTroThietBi_XuLy_SoDienThoai: '',
      DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy: '',
    })
  }

  return (
    <SuaChuaTaiSanView
      loading={isLoading}
      loadingAction={loading}
      isModeHandler={isModeHandle}
      onSetModeHandler={setIsModeHandle}
      page={page}
      onSetPage={setPage}
      itemPerPage={itemPerPage}
      onSetItemPerPage={setItemPerPage}
      listBaoHong={dataBaoHongArrQuery}
      zoom={zoom}
      filters={filters}
      onZoom={setZoom}
      selected={selected}
      dataListNguyenNhan={listNguyenNhan || []}
      dataListKhacPhucSuCo={listKetQuaKhacPhuc || []}
      dataSelectedNguyenNhan={selectedNguyenNhan}
      dataSelectedKQKP={selectedKQKP}
      onSelected={setSelected}
      onConfirmNgayXuLy={handleConfirmNgayXuLy}
      onConfirmSuccess={handleConfirmSuccess}
      onUpdateNgayXuLy={handleUpdateItemSelected}
      onChangeValueFilter={handleChangeValueFilter}
      onClearFilter={handleClearFilter}
      onSelectedNguyenNhan={setSelectedNguyenNhan}
      onSelectedKQKP={setSelectedKQKP}
      onCancel={handleCancel}
      onChangeDescSuccess={handleChangeDescSuccess}
    />
  )
}

export default SuaChuaTaiSan

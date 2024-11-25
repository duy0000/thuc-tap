import { useEffect, useMemo, useState } from 'react'
import CanBoNghiepVuView from './CanBoNghiepVuView'
import {
  getAllHoSoGuiYeuCau,
  getAllHoSoGuiYeuCauByNhanSuXuLy,
  putHoSoThuTucGuiYeuCauById,
} from '@/Apis/ApiGiangVien/ThuTucHanhChinhGiangVien/apiThuTucHanhChinhGiangVien'
import {
  getListTrangThaiTTHCGV,
  getTrangThaiIDBySTTYeuCauId,
} from '@/Apis/ApiGiangVien/ThuTucHanhChinhGiangVien/apiTrangThai'
import Swal from 'sweetalert2'
import {
  TEMPLATE_SUBJECT_RECEIVED_EMAIL,
  sendEmailTTHCGiangVien,
} from '@/Services/Utils/emailUtils'
import { DataCanBoGV } from '@/Services/Utils/dataCanBoGV'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import { getThanhPhanHoSoByIdTTHCGV } from '@/Apis/ApiGiangVien/ThuTucHanhChinhGiangVien/apiThanhPhanHoSo'
import { useQueries } from '@tanstack/react-query'
import { TTHCGV_QUERY_KEY } from '@/Services/QueryStores/QueryKeyStores/TTHCGV.querykey'
import { ENUM_STATE_TTHCGV } from '../constants'

function CanBoNghiepVu() {
  const [keywordSearch, setKeywordSearch] = useState('')
  const [selectedTrangThai, setSelectedTrangThai] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const dataCBGV = DataCanBoGV()

  const { pathname, state } = useLocation()

  const dieuKienLocHoSoYeuCau = useMemo(() => {
    switch (state?.status) {
      case ENUM_STATE_TTHCGV.TAT_CA:
        return 0
      case ENUM_STATE_TTHCGV.CAN_XU_LY:
        return 1
      case ENUM_STATE_TTHCGV.SAP_DEN_HAN_1_NGAY:
        return 2
      case ENUM_STATE_TTHCGV.QUA_HAN:
        return 3
      default:
        return 0
    }
  }, [state])

  const initialDataFilter = {
    MC_TTHC_GV_TenThuTuc: '',
    MC_TTHC_GV_NhanSuGui_HoTen: '',
    MC_TTHC_GV_NoiTiepNhan: '',
    MC_TTHC_GV_GuiYeuCau_NgayGui: '',
  }
  const [dataFilter, setDataFilter] = useState(initialDataFilter)

  const [listAllHoSoYeuCau, listTTHCGVYeuCauQuery, listTrangThaiHoSoQuery] =
    useQueries({
      queries: [
        {
          queryKey: [TTHCGV_QUERY_KEY.SP_MC_TTHC_GV_GuiYeuCau_Load, pathname],
          queryFn: async () => {
            const response = await getAllHoSoGuiYeuCau()
            return response
          },
          retry: 3,
          retryDelay: 30 * 1000,
        },
        {
          queryKey: [
            TTHCGV_QUERY_KEY.SP_MC_TTHC_GV_GuiYeuCau_Load_DuLieu_ByMaNhanSu,
            dieuKienLocHoSoYeuCau,
            dataCBGV?.MaNhanSu,
            dataFilter?.MC_TTHC_GV_TenThuTuc,
            dataFilter?.MC_TTHC_GV_NhanSuGui_HoTen,
            dataFilter?.MC_TTHC_GV_NoiTiepNhan,
            dataFilter?.MC_TTHC_GV_GuiYeuCau_NgayGui,
          ],
          queryFn: async () => {
            const response = await getAllHoSoGuiYeuCauByNhanSuXuLy({
              DieuKienLoc: dieuKienLocHoSoYeuCau,
              MaNhanSu: dataCBGV?.MaNhanSu,
              MC_TTHC_GV_TenThuTuc: dataFilter?.MC_TTHC_GV_TenThuTuc,
              MC_TTHC_GV_NhanSuGui_HoTen:
                dataFilter?.MC_TTHC_GV_NhanSuGui_HoTen,
              MC_TTHC_GV_NoiTiepNhan: dataFilter?.MC_TTHC_GV_NoiTiepNhan,
              MC_TTHC_GV_GuiYeuCau_NgayGui:
                dataFilter?.MC_TTHC_GV_GuiYeuCau_NgayGui,
            })
            return response
          },
          retry: 3,
          retryDelay: 30 * 1000,
        },
        {
          queryKey: [
            TTHCGV_QUERY_KEY.SP_MC_TTHC_GV_GuiYeuCau_Load_All_TrangThai,
          ],
          queryFn: async () => {
            const response = await getListTrangThaiTTHCGV()
            return response
          },
          retry: 3,
          retryDelay: 30 * 1000,
        },
      ],
    })

  const postAllGuiYeuCauFilter = useMemo(() => {
    let filteredDataTHTCGVGuiYeuCau = listTTHCGVYeuCauQuery?.data?.data?.body
      ? listTTHCGVYeuCauQuery?.data?.data?.body
      : []
    if (keywordSearch) {
      filteredDataTHTCGVGuiYeuCau =
        listTTHCGVYeuCauQuery?.data?.data?.body?.filter((item) =>
          item?.MC_TTHC_GV_TenThuTuc?.trim()
            .toLowerCase()
            .includes(keywordSearch?.trim().toLowerCase()),
        )
    }

    if (selectedTrangThai) {
      filteredDataTHTCGVGuiYeuCau =
        listTTHCGVYeuCauQuery?.data?.data?.body?.filter(
          (item) =>
            item?.MC_TTHC_GV_TrangThai_TenTrangThai === selectedTrangThai,
        )
    }
    return filteredDataTHTCGVGuiYeuCau
  }, [keywordSearch, selectedTrangThai, listTTHCGVYeuCauQuery])

  const postShowTTHCGVGuiYeuCau = useMemo(() => {
    let filteredDataTHTCGVGuiYeuCau = listTTHCGVYeuCauQuery?.data?.data?.body
      ? listTTHCGVYeuCauQuery?.data?.data?.body
      : []
    if (keywordSearch) {
      filteredDataTHTCGVGuiYeuCau =
        listTTHCGVYeuCauQuery?.data?.data?.body?.filter((item) =>
          item?.MC_TTHC_GV_TenThuTuc.toLowerCase().includes(
            keywordSearch.toLowerCase(),
          ),
        )
    }

    if (selectedTrangThai) {
      filteredDataTHTCGVGuiYeuCau =
        listTTHCGVYeuCauQuery?.data?.data?.body?.filter(
          (item) =>
            item?.MC_TTHC_GV_TrangThai_TenTrangThai === selectedTrangThai,
        )
    }

    filteredDataTHTCGVGuiYeuCau = filteredDataTHTCGVGuiYeuCau?.slice(
      +currentPage * itemsPerPage,
      +currentPage * itemsPerPage + +itemsPerPage,
    )
    return filteredDataTHTCGVGuiYeuCau
  }, [
    keywordSearch,
    selectedTrangThai,
    listTTHCGVYeuCauQuery?.data?.data?.body,
    currentPage,
    itemsPerPage,
    pathname,
  ])

  const _pageCount = useMemo(() => {
    return Math.ceil(postAllGuiYeuCauFilter?.length / itemsPerPage)
  }, [listAllHoSoYeuCau, itemsPerPage])

  // event handlers
  const handleTiepNhanHoSo = async (itemYeuCau) => {
    if (
      itemYeuCau?.MC_TTHC_GV_GuiYeuCau_TrangThai_ID == 0 ||
      !itemYeuCau?.MC_TTHC_GV_GuiYeuCau_TrangThai_ID
    ) {
      Swal.fire({
        title: 'Hồ sơ yêu cầu chưa được tiếp nhận!',
        text: 'Bạn có muốn tiếp nhận hồ sơ để tiếp tục xử lý yêu cầu?',
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const resNewTrangThaiID = await getTrangThaiIDBySTTYeuCauId(
            itemYeuCau?.MC_TTHC_GV_GuiYeuCau_YeuCau_ID,
            1,
          )
          const resListTPHSDeNghiYeuCau = await getThanhPhanHoSoByIdTTHCGV(
            itemYeuCau?.MC_TTHC_GV_GuiYeuCau_YeuCau_ID,
          )

          let listTPHSDeNghiYeuCau = []
          if (resListTPHSDeNghiYeuCau.status === 200) {
            const data = await resListTPHSDeNghiYeuCau.data?.body
            listTPHSDeNghiYeuCau = [...data]
          }
          if (resNewTrangThaiID.status === 200) {
            const dataTrangThaiIDNew = await resNewTrangThaiID.data?.body[0]
            if (dataTrangThaiIDNew) {
              const newDataUpdate = {
                ...itemYeuCau,
                MC_TTHC_GV_GuiYeuCau_TrangThai_ID:
                  dataTrangThaiIDNew?.MC_TTHC_GV_TrangThai_ID,
                MC_TTHC_GV_GuiYeuCau_TrangThai_GhiChu:
                  dataTrangThaiIDNew?.MC_TTHC_GV_TrangThai_MoTa
                    ? dataTrangThaiIDNew?.MC_TTHC_GV_TrangThai_MoTa
                    : dataTrangThaiIDNew?.MC_TTHC_GV_TrangThai_TenTrangThai,
              }
              const resPutHoSoThuTuc =
                await putHoSoThuTucGuiYeuCauById(newDataUpdate)

              if (resPutHoSoThuTuc.status === 200) {
                await sendEmailTTHCGiangVien(
                  TEMPLATE_SUBJECT_RECEIVED_EMAIL,
                  itemYeuCau,
                  dataCBGV,
                  listTPHSDeNghiYeuCau,
                  'Hồ sơ yêu cầu của quý Thầy/Cô đã được tiếp nhận. Vui lòng chờ kết quả xử lý theo thông báo!',
                  '',
                  '',
                )
                listTTHCGVYeuCauQuery.refetch()
                toast.success('Đã tiếp nhận yêu cầu hồ sơ!')
              }
            }
          }
        } else {
          toast.success('Đã huỷ tiếp nhận hồ sơ!')
          return
        }
      })
    }
  }

  const handleSelectedTrangThai = (value) => {
    setSelectedTrangThai(value)
    setCurrentPage(0)
  }

  const handleSearch = (value) => {
    setKeywordSearch(value)
    setCurrentPage(0)
  }

  const handlePageChange = (e) => {
    setCurrentPage(e)
  }

  useEffect(() => {
    setCurrentPage(0)
    setSelectedTrangThai('')
    setKeywordSearch('')
  }, [pathname])

  return (
    <CanBoNghiepVuView
      loading={listTTHCGVYeuCauQuery.isLoading}
      totalYeuCau={postAllGuiYeuCauFilter?.length || 0}
      pageCount={_pageCount || 0}
      keywordSearch={keywordSearch}
      listTrangThaiHoSo={listTrangThaiHoSoQuery.data?.data?.body || []}
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      postShowTTHCGVGuiYeuCau={postShowTTHCGVGuiYeuCau}
      setPage={handlePageChange}
      setItemsPerPage={setItemsPerPage}
      handleTiepNhanHoSo={handleTiepNhanHoSo}
      onSearch={handleSearch}
      setSelectedTrangThai={handleSelectedTrangThai}
      dataFilterInit={initialDataFilter}
      dataFilter={dataFilter}
      setDataFilter={setDataFilter}
    />
  )
}

export default CanBoNghiepVu

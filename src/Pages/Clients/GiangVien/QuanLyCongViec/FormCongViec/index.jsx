import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Dialog from '@mui/material/Dialog'
import Slide from '@mui/material/Slide'
import { Autocomplete, Checkbox, TextField } from '@mui/material'
import Button from '@/Components/Base/Button/Button'
import { Formik } from 'formik'
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { QLCV_QUERY_KEY } from '@/Services/QueryStores/QueryKeyStores/QuanLyCongViec.querykey'
import { DataHocKy } from '@/Services/Redux/Slice/hocKySlice'
import { apiQuanLyCongViec } from '@/Apis/ApiGiangVien/QuanLyCongViec'
import { enumDanhMucCongViec } from '../constants'
import DanhSachNhanSuCongViec from '../components/DanhSachNhanSuCongViec'
import { enumActionAddCongViec } from '@/Layouts/LayoutQuanLyCongViec/constants'
import { validationSchemaFormCongViec } from './validation'
import {
  arrayBufferToBase64,
  convertDataFileToBase64,
  DataCanBoGV,
  dayjs,
  handleDownloadFileBase64,
} from '@/Services/Utils'
import { isEmpty, isNull, omit } from 'lodash-unified'
import { toast } from 'react-toastify'
import { asyncPool } from '@/Services/Utils/poolData'
import { FaTrash } from 'react-icons/fa'
import { DebounceInput } from 'react-debounce-input'
import moment from 'moment-timezone'
import useQueryParams from '@/Services/Hooks/useQueryParams'
import clsx from 'clsx'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const FormCongViec = memo(function FormCongViec({
  dataDetail,
  title,
  open,
  onClose,
  typeAdd,
  onSetDataCongViec,
}) {
  const searchQueryParams = useQueryParams()

  const _isMultiSelectCV = useMemo(() => {
    return searchQueryParams?.action !== 'edit'
  }, [searchQueryParams])

  const initialValueForm = {
    CV_HT_KhoiTaoCV_KhoiTao_TenNhomThucHien:
      dataDetail?.CV_HT_PhanCongThucHien_NhomThucHien || '',
    CV_HT_KhoiTaoCV_KeHoach_DonViDeNghi:
      dataDetail?.CV_HT_NhomThucHien_DonViDeNghi || '',
    CV_HT_KhoiTaoCV_KeHoach_HocKy: dataDetail?.CV_HT_NhomThucHien_HocKy || '',
    CV_HT_KhoiTaoCV_KhoiTao_GiaoNhanViec: 'Thực hiện',
    CV_HT_KhoiTaoCV_KeHoach_XacDinhCongViec:
      dataDetail?.CV_HT_KhoiTaoCV_KeHoach_LoaiCongViec || '',
    CV_HT_KhoiTaoCV_KeHoach_UuTien:
      dataDetail?.CV_HT_PhanCongThucHien_UuTien || '',
    CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCha:
      dataDetail?.CV_HT_PhanCongThucHien_NhomCongViecCha || '',
    CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCon:
      dataDetail?.CV_HT_PhanCongThucHien_NhomCongViecCon || '',
    CV_HT_KhoiTaoCV_KeHoach_TenCongViec:
      dataDetail?.CV_HT_PhanCongThucHien_TenCongViec || '',
    CV_HT_KhoiTaoCV_KeHoach_TenCongViec_Array:
      [dataDetail?.CV_HT_PhanCongThucHien_TenCongViec] || [],
    CV_HT_KhoiTaoCV_KeHoach_TenFile:
      dataDetail?.CV_HT_PhanCongThucHien_TenFile || '',
    CV_HT_KhoiTaoCV_KeHoach_DataFile:
      dataDetail?.CV_HT_PhanCongThucHien_DataFile || '',
    CV_HT_KhoiTaoCV_KeHoach_IDNhanSu: '',
    CV_HT_KhoiTaoCV_KeHoach_LoaiGiaoViec: 'Giao việc trực tiếp',
    CV_HT_KhoiTaoCV_KeHoach_NgayBatDau:
      dataDetail?.CV_HT_PhanCongThucHien_NgayBatDau || '',
    CV_HT_KhoiTaoCV_KeHoach_NgayKetThuc:
      dataDetail?.CV_HT_PhanCongThucHien_NgayKetThuc || '',
    CV_HT_KhoiTaoCV_KeHoach_GhiChu:
      dataDetail?.CV_HT_PhanCongThucHien_GhiChu || '',
    IDNhanSu: null,
    HT_USER_Create: '',
    isMultiSelectCV: _isMultiSelectCV,
  }

  const formikRef = useRef(null)
  const fileInputRef = useRef(null)

  const dataCBGV = DataCanBoGV()

  const { listHocKy } = DataHocKy()
  // eslint-disable-next-line no-unused-vars
  const [tenNhomCvThucHien, setTenNhomCvThucHien] = useState([])
  const [nhomThucHien, setNhomThucHien] = useState(null)
  const [selectedNhanSu, setSelectedNhanSu] = useState([])
  const [selectNhomCvCha, setSelectNhomCvCha] = useState('')
  const [selectNhomCvCon, setSelectNhomCvCon] = useState('')
  const [selectTenCv, setSelectTenCv] = useState([])

  const queryClient = useQueryClient()

  const [
    dataTenNhomCV,
    dataDonViDeNghi,
    dataNhomCVCha,
    dataNhomCVCon,
    dataTenCongViec,
    dataXacDinhCongViec,
    dataMucDoUuTien,
  ] = useQueries({
    queries: [
      // 1. DS Tên nhóm công việc
      {
        queryKey: [QLCV_QUERY_KEY.GET_TEN_NHOM_CONG_VIEC],
        queryFn: async () => {
          const response = await apiQuanLyCongViec.getNhomThucHien()
          return response.data
        },
      },
      // 2. DS đơn vị đề nghị
      {
        queryKey: [QLCV_QUERY_KEY.GET_DONVI_DENGHI],
        queryFn: async () => {
          const response = await apiQuanLyCongViec.getPhongBan()
          return response.data
        },
      },
      // 3. DS nhóm công việc cha
      {
        queryKey: [QLCV_QUERY_KEY.GET_NHOM_CV_CHA],
        queryFn: async () => {
          const response = await apiQuanLyCongViec.getTenNhomCVCha()
          return response.data
        },
      },
      // 4. DS nhóm công việc con
      {
        queryKey: [
          QLCV_QUERY_KEY.GET_NHOM_CV_CON,
          selectNhomCvCha,
          initialValueForm.CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCha,
        ],
        queryFn: async () => {
          const response = await apiQuanLyCongViec.getTenNhomCVCon({
            CV_HT_KhungNhomCongViec_TenNhomCVCha:
              selectNhomCvCha ||
              initialValueForm.CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCha,
          })
          return response.data
        },
        enabled: dataDetail
          ? true
          : !!selectNhomCvCha ||
            !!initialValueForm.CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCha,
      },
      // 5. Tên công việc
      {
        queryKey: [
          QLCV_QUERY_KEY.GET_TEN_CONG_VIEC,
          selectNhomCvCon,
          initialValueForm.CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCon,
        ],
        queryFn: async () => {
          const response = await apiQuanLyCongViec.getTenCongViec({
            CV_HT_KhungCongViec_NhomCVCon:
              selectNhomCvCon ||
              initialValueForm.CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCon,
          })
          return response.data
        },
        enabled: dataDetail
          ? true
          : !!selectNhomCvCon ||
            !!initialValueForm.CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCha,
      },
      // 6. Xác định loại công việc
      {
        queryKey: [
          QLCV_QUERY_KEY.GET_LOAI_CONG_VIEC,
          enumDanhMucCongViec.LoaiCongViec,
        ],
        queryFn: async () => {
          const response = await apiQuanLyCongViec.getTenNhom1({
            CV_HT_DanhMuc_MaNhom1: enumDanhMucCongViec.LoaiCongViec,
          })
          return response.data
        },
      },
      // 7. Mức độ ưu tiên
      {
        queryKey: [
          QLCV_QUERY_KEY.GET_MUC_DO_UU_TIEN,
          enumDanhMucCongViec.UuTienCongViec,
        ],
        queryFn: async () => {
          const response = await apiQuanLyCongViec.getTenNhom1({
            CV_HT_DanhMuc_MaNhom1: enumDanhMucCongViec.UuTienCongViec,
          })
          return response.data
        },
      },
    ],
  })

  // mutation
  const { mutateAsync: mutateCreateCVCaNhanAsync } = useMutation({
    mutationFn: async (data) => {
      return await apiQuanLyCongViec.addCongViecCaNhan({
        ...data,
      })
    },
    onError: () => {
      toast.error('Có lỗi xảy ra! Vui lòng thử lại sau.')
    },
  })
  const { mutateAsync: mutateGiaoViecTrucTiepAsync } = useMutation({
    mutationFn: async (data) => {
      return await apiQuanLyCongViec.addCongViec(data)
    },
    onError: () => {
      toast.error('Giao việc thất bại! Vui lòng thử lại sau.')
    },
  })
  const { mutateAsync: mutateEditCongViecCaNhanAsync } = useMutation({
    mutationFn: async (data) => {
      return await apiQuanLyCongViec.editCongViecCaNhan(data)
    },
  })

  const _listTenNhomCongViec = useMemo(() => {
    return dataTenNhomCV?.data?.body ?? []
  }, [dataTenNhomCV])

  const _listDonViDeNghi = useMemo(() => {
    return dataDonViDeNghi?.data?.body ?? []
  }, [dataDonViDeNghi])

  const _listNhomCvCha = useMemo(() => {
    return dataNhomCVCha?.data?.body ?? []
  }, [dataNhomCVCha])

  const _listNhomCvCon = useMemo(() => {
    return dataNhomCVCon?.data?.body ?? []
  }, [dataNhomCVCon])

  const _listTenCongViec = useMemo(() => {
    return dataTenCongViec?.data?.body ?? []
  }, [dataTenCongViec])

  const _listXacDinhCongViec = useMemo(() => {
    return dataXacDinhCongViec?.data?.body ?? []
  }, [dataXacDinhCongViec])

  const _listUuTienCongViec = useMemo(() => {
    return dataMucDoUuTien?.data?.body ?? []
  }, [dataMucDoUuTien])

  // Fetch File từ Nhóm thực hiện
  const { data: dataFileDeNghiQuery, isLoading: isLoadingFileDeNghi } =
    useQuery({
      queryKey: [
        QLCV_QUERY_KEY.GET_FILE_DE_NGHI_NHOMTHUCHIEN,
        dataDetail?.CV_HT_PhanCongThucHien_NhomThucHien,
        nhomThucHien,
      ],
      queryFn: async () => {
        const response = await apiQuanLyCongViec.getFileNhomThucHien({
          CV_HT_NhomThucHien_NhomThucHien:
            dataDetail?.CV_HT_PhanCongThucHien_NhomThucHien || nhomThucHien,
        })
        return response.data
      },
      enabled:
        Boolean(dataDetail?.CV_HT_PhanCongThucHien_NhomThucHien) ||
        Boolean(nhomThucHien),
    })

  const __fileDeNghiNhomThucHien = useMemo(() => {
    const fileList = dataFileDeNghiQuery?.body
    return Array.isArray(fileList) && fileList.length > 0
      ? {
          fileName: fileList[0]?.CV_HT_NhomThucHien_TenFile || null,
          dataFile: fileList[0]?.CV_HT_NhomThucHien_DataFile || null,
        }
      : null
  }, [
    dataFileDeNghiQuery?.body,
    dataDetail?.CV_HT_PhanCongThucHien_NhomThucHien,
    nhomThucHien,
  ])

  // Effect
  useEffect(() => {
    if (
      formikRef.current?.values?.CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCha ||
      initialValueForm.CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCha
    ) {
      dataNhomCVCon.refetch()
    }
  }, [
    formikRef.current?.values?.CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCha,
    initialValueForm,
  ])
  useEffect(() => {
    if (formikRef.current?.values?.CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCon) {
      dataTenCongViec.refetch()
    }
  }, [formikRef.current?.values?.CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCon])

  useEffect(() => {
    queryClient.invalidateQueries([
      QLCV_QUERY_KEY.GET_FILE_DE_NGHI_NHOMTHUCHIEN,
    ])
  }, [
    formikRef.current?.values?.CV_HT_KhoiTaoCV_KhoiTao_TenNhomThucHien,
    dataDetail?.CV_HT_PhanCongThucHien_NhomThucHien,
  ])

  useEffect(() => {
    if (dataDetail) {
      const dataNhanSuKiemTra = [
        {
          CV_HT_NhanSu_ID:
            dataDetail.CV_HT_PhanCongThucHien_KiemTra_IDNhanSuKiemTra,
        },
      ]
      setSelectedNhanSu(dataNhanSuKiemTra)
    }
  }, [dataDetail])

  const handleSelectNhanSu = (dataNS, isSelectedIndex, fromCheckbox) => {
    if (typeAdd === enumActionAddCongViec.TAO_VIEC_CUA_TOI) {
      // Tạo việc của tôi -> single select
      setSelectedNhanSu((prev) => {
        if (
          prev.some((item) => item?.CV_HT_NhanSu_ID === dataNS?.CV_HT_NhanSu_ID)
        ) {
          return [] // Bỏ chọn nhân sự
        }
        return [dataNS] // Chọn nhân sự mới
      })
    } else if (typeAdd === enumActionAddCongViec.GIAO_VIEC_TRUC_TIEP) {
      // Giao việc trực tiếp -> multi select
      setSelectedNhanSu((prev) => {
        if (fromCheckbox && isSelectedIndex === -1) {
          return [...prev, dataNS]
        }

        if (fromCheckbox) {
          // Nếu nhân sự đã được chọn, cập nhật nhân sự (không loại bỏ)
          return prev.filter(
            (item) => item?.CV_HT_NhanSu_ID !== dataNS?.CV_HT_NhanSu_ID,
          )
        }

        // Update Vai trò
        prev[isSelectedIndex].CV_HT_NhanSu_VaiTro = dataNS?.CV_HT_NhanSu_VaiTro

        // Nếu chưa chọn, thêm nhân sự vào danh sách
        return [...prev]
      })
    } else {
      // edit/update: Chọn nhân sự kiểm tra
      setSelectedNhanSu((prev) => {
        if (
          prev.some((item) => item?.CV_HT_NhanSu_ID === dataNS?.CV_HT_NhanSu_ID)
        ) {
          return [] // Bỏ chọn nhân sự
        }
        return [dataNS] // Chọn nhân sự mới
      })
    }
  }

  // 1. event Tạo việc của tôi
  const handleTaoViecCuaToi = async (values) => {
    const dataCreateMyJob = omit(
      values,
      'CV_HT_KhoiTaoCV_KeHoach_TenCongViec_Array',
      'IDNhanSu',
      'isMultiSelectCV',
    )

    if (selectedNhanSu.length === 0) {
      toast.error('Vui lòng chọn nhân sự kiểm tra!')
      return
    }

    const isExistYourself = selectedNhanSu.some(
      (ns) => ns?.CV_HT_NhanSu_MaNhanSu === dataCBGV.MaNhanSu,
    )

    if (isExistYourself) {
      toast.error('Không thể chọn chính mình làm người kiểm tra!')
      return
    }

    const _listCreateMyJob = selectTenCv.map((cv) => ({
      ...dataCreateMyJob,
      CV_HT_KhoiTaoCV_KeHoach_TenCongViec: cv.CV_HT_KhungCongViec_TenCongViec,
      CV_HT_KhoiTaoCV_KeHoach_IDNhanSu: selectedNhanSu[0].CV_HT_NhanSu_ID, // ID Nhân sự kiểm tra
      HT_USER_Create: dataCBGV.HT_USER_ID,
    }))

    const resPoolAsync = await asyncPool(
      5,
      _listCreateMyJob,
      mutateCreateCVCaNhanAsync,
    )
    // post
    if (resPoolAsync?.length === _listCreateMyJob?.length) {
      toast.success('Tạo mới công việc cá nhân thành công!')
      onClose && onClose()
      setSelectedNhanSu([])
      formikRef.current?.resetForm()
      queryClient.invalidateQueries({
        queryKey: [QLCV_QUERY_KEY.GET_CV_ChuaThucHien],
      })
    }
  }

  // 2. event Giao việc trực tiếp
  const handleGiaoViecTrucTiep = (values) => {
    const dataCreateMyJob = omit(
      values,
      'CV_HT_KhoiTaoCV_KeHoach_TenCongViec_Array',
      'isMultiSelectCV',
    )

    if (selectedNhanSu.length === 0) {
      toast.error('Vui lòng chọn nhân sự kiểm tra!')
      return
    }

    const isExistYourself = selectedNhanSu.some(
      (ns) => ns?.CV_HT_NhanSu_MaNhanSu === dataCBGV.MaNhanSu,
    )

    if (isExistYourself) {
      toast.error('Không thể chọn chính mình là nhân sự thực hiện!')
      return
    }

    const isNhanSuHasRole = selectedNhanSu.some((ns) =>
      isEmpty(ns.CV_HT_NhanSu_VaiTro),
    )

    if (isNhanSuHasRole) {
      toast.error('Vui lòng chọn đủ vai trò thực hiện cho nhân sự!')
      return
    }

    const _listDataCreateJob = selectTenCv.map((cv) => ({
      ...dataCreateMyJob,
      CV_HT_KhoiTaoCV_KeHoach_TenCongViec: cv.CV_HT_KhungCongViec_TenCongViec,
      HT_USER_Create: dataCBGV.HT_USER_ID,
    }))

    const arrayCVPush = selectedNhanSu.reduce((acc, ns) => {
      const jobsForNhanSu = selectTenCv.map((cv) => ({
        ...dataCreateMyJob,
        CV_HT_KhoiTaoCV_KeHoach_TenCongViec: cv.CV_HT_KhungCongViec_TenCongViec,
        CV_HT_KhoiTaoCV_KeHoach_LoaiGiaoViec: 'Giao trực tiếp',
        HT_USER_Create: dataCBGV.HT_USER_ID,
        CV_HT_KhoiTaoCV_KeHoach_IDNhanSu: String(ns.CV_HT_NhanSu_ID),
        IDNhanSu: dataCBGV.CV_HT_NhanSu_ID,
        CV_HT_KhoiTaoCV_KhoiTao_GiaoNhanViec:
          ns?.CV_HT_NhanSu_VaiTro || 'Thực hiện',
      }))
      acc.push(jobsForNhanSu)
      return acc
    }, [])

    // Lọc những giá trị hợp lệ (không phải null hay undefined) từ arrayCVPush
    const _NhanSuNhanViec = arrayCVPush.filter(Boolean)

    _NhanSuNhanViec.map(async (cvns) => {
      const resPoolAsync = await asyncPool(5, cvns, mutateGiaoViecTrucTiepAsync)
      if (resPoolAsync?.length === _listDataCreateJob?.length) {
        toast.success('Giao việc thành công!')
        onClose && onClose()
        setSelectedNhanSu([])
        formikRef.current?.resetForm()
        queryClient.invalidateQueries({
          queryKey: [QLCV_QUERY_KEY.GET_CV_ChuaThucHien],
        })
      }
    })
  }

  // 3. event Update công việc cá nhân
  const handleUpdateCongViec = async (values) => {
    const res = await mutateEditCongViecCaNhanAsync({
      CV_HT_KhoiTaoCV_ID: dataDetail.CV_HT_PhanCongThucHien_IDKhoiTaoCV,
      CV_HT_KhoiTaoCV_KhoiTao_TenNhomThucHien:
        values.CV_HT_KhoiTaoCV_KhoiTao_TenNhomThucHien,
      CV_HT_KhoiTaoCV_KhoiTao_GiaoNhanViec:
        values.CV_HT_KhoiTaoCV_KhoiTao_GiaoNhanViec,
      CV_HT_KhoiTaoCV_KeHoach_XacDinhCongViec:
        values.CV_HT_KhoiTaoCV_KeHoach_XacDinhCongViec,
      CV_HT_KhoiTaoCV_KeHoach_UuTien: values.CV_HT_KhoiTaoCV_KeHoach_UuTien,
      CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCha:
        values.CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCha,
      CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCon:
        values.CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCon,
      CV_HT_KhoiTaoCV_KeHoach_TenCongViec:
        dataDetail.CV_HT_PhanCongThucHien_TenCongViec,
      CV_HT_KhoiTaoCV_KeHoach_TenFile: values.CV_HT_KhoiTaoCV_KeHoach_TenFile,
      CV_HT_KhoiTaoCV_KeHoach_DataFile: values.CV_HT_KhoiTaoCV_KeHoach_DataFile,
      CV_HT_KhoiTaoCV_KeHoach_IDNhanSu: selectedNhanSu[0].CV_HT_NhanSu_ID,
      CV_HT_KhoiTaoCV_KeHoach_LoaiGiaoViec:
        values.CV_HT_KhoiTaoCV_KeHoach_LoaiGiaoViec,
      CV_HT_KhoiTaoCV_KeHoach_NgayBatDau:
        values.CV_HT_KhoiTaoCV_KeHoach_NgayBatDau,
      CV_HT_KhoiTaoCV_KeHoach_NgayKetThuc:
        values.CV_HT_KhoiTaoCV_KeHoach_NgayKetThuc,
      CV_HT_KhoiTaoCV_KeHoach_GhiChu: values.CV_HT_KhoiTaoCV_KeHoach_GhiChu,
      HT_USER_Editor: dataCBGV.HT_USER_ID,
    })
    if (res) {
      toast.success('Sửa công việc thành công!')
      onClose && onClose()
      setSelectedNhanSu([])
      // formikRef.current?.resetForm()
      queryClient.invalidateQueries({
        queryKey: [QLCV_QUERY_KEY.GET_CV_ChuaThucHien],
      })
    } else {
      toast.error('Sửa công việc thất bại')
    }
  }
  // 4. submit form
  const handleSubmitForm = (values) => {
    if (typeAdd === enumActionAddCongViec.TAO_VIEC_CUA_TOI) {
      handleTaoViecCuaToi(values)
    } else if (typeAdd === enumActionAddCongViec.GIAO_VIEC_TRUC_TIEP) {
      handleGiaoViecTrucTiep(values)
    } else if (searchQueryParams?.action === 'edit') {
      // update
      handleUpdateCongViec(values)
    }
  }

  console.log('dataDetail: ', dataDetail)

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <div className="relative h-16 w-full flex items-center justify-between bg-sky-800 p-4">
          <div className="text-white">
            <h3 className="text-xl font-bold">{title ?? 'Công việc'}</h3>
          </div>
        </div>
        {/* END: Header */}

        <Formik
          innerRef={formikRef}
          initialValues={initialValueForm}
          validationSchema={validationSchemaFormCongViec}
          validateOnBlur={true}
          onSubmit={handleSubmitForm}
          enableReinitialize={true}
        >
          {({ values, errors, touched, handleChange, setFieldValue }) => {
            // console.log('form values: ', values)
            // console.log('form errors: ', errors)
            return (
              <div className="p-4 grid grid-cols-4 gap-2">
                <div className="col-span-4 lg:col-span-1 border border-slate-300 border-dashed rounded-md p-2 flex flex-col gap-4">
                  <div className="flex flex-col lg:flex-row justify-between gap-1 lg:gap-8">
                    <p className="font-bold w-full lg:w-1/4 text-xs whitespace-nowrap">
                      Dự án/CV cụ thể <span className="text-red-600">(*)</span>
                    </p>
                    <div className="w-full lg:w-3/4">
                      <Autocomplete
                        disabled={
                          dataDetail &&
                          selectedNhanSu.some(
                            (ns) =>
                              ns.CV_HT_NhanSu_ID?.toString() ===
                              dataCBGV.CV_HT_NhanSu_ID?.toString(),
                          )
                        }
                        id="CV_HT_KhoiTaoCV_KhoiTao_TenNhomThucHien"
                        className="w-full"
                        size="small"
                        options={_listTenNhomCongViec || []}
                        value={
                          values.CV_HT_KhoiTaoCV_KhoiTao_TenNhomThucHien ?? null
                        } // đảm bảo giá trị không là undefined
                        onChange={(event, newValue) => {
                          const newTenNhomThucHien =
                            typeof newValue === 'string'
                              ? newValue
                              : newValue?.CV_HT_NhomThucHien_NhomThucHien || '' // Đảm bảo có giá trị hợp lệ

                          setNhomThucHien(newTenNhomThucHien)

                          formikRef.current?.setValues({
                            ...values,
                            CV_HT_KhoiTaoCV_KhoiTao_TenNhomThucHien:
                              newTenNhomThucHien,
                            CV_HT_KhoiTaoCV_KeHoach_DonViDeNghi:
                              newValue?.CV_HT_NhomThucHien_DonViDeNghi || '',
                            CV_HT_KhoiTaoCV_KeHoach_HocKy:
                              newValue?.CV_HT_NhomThucHien_HocKy || '',
                          })

                          setFieldValue(
                            'CV_HT_KhoiTaoCV_KhoiTao_TenNhomThucHien',
                            newTenNhomThucHien,
                          )
                        }}
                        freeSolo={true}
                        getOptionLabel={(option) => {
                          if (typeof option === 'string') {
                            return option
                          }
                          return option?.CV_HT_NhomThucHien_NhomThucHien || ''
                        }}
                        noOptionsText="Không có dự án cần tìm!"
                        renderOption={(props, option) => (
                          <li {...props}>
                            {option?.CV_HT_NhomThucHien_NhomThucHien ||
                              option ||
                              ''}
                          </li>
                        )}
                        onInputChange={(event, newInputValue) => {
                          setFieldValue(
                            'CV_HT_KhoiTaoCV_KhoiTao_TenNhomThucHien',
                            newInputValue,
                          )
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Chọn/Nhập tên dự án"
                          />
                        )}
                      />

                      {errors.CV_HT_KhoiTaoCV_KhoiTao_TenNhomThucHien &&
                        touched.CV_HT_KhoiTaoCV_KhoiTao_TenNhomThucHien && (
                          <p className="text-red-600">
                            {errors.CV_HT_KhoiTaoCV_KhoiTao_TenNhomThucHien}
                          </p>
                        )}
                    </div>
                  </div>
                  {/* END: Chọn/Nhập tên dự án */}
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-1 lg:gap-8">
                    <p className="font-bold w-full lg:w-1/4  text-xs whitespace-nowrap">
                      Đơn vị đề nghị
                    </p>
                    <div className="w-full lg:w-3/4">
                      <Autocomplete
                        id="CV_HT_KhoiTaoCV_KeHoach_DonViDeNghi"
                        className="w-full"
                        size="small"
                        options={_listDonViDeNghi || []}
                        value={
                          values.CV_HT_KhoiTaoCV_KeHoach_DonViDeNghi ?? null
                        }
                        onChange={(event, newValue) => {
                          setTenNhomCvThucHien([...newValue])
                          setFieldValue(
                            'CV_HT_KhoiTaoCV_KeHoach_DonViDeNghi',
                            newValue.CV_HT_NhomThucHien_NhomThucHien || '',
                          )
                        }}
                        freeSolo={false}
                        disabled={true}
                        getOptionLabel={(option) => {
                          if (typeof option === 'string') {
                            return option
                          }
                          return option?.HT_PB_Ten || ''
                        }}
                        noOptionsText="Không có đơn vị tìm!"
                        renderOption={(props, option) => (
                          <li {...props}>{option?.HT_PB_Ten || ''}</li>
                        )}
                        onInputChange={(event, newInputValue) => {
                          setTenNhomCvThucHien([...newInputValue])
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Chọn đơn vị đề nghị"
                          />
                        )}
                      />
                    </div>
                  </div>
                  {/* END: Chọn đơn vị đề nghị */}
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-1 lg:gap-8">
                    <p className="font-bold w-full lg:w-1/4 text-xs whitespace-nowrap">
                      Học kỳ
                    </p>
                    <div className="w-full lg:w-3/4">
                      <Autocomplete
                        className="w-full"
                        size="small"
                        options={listHocKy || []}
                        value={values.CV_HT_KhoiTaoCV_KeHoach_HocKy ?? null}
                        onChange={(event, newValue) => {
                          setFieldValue(
                            'CV_HT_KhoiTaoCV_KeHoach_HocKy',
                            newValue.CV_HT_KhoiTaoCV_KhoiTao_HocKy ?? '',
                          )
                        }}
                        disableCloseOnSelect
                        freeSolo={false}
                        disabled={true}
                        getOptionLabel={(option) => {
                          if (typeof option === 'string') {
                            return option
                          }
                          return option?.TenDot || ''
                        }}
                        noOptionsText="Không có học kỳ cần tìm!"
                        renderOption={(props, option) => (
                          <li {...props}>{option?.TenDot ?? ''}</li>
                        )}
                        renderInput={(params) => (
                          <TextField {...params} placeholder="Chọn học kỳ" />
                        )}
                      />
                    </div>
                  </div>
                  {/* END: Chọn học kỳ */}
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-1 lg:gap-8">
                    <p className="font-bold w-full lg:w-1/4 text-xs whitespace-nowrap">
                      File đề nghị
                    </p>
                    <button
                      disabled={isLoadingFileDeNghi}
                      onClick={async () => {
                        if (!__fileDeNghiNhomThucHien) {
                          toast.error('Không có file đề nghị!')
                        } else {
                          handleDownloadFileBase64(
                            __fileDeNghiNhomThucHien.fileName,
                            arrayBufferToBase64(
                              __fileDeNghiNhomThucHien.dataFile?.data,
                            ),
                          ).then((r) => r)
                        }
                      }}
                      className={clsx(
                        'w-full lg:w-3/4 bg-sky-800 text-white hover:opacity-80 focus:ring-2 focus:ring-sky-500 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none whitespace-nowrap text-center',
                        isNull(__fileDeNghiNhomThucHien) && isLoadingFileDeNghi
                          ? 'cursor-not-allowed bg-opacity-70'
                          : 'cursor-pointer',
                      )}
                    >
                      Xem file đề nghị
                    </button>
                  </div>
                  {/* END: File đề nghị */}
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-1 lg:gap-8">
                    <p className="font-bold w-full text-xs lg:w-1/4">
                      Nhóm công việc cha{' '}
                      <span className="text-red-600">(*)</span>
                    </p>
                    <div className="w-full lg:w-3/4">
                      <Autocomplete
                        id="CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCha"
                        className="w-full"
                        size="small"
                        options={_listNhomCvCha || []}
                        value={
                          values.CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCha ?? null
                        }
                        onChange={(event, newValue) => {
                          const newNhomCvCha =
                            typeof newValue === 'string'
                              ? newValue
                              : (newValue?.CV_HT_KhungNhomCongViec_TenNhomCVCha ??
                                '')

                          formikRef.current?.setValues({
                            ...values,
                            CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCha:
                              newNhomCvCha,
                            CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCon: '',
                            CV_HT_KhoiTaoCV_KeHoach_TenCongViec_Array: '',
                          })
                          setSelectNhomCvCha(newNhomCvCha)
                          setSelectTenCv([])
                        }}
                        freeSolo={false}
                        getOptionLabel={(option) => {
                          if (typeof option === 'string') {
                            return option
                          }
                          return (
                            option?.CV_HT_KhungNhomCongViec_TenNhomCVCha ?? ''
                          )
                        }}
                        noOptionsText="Không có nhóm công việc cha cần tìm!"
                        renderOption={(props, option) => (
                          <li {...props}>
                            {option?.CV_HT_KhungNhomCongViec_TenNhomCVCha ||
                              option ||
                              ''}
                          </li>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Chọn nhóm công việc cha"
                          />
                        )}
                      />
                      {errors.CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCha &&
                        touched.CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCha && (
                          <p className="text-red-600">
                            {errors.CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCha}
                          </p>
                        )}
                    </div>
                  </div>
                  {/* END: Chọn nhóm công việc cha */}
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-1 lg:gap-8">
                    <p className="font-bold w-full text-xs lg:w-1/4">
                      Nhóm công việc con{' '}
                      <span className="text-red-600">(*)</span>
                    </p>
                    <div className="w-full lg:w-3/4">
                      <Autocomplete
                        id="CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCon"
                        className="w-full"
                        size="small"
                        options={_listNhomCvCon || []}
                        value={
                          dataDetail
                            ? dataDetail?.CV_HT_PhanCongThucHien_NhomCongViecCon
                            : (values.CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCon ??
                              null)
                        }
                        onChange={(event, newValue) => {
                          const newNhomCvCon =
                            typeof newValue === 'string'
                              ? newValue
                              : newValue?.CV_HT_KhungNhomCongViec_TenNhomCVCon

                          setFieldValue(
                            'CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCon',
                            newNhomCvCon,
                          )
                          setFieldValue(
                            'CV_HT_KhoiTaoCV_KeHoach_TenCongViec_Array',
                            '',
                          )
                          setSelectNhomCvCon(newNhomCvCon)
                        }}
                        disabled={
                          dataDetail
                            ? false
                            : isEmpty(selectNhomCvCha) ||
                              isEmpty(
                                formikRef.current?.values
                                  .CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCha,
                              )
                        }
                        freeSolo={false}
                        getOptionLabel={(option) => {
                          if (typeof option === 'string') {
                            return option
                          }
                          return (
                            option?.CV_HT_KhungNhomCongViec_TenNhomCVCon ?? ''
                          )
                        }}
                        noOptionsText="Không có nhóm công việc con cần tìm!"
                        renderOption={(props, option) => (
                          <li {...props}>
                            {option?.CV_HT_KhungNhomCongViec_TenNhomCVCon ||
                              option ||
                              ''}
                          </li>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Chọn nhóm công việc con"
                          />
                        )}
                      />
                      {errors.CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCon &&
                        touched.CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCon && (
                          <p className="text-red-600">
                            {errors.CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCon}
                          </p>
                        )}
                    </div>
                  </div>
                  {/* END: Chọn nhóm công việc con */}
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-1 lg:gap-8">
                    <p className="font-bold w-full text-xs lg:w-1/4">
                      Tên công việc <span className="text-red-600">(*)</span>
                    </p>
                    <div className="w-full lg:w-3/4">
                      <Autocomplete
                        id={
                          _isMultiSelectCV
                            ? 'CV_HT_KhoiTaoCV_KeHoach_TenCongViec_Array'
                            : 'CV_HT_KhoiTaoCV_KeHoach_TenCongViec'
                        }
                        className="w-full"
                        size="small"
                        options={_listTenCongViec || []}
                        multiple={dataDetail ? false : _isMultiSelectCV}
                        disableCloseOnSelect
                        value={
                          dataDetail
                            ? dataDetail?.CV_HT_PhanCongThucHien_TenCongViec
                            : _isMultiSelectCV
                              ? Array.isArray(
                                  values.CV_HT_KhoiTaoCV_KeHoach_TenCongViec_Array,
                                )
                                ? values.CV_HT_KhoiTaoCV_KeHoach_TenCongViec_Array
                                : []
                              : values.CV_HT_KhoiTaoCV_KeHoach_TenCongViec
                        }
                        onChange={(event, newValue) => {
                          if (_isMultiSelectCV) {
                            setFieldValue(
                              'CV_HT_KhoiTaoCV_KeHoach_TenCongViec_Array',
                              newValue || [],
                            )
                            setSelectTenCv(newValue)
                          } else {
                            setFieldValue(
                              'CV_HT_KhoiTaoCV_KeHoach_TenCongViec',
                              newValue.CV_HT_KhungCongViec_TenCongViec || '',
                            )
                          }
                        }}
                        freeSolo={false}
                        disabled={
                          dataDetail
                            ? false
                            : isEmpty(selectNhomCvCon) ||
                              isEmpty(
                                formikRef.current?.values
                                  .CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCon,
                              )
                        }
                        getOptionLabel={(option) => {
                          if (typeof option === 'string') {
                            return option
                          }
                          return option?.CV_HT_KhungCongViec_TenCongViec || ''
                        }}
                        noOptionsText="Không có tên công việc cần tìm!"
                        renderOption={(props, option, { selected }) => (
                          <li {...props}>
                            <Checkbox
                              size="small"
                              style={{ marginRight: 8 }}
                              checked={selected}
                            />
                            {option?.CV_HT_KhungCongViec_TenCongViec || option}
                          </li>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Chọn tên công việc"
                          />
                        )}
                      />
                      {errors.CV_HT_KhoiTaoCV_KeHoach_TenCongViec_Array &&
                        touched.CV_HT_KhoiTaoCV_KeHoach_TenCongViec_Array && (
                          <p className="text-red-600">
                            {errors.CV_HT_KhoiTaoCV_KeHoach_TenCongViec_Array}
                          </p>
                        )}
                    </div>
                  </div>
                  {/* END: Chọn Tên công việc */}
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-1 lg:gap-8">
                    <p className="font-bold w-full lg:w-1/4">
                      Chi tiết công việc{' '}
                      <span className="text-red-600">(*)</span>
                    </p>
                    <div className="w-full lg:w-3/4">
                      <DebounceInput
                        debounceTimeout={500}
                        element="textarea"
                        className="rounded-xl p-2 w-full border border-gray-300 focus:border focus:border-cyan-600 focus:outline-1 focus:outline-cyan-600"
                        placeholder="Nhập mô tả chi tiết công việc"
                        rows={6}
                        name="CV_HT_KhoiTaoCV_KeHoach_GhiChu"
                        onChange={handleChange(
                          'CV_HT_KhoiTaoCV_KeHoach_GhiChu',
                        )}
                        value={values.CV_HT_KhoiTaoCV_KeHoach_GhiChu}
                      />
                      {errors.CV_HT_KhoiTaoCV_KeHoach_GhiChu &&
                        touched.CV_HT_KhoiTaoCV_KeHoach_GhiChu && (
                          <p className="text-red-600">
                            {errors.CV_HT_KhoiTaoCV_KeHoach_GhiChu}
                          </p>
                        )}
                    </div>
                  </div>
                  {/* END: Chọn chi tiết công việc */}
                </div>
                {/* END: Thông tin công việc */}

                <div className="col-span-4 lg:col-span-1 border border-slate-300 border-dashed rounded-md p-2 flex flex-col gap-4">
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-1 lg:gap-8">
                    <p className="font-bold w-full lg:w-1/4 whitespace-nowrap text-[12px]">
                      Xác định công việc{' '}
                      <span className="text-red-600">(*)</span>
                    </p>
                    <div className="w-full lg:w-3/4">
                      <Autocomplete
                        id="CV_HT_KhoiTaoCV_KeHoach_XacDinhCongViec"
                        className="w-full"
                        size="small"
                        options={_listXacDinhCongViec}
                        value={
                          values.CV_HT_KhoiTaoCV_KeHoach_XacDinhCongViec || ''
                        }
                        onChange={(event, newValue) => {
                          const newLoaiCongViec =
                            typeof newValue === 'string'
                              ? newValue
                              : newValue?.CV_HT_DanhMuc_TenNhom1

                          setFieldValue(
                            'CV_HT_KhoiTaoCV_KeHoach_XacDinhCongViec',
                            newLoaiCongViec,
                          )
                          setSelectNhomCvCon(newLoaiCongViec)
                        }}
                        freeSolo={false}
                        getOptionLabel={(option) => {
                          if (typeof option === 'string') {
                            return option
                          }
                          return option?.CV_HT_DanhMuc_TenNhom1 || ''
                        }}
                        noOptionsText="Không có loại công việc cần tìm!"
                        renderOption={(props, option) => (
                          <li {...props}>
                            {option?.CV_HT_DanhMuc_TenNhom1 || option}
                          </li>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Chọn loại công việc"
                          />
                        )}
                      />
                      {errors.CV_HT_KhoiTaoCV_KeHoach_XacDinhCongViec &&
                        touched.CV_HT_KhoiTaoCV_KeHoach_XacDinhCongViec && (
                          <p className="text-red-600">
                            {errors.CV_HT_KhoiTaoCV_KeHoach_XacDinhCongViec}
                          </p>
                        )}
                    </div>
                  </div>
                  {/* END: Chọn Xác định công việc */}
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-1 lg:gap-8">
                    <p className="font-bold w-full lg:w-1/4 whitespace-nowrap text-[12px]">
                      Mức độ ưu tiên <span className="text-red-600">(*)</span>
                    </p>
                    <div className="w-full lg:w-3/4">
                      <Autocomplete
                        id="CV_HT_KhoiTaoCV_KeHoach_UuTien"
                        className="w-full"
                        size="small"
                        options={_listUuTienCongViec}
                        value={values.CV_HT_KhoiTaoCV_KeHoach_UuTien || ''}
                        onChange={(event, newValue) => {
                          const newLoaiCongViec =
                            typeof newValue === 'string'
                              ? newValue
                              : newValue?.CV_HT_DanhMuc_TenNhom1

                          setFieldValue(
                            'CV_HT_KhoiTaoCV_KeHoach_UuTien',
                            newLoaiCongViec,
                          )
                          setSelectNhomCvCon(newLoaiCongViec)
                        }}
                        freeSolo={false}
                        getOptionLabel={(option) => {
                          if (typeof option === 'string') {
                            return option
                          }
                          return option?.CV_HT_DanhMuc_TenNhom1 || ''
                        }}
                        noOptionsText="Không có mức độ ưu tiên cần tìm!"
                        renderOption={(props, option) => (
                          <li {...props}>
                            {option?.CV_HT_DanhMuc_TenNhom1 || option}
                          </li>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Chọn mức độ ưu tiên"
                          />
                        )}
                      />
                      {errors.CV_HT_KhoiTaoCV_KeHoach_UuTien &&
                        touched.CV_HT_KhoiTaoCV_KeHoach_UuTien && (
                          <p className="text-red-600">
                            {errors.CV_HT_KhoiTaoCV_KeHoach_UuTien}
                          </p>
                        )}
                    </div>
                  </div>
                  {/* END: Chọn ưu tiên */}
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-1 lg:gap-8">
                    <p className="font-bold w-full lg:w-1/4 whitespace-nowrap text-[12px]">
                      Ngày bắt đầu <span className="text-red-600">(*)</span>
                    </p>
                    <div className="w-full lg:w-3/4">
                      <input
                        disabled={
                          dataDetail &&
                          selectedNhanSu.some(
                            (ns) =>
                              ns.CV_HT_NhanSu_ID?.toString() ===
                              dataCBGV.CV_HT_NhanSu_ID?.toString(),
                          )
                        }
                        type="datetime-local"
                        className="w-full border border-gray-300 rounded p-2"
                        name="CV_HT_KhoiTaoCV_KeHoach_NgayBatDau"
                        value={
                          values.CV_HT_KhoiTaoCV_KeHoach_NgayBatDau
                            ? moment(values.CV_HT_KhoiTaoCV_KeHoach_NgayBatDau)
                                .tz('Asia/Ho_Chi_Minh')
                                .format('YYYY-MM-DDTHH:mm')
                            : ''
                        }
                        onChange={handleChange(
                          'CV_HT_KhoiTaoCV_KeHoach_NgayBatDau',
                        )}
                        min={dayjs()
                          .subtract(3, 'day')
                          .format('YYYY-MM-DDTHH:mm')}
                      />
                      {errors.CV_HT_KhoiTaoCV_KeHoach_NgayBatDau &&
                        touched.CV_HT_KhoiTaoCV_KeHoach_NgayBatDau && (
                          <p className="text-red-600">
                            {errors.CV_HT_KhoiTaoCV_KeHoach_NgayBatDau}
                          </p>
                        )}
                    </div>
                  </div>
                  {/* END: Chọn ngày bắt đầu */}
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-1 lg:gap-8">
                    <p className="font-bold w-full lg:w-1/4 whitespace-nowrap text-[12px]">
                      Ngày kết thúc <span className="text-red-600">(*)</span>
                    </p>
                    <div className="w-full lg:w-3/4">
                      <input
                        type="datetime-local"
                        className="w-full border border-gray-300 rounded p-2"
                        name="CV_HT_KhoiTaoCV_KeHoach_NgayKetThuc"
                        value={
                          values.CV_HT_KhoiTaoCV_KeHoach_NgayKetThuc
                            ? moment(values.CV_HT_KhoiTaoCV_KeHoach_NgayKetThuc)
                                .tz('Asia/Ho_Chi_Minh')
                                .format('YYYY-MM-DDTHH:mm')
                            : ''
                        }
                        onChange={handleChange(
                          'CV_HT_KhoiTaoCV_KeHoach_NgayKetThuc',
                        )}
                      />
                      {errors.CV_HT_KhoiTaoCV_KeHoach_NgayKetThuc &&
                        touched.CV_HT_KhoiTaoCV_KeHoach_NgayKetThuc && (
                          <p className="text-red-600">
                            {errors.CV_HT_KhoiTaoCV_KeHoach_NgayKetThuc}
                          </p>
                        )}
                    </div>
                  </div>
                  {/* END: Chọn ngày kết thúc */}
                  <div
                    className={clsx(
                      'flex flex-col lg:flex-row items-center justify-between gap-1 lg:gap-8',
                    )}
                  >
                    <p className="font-bold w-full lg:w-1/4 whitespace-nowrap text-[12px]">
                      File đính kèm
                    </p>
                    <div className="w-full lg:w-3/4">
                      <label
                        htmlFor="file-dinh-kem"
                        className="flex items-center gap-x-2 cursor-pointer w-full rounded bg-sky-800 text-white hover:opacity-80 focus:ring-2 focus:ring-sky-500 font-medium text-sm px-5 py-2.5 focus:outline-none whitespace-nowrap text-center "
                      >
                        +<span>Chọn file</span>
                      </label>
                      <input
                        hidden
                        ref={fileInputRef}
                        id="file-dinh-kem"
                        name="CV_HT_KhoiTaoCV_KeHoach_TenFile"
                        type="file"
                        onChange={async (e) => {
                          const { files } = e.target
                          const maxSizeInBytes = 5 * 1024 * 1024 // 5MB

                          if (files.length > 0) {
                            const file = files[0]
                            const dataFile = await convertDataFileToBase64(file)
                            if (
                              !file.name.match(
                                /\.(pdf|docx|doc|jpeg|jpg|png|xls|xlsx)$/i,
                              )
                            ) {
                              toast.error(
                                'Tệp tải lên không đúng định dạng yêu cầu. Vui lòng kiểm tra lại.',
                              )
                              return
                            } else {
                              if (file.size > maxSizeInBytes) {
                                toast.error(
                                  'Kích thước tệp tải lên vượt quá 5MB',
                                )
                                setFieldValue(
                                  'CV_HT_KhoiTaoCV_KeHoach_TenFile',
                                  '',
                                )
                                setFieldValue(
                                  'CV_HT_KhoiTaoCV_KeHoach_DataFile',
                                  '',
                                )
                                return
                              } else {
                                setFieldValue(
                                  'CV_HT_KhoiTaoCV_KeHoach_TenFile',
                                  file.name,
                                )
                                setFieldValue(
                                  'CV_HT_KhoiTaoCV_KeHoach_DataFile',
                                  dataFile,
                                )
                              }
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                  {values.CV_HT_KhoiTaoCV_KeHoach_TenFile ? (
                    <p className="p-2 my-1 rounded bg-slate-200 flex items-center justify-between font-semibold">
                      <span
                        onClick={() => {
                          handleDownloadFileBase64(
                            values.CV_HT_PhanCongThucHien_KeHoach_TenFile,
                            values.CV_HT_PhanCongThucHien_KeHoach_DataFile
                              ?.data,
                          ).then((r) => r)
                        }}
                        className="text-cyan-700 cursor-pointer"
                      >
                        {values.CV_HT_KhoiTaoCV_KeHoach_TenFile ||
                          values.CV_HT_PhanCongThucHien_KeHoach_TenFile}
                      </span>
                      <span
                        className="text-red-600 cursor-pointer w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 hover:bg-red-100"
                        onClick={() => {
                          setFieldValue('CV_HT_KhoiTaoCV_KeHoach_TenFile', '')
                          setFieldValue('CV_HT_KhoiTaoCV_KeHoach_DataFile', '')
                          if (fileInputRef.current) {
                            fileInputRef.current.value = ''
                          }
                        }}
                      >
                        <FaTrash />
                      </span>
                    </p>
                  ) : (
                    <p className="text-center p-2 border rounded">
                      Chưa có tệp được chọn
                    </p>
                  )}
                  <p className="text-red-600">
                    Các loại file tải lên phải có dạng PDF, XLS, XLSX, DOC,
                    DOCX, PNG, JPG, hoặc JPEG (Kích thước tối đa 5MB).
                  </p>
                  {/* END: Chọn file đính kèm */}
                </div>
                {/* END: Phân loại công việc */}

                <div className="col-span-4 lg:col-span-2 border border-slate-300 border-dashed rounded-md p-2 flex flex-col gap-4">
                  <DanhSachNhanSuCongViec
                    disableChedkbox={
                      dataDetail &&
                      selectedNhanSu.some(
                        (ns) =>
                          ns.CV_HT_NhanSu_ID?.toString() ===
                          dataCBGV.CV_HT_NhanSu_ID?.toString(),
                      )
                    }
                    typeAdd={typeAdd}
                    dataSelectedNhanSu={selectedNhanSu}
                    onSelectNhanSu={handleSelectNhanSu}
                  />
                </div>
                {/* END: Table nhân sự */}
              </div>
            )
          }}
        </Formik>
        {/* END: Fromik Body */}

        <div className="lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:z-50 p-4 flex items-center justify-end gap-2 bg-slate-200">
          <Button
            color="danger"
            onClick={() => {
              onClose && onClose()
              setSelectedNhanSu([])
              onSetDataCongViec(null)
              formikRef.current?.resetForm()
            }}
          >
            Hủy
          </Button>
          <Button
            onClick={() => {
              formikRef.current?.handleSubmit()
            }}
          >
            Lưu
          </Button>
        </div>
        {/* END: Footer */}
      </Dialog>
    </>
  )
})

FormCongViec.propTypes = {
  dataDetail: PropTypes.object,
  title: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  typeAdd: PropTypes.string,
}

export default FormCongViec

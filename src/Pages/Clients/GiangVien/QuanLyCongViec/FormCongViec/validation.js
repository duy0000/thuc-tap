import * as yup from 'yup'

export const validationSchemaFormCongViec = yup.object().shape({
  CV_HT_KhoiTaoCV_KhoiTao_TenNhomThucHien: yup
    .string()
    .trim()
    .required('Vui lòng chọn/nhập tên dự án'),
  CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCha: yup
    .string()
    .trim()
    .required('Vui lòng chọn nhóm công việc cha'),
  CV_HT_KhoiTaoCV_KeHoach_NhomCongViecCon: yup
    .string()
    .trim()
    .required('Vui lòng chọn nhóm công việc con'),
  CV_HT_KhoiTaoCV_KeHoach_TenCongViec_Array: yup
    .array()
    .when('isMultiSelectCV', (isMultiSelectCV, schema) => {
      if (isMultiSelectCV[0] === true) {
        return schema
          .min(1, 'Vui lòng chọn ít nhất 1 tên công việc')
          .required('Vui lòng chọn ít nhất 1 tên công việc')
      }
      return schema.notRequired()
    }),
  CV_HT_KhoiTaoCV_KeHoach_TenCongViec: yup
    .string()
    .when('isMultiSelectCV', (isMultiSelectCV, schema) => {
      if (isMultiSelectCV[0] === false) {
        return schema
          .min(1, 'Vui lòng chọn tên công việc')
          .required('Vui lòng chọn tên công việc')
      }
      return schema.notRequired()
    }),
  CV_HT_KhoiTaoCV_KeHoach_GhiChu: yup
    .string()
    .required('Vui lòng nhập chi tiết công việc'),
  CV_HT_KhoiTaoCV_KeHoach_XacDinhCongViec: yup
    .string()
    .trim()
    .required('Xác định công việc là bắt buộc'),
  CV_HT_KhoiTaoCV_KeHoach_UuTien: yup
    .string()
    .trim()
    .required('Vui lòng chọn độ ưu tiên'),
  CV_HT_KhoiTaoCV_KeHoach_NgayBatDau: yup
    .string()
    .required('Vui lòng chọn ngày bắt đầu.')
    .test('isValidDate', 'Ngày bắt đầu không hợp lệ.', (value) => {
      return !isNaN(new Date(value).getTime())
    }),
  CV_HT_KhoiTaoCV_KeHoach_NgayKetThuc: yup
    .string()
    .required('Vui lòng chọn ngày kết thúc')
    .test(
      'isAfterStartDate',
      'Ngày kết thúc phải sau ngày bắt đầu',
      function (value) {
        const { CV_HT_KhoiTaoCV_KeHoach_NgayBatDau } = this.parent
        if (!CV_HT_KhoiTaoCV_KeHoach_NgayBatDau || !value) {
          return true
        }
        const startDate = new Date(CV_HT_KhoiTaoCV_KeHoach_NgayBatDau)
        const endDate = new Date(value)
        return endDate > startDate
      },
    ),
})

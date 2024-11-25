import { useContext, useEffect, useRef, useState } from 'react'
import { BiDownload } from 'react-icons/bi'
import { HiDocumentDuplicate } from 'react-icons/hi2'
import Resumable from 'resumablejs'
import Swal from 'sweetalert2'

import { postThanhLapHoiDong, putThanhLapHoiDong } from '@/Apis/KDCL'
import { HoSoKiemDinhCtx } from '@/Services/Tokens'
import { humanFileSize, dayjs, transformCls } from '@/Services/Utils'

import { DatepickerV2 } from '@/Components/Base'
import Icon from '@/Components/Base/Icon/Icon'
import { Brush } from '@/Components/Base/Icons/Brush'
import Button from '@/Components/Base/Button/Button'
import CloseCircle from '@/Components/Base/Icons/CloseCircle'
import { useThanhLapHoiDongStore } from '@/Services/Store'
import { isTrue, required } from '@/Services/Validators'
import Row from '@/Components/Base/Row/Row'
import Col from '@/Components/Base/Col/Col'

const allowFileTypes = ['docx', 'doc', 'pdf']

export default function QuyetDinhThanhLapForm() {
  const hoSoKiemDinhCtx = useContext(HoSoKiemDinhCtx)

  const { isLoading: isLoadingThanhLapHoiDong } = useThanhLapHoiDongStore()
  const [isEditing, setIsEditing] = useState(false)
  const [isPosting, setIsPosting] = useState(false)
  const [resumableInited, setResumableInited] = useState(false)
  const [fileSelect, setFileSelect] = useState()
  const [state, setState] = useState({})
  const fileSelectRef = useRef()

  const validate = () =>
    [
      () =>
        required(
          state.KT_KDCL_CTDT_ThanhLapHoiDong_SoQuyetDinh,
          'Số quyết định không được bỏ trống!',
        ),
      () =>
        required(
          state.KT_KDCL_CTDT_ThanhLapHoiDong_NgayThanhLap,
          'Ngày thành lập không được bỏ trống!',
        ),
      () =>
        required(
          state.KT_KDCL_CTDT_ThanhLapHoiDong_NguoiThanhLap,
          'Người thành lập không được bỏ trống!',
        ),
      () =>
        required(
          state.KT_KDCL_CTDT_ThanhLapHoiDong_NguoiThanhLap,
          'Người thành lập không được bỏ trống!',
        ),
      () =>
        required(
          () => state.KT_KDCL_CTDT_ThanhLapHoiDong_TenFile || fileSelect,
          'Văn bản quyết định không được bỏ trống!',
        ),
    ].every(isTrue)

  const handleSubmit = async () => {
    if (isLoadingThanhLapHoiDong || isPosting || !validate()) return

    try {
      setIsPosting(true)
      let action = postThanhLapHoiDong
      if (state.KT_KDCL_CTDT_ThanhLapHoiDong_ID) {
        action = putThanhLapHoiDong
      }

      await action({
        KT_KDCL_CTDT_ThanhLapHoiDong_IDHoSoKiemDinh:
          hoSoKiemDinhCtx.hoSoKiemDinh.KT_KDCL_CTDT_HoSoKiemDinh_ID,
        KT_KDCL_CTDT_ThanhLapHoiDong_SoQuyetDinh:
          state.KT_KDCL_CTDT_ThanhLapHoiDong_SoQuyetDinh.trim(),
        KT_KDCL_CTDT_ThanhLapHoiDong_NgayThanhLap:
          state.KT_KDCL_CTDT_ThanhLapHoiDong_NgayThanhLap,
        KT_KDCL_CTDT_ThanhLapHoiDong_NguoiThanhLap:
          state.KT_KDCL_CTDT_ThanhLapHoiDong_NguoiThanhLap.trim(),
        KT_KDCL_CTDT_ThanhLapHoiDong_TenFile: '',
        KT_KDCL_CTDT_ThanhLapHoiDong_DataFile: '',
        KT_KDCL_CTDT_ThanhLapHoiDong_IDQuyTrinh:
          hoSoKiemDinhCtx.childStepActive.IDQuyTrinhKiemDinh,
      })
      if (fileSelect) {
        await hoSoKiemDinhCtx.postFileHoSoLuuTru({
          IDQuyTrinh: hoSoKiemDinhCtx.childStepActive.IDQuyTrinhKiemDinh,
          file: fileSelect,
        })
      }
      await hoSoKiemDinhCtx.fetchHoiDong()
      setIsEditing(false)
    } catch {
      Swal.fire({
        icon: 'warning',
        title: 'Thông báo',
        text: 'Có lỗi xảy ra, vui lòng thử lại sau hoặc liên hệ quản trị viên!',
      })
    } finally {
      setIsPosting(false)
    }
  }

  const initResumable = () => {
    if (resumableInited || !fileSelectRef.current) return
    const resumable = new Resumable({
      fileType: allowFileTypes,
      chunkSize: 20 * 1000 * 1000, // 10M
      testChunks: false,
      maxFileSize: 10 * 1024 * 1024, // 10MB
      maxFiles: 1,
      fileTypeErrorCallback() {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: `Chỉ chấp nhận các file ${allowFileTypes.join(', ')}`,
        })
      },
      maxFilesErrorCallback() {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: `Chỉ được chọn tối đa 1 file!`,
        })
      },
      maxFileSizeErrorCallback() {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: `File không được vượt quá 10MB!`,
        })
      },
    })
    resumable.assignBrowse(fileSelectRef.current, false)
    resumable.on('fileAdded', (file) => {
      setFileSelect(file.file)
    })
    setResumableInited(true)
  }

  useEffect(() => {
    initResumable()
  }, [isEditing])

  useEffect(() => {
    if (!hoSoKiemDinhCtx.hoiDong) {
      setState({})
    } else {
      setState((p) => ({
        ...p,
        ...hoSoKiemDinhCtx.hoiDong,
      }))
    }
  }, [hoSoKiemDinhCtx.hoiDong])

  return (
    <div className="z-[3]">
      <div className="flex items-center gap-2">
        <h3 className="uppercase cursor-default text-uneti-primary-light ml-3 font-semibold">
          quyết định thành lập
        </h3>

        {!hoSoKiemDinhCtx.hoiDong ? (
          <Button
            disabled={isLoadingThanhLapHoiDong}
            isLoading={isPosting}
            onClick={handleSubmit}
          >
            Thành lập hội đồng
          </Button>
        ) : !isEditing ? (
          <button
            className="icon-btn bg-gray-50 hover:bg-white"
            onClick={() => setIsEditing(true)}
          >
            <Icon>
              <Brush />
            </Icon>
          </button>
        ) : (
          <div className="flex gap-1">
            <Button
              onClick={() => {
                setState((p) => ({
                  ...p,
                  ...hoSoKiemDinhCtx.hoiDong,
                }))
                setIsEditing(false)
              }}
              disabled={isPosting}
              color="danger"
            >
              Hủy
            </Button>
            <Button isLoading={isPosting} onClick={handleSubmit}>
              Cập nhật
            </Button>
          </div>
        )}
      </div>

      <Row gutter={12} className="!mt-1">
        <Col span={12} md={3} className="h-auto">
          <div className="shadow-sm p-3 h-full rounded-lg flex-1 flex flex-col gap-2 bg-white">
            <p className="text-slate-500">
              Số quyết định thành lập hội đồng
              <span className="text-red-600">*</span>
            </p>

            <div className="mt-auto">
              {isEditing || !hoSoKiemDinhCtx.hoiDong ? (
                <input
                  className="base-input mt-2 w-full border-none bg-gray-3 focus:pl-3 focus:border-uneti-primary transition-all"
                  value={state.KT_KDCL_CTDT_ThanhLapHoiDong_SoQuyetDinh || ''}
                  onChange={(e) =>
                    setState((p) => ({
                      ...p,
                      KT_KDCL_CTDT_ThanhLapHoiDong_SoQuyetDinh: e.target.value,
                    }))
                  }
                  placeholder="Ví dụ 210/QĐ-ĐHKTKTCN"
                />
              ) : (
                <b>{state.KT_KDCL_CTDT_ThanhLapHoiDong_SoQuyetDinh}</b>
              )}
            </div>
          </div>
        </Col>
        <Col span={12} md={3} className="h-auto">
          <div className="shadow-sm p-3 h-full rounded-lg flex-1 flex flex-col gap-2 bg-white">
            <p className="text-slate-500">
              Ngày thành lập
              <span className="text-red-600">*</span>
            </p>

            <div className="mt-auto">
              {isEditing || !hoSoKiemDinhCtx.hoiDong ? (
                <DatepickerV2
                  modelValue={state.KT_KDCL_CTDT_ThanhLapHoiDong_NgayThanhLap}
                  onChange={(date) =>
                    setState((p) => ({
                      ...p,
                      KT_KDCL_CTDT_ThanhLapHoiDong_NgayThanhLap: date,
                    }))
                  }
                  valueFormat="YYYY-MM-DD HH:mm:ss"
                  triggerClass="w-full border-transparent bg-gray-3 focus:pl-3 focus:border-uneti-primary transition-all"
                />
              ) : (
                <b>
                  {state.KT_KDCL_CTDT_ThanhLapHoiDong_NgayThanhLap
                    ? dayjs(
                        state.KT_KDCL_CTDT_ThanhLapHoiDong_NgayThanhLap,
                      ).format('DD/MM/YYYY')
                    : ''}
                </b>
              )}
            </div>
          </div>
        </Col>
        <Col span={12} md={3} className="h-auto">
          <div className="shadow-sm p-3 h-full rounded-lg flex-1 flex flex-col gap-2 bg-white">
            <p className="text-slate-500">
              Người ra quyết định thành lập hội đồng
              <span className="text-red-600">*</span>
            </p>

            <div className="mt-auto">
              {isEditing || !hoSoKiemDinhCtx.hoiDong ? (
                <input
                  className="base-input mt-2 w-full border-gray-3 bg-gray-3 focus:pl-3 focus:border-uneti-primary transition-all"
                  value={state.KT_KDCL_CTDT_ThanhLapHoiDong_NguoiThanhLap || ''}
                  onChange={(e) =>
                    setState((p) => ({
                      ...p,
                      KT_KDCL_CTDT_ThanhLapHoiDong_NguoiThanhLap:
                        e.target.value,
                    }))
                  }
                  placeholder="Đơn vị / người ra quyết định"
                />
              ) : (
                <b>{state.KT_KDCL_CTDT_ThanhLapHoiDong_NguoiThanhLap}</b>
              )}
            </div>
          </div>
        </Col>
        <Col span={12} md={3} className="h-auto">
          <div className="shadow-sm p-3 h-full rounded-lg flex-1 flex flex-col gap-2 bg-white">
            <p className="text-slate-500">
              Văn bản quyết định thành lập hội đồng
              <span className="text-red-600">*</span>
            </p>

            <div
              className={`mt-auto gap-1 items-end ${isEditing || !hoSoKiemDinhCtx.hoiDong ? 'flex' : 'hidden'}`}
            >
              <Button
                ref={fileSelectRef}
                className={transformCls(['w-full', fileSelect && '!hidden'])}
              >
                Chọn file
              </Button>

              {fileSelect && (
                <div className="flex items-center gap-2 w-full">
                  <div className="flex-1 flex justify-between items-center w-full">
                    <span className="line-clamp-1">{fileSelect.name}</span>
                    <span className="shrink-0">
                      {humanFileSize(fileSelect.size)}
                    </span>
                  </div>

                  <button
                    onClick={() => setFileSelect(null)}
                    className="icon-btn"
                  >
                    <Icon>
                      <CloseCircle />
                    </Icon>
                  </button>
                </div>
              )}
            </div>
            <div
              className={`mt-auto gap-1 items-end ${isEditing || !hoSoKiemDinhCtx.hoiDong ? 'hidden' : 'flex'}`}
            >
              {hoSoKiemDinhCtx.fileQuyTrinh?.KT_KDCL_HoSoLuuTru_TenFile ? (
                <>
                  <Icon>
                    <HiDocumentDuplicate />
                  </Icon>

                  <b className="line-clamp-1">
                    {hoSoKiemDinhCtx.fileQuyTrinh?.KT_KDCL_HoSoLuuTru_TenFile}
                  </b>

                  <button
                    onClick={() => hoSoKiemDinhCtx.downloadFileHoSoLuuTru()}
                    className="shrink-0 icon-btn ml-auto"
                  >
                    <Icon>
                      <BiDownload />
                    </Icon>
                  </button>
                </>
              ) : (
                <i className="text-red-600">* Chưa có văn bản *</i>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

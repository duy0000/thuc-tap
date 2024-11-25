import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { DatepickerV2, Drawer, Select } from '@/Components/Base'
import Swal from 'sweetalert2'
import { Checkbox } from '@/Components/Base/Checkbox'
import FileSelect from '@/Components/Base/FileSelect/FileSelect'
import Icon from '@/Components/Base/Icon/Icon'
import CloseCircle from '@/Components/Base/Icons/CloseCircle'
import {
  convertBufferToBase64,
  convertDataFileToBase64,
} from '@/Services/Utils/stringUtils'
import {
  loadMinhChung_R_Para_File,
  putMinhChung,
} from '@/Apis/KDCL/MinhChung/apiMinhChung'
import { required } from '@/Services/Validators/required'
import { cloneDeep } from 'lodash-unified'
import Button from '@/Components/Base/Button/Button'
import { MinhChungType } from '@/Services/Tokens/KDCL/CTDT/minhChung.js'
import { stepStatusEnum } from '@/Services/Tokens/index.js'
import { useMinhChungStore } from '@/Services/Store/Module/KiemDinhChatLuong/minhChung.js'
import { handleDownloadFileBase64, transformCls } from '@/Services/Utils'

const MAX_FILE_SELECT = 1
const ALLOW_FILE_TYPE = ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx']
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export const DrawerUpdateMinhChung = forwardRef(
  (
    {
      minhChungUpdating,
      onUpdated = () => null,
      KT_KDCL_TaiLieu_Type,
      KT_KDCL_TaiLieu_TrangThai_PheDuyet,
    },
    ref,
  ) => {
    const { refetch: refetchListMinhChung } = useMinhChungStore()

    const drawerRef = useRef()
    const [dataNoiBanHanh] = useState(['CTĐT', 'CSGD'])
    const [form, setForm] = useState({
      KT_KDCL_TaiLieu_Ma: '',
      KT_KDCL_TaiLieu_Ten: '',
      KT_KDCL_TaiLieu_SoBanHanh: '',
      KT_KDCL_TaiLieu_NgayBanHanh: '',
      KT_KDCL_TaiLieu_NoiBanHanh: '',
      KT_KDCL_TaiLieu_TrichYeu: '',
      KT_KDCL_TaiLieu_TrangThai: 1,
      KT_KDCL_TaiLieu_LinkDinhKem: '',
      KT_KDCL_TaiLieu_TenFile: '',
      KT_KDCL_TaiLieu_LinkFile: '',
      KT_KDCL_TaiLieu_DataFile: '',
      KT_KDCL_TaiLieu_Type,
      KT_KDCL_TaiLieu_TrangThai_PheDuyet:
        KT_KDCL_TaiLieu_Type == MinhChungType.Draft
          ? KT_KDCL_TaiLieu_TrangThai_PheDuyet
          : stepStatusEnum.DaPheDuyet,
    })

    const [fileSelected, setFileSelected] = useState()
    const [isPutting, setIsPutting] = useState(false)

    const handleFilesChange = (file) => {
      setFileSelected(file)
    }

    const handleLoadMinhChungWithDataFile = async () => {
      const res = await loadMinhChung_R_Para_File(
        minhChungUpdating.KT_KDCL_TaiLieu_ID,
      )

      if (res.data.body.length === 0) {
        throw new Error('Không tìm thấy file minh chứng')
      }
      return {
        DataFileBase64: convertBufferToBase64(
          res.data.body[0].KT_KDCL_TaiLieu_DataFile.data,
        ),
        TenFile: res.data.body[0].KT_KDCL_TaiLieu_TenFile,
      }
    }

    const handleDownloadFile = async () => {
      try {
        const fileData = await handleLoadMinhChungWithDataFile()
        handleDownloadFileBase64(fileData.TenFile, fileData.DataFileBase64)
      } catch {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Có lỗi xảy ra, vui lòng thử lại sau',
        })
      }
    }

    useEffect(() => {
      setForm(cloneDeep(minhChungUpdating))
    }, [minhChungUpdating])

    const loadFileData = async () => {
      const tenFile = fileSelected
        ? fileSelected.name
        : form.KT_KDCL_TaiLieu_TenFile

      let dataFileBase64 = ''

      if (fileSelected) {
        const fileSelectedBase64 = await convertDataFileToBase64(fileSelected)
        dataFileBase64 = fileSelectedBase64.split('base64,')[1]
      } else if (form.KT_KDCL_TaiLieu_DataFile) {
        dataFileBase64 = convertBufferToBase64(
          form.KT_KDCL_TaiLieu_DataFile.data,
        )
      }

      return {
        KT_KDCL_TaiLieu_TenFile: tenFile,
        KT_KDCL_TaiLieu_DataFile: dataFileBase64,
      }
    }

    const validate = () => {
      return [
        KT_KDCL_TaiLieu_Type == MinhChungType.Draft
          ? required(
              form.KT_KDCL_TaiLieu_Ma,
              'Mã minh chứng không được để trống!',
            )
          : true,
        required(
          form.KT_KDCL_TaiLieu_Ten,
          'Tên minh chứng không được để trống!',
        ),
        required(
          form.KT_KDCL_TaiLieu_SoBanHanh,
          'Số ban hành không được để trống!',
        ),
        required(
          form.KT_KDCL_TaiLieu_NgayBanHanh,
          'Ngày ban hành, hoặc thời điểm khảo sát, điều tra, phỏng vấn không được để trống!',
        ),
        required(
          form.KT_KDCL_TaiLieu_NoiBanHanh,
          'Nhóm cá nhân thực hiện không được để trống!',
        ),
        required(
          form.KT_KDCL_TaiLieu_TenFile,
          'File minh chứng không được để trống!',
        ),
      ].every((e) => e === true)
    }

    const onUpdate = async () => {
      if (isPutting) return
      try {
        setIsPutting(true)
        const fileData = await loadFileData()

        if (!validate()) return

        const dataUpdate = {
          ...form,
          ...fileData,
        }
        await putMinhChung(dataUpdate)

        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          text: 'Sửa minh chứng thành công',
        })
        drawerRef.current?.close()
        onUpdated?.(dataUpdate)
        setFileSelected(null)
        refetchListMinhChung()
      } catch {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Có lỗi xảy ra, vui lòng thử lại sau',
        })
      } finally {
        setIsPutting(false)
      }
    }

    useEffect(() => {
      return () => {
        setFileSelected(null)
      }
    }, [])

    useImperativeHandle(ref, () => ({
      open: () => {
        drawerRef.current?.open()
      },
      close: () => {
        drawerRef.current?.close()
      },
    }))

    return (
      <Drawer ref={drawerRef}>
        <Drawer.Header>
          <h3 className="text-uneti-primary font-medium text-lg">
            Cập nhật minh chứng
          </h3>
        </Drawer.Header>
        <Drawer.Content>
          <div className="my-5 mr-1 flex flex-col gap-5">
            {KT_KDCL_TaiLieu_Type == MinhChungType.Draft && (
              <div className="flex items-start gap-5">
                <label className="inline-block w-[250px]">
                  Mã minh chứng <span className="text-red-400">*</span>
                </label>
                <input
                  value={form?.KT_KDCL_TaiLieu_Ma || ''}
                  onInput={(e) =>
                    setForm((f) => ({
                      ...f,
                      KT_KDCL_TaiLieu_Ma: e.target.value,
                    }))
                  }
                  className="base-input flex-1"
                />
              </div>
            )}
            <div className="flex items-start gap-5">
              <label className="inline-block w-[250px]">
                Tên minh chứng <span className="text-red-400">*</span>
              </label>
              <input
                value={form?.KT_KDCL_TaiLieu_Ten || ''}
                onInput={(e) =>
                  setForm((f) => ({
                    ...f,
                    KT_KDCL_TaiLieu_Ten: e.target.value,
                  }))
                }
                className="base-input flex-1"
              />
            </div>
            <div className="flex items-start gap-5">
              <label className="inline-block w-[250px]">
                Số ban hành <span className="text-red-400">*</span>
              </label>
              <input
                value={form?.KT_KDCL_TaiLieu_SoBanHanh || ''}
                onInput={(e) =>
                  setForm((f) => ({
                    ...f,
                    KT_KDCL_TaiLieu_SoBanHanh: e.target.value,
                  }))
                }
                className="base-input flex-1"
              />
            </div>
            <div className="flex items-start gap-5">
              <label className="inline-block w-[250px]">
                Ngày ban hành, hoặc thời điểm khảo sát, điều tra, phỏng vấn{' '}
                <span className="text-red-400">*</span>
              </label>
              <DatepickerV2
                modelValue={form?.KT_KDCL_TaiLieu_NgayBanHanh}
                onChange={(date) =>
                  setForm({
                    ...form,
                    KT_KDCL_TaiLieu_NgayBanHanh: date,
                  })
                }
                valueFormat="YYYY-MM-DD HH:mm:ss"
                triggerClass="flex-1"
              />
            </div>
            <div className="flex items-start gap-5">
              <label className="inline-block w-[250px]">
                Nơi ban hành hoặc nhóm cá nhân thực hiện
                <span className="text-red-400">*</span>
              </label>
              <Select
                data={dataNoiBanHanh}
                modelValue={form?.KT_KDCL_TaiLieu_NoiBanHanh}
                onChange={(value) => {
                  setForm((f) => ({
                    ...f,
                    KT_KDCL_TaiLieu_NoiBanHanh: value,
                  }))
                }}
                defaultFirstOption
                clearable={false}
                triggerClass="base-input flex-1"
              />
            </div>
            <div className="flex items-start gap-5">
              <label className="inline-block w-[250px]">Trích yếu</label>
              <textarea
                value={form?.KT_KDCL_TaiLieu_TrichYeu || ''}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    KT_KDCL_TaiLieu_TrichYeu: e.target.value,
                  }))
                }
                rows={3}
                className="base-input !h-auto flex-1"
              />
            </div>
            <div className="flex items-start gap-5">
              <label className="inline-block w-[250px]">
                Trạng thái sử dụng
              </label>

              <Checkbox
                checked={form?.KT_KDCL_TaiLieu_TrangThai}
                onChange={(checked) => {
                  setForm((f) => ({
                    ...f,
                    KT_KDCL_TaiLieu_TrangThai: checked,
                  }))
                }}
              />
            </div>
            <div className="flex items-start gap-5">
              <label className="inline-block w-[250px]">Link đính kèm</label>
              <input
                value={form?.KT_KDCL_TaiLieu_LinkDinhKem || ''}
                onInput={(e) =>
                  setForm((f) => ({
                    ...f,
                    KT_KDCL_TaiLieu_LinkDinhKem: e.target.value,
                  }))
                }
                className="base-input flex-1"
              />
            </div>
            <div className="flex items-start gap-5">
              <label className="inline-block w-[250px]">
                File đính kèm<span className="text-red-400">*</span>
              </label>

              <div className="w-[400px]">
                <FileSelect
                  label="Vui lòng chọn các file có dung lượng 
                  nhỏ hơn 10MB"
                  maxFiles={MAX_FILE_SELECT}
                  fileType={ALLOW_FILE_TYPE}
                  maxFileSize={MAX_FILE_SIZE}
                  handleFilesChange={handleFilesChange}
                >
                  <div className="cursor-pointer hover:border-uneti-primary-lighter border-2 border-dashed border-gray-300/70 flex flex-col items-center justify-center px-3 py-4 rounded-lg">
                    <button className="base-button hover:bg-uneti-primary hover:text-gray-50 text-slate-700 bg-gray-100">
                      Chọn file tải lên
                    </button>

                    <p className="text-center max-w-[250px] mt-2 text-slate-500">
                      Vui lòng chọn các file có dung lượng nhỏ hơn 10MB
                    </p>
                  </div>
                </FileSelect>

                {(fileSelected || form?.KT_KDCL_TaiLieu_TenFile) && (
                  <div className="mt-3">
                    <p className="ml-4 text-slate-500">Đã chọn</p>

                    <div className="flex items-center gap-3 py-2 px-3 rounded-xl border border-solid border-gray-200 bg-gray-50/50">
                      <div className="text-slate-500">
                        <Icon size={24}>
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H14C14.41 1.25 14.75 1.59 14.75 2C14.75 2.41 14.41 2.75 14 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V10C21.25 9.59 21.59 9.25 22 9.25C22.41 9.25 22.75 9.59 22.75 10V15C22.75 20.43 20.43 22.75 15 22.75Z"
                              fill="currentColor"
                            />
                            <path
                              d="M22 10.7505H18C14.58 10.7505 13.25 9.42048 13.25 6.00048V2.00048C13.25 1.70048 13.43 1.42048 13.71 1.31048C13.99 1.19048 14.31 1.26048 14.53 1.47048L22.53 9.47048C22.74 9.68048 22.81 10.0105 22.69 10.2905C22.57 10.5705 22.3 10.7505 22 10.7505ZM14.75 3.81048V6.00048C14.75 8.58048 15.42 9.25048 18 9.25048H20.19L14.75 3.81048Z"
                              fill="currentColor"
                            />
                            <path
                              d="M13 13.75H7C6.59 13.75 6.25 13.41 6.25 13C6.25 12.59 6.59 12.25 7 12.25H13C13.41 12.25 13.75 12.59 13.75 13C13.75 13.41 13.41 13.75 13 13.75Z"
                              fill="currentColor"
                            />
                            <path
                              d="M11 17.75H7C6.59 17.75 6.25 17.41 6.25 17C6.25 16.59 6.59 16.25 7 16.25H11C11.41 16.25 11.75 16.59 11.75 17C11.75 17.41 11.41 17.75 11 17.75Z"
                              fill="currentColor"
                            />
                          </svg>
                        </Icon>
                      </div>

                      <p
                        className={transformCls([
                          'line-clamp-2 break-words font-semibold text-slate-600/90 max-w-[300px]',
                          !fileSelected?.name &&
                            form?.KT_KDCL_TaiLieu_TenFile &&
                            'hover:text-uneti-primary-lighter cursor-pointer',
                        ])}
                        onClick={handleDownloadFile}
                      >
                        {fileSelected?.name || form?.KT_KDCL_TaiLieu_TenFile}
                      </p>

                      <button
                        className="cursor-pointer ml-auto"
                        onClick={() => setFileSelected(null)}
                      >
                        <Icon>
                          <CloseCircle />
                        </Icon>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Drawer.Content>
        <Drawer.Footer>
          <div className="flex items-center justify-end gap-3">
            <Button
              disabled={isPutting}
              onClick={drawerRef.current?.close}
              color="danger"
            >
              Hủy
            </Button>
            <Button onClick={onUpdate} isLoading={isPutting}>
              Cập nhật
            </Button>
          </div>
        </Drawer.Footer>
      </Drawer>
    )
  },
)

DrawerUpdateMinhChung.displayName = 'DrawerUpdateMinhChung'

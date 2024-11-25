import { useEffect, useMemo, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import {
  deleteMinhChung,
  loadAllMinhChung,
  loadMinhChung_R_Para_File,
} from '@/Apis/KDCL/MinhChung/apiMinhChung'
import Button from '@/Components/Base/Button/Button'
import Icon from '@/Components/Base/Icon/Icon'
import { Brush } from '@/Components/Base/Icons/Brush'
import { Trash } from '@/Components/Base/Icons/Trash'
import { DrawerCreateMinhChung } from '@/Components/KiemDinhChatLuong/QuanLyMinhChung/DrawerCreateMinhChung'
import { DrawerUpdateMinhChung } from '@/Components/KiemDinhChatLuong/QuanLyMinhChung/DrawerUpdateMinhChung'
import { useNamespace, useQueryParams } from '@/Services/Hooks'
import { retries } from '@/Services/Utils/requestUtils'
import { TablePagination } from '@mui/material'
import { stepStatusEnum } from '@/Services/Tokens/index.js'
import { MinhChungType } from '@/Services/Tokens/KDCL/CTDT/minhChung.js'
import { useMinhChungStore } from '@/Services/Store/Module/KiemDinhChatLuong/minhChung.js'
import { Checkbox } from '@/Components/Base/Checkbox/index.js'
import {
  convertBufferToBase64,
  handleDownloadFileBase64,
} from '@/Services/Utils/index.js'
import { CgClose } from 'react-icons/cg'
import Loading from '@/Components/Base/Icons/Loading.jsx'
import { AiOutlineCloudDownload } from 'react-icons/ai'

export default function MCDungChungDonVi() {
  const ns = useNamespace('kiem-dinh-chat-luong')

  const { listMinhChung, refetch: refetchListMinhChung } = useMinhChungStore()

  const [isDownloading, setIsDownloading] = useState(false)
  const drawerCreateMinhChungRef = useRef()
  const drawerUpdateMinhChungRef = useRef()
  const [minhChungUpdating, setMinhChungUpdating] = useState()
  const [minhChungSelected, setMinhChungSelected] = useState()

  const [paginate, setPaginate] = useState({
    page: 0,
    limit: 10,
  })

  const [filters, setFilters] = useState({
    tenMinhChung: '',
  })

  const minhChungFilterd = useMemo(() => {
    return listMinhChung.filter((e) => {
      return (
        e.KT_KDCL_TaiLieu_Type == MinhChungType.Public &&
        e.KT_KDCL_TaiLieu_Ten.toLowerCase().includes(
          filters.tenMinhChung.toLowerCase(),
        )
      )
    })
  }, [filters, listMinhChung])

  const minhChungPaginated = useMemo(() => {
    const start = paginate.page * paginate.limit
    const end = start + paginate.limit
    return minhChungFilterd.slice(start, end)
  }, [minhChungFilterd, paginate])

  const loadTaiLieu_R_Para = async () => {
    const res = await loadMinhChung_R_Para_File(
      minhChungSelected.KT_KDCL_TaiLieu_ID,
    )

    const file = res.data.body[0]?.KT_KDCL_TaiLieu_DataFile?.data
    if (!file) return ''
    return convertBufferToBase64(file)
  }

  const handleDownloadFile = async () => {
    if (isDownloading) return

    try {
      setIsDownloading(true)
      const filebase64 = await loadTaiLieu_R_Para()
      if (!filebase64) {
        Swal.fire({
          title: 'Không thể tải file',
          text: 'Có lỗi xảy ra khi tải file đính kèm, vui lòng thử lại sau hoặc liên hệ quản trị viên!',
          icon: 'error',
        })
        return
      }

      handleDownloadFileBase64(
        minhChungSelected.KT_KDCL_TaiLieu_TenFile,
        filebase64,
      )
    } finally {
      setIsDownloading(false)
    }
  }

  const handleDeleteMinhChung = async (e) => {
    const result = await Swal.fire({
      title: 'Xác nhận xóa minh chứng?',
      text: `Xóa minh chứng ${e.KT_KDCL_TaiLieu_Ten}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận!',
      cancelButtonText: 'Hủy bỏ',
    })

    if (!result.isConfirmed) return

    await deleteMinhChung(e.KT_KDCL_TaiLieu_ID)
    Swal.fire({
      title: 'Xóa thành công!',
      text: `Xóa thành công minh chứng ${e.KT_KDCL_TaiLieu_Ten}.`,
      icon: 'success',
    })
    await refetchListMinhChung()
  }

  return (
    <div className="box">
      <div className={ns.e('header')}>
        <h3 className={ns.em('header', 'title')}>
          Danh sách cấu hình mã minh chứng
        </h3>
      </div>
      <div className="uneti-divider" />
      <div className="flex flex-col">
        <div className="my-3 flex justify-between items-center">
          {minhChungSelected && (
            <div className="bg-slate-100 px-4 py-2 rounded-lg flex items-center gap-3">
              <button
                onClick={() => setMinhChungSelected(null)}
                className="px-2 rounded flex items-center gap-1 hover:underline focus:!border-dashed active:border-dashed border-transparent border focus:border-uneti-primary"
              >
                <Icon size={13}>
                  <CgClose />
                </Icon>
                Bỏ chọn
              </button>

              {minhChungSelected.KT_KDCL_TaiLieu_TenFile && (
                <div className="border-l pl-4">
                  <button
                    onClick={handleDownloadFile}
                    className="px-2 rounded flex items-end gap-1 hover:underline focus:!border-dashed active:border-dashed border-transparent border focus:border-uneti-primary"
                  >
                    {isDownloading && (
                      <Icon className="loading">
                        <Loading />
                      </Icon>
                    )}
                    <Icon size={18}>
                      <AiOutlineCloudDownload />
                    </Icon>
                    Tải file đính kèm
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center gap-2 ml-auto">
            <input
              className="base-input border focus:!border-uneti-primary"
              placeholder="Tìm tên minh chứng"
              value={filters.tenMinhChung}
              onChange={({ target }) => {
                setFilters({ ...filters, tenMinhChung: target.value })
              }}
            />
            <Button
              onClick={() => {
                drawerCreateMinhChungRef.current?.open()
              }}
            >
              Thêm mới
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="uneti-u-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Chọn</th>
                <th>Tên minh chứng</th>
                <th>Trích yếu</th>
                <th>
                  Số, ngày ban hành hoặc thời điểm khảo sát, điều tra, phỏng
                  vấn, quan sát
                </th>
                <th>Nơi ban hành hoặc nhóm cá nhân thực hiện</th>
                <th>Trạng thái</th>
                <th>Tác vụ</th>
              </tr>
            </thead>
            <tbody>
              {minhChungPaginated?.map((e, i) => (
                <tr key={i} onClick={() => setMinhChungSelected(e)}>
                  <td style={{ width: 60, textAlign: 'center' }}>{i + 1}</td>
                  <td>
                    <Checkbox
                      checked={
                        minhChungSelected?.KT_KDCL_TaiLieu_ID ===
                        e.KT_KDCL_TaiLieu_ID
                      }
                      onChange={() => setMinhChungSelected(e)}
                    />
                  </td>
                  <td style={{ minWidth: 150 }}>{e.KT_KDCL_TaiLieu_Ten}</td>
                  <td style={{ minWidth: 200 }}>
                    {e.KT_KDCL_TaiLieu_TrichYeu}
                  </td>
                  <td style={{ minWidth: 140 }}>
                    {e.KT_KDCL_TaiLieu_SoBanHanh}
                  </td>
                  <td style={{ minWidth: 120 }}>
                    {e.KT_KDCL_TaiLieu_NoiBanHanh}
                  </td>
                  <td style={{ minWidth: 140 }}>
                    {e.KT_KDCL_TaiLieu_TrangThai ? 'Sử dụng' : 'Không sử dụng'}
                  </td>
                  <td>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          setMinhChungUpdating(e)
                          drawerUpdateMinhChungRef.current?.open()
                        }}
                        className="icon-btn text-orange-500"
                      >
                        <Icon>
                          <Brush />
                        </Icon>
                      </button>
                      <button
                        onClick={() => {
                          handleDeleteMinhChung(e)
                        }}
                        className="icon-btn text-red-600"
                      >
                        <Icon>
                          <Trash />
                        </Icon>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* paginate */}
        <TablePagination
          labelRowsPerPage="Số dòng hiển thị"
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={minhChungFilterd.length || 0}
          rowsPerPage={paginate.limit}
          page={paginate.page}
          onPageChange={(_, page) => {
            setPaginate({ ...paginate, page })
          }}
          onRowsPerPageChange={({ target }) => {
            setPaginate({ ...paginate, limit: target.value })
          }}
        />
      </div>
      <DrawerCreateMinhChung
        ref={drawerCreateMinhChungRef}
        onCreated={refetchListMinhChung}
        KT_KDCL_TaiLieu_TrangThai_PheDuyet={stepStatusEnum.DaPheDuyet}
        KT_KDCL_TaiLieu_Type={MinhChungType.Public}
      />
      <DrawerUpdateMinhChung
        ref={drawerUpdateMinhChungRef}
        minhChungUpdating={minhChungUpdating}
        onUpdated={refetchListMinhChung}
      />
    </div>
  )
}

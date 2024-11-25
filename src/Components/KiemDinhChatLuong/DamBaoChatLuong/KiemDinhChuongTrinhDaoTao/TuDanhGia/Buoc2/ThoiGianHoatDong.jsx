import { useNavigate } from 'react-router-dom'
import { useContext, useRef, useState } from 'react'
import Button from '@/Components/Base/Button/Button.jsx'
import {
  DatepickerV2,
  Drawer,
  Table,
  TableColumn,
} from '@/Components/Base/index.js'
import { HoSoKiemDinhCtx } from '@/Services/Tokens/index.js'
import Icon from '@/Components/Base/Icon/Icon.jsx'
import { Brush } from '@/Components/Base/Icons/Brush.jsx'
import { Trash } from '@/Components/Base/Icons/Trash.jsx'
import { useKeHoachTDG_HoatDongStore } from '@/Services/Store/index.js'
import { dayjs, handleBackRoute, transformCls } from '@/Services/Utils/index.js'
import { required } from '@/Services/Validators/required.js'
import {
  delKeHoach_TDG_HoatDong,
  postKeHoach_TDG_HoatDong,
  putKeHoach_TDG_HoatDong,
} from '@/Apis/KDCL/index.js'
import Swal from 'sweetalert2'
import { isNil } from 'lodash-unified'
import { isTrue } from '@/Services/Validators'

export default function ThoiGianHoatDong({ keHoach }) {
  const navigate = useNavigate()
  const hoSoKiemDinh = useContext(HoSoKiemDinhCtx)

  const drawerRef = useRef()
  const [isPosting, setIsPosting] = useState(false)

  const [form, setForm] = useState({
    KT_KDCL_CTDT_KeHoach_TDG_HoatDong_ThoiGian_Tu: '',
    KT_KDCL_CTDT_KeHoach_TDG_HoatDong_ThoiGian_Den: '',
    KT_KDCL_CTDT_KeHoach_TDG_HoatDong_NoiDung: '',
    KT_KDCL_CTDT_KeHoach_TDG_HoatDong_YeuCauKetQua: '',
    KT_KDCL_CTDT_KeHoach_TDG_HoatDong_ChuTri: '',
    KT_KDCL_CTDT_KeHoach_TDG_HoatDong_PhoiHop: '',
    KT_KDCL_CTDT_KeHoach_TDG_ID: keHoach?.KT_KDCL_CTDT_KeHoach_TDG_ID,
  })

  const { listKeHoachHoatDong, refetch: refetchListKeHoachHoatDong } =
    useKeHoachTDG_HoatDongStore()

  const handleFormChange = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    })
  }

  const validate = () =>
    [
      () =>
        required(
          form.KT_KDCL_CTDT_KeHoach_TDG_HoatDong_NoiDung,
          'Vui lòng nhập nội dung',
        ),
      () =>
        required(
          form.KT_KDCL_CTDT_KeHoach_TDG_HoatDong_ThoiGian_Den,
          'Vui lòng chọn ngày kết thúc',
        ),
      () =>
        required(
          form.KT_KDCL_CTDT_KeHoach_TDG_HoatDong_ThoiGian_Tu,
          'Vui lòng chọn ngày bắt đầu',
        ),
      () =>
        required(
          form.KT_KDCL_CTDT_KeHoach_TDG_HoatDong_YeuCauKetQua,
          'Vui lòng nhập yêu cầu kết quả',
        ),
    ].every(isTrue)

  const handleSubmit = async () => {
    if (isPosting || !validate() || !keHoach) return

    try {
      setIsPosting(true)

      form.KT_KDCL_CTDT_KeHoach_TDG_ID = keHoach.KT_KDCL_CTDT_KeHoach_TDG_ID

      if (isNil(form.KT_KDCL_CTDT_KeHoach_TDG_HoatDong_ID)) {
        await postKeHoach_TDG_HoatDong(form)
      } else {
        await putKeHoach_TDG_HoatDong(form)
      }
      await refetchListKeHoachHoatDong()
      drawerRef.current.close()
    } catch (e) {
      console.log(e)
      Swal.fire({
        title: 'Lỗi',
        icon: 'error',
        text: 'Cập nhật không thành công, vui lòng thử lại sau!',
      })
    } finally {
      setIsPosting(false)
    }
  }

  const handleDelete = async (hoatDong) => {
    const res = await Swal.fire({
      title: 'Bạn chắc chắn muốn xóa dữ liệu này?',
      text: 'Sau khi xóa sẽ không thể khôi phục lại được',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    })

    if (!res.isConfirmed) return

    try {
      await delKeHoach_TDG_HoatDong(
        hoatDong.KT_KDCL_CTDT_KeHoach_TDG_HoatDong_ID,
      )
      await refetchListKeHoachHoatDong()
    } catch (e) {
      console.log(e)
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Có lỗi xảy ra, vui lòng thử lại sau!',
      })
    }
  }

  return (
    <div className="z-[2] mt-4">
      <div className="my-6 flex items-center justify-between">
        <Button
          type="border"
          onClick={() =>
            handleBackRoute(
              navigate,
              `/dam-bao-chat-luong/chat-luong-ctdt/${hoSoKiemDinh.hoSoKiemDinh?.KT_KDCL_CTDT_HoSoKiemDinh_ID}/tu-danh-gia/buoc-2`,
            )
          }
        >
          Quay lại
        </Button>
        <p className="uppercase cursor-default text-uneti-primary-light ml-3 font-semibold">
          Bảng thời gian hoạt động
        </p>
      </div>
      <div>
        <Button
          className="w-max ml-auto mb-2"
          onClick={() => {
            setForm({
              KT_KDCL_CTDT_KeHoach_TDG_HoatDong_ThoiGian_Tu: '',
              KT_KDCL_CTDT_KeHoach_TDG_HoatDong_ThoiGian_Den: '',
              KT_KDCL_CTDT_KeHoach_TDG_HoatDong_NoiDung: '',
              KT_KDCL_CTDT_KeHoach_TDG_HoatDong_YeuCauKetQua: '',
              KT_KDCL_CTDT_KeHoach_TDG_HoatDong_ChuTri: '',
              KT_KDCL_CTDT_KeHoach_TDG_HoatDong_PhoiHop: '',
              KT_KDCL_CTDT_KeHoach_TDG_ID: keHoach?.KT_KDCL_CTDT_KeHoach_TDG_ID,
            })
            drawerRef.current.open()
          }}
        >
          Thêm mới
        </Button>

        <Table
          data={listKeHoachHoatDong.filter(
            (kh) =>
              kh.KT_KDCL_CTDT_KeHoach_TDG_ID ===
              keHoach?.KT_KDCL_CTDT_KeHoach_TDG_ID,
          )}
        >
          <TableColumn label="Thời gian">
            {(row) => (
              <div className="flex">
                <p className="mr-1">Từ</p>
                <span>
                  {dayjs(
                    row.KT_KDCL_CTDT_KeHoach_TDG_HoatDong_ThoiGian_Tu,
                  ).format('DD/MM/YYYY')}
                </span>
                <span>-</span>
                <span>
                  {dayjs(
                    row.KT_KDCL_CTDT_KeHoach_TDG_HoatDong_ThoiGian_Den,
                  ).format('DD/MM/YYYY')}
                </span>
              </div>
            )}
          </TableColumn>
          <TableColumn
            label="Nội dung hoạt động"
            prop="KT_KDCL_CTDT_KeHoach_TDG_HoatDong_NoiDung"
          />
          <TableColumn
            label="Yêu cầu kết quả"
            prop="KT_KDCL_CTDT_KeHoach_TDG_HoatDong_YeuCauKetQua"
          />
          <TableColumn
            label="Đơn vị chủ trì"
            prop="KT_KDCL_CTDT_KeHoach_TDG_HoatDong_ChuTri"
          />
          <TableColumn
            label="Đơn vị phối hợp"
            prop="KT_KDCL_CTDT_KeHoach_TDG_HoatDong_PhoiHop"
          />
          <TableColumn label="Tác vụ" width={100} align="center">
            {(row) => (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => {
                    if (!hoSoKiemDinh.isBanThuKy) {
                      return
                    }
                    setForm(row)
                    drawerRef.current.open()
                  }}
                  className={transformCls([
                    'icon-btn',
                    hoSoKiemDinh.isBanThuKy
                      ? ''
                      : 'cursor-not-allowed pointer-events-none',
                  ])}
                >
                  <Icon>
                    <Brush />
                  </Icon>
                </button>
                <button
                  onClick={() => {
                    if (!hoSoKiemDinh.isBanThuKy) {
                      return
                    }
                    handleDelete(row)
                  }}
                  className={transformCls([
                    'icon-btn',
                    hoSoKiemDinh.isBanThuKy
                      ? ''
                      : 'cursor-not-allowed pointer-events-none',
                  ])}
                >
                  <Icon>
                    <Trash />
                  </Icon>
                </button>
              </div>
            )}
          </TableColumn>
        </Table>

        <Drawer ref={drawerRef} closeOnClickOutside={!isPosting}>
          <Drawer.Header>
            <h3 className="text-uneti-primary font-medium ">
              Cấu hình thời gian hoạt động
            </h3>
          </Drawer.Header>

          <Drawer.Content>
            <div className="px-1 flex flex-col gap-4">
              <div className="flex gap-5">
                <p className="text-slate-900/70 w-[120px]">Ngày bắt đầu</p>
                <DatepickerV2
                  modelValue={
                    form.KT_KDCL_CTDT_KeHoach_TDG_HoatDong_ThoiGian_Tu
                  }
                  onChange={(date) =>
                    handleFormChange(
                      'KT_KDCL_CTDT_KeHoach_TDG_HoatDong_ThoiGian_Tu',
                      date,
                    )
                  }
                  triggerClass="flex-1"
                />
              </div>
              <div className="flex gap-5">
                <p className="text-slate-900/70 w-[120px]">Ngày kết thúc</p>
                <DatepickerV2
                  modelValue={
                    form.KT_KDCL_CTDT_KeHoach_TDG_HoatDong_ThoiGian_Den
                  }
                  onChange={(date) =>
                    handleFormChange(
                      'KT_KDCL_CTDT_KeHoach_TDG_HoatDong_ThoiGian_Den',
                      date,
                    )
                  }
                  triggerClass="flex-1"
                />
              </div>
              <div className="flex gap-5">
                <p className="text-slate-900/70 w-[120px]">
                  Nội dung thực hiện
                </p>
                <textarea
                  className="base-input w-full max-w-lg h-auto flex-1"
                  rows={3}
                  value={form.KT_KDCL_CTDT_KeHoach_TDG_HoatDong_NoiDung}
                  onChange={(event) =>
                    handleFormChange(
                      'KT_KDCL_CTDT_KeHoach_TDG_HoatDong_NoiDung',
                      event.target.value,
                    )
                  }
                  placeholder="Nội dung thực hiện"
                />
              </div>
              <div className="flex gap-5">
                <p className="text-slate-900/70 w-[120px]">Yêu cầu kết quả</p>
                <textarea
                  className="base-input w-full max-w-lg h-auto flex-1"
                  rows={3}
                  value={form.KT_KDCL_CTDT_KeHoach_TDG_HoatDong_YeuCauKetQua}
                  onChange={(event) =>
                    handleFormChange(
                      'KT_KDCL_CTDT_KeHoach_TDG_HoatDong_YeuCauKetQua',
                      event.target.value,
                    )
                  }
                  placeholder="Yêu cầu kết quả đạt được"
                />
              </div>
              <div>
                <p className="text-slate-900/90">Đơn vị/ cá nhân thực hiện</p>
                <div className="flex gap-5">
                  <p className="text-slate-900/70 w-[120px]">Chủ trì</p>
                  <textarea
                    className="base-input w-full max-w-lg h-auto flex-1"
                    rows={3}
                    value={form.KT_KDCL_CTDT_KeHoach_TDG_HoatDong_ChuTri}
                    onChange={(event) =>
                      handleFormChange(
                        'KT_KDCL_CTDT_KeHoach_TDG_HoatDong_ChuTri',
                        event.target.value,
                      )
                    }
                    placeholder="Đơn vị/cá nhân chủ trì"
                  />
                </div>
                <div className="flex gap-5 mt-2">
                  <p className="text-slate-900/70 w-[120px]">Phối hợp</p>
                  <textarea
                    className="base-input w-full max-w-lg h-auto flex-1"
                    rows={3}
                    value={form.KT_KDCL_CTDT_KeHoach_TDG_HoatDong_PhoiHop}
                    onChange={(event) =>
                      handleFormChange(
                        'KT_KDCL_CTDT_KeHoach_TDG_HoatDong_PhoiHop',
                        event.target.value,
                      )
                    }
                    placeholder="Đơn vị/cá nhân phối hợp"
                  />
                </div>
              </div>
            </div>{' '}
          </Drawer.Content>

          <Drawer.Footer>
            <div className="flex items-center justify-end gap-2">
              <Button
                onClick={() => drawerRef.current.close()}
                color="danger"
                disabled={isPosting}
              >
                Hủy
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isPosting}
                isLoading={isPosting}
              >
                Cập nhật
              </Button>
            </div>
          </Drawer.Footer>
        </Drawer>
      </div>
    </div>
  )
}

import { useNavigate } from 'react-router-dom'
import Button from '@/Components/Base/Button/Button.jsx'
import { useContext, useRef, useState } from 'react'
import { HoSoKiemDinhCtx } from '@/Services/Tokens/index.js'
import {
  DatepickerV2,
  Drawer,
  Table,
  TableColumn,
} from '@/Components/Base/index.js'
import Icon from '@/Components/Base/Icon/Icon.jsx'
import { Brush } from '@/Components/Base/Icons/Brush.jsx'
import { usePhanCongThucHienStore } from '@/Services/Store/index.js'
import Swal from 'sweetalert2'
import { putPhanCongThucHien } from '@/Apis/KDCL/index.js'
import { required } from '@/Services/Validators/required.js'
import { dayjs, transformCls } from '@/Services/Utils/index.js'

export default function NhomCongTac() {
  const hoSoKiemDinh = useContext(HoSoKiemDinhCtx)

  const navigate = useNavigate()

  const drawerRef = useRef()

  const [isPutting, setIsPutting] = useState(false)
  const [phanCongSelected, setPhanCongSelected] = useState(null)
  const { listPhanCongThucHienMapped, refetch: refetchListPhanCongThucHien } =
    usePhanCongThucHienStore(hoSoKiemDinh)

  const handleBackRoute = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate(
        `dam-bao-chat-luong/chat-luong-ctdt/${hoSoKiemDinh.hoSoKiemDinh.KT_KDCL_CTDT_HoSoKiemDinh_ID}/tu-danh-gia/buoc-2`,
      )
    }
  }

  const validate = () => {
    return [
      required(
        phanCongSelected.KT_KDCL_CTDT_PhanCongThucHien_TuNgay,
        'Vui lòng chọn ngày bắt đầu thực hiện',
      ),
      required(
        phanCongSelected.KT_KDCL_CTDT_PhanCongThucHien_DenNgay,
        'Vui lòng chọn ngày kết thúc thực hiện',
      ),
      required(
        phanCongSelected.KT_KDCL_CTDT_PhanCongThucHien_GhiChu,
        'Vui lòng nhập ghi chú',
      ),
    ].every((e) => e)
  }

  const handleSubmit = async () => {
    if (isPutting || !validate()) return

    try {
      setIsPutting(true)
      await putPhanCongThucHien(phanCongSelected)
      await refetchListPhanCongThucHien()
      drawerRef.current.close()
    } catch (e) {
      console.log(e)
      Swal.fire({
        title: 'Lỗi',
        icon: 'error',
        text: 'Có lỗi xảy ra, vui lòng thử lại sau!',
      })
    } finally {
      setIsPutting(false)
    }
  }
  return (
    <div className="z-[2]">
      <div className="my-6 flex items-center justify-between">
        <Button type="border" onClick={handleBackRoute}>
          Quay lại
        </Button>
        <p className="uppercase cursor-default text-uneti-primary-light ml-3 font-semibold">
          Danh sách các nhóm công tác
        </p>
      </div>

      <Table data={listPhanCongThucHienMapped}>
        <TableColumn label="Tiêu chuẩn">
          {(row) => (
            <div
              dangerouslySetInnerHTML={{
                __html: row.KT_KDCL_TieuChuan_Ma,
              }}
            />
          )}
        </TableColumn>
        <TableColumn
          label="Nhóm chuyên trách chịu trách nhiệm"
          prop="KT_KDCL_CTDT_PhanCongThucHien_NhomPhanCong"
        />
        <TableColumn label="Thời gian thu nhập thông tin và minh chứng">
          {(row) =>
            row.KT_KDCL_CTDT_PhanCongThucHien_TuNgay &&
            row.KT_KDCL_CTDT_PhanCongThucHien_DenNgay ? (
              <div>
                {dayjs(row.KT_KDCL_CTDT_PhanCongThucHien_TuNgay).format(
                  'DD/MM/YYYY',
                )}{' '}
                -{' '}
                {dayjs(row.KT_KDCL_CTDT_PhanCongThucHien_DenNgay).format(
                  'DD/MM/YYYY',
                )}
              </div>
            ) : null
          }
        </TableColumn>
        <TableColumn
          label="Ghi chú"
          prop="KT_KDCL_CTDT_PhanCongThucHien_GhiChu"
        />
        <TableColumn label="Tác vụ" align="center">
          {(row) => (
            <button
              onClick={() => {
                if (!hoSoKiemDinh.isBanThuKy) {
                  return
                }
                setPhanCongSelected(row)
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
          )}
        </TableColumn>
      </Table>

      <Drawer
        ref={drawerRef}
        closeOnClickOutside={!isPutting}
        onClosed={() => setPhanCongSelected(null)}
      >
        <Drawer.Header>
          <h3 className="text-gray-600">
            <b>Cập nhật thời gian hoạt động của nhóm</b>
            <div className="flex gap-1">
              <b>Tiêu chuẩn:</b>
              <div
                dangerouslySetInnerHTML={{
                  __html: phanCongSelected?.KT_KDCL_TieuChuan_Ma,
                }}
              />
            </div>
            <div className="flex gap-1">
              <b>Nhóm phân công:</b>
              {phanCongSelected?.KT_KDCL_CTDT_PhanCongThucHien_NhomPhanCong}
            </div>
          </h3>
        </Drawer.Header>

        <Drawer.Content>
          <div className="w-80 px-1 flex flex-col gap-4">
            <div className="flex gap-5">
              <p className="text-slate-900/70 w-[120px]">Thời gian bắt đầu</p>
              <DatepickerV2
                modelValue={
                  phanCongSelected?.KT_KDCL_CTDT_PhanCongThucHien_TuNgay
                }
                onChange={(date) =>
                  setPhanCongSelected({
                    ...phanCongSelected,
                    KT_KDCL_CTDT_PhanCongThucHien_TuNgay: date,
                  })
                }
                triggerClass="w-full flex-1"
                valueFormat="YYYY-MM-DD HH:mm:ss"
                disabled={isPutting}
              />
            </div>
            <div className="mt-2 flex gap-5">
              <p className="text-slate-900/70 w-[120px]">Thời gian kết thúc</p>
              <DatepickerV2
                modelValue={
                  phanCongSelected?.KT_KDCL_CTDT_PhanCongThucHien_DenNgay
                }
                onChange={(date) =>
                  setPhanCongSelected({
                    ...phanCongSelected,
                    KT_KDCL_CTDT_PhanCongThucHien_DenNgay: date,
                  })
                }
                triggerClass="w-full flex-1"
                valueFormat="YYYY-MM-DD HH:mm:ss"
                disabled={isPutting}
              />
            </div>
            <div className="mt-2 flex gap-5">
              <p className="text-slate-900/70 w-[120px]">Ghi chú</p>
              <textarea
                className="base-input h-auto w-full flex-1"
                rows={3}
                value={phanCongSelected?.KT_KDCL_CTDT_PhanCongThucHien_GhiChu}
                onChange={(event) =>
                  setPhanCongSelected({
                    ...phanCongSelected,
                    KT_KDCL_CTDT_PhanCongThucHien_GhiChu: event.target.value,
                  })
                }
                disabled={isPutting}
              />
            </div>
          </div>
        </Drawer.Content>

        <Drawer.Footer>
          <div className="flex gap-2 justify-end">
            <Button
              disabled={isPutting}
              onClick={() => drawerRef.current.close()}
              color="danger"
            >
              Hủy
            </Button>
            <Button
              disabled={isPutting}
              isLoading={isPutting}
              onClick={handleSubmit}
            >
              Cập nhật
            </Button>
          </div>
        </Drawer.Footer>
      </Drawer>
    </div>
  )
}

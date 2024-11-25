import Dialog from '@/Components/Base/Dialog/Dialog.jsx'
import Button from '@/Components/Base/Button/Button.jsx'
import { useMinhChungStore } from '@/Services/Store/Module/KiemDinhChatLuong/minhChung.js'
import { Table, TableColumn } from '@/Components/Base/index.js'
import { useContext, useMemo, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import { dayjs, transformCls } from '@/Services/Utils/index.js'
import {
  useThuThapMinhChungStore,
  useThuThapMinhChungTieuChiStore,
} from '@/Services/Store/index.js'
import { HoSoKiemDinhCtx, stepStatusEnum } from '@/Services/Tokens/index.js'
import DialogTrichDanMinhChung from './DialogTrichDanMinhChung'

export default function DialogChonMinhChung({
  isOpen,
  setIsOpen,
  onSubmit,
  IDTieuChi,
}) {
  const hoSoKiemDinh = useContext(HoSoKiemDinhCtx)
  const dialogRef = useRef()
  const [isOpenDialogTrichDan, setIsOpenDialogTrichDan] = useState(false)
  const [paginate, setPaginate] = useState({ page: 0, limit: 10 })
  const [search, setSearch] = useState('')
  const [minhChungSelected, setMinhChungSelected] = useState([])

  const { listMinhChung } = useMinhChungStore()
  const { listThuThapMinhChung } = useThuThapMinhChungStore()
  const { listThuThapMinhChungTieuChi: _listThuThapMinhChungTieuChi } =
    useThuThapMinhChungTieuChiStore()

  const thuThapMinhChung = useMemo(() => {
    if (!hoSoKiemDinh.hoiDong) return null

    return listThuThapMinhChung.find(
      (e) =>
        e.KT_KDCL_CTDT_ThuThapMinhChung_IDTieuChi === IDTieuChi &&
        e.KT_KDCL_CTDT_ThuThapMinhChung_IDThanhLapHoiDong ===
          hoSoKiemDinh.hoiDong.KT_KDCL_CTDT_ThanhLapHoiDong_ID,
    )
  }, [hoSoKiemDinh.hoiDong, listThuThapMinhChung])

  const listThuThapMinhChungTieuChi = useMemo(() => {
    if (!thuThapMinhChung || !listMinhChung.length) return []

    return _listThuThapMinhChungTieuChi
      .filter(
        (e) =>
          e.KT_KDCL_CTDT_ThuThapMinhChung_ChiTiet_IDThuThapMinhChung &&
          e.KT_KDCL_CTDT_ThuThapMinhChung_ChiTiet_IDThuThapMinhChung ===
            thuThapMinhChung.KT_KDCL_CTDT_ThuThapMinhChung_ID,
      )
      .map((e) => {
        const minhChung = listMinhChung.find(
          (mc) =>
            mc.KT_KDCL_TaiLieu_ID ===
            e.KT_KDCL_CTDT_ThuThapMinhChung_ChiTiet_IDMinhChung,
        )

        return {
          ...e,
          ...minhChung,
        }
      })
  }, [_listThuThapMinhChungTieuChi, thuThapMinhChung, listMinhChung])

  const minhChungFiltered = useMemo(() => {
    return listThuThapMinhChungTieuChi.filter(
      (item) =>
        item.KT_KDCL_TaiLieu_TrangThai_PheDuyet === stepStatusEnum.DaPheDuyet &&
        (item.KT_KDCL_TaiLieu_Ma.toLowerCase().includes(search.toLowerCase()) ||
          item.KT_KDCL_TaiLieu_Ten.toLowerCase().includes(
            search.toLowerCase(),
          )),
    )
  }, [search, listThuThapMinhChungTieuChi])

  const minhChungPaginated = useMemo(() => {
    return minhChungFiltered.slice(
      paginate.page * paginate.limit,
      (paginate.page + 1) * paginate.limit,
    )
  }, [paginate, minhChungFiltered])

  const handleSubmit = (trichDanMinhChung) => {
    if (!minhChungSelected.length || !minhChungSelected[0]) {
      Swal.fire({
        title: 'Thông báo',
        text: 'Vui lòng chọn một minh chứng',
        icon: 'warning',
      })
      return
    }

    if (!minhChungSelected[0].KT_KDCL_TaiLieu_Ma) {
      Swal.fire({
        title: 'Thông báo',
        text: 'Minh chứng này chưa được đánh mã',
        icon: 'warning',
      })
      return
    }

    onSubmit(minhChungSelected[0], trichDanMinhChung)
  }

  const handleAccepted = () => {
    setIsOpenDialogTrichDan(true)
    dialogRef.current.close()
  }

  return (
    <>
      <Dialog
        ref={dialogRef}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        header={<h2 className="text-[15px] font-medium">Chọn minh chứng</h2>}
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button
              color="danger"
              onClick={() => {
                dialogRef.current.close()
              }}
            >
              Huỷ
            </Button>
            <Button onClick={handleAccepted}>Xác nhận</Button>
          </div>
        }
      >
        <div
          className={
            'flex flex-col justify-between md:flex-row md:items-end mb-2 gap-2'
          }
        >
          <div className="flex flex-col">
            <label className="ml-1 text-slate-500" htmlFor={'Dialog_MC_Search'}>
              Tìm minh chứng (theo mã hoặc tên)
            </label>
            <input
              id={'Dialog_MC_Search'}
              className="base-input w-full"
              placeholder={'Nhập mã minh chứng hoặc tên minh chứng'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/*  Paginate*/}
          <div className={'flex justify-end gap-1'}>
            <button
              onClick={() => {
                if (paginate.page === 0) return
                setPaginate({
                  ...paginate,
                  page: paginate.page - 1,
                })
              }}
              className={transformCls([
                'border px-3 py-1 rounded-lg',
                paginate.page === 0
                  ? 'bg-slate-50 cursor-not-allowed'
                  : 'hover:bg-slate-100',
              ])}
            >
              Trang trước
            </button>
            <button
              onClick={() => {
                if (
                  minhChungFiltered.length <
                  (paginate.page + 1) * paginate.limit
                )
                  return

                setPaginate({
                  ...paginate,
                  page: paginate.page + 1,
                })
              }}
              className={transformCls([
                'border px-3 py-1 rounded-lg',
                minhChungFiltered.length < (paginate.page + 1) * paginate.limit
                  ? 'bg-slate-50 cursor-not-allowed'
                  : 'hover:bg-slate-100',
              ])}
            >
              Trang sau
            </button>
          </div>
        </div>

        <Table
          data={minhChungPaginated}
          modelValue={minhChungSelected}
          onUpdateModelValue={(val) => setMinhChungSelected([val.pop()])}
        >
          <TableColumn checkable />
          <TableColumn label={'Mã minh chứng'} prop={'KT_KDCL_TaiLieu_Ma'} />
          <TableColumn label={'Tên minh chứng'} prop={'KT_KDCL_TaiLieu_Ten'} />
          <TableColumn
            label={'Số, ngày ban hành, thời điểm khảo sát điều tra...'}
          >
            {(row) => (
              <div>
                {row.KT_KDCL_TaiLieu_SoBanHanh} -{' '}
                {dayjs(row.KT_KDCL_TaiLieu_NgayBanHanh).format('DD/MM/YYYY')}
              </div>
            )}
          </TableColumn>
        </Table>
      </Dialog>

      <DialogTrichDanMinhChung
        isOpen={isOpenDialogTrichDan}
        setIsOpen={setIsOpenDialogTrichDan}
        handleSubmit={handleSubmit}
      />
    </>
  )
}

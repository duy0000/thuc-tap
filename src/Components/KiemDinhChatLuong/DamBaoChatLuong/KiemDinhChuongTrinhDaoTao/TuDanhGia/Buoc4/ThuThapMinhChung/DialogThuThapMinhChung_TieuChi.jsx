import { useMemo, useState } from 'react'
import Button from '@/Components/Base/Button/Button.jsx'
import { Checkbox } from '@/Components/Base/Checkbox/index.js'
import Dialog from '@/Components/Base/Dialog/Dialog.jsx'
import { useMinhChungStore } from '@/Services/Store/Module/KiemDinhChatLuong/minhChung.js'
import { dayjs, transformCls } from '@/Services/Utils/index.js'
import Icon from '@/Components/Base/Icon/Icon.jsx'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { useThuThapMinhChungTieuChiStore } from '@/Services/Store/index.js'
import { isNil } from 'lodash-unified'
import Swal from 'sweetalert2'
import { MinhChungType } from '@/Services/Tokens/KDCL/CTDT/minhChung.js'

export default function DialogThuThapMinhChung_TieuChi({
  isOpen,
  setIsOpen,
  hanldePostThuThapMinhChung,
  IDThuThapMinhChung,
  isPosting,
}) {
  const { listMinhChung } = useMinhChungStore()
  const { listThuThapMinhChungTieuChi } = useThuThapMinhChungTieuChiStore()

  const PAGE_SIZE = 10
  const [currentPage, setCurrentPage] = useState(0)

  const [IDMinhChungSelected, setIDMinhChungSelected] = useState(null)
  const [search, setSearch] = useState('')

  const listMinhChungFilterd = useMemo(() => {
    return listMinhChung.filter(
      (mc) =>
        mc.KT_KDCL_TaiLieu_Type == MinhChungType.Public &&
        !listThuThapMinhChungTieuChi.find(
          (e) =>
            mc.KT_KDCL_TaiLieu_ID ===
              e.KT_KDCL_CTDT_ThuThapMinhChung_ChiTiet_IDMinhChung &&
            e.KT_KDCL_CTDT_ThuThapMinhChung_ChiTiet_IDThuThapMinhChung ===
              IDThuThapMinhChung,
        ) &&
        (mc.KT_KDCL_TaiLieu_Ma.toLowerCase().includes(search.toLowerCase()) ||
          mc.KT_KDCL_TaiLieu_Ten.toLowerCase().includes(search.toLowerCase())),
    )
  }, [search, listMinhChung, listThuThapMinhChungTieuChi])

  const listMinhChungPaginated = useMemo(() => {
    return listMinhChungFilterd.slice(
      currentPage * PAGE_SIZE,
      (currentPage + 1) * PAGE_SIZE,
    )
  }, [listMinhChungFilterd, currentPage])

  const totalPages = Math.ceil(listMinhChungFilterd.length / PAGE_SIZE)

  return (
    <Dialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      notClose={isPosting}
      preventClose={isPosting}
      header={
        <h3 className="text-base text-uneti-primary font-medium">
          Danh sách minh chứng dùng chung
        </h3>
      }
      footer={
        <div className="flex items-center gap-2 justify-end">
          <Button
            color="danger"
            disabled={isPosting}
            onClick={() => setIsOpen(false)}
          >
            Hủy
          </Button>
          <Button
            onClick={async () => {
              if (isNil(IDMinhChungSelected)) {
                Swal.fire({
                  title: 'Thông báo',
                  icon: 'warning',
                  text: 'Vui lòng chọn minh chứng cần thêm',
                })
                return
              }
              await hanldePostThuThapMinhChung(IDMinhChungSelected)
              setIDMinhChungSelected(null)
            }}
            disabled={isPosting || isNil(IDMinhChungSelected)}
            isLoading={isPosting}
          >
            Cập nhật
          </Button>
        </div>
      }
    >
      <div className="my-2 flex items-center justify-between">
        <input
          className="base-input w-[240px]"
          placeholder="Tìm kiếm theo tên minh chứng..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        {totalPages > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-gray-200 rounded h-6 px-2">
              Trang {currentPage + 1} / {totalPages}
            </div>

            {totalPages > 1 && (
              <>
                <button
                  onClick={() => {
                    if (currentPage > 0) setCurrentPage(currentPage - 1)
                  }}
                  className={transformCls([
                    'icon-btn',
                    currentPage == 0 && 'disabled bg-gray-50',
                  ])}
                >
                  <Icon>
                    <BiChevronLeft />
                  </Icon>
                </button>
                <button
                  onClick={() => {
                    if (currentPage < totalPages - 1)
                      setCurrentPage(currentPage + 1)
                  }}
                  className={transformCls([
                    'icon-btn',
                    currentPage == totalPages - 1 && 'disabled bg-gray-50',
                  ])}
                >
                  <Icon>
                    <BiChevronRight />
                  </Icon>
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="uneti-u-table">
          <thead>
            <tr>
              <th style={{ width: 60 }}>Chọn</th>
              <th>
                <p className="min-w-[160px]">Tên minh chứng</p>
              </th>
              <th>
                <p className="min-w-[160px]">
                  Số, ngày ban hành, thời điểm khảo sát điều tra...
                </p>
              </th>
              <th>
                <p className="min-w-[120px]">Nơi ban hành</p>
              </th>
            </tr>
          </thead>

          <tbody>
            {!listMinhChung.length &&
              (search ? (
                <tr>
                  <td colSpan={5}>Không tìm thấy minh chứng</td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={5}>Không có dữ liệu</td>
                </tr>
              ))}

            {listMinhChungPaginated.map((e, i) => (
              <tr
                key={i}
                onClick={() => setIDMinhChungSelected(e.KT_KDCL_TaiLieu_ID)}
              >
                <td>
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={e.KT_KDCL_TaiLieu_ID === IDMinhChungSelected}
                      onChange={(ID) => setIDMinhChungSelected(ID)}
                    />
                  </div>
                </td>
                <td>{e.KT_KDCL_TaiLieu_Ten}</td>
                <td>
                  {e.KT_KDCL_TaiLieu_SoBanHanh} -{' '}
                  {dayjs(e.KT_KDCL_TaiLieu_NgayBanHanh).format('DD/MM/YYYY')}
                </td>
                <td>{e.KT_KDCL_TaiLieu_NoiBanHanh}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <p className="mt-4 mb-3 text-slate-600 ml-3">
          Tổng cộng: {listMinhChungFilterd.length} minh chứng
        </p>
        <p className="hidden md:block text-xs text-slate-500">
          * Lựa chọn minh chứng từ danh sách minh chứng dùng chung
        </p>
      </div>
    </Dialog>
  )
}

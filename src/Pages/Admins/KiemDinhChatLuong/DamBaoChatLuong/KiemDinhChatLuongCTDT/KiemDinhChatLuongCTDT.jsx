import { useEffect, useMemo, useState } from 'react'
import { BsEye } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import TablePagination from '@mui/material/TablePagination'

import { deleteHoSoKiemDinh } from '@/Apis/KDCL'
import { useNamespace } from '@/Services/Hooks'
import {
  useBoTieuChuanStore,
  useChuongTrinhDaoTaoStore,
  useHoSoKiemDinhStore,
} from '@/Services/Store'

import { retries, transformCls } from '@/Services/Utils'
import Icon from '@/Components/Base/Icon/Icon'
import { Brush } from '@/Components/Base/Icons/Brush'
import { Trash } from '@/Components/Base/Icons/Trash'
import CreateUpdateHoSoKiemDinh from '@/Components/KiemDinhChatLuong/DamBaoChatLuong/KiemDinhChuongTrinhDaoTao/CreateUpdateHoSoKiemDinh'

import './KiemDinhChatLuongCTDT.scss'
import Button from '@/Components/Base/Button/Button'
import { Select } from '@/Components/Base'

export default function KiemDinhChatLuongCTDT() {
  const ns = useNamespace('kdcl-ctdt')
  const nsLayoutKDCL = useNamespace('kiem-dinh-chat-luong')

  const navigate = useNavigate()

  const [hoSoUpdating, setHoSoUpdating] = useState(null)
  const [isOpenFormHoSo, setIsOpenFormHoSo] = useState(false)

  const [paginate, setPaginate] = useState({
    page: 0,
    limit: 10,
  })

  const [filters, setFilters] = useState({
    trangThai: '0',
    tenKhoa: '',
    tenNganh: '',
  })

  const { listBoTieuChuan } = useBoTieuChuanStore()
  const { listChuongTrinhDaoTao } = useChuongTrinhDaoTaoStore()
  const { listHoSoKiemDinh, refetch: refetchListHoSoKiemDinh } =
    useHoSoKiemDinhStore()

  const hoSoKiemDinhMapped = useMemo(() => {
    return listHoSoKiemDinh.map((e) => ({
      ...e,
      ...listBoTieuChuan.find(
        (btc) =>
          btc.KT_KDCL_BoTieuChuan_ID ==
          e.KT_KDCL_CTDT_HoSoKiemDinh_IDBoTieuChuan,
      ),
    }))
  }, [listHoSoKiemDinh, listChuongTrinhDaoTao, listBoTieuChuan])

  const listHoSoFiltered = useMemo(() => {
    return hoSoKiemDinhMapped.filter((hoSo) => {
      const isMatchedTrangThai =
        filters.trangThai === '0' ||
        hoSo.KT_KDCL_CTDT_HoSoKiemDinh_TrangThai === filters.trangThai

      const isMatchedTenKhoa =
        !filters.tenKhoa ||
        (hoSo.KT_KDCL_CTDT_HoSoKiemDinh_TenKhoa &&
          hoSo.KT_KDCL_CTDT_HoSoKiemDinh_TenKhoa.toLowerCase().includes(
            filters.tenKhoa.toLowerCase(),
          ))

      const isMatchedTenNganh =
        !filters.tenNganh ||
        (hoSo.KT_KDCL_CTDT_HoSoKiemDinh_TenNganh &&
          hoSo.KT_KDCL_CTDT_HoSoKiemDinh_TenNganh.toLowerCase().includes(
            filters.tenNganh.toLowerCase(),
          ))

      return isMatchedTrangThai && isMatchedTenKhoa && isMatchedTenNganh
    })
  }, [hoSoKiemDinhMapped, filters])

  // paginate filtered
  const listHoSoPaginateFiltered = useMemo(() => {
    return listHoSoFiltered.slice(
      paginate.page * paginate.limit,
      (paginate.page + 1) * paginate.limit,
    )
  }, [listHoSoFiltered, paginate])

  // watch filter change, set page to 1 if out of range
  useEffect(() => {
    if (paginate.page > Math.ceil(listHoSoFiltered.length / paginate.limit)) {
      setPaginate({ ...paginate, page: 0 })
    }
  }, [filters])

  const handleDeleteHoSo = async (hoSo) => {
    const action = await Swal.fire({
      title: 'Bạn chắc chắn muốn gửi yêu cầu xóa hồ sơ này?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Gửi',
      denyButtonText: `Hủy`,
    })

    if (action.isConfirmed) {
      return retries(async () => {
        await deleteHoSoKiemDinh(`${hoSo.KT_KDCL_CTDT_HoSoKiemDinh_ID}`)
        await refetchListHoSoKiemDinh()
      })
    }
  }

  const openUpdateHoSo = (hoSo) => {
    setIsOpenFormHoSo(true)
    setHoSoUpdating(hoSo)
  }

  return (
    <div className={`${ns.b()} box`}>
      {/* header */}
      <div className={nsLayoutKDCL.e('header')}>
        <h3 className={nsLayoutKDCL.em('header', 'title')}>
          Kiểm định chương trình đào tạo
        </h3>

        <div className={ns.e('actions')}>
          <Button onClick={() => setIsOpenFormHoSo(true)}>Thêm mới</Button>
        </div>
      </div>

      {/* divider */}
      <div className="uneti-divider" />

      {/* table */}
      <div className={ns.e('main')}>
        <div className="mt-5">
          <div
            className={transformCls([
              ns.e('table-header'),
              'mb-3 flex flex-col md:flex-row',
            ])}
          >
            <h3 className={ns.em('table-header', 'title')}>
              Danh sách hồ sơ đánh giá và kiểm định chất lượng chương trình đào
              tạo
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="uneti-u-table">
              <thead>
                <tr>
                  <th rowSpan={2} className="min-w-[60px]">
                    STT
                  </th>
                  <th colSpan={2}>Chương trình kiểm định</th>
                  <th rowSpan={2} className="min-w-[140px]">
                    Bậc đào tạo
                  </th>
                  <th rowSpan={2} className="min-w-[100px]">
                    Bộ tiêu chuẩn
                  </th>
                  <th colSpan={3}>Kết quả</th>
                  <th rowSpan={2} className="min-w-[80px]">
                    Trạng thái
                  </th>
                  <th rowSpan={2}>Tác vụ</th>
                </tr>
                <tr>
                  <th className="min-w-[120px]">Đơn vị</th>
                  <th className="min-w-[120px]">Tên ngành</th>
                  <th className="min-w-[120px]">Kết quả TĐG</th>
                  <th className="min-w-[120px]">Kết quả ĐGN</th>
                  <th className="min-w-[150px]">Kết quả chính thức</th>
                </tr>

                <tr>
                  <th></th>
                  <th>
                    <Select
                      label="Tìm theo khoa"
                      modelValue={filters.tenKhoa}
                      onChange={(value) => {
                        setFilters({ ...filters, tenKhoa: value })
                      }}
                      triggerClass="font-normal text-vs-text"
                      popperClass="font-normal text-vs-text"
                      data={listChuongTrinhDaoTao.map((e) => e.TenKhoa)}
                    />
                  </th>
                  <th>
                    <input
                      placeholder="Tìm theo ngành"
                      className="base-input font-normal text-vs-text"
                      value={filters.tenNganh}
                      onChange={(event) =>
                        setFilters({ ...filters, tenNganh: event.target.value })
                      }
                    />
                  </th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>
                    <Select
                      modelValue={filters.trangThai}
                      onChange={(value) =>
                        setFilters({ ...filters, trangThai: value })
                      }
                      label="Trạng thái"
                      triggerClass="font-normal text-vs-text"
                      popperClass="font-normal text-vs-text"
                      data={[
                        {
                          label: 'Tất cả',
                          value: '0',
                        },
                        {
                          label: 'Đã hoàn thành',
                          value: '1',
                        },
                        {
                          label: 'Đang thực hiện',
                          value: '2',
                        },
                      ]}
                      labelKey="label"
                      valueKey="value"
                      valueOnClear="0"
                    />
                  </th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {listHoSoFiltered.length === 0 && (
                  <tr>
                    <td colSpan={9} className="text-center py-3 text-[15px]">
                      Không có dữ liệu
                    </td>
                  </tr>
                )}
                {listHoSoPaginateFiltered.map((hoSo, index) => (
                  <tr
                    key={index}
                    className="cursor-pointer"
                    onClick={() => {
                      navigate(
                        `/dam-bao-chat-luong/chat-luong-ctdt/${hoSo.KT_KDCL_CTDT_HoSoKiemDinh_ID}/tu-danh-gia/buoc-1`,
                      )
                    }}
                  >
                    <td className="text-center">{index + 1}</td>
                    <td>{hoSo.KT_KDCL_CTDT_HoSoKiemDinh_TenKhoa}</td>
                    <td>{hoSo.KT_KDCL_CTDT_HoSoKiemDinh_TenNganh}</td>
                    <td>{hoSo.KT_KDCL_CTDT_HoSoKiemDinh_TenHeDaoTao}</td>
                    <td>{hoSo.KT_KDCL_BoTieuChuan_Ten}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <div className="flex items-center justify-center gap-[3px] md:gap-2">
                        <Link
                          className="icon-btn"
                          to={`/dam-bao-chat-luong/chat-luong-ctdt/${hoSo.KT_KDCL_CTDT_HoSoKiemDinh_ID}/tu-danh-gia/buoc-1`}
                        >
                          <Icon>
                            <BsEye />
                          </Icon>
                        </Link>
                        <button
                          className="icon-btn"
                          onClick={(e) => {
                            e.stopPropagation()
                            openUpdateHoSo(hoSo)
                          }}
                        >
                          <Icon>
                            <Brush />
                          </Icon>
                        </button>
                        <button
                          className="icon-btn"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteHoSo(hoSo)
                          }}
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
            count={listHoSoFiltered.length || 0}
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
      </div>

      <CreateUpdateHoSoKiemDinh
        hoSoUpdating={hoSoUpdating}
        isOpen={isOpenFormHoSo}
        setIsOpen={setIsOpenFormHoSo}
        onUpdated={() => {
          refetchListHoSoKiemDinh()
          setHoSoUpdating({})
        }}
        onClosed={() => {
          setHoSoUpdating({})
        }}
      />
    </div>
  )
}

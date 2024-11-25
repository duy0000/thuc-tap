import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useQuery } from '@tanstack/react-query'

import { Table, TableColumn } from '@/Components/Base'
import Button from '@/Components/Base/Button/Button'
import Dialog from '@/Components/Base/Dialog/Dialog'
import { getAllCanBoChuChot } from '@/Apis/KDCL/CSDLDonVi/apiCanBoChuChot'
import { cloneDeep } from 'lodash-unified'
import { ShortHocHamHocVi } from '@/Services/Static/Common/HocHamHocVi'

export default function DialogChonThanhPhanHoiDong({
  isOpenDialog,
  setIsOpenDialog,
  onSubmit,
}) {
  const [search, setSearch] = useState('')

  const [danhSachThanhVienChutChot, setDanhSachThanhVienChuChot] = useState([])

  const {
    data: listThanhVienChutChot = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['DANH_SACH_THANH_VIEN_CHU_CHOT_SEARCH', search],
    queryFn: async () => {
      const res = await getAllCanBoChuChot({
        SoTrang: 1,
        SoBanGhiTrenTrang: 10,
        MaNhanSu: search,
      })

      return res.data.body
    },
    enabled: false,
  })

  let searchTimeout = null
  useEffect(() => {
    clearTimeout(searchTimeout)

    searchTimeout = setTimeout(() => {
      refetch()
    }, 500)

    return () => clearTimeout(searchTimeout)
  }, [search])

  const handleSubmit = () => {
    if (danhSachThanhVienChutChot.length === 0) {
      Swal.fire({
        title: 'Thông báo',
        text: 'Vui lòng chọn một nhân sự',
        icon: 'warning',
      })
      return
    }

    const thanhVienChuChot = cloneDeep(danhSachThanhVienChutChot[0])

    thanhVienChuChot.KT_KDCL_CanBoChuChot_ChucVu =
      thanhVienChuChot.KT_KDCL_CanBoChuChot_ChucVu?.split('\n').join(';') || ''

    onSubmit(thanhVienChuChot)
    setIsOpenDialog(false)
  }

  useEffect(() => {
    return () => {
      setSearch('')
      setDanhSachThanhVienChuChot([])
      clearTimeout(searchTimeout)
    }
  }, [])

  return (
    <Dialog
      isOpen={isOpenDialog}
      setIsOpen={setIsOpenDialog}
      preventClose
      footer={
        <div className="flex justify-end items-center gap-2">
          <Button color="danger" onClick={() => setIsOpenDialog(false)}>
            Huỷ
          </Button>
          <Button onClick={handleSubmit}>Xác nhận</Button>
        </div>
      }
    >
      <div className="flex justify-between">
        <div className="flex flex-col mb-2">
          <label htmlFor="TP_HD_Searchable" className="pl-2">
            Tìm nhân sự (Danh sách cán bộ thành viên)
          </label>
          <input
            id="TP_HD_Searchable"
            className="base-input w-full border focus:!border-uneti-primary"
            placeholder="Tìm theo mã nhân sự"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table
          data={listThanhVienChutChot}
          modelValue={danhSachThanhVienChutChot}
          onUpdateModelValue={(value) => {
            setDanhSachThanhVienChuChot([value.at(-1)])
          }}
          loading={isLoading}
          maxHeight={450}
        >
          <TableColumn checkable />
          <TableColumn
            minWidth={90}
            label="Mã nhân sự"
            prop="KT_KDCL_CanBoChuChot_MaNhanSu"
          />
          <TableColumn minWidth={120} label="Tên nhân sự">
            {(row) => {
              return (
                <p>
                  {ShortHocHamHocVi[row.KT_KDCL_CanBoChuChot_HocHamHocVi]}{' '}
                  {row.KT_KDCL_CanBoChuChot_HoDem}{' '}
                  {row.KT_KDCL_CanBoChuChot_Ten}
                </p>
              )
            }}
          </TableColumn>
          <TableColumn minWidth={110} label="Chức vụ">
            {(row) => row.KT_KDCL_CanBoChuChot_ChucVu?.split('\n').join(', ')}
          </TableColumn>
        </Table>
      </div>
    </Dialog>
  )
}

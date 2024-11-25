import {
  getAllCanBoChuChot,
  getTongSoTrangCanBoChuChot,
} from '@/Apis/KDCL/CSDLDonVi/apiCanBoChuChot'
import { Select, Table, TableColumn } from '@/Components/Base'
import Icon from '@/Components/Base/Icon/Icon'
import { retries } from '@/Services/Utils/requestUtils'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
} from 'react-icons/bi'
import Button from '@/Components/Base/Button/Button'
import { ShortHocHamHocVi } from '@/Services/Static/Common/HocHamHocVi'

export default function DanhSachCanBoChuChot() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [totalPage, setTotalPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const [danhSachCanBoChuChot, setDanhSachCanBoChuChot] = useState([])

  const loadTableData = async () => {
    setIsLoading(true)
    retries(async () => {
      const res = await getAllCanBoChuChot({
        SoTrang: currentPage,
        SoBanGhiTrenTrang: itemsPerPage,
      })
      const data = await res?.data?.body
      setDanhSachCanBoChuChot(
        data.map((e) => ({
          MaNhanSu: e.KT_KDCL_CanBoChuChot_MaNhanSu,
          HoTen: `${e.KT_KDCL_CanBoChuChot_HoDem} ${e.KT_KDCL_CanBoChuChot_Ten}`,
          ChucVu:
            e.KT_KDCL_CanBoChuChot_ChucVu == null ||
            e.KT_KDCL_CanBoChuChot_ChucVu == ''
              ? ''
              : e.KT_KDCL_CanBoChuChot_ChucVu.split('\n').join('<br />'),
          DonVi:
            e.KT_KDCL_CanBoChuChot_DonVi == null ||
            e.KT_KDCL_CanBoChuChot_DonVi == ''
              ? ''
              : e.KT_KDCL_CanBoChuChot_DonVi.split('\n').join('<br />'),
          Email: e.KT_KDCL_CanBoChuChot_Email,
          SoDienThoai: e.KT_KDCL_CanBoChuChot_DienThoai,
          HocHamHocVi: e.KT_KDCL_CanBoChuChot_HocHamHocVi,
        })),
      )
      setIsLoading(false)
    }).catch(console.log)
  }

  const loadTongSoTrang = async () => {
    setIsLoading(true)
    retries(async () => {
      const res = await getTongSoTrangCanBoChuChot({
        SoBanGhiTrenTrang: itemsPerPage,
        SoTrang: currentPage,
      })
      const data = res?.data
      setTotalPage(data.TotalPage)
      setIsLoading(false)
    }).catch(console.log)
  }

  useEffect(() => {
    loadTableData()
    loadTongSoTrang()
  }, [])

  useEffect(() => {
    setCurrentPage(1)
    loadTableData()
    loadTongSoTrang()
  }, [itemsPerPage])

  useEffect(() => {
    loadTongSoTrang()
    loadTableData()
  }, [currentPage])

  const handleChangeItemsPerPage = (val) => {
    setItemsPerPage(val)
  }

  const handleChangePage = (to) => {
    if (to < 1 || to > totalPage) return
    setCurrentPage(to)
  }

  const [listItemsPerPage] = useState([
    {
      label: '10 / Table',
      value: 10,
    },
    {
      label: '20 / Table',
      value: 20,
    },
    {
      label: '50 / Table',
      value: 50,
    },
    {
      label: '100 / Table',
      value: 100,
    },
  ])

  return (
    <div className="box">
      <div className="flex justify-between items-center">
        <Link to="/csdl-don-vi/tong-quan">
          <Button type="border">Quay lại</Button>
        </Link>

        <h3>
          Danh sách thành viên -{' '}
          <span className="font-semibold">
            Trường Đại học Kinh tế - Kỹ thuật Công nghiệp
          </span>
        </h3>
      </div>

      <div className="uneti-divider" />

      <div className=" my-4">
        <div className="w-full md:w-auto flex-1 flex justify-end items-end gap-2 my-2 flex-col sm:flex-row">
          <div className="flex justify-end items-center gap-2 z-[5]">
            <Select
              clearable={false}
              modelValue={itemsPerPage}
              onChange={(val) => handleChangeItemsPerPage(val)}
              data={listItemsPerPage}
              valueKey="value"
              labelKey="label"
              filterable={false}
              triggerClass="!w-[130px]"
            />
            <div className="w-[100px] text-center">
              Trang {`${currentPage} / ${totalPage}`}
            </div>
          </div>
          <div className="flex justify-center items-center gap-2">
            <button
              disabled={currentPage == 1}
              className={`${currentPage == 1 ? `opacity-50` : `hover:bg-slate-200`} border-2 border-slate-300 flex justify-center items-center p-2 rounded-md transition-all duration-200`}
              onClick={() => handleChangePage(1)}
            >
              <Icon>
                <BiChevronsLeft />
              </Icon>
            </button>
            <button
              disabled={currentPage == 1}
              className={`${currentPage == 1 ? `opacity-50` : `hover:bg-slate-200`} border-2 border-slate-300 flex justify-center items-center p-2 rounded-md transition-all duration-200`}
              onClick={() => handleChangePage(currentPage - 1)}
            >
              <Icon>
                <BiChevronLeft />
              </Icon>
            </button>
            <button
              disabled={currentPage == totalPage}
              className={`${currentPage == totalPage ? `opacity-50` : `hover:bg-slate-200`} border-2 border-slate-300 flex justify-center items-center p-2 rounded-md transition-all duration-200`}
              onClick={() => handleChangePage(currentPage + 1)}
            >
              <Icon>
                <BiChevronRight />
              </Icon>
            </button>
            <button
              disabled={currentPage == totalPage}
              className={`${currentPage == totalPage ? `opacity-50` : `hover:bg-slate-200`} border-2 border-slate-300 flex justify-center items-center p-2 rounded-md transition-all duration-200`}
              onClick={() => handleChangePage(totalPage)}
            >
              <Icon>
                <BiChevronsRight />
              </Icon>
            </button>
          </div>
        </div>
        <Table loading={isLoading} data={danhSachCanBoChuChot} maxHeight={600}>
          <TableColumn
            label="Mã nhân sự"
            prop="MaNhanSu"
            minWidth={100}
            fixed
            align="center"
          />
          <TableColumn label="Họ tên" minWidth={100}>
            {(row) => {
              return (
                <div>
                  {ShortHocHamHocVi[row.HocHamHocVi]
                    ? ShortHocHamHocVi[row.HocHamHocVi] + '. '
                    : ''}{' '}
                  {row.HoTen}
                </div>
              )
            }}
          </TableColumn>
          <TableColumn label="Chức vụ" minWidth={100}>
            {(item) => {
              return (
                <div dangerouslySetInnerHTML={{ __html: item.ChucVu }}></div>
              )
            }}
          </TableColumn>
          <TableColumn label="Đơn vị" minWidth={100}>
            {(item) => {
              return (
                <div dangerouslySetInnerHTML={{ __html: item.DonVi }}></div>
              )
            }}
          </TableColumn>
          <TableColumn label="Email" prop="Email" minWidth={100} />
          <TableColumn
            label="Số điện thoại"
            prop="SoDienThoai"
            minWidth={100}
          />
        </Table>
      </div>
    </div>
  )
}

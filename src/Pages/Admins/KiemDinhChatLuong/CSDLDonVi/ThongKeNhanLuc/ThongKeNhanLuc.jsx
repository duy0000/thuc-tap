import { useEffect, useState } from 'react'
import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
} from 'react-icons/bi'
import { Link } from 'react-router-dom'

import { getDanhSachNhanLucWithPaginate } from '@/Apis/KDCL/CSDLDonVi/apiCanBo'
import { Select, Table, TableColumn } from '@/Components/Base'
import Icon from '@/Components/Base/Icon/Icon'
import AdvanceSearch from '@/Components/KiemDinhChatLuong/AdvanceSearch'
import { useNamespace } from '@/Services/Hooks'
import { retries } from '@/Services/Utils/requestUtils'
import { dayjs } from '@/Services/Utils/dayjs'
import Tag from '@/Components/Base/Tag/Tag'
import { getHocHamHocVi } from '@/Apis/KDCL/CSDLDonVi/apiHocHamHocVi'
import Button from '@/Components/Base/Button/Button'

export default function ThongKeNhanLuc() {
  const ns = useNamespace('kiem-dinh-chat-luong')
  const [gioiTinh] = useState(['Nam', 'Nữ'])
  const [isLoadingTableData, setIsLoadingTableData] = useState(false)
  const [totalPage, setTotalPage] = useState(0)
  const [pageSizes] = useState([
    {
      value: 10,
      label: '10 / Table',
    },
    {
      value: 20,
      label: '20 / Table',
    },
    {
      value: 50,
      label: '50 / Table',
    },
    {
      value: 100,
      label: '100 / Table',
    },
  ])
  const [hocHamHocVi, setHocHamHocVi] = useState([])
  const [danhSachNhanLuc, setDanhSachNhanLuc] = useState([])
  const [filters, setFilters] = useState({
    HoTen: '',
    HocHam: '',
    GioiTinh: '',
    DoTuoi: '',
    SoTrang: 1,
    SoBanGhiTrenTrang: 10,
  })

  const loadTableData = async () => {
    retries(async () => {
      setIsLoadingTableData(true)
      const res = await getDanhSachNhanLucWithPaginate(filters)
      setDanhSachNhanLuc(res.data.ListNhanLuc)
      setTotalPage(res.data.TotalPage)
    })
      .catch(console.log)
      .finally(() => {
        setIsLoadingTableData(false)
      })
  }

  const loadHocHamHocVi = async () => {
    retries(async () => {
      const res = await getHocHamHocVi()
      setHocHamHocVi(res.data.body)
    }).catch(console.log)
  }

  useEffect(() => {
    loadTableData()
  }, [filters.SoBanGhiTrenTrang, filters.SoTrang])

  useEffect(() => {
    loadTableData()
    loadHocHamHocVi()
  }, [])

  return (
    <div className="box">
      <div className="flex justify-between items-center">
        <Link to="/csdl-don-vi/tong-quan">
          <Button type="border">Quay lại</Button>
        </Link>

        <h3>
          Thống kê nhân lực -{' '}
          <span className="font-semibold">
            Trường Đại học Kinh tế - Kỹ thuật Công nghiệp
          </span>
        </h3>
      </div>

      <div className="uneti-divider" />

      <div className="my-4">
        <div className="flex items-center justify-between mb-3 relative z-[3]">
          <h3 className="uppercase font-semibold line-clamp-1">
            Danh sách các bộ giảng viên / nhân viên
          </h3>

          <div className={ns.e('actions')}>
            <AdvanceSearch
              search={filters.HoTen}
              setSearch={(val) =>
                setFilters((p) => ({
                  ...p,
                  HoTen: val,
                }))
              }
              onSearch={loadTableData}
            >
              <div className="flex flex-col gap-2 py-3 px-1">
                <div className="flex items-center gap-2">
                  <p className="w-[80px]"> Giới tính: </p>
                  <Select
                    label="Chọn giới tính"
                    modelValue={filters.GioiTinh}
                    onChange={(val) =>
                      setFilters((p) => ({
                        ...p,
                        GioiTinh: val,
                      }))
                    }
                    data={gioiTinh}
                    filterable={false}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <p className="w-[80px]"> Học hàm học vị: </p>
                  <Select
                    modelValue={filters.HocHam}
                    onChange={(val) =>
                      setFilters((p) => ({
                        ...p,
                        HocHam: val,
                      }))
                    }
                    data={hocHamHocVi}
                    valueKey="HocHamHocVi"
                    labelKey="HocHamHocVi"
                    label="Chọn học hàm"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <p className="w-[80px]"> Độ tuổi: </p>
                  <input
                    type="number"
                    className="flex-1 px-2 py-1 outline-none border border-solid border-gray-300 rounded-lg h-[32x]"
                    value={filters.DoTuoi}
                    onInput={(e) => {
                      setFilters((p) => ({
                        ...p,
                        DoTuoi: e.target.value,
                      }))
                    }}
                  />
                </div>
              </div>
            </AdvanceSearch>

            <button className="base-button bg-uneti-primary-lighter whitespace-nowrap">
              Xuất file
            </button>
          </div>
        </div>

        <div className="flex gap-2 my-2 relative z-[2]">
          <div className="flex items-center gap-2 my-2">
            {filters.HoTen && <Tag>Họ tên: {filters.HoTen}</Tag>}
            {filters.GioiTinh && <Tag>Giới tính: {filters.GioiTinh}</Tag>}
            {filters.HocHam && <Tag>Học hàm: {filters.HocHam}</Tag>}
            {filters.DoTuoi && <Tag>Tuổi: {filters.DoTuoi}</Tag>}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Select
              clearable={false}
              filterable={false}
              defaultFirstOption
              data={pageSizes}
              modelValue={filters.SoBanGhiTrenTrang}
              onChange={(pageSize) => {
                setFilters((p) => ({
                  ...p,
                  SoBanGhiTrenTrang: pageSize,
                }))
              }}
              valueKey="value"
              labelKey="label"
              triggerClass="z-[2] relative !w-[130px]"
            />

            <span>
              Trang {filters.SoTrang} / {totalPage}
            </span>

            <button
              className="icon-btn"
              disabled={filters.SoTrang === 1}
              onClick={() =>
                setFilters((p) => ({
                  ...p,
                  SoTrang: 1,
                }))
              }
            >
              <Icon>
                <BiChevronsLeft />
              </Icon>
            </button>
            <button
              className="icon-btn"
              disabled={filters.SoTrang === 1}
              onClick={() =>
                setFilters((p) => ({
                  ...p,
                  SoTrang: p.SoTrang - 1 < 1 ? 1 : p.SoTrang - 1,
                }))
              }
            >
              <Icon>
                <BiChevronLeft />
              </Icon>
            </button>
            <button
              className="icon-btn"
              disabled={filters.SoTrang === totalPage}
              onClick={() =>
                setFilters((p) => ({
                  ...p,
                  SoTrang:
                    p.SoTrang + 1 > totalPage ? totalPage : p.SoTrang + 1,
                }))
              }
            >
              <Icon>
                <BiChevronRight />
              </Icon>
            </button>
            <button
              className="icon-btn"
              disabled={filters.SoTrang === totalPage}
              onClick={() =>
                setFilters((p) => ({
                  ...p,
                  SoTrang: totalPage,
                }))
              }
            >
              <Icon>
                <BiChevronsRight />
              </Icon>
            </button>
          </div>
        </div>

        <Table
          data={danhSachNhanLuc}
          maxHeight={600}
          loading={isLoadingTableData}
        >
          <TableColumn
            label="Mã nhân sự"
            prop="MaNhanSu"
            minWidth={100}
            fixed
            align="center"
          />
          <TableColumn label="Họ tên" prop="HoTen" minWidth={100} />
          <TableColumn label="Giới tính" prop="GioiTinh" minWidth={60} />
          <TableColumn label="Ngày sinh" prop="NgaySinh" minWidth={100}>
            {(row) => dayjs(row.NgaySinh).format('DD/MM/YYYY')}
          </TableColumn>
          <TableColumn label="Tuổi" prop="Tuoi" minWidth={40} align />
          <TableColumn
            label="Số điện thoại"
            prop="SoDienThoai"
            minWidth={100}
          />
          <TableColumn
            label="Học hàm học vị"
            prop="HocHamHocVi"
            minWidth={120}
          />
          <TableColumn label="Chức danh" prop="TenChucDanh" minWidth={100} />
          <TableColumn label="Chức vụ" prop="TenChucVu" minWidth={100} />
          <TableColumn label="Phòng ban" prop="TenPhongBan" minWidth={100} />
        </Table>
      </div>
    </div>
  )
}

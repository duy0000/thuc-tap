import { useEffect, useMemo, useState } from 'react'
import { Pagination, Tooltip } from '@mui/material'
import {
  BiChevronDown,
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
} from 'react-icons/bi'
import { Link } from 'react-router-dom'

import { Select, Table, TableColumn } from '@/Components/Base'
import Icon from '@/Components/Base/Icon/Icon'
import { RotateLeft } from '@/Components/Base/Icons/RotateLeft'
import AdvanceSearch from '@/Components/KiemDinhChatLuong/AdvanceSearch'
import { useNamespace } from '@/Services/Hooks'
import { transformCls } from '@/Services/Utils/reactUtils'
import { retries } from '@/Services/Utils/requestUtils'
import Tag from '@/Components/Base/Tag/Tag'
import { getNguoiHocWithPaginate } from '@/Apis/KDCL/CSDLDonVi/apiNguoiHoc'
import { transformKeys } from '@/Services/Utils/objectUtils'
import { listCoSo } from '@/Services/Static/dataStatic'
import { getTenKhoaHoc } from '@/Apis/KDCL/CSDLDonVi/apiTenKkhoaHoc'
import { getTenHeDaoTao } from '@/Apis/KDCL/CSDLDonVi/apiTenHeDaoTao'
import { getNganh } from '@/Apis/KDCL/CSDLDonVi/apiNganh'
import { getTenLoaiHinhDaoTao } from '@/Apis/KDCL/CSDLDonVi/apiTenLoaiHinhDaoTao'
import { getTenKhoa } from '@/Apis/KDCL/CSDLDonVi/apiTenKhoa'
import { getTenLop } from '@/Apis/KDCL/CSDLDonVi/apiTenLop'
import { compareStrWithoutSpecialChars } from '@/Services/Utils/stringUtils'

export default function ThongKeNguoiHoc() {
  const ns = useNamespace('kiem-dinh-chat-luong')
  const [isLoadingTableData, setIsLoadingTableData] = useState(false)
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
  const [danhSachNguoiHoc, setDanhSachNguoiHoc] = useState([])
  const [totalPage, setTotalPage] = useState(0)
  const [paginate, setPaginate] = useState({
    SoTrang: 1,
    SoBanGhiTrenTrang: 10,
  })
  const [listTenKhoaHoc, setListTenKhoaHoc] = useState([])
  const [listLop, setListLop] = useState([])
  const [listTenKhoa, setListTenKhoa] = useState([])
  const [listHeDaoTao, setListHeDaoTao] = useState([])
  const [listNganh, setListNganh] = useState([])
  const [listLoaiHinhDT, setListLoaiHinhDT] = useState([])
  const [filters, setFilters] = useState({
    TenCoSo: '',
    TenKhoaHoc: '',
    TenBacDaoTao: '',
    TenLoaiDaoTao: '',
    TenKhoa: '',
    TenNganh: '',
    TenLop: '',
    TenTrangThai: '',
    MaSinhVien: '',
    HoDem: '',
    Ten: '',
    NgaySinh: '',
  })

  const loadTableData = async () => {
    retries(async () => {
      setIsLoadingTableData(true)
      const res = await getNguoiHocWithPaginate({
        ...transformKeys(filters, (key) => 'MC_MaSinhVien_' + key),
        ...paginate,
      })
      setDanhSachNguoiHoc(res.data.ListNguoiHoc)
      setTotalPage(res.data.TotalPage)
    })
      .catch(console.log)
      .finally(() => {
        setIsLoadingTableData(false)
      })
  }

  const callApiWithRetries = (api, action) => {
    return retries(async () => {
      const res = await api()
      action(res.data.body)
    })
  }

  const listNganhShow = useMemo(() => {
    return (
      listNganh.find(
        (item) =>
          compareStrWithoutSpecialChars(filters.TenKhoa, item.TenKhoa) &&
          compareStrWithoutSpecialChars(item.TenHeDaoTao, filters.TenBacDaoTao),
      )?.ChuyenNganh || []
    )
  }, [filters.TenKhoa, filters.TenBacDaoTao])

  useEffect(() => {
    if (filters.TenCoSo) {
      callApiWithRetries(() => getTenKhoa(filters.TenCoSo), setListTenKhoa)
    }
  }, [filters.TenCoSo])

  useEffect(() => {
    if (
      filters.TenKhoa &&
      filters.TenBacDaoTao &&
      filters.TenNganh &&
      filters.TenCoSo &&
      filters.TenKhoaHoc &&
      filters.TenLoaiDaoTao
    ) {
      callApiWithRetries(
        () =>
          getTenLop({
            CoSo: filters.TenCoSo,
            KhoaHoc: filters.TenKhoaHoc,
            HeDaoTao: filters.TenBacDaoTao,
            LoaiHinhDT: filters.TenLoaiDaoTao,
            Nganh: filters.TenNganh,
          }),
        setListLop,
      )
    }
  }, [
    filters.TenKhoa,
    filters.TenBacDaoTao,
    filters.TenNganh,
    filters.TenCoSo,
    filters.TenKhoaHoc,
    filters.TenLoaiDaoTao,
  ])

  useEffect(() => {
    loadTableData()
  }, [paginate])

  useEffect(() => {
    callApiWithRetries(getTenKhoaHoc, setListTenKhoaHoc)
    callApiWithRetries(getTenHeDaoTao, setListHeDaoTao)
    callApiWithRetries(getNganh, setListNganh)
    callApiWithRetries(getTenLoaiHinhDaoTao, setListLoaiHinhDT)
  }, [])

  return (
    <div className="box">
      <div className="flex justify-between items-center">
        <Link to="/csdl-don-vi/tong-quan">
          <button className="base-button bg-uneti-primary">Quay lại</button>
        </Link>
      </div>

      <div className="uneti-divider" />

      <div className="my-4">
        <div className="flex items-center justify-between mb-3 relative z-[3]">
          <h3 className="uppercase font-semibold line-clamp-1">
            Thống kê số lượng người học
          </h3>

          <div className={ns.e('actions')}>
            <AdvanceSearch
              search={filters.Ten}
              setSearch={(val) => {
                setFilters((p) => ({
                  ...p,
                  Ten: val,
                }))
              }}
              onSearch={loadTableData}
            >
              <div className="flex gap-2 px-1 my-3">
                <div className="flex flex-col">
                  <p className="ml-2"> Cơ sở: </p>
                  <Select
                    label="Chọn cơ sở"
                    modelValue={filters.TenCoSo}
                    onChange={(val) =>
                      setFilters((p) => ({
                        ...p,
                        TenCoSo: val,
                      }))
                    }
                    labelKey="title"
                    valueKey="value"
                    data={listCoSo}
                    filterable={false}
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  <p className="ml-2"> Mã sinh viên: </p>
                  <input
                    className="flex-1 px-2 py-1 outline-none border border-solid border-gray-300 rounded-lg h-[32x]"
                    placeholder="Nhập mã sinh viên..."
                    value={filters.MaSinhVien}
                    onInput={(e) => {
                      setFilters((p) => ({
                        ...p,
                        MaSinhVien: e.target.value,
                      }))
                    }}
                  />
                </div>
              </div>

              <div className="flex gap-2 px-1 my-3">
                <div className="flex flex-col">
                  <p className="ml-2"> Tên khóa học: </p>
                  <Select
                    label="Chọn khóa học"
                    modelValue={filters.TenKhoaHoc}
                    onChange={(val) =>
                      setFilters((p) => ({
                        ...p,
                        TenKhoaHoc: val,
                      }))
                    }
                    labelKey="TenKhoaHoc"
                    valueKey="TenKhoaHoc"
                    data={listTenKhoaHoc}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="ml-2"> Hệ đào tạo: </p>
                  <Select
                    label="Chọn hệ đào tạo"
                    modelValue={filters.TenBacDaoTao}
                    onChange={(val) =>
                      setFilters((p) => ({
                        ...p,
                        TenBacDaoTao: val,
                      }))
                    }
                    labelKey="TenHeDaoTao"
                    valueKey="TenHeDaoTao"
                    data={listHeDaoTao}
                  />
                </div>
              </div>
              <div className="flex gap-2 px-1 my-3">
                <div className="flex flex-col">
                  <p className="ml-2"> Loại hình ĐT: </p>
                  <Select
                    label="Chọn loại hình đào tạo"
                    modelValue={filters.TenLoaiDaoTao}
                    onChange={(val) =>
                      setFilters((p) => ({
                        ...p,
                        TenLoaiDaoTao: val,
                      }))
                    }
                    labelKey="TenLoaiHinhDT"
                    valueKey="TenLoaiHinhDT"
                    data={listLoaiHinhDT}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="ml-2"> Khoa: </p>
                  <Select
                    label="Chọn khoa"
                    modelValue={filters.TenKhoa}
                    onChange={(val) =>
                      setFilters((p) => ({
                        ...p,
                        TenKhoa: val,
                      }))
                    }
                    labelKey="TenKhoa"
                    valueKey="TenKhoa"
                    data={listTenKhoa}
                    disabled={!filters.TenCoSo}
                  />
                </div>
              </div>
              <div className="flex gap-2 px-1 my-3">
                <div className="flex flex-col">
                  <p className="ml-2"> Ngành: </p>
                  <Select
                    label="Chọn ngành"
                    modelValue={filters.TenNganh}
                    onChange={(val) =>
                      setFilters((p) => ({
                        ...p,
                        TenNganh: val,
                      }))
                    }
                    data={listNganhShow}
                    labelKey="TenNganh"
                    valueKey="TenNganh"
                    disabled={!filters.TenKhoa}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="ml-2"> Lớp: </p>
                  <Select
                    label="Chọn lớp"
                    modelValue={filters.TenLop}
                    onChange={(val) =>
                      setFilters((p) => ({
                        ...p,
                        TenLop: val,
                      }))
                    }
                    labelKey="TenLop"
                    valueKey="TenLop"
                    data={listLop}
                    disabled={!filters.TenLop && !listLop.length}
                  />
                </div>
              </div>
            </AdvanceSearch>
          </div>
        </div>

        <div className="flex gap-2 my-2 relative z-[2]">
          <div className="overflow-auto">
            <div className="flex items-center gap-2 my-2">
              {filters.HoDem && (
                <Tag>
                  Họ tên: {filters.HoDem} {filters.Ten}
                </Tag>
              )}
              {filters.TenCoSo && <Tag>Cơ sở: {filters.TenCoSo}</Tag>}
              {filters.TenBacDaoTao && (
                <Tag>Hệ đào tạo: {filters.TenBacDaoTao}</Tag>
              )}
              {filters.TenKhoaHoc && <Tag>Khóa học: {filters.TenKhoaHoc}</Tag>}
              {filters.TenKhoa && <Tag>Khoa: {filters.TenKhoa}</Tag>}
              {filters.TenNganh && <Tag>Ngành: {filters.TenNganh}</Tag>}
              {filters.TenLop && <Tag>Lớp: {filters.TenLop}</Tag>}
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Select
              clearable={false}
              filterable={false}
              defaultFirstOption
              data={pageSizes}
              modelValue={paginate.SoBanGhiTrenTrang}
              onChange={(pageSize) => {
                setPaginate((p) => ({
                  ...p,
                  SoBanGhiTrenTrang: pageSize,
                }))
              }}
              valueKey="value"
              labelKey="label"
              triggerClass="z-[2] relative !w-[130px]"
            />

            <span className="whitespace-nowrap">
              Trang {paginate.SoTrang} / {totalPage}
            </span>

            <button
              className="icon-btn"
              disabled={paginate.SoTrang === 1}
              onClick={() =>
                setPaginate((p) => ({
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
              disabled={paginate.SoTrang === 1}
              onClick={() =>
                setPaginate((p) => ({
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
              disabled={paginate.SoTrang === totalPage}
              onClick={() =>
                setPaginate((p) => ({
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
              disabled={paginate.SoTrang === totalPage}
              onClick={() =>
                setPaginate((p) => ({
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
          data={danhSachNguoiHoc}
          maxHeight={600}
          loading={isLoadingTableData}
        >
          <TableColumn
            label="Mã sinh viên"
            prop="MaSinhVien"
            minWidth={100}
            fixed
            align="center"
          />
          <TableColumn label="Họ tên" minWidth={100}>
            {(row) => {
              return (
                <span>
                  {row.HoDem} {row.Ten}
                </span>
              )
            }}
          </TableColumn>
          <TableColumn label="Lớp" prop="TenLop" minWidth={100} />
          <TableColumn label="Giới tính" minWidth={60}>
            {(row) => {
              return <span>{row.GioiTinh === false ? 'Nam' : 'Nữ'}</span>
            }}
          </TableColumn>
          <TableColumn label="Ngày sinh" prop="NgaySinh" minWidth={100} />
          <TableColumn
            label="Số điện thoại"
            prop="SoDienThoai"
            minWidth={100}
          />
          <TableColumn label="Cơ sở" prop="TenCoSo" minWidth={120} />
          <TableColumn label="Khóa học" prop="TenKhoaHoc" minWidth={100} />
          <TableColumn label="Hệ đào tạo" prop="TenHeDaoTao" minWidth={100} />
          <TableColumn label="Khoa" prop="TenKhoa" minWidth={100} />
          <TableColumn label="Ngành" prop="TenNganh" minWidth={100} />
          <TableColumn label="Trạng thái" prop="TenTrangThai" minWidth={100} />
        </Table>
      </div>
    </div>
  )
}

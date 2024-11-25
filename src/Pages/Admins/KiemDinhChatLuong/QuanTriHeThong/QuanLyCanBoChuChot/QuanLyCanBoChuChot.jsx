import {
  getAllCanBo,
  getCanBoChuChotKiemTraTrung,
  postCanBoChuChot,
  postCanBoChuChotChucVu,
} from '@/Apis/KDCL/CSDLDonVi/apiCanBoChuChot'
import { Popper, PopperContent, PopperTrigger, Select } from '@/Components/Base'
import Icon from '@/Components/Base/Icon/Icon'
import { RotateLeft } from '@/Components/Base/Icons/RotateLeft'
import Tag from '@/Components/Base/Tag/Tag'
import Loading from '@/Components/Loading/Loading'
import { useNamespace } from '@/Services/Hooks'
import { retries } from '@/Services/Utils/requestUtils'
import { Checkbox, Tooltip } from '@mui/material'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
} from 'react-icons/bi'
import { GrFormDown } from 'react-icons/gr'
import Swal from 'sweetalert2'

export const QuanLyCanBoChuChot = () => {
  const ns = useNamespace('kiem-dinh-chat-luong')

  const [danhSachCanBo, setDanhSachCanBo] = useState([])
  const [danhSachCanBoShow, setDanhSachCanBoShow] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [isLoading, setIsLoading] = useState(true)

  const [searchText, setSearchText] = useState('')
  const [searchDonVi, setSearchDonVi] = useState('')
  const [searchPhongBan, setSearchPhongBan] = useState('')
  const [searchChucVu, setSearchChucVu] = useState('')
  const [searchHocVi, setSearchHocVi] = useState('')
  const [isShowAdvanceSearch, setIsShowAdvanceSearch] = useState(false)
  const [danhSachDonVi, setDanhSachDonVi] = useState([])
  const [danhSachPhongBan, setDanhSachPhongBan] = useState([])
  const [danhSachChucVu, setDanhSachChucVu] = useState([])
  const [danhSachHocVi, setDanhSachHocVi] = useState([])

  const [filter, setFilter] = useState({
    Search: '',
    DonVi: '',
    PhongBan: '',
    ChucVu: '',
    HocVi: '',
  })

  const loadDanhSachCanBo = async () => {
    retries(async () => {
      const res = await getAllCanBo()
      const data = await res?.data?.body
      setDanhSachCanBo(
        data.map((e) => ({
          Chon: e.TC_CanBo_Chon,
          MaNhanSu: e.MaNhanSu == null ? '' : e.MaNhanSu,
          HoDem: e.HoDem,
          Ten: e.Ten,
          HoTen: `${e.HoDem} ${e.Ten}`,
          NgaySinh: dayjs(e.NgaySinh).format('DD/MM/YYYY'),
          GioiTinh: e.GioiTinh ? 'Nam' : 'Nữ',
          DonVi: e.TenDonVi == null ? '' : e.TenDonVi,
          ChucVu: e.TenChucVu == null ? '' : e.TenChucVu,
          PhongBan: e.TenPhongBan == null ? '' : e.TenPhongBan,
          HocVi: e.TenHocVi == null ? '' : e.TenHocVi,
          Email: e.Email == null ? '' : e.Email,
          SoDienThoai:
            e.SoDienThoai != null && e.SoDienThoai != ''
              ? e.SoDienThoai
              : e.SoDiDong == null
                ? ''
                : e.SoDiDong,
        })),
      )
      setIsLoading(false)
    })
  }

  useEffect(() => {
    setIsLoading(true)
    loadDanhSachCanBo()
  }, [])

  useEffect(() => {
    setDanhSachCanBoShow(
      danhSachCanBo.filter((e, i) => {
        const isTrueSearch =
          e.MaNhanSu.toLocaleLowerCase()
            .trim()
            .includes(filter.Search.toLocaleLowerCase().trim()) ||
          e.HoTen.toLocaleLowerCase()
            .trim()
            .includes(filter.Search.toLocaleLowerCase().trim())

        const isTrueDonVi =
          filter.DonVi == '' || filter.DonVi == null
            ? true
            : e.DonVi.toLocaleLowerCase().trim() ==
              filter.DonVi.toLocaleLowerCase().trim()

        const isTruePhongBan =
          filter.PhongBan == '' || filter.PhongBan == null
            ? true
            : e.PhongBan.toLocaleLowerCase().trim() ==
              filter.PhongBan.toLocaleLowerCase().trim()

        const isTrueChucVu =
          filter.ChucVu == '' || filter.ChucVu == null
            ? true
            : e.ChucVu.toLocaleLowerCase().trim() ==
              filter.ChucVu.toLocaleLowerCase().trim()

        const isTrueHocVi =
          filter.HocVi == '' || filter.HocVi == null
            ? true
            : e.HocVi.toLocaleLowerCase().trim() ==
              filter.HocVi.toLocaleLowerCase().trim()

        return (
          isTrueSearch &&
          isTrueDonVi &&
          isTruePhongBan &&
          isTrueChucVu &&
          isTrueHocVi
        )
      }),
    )
  }, [danhSachCanBo, filter])

  useEffect(() => {
    setDanhSachDonVi(
      [...new Set([...danhSachCanBo.map((e) => e.DonVi), ''])].map((e) => ({
        label: e == '' ? 'Tất cả' : e,
        value: e.toLocaleLowerCase().trim(),
      })),
    )
    setDanhSachPhongBan(
      [...new Set([...danhSachCanBo.map((e) => e.PhongBan), ''])].map((e) => ({
        label: e == '' ? 'Tất cả' : e,
        value: e.toLocaleLowerCase().trim(),
      })),
    )
    setDanhSachChucVu(
      [...new Set([...danhSachCanBo.map((e) => e.ChucVu), ''])].map((e) => ({
        label: e == '' ? 'Tất cả' : e,
        value: e.toLocaleLowerCase().trim(),
      })),
    )
    setDanhSachHocVi(
      [...new Set([...danhSachCanBo.map((e) => e.HocVi), ''])].map((e) => ({
        label: e == '' ? 'Tất cả' : e,
        value: e.toLocaleLowerCase().trim(),
      })),
    )
  }, [danhSachCanBo])

  const handleReload = () => {
    setIsLoading(true)
    setCurrentPage(1)
    setItemsPerPage(10)
    setFilter({
      Search: '',
      DonVi: '',
      PhongBan: '',
      ChucVu: '',
      HocVi: '',
    })
    setSearchDonVi('')
    setSearchPhongBan('')
    setSearchChucVu('')
    setSearchHocVi('')
    loadDanhSachCanBo()
  }

  const handleSelect = (index) => {
    setDanhSachCanBoShow((_danhSachCanBoShow) =>
      _danhSachCanBoShow.map((e, i) => {
        if (index != i) return e
        return {
          ...e,
          Chon: !e.Chon,
        }
      }),
    )
  }

  const handleSelectAll = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const finishIndex = currentPage * itemsPerPage - 1
    if (
      !danhSachCanBoShow.some((e, i) => {
        if (i < startIndex || i > finishIndex) return false
        return !e.Chon
      }) &&
      danhSachCanBoShow.length > 0
    ) {
      setDanhSachCanBoShow((_danhSachCanBoShow) =>
        _danhSachCanBoShow.map((e, i) => {
          if (i < startIndex || i > finishIndex) return e
          return {
            ...e,
            Chon: false,
          }
        }),
      )
      return
    }

    setDanhSachCanBoShow((_danhSachCanBoShow) =>
      _danhSachCanBoShow.map((e, i) => {
        if (i < startIndex || i > finishIndex) return e
        return {
          ...e,
          Chon: true,
        }
      }),
    )
    return
  }

  const totalPage = useMemo(() => {
    return Math.ceil(danhSachCanBoShow.length / itemsPerPage)
  }, [danhSachCanBoShow, itemsPerPage])

  const handleChangePage = (to) => {
    if (to < 1 || to > totalPage) return
    setCurrentPage(to)
  }

  const handleChangeItemsPerPage = (val) => {
    setItemsPerPage(val)
    setCurrentPage(1)
  }

  const handleSearch = () => {
    console.log({
      Search: searchText,
      DonVi: searchDonVi,
      PhongBan: searchPhongBan,
      ChucVu: searchChucVu,
      HocVi: searchHocVi,
    })
    setFilter({
      Search: searchText,
      DonVi: searchDonVi,
      PhongBan: searchPhongBan,
      ChucVu: searchChucVu,
      HocVi: searchHocVi,
    })
  }

  const handlePostData = async () => {
    if (!danhSachCanBoShow.some((e) => e.Chon)) return
    setIsLoading(true)
    const listDataPost = danhSachCanBoShow
      .filter((e) => {
        return e.Chon
      })
      .map((e, i) => {
        return {
          MaNhanSu: e.MaNhanSu,
          HoDem: e.HoDem,
          Ten: e.Ten,
          Email: e.Email,
          SoDienThoai: e.SoDienThoai,
          DonVi: e.DonVi,
          ChucVu: e.ChucVu,
        }
      })

    let listDataChucVuPost = []

    let i = 1
    for (let dataPost of listDataPost) {
      const resKiemTranTrung = await getCanBoChuChotKiemTraTrung({
        MaNhanSu: dataPost.MaNhanSu,
      })
      const dataKiemTraTrung = resKiemTranTrung?.data?.body
      let dataCanBoID = ''
      if (dataKiemTraTrung.length == 0) {
        await postCanBoChuChot({
          ThuTu: i++,
          MaNhanSu: dataPost.MaNhanSu,
          HoDem: dataPost.HoDem,
          Ten: dataPost.Ten,
          Email: dataPost.Email,
          SoDienThoai: dataPost.SoDienThoai,
        })

        const resCanBoID = await getCanBoChuChotKiemTraTrung({
          MaNhanSu: dataPost.MaNhanSu,
        })
        dataCanBoID = resCanBoID?.data?.body[0].KT_KDCL_CanBoChuChot_ID
      } else {
        dataCanBoID = dataKiemTraTrung[0].KT_KDCL_CanBoChuChot_ID
      }

      listDataChucVuPost = [
        ...listDataChucVuPost,
        {
          CanBoID: dataCanBoID,
          ThuTu: 0,
          DonVi: dataPost.DonVi,
          ChucVu: dataPost.ChucVu,
        },
      ]
    }

    await Promise.all(
      listDataChucVuPost.map((e) => {
        return postCanBoChuChotChucVu({
          CanBoID: e.CanBoID,
          ThuTu: e.ThuTu,
          DonVi: e.DonVi,
          ChucVu: e.ChucVu,
        })
      }),
    )

    Swal.fire({
      icon: 'success',
      title: 'Xác nhận thành công',
      showConfirmButton: false,
      timer: 2000,
    })

    loadDanhSachCanBo()
    setIsLoading(false)
  }

  const toggleAdvanceSearch = () => {
    setIsShowAdvanceSearch((_isShowAdvanceSearch) => !_isShowAdvanceSearch)
  }

  const [listItemsPerPage, setListItemsPerPage] = useState([
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
      {/* header */}
      <div className={ns.e('header')}>
        <h3 className={ns.em('header', 'title')}>QUẢN LÝ CÁN BỘ CHỦ CHỐT</h3>

        <div className={ns.e('actions')}>
          {/* <AdvanceSearch /> */}
          <div className="flex justify-center items-center gap-[6px]">
            <button
              onClick={() => handlePostData()}
              className={`${!danhSachCanBoShow.some((e) => e.Chon) ? 'opacity-50' : ''} px-4 py-[6px] rounded-md text-white bg-uneti-primary`}
            >
              Xác nhận
            </button>
          </div>
          <div className="flex justify-center items-center gap-[6px]">
            <div className="flex justify-center items-center">
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className={`px-[10px] py-[6px] border-2 border-[rgb(44 62 80 / 10%)] outline-none rounded-tl-md rounded-bl-md`}
                placeholder="Nhập từ khóa tìm kiếm"
              />
              <div className={``}>
                <Popper offset={0} placement="bottom-end" persistent>
                  <PopperTrigger>
                    <div className="flex justify-center items-center gap-2 text-slate-400 px-[10px] py-[6px] border-2 border-[rgb(44 62 80 / 10%)] outline-none rounded-tr-md rounded-br-md">
                      <span className="select-none">Tìm kiếm nâng cao</span>
                      <GrFormDown />
                    </div>
                  </PopperTrigger>
                  <PopperContent>
                    <div className="flex flex-col gap-2 py-3 px-1">
                      <div className="flex items-center gap-2">
                        <p className="w-[80px]"> Đơn vị: </p>
                        <Select
                          modelValue={searchDonVi}
                          onChange={(val) => setSearchDonVi(val)}
                          data={danhSachDonVi}
                          valueKey="value"
                          labelKey="label"
                          label="Chọn đơn vị"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 py-3 px-1">
                      <div className="flex items-center gap-2">
                        <p className="w-[80px]"> Phòng ban: </p>
                        <Select
                          modelValue={searchPhongBan}
                          onChange={(val) => setSearchPhongBan(val)}
                          data={danhSachPhongBan}
                          valueKey="value"
                          labelKey="label"
                          label="Chọn phòng ban"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 py-3 px-1">
                      <div className="flex items-center gap-2">
                        <p className="w-[80px]"> Chức vụ: </p>
                        <Select
                          modelValue={searchChucVu}
                          onChange={(val) => setSearchChucVu(val)}
                          data={danhSachChucVu}
                          valueKey="value"
                          labelKey="label"
                          label="Chọn chức vụ"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 py-3 px-1">
                      <div className="flex items-center gap-2">
                        <p className="w-[80px]"> Học hàm học vị: </p>
                        <Select
                          modelValue={searchHocVi}
                          onChange={(val) => setSearchHocVi(val)}
                          data={danhSachHocVi}
                          valueKey="value"
                          labelKey="label"
                          label="Chọn học hàm/ học vị"
                        />
                      </div>
                    </div>
                  </PopperContent>
                </Popper>
              </div>
            </div>
            <button
              onClick={() => handleSearch()}
              className="px-4 py-2 rounded-md text-white bg-uneti-primary"
            >
              Tìm kiếm
            </button>
          </div>

          <Tooltip title="Tải lại dữ liệu">
            <button
              onClick={() => handleReload()}
              className={ns.em('actions', 'reload')}
            >
              <Icon>
                <RotateLeft />
              </Icon>
            </button>
          </Tooltip>
        </div>
      </div>

      {/* divider */}
      <div className="uneti-divider" />

      {/* table */}
      {isLoading ? (
        <Loading />
      ) : (
        <div className={ns.e('main')}>
          <div className="flex justify-between items-center flex-col md:flex-row">
            <div className="flex-wrap flex items-center gap-2 my-2">
              {filter.Search != '' && filter.Search != null ? (
                <Tag>Từ khóa: {filter.Search}</Tag>
              ) : null}
              {filter.DonVi != '' && filter.DonVi != null ? (
                <Tag>Đơn vị: {filter.DonVi}</Tag>
              ) : null}
              {filter.PhongBan != '' && filter.PhongBan != null ? (
                <Tag>Phòng ban: {filter.PhongBan}</Tag>
              ) : null}
              {filter.ChucVu != '' && filter.ChucVu != null ? (
                <Tag>Chức vụ: {filter.ChucVu}</Tag>
              ) : null}
              {filter.HocVi != '' && filter.HocVi != null ? (
                <Tag>Học vị: {filter.HocVi}</Tag>
              ) : null}
            </div>
            <div className="w-full md:w-auto flex-1 flex justify-end items-end gap-2 my-2 flex-col sm:flex-row">
              <div className="flex justify-end items-center gap-2">
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
                <div className="w-[100px]">
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
          </div>
          <div className="flex-1 w-full overflow-auto flex flex-col gap-4">
            <table className="w-full border border-[rgb(244 247 248)]">
              <thead>
                <tr>
                  <th className="sticky left-0 border border-[rgb(244 247 248)] px-4 py-3 bg-uneti-primary text-white">
                    <Checkbox
                      checked={
                        !danhSachCanBoShow.some((e, i) => {
                          const startIndex = (currentPage - 1) * itemsPerPage
                          const finishIndex = currentPage * itemsPerPage - 1
                          if (i < startIndex || i > finishIndex) return false
                          return !e.Chon
                        }) && danhSachCanBoShow.length > 0
                      }
                      indeterminate={
                        danhSachCanBoShow.map((e, i) => {
                          const startIndex = (currentPage - 1) * itemsPerPage
                          const finishIndex = currentPage * itemsPerPage - 1
                          if (i < startIndex || i > finishIndex) return false
                          return !e.Chon
                        }) &&
                        danhSachCanBoShow.some((e, i) => {
                          const startIndex = (currentPage - 1) * itemsPerPage
                          const finishIndex = currentPage * itemsPerPage - 1
                          if (i < startIndex || i > finishIndex) return false
                          return e.Chon
                        })
                      }
                      onChange={() => handleSelectAll()}
                    />
                  </th>
                  <th className="sticky left-[75px] min-w-[100px] border border-[rgb(244 247 248)] px-4 py-3 bg-uneti-primary text-white">
                    Mã nhân sự
                  </th>
                  <th className="min-w-[100px] border border-[rgb(244 247 248)] px-4 py-3 bg-uneti-primary text-white">
                    Họ tên
                  </th>
                  <th className="min-w-[100px] border border-[rgb(244 247 248)] px-4 py-3 bg-uneti-primary text-white">
                    Giới tính
                  </th>
                  <th className="min-w-[100px] border border-[rgb(244 247 248)] px-4 py-3 bg-uneti-primary text-white">
                    Ngày sinh
                  </th>
                  <th className="min-w-[100px] border border-[rgb(244 247 248)] px-4 py-3 bg-uneti-primary text-white">
                    Đơn vị
                  </th>
                  <th className="min-w-[100px] border border-[rgb(244 247 248)] px-4 py-3 bg-uneti-primary text-white">
                    Phòng ban
                  </th>
                  <th className="min-w-[100px] border border-[rgb(244 247 248)] px-4 py-3 bg-uneti-primary text-white">
                    Chức vụ
                  </th>
                  <th className="min-w-[100px] border border-[rgb(244 247 248)] px-4 py-3 bg-uneti-primary text-white">
                    Học hàm/ học vị
                  </th>
                  <th className="min-w-[100px] border border-[rgb(244 247 248)] px-4 py-3 bg-uneti-primary text-white">
                    Số điện thoại
                  </th>
                  <th className="min-w-[100px] border border-[rgb(244 247 248)] px-4 py-3 bg-uneti-primary text-white">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                {danhSachCanBoShow.length > 0 ? (
                  danhSachCanBoShow.map((canBo, index) => {
                    if (index < (currentPage - 1) * itemsPerPage) return
                    if (index > currentPage * itemsPerPage - 1) return
                    return (
                      <tr key={index}>
                        <td className="bg-white sticky left-0 border border-[rgb(244 247 248)] text-center">
                          <Checkbox
                            checked={canBo.Chon}
                            onChange={() => handleSelect(index)}
                          />
                        </td>
                        <td className="sticky left-[75px] bg-white px-4 py-3 border border-[rgb(244 247 248)] text-center">
                          {canBo.MaNhanSu}
                        </td>
                        <td className="px-4 py-3 border border-[rgb(244 247 248)]">
                          {canBo.HoTen}
                        </td>
                        <td className="px-4 py-3 border border-[rgb(244 247 248)] text-center">
                          {canBo.GioiTinh}
                        </td>
                        <td className="px-4 py-3 border border-[rgb(244 247 248)] text-center">
                          {canBo.NgaySinh}
                        </td>
                        <td className="px-4 py-3 border border-[rgb(244 247 248)]">
                          {canBo.DonVi}
                        </td>
                        <td className="px-4 py-3 border border-[rgb(244 247 248)]">
                          {canBo.PhongBan}
                        </td>
                        <td className="px-4 py-3 border border-[rgb(244 247 248)]">
                          {canBo.ChucVu}
                        </td>
                        <td className="px-4 py-3 border border-[rgb(244 247 248)]">
                          {canBo.HocVi}
                        </td>
                        <td className="px-4 py-3 border border-[rgb(244 247 248)] text-center">
                          {canBo.SoDienThoai}
                        </td>
                        <td className="px-4 py-3 border border-[rgb(244 247 248)]">
                          {canBo.Email}
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td
                      className="px-4 py-3 border border-[rgb(244 247 248)] text-center"
                      colSpan={11}
                    >
                      Không có dữ liệu
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* <Table
            displayNumberOrder={false}
            data={danhSachCanBoShow}
            maxHeight={600}
            loading={isLoading}
          >
            <TableColumn label="Chọn" checkable minWidth={100} align="center" />
            <TableColumn
              label="Mã nhân sự"
              prop="MaNhanSu"
              minWidth={100}
              fixed
              align="center"
            />
            <TableColumn label="Họ tên" prop="HoTen" minWidth={100} />
            <TableColumn label="Giới tính" prop="GioiTinh" minWidth={100} />
            <TableColumn label="Ngày sinh" prop="NgaySinh" minWidth={100} />
            <TableColumn label="Đơn vị" prop="DonVi" minWidth={100} />
            <TableColumn label="Phòng ban" prop="PhongBan" minWidth={100} />
            <TableColumn label="Chức vụ" prop="ChucVu" minWidth={100} />
            <TableColumn label="Học hàm học vị" prop="HocVi" minWidth={120} />
            <TableColumn
              label="Số điện thoại"
              prop="SoDienThoai"
              minWidth={100}
            />
            <TableColumn label="Email" prop="Email" minWidth={100} />
          </Table> */}
        </div>
      )}
    </div>
  )
}

export default QuanLyCanBoChuChot

import { useMemo, useRef, useState } from 'react'
import { useEffect } from 'react'
import { Popper, PopperContent, PopperTrigger } from '@/Components/Base'
import Icon from '@/Components/Base/Icon/Icon'
import FilterAdd from '@/Components/Base/Icons/FilterAdd'
import { Select } from '@/Components/Base/Select'
import { getTenKhoaHoc } from '@/Apis/KDCL/CSDLDonVi/apiTenKkhoaHoc'
import { getTenKhoa } from '@/Apis/KDCL/CSDLDonVi/apiTenKhoa'
import { getNganh } from '@/Apis/KDCL/CSDLDonVi/apiNganh'
import { getTenLop } from '@/Apis/KDCL/CSDLDonVi/apiTenLop'
import { getTenHeDaoTao } from '@/Apis/KDCL/CSDLDonVi/apiTenHeDaoTao'
import { getTenLoaiHinhDaoTao } from '@/Apis/KDCL/CSDLDonVi/apiTenLoaiHinhDaoTao'
import { compareStrWithoutSpecialChars } from '@/Services/Utils/stringUtils'
import { getThongKeNguoiHoc } from '@/Apis/KDCL/CSDLDonVi/apiThongKeNguoiHoc'
import { retries } from '@/Services/Utils/requestUtils'
import { keys } from 'lodash-unified'
import { listCoSo } from '@/Services/Static/dataStatic'

export default function AdvanceFilter({
  children,
  setThongKe,
  filters,
  setFilters = () => {},
}) {
  const [loaiHinhDaoTao, setLoaiHinhDaoTao] = useState([])
  const [heDaoTao, setHeDaoTao] = useState([])
  const [khoaHoc, setKhoaHoc] = useState([])
  const [khoa, setKhoa] = useState([])
  const [nganh, setNganh] = useState([])
  const [lop, setLop] = useState([])

  const popperRef = useRef(null)

  const filtersValue = useMemo(() => {
    return keys(filters).reduce((acc, curr) => {
      acc[curr] = filters[curr].value
      return acc
    }, {})
  }, [filters])

  const listNganhShow = useMemo(() => {
    return (
      nganh.find(
        (item) =>
          compareStrWithoutSpecialChars(filtersValue.Khoa, item.TenKhoa) &&
          compareStrWithoutSpecialChars(
            item.TenHeDaoTao,
            filtersValue.HeDaoTao,
          ),
      )?.ChuyenNganh || []
    )
  }, [filtersValue.Khoa, filtersValue.HeDaoTao])

  useEffect(() => {
    if (filtersValue.CoSo) {
      retries(async () => {
        const res = await getTenKhoa(filtersValue.CoSo)
        setKhoa(res.data.body)
      })
    }
  }, [filtersValue.CoSo])

  useEffect(() => {
    if (
      filtersValue.Khoa &&
      filtersValue.HeDaoTao &&
      filtersValue.Nganh &&
      filtersValue.CoSo &&
      filtersValue.KhoaHoc &&
      filtersValue.LoaiHinhDT
    ) {
      retries(async () => {
        const res = await getTenLop(filtersValue)
        setLop(res.data.body)
      })
    }
  }, [
    filtersValue.Khoa,
    filtersValue.HeDaoTao,
    filtersValue.Nganh,
    filtersValue.CoSo,
    filtersValue.KhoaHoc,
    filtersValue.LoaiHinhDT,
  ])

  useEffect(() => {
    retries(async () => {
      const res = await getThongKeNguoiHoc(filtersValue)
      setThongKe(res.data.body)
    })
  }, [filtersValue])

  useEffect(() => {
    Promise.all([
      retries(async () => {
        const res = await getTenKhoaHoc()
        setKhoaHoc(res?.data.body || [])
      }),
      retries(async () => {
        const res = await getTenHeDaoTao()
        setHeDaoTao(res?.data.body || [])
      }),
      retries(async () => {
        const res = await getTenLoaiHinhDaoTao()
        setLoaiHinhDaoTao(res?.data.body || [])
      }),
      retries(async () => {
        const res = await getNganh()
        setNganh(res?.data.body || [])
      }),
    ]).catch(console.log)
  }, [])

  return (
    <Popper placement="bottom-end" ref={popperRef} persistent>
      <PopperTrigger>
        {children ? (
          children
        ) : (
          <button className="h-[32px] py-2 px-4 rounded-lg bg-white flex items-center gap-2 hover:bg-slate-50 border border-solid hover:border-uneti-primary">
            <Icon size={18}>
              <FilterAdd />
            </Icon>
            Lọc
          </button>
        )}
      </PopperTrigger>

      <PopperContent className="rounded-xl">
        <div className="px-3 py-4 flex flex-col gap-2">
          <div className="flex gap-3">
            {/*  */}
            <div>
              <p className="ml-1 font-medium">Cơ sở đào tạo</p>

              <Select
                modelValue={filtersValue.CoSo}
                onChange={(value) =>
                  setFilters({
                    key: 'CoSo',
                    label: 'Cơ sở',
                    value,
                  })
                }
                data={listCoSo}
                labelKey="title"
                valueKey="value"
                label="Chọn cơ sở đào tạo"
              />
            </div>
            {/*  */}
            <div>
              <p className="ml-1 font-medium">Khóa học</p>

              <Select
                modelValue={filtersValue.KhoaHoc}
                onChange={(value) =>
                  setFilters({
                    key: 'KhoaHoc',
                    label: 'Khóa học',
                    value,
                  })
                }
                data={khoaHoc}
                labelKey="TenKhoaHoc"
                valueKey="TenKhoaHoc"
                label="Chọn khóa học"
              />
            </div>
          </div>
          <div className="flex gap-3">
            {/*  */}
            <div>
              <p className="ml-1 font-medium">Bậc đào tạo</p>

              <Select
                modelValue={filtersValue.HeDaoTao}
                onChange={(value) =>
                  setFilters({
                    key: 'HeDaoTao',
                    label: 'Hệ đào tạo',
                    value,
                  })
                }
                data={heDaoTao}
                valueKey="TenHeDaoTao"
                labelKey="TenHeDaoTao"
                label="Chọn bậc đào tạo"
              />
            </div>
            {/*  */}
            <div>
              <p className="ml-1 font-medium">Loại hình đào tạo</p>

              <Select
                modelValue={filtersValue.LoaiHinhDT}
                onChange={(value) =>
                  setFilters({
                    key: 'LoaiHinhDT',
                    label: 'Loại hình đào tạo',
                    value,
                  })
                }
                data={loaiHinhDaoTao}
                valueKey="TenLoaiHinhDT"
                labelKey="TenLoaiHinhDT"
                label="Chọn loại hình đào tạo"
              />
            </div>
          </div>
          <div className="flex gap-3">
            {/*  */}
            <div>
              <p className="ml-1 font-medium">Khoa</p>

              <Select
                modelValue={filtersValue.Khoa}
                onChange={(value) =>
                  setFilters({
                    key: 'Khoa',
                    label: 'Khoa',
                    value,
                  })
                }
                data={khoa}
                labelKey="TenKhoa"
                valueKey="TenKhoa"
                label="Chọn khoa"
                disabled={!filtersValue.CoSo}
              />
            </div>
            {/*  */}
            <div>
              <p className="ml-1 font-medium">Ngành</p>

              <Select
                modelValue={filtersValue.Nganh}
                onChange={(value) =>
                  setFilters({
                    key: 'Nganh',
                    label: 'Ngành',
                    value,
                  })
                }
                data={listNganhShow}
                labelKey="TenNganh"
                valueKey="TenNganh"
                disabled={!filtersValue.Khoa}
                label="Chọn ngành"
              />
            </div>
          </div>
          <div className="flex gap-3">
            {/*  */}
            <div className="w-full">
              <p className="ml-1 font-medium">Lớp</p>

              <Select
                modelValue={filtersValue.Lop}
                onChange={(value) =>
                  setFilters({
                    value,
                    key: 'Lop',
                    label: 'Lớp',
                  })
                }
                data={lop}
                labelKey="TenLop"
                valueKey="TenLop"
                disabled={!filtersValue.Nganh && !lop.length}
                label="Chọn lớp"
                triggerClass="w-full"
              />
            </div>
          </div>
        </div>
      </PopperContent>
    </Popper>
  )
}

import { useLocation } from 'react-router-dom'

import DanhSachTaiSan from './DanhSachTaiSan'
import clsx from 'clsx'
import Box from '@/Components/MotCua/Box'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import Autocomplete from '@mui/material/Autocomplete'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

import { IoClose } from 'react-icons/io5'
import { listHinhThucBaoHong, listNhomBaoHong } from './constant'
import ModalChiTietTaiSan from '@/Components/HoTroThietBi/ModalChiTietTaiSan'
import { FaRegFileImage } from 'react-icons/fa'
import { useRef, useState } from 'react'
import { FaRegTrashCan } from 'react-icons/fa6'
import { isEmpty } from 'lodash-unified'
import { listCoSo, listDiaDiem } from '@/Services/Static/dataStatic'
import ULoading from '@/Components/Loading/ULoading'

const BaoHongTaiSanView = ({
  isLoadingTaiSan,
  listToaNha,
  listTang,
  listPhong,
  listTaiSan,
  listLinhVucSuCo,
  listSuCo,
  searchPhong,
  onSetSearchPhong,
  onSelectedPhong,
  onSetIdPhong,
  selectedTaiSan,
  onSelectTaiSan,
  dataViTri,
  onChangeViTri,
  onSetDataViTri,
  dataNhomBaoHong,
  onSelectNhomBaoHong,
  dataHinhThucBaoHong,
  onSelectHinhThucBaoHong,
  dataLinhVucSuCo,
  onSelectLinhVucSuCo,
  dataTenSuCo,
  onSelectTenSuCo,
  dataFormSubmit,
  onChangeValueForm,
  onSubmit,
  dataAttackFile,
  onChooseFile,
  onRemoveFile,
}) => {
  const location = useLocation()
  const inputFileRef = useRef(null)
  const { pathname } = location
  const [showDataTaiSan, setShowDataTaiSan] = useState({
    visible: false,
    data: null,
  })
  const [openSelectPhong, setOpenSelectPhong] = useState(false)

  const breadcrumbs = [
    {
      title: 'Báo hỏng tài sản',
      path: pathname,
    },
  ]

  const home = {
    path: '/ho-tro-thiet-bi-phan-mem',
    title: 'Hỗ trợ thiết bị, phần mềm',
  }

  const handleHideModal = () => {
    setShowDataTaiSan({
      ...showDataTaiSan,
      visible: false,
    })
  }

  const handleShowDetailTaiSan = (data) => {
    setShowDataTaiSan({
      visible: true,
      data,
    })
  }

  return (
    <div className="rounded-md bg-white p-4">
      <Box home={home} breadcrumbs={breadcrumbs}>
        <div className="col-span-2">
          <h2 className="mb-10 text-center text-4xl font-bold uppercase text-uneti-primary">
            Báo hỏng
          </h2>
          <div className="flex flex-col gap-2">
            <div className="hinhthucbaohong mb-4  border md:border-2 border-uneti-primary-light p-2 rounded-md relative">
              <FormControl className="nhombaohong mb-4 border md:border-2 border-uneti-primary-light p-2 rounded-md relative">
                <FormLabel
                  id="rdgNhomBaoHong"
                  className="!font-semibold absolute -top-5 bg-white left-4 !px-2 inline-block max-w-max"
                >
                  Nhóm báo hỏng (*)
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="rdgNhomBaoHong"
                  name="rdg-nhom-bao-hong"
                  className="flex flex-row justify-between sm:justify-center sm:gap-20 lg:justify-normal px-4"
                >
                  {listNhomBaoHong.map((g) => {
                    return (
                      <FormControlLabel
                        key={g.id.toString()}
                        value={dataNhomBaoHong.value}
                        control={
                          <Radio
                            id={g.id.toString()}
                            name="ckbNhomBaoHong"
                            value={g.title}
                            onChange={onSelectNhomBaoHong}
                            checked={dataNhomBaoHong.value === g.title}
                          />
                        }
                        label={g.title}
                      />
                    )
                  })}
                </RadioGroup>
              </FormControl>
            </div>
            {/* nhombaohong */}

            <div className="hinhthucbaohong mb-4  border md:border-2 border-uneti-primary-light p-2 rounded-md relative">
              <FormControl className="hinhthucbaohong mb-4  border md:border-2 border-uneti-primary-light p-2 rounded-md relative">
                <FormLabel
                  id="rdgHinhThucBaoHong"
                  className="!font-semibold absolute -top-5 bg-white left-4 !px-2 inline-block max-w-max"
                >
                  Hình thức báo hỏng (*)
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="rdgHinhThucBaoHong"
                  name="rdg-ht-bao-hong"
                  className="flex flex-row justify-between sm:justify-center sm:gap-20 lg:justify-normal px-4"
                >
                  {listHinhThucBaoHong.map((ht) => {
                    return (
                      <FormControlLabel
                        key={ht.id.toString()}
                        value={ht.title}
                        control={
                          <Radio
                            id={ht.id.toString()}
                            name="ckbHinhThucBaoHong"
                            value={ht.title}
                            onChange={onSelectHinhThucBaoHong}
                            checked={dataHinhThucBaoHong === ht.id.toString()}
                            disabled={
                              dataNhomBaoHong.id ===
                              listNhomBaoHong[1].id.toString()
                            }
                          />
                        }
                        label={ht.title}
                      />
                    )
                  })}
                </RadioGroup>
              </FormControl>
            </div>
            {/* hinhthucbaohong */}

            <div
              className={clsx(
                'vitritaisan mb-4  border md:border-2 border-uneti-primary-light p-2 rounded-md relative',
                dataNhomBaoHong.id === listNhomBaoHong[1].id.toString()
                  ? 'hidden'
                  : 'block',
              )}
            >
              <p className="absolute -top-3 bg-white left-4 px-2 font-semibold">
                Vị trí tài sản (*)
              </p>
              <div className="grid grid-cols-4 gap-4 py-2 px-3">
                <div className="col-span-4 lg:col-span-2">
                  <p>Cơ sở</p>
                  <select
                    name="DT_QLP_Phong_CoSo"
                    id="DT_QLP_Phong_CoSo"
                    onChange={onChangeViTri}
                    className="w-full border px-3 py-2 focus:outline-slate-400"
                  >
                    <option value="">Chọn cơ sở</option>
                    {listCoSo.map((iCoSo) => (
                      <option key={iCoSo.id} value={iCoSo.value}>
                        {iCoSo.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-4 lg:col-span-2">
                  <p>Địa điểm</p>
                  <select
                    name="DT_QLP_Phong_DiaDiem"
                    id="DT_QLP_Phong_DiaDiem"
                    onChange={onChangeViTri}
                    disabled={
                      dataViTri?.DT_QLP_Phong_CoSo.trim() !== '' ? false : true
                    }
                    className="w-full border px-3 py-2 focus:outline-slate-400 disabled:bg-gray-200"
                  >
                    <option value="">Chọn địa điểm</option>
                    {dataViTri?.DT_QLP_Phong_CoSo === 'Hà Nội' &&
                      listDiaDiem.haNoi.map((iDiaDiem) => (
                        <option key={iDiaDiem.id} value={iDiaDiem.value}>
                          {iDiaDiem.title}
                        </option>
                      ))}
                    {dataViTri?.DT_QLP_Phong_CoSo === 'Nam Định' &&
                      listDiaDiem.namDinh.map((iDiaDiem) => (
                        <option key={iDiaDiem.id} value={iDiaDiem.value}>
                          {iDiaDiem.title}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-span-4 lg:col-span-2">
                  <p>Tòa nhà</p>
                  <select
                    name="DT_QLP_Phong_ToaNha"
                    id="DT_QLP_Phong_ToaNha"
                    onChange={onChangeViTri}
                    disabled={
                      dataViTri?.DT_QLP_Phong_CoSo.trim() !== '' &&
                      dataViTri?.DT_QLP_Phong_DiaDiem.trim() !== ''
                        ? false
                        : true
                    }
                    className="w-full border px-3 py-2 focus:outline-slate-400 disabled:bg-gray-200"
                  >
                    <option value="">Chọn tòa nhà</option>
                    {listToaNha &&
                      listToaNha?.map((iToaNha) => (
                        <option
                          key={iToaNha.DT_QLP_Phong_ToaNha}
                          value={iToaNha.DT_QLP_Phong_ToaNha}
                        >
                          {iToaNha.DT_QLP_Phong_ToaNha}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-span-4 lg:col-span-2">
                  <p>Tầng</p>
                  <select
                    name="DT_QLP_Phong_Tang"
                    id="DT_QLP_Phong_Tang"
                    onChange={onChangeViTri}
                    disabled={
                      dataViTri?.DT_QLP_Phong_CoSo.trim() !== '' &&
                      dataViTri?.DT_QLP_Phong_DiaDiem.trim() !== '' &&
                      dataViTri?.DT_QLP_Phong_ToaNha.trim() !== ''
                        ? false
                        : true
                    }
                    className="w-full border px-3 py-2 focus:outline-slate-400 disabled:bg-gray-200"
                  >
                    <option value="">Chọn tầng</option>
                    {listTang &&
                      listTang?.map((iTang) => (
                        <option
                          key={iTang.DT_QLP_Phong_Tang}
                          value={iTang.DT_QLP_Phong_Tang}
                        >
                          {iTang.DT_QLP_Phong_Tang}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-span-4 lg:col-span-2">
                  <p>Phòng/Khu vực (*)</p>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full border px-3 py-2 focus:outline-slate-400 disabled:bg-gray-200"
                      placeholder="Chọn tên phòng"
                      value={
                        searchPhong !== ''
                          ? searchPhong
                          : dataViTri.DT_QLP_Phong_Phong.trim()
                      }
                      disabled={
                        dataViTri?.DT_QLP_Phong_CoSo.trim() !== '' &&
                        dataViTri?.DT_QLP_Phong_DiaDiem.trim() !== '' &&
                        dataViTri?.DT_QLP_Phong_ToaNha.trim() !== '' &&
                        dataViTri?.DT_QLP_Phong_Tang.trim() !== ''
                          ? false
                          : true
                      }
                      onChange={(e) => {
                        onSetSearchPhong(e.target.value)
                      }}
                      onFocus={() => {
                        setOpenSelectPhong(true)
                      }}
                    />
                    {dataViTri.DT_QLP_Phong_Phong.trim() !== '' && (
                      <span
                        onClick={() => {
                          onSetDataViTri({
                            ...dataViTri,
                            DT_QLP_Phong_Phong: '',
                          })
                          onSetIdPhong(null)
                        }}
                        className="absolute right-4 top-3 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-gray-200 hover:bg-slate-100"
                      >
                        <IoClose />
                      </span>
                    )}
                  </div>
                  {openSelectPhong === true && (
                    <div className="max-h-60 overflow-y-auto">
                      <ul>
                        {listPhong &&
                          listPhong
                            .filter((iPhong) =>
                              iPhong.DT_QLP_Phong_TenPhong.toLowerCase().includes(
                                searchPhong.toLowerCase(),
                              ),
                            )
                            ?.map((iPhong) => (
                              <li
                                className="cursor-pointer px-3 py-1 hover:bg-slate-100 hover:font-medium hover:text-gray-700"
                                key={iPhong.DT_QLP_Phong_ID}
                                onClick={() => {
                                  onSetIdPhong(iPhong?.DT_QLP_Phong_ID)
                                  onSetDataViTri({
                                    ...dataViTri,
                                    DT_QLP_Phong_Phong:
                                      iPhong?.DT_QLP_Phong_TenPhong,
                                  })
                                  onSetSearchPhong('')
                                  onSelectedPhong(iPhong)
                                  setOpenSelectPhong(false)
                                }}
                              >
                                {iPhong.DT_QLP_Phong_TenPhong}
                              </li>
                            ))}
                        {listPhong &&
                          listPhong.length > 0 &&
                          listPhong.filter((iPhong) =>
                            iPhong.DT_QLP_Phong_TenPhong.toLowerCase().includes(
                              searchPhong.toLowerCase(),
                            ),
                          ).length === 0 && (
                            <li className="bg-slate-100 px-3 py-1 text-gray-500">
                              Không có dữ liệu của phòng &quot;{searchPhong}
                              &quot;
                            </li>
                          )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* vitritaisan */}

            <div className="chitietsuco border md:border-2 border-uneti-primary-light p-2 rounded-md relative mb-4">
              <p className="absolute -top-3 bg-white left-4 px-2 font-semibold">
                Chi tiết sự cố (*)
              </p>
              <div className="w-full grid grid-cols-2">
                <div className="linhvuc col-span-2 md:col-span-1 py-2 px-3">
                  <p className="mb-2">Lĩnh vực sự cố (*)</p>
                  <Autocomplete
                    className="w-full"
                    size="small"
                    multiple={false}
                    options={
                      listLinhVucSuCo ? listLinhVucSuCo.map((sc) => sc) : []
                    }
                    value={dataLinhVucSuCo}
                    onChange={(event, newValue) => {
                      onSelectLinhVucSuCo(newValue)
                      onSelectTenSuCo([])
                    }}
                    disableCloseOnSelect
                    freeSolo={false}
                    getOptionLabel={(option) => {
                      return option.DT_CVNB_TBGD_TL_Nhom3 || ''
                    }}
                    noOptionsText="Không có lĩnh vực sự cố cần tìm!"
                    renderOption={(props, option) => (
                      <li {...props}>{option.DT_CVNB_TBGD_TL_Nhom3}</li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Chọn lĩnh vực sự cố"
                      />
                    )}
                  />
                </div>
                {/* END: Lĩnh vực sự cố */}
                <div className="tensuco col-span-2 md:col-span-1 py-2 px-3">
                  <p className="mb-2">Tên sự cố (*)</p>
                  <Autocomplete
                    className="w-full"
                    size="small"
                    disabled={dataLinhVucSuCo ? false : true}
                    multiple
                    options={listSuCo ? listSuCo?.map((sc) => sc) : []}
                    value={dataTenSuCo}
                    onChange={(event, newValue) => {
                      onSelectTenSuCo([...newValue])
                    }}
                    disableCloseOnSelect
                    freeSolo={false}
                    getOptionLabel={(option) => {
                      return option.DT_CVNB_TBGD_TL_Ten || ''
                    }}
                    noOptionsText="Không có sự cố cần tìm!"
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox checked={selected} />
                        {option.DT_CVNB_TBGD_TL_Ten}
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Chọn tên sự cố" />
                    )}
                  />
                </div>
                {/* END: Tên sự cố */}
              </div>

              {/* START: Mô tả sự cố */}
              <div className="motasuco py-2 px-3">
                <p className="mb-2">Mô tả sự cố (*)</p>
                <TextareaAutosize
                  className="w-full flex-1 rounded-md border border-solid border-gray-300 p-2 focus:outline-slate-400"
                  id="DT_QLTS_TS_HoTroThietBi_BaoHong_MoTa"
                  name="DT_QLTS_TS_HoTroThietBi_BaoHong_MoTa"
                  value={
                    dataFormSubmit?.DT_QLTS_TS_HoTroThietBi_BaoHong_MoTa || ''
                  }
                  onChange={onChangeValueForm}
                  minRows="3"
                />
              </div>
              {/* END: Mô tả sự cố */}
            </div>

            <div className="filedinhkem mb-4 border md:border-2 border-uneti-primary-light p-2 rounded-md relative">
              <FormControl>
                <FormLabel
                  id="rdgNhomBaoHong"
                  className="!font-semibold absolute -top-5 bg-white left-4 !px-2 inline-block max-w-max"
                >
                  Hình ảnh đính kèm (nếu có)
                </FormLabel>
                <label
                  htmlFor="attack-file"
                  className={clsx(
                    'ml-4 inline-flex cursor-pointer items-center justify-center gap-x-4 rounded-md border border-gray-300 bg-white px-2 py-2 hover:bg-slate-50',
                    {
                      hidden: !isEmpty(dataAttackFile.dataFileBase64),
                    },
                  )}
                >
                  <FaRegFileImage size={18} />
                  Chọn ảnh đính kèm
                </label>
                <span
                  className={clsx('ml-4 mt-2', {
                    hidden: !isEmpty(dataAttackFile.dataFileBase64),
                  })}
                >
                  (Chỉ chấp nhận hình ảnh có định dạng: jpg, jpeg, png và nhỏ
                  hơn 5MB)
                </span>
                <input
                  type="file"
                  name=""
                  accept="image/,.jpg,.jpeg,.png"
                  id="attack-file"
                  hidden
                  multiple={false}
                  onChange={onChooseFile}
                  ref={inputFileRef}
                />
                {!isEmpty(dataAttackFile.dataFileBase64) && (
                  <div className="relative shadow p-4 rounded-md w-full inset-0 mt-6">
                    <img
                      src={dataAttackFile.link}
                      alt={dataAttackFile.name}
                      className="w-full object-cover bg-center rounded-md"
                    />

                    <div
                      onClick={() => {
                        onRemoveFile()
                        inputFileRef.current.value = ''
                      }}
                      className="absolute top-1 right-1 text-red-500 w-8 h-8 cursor-pointer rounded-full hover:bg-slate-200 flex items-center justify-center"
                    >
                      <FaRegTrashCan size={16} />
                    </div>
                  </div>
                )}
              </FormControl>
            </div>

            {/* Chi tiết sự cố */}
            {isLoadingTaiSan ? (
              <ULoading />
            ) : (
              <div
                className={clsx(
                  'danhsachtaisan mb-10 select-none my-6',
                  dataHinhThucBaoHong !== '2' && 'hidden',
                )}
              >
                <p className="mb-2 font-semibold text-xl uppercase underline">
                  Danh sách {dataNhomBaoHong.value}
                </p>
                <DanhSachTaiSan
                  listTaiSan={listTaiSan}
                  selectedTaiSan={selectedTaiSan}
                  onSelectTaiSan={onSelectTaiSan}
                  nhomBaoHong={dataNhomBaoHong}
                  onShowDetailTaiSan={handleShowDetailTaiSan}
                />
                {showDataTaiSan.visible && (
                  <ModalChiTietTaiSan
                    onShowModal={handleHideModal}
                    dataTaiSan={showDataTaiSan.data}
                    nhomBaoHong={dataNhomBaoHong}
                  />
                )}
              </div>
            )}

            {(dataViTri?.DT_QLP_Phong_Phong?.trim() !== '' ||
              dataNhomBaoHong.id === '2') && (
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={onSubmit}
                  className="rounded-full border border-sky-700 bg-white px-3 py-2 font-medium text-sky-700 hover:bg-sky-700 hover:text-white hover:opacity-80"
                >
                  Gửi yêu cầu
                </button>
              </div>
            )}
          </div>
        </div>
      </Box>
    </div>
  )
}

export default BaoHongTaiSanView

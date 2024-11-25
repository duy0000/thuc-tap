import Box from '@/Components/MotCua/Box'
import { useLocation } from 'react-router-dom'
import DanhSachBaoHong from './DanhSachBaoHong'
import { MdOutlineZoomOutMap, MdOutlineZoomInMap } from 'react-icons/md'
import clsx from 'clsx'
import Loading from '@/Components/Loading/Loading'
import Autocomplete from '@mui/material/Autocomplete'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import DanhSachTheoDoiSuaChua from './DanhSachTheoDoiSuaChua'

const SuaChuaTaiSanView = (props) => {
  const {
    loading,
    loadingAction,
    page,
    isModeHandler,
    onSetModeHandler,
    onSetPage,
    itemPerPage,
    onSetItemPerPage,
    listBaoHong,
    zoom,
    filters,
    onZoom,
    selected,
    dataListNguyenNhan,
    dataListKhacPhucSuCo,
    dataSelectedNguyenNhan,
    dataSelectedKQKP,
    onSelected,
    onConfirmNgayXuLy,
    onConfirmSuccess,
    onUpdateNgayXuLy,
    onChangeValueFilter,
    onClearFilter,
    onSelectedNguyenNhan,
    onSelectedKQKP,
    onCancel,
    onChangeDescSuccess,
  } = props
  const location = useLocation()
  const { pathname } = location
  const breadcrumbs = [
    {
      title: 'Sửa chữa tài sản',
      path: pathname,
    },
  ]
  const home = {
    path: '/ho-tro-thiet-bi-phan-mem',
    title: 'Hỗ trợ thiết bị, phần mêm',
  }

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div
          className={clsx(
            'rounded-md bg-white p-4',
            zoom && 'fixed inset-0 z-[10] h-screen w-full overflow-auto',
          )}
        >
          <Box home={home} breadcrumbs={breadcrumbs}>
            <div className="col-span-2">
              <div className="grid grid-cols-12">
                <h2 className="col-span-11 text-center text-4xl font-bold uppercase text-uneti-primary">
                  Sửa chữa
                </h2>
                <div className="col-span-1 justify-end">
                  <div className="flex justify-end">
                    {zoom ? (
                      <MdOutlineZoomInMap
                        onClick={() => {
                          onZoom(false)
                        }}
                        className="my-2 cursor-pointer hover:text-cyan-800 md:text-2xl"
                      />
                    ) : (
                      <MdOutlineZoomOutMap
                        onClick={() => {
                          onZoom(true)
                        }}
                        className="my-2 cursor-pointer hover:text-cyan-800 md:text-2xl"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="my-4 flex items-center gap-x-4">
                {isModeHandler === 'handle' && (
                  <button
                    type="button"
                    disabled={loadingAction}
                    onClick={onConfirmNgayXuLy}
                    className="rounded-lg border border-orange-500 bg-white px-3 py-2 font-semibold text-orange-600 hover:bg-orange-100"
                  >
                    Xác nhận ngày sửa chữa
                  </button>
                )}

                {isModeHandler === 'success' && (
                  <button
                    type="button"
                    disabled={loadingAction}
                    onClick={onConfirmSuccess}
                    className="rounded-lg border border-green-500 bg-white px-3 py-2 font-semibold text-green-600 hover:bg-green-100"
                  >
                    Xác nhận hoàn thành
                  </button>
                )}

                <button
                  type="button"
                  disabled={loadingAction}
                  onClick={onCancel}
                  className="rounded-lg border border-red-500 bg-red-500 px-3 py-2 font-semibold text-white hover:opacity-70"
                >
                  Hủy yêu cầu
                </button>
              </div>

              {/* START: Form thông tin sửa chữa thêm */}
              {selected &&
                selected[0]?.DT_QLTS_TS_HoTroThietBi_XuLy_NgayXuLy &&
                selected[0]?.DT_QLTS_TS_HoTroThietBi_XacNhan_HoanThanh ===
                  0 && (
                  <div className="border md:border-2 border-uneti-primary-light p-2 rounded-md relative mb-4">
                    <p className="absolute -top-3 bg-white left-4 px-2 font-semibold">
                      Chi tiết sửa chữa (*)
                    </p>
                    <div id="nguyennhan" className="py-2 px-3">
                      <div className="">
                        <p className="mb-2">Nguyên nhân (*)</p>
                        <Autocomplete
                          className="w-full"
                          size="small"
                          multiple
                          options={
                            dataListNguyenNhan
                              ? dataListNguyenNhan?.map((sc) => sc)
                              : []
                          }
                          value={dataSelectedNguyenNhan}
                          onChange={(event, newValue) => {
                            onSelectedNguyenNhan([...newValue])
                          }}
                          disableCloseOnSelect
                          freeSolo={false}
                          getOptionLabel={(option) =>
                            option.DT_CVNB_TBGD_TL_Ten
                          }
                          noOptionsText="Không có nguyên nhân cần tìm!"
                          renderOption={(props, option, { selected }) => (
                            <li {...props}>
                              <Checkbox checked={selected} />
                              {option.DT_CVNB_TBGD_TL_Ten}
                            </li>
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Chọn nguyên nhân"
                            />
                          )}
                        />
                      </div>
                      <div className="mt-6">
                        <p className="mb-2">Mô tả nguyên nhân (*)</p>
                        <TextField
                          id="descNguyenNhan"
                          label=""
                          variant="outlined"
                          size="small"
                          className="w-full"
                          placeholder="Nhập mô tả nguyên nhân"
                          onChange={onChangeDescSuccess}
                        />
                      </div>
                    </div>
                    {/* END: Nguyên nhân */}

                    <div id="kqkp" className="px-3">
                      <div className="mt-6">
                        <p className="mb-2">Kết quả khắc phục (*)</p>
                        <Autocomplete
                          className="w-full"
                          size="small"
                          multiple
                          options={
                            dataListKhacPhucSuCo
                              ? dataListKhacPhucSuCo?.map((sc) => sc)
                              : []
                          }
                          value={dataSelectedKQKP}
                          onChange={(event, newValue) => {
                            onSelectedKQKP([...newValue])
                          }}
                          disableCloseOnSelect
                          disabled={dataSelectedNguyenNhan?.length === 0}
                          freeSolo={false}
                          getOptionLabel={(option) =>
                            option.DT_CVNB_TBGD_TL_Ten
                          }
                          noOptionsText="Không có kết quả khắc phục cần tìm!"
                          renderOption={(props, option, { selected }) => {
                            return (
                              <li {...props}>
                                <Checkbox checked={selected} />
                                {option.DT_CVNB_TBGD_TL_Ten}
                              </li>
                            )
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Chọn kết quả khắc phục"
                            />
                          )}
                        />
                      </div>

                      {/* START: Mô tả KQKP */}
                      <div className="mt-6">
                        <p className="mb-2">Mô tả kết quả khắc phục (*)</p>
                        <TextField
                          id="descKhacPhuc"
                          label=""
                          variant="outlined"
                          size="small"
                          className="w-full"
                          placeholder="Nhập mô tả khắc phục"
                          onChange={onChangeDescSuccess}
                          disabled={dataSelectedNguyenNhan?.length === 0}
                        />
                      </div>
                    </div>
                    {/* END: Kết quả khắc phục */}
                  </div>
                )}
              {/* END: Form thông tin sửa chữa thêm */}

              <div className="flex flex-col gap-4">
                <DanhSachBaoHong
                  page={page}
                  isModeHandler={isModeHandler}
                  onSetModeHandler={onSetModeHandler}
                  onSetPage={onSetPage}
                  itemPerPage={itemPerPage}
                  onSetItemPerPage={onSetItemPerPage}
                  listBaoHong={listBaoHong}
                  selected={selected}
                  filters={filters}
                  onSelected={onSelected}
                  onUpdateNgayXuLy={onUpdateNgayXuLy}
                  onChangeValueFilter={onChangeValueFilter}
                  onClearFilter={onClearFilter}
                />
              </div>

              <div className="flex flex-col gap-4">
                <DanhSachTheoDoiSuaChua
                  listBaoHong={listBaoHong}
                  loading={loading}
                />
              </div>
            </div>
          </Box>
        </div>
      )}
    </>
  )
}

export default SuaChuaTaiSanView

import { Checkbox, Tooltip } from '@mui/material'
import { memo } from 'react'
import { LuFilterX } from 'react-icons/lu'
import IconButton from '@mui/material/IconButton'
import { DebounceInput } from 'react-debounce-input'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

export const TableHead = memo(function TableHead({
  dataFilter,
  onChangeFilter,
  onClearFilter,
  rowCount,
  numSelected,
  onSelectAll,
}) {
  return (
    <thead className="w-full sticky top-0 z-[1] bg-white">
      <tr className="border rounded-t-md">
        <th
          rowSpan={2}
          className="text-center p-1 font-semibold border-r border-slate-50 bg-cyan-700 text-white rounded-tl-xl"
        >
          STT
        </th>
        <th
          rowSpan={2}
          className="text-center p-1 font-semibold border-r border-slate-50 bg-cyan-700 text-white"
        >
          Chọn
        </th>
        <th
          colSpan={8}
          className="text-center p-1 font-semibold border-r border-slate-50 bg-cyan-700 text-white border-b"
        >
          Thông tin thiết bị
        </th>
        <th
          rowSpan={3}
          className="text-center p-1 font-semibold bg-cyan-700 text-white rounded-tr-xl"
        >
          Nút điều khiển <br /> công tắc
        </th>
      </tr>
      <tr className="border">
        <th className="text-center p-1 font-semibold border-r border-slate-50 bg-cyan-700 text-white">
          Thông tin phòng
        </th>
        <th className="text-center p-1 font-semibold border-r border-slate-50 bg-cyan-700 text-white">
          Lịch sử dụng phòng
        </th>
        <th className="text-center p-1 font-semibold border-r border-slate-50 bg-cyan-700 text-white">
          Trạng thái BMS
        </th>
        <th className="text-center p-1 font-semibold border-r border-slate-50 bg-cyan-700 text-white">
          Nguồn điện điều hòa
        </th>
        <th className="text-center p-1 font-semibold border-r border-slate-50 bg-cyan-700 text-white">
          Chế độ hoạt động BMS
        </th>
        <th className="text-center p-1 font-semibold border-r border-slate-50 bg-cyan-700 text-white">
          Ngày giờ trên BMS
        </th>
        <th className="text-center p-1 font-semibold border-r border-slate-50 bg-cyan-700 text-white whitespace-nowrap">
          Nhiệt độ <br /> Phòng học/Ngoài trời
        </th>
        <th className="text-center p-1 font-semibold border-r border-slate-50 bg-cyan-700 text-white">
          Thông số kỹ thuật
        </th>
      </tr>
      <tr className="border">
        <th className="text-center p-1 border-r">
          <Tooltip title="Xóa lọc" onClick={onClearFilter}>
            <IconButton>
              <LuFilterX />
            </IconButton>
          </Tooltip>
        </th>
        <th className="text-center p-1 border-r">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAll}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </th>
        <th className="text-center p-1 border-r">
          <DebounceInput
            debounceTimeout={1000}
            className="w-full p-2 focus:outline-none border border-gray-200 focus:border-cyan-500"
            placeholder={'Tìm ...'}
            name="ThongTinPhong"
            value={dataFilter?.ThongTinPhong}
            onChange={onChangeFilter}
          />
        </th>
        <th className="text-center p-1 border-r">
          <DebounceInput
            debounceTimeout={1000}
            className="w-full p-2 focus:outline-none border border-gray-200 focus:border-cyan-500"
            placeholder={'Tìm ...'}
            name="LichSuDungPhong"
            value={dataFilter?.LichSuDungPhong}
            onChange={onChangeFilter}
          />
        </th>
        <th className="text-center p-1 border-r">
          <FormControl variant="standard" sx={{ m: 0, minWidth: 120 }}>
            <InputLabel id="trang_thai">Trạng thái</InputLabel>
            <Select
              labelId="trang_thai"
              id="trang_thai"
              name="TrangThaiBMS"
              value={dataFilter?.TrangThaiBMS}
              onChange={onChangeFilter}
              label="Trạng thái thiết bị"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>Đang kết nối</MenuItem>
              <MenuItem value={0}>Mất kết nối</MenuItem>
            </Select>
          </FormControl>
        </th>
        <th className="text-center p-1 border-r">
          <FormControl variant="standard" sx={{ m: 0, minWidth: 100 }}>
            <InputLabel id="in8">Nguồn điện</InputLabel>
            <Select
              labelId="in8"
              id="in8"
              name="NguonDienDieuHoa"
              value={dataFilter?.NguonDienDieuHoa}
              onChange={onChangeFilter}
              label="Nguồn điện thiết bị"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={0}>Mất nguồn điện</MenuItem>
              <MenuItem value={1}>Đang có nguồn điện</MenuItem>
            </Select>
          </FormControl>
        </th>
        <th className="text-center p-1 border-r">
          <FormControl variant="standard" sx={{ m: 0, minWidth: 80 }}>
            <InputLabel id="mode">Chế độ</InputLabel>
            <Select
              labelId="mode"
              id="mode"
              name="CheDoHoatDongBMS"
              value={dataFilter?.CheDoHoatDongBMS}
              onChange={onChangeFilter}
              label="Chế độ hoạt động"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="auto">Auto</MenuItem>
              <MenuItem value="manual">Manual</MenuItem>
            </Select>
          </FormControl>
        </th>
        <th className="text-center p-1 border-r w-20">
          <DebounceInput
            debounceTimeout={1000}
            className="w-20 p-2 focus:outline-none border border-gray-200 focus:border-cyan-500"
            placeholder={'Tìm ...'}
            type="date"
            name="NgayGioTrenBMS"
            value={dataFilter?.NgayGioTrenBMS}
            onChange={onChangeFilter}
          />
        </th>
        <th className="text-center p-1 border-r w-16">
          <table>
            <tbody>
              <tr>
                <td className="min-w-[40px]">
                  <DebounceInput
                    debounceTimeout={1000}
                    className="w-full p-2 focus:outline-none border border-gray-200 focus:border-cyan-500"
                    placeholder={'Min ...'}
                    type="number"
                    name="NhietDoMin"
                    value={dataFilter?.NhietDoMin}
                    onChange={onChangeFilter}
                  />
                </td>
                <td className="min-w-[40px]">
                  <DebounceInput
                    debounceTimeout={1000}
                    className="w-full p-2 focus:outline-none border border-gray-200 focus:border-cyan-500"
                    placeholder={'Max ...'}
                    type="number"
                    name="NhietDoMax"
                    value={dataFilter?.NhietDoMax}
                    onChange={onChangeFilter}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </th>
        <th className="text-center p-1 border-r">
          <DebounceInput
            debounceTimeout={1000}
            className="w-full p-2 focus:outline-none border border-gray-200 focus:border-cyan-500"
            placeholder={'Tìm ...'}
            name="ThongSoKyThuat"
            value={dataFilter?.ThongSoKyThuat}
            onChange={onChangeFilter}
          />
        </th>
      </tr>
    </thead>
  )
})

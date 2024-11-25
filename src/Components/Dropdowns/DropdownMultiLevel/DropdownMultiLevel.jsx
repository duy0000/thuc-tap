import { listTypeTTHCGVThongKe } from '@/Pages/Clients/GiangVien/ThuTucHanhChinhGiangVien/constants'
import PropTypes from 'prop-types'

function DropdownMultiLevel(props) {
  const {
    listType,
    typeSelected,
    setTypeSelected,
    labelSelectedData,
    listDataSelected,
    valueSelected,
    setValueSelected,
  } = props

  return (
    <form className="w-full mx-auto">
      <div className="flex">
        <select
          id="data-type"
          value={typeSelected}
          onChange={(e) => setTypeSelected(e.target.value)}
          className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-s-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {listType &&
            listType.map((item, index) => {
              return (
                <option value={item.value} key={index}>
                  {item.value}
                </option>
              )
            })}
        </select>
        {labelSelectedData && (
          <label htmlFor="data-selected" className="sr-only">
            {labelSelectedData}
          </label>
        )}
        <select
          id="data-selected"
          name={
            typeSelected === listTypeTTHCGVThongKe[0].value
              ? 'MC_TTHC_GV_LoaiTimKiem'
              : 'MC_TTHC_GV_ThangTimKiem'
          }
          value={valueSelected}
          onChange={(e) => setValueSelected(e)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-e-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {labelSelectedData && (
            <option selected="">{labelSelectedData}</option>
          )}
          {listDataSelected &&
            listDataSelected.map((item, index) => {
              return (
                <option
                  value={item.value}
                  key={index}
                  className="whitespace-nowrap"
                >
                  {item.key}
                </option>
              )
            })}
        </select>
      </div>
    </form>
  )
}

DropdownMultiLevel.propTypes = {
  typeDefault: PropTypes.string,
  listType: PropTypes.array,
  typeSelected: PropTypes.string,
  setTypeSelected: PropTypes.func,
  labelSelectedData: PropTypes.string,
  listDataSelected: PropTypes.array,
  valueSelected: PropTypes.string,
  setValueSelected: PropTypes.func,
}

export default DropdownMultiLevel

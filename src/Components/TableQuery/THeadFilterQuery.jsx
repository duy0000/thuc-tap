import PropTypes from 'prop-types'
import { DebounceInput } from 'react-debounce-input'

function THeadFilterQuery({ column, dataSelects, debounceTimeout }) {
  const { filterVariant } = column.columnDef.meta ?? {}
  const columnFilterValue = column.getFilterValue()

  return filterVariant === 'range' ? (
    <div>
      <div className="flex space-x-1">
        <DebounceInput
          type="number"
          value={columnFilterValue?.[0] ?? ''}
          onChange={(e) =>
            column.setFilterValue((old) => [e.target.value, old?.[1] ?? ''])
          }
          placeholder={`Min`}
          className="w-full p-2 focus:outline-blue-100 shadow"
          debounceTimeout={debounceTimeout ?? 500}
        />
        <DebounceInput
          type="number"
          value={columnFilterValue?.[1] ?? ''}
          onChange={(e) =>
            column.setFilterValue((old) => [old?.[0] ?? '', e.target.value])
          }
          placeholder={`Max`}
          className="w-full p-2 focus:outline-blue-100 shadow"
          debounceTimeout={debounceTimeout ?? 500}
        />
      </div>
    </div>
  ) : filterVariant === 'select' ? (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
      className="w-full p-2 focus:outline-blue-100 shadow"
    >
      <option value="" className="p-2">
        Tất cả
      </option>
      {dataSelects &&
        dataSelects.map((data, index) => {
          return (
            <option key={index} value={data.value} className="p-2">
              {data.label}
            </option>
          )
        })}
    </select>
  ) : filterVariant === 'checkbox' ? (
    <div className="w-full p-2 focus:outline-blue-100 shadow">
      <input type="checkbox" />
    </div>
  ) : filterVariant === 'text' ? (
    <DebounceInput
      className="w-full p-2 focus:outline-blue-100 shadow"
      onChange={(e) => {
        column.setFilterValue(e.target.value)
      }}
      placeholder={`Tìm kiếm...`}
      type="text"
      value={columnFilterValue ?? ''}
      debounceTimeout={debounceTimeout ?? 500}
    />
  ) : null
}

THeadFilterQuery.propTypes = {
  column: PropTypes.any.isRequired,
  dataSelects: PropTypes.array,
  debounceTimeout: PropTypes.number,
}

export default THeadFilterQuery

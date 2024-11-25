import PropTypes from 'prop-types'
import { flexRender } from '@tanstack/react-table'
import clsx from 'clsx'
import { useState } from 'react'
import { getCommonPinningStyles } from './constants'
function TBodyQuery({ rows, columnClassName, rowClassName }) {
  const [colOfRowIndex, setColOfRowIndex] = useState(null)

  return (
    <tbody className="border">
      {rows.map((row, index) => {
        return (
          <tr
            key={index}
            className={clsx(
              'border-b relative z-0',
              rowClassName,
              index % 2 === 0
                ? 'text-gray-900 bg-slate-100 hover:bg-cyan-600 hover:text-white'
                : 'text-gray-900 bg-white hover:bg-cyan-600 hover:text-white',
            )}
          >
            {row.getVisibleCells().map((cell, index) => {
              const isActive = index === colOfRowIndex
              return (
                <td
                  key={index}
                  style={{
                    ...getCommonPinningStyles(cell.column),
                    color: '#111827',
                  }}
                  className={clsx(
                    columnClassName
                      ? columnClassName
                      : 'p-2 whitespace-nowrap text-gray-900',
                    index < row.getVisibleCells().length - 1
                      ? 'border-r border-gray-200'
                      : '',
                    isActive ? 'whitespace-nowrap' : '',
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              )
            })}
          </tr>
        )
      })}
    </tbody>
  )
}

TBodyQuery.propTypes = {
  rows: PropTypes.array,
  columnClassName: PropTypes.string,
  rowClassName: PropTypes.string,
}
TBodyQuery.displayName = 'TBodyQuery'

export default TBodyQuery

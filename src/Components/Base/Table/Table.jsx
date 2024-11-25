import { useMemo, useState } from 'react'
import { isArray, isEqual, isFunction, isNil } from 'lodash-unified'
import { useNamespace } from '@/Services/Hooks'
import { transformCls } from '@/Services/Utils/reactUtils'

import { tableCtx } from './token'

import '@/assets/Styles/Components/Table.scss'
import Loading from '@/Components/Loading/Loading'
import { Checkbox } from '../Checkbox'

const TableComp = ({
  children,
  data = [],
  maxHeight = 0,
  height = 0,
  displayNumberOrder = true,
  modelValue = null,
  onUpdateModelValue = null,
  loading = false,
  noDataText = 'Không có dữ liệu',
}) => {
  const ns = useNamespace('u-table')

  const [tColsProps, setTColsProps] = useState([])

  const onTableColumnCreated = (tColProps) => {
    setTColsProps((p) => [...p, tColProps])
  }

  const onTableColumnUpdated = (tColProps) => {
    setTColsProps((prevTColsProps) =>
      prevTColsProps.map((col) =>
        col.label === tColProps.label ? { ...col, ...tColProps } : col,
      ),
    )
  }

  const colsProp = useMemo(() => {
    return tColsProps.map((tColProps) =>
      tColProps.prop ? tColProps.prop : '__PURE_CHILDREN__',
    )
  }, [tColsProps])

  const colsLabel = useMemo(() => {
    return tColsProps.map((tColProps) => tColProps.label)
  }, [tColsProps])

  const colsStyle = useMemo(() => {
    return tColsProps.map((tColProps) => ({
      width: `${tColProps.width}px`,
      minWidth: `${tColProps.minWidth}px`,
      maxWidth: `${tColProps.maxWidth}px`,
      display: 'flex',
      justifyContent: tColProps.align || 'left',
      alignItems: tColProps.valign || 'center',
    }))
  }, [tColsProps])

  const isSelected = (row) => {
    return modelValue && modelValue.some((e) => isEqual(e, row))
  }

  const onRowClick = (row) => {
    if (!isNil(onUpdateModelValue)) {
      if (isSelected(row)) {
        onUpdateModelValue(modelValue.filter((e) => !isEqual(e, row)))
      } else {
        onUpdateModelValue([...modelValue, row])
      }
    }
  }

  if (!isNil(modelValue)) {
    if (!isArray(modelValue)) {
      console.warn('modelValue phải là một mảng')
      return null
    }

    if (isNil(onUpdateModelValue)) {
      console.warn(
        'Vui lòng cung cấp hàm onUpdateModelValue để cập nhật modelValue',
      )
      return null
    }

    if (!isFunction(onUpdateModelValue)) {
      console.warn(
        'Nếu modelValue được truyền, onUpdateModelValue phải là một hàm',
      )
      return null
    }
  }

  return (
    <tableCtx.Provider
      value={{
        onTableColumnCreated,
        onTableColumnUpdated,
      }}
    >
      {children}

      <div
        style={{
          height: height || 'initial',
          maxHeight: maxHeight || 'initial',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          position: 'relative',
        }}
      >
        {loading && <Loading />}
        <table className={transformCls([ns.b(), 'w-full'])}>
          <thead>
            <tr>
              {displayNumberOrder && (
                <th
                  style={{
                    maxWidth: 56,
                  }}
                >
                  <div className="text-center">STT</div>
                </th>
              )}
              {colsLabel.map((label, i) => (
                <th
                  key={i}
                  className={transformCls([
                    tColsProps[i].fixed && ns.is('sticky'),
                  ])}
                  style={{
                    width: colsStyle[i].width,
                    minWidth: colsStyle[i].minWidth,
                    maxWidth: colsStyle[i].maxWidth,
                  }}
                >
                  <div style={colsStyle[i]}>
                    {tColsProps[i].checkable ? 'Chọn' : label}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length == 0 ? (
              <tr>
                <td
                  className="text-center font-semibold !py-3"
                  colSpan={colsLabel.length + (displayNumberOrder && 1)}
                >
                  {noDataText}
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={i} onClick={() => onRowClick(row)}>
                  {displayNumberOrder && (
                    <td className="w-[56px]">
                      <div className="text-center">{i + 1}</div>
                    </td>
                  )}
                  {colsProp.map((colProp, j) => (
                    <td
                      key={j}
                      className={transformCls([
                        tColsProps[j].fixed && ns.is('sticky'),
                      ])}
                    >
                      <div style={colsStyle[j]}>
                        {colProp == '__PURE_CHILDREN__' &&
                        !tColsProps[j]?.checkable ? (
                          isFunction(tColsProps[j].children) ? (
                            tColsProps[j].children(row, i)
                          ) : (
                            tColsProps[j].children
                          )
                        ) : tColsProps[j]?.checkable ? (
                          <div className="inline-block mx-auto">
                            <Checkbox
                              checked={isSelected(row)}
                              onChange={() => onRowClick(row)}
                            />
                          </div>
                        ) : (
                          row[colProp]
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </tableCtx.Provider>
  )
}

export const Table = TableComp

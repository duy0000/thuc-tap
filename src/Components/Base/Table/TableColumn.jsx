import { memo, useContext, useEffect } from 'react'
import { tableCtx } from './token'

const TableColumn = memo(function TableColumn({
  prop = undefined,
  label = undefined,
  width = undefined,
  maxWidth = undefined,
  minWidth = undefined,
  align = undefined,
  valign = undefined,
  children = undefined,
  checkable = false,
  fiterable = false,
}) {
  const tableProvider = useContext(tableCtx)

  useEffect(() => {
    const columnConfig = {
      prop,
      label,
      width,
      maxWidth,
      minWidth,
      align,
      valign,
      checkable,
      children,
      fiterable,
    }

    tableProvider.onTableColumnCreated(columnConfig)
  }, [])

  useEffect(() => {
    if (label && children) {
      tableProvider.onTableColumnUpdated({
        label,
        children,
      })
    }
  }, [children, label])

  return null
})

export default TableColumn

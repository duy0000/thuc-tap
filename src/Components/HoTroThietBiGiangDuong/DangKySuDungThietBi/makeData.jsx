import React from 'react'
import PropTypes from 'prop-types'

function useMakeData({
  listDataSelected,
  onSelectedAll,
  onSelectedItem,
  onChangeQuantity,
}) {
  const heads = [
    {
      header: 'STT',
      accessorKey: ' ',
      enableRowSpan: true,
      cell: ({ cell }) => {
        return <span>{+cell?.row?.id + 1}</span>
      },
      columns: [],
      size: 40,
    },
    {
      header: 'Chọn',
      accessorKey: ' ',
      size: 40,
      cell: ({ cell }) => {
        return (
          <input
            id="default-checkbox"
            onChange={() => onSelectedItem(cell?.row?.original)}
            checked={listDataSelected?.has(cell?.row?.original?.DT_QLTS_TS_ID)}
            type="checkbox"
            defaultValue
            className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 focus:rounded"
          />
        )
      },
    },
    {
      header: 'Mã thiết bị/tài sản',
      size: 100,
      accessorKey: 'DT_QLTS_TS_MaTaiSan',
      meta: {
        filterVariant: 'text',
      },
    },
    {
      header: 'Tên thiết bị/tài sản',
      size: 200,
      accessorKey: 'DT_QLTS_TS_TenTaiSan',
      meta: {
        filterVariant: 'text',
      },
    },
    {
      header: 'Loại',
      size: 80,
      accessorKey: 'DT_QLTS_TS_LoaiTaiSan',
      meta: {
        filterVariant: 'text',
      },
    },
    {
      header: 'Phòng hiện tại',
      size: 180,
      accessorKey: 'DT_QLP_Phong_TenPhong',
      meta: {
        filterVariant: 'text',
      },
      columns: [
        {
          header: 'Loại2',
          accessorKey: 'DT_QLTS_TS_LoaiTaiSan',
          meta: {
            filterVariant: 'text',
          },
        },
        {
          header: 'Loại3',
          accessorKey: 'DT_QLTS_TS_LoaiTaiSan',
          meta: {
            filterVariant: 'text',
          },
        },
      ],
    },
    {
      header: 'Người quản lý',
      size: 180,
      accessorKey: 'DT_QLTS_TS_HTTS_NSQL_HoTen',
      meta: {
        filterVariant: 'text',
      },
    },
    {
      header: 'Số lượng',
      size: 100,
      accessorKey: ' ',
      cell: ({ cell }) => {
        return (
          <input
            type="number"
            id="number-input"
            aria-describedby="helper-text-explanation"
            onChange={(e) => {
              onChangeQuantity(
                cell?.row?.original?.DT_QLTS_TS_ID,
                e.target.value,
              )
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={0}
            value={
              listDataSelected.get(cell?.row?.original?.DT_QLTS_TS_ID)
                ?.SoLuong || 0
            }
            required={listDataSelected?.has(cell?.row?.original?.DT_QLTS_TS_ID)}
            disabled={
              !listDataSelected?.has(cell?.row?.original?.DT_QLTS_TS_ID)
            }
          />
        )
      },
    },
  ]

  return {
    heads,
  }
}

useMakeData.propTypes = {
  listDataSelected: PropTypes.array,
  onSelectedAll: PropTypes.func,
  onSelectedItem: PropTypes.func,
  onChangeQuantity: PropTypes.func,
}

export default useMakeData

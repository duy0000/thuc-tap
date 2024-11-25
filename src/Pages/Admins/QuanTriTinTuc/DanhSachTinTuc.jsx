import apiTinTuc from '@/Apis/Admin/apiTinTuc'
import QUAN_TRI_TIN_TUC_QUERY_KEY from '@/Services/QueryStores/QueryKeyStores/QuanTriTinTuc.querykey'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import { useEffect, useMemo, useState } from 'react'
import { convertBufferToBase64 } from '@/Services/Utils'
import Button from '@/Components/Base/Button/Button'
import DialogFormTinTuc from './DialogFormTinTuc'
import { toast } from 'react-toastify'
import Loading from '@/Components/Loading/Loading'

const initialDataFilter = {
  SoTrang: 1,
  SoBanGhiTrenTrang: 10,
  HT_TinTuc_TieuDe: '',
  HT_TinTuc_Link: '',
  HT_TinTuc_SV_STT: null,
  HT_TinTuc_GV_STT: null,
  HT_TinTuc_GV_IsThongBao: null,
  HT_TinTuc_GV_IsSuKien: null,
  HT_TinTuc_GV_IsTinTieuDiem: null,
}

export default function DanhSachTinTuc({
  dataFilter,
  tinTucSelected,
  onSelected,
}) {
  const [filter, setFilter] = useState(initialDataFilter)
  const [showDialogEdit, setShowDialogEdit] = useState(false)
  const [dataTinTucEdit, setDataTinTucEdit] = useState(null)
  const [pagination, setPagination] = useState({
    page: 1,
    rowsPerPage: 10,
  })

  const queryClient = useQueryClient()
  const { data: tinTucQuery, isLoading } = useQuery({
    queryKey: [QUAN_TRI_TIN_TUC_QUERY_KEY.GET_LIST, filter, pagination],
    queryFn: () => {
      return apiTinTuc.list({
        ...filter,
        SoTrang: pagination.page,
        SoBanGhiTrenTrang: pagination.rowsPerPage,
      })
    },
  })

  const deleteTinTucMutation = useMutation({
    mutationFn: apiTinTuc.delete,
  })

  const __tinTucList = useMemo(() => {
    return tinTucQuery?.data?.List_TinTuc || []
  }, [tinTucQuery])

  const __totalPage = useMemo(() => {
    return tinTucQuery?.data?.TotalPage || 0
  }, [tinTucQuery])

  const columns = [
    {
      id: 'stt',
      label: 'STT',
      minWidth: 60,
    },
    { id: 'tieude', label: 'Tiêu đề', minWidth: 120 },
    {
      id: 'anh',
      label: 'Ảnh',
      minWidth: 130,
      align: 'center',
      format: (value) => value,
    },
    {
      id: 'link',
      label: 'Link tin tức',
      minWidth: 130,
      align: 'center',
    },
    {
      id: 'loaitin',
      label: 'Loại tin tức',
      minWidth: 100,
      align: 'center',
      format: (value) => value,
    },
    {
      id: 'action',
      label: 'Thao tác',
      minWidth: 100,
      align: 'center',
    },
  ]

  useEffect(() => {
    if (dataFilter) {
      setFilter(dataFilter)
    }
  }, [dataFilter])

  const handleSelectedAll = () => {
    if (tinTucSelected.length === __tinTucList.length) {
      onSelected([])
    } else {
      onSelected(__tinTucList)
    }
  }

  const handleSelectedItem = (item) => {
    const index = tinTucSelected.findIndex(
      (i) => i.HT_TinTuc_ID === item.HT_TinTuc_ID,
    )
    if (index > -1) {
      onSelected(
        tinTucSelected.filter((i) => i.HT_TinTuc_ID !== item.HT_TinTuc_ID),
      )
    } else {
      onSelected([...tinTucSelected, item])
    }
  }

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 800 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={
                      tinTucSelected.length > 0 &&
                      tinTucSelected.length < __tinTucList.length
                    }
                    checked={
                      tinTucSelected.length > 0 &&
                      tinTucSelected.length === __tinTucList.length
                    }
                    onChange={handleSelectedAll}
                    inputProps={{
                      'aria-label': 'select all desserts',
                    }}
                  />
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    variant="head"
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    sx={{ fontWeight: 'bold', color: '#336699' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading && <Loading />}
              {Array.isArray(__tinTucList) && __tinTucList.length > 0 ? (
                __tinTucList.map((tinTuc, index) => {
                  const isItemSelected =
                    tinTucSelected.findIndex(
                      (item) => item.HT_TinTuc_ID === tinTuc.HT_TinTuc_ID,
                    ) > -1
                  const fileBase64 =
                    tinTuc?.HT_TinTuc_Anh &&
                    convertBufferToBase64(tinTuc?.HT_TinTuc_Anh?.data)
                  const srcImagePreview = tinTuc?.HT_TinTuc_Anh
                    ? `data:${tinTuc.HT_TinTuc_TenAnh?.split('.').pop()};base64,${fileBase64}`
                    : '/images/no-image.jpg'

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      selected={isItemSelected}
                      key={tinTuc?.HT_TinTuc_ID || index}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          // indeterminate={true}
                          checked={isItemSelected}
                          onChange={() => handleSelectedItem(tinTuc)}
                          inputProps={{
                            'aria-label': 'select all desserts',
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        {Number(pagination.page - 1) * pagination.rowsPerPage +
                          index +
                          1}
                      </TableCell>
                      <TableCell>{tinTuc?.HT_TinTuc_TieuDe}</TableCell>
                      <TableCell>
                        <img
                          src={srcImagePreview}
                          width={128}
                          height={128}
                          className="object-cover w-32 h-32 rounded-md border"
                          alt={tinTuc.HT_TinTuc_TenAnh}
                          title={tinTuc.HT_TinTuc_TenAnh}
                        />
                      </TableCell>
                      <TableCell>
                        <a
                          className="text-sky-800 underline"
                          href={tinTuc?.HT_TinTuc_Link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {tinTuc?.HT_TinTuc_Link}
                        </a>
                      </TableCell>
                      <TableCell>
                        {tinTuc?.HT_TinTuc_GV_IsThongBao
                          ? 'Thông báo'
                          : tinTuc?.HT_TinTuc_GV_IsSuKien
                            ? 'Sự kiện'
                            : 'Tin tiêu điểm'}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col md:flex-row items-center gap-x-2">
                          <Button
                            color="warn"
                            onClick={() => {
                              setDataTinTucEdit(tinTuc)
                              setShowDialogEdit(true)
                            }}
                          >
                            Sửa
                          </Button>
                          <Button
                            color="danger"
                            onClick={() => {
                              try {
                                deleteTinTucMutation
                                  .mutateAsync(tinTuc.HT_TinTuc_ID)
                                  .then((res) => {
                                    if (res?.data?.code === 200) {
                                      toast.success('Xóa tin tức thành công!')
                                      queryClient.invalidateQueries({
                                        queryKey: [
                                          QUAN_TRI_TIN_TUC_QUERY_KEY.GET_LIST,
                                        ],
                                      })
                                    }
                                  })
                                  .catch(() => {
                                    toast.error(
                                      'Có lỗi xảy ra khi xóa tin tức. Vui lòng thử lại hoặc liên hệ bộ phận kỹ thuật để khắc phục!',
                                    )
                                  })
                              } catch (error) {
                                toast.error(
                                  'Có lỗi xảy ra khi xóa tin tức. Vui lòng thử lại hoặc liên hệ bộ phận kỹ thuật để khắc phục!',
                                )
                                console.error(error)
                              }
                            }}
                          >
                            Xóa
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableCell colSpan={8}>Không có dữ liệu!</TableCell>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          labelRowsPerPage="Số bản ghi trên trang"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} trong tổng số ${count !== -1 ? count : `nhiều hơn ${to}`}`
          }
          count={__totalPage * pagination.rowsPerPage}
          rowsPerPage={pagination.rowsPerPage}
          page={Number(pagination.page) - 1}
          onPageChange={(e, value) => {
            setPagination({
              ...pagination,
              page: value + 1,
            })
          }}
          onRowsPerPageChange={(e) => {
            setPagination({
              ...pagination,
              rowsPerPage: Number(e.target.value),
            })
          }}
          showFirstButton
          showLastButton
        />
      </Paper>
      <DialogFormTinTuc
        dataDetail={dataTinTucEdit}
        open={showDialogEdit}
        onClose={() => {
          setShowDialogEdit(false)
        }}
      />
    </>
  )
}

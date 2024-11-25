import { useState } from 'react'
import Button from '@/Components/Base/Button/Button'
import DanhSachTinTuc from './DanhSachTinTuc'
import DialogFormTinTuc from './DialogFormTinTuc'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiTinTuc from '@/Apis/Admin/apiTinTuc'
import { toast } from 'react-toastify'
import { asyncPool } from '@/Services/Utils/poolData'
import QUAN_TRI_TIN_TUC_QUERY_KEY from '@/Services/QueryStores/QueryKeyStores/QuanTriTinTuc.querykey'
import DialogFilterTinTuc from './DialogFilterTinTuc'

function QuanTriTinTucView() {
  const [showDialogAdd, setShowDialogAdd] = useState(false)
  const [showDialogFilter, setShowDialogFilter] = useState(false)
  const [tinTucSelected, setTinTucSelected] = useState([])
  const [dataFilter, setDataFilter] = useState({
    SoTrang: 1,
    SoBanGhiTrenTrang: 10,
    HT_TinTuc_TieuDe: '',
    HT_TinTuc_Link: '',
    HT_TinTuc_SV_STT: '',
    HT_TinTuc_GV_STT: '',
    HT_TinTuc_GV_IsThongBao: '',
    HT_TinTuc_GV_IsSuKien: '',
    HT_TinTuc_GV_IsTinTieuDiem: '',
  })

  const queryClient = useQueryClient()
  const deleteTinTucMutation = useMutation({
    mutationFn: apiTinTuc.delete,
  })

  function RenderAction() {
    return (
      <div className="flex gap-x-4">
        <Button
          disabled={deleteTinTucMutation.isPending}
          isLoading={deleteTinTucMutation.isPending}
          onClick={() => setShowDialogAdd(true)}
        >
          Thêm
        </Button>
        <Button
          disabled={deleteTinTucMutation.isPending}
          isLoading={deleteTinTucMutation.isPending}
          color="danger"
          onClick={async () => {
            if (deleteTinTucMutation.isPending) return
            if (tinTucSelected.length === 0) {
              toast.error('Vui lòng chọn tin tức cần xóa')
              return
            }

            const tinTucSelectedIds = tinTucSelected.map(
              (tinTuc) => tinTuc.HT_TinTuc_ID,
            )

            try {
              const multiRes = await asyncPool(
                5,
                tinTucSelectedIds,
                deleteTinTucMutation.mutateAsync,
              )
              if (
                multiRes?.length === tinTucSelectedIds.length &&
                multiRes.every((res) => res?.data?.code === 200)
              ) {
                toast.success('Xóa tin tức thành công')
                queryClient.invalidateQueries({
                  queryKey: [QUAN_TRI_TIN_TUC_QUERY_KEY.GET_LIST],
                })
                setTinTucSelected([])
              }
            } catch (error) {
              toast.error(
                'Có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ bộ phận kỹ thuật để khắc phục!',
              )
            }
          }}
        >
          Xóa {tinTucSelected.length > 0 ? `(${tinTucSelected.length})` : ''}
        </Button>
        <Button
          disabled={deleteTinTucMutation.isPending}
          isLoading={deleteTinTucMutation.isPending}
          onClick={() => setShowDialogFilter(true)}
        >
          Tìm kiếm nâng cao
        </Button>
        <Button
          disabled={deleteTinTucMutation.isPending}
          isLoading={deleteTinTucMutation.isPending}
          onClick={() => {
            setDataFilter({
              SoTrang: 1,
              SoBanGhiTrenTrang: 10,
              HT_TinTuc_TieuDe: '',
              HT_TinTuc_Link: '',
              HT_TinTuc_SV_STT: null,
              HT_TinTuc_GV_STT: null,
              HT_TinTuc_GV_IsThongBao: null,
              HT_TinTuc_GV_IsSuKien: null,
              HT_TinTuc_GV_IsTinTieuDiem: null,
            })
            queryClient.invalidateQueries({
              queryKey: [QUAN_TRI_TIN_TUC_QUERY_KEY.GET_LIST],
            })
          }}
          color="success"
        >
          Làm mới
        </Button>
      </div>
    )
  }

  return (
    <section className="bg-white h-full p-2 rounded-md min-h-[600px] shadow-md">
      <h3 className="mb-6 font-bold text-sky-800 md:text-xl uppercase text-center">
        Quản trị tin tức
      </h3>
      <RenderAction />
      <div className="mt-6">
        <DanhSachTinTuc
          dataFilter={dataFilter}
          tinTucSelected={tinTucSelected}
          onSelected={setTinTucSelected}
        />
      </div>
      <DialogFormTinTuc
        open={showDialogAdd}
        onClose={() => {
          setShowDialogAdd(false)
        }}
      />
      <DialogFilterTinTuc
        open={showDialogFilter}
        onClose={() => {
          setShowDialogFilter(false)
        }}
        dataFilter={dataFilter}
        onFilter={setDataFilter}
      />
    </section>
  )
}

export default QuanTriTinTucView

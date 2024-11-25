import { useContext, useMemo, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import Button from '@/Components/Base/Button/Button'
import { TextEditor } from '@/Components/TextEditor/TextEditor'
import { useGopYStore } from '@/Services/Store/Module/KiemDinhChatLuong/gopY'
import { HoSoKiemDinhCtx } from '@/Services/Tokens'
import { DataCanBoGV, transformCls } from '@/Services/Utils'
import { required } from '@/Services/Validators/required'
import { postGopY, putGopY } from '@/Apis/KDCL'
import Icon from '@/Components/Base/Icon/Icon'
import CloseCircle from '@/Components/Base/Icons/CloseCircle'
import Comment from './Comment'
import CommentSkeleton from './CommentSkeleton'
import CommentPreview from './CommentPreview'

export default function GopY() {
  const dataUser = DataCanBoGV()

  const hoSoKiemDinh = useContext(HoSoKiemDinhCtx)

  const {
    listGopY,
    refetch: refetchListGopY,
    isLoading: isLoadingListGopY,
  } = useGopYStore()

  const textEditorRef = useRef()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)
  const [tab, setTab] = useState(1)
  const [isPosting, setIsPosting] = useState(false)
  const [comment, setComment] = useState({
    KT_KDCL_CTDT_GopY_TDG_NoiDung: '',
    KT_KDCL_CTDT_GopY_TDG_Cha: null,
    KT_KDCL_CTDT_GopY_TDG_HinhAnh_JSON: '',
  })

  const listGopYTrongHoiDong = useMemo(() => {
    return listGopY.filter(
      (e) =>
        e.KT_KDCL_CTDT_GopY_TDG_IDThanhLapHoiDong ==
        hoSoKiemDinh.hoiDong?.KT_KDCL_CTDT_ThanhLapHoiDong_ID,
    )
  }, [listGopY, hoSoKiemDinh.hoiDong])

  const listGopYGroupByIDCha = useMemo(() => {
    return listGopYTrongHoiDong.reduce((acc, cur) => {
      if (cur.KT_KDCL_CTDT_GopY_TDG_Cha) {
        if (!acc[cur.KT_KDCL_CTDT_GopY_TDG_Cha]) {
          acc[cur.KT_KDCL_CTDT_GopY_TDG_Cha] = []
        }
        acc[cur.KT_KDCL_CTDT_GopY_TDG_Cha].push(cur)
      }
      return acc
    }, {})
  }, [listGopYTrongHoiDong])

  const listGopYPaginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    const end = start + pageSize
    return listGopYTrongHoiDong.slice(start, end)
  }, [listGopYGroupByIDCha, currentPage, pageSize])

  const validate = () =>
    [
      required(
        comment.KT_KDCL_CTDT_GopY_TDG_NoiDung,
        'Nội dung không được bỏ trống',
      ),
    ].every((e) => e)

  const handleSubmit = async () => {
    if (isPosting || !validate()) return

    try {
      setIsPosting(true)
      let action = postGopY
      if (comment.KT_KDCL_CTDT_GopY_TDG_ID) {
        action = putGopY
      }
      await action({
        ...comment,
        KT_KDCL_CTDT_GopY_TDG_IDThanhLapHoiDong:
          hoSoKiemDinh.hoiDong.KT_KDCL_CTDT_ThanhLapHoiDong_ID,
        KT_KDCL_CTDT_GopY_TDG_MaNhanSu: dataUser.MaNhanSu,
      })
      await refetchListGopY()
      setComment({
        KT_KDCL_CTDT_GopY_TDG_NoiDung: '',
        KT_KDCL_CTDT_GopY_TDG_Cha: null,
        KT_KDCL_CTDT_GopY_TDG_HinhAnh_JSON: '',
      })
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Thông báo',
        text: 'Đã có lỗi xảy ra, vui lòng thử lại sau!',
      })
    } finally {
      setIsPosting(false)
    }
  }

  const onEdit = (comment) => {
    setComment(comment)
    setTab(1)

    setTimeout(() => {
      textEditorRef.current?.focus()
    })
  }

  const onReply = (comment) => {
    setComment({
      KT_KDCL_CTDT_GopY_TDG_Cha: comment.KT_KDCL_CTDT_GopY_TDG_ID,
      KT_KDCL_CTDT_GopY_TDG_NoiDung: ``,
    })
    setTab(1)

    setTimeout(() => {
      textEditorRef.current?.focus()
    })
  }

  const MAX_LEVEL = 3

  const renderComment = (comment, level = 1) => {
    const renderLevel = level > MAX_LEVEL ? MAX_LEVEL : level

    return (
      <Comment
        key={comment.KT_KDCL_CTDT_GopY_TDG_ID}
        comment={comment}
        onEdit={() => onEdit(comment)}
        onReply={() => onReply(comment)}
        level={renderLevel}
        MAX_LEVEL={MAX_LEVEL}
      >
        {listGopYGroupByIDCha[comment.KT_KDCL_CTDT_GopY_TDG_ID]?.map((cmt) =>
          renderComment(cmt, renderLevel + 1),
        )}
      </Comment>
    )
  }

  return (
    <div className="flex flex-col flex-1 gap-2">
      {isLoadingListGopY ? (
        <div className="flex flex-col gap-3 p-5 rounded-lg shadow-sm bg-white">
          {Array.from({ length: 5 })
            .fill(0)
            .map((_, i) => (
              <CommentSkeleton key={i} />
            ))}
        </div>
      ) : listGopYPaginated.length ? (
        <div className="flex flex-col gap-3 p-5 rounded-lg bg-white">
          {listGopYPaginated.map(
            (comment) =>
              !comment.KT_KDCL_CTDT_GopY_TDG_Cha && renderComment(comment),
          )}
        </div>
      ) : null}

      <div className="flex flex-col gap-3 p-5 rounded-lg bg-white">
        <div className="flex gap-1 bg-slate-100 w-max p-1 rounded-md">
          <button
            className={transformCls([
              'bg-none border-none hover:bg-white px-3 py-[2px] rounded',
              tab == 1 ? 'text-slate-700 bg-white' : '',
            ])}
            onClick={() => setTab(1)}
          >
            Chỉnh sửa
          </button>
          <button
            className={transformCls([
              'bg-none border-none hover:bg-white px-3 py-[2px] rounded',
              tab == 2 ? 'text-slate-700 bg-white' : '',
            ])}
            onClick={() => setTab(2)}
          >
            Xem trước
          </button>
        </div>

        <div
          className="flex-col gap-3"
          style={{ display: tab == 1 ? 'flex' : 'none' }}
        >
          {comment.KT_KDCL_CTDT_GopY_TDG_Cha ? (
            <div className="flex items-center gap-2">
              Đang trả lời:{' '}
              <strong>
                {
                  listGopYTrongHoiDong.find(
                    (e) =>
                      e.KT_KDCL_CTDT_GopY_TDG_ID ==
                      comment.KT_KDCL_CTDT_GopY_TDG_Cha,
                  ).KT_KDCL_CTDT_GopY_TDG_HoTen
                }
              </strong>
              <button
                onClick={() =>
                  setComment({ ...comment, KT_KDCL_CTDT_GopY_TDG_Cha: null })
                }
                className="icon-btn"
              >
                <Icon>
                  <CloseCircle />
                </Icon>
              </button>
            </div>
          ) : null}
          <TextEditor
            ref={textEditorRef}
            value={comment.KT_KDCL_CTDT_GopY_TDG_NoiDung}
            onChange={(val) =>
              setComment({
                ...comment,
                KT_KDCL_CTDT_GopY_TDG_NoiDung: val,
              })
            }
          />
          <Button
            isLoading={isPosting}
            disabled={
              !hoSoKiemDinh.hoiDong ||
              !comment.KT_KDCL_CTDT_GopY_TDG_NoiDung.trim()
            }
            onClick={handleSubmit}
            className="w-max !z-0"
          >
            Góp ý
          </Button>
        </div>
        <div style={{ display: tab == 2 ? 'block' : 'none' }}>
          <CommentPreview content={comment.KT_KDCL_CTDT_GopY_TDG_NoiDung} />
        </div>
      </div>
    </div>
  )
}

import DOMPurify from 'dompurify'
import { DataCanBoGV, dayjs, transformCls } from '@/Services/Utils'
import { Popper, PopperContent, PopperTrigger } from '@/Components/Base'

export default function Comment({
  comment = {},
  onReply,
  onEdit,
  children,
  level,
  MAX_LEVEL,
}) {
  const dataUser = DataCanBoGV()

  return (
    <>
      <div
        className={transformCls([
          'ql-quill ql-snow bg-input-bg pl-4 pr-4 py-2 rounded-xl',
          level == 1
            ? ''
            : 'relative before:absolute before:top-1/2 before:-translate-y-1/2 before:right-full before:w-5 before:h-[1px] before:bg-slate-200 before:z-0',
        ])}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{comment.KT_KDCL_CTDT_GopY_TDG_HoTen}</h3>

          {comment.KT_KDCL_CTDT_GopY_TDG_DateEditor &&
            comment.KT_KDCL_CTDT_GopY_TDG_DateCreate !==
              comment.KT_KDCL_CTDT_GopY_TDG_DateEditor && (
              <Popper>
                <PopperTrigger>
                  <button className="text-[11px] hover:underline text-slate-500">
                    Đã chỉnh sửa
                  </button>
                </PopperTrigger>

                <PopperContent>
                  {dayjs(comment.KT_KDCL_CTDT_GopY_TDG_DateEditor)
                    .utc()
                    .format('DD-MM-YYYY HH:mm:ss')}
                </PopperContent>
              </Popper>
            )}
        </div>
        <div
          className="ql-editor !p-0 !h-auto"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(comment.KT_KDCL_CTDT_GopY_TDG_NoiDung),
          }}
        />

        <div className="flex gap-3 items-center mt-1">
          <Popper>
            <PopperTrigger>
              <button className="text-[11px] text-slate-500 hover:underline cursor-pointer">
                {dayjs(comment.KT_KDCL_CTDT_GopY_TDG_DateCreate)
                  .utc()
                  .from(dayjs(new Date()).utc(7))}
              </button>
            </PopperTrigger>

            <PopperContent>
              {dayjs(comment.KT_KDCL_CTDT_GopY_TDG_DateCreate)
                .utc()
                .format('DD-MM-YYYY HH:mm:ss')}
            </PopperContent>
          </Popper>

          <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
          <button
            onClick={onReply}
            className="font-medium text-xs hover:underline"
          >
            Phản hồi
          </button>
          {dataUser.MaNhanSu === comment.KT_KDCL_CTDT_GopY_TDG_MaNhanSu && (
            <>
              <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
              <button
                onClick={onEdit}
                className="font-medium text-xs hover:underline"
              >
                Chỉnh sửa
              </button>
            </>
          )}
        </div>
      </div>

      {/* Render children comments if any */}
      {children && level < MAX_LEVEL ? (
        <div
          className={transformCls([
            'pl-5 flex flex-col gap-2 border-l border-l-slate-200/50',
            // 'relative last-of-type:before:absolute last-of-type:before:left-[-1px] last-of-type:before:bottom-0 last-of-type:before:w-5 last-of-type:before:h-[45px] last-of-type:before:bg-white last-of-type:before:z-0',
          ])}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </>
  )
}

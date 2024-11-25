import { Popper, PopperContent, PopperTrigger } from '@/Components/Base'
import { DataCanBoGV, dayjs } from '@/Services/Utils'
import DOMPurify from 'dompurify'

export default function CommentPreview({ content }) {
  const dataUser = DataCanBoGV()
  return (
    <div className="ql-quill ql-snow bg-input-bg pl-3 pr-4 py-1 rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">
          {dataUser.HoDem} {dataUser.Ten}
        </h3>
      </div>
      <div
        className="ql-editor !p-0 !h-auto"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(content),
        }}
      />

      <div className="flex gap-3 items-center mt-1">
        <Popper>
          <PopperTrigger>
            <button className="text-[11px] text-slate-500 hover:underline cursor-pointer">
              {dayjs().fromNow()}
            </button>
          </PopperTrigger>
          <PopperContent>{dayjs().format('DD-MM-YYYY HH:mm:ss')}</PopperContent>
        </Popper>

        <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
        <button className="font-medium text-xs hover:underline">
          Phản hồi
        </button>

        <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
        <button className="font-medium text-xs hover:underline">
          Chỉnh sửa
        </button>
      </div>
    </div>
  )
}

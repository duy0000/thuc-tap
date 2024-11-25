import { transformCls } from '@/Services/Utils'
import Icon from '../Icon/Icon'
import { CgClose } from 'react-icons/cg'

export function Chip({
  normal,
  itemHtml,
  text,
  onClose = () => {},
  closable = true,
}) {
  return (
    <div
      className={transformCls([
        'relative line-clamp-1',
        'rounded-lg selet-none text-vs-text flex items-center justify-center gap-1 h-6 px-1',
        normal
          ? ''
          : 'bg-white border border-slate-200/90 hover:border-uneti-primary',
      ])}
    >
      {itemHtml ? (
        <div dangerouslySetInnerHTML={{ __html: text }} />
      ) : (
        <div>{text}</div>
      )}

      {/* Closeable */}
      {closable && (
        <div
          onClick={(event) => {
            event.stopPropagation()
            onClose()
          }}
          className="text-gray-400 border-l px-1 ml-[3px] -mr-1 h-min w-min flex items-center justify-center hover:text-red-400"
        >
          <Icon size={12}>
            <CgClose />
          </Icon>
        </div>
      )}
    </div>
  )
}

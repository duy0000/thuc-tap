import { dayjs } from '@/Services/Utils'
import { Link } from 'react-router-dom'

export default function Notification({
  openDetail,
  title,
  description,
  date,
  url,
}) {
  // openDetail: Mở modal chi tiết thông báo
  return (
    <Link to={url}>
      <div
        className="w-[320px] hover:bg-gray-100 rounded px-2 py-1 cursor-pointer"
        onClick={openDetail}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-gray-800 font-medium">{title}</h3>
          <p className="text-gray-500/80 text-xs">
            {dayjs(date).utc().format('HH:mm:ss - DD/MM/YYYY')}
          </p>
        </div>

        <p className="text-gray-500 line-clamp-2">{description}</p>
      </div>
    </Link>
  )
}

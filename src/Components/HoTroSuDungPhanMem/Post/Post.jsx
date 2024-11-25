import { useNamespace } from '@/Services/Hooks'
import PropTypes from 'prop-types'

import './Post.scss'
import { handleDownloadFileBase64 } from '@/Services/Utils/fileUtils'
import { convertBufferToBase64 } from '@/Services/Utils/stringUtils'
import { Link } from 'react-router-dom'

const LINK_YOUTUBE_REGEX = /https:\/\/www\.youtube\.com\/\S+/g

export const Post = ({
  DT_CVNB_TBGD_TL_Ten,
  DT_CVNB_TBGD_TL_GhiChu,
  DT_CVNB_TBGD_TL_URL,
  DT_CVNB_TBGD_TL_TenFile,
  DT_CVNB_TBGD_TL_DataFile,
}) => {
  const bem = useNamespace('post')

  let video = DT_CVNB_TBGD_TL_GhiChu?.match(LINK_YOUTUBE_REGEX)?.[0]

  const ghiChu = DT_CVNB_TBGD_TL_GhiChu.replace(LINK_YOUTUBE_REGEX, '')

  const userCanDownloadFile =
    DT_CVNB_TBGD_TL_TenFile && DT_CVNB_TBGD_TL_DataFile

  const handleDownloadFile = () => {
    handleDownloadFileBase64(
      DT_CVNB_TBGD_TL_TenFile,
      convertBufferToBase64(DT_CVNB_TBGD_TL_DataFile?.data),
    )
  }

  return (
    <div className={bem.b()}>
      <h3 className={bem.e('title')}>{DT_CVNB_TBGD_TL_Ten}</h3>

      <pre className={`${bem.e('description')} mb-4 font-sans`}>{ghiChu}</pre>

      <div className="flex justify-between items-center">
        {userCanDownloadFile && (
          <div
            className={bem.e('download-button')}
            onClick={handleDownloadFile}
          >
            Tải file
          </div>
        )}
        {DT_CVNB_TBGD_TL_URL && (
          <Link
            className={bem.e('download-button')}
            to={DT_CVNB_TBGD_TL_URL}
            target="_blank"
          >
            {DT_CVNB_TBGD_TL_URL.includes(
              'https://support.uneti.edu.vn/storages/',
            )
              ? 'Tải file'
              : 'Xem hướng dẫn'}
          </Link>
        )}
      </div>
    </div>
  )
}

Post.propTypes = {
  DT_CVNB_TBGD_TL_Ten: PropTypes.string,
  DT_CVNB_TBGD_TL_GhiChu: PropTypes.string,
}

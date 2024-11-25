import { useNamespace } from '@/Services/Hooks'
import { useEffect, useRef } from 'react'

import './FileSelect.scss'
import Resumable from 'resumablejs'
import { FaPlus } from 'react-icons/fa6'
import Swal from 'sweetalert2'
import { transformCls } from '@/Services/Utils/reactUtils'
import { humanFileSize } from '@/Services/Utils'

export const FileSelect = (props) => {
  const {
    maxFiles = 1,
    maxFileSize = undefined,
    fileType = ['jpg', 'jpeg', 'png'],
    allowAllFileType = false,
    handleFilesChange,
    width = 40,
    height = 40,
    icon = <FaPlus />,
    children,
  } = props

  const fileId = `file-${Math.random(1111, 9999) * 1000}`

  const bem = useNamespace('file-select')

  const browseFile = useRef()

  useEffect(() => {
    const resumable = new Resumable({
      fileType: allowAllFileType ? undefined : fileType,
      chunkSize: 200 * 1000 * 1000, // 200M
      maxFileSize: maxFileSize,
      maxFiles: maxFiles,
      fileTypeErrorCallback() {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: `Chỉ chấp nhận các file ${fileType.join(', ')}`,
        })
      },
      maxFilesErrorCallback() {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: `Chỉ được chọn tối đa ${maxFiles} ${
            maxFiles == 1 ? 'file' : 'files'
          }!`,
        })
      },
      maxFileSizeErrorCallback() {
        maxFileSize &&
          Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: `File không được vượt quá ${humanFileSize(maxFileSize, true)}!`,
          })
      },
      minFileSizeErrorCallback(file, errorCount) {
        console.log({ file, errorCount })
      },
    })

    resumable.assignBrowse(browseFile.current, false)
    resumable.assignDrop(browseFile.current)

    resumable.on('fileAdded', (file) => {
      handleFilesChange(file.file)
    })
  }, [])

  return (
    <div
      ref={browseFile}
      data-dropzone-id={fileId}
      id={fileId}
      className={transformCls([children ? bem.b('has-children') : bem.b()])}
      style={
        children
          ? {}
          : {
              width: `${width}px`,
              height: `${height}px`,
            }
      }
    >
      {children ? children : <span className={bem.e('icon')}>{icon}</span>}
      {/* <p className={bem.e('label')}>{label}</p> */}
    </div>
  )
}

FileSelect.displayName = 'FileSelect'

export default FileSelect

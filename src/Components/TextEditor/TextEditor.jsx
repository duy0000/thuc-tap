import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import PropTypes from 'prop-types'
import Swal from 'sweetalert2'

const TextEditor = forwardRef(function TextEditor(props, ref) {
  const {
    id,
    value,
    onChange,
    imageMaxFileSize = 1024 * 1024 * 10,
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif'],
  } = props

  const reactQuillRef = useRef(null)

  const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    ['link'],
    ['code-block'],
    ['clean'],
    ['image'],
  ]

  const handleChangeValue = (value) => {
    onChange(value)
  }

  function insertImage() {
    const range = reactQuillRef.current.getEditor().getSelection(true)
    const editor = reactQuillRef.current.getEditor()
    editor.insertEmbed(range.index, 'image', this.result)
  }

  const validateFile = (file) => {
    if (!allowedTypes.includes(file.type)) {
      Swal.fire({
        icon: 'warning',
        title: 'File không đúng định dạng',
        text: 'Vui lòng chọn file khác!',
      })
      return false
    }
    if (file.size > imageMaxFileSize) {
      Swal.fire({
        icon: 'warning',
        title: 'File quá lớn',
        text: 'Vui lòng chọn file khác!',
      })
      return false
    }

    return true
  }

  const imageHandler = useCallback(() => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
    input.onchange = async () => {
      if (input !== null && input.files !== null) {
        const file = input.files[0]

        if (!validateFile(file)) return

        const reader = new FileReader()
        reader.onload = insertImage
        reader.readAsDataURL(file)
      }
    }
  }, [])

  useImperativeHandle(ref, () => ({
    // focus to current selection
    focus: () => {
      reactQuillRef.current?.focus()
    },
    reactQuillRef,
  }))

  return (
    <ReactQuill
      ref={reactQuillRef}
      id={id}
      theme="snow"
      placeholder="Nhập nội dung..."
      modules={{
        toolbar: {
          container: TOOLBAR_OPTIONS,
          handlers: {
            image: imageHandler,
          },
        },
      }}
      value={value}
      onChange={handleChangeValue}
    />
  )
})

TextEditor.propTypes = {
  onChange: PropTypes.func,
  id: PropTypes.string,
}

export { TextEditor }
export default TextEditor

import clsx from 'clsx'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export default function LoadingProgress({
  loading = false,
  selectedItems = 1, // Số phần tử đã chọn
  progressStartColorTW = 'bg-red-600',
  progressProcessingColorTW = 'bg-cyan-600',
  progressSuccessColorTW = 'bg-green-600',
  progressHeight = 40,
  progressMinWidth = 200,
  iconAlert,
  titleAlert,
  textAlert,
}) {
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    let interval
    // Thời gian để đi từ 0 - 100% phụ thuộc vào số phần tử đã chọn
    const loadingDuration = selectedItems * 3000 // 3 giây cho mỗi phần tử
    const countUpgrade = Math.ceil(100 / (loadingDuration / 1000)) // Mức tăng theo thời gian

    if (loading) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + countUpgrade
          return newProgress > 100 ? 100 : newProgress
        })
      }, 1000) // Cập nhật mỗi giây
    } else {
      setProgress(100)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [loading, selectedItems])

  useEffect(() => {
    if (progress === 100 && loading === false) {
      const timeout = setTimeout(() => {
        setFadeOut(true)
        Swal.fire({
          icon: iconAlert ?? 'success',
          title: titleAlert ?? 'Thông báo',
          text: textAlert ?? 'Thao tác thành công!',
        })
      }, 3000)

      return () => clearTimeout(timeout)
    }
  }, [progress])

  return (
    <div
      className={clsx(
        'fixed inset-0 min-h-full bg-slate-100/50 flex items-center justify-center px-4 transition-opacity duration-500',
        fadeOut && 'opacity-0',
      )}
    >
      <div
        className={`min-w-[300px] md:min-w-[${progressMinWidth}px] bg-slate-100 rounded-full border animate-pulse`}
      >
        <div
          className={clsx(
            'animate-pulse rounded-full flex items-center justify-center text-white font-semibold',
            progress === 100 && progressSuccessColorTW,
            progress < 100 && progress >= 50 && progressProcessingColorTW,
            progress < 50 && progressStartColorTW,
          )}
          style={{ width: `${progress}%`, height: `${progressHeight}px` }}
          aria-hidden="true"
        >
          <p
            className={clsx(
              'flex items-center text-white whitespace-nowrap',
              progress < 20 || progress === 20 ? '' : 'text-lg',
            )}
          >
            {progress < 100 && loading ? (
              <>
                <span>{progress}</span>
                <span>%</span>
              </>
            ) : (
              <span>Vui lòng chờ</span>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

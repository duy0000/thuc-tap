import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { FaArrowUpLong } from 'react-icons/fa6'
function ButtonScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      onClick={handleBackToTop}
      className={clsx(
        'fixed bottom-6 right-6 z-50 w-12 h-12 bg-white/50 border rounded-full flex items-center justify-center cursor-pointer hover:bg-sky-800/50 hover:text-white',
        !isVisible && 'hidden',
      )}
    >
      <FaArrowUpLong className="hover:text-white" />
    </div>
  )
}

export default ButtonScrollToTop

export const MenuSlash = () => {
  return (
    <svg
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        textAlign: 'center',
        transition: 'all 0.2s linear',
        transform: 'translate(-50%, -50%) scale(0) rotate(360deg)',
      }}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 7H21"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9.48999 12H21"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M3 12H5.99"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M3 17H21"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

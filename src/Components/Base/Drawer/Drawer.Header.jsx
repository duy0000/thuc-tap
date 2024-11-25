export const DrawerHeader = ({ children }) => {
  return (
    <div className="mb-auto w-full border-b border-b-gray-200 border-b-solid md:pt-2 pb-3 md:pb-5">
      {children}
    </div>
  )
}

DrawerHeader.displayName = 'DrawerHeader'

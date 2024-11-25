import MainCommon from './Layouts/Mains/MainCommon'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import '@/assets/Styles/index.scss'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { apiCommon } from './Apis/Common'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    apiCommon.apiVersion(
      {
        HT_TTPB_Loai: '1',
        HT_TTPB_LoaiPhanMem: 'Web',
      },
      dispatch,
    )
    apiCommon.apiWeather(dispatch)
  }, [])

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <MainCommon />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App

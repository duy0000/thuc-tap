import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'animate.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// context
import { Provider } from 'react-redux'
import { persistor, store } from './Services/Redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// timezone
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/vi'

// middleware
import BoundaryMiddleware from './Middlewares/BoundaryMiddleware.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BoundaryMiddleware>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </BoundaryMiddleware>
        </PersistGate>
      </Provider>
    </LocalizationProvider>
    <ToastContainer />
  </>,
  // </StrictMode>,
)

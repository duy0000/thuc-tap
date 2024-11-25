import ChinhSachBaoMat from '@/Pages/Clients/Common/ChinhSachBaoMat/ChinhSachBaoMat'
import Default from '@/Pages/Default'
import { Error403 } from '@/Pages/Errors/403/Error403'
import Login from '@/Pages/Login/Login'
import { Route } from 'react-router-dom'

export const publicRoutes = (
  <>
    <Route path={'/'}>
      <Route index element={<Default />} />
      <Route path="/dang-nhap" element={<Login />} />
      <Route path="/chinh-sach-bao-mat" element={<ChinhSachBaoMat />} />
      <Route path="/error/403" element={<Error403 />} />
    </Route>
  </>
)

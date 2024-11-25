import Loading from '@/Components/Loading/Loading'
import Box from '@/Components/MotCua/Box'
import { useLocation } from 'react-router-dom'
import DanhSachTaiSanTraCuu from './DanhSachTaiSanTraCuu'

const TraCuuTaiSanView = (props) => {
  const { loading, listTaiSan, itemPerPage, setItemPerPage, maTaiSanTheoID } =
    props

  const location = useLocation()
  const { pathname } = location

  const breadcrumbs = [
    {
      title: 'Tra cứu tài sản',
      path: pathname,
    },
  ]

  const home = {
    path: '/ho-tro-thiet-bi-phan-mem',
    title: 'Hỗ trợ thiết bị, phần mềm',
  }

  return (
    <>
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="rounded-md bg-white p-4">
          <Box home={home} breadcrumbs={breadcrumbs}>
            <div className="col-span-2">
              <h2 className="text-center text-4xl font-bold uppercase text-uneti-primary">
                Tra cứu
              </h2>
              <div className="tracuu__box">
                <div className="tracuu__list select-none">
                  <DanhSachTaiSanTraCuu
                    listTaiSan={listTaiSan}
                    itemPerPage={itemPerPage}
                    setItemPerPage={setItemPerPage}
                    maTaiSanTheoID={maTaiSanTheoID}
                  />
                </div>
              </div>
            </div>
          </Box>
        </div>
      )}
    </>
  )
}

export default TraCuuTaiSanView

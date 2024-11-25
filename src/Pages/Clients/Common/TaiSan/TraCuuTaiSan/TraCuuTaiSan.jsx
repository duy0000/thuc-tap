import { useEffect, useState } from 'react'
import TraCuuTaiSanView from './TraCuuTaiSanView'
import { getDanhSachTaiSan, getTaiSanById } from '@/Apis/HoTroThietBi/apiTaiSan'
import { useParams } from 'react-router-dom'

const TraCuuTaiSan = () => {
  // scanner QRCode TaiSanDT
  const { id: taiSanID } = useParams()
  // var
  const [loading, setLoading] = useState(true)
  const [textSearch, setTextSearch] = useState('')
  const [listTaiSan, setListTaiSan] = useState([])
  const initialItemPerPage = 10
  const [itemPerPage, setItemPerPage] = useState(initialItemPerPage)
  const [maTaiSanTheoID, setMaTaiSanTheoID] = useState('')
  // fetach data
  const getListTaiSan = () => {
    setLoading(true)
    getDanhSachTaiSan().then((res) => {
      setLoading(false)
      setListTaiSan(res)
    })
  }

  // event handlers
  const handleSearch = (e) => {
    const { id, value } = e.target

    if (id === 'text-search') {
      setTextSearch(value)
    }
  }

  // effects
  useEffect(() => {
    getListTaiSan()
  }, [])

  useEffect(() => {
    if (taiSanID) {
      getTaiSanById(taiSanID).then((data) => {
        const maTaiSan = data?.DT_QLTS_TS_MaTaiSan
        setMaTaiSanTheoID(maTaiSan)
      })
    }
  }, [taiSanID])

  return (
    <TraCuuTaiSanView
      loading={loading}
      listTaiSan={listTaiSan}
      itemPerPage={itemPerPage}
      setItemPerPage={setItemPerPage}
      maTaiSanTheoID={maTaiSanTheoID}
    />
  )
}

export default TraCuuTaiSan

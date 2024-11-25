import { lazy } from 'react'

const HoTroSuDungPhanMem = lazy(
  () =>
    import('@/Pages/Clients/Common/HoTroSuDungPhanMem/HoTroSuDungPhanMem.jsx'),
)

export { HoTroSuDungPhanMem }

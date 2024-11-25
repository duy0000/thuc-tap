import TinTucList from './TinTucList'
import { DebounceInput } from 'react-debounce-input'

export default function TinTucHome() {
  return (
    <section className="grid grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-9">
        <TinTucList />
      </div>
      <div className="hidden lg:flex flex-col lg:col-span-3 bg-white p-3 rounded-lg">
        <DebounceInput
          debounceTimeout={300}
          className="w-full p-2 border border-gray-200 rounded-lg"
          placeholder={'Tìm kiếm'}
        />
        Left Menu
      </div>
    </section>
  )
}

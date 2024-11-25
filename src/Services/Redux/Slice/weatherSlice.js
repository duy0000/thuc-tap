import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
const initialState = {
  currentWeather: null,
  isFetching: false,
  error: false,
}

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    weatherStart: (state) => {
      state.isFetching = true
    },
    weatherSuccess: (state, action) => {
      state.isFetching = false
      state.currentWeather = action.payload
      state.error = false
    },
    weatherFailure: (state) => {
      state.isFetching = false
      state.error = true
    },
  },
})

export const { weatherStart, weatherSuccess, weatherFailure } =
  weatherSlice.actions
export const DataWeather = () => {
  const state = useSelector((state) => state.weather)
  return {
    currentWeather: state.currentWeather,
    isFetching: state.isFetching,
    error: state.error,
  }
}
export default weatherSlice.reducer

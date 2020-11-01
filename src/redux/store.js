import { configureStore } from '@reduxjs/toolkit'
import planetsReducer from './planetsSlice'

export default configureStore({
  reducer: {
    planets: planetsReducer
  }
})

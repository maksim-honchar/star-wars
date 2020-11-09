import { configureStore } from '@reduxjs/toolkit'
import planetsReducer from '../planets/planetsSlice'

export default configureStore({
  reducer: {
    planets: planetsReducer
  }
})

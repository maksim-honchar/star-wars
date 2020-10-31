import { configureStore } from '@reduxjs/toolkit'
import planetsReducer from '../features/planets/planetsSlice'

export default configureStore({
  reducer: {
    planets: planetsReducer
  }
})

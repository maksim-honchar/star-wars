import { configureStore } from '@reduxjs/toolkit'
import planetsReducer from '../planets/planetsSlice'
import filmsReducer from '../films/filmsSlice'

export default configureStore({
  reducer: {
    planets: planetsReducer,
    films: filmsReducer
  }
})

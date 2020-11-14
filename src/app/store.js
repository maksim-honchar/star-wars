import { configureStore } from '@reduxjs/toolkit'
import peopleReducer from '../people/peopleSlice'
import planetsReducer from '../planets/planetsSlice'
import filmsReducer from '../films/filmsSlice'
import speciesReducer from '../species/speciesSlice'
import vehicleReducer from '../vehicle/vehicleSlice'

export default configureStore({
  reducer: {
    people: peopleReducer,
    planets: planetsReducer,
    films: filmsReducer,
    species: speciesReducer,
    vehicle: vehicleReducer
  }
})

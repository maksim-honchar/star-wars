import { createSlice } from '@reduxjs/toolkit'


const planetsSlice = createSlice({
    name: 'planets',
    initialState: {
        data: {
            count: 0,
            next: '',
            previous: null,
            results: []
        }
    },
    reducers: {
        updateData(state, action) {
            state.data = action.payload
        }
    }
})


export const { updateData } = planetsSlice.actions


export const asyncRequestData = state => async (dispatch) => {
    const response = await fetch('https://swapi.dev/api/planets/')
    if (response.ok) {
        const result = await response.json()
        // console.log(result)
        dispatch(updateData(result))
    } else {
        console.log('Mistake HTTP: ' + response.status)
    }
}


export const selectCount = state => state.planets.data.count

export const selectNext = state => state.planets.data.next

export const selectPrevious = state => state.planets.data.previous

export const selectPlanets = state => state.planets.data.results



export default planetsSlice.reducer
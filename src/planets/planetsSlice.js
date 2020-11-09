import { createSlice } from '@reduxjs/toolkit'


const planetsSlice = createSlice({
    name: 'planets',
    initialState: {
        data: {
            count: null,
            next: null,
            previous: null,
            results: []
        },
        currentPage: 0,
    },
    reducers: {
        updateData(state, action) {
            state.data = action.payload
        },
        updateDataCount(state, action) {
            state.data.count = action.payload
        },
        updateDataResults(state, action) {
            state.data.results = action.payload
        },
        updateCurrentPage(state, action) {
            state.currentPage = action.payload
        },
    }
})


export const { updateData, updateDataCount, updateDataResults, updateCurrentPage } = planetsSlice.actions


export const selectCount = state => state.planets.data.count

export const selectNext = state => state.planets.data.next

export const selectPrevious = state => state.planets.data.previous

export const selectPlanets = state => state.planets.data.results

export const selectCurrentPage = state => state.planets.currentPage


export default planetsSlice.reducer
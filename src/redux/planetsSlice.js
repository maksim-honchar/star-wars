import { createSlice } from '@reduxjs/toolkit'


const planetsSlice = createSlice({
    name: 'planets',
    initialState: {
        data: {
            count: 0,
            next: '',
            previous: null,
            results: []
        },
        currentPage: 0,
        searchResult: []
    },
    reducers: {
        updateData(state, action) {
            state.data = action.payload
        },
        updateCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        updateSearchResult(state, action) {
            state.searchResult = action.payload
        }
    }
})


export const { updateData, updateCurrentPage, updateSearchResult } = planetsSlice.actions


export const selectCount = state => state.planets.data.count

export const selectNext = state => state.planets.data.next

export const selectPrevious = state => state.planets.data.previous

export const selectPlanets = state => state.planets.data.results

export const selectCurrentPage = state => state.planets.currentPage


export default planetsSlice.reducer
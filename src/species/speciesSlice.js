import { createSlice } from '@reduxjs/toolkit'


const speciesSlice = createSlice({
    name: 'species',
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


export const { updateData, updateDataCount, updateDataResults, updateCurrentPage } = speciesSlice.actions


export const selectCount = state => state.species.data.count

export const selectNext = state => state.species.data.next

export const selectPrevious = state => state.species.data.previous

export const selectScpecies = state => state.species.data.results

export const selectCurrentPage = state => state.species.currentPage


export default speciesSlice.reducer
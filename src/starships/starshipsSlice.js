import { createSlice } from '@reduxjs/toolkit'


const starshipsSlice = createSlice({
    name: 'starships',
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


export const { updateData, updateDataCount, updateDataResults, updateCurrentPage } = starshipsSlice.actions


export const selectCount = state => state.starships.data.count

export const selectNext = state => state.starships.data.next

export const selectPrevious = state => state.starships.data.previous

export const selectStarships = state => state.starships.data.results

export const selectCurrentPage = state => state.starships.currentPage


export default starshipsSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

const filmsSlice = createSlice({
    name: 'films',
    initialState: {
        data: {
            count: null,
            next: null,
            previous: null,
            results: []
        },
        currentPage: 0
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

export const { updateData, updateDataCount, updateDataResults, updateCurrentPage } = filmsSlice.actions


export const selectCount = state => state.films.data.count

export const selectNext = state => state.films.data.next

export const selectPrevious = state => state.films.data.previous

export const selectFilms = state => state.films.data.results

export const selectCurrentPage = state => state.films.currentPage

export default filmsSlice.reducer
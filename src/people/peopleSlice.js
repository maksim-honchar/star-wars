import { createSlice } from '@reduxjs/toolkit'


const peopleSlice = createSlice({
    name: 'people',
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


export const { updateData, updateDataCount, updateDataResults, updateCurrentPage } = peopleSlice.actions


export const selectCount = state => state.people.data.count - 2

export const selectNext = state => state.people.data.next

export const selectPrevious = state => state.people.data.previous

export const selectPeople = state => state.people.data.results

export const selectCurrentPage = state => state.people.currentPage


export default peopleSlice.reducer
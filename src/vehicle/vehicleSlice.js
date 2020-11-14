import { createSlice } from '@reduxjs/toolkit'


const vehicleSlice = createSlice({
    name: 'vehicle',
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


export const { updateData, updateDataCount, updateDataResults, updateCurrentPage } = vehicleSlice.actions


export const selectCount = state => state.vehicle.data.count

export const selectNext = state => state.vehicle.data.next

export const selectPrevious = state => state.vehicle.data.previous

export const selectVehicle = state => state.vehicle.data.results

export const selectCurrentPage = state => state.vehicle.currentPage


export default vehicleSlice.reducer
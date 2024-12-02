import { createSlice } from "@reduxjs/toolkit"
import { getAllCountries } from "../actions/countryAction"
import { toast } from "sonner"

const initialState ={
    isLoading: false,
    isError: false,
    isSuccess: false,
    countryData:{}
}

const countrySlice = createSlice({
    name:"country",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllCountries.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getAllCountries.rejected,(state,action)=>{
            state.isError= true
            state.isSuccess = false
            state.isLoading = false
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(getAllCountries.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
            state.countryData = action.payload
            toast.success("All countries retrieved",{position:"top-right"})
        })
    }
})

export default countrySlice.reducer;
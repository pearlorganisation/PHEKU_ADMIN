import { createSlice } from "@reduxjs/toolkit"
import { createAccomodation } from "../actions/accomodationAction"
import { toast } from "sonner"

const initialState ={
    isLoading: false,
    isSuccess: false,
    isError: false,
    accomodationData:{}
}
const accomodationSlice = createSlice({
    name:"accomodation",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(createAccomodation.pending, state=>{
            state.isLoading = true
            state.isSuccess= false
            state.isError = false
        })
        .addCase(createAccomodation.rejected,(state,action)=>{
            state.isLoading= false
            state.isSuccess= false
            state.isError = true
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(createAccomodation.fulfilled, (state,action)=>{
            state.isError= false
            state.isSuccess = true
            state.isLoading= false
            toast.success("Accomodation created successfully",{position:"top-center"})
        })
    }
})

export default accomodationSlice.reducer
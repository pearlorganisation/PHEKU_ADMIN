import { createSlice } from "@reduxjs/toolkit"
import { getAllUniversities } from "../actions/universityAction"
import { toast } from "sonner"

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    universityInfo:{}
}

const universitySlice= createSlice({
    name:"university",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllUniversities.pending,(state)=>{
            state.isLoading= true;
        })
        .addCase(getAllUniversities.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(getAllUniversities.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError= false;
            state.isSuccess = true;
            state.universityInfo = action.payload;
            toast.success("Fetched all the universities",{position:"top-right"})
        })
    }
})

export default universitySlice.reducer;
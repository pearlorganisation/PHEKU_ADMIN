import { createSlice } from "@reduxjs/toolkit"
import { createUniversity, getAllUniversities } from "../actions/universityAction"
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
        .addCase(createUniversity.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(createUniversity.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(createUniversity.fulfilled,(state)=>{
            state.isLoading = false;
            state.isError= false;
            state.isSuccess= true;
            toast.success("University Created",{position:"top-right"})
        })
    }
})

export default universitySlice.reducer;
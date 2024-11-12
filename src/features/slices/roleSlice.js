import { createSlice } from "@reduxjs/toolkit"
import { createRoles, getRoles } from "../actions/rolesActions"
import { toast } from "sonner"


const initialState ={
    isLoading : false,
    isError: false,
    isSuccess: false,
    message: null,
    rolesInfo :{}
}


const roleSlice = createSlice({
    name:"roles",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(createRoles.pending,(state)=>{
            state.isLoading= true;
        })
        .addCase(createRoles.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError= true;
            state.isSuccess = false;
            toast.error(action.payload,{ position:"top-center" })
        })
        .addCase(createRoles.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError= false;
            state.isSuccess= true;
            toast.success("Created the roles",{ position:"top-right"})
        })
        .addCase(getRoles.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getRoles.rejected,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            toast.error(action.payload,{ position:"top-right" })
        })
        .addCase(getRoles.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading= false;
            state.isSuccess = true;
            state.rolesInfo = action.payload;
            toast.success("Roles are fetched",{ position:"top-right" })
        })
    }
})

export default roleSlice.reducer;
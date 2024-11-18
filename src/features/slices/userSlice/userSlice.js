import { createSlice } from "@reduxjs/toolkit"
import { getUserDetails } from "../../actions/userAction.js/userAction"
import { toast } from "sonner"

const initialState ={
    isLoading : false,
    isError : false,
    isSuccess: false,
    adminInfo :{}
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(getUserDetails.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getUserDetails.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(getUserDetails.fulfilled,(state,action)=>{
            state.isLoading= false;
            state.isError= false;
            state.isSuccess= true;
            state.adminInfo = action.payload;
            toast.success("Fetched the user details",{position:"top-right"})
        })
    }
})

export default userSlice.reducer;
import { createSlice } from "@reduxjs/toolkit"
import { createRoles, deleteRole, getRoleById, getRoles, updateById } from "../actions/rolesActions"
import { toast } from "sonner"


const initialState ={
    isLoading : false,
    isError: false,
    isSuccess: false,
    message: null,
    rolesInfo :{},
    singleRole:{},
    updateRole:{
        isLoading : false,
        isError: false,
        isSuccess: false,
        updateData:{}
    },
    deleteRole:{
        isLoading :false,
        isSuccess: false,
        isError: false,
    }
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
        .addCase(getRoleById.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getRoleById.rejected, (state,action)=>{
            state.isLoading= false;
            state.isError=  true;
            state.isSuccess= false;
            toast.error(action.payload,{ position:"top-right"})
        })
        .addCase(getRoleById.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError=false;
            state.isSuccess= true;
            state.singleRole = action.payload;
            toast.success("Role is retrived",{position:"top-right"})
        })
        .addCase(updateById.pending,(state)=>{
            state.updateRole = state.updateRole ?? {};
            state.updateRole.isLoading = true;
        })
        .addCase(updateById.rejected,(state,action)=>{
            state.updateRole = state.updateRole ??{};
            state.updateRole.isError = true;
            state.updateRole.isLoading= false;
            state.updateRole.isSuccess= false;
            toast.error(action.payload,{position:"top-right"});
        })
        .addCase(updateById.fulfilled,(state,action)=>{
            state.updateRole = state.updateRole ?? {};
            state.updateRole.isError = false;
            state.updateRole.isLoading = false;
            state.updateRole.isSuccess = true;
            state.updateRole.updateData= action.payload;
            toast.success("Role Updated",{position:"top-right"});
        })
        .addCase(deleteRole.pending,(state)=>{
            state.deleteRole = state.deleteRole ?? {};
            state.deleteRole.isLoading = true;
        })
        .addCase(deleteRole.rejected,(state)=>{
            state.deleteRole = state.deleteRole ?? {};
            state.deleteRole.isLoading= false;
            state.deleteRole.isError = true;
            state.deleteRole.isSuccess = false;

        })
        .addCase(deleteRole.fulfilled,(state)=>{
            state.deleteRole = state.deleteRole ?? {};
            state.deleteRole.isLoading = false;
            state.deleteRole.isError= false;
            state.deleteRole.isSuccess = true;
            toast.success("Successfully deleted the role",{position:"top-right"})
        })
    }
})

export default roleSlice.reducer;
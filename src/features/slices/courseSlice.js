import { createSlice } from "@reduxjs/toolkit"
import { createCourseLevel, createSpecialization, getAllSpecialization, getSingleSpecialization, updateSpecialization } from "../actions/courseAction"
import { toast } from "sonner"

const initialState ={
    isSuccess: false,
    isError: false,
    isLoading: false,
    courseSpecialization:{}, // for all the specialization
    singleSpecialization:{}, // for single specialization
    courseLevel:{}, // for all the course level
    courseLevelState:{
     isSuccess: false,
     isError: false,
     isLoading: false,
    }
}


const courseSlice = createSlice({
    name:"course",
    initialState: initialState,
    reducers:{},
    extraReducers:(builder)=>{
     builder
     .addCase(createSpecialization.pending,(state)=>{
        state.isLoading = true
     })
     .addCase(createSpecialization.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload,{ position:"top-right"} )
     })
     .addCase(createSpecialization.fulfilled,(state,action)=>{
        state.isError= false;
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Course Specialization Created Successfully",{position:"top-center"})
     })
     .addCase(createCourseLevel.pending,(state)=>{
        state.courseLevelState = state.courseLevelState ?? {};
        state.courseLevelState.isLoading = true
     })
     .addCase(createCourseLevel.rejected,(state,action)=>{
        state.courseLevelState = state.courseLevelState ?? {};
        state.courseLevelState.isError = true;
        state.courseLevelState.isLoading = false;
        state.courseLevelState.isSuccess = false;
        toast.error(action.payload,{position:"top-right"})
     })
     .addCase(createCourseLevel.fulfilled,(state,action)=>{
        state.courseLevelState = state.courseLevelState ?? {};
        state.courseLevelState.isError = false;
        state.courseLevelState.isSuccess = true;
        state.courseLevelState.isLoading = false;
        toast.success("Created Course Level",{ position:"top-center"})
    })
    .addCase(getAllSpecialization.pending,(state)=>{
        state.isLoading = true;
    })
    .addCase(getAllSpecialization.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError= true;
        state.isSuccess= false;
        toast.error(action.payload,{position:"top-right"})
    })
    .addCase(getAllSpecialization.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.courseSpecialization = action.payload;
        toast.success("Successfully Retrived the Course Specialization",{position:"top-center"})
    })
    .addCase(getSingleSpecialization.pending,(state)=>{
        state.isLoading = true;
    })
    .addCase(getSingleSpecialization.rejected, (state, action)=>{
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload,{position:"top-right"})
    })
    .addCase(getSingleSpecialization.fulfilled, (state,action)=>{
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleSpecialization = action.payload;
        toast.success("Retrieved the Specialization",{ position:"top-right"})
    })
    .addCase(updateSpecialization.pending,(state)=>{
        state.isLoading = true;
    })
    .addCase(updateSpecialization.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload,{position:"top-right"})
    })
    .addCase(updateSpecialization.fulfilled,(state, action)=>{
         state.isLoading = false;
         state.isError = false;
         state.isSuccess = true;
         toast.success("Updated the Specialization", {
             position: "top-right"
         })
    })
  }
})


export default courseSlice.reducer;
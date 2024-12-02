import { createSlice } from "@reduxjs/toolkit"
import { addCourse, createCourseLevel, createSpecialization, deleteCourseLevel, deleteSpecialization, getAllCourse, getAllCourses, getAllSpecialization, getSingleSpecialization, updateSpecialization } from "../actions/courseAction"
import { toast } from "sonner"

const initialState ={
    isSuccess: false,
    isError: false,
    isLoading: false,
    courseSpecialization:{}, // for all the specialization
    singleSpecialization:{}, // for single specialization
    courseLevelInfo:{}, // for all the course level
    courseLevelState:{
     isSuccess: false,
     isError: false,
     isLoading: false,
    },
    createCourse:{   // for tracking the creation of a course
        isSuccess: false,
        isError: false,
        isLoading: false,
    },
    coursesData:{} // for holding the all the courses data
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
    .addCase(deleteSpecialization.pending,(state)=>{
        state.isLoading = true;
    })
    .addCase(deleteSpecialization.rejected,(state,action)=>{
        state.isLoading= false;
        state.isError= true;
        state.isSuccess = false
        toast.error(action.payload,{position:"top-right"})
    })
    .addCase(deleteSpecialization.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        toast.success("Deleted the Course Specialization",{position:"top-right"})
    })
    .addCase(getAllCourse.pending,(state)=>{
        state.isLoading = true
    })
    .addCase(getAllCourse.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false
        toast.error(action.payload);
    })
    /**----------Note------------*/
    //  this is for getting the course level not the courses keep in mind
    .addCase(getAllCourse.fulfilled,(state,action)=>{
        state.isLoading = false; 
        state.isError = false;
        state.isSuccess = true;
        state.courseLevelInfo = action.payload
        toast.success("Retrieved all the course levels",{position:"top-right"})
    })
    .addCase(deleteCourseLevel.pending,(state)=>{
        state.courseLevelState = state.courseLevelState ?? {}
        state.courseLevelState.isLoading = true;
    })
    .addCase(deleteCourseLevel.rejected,(state,action)=>{
        state.courseLevelState = state.courseLevelState ?? {}
        state.courseLevelState.isError = true;
        state.courseLevelState.isLoading = false;
        state.courseLevelState.isSuccess= false;
        toast.error(action.payload,{position:"top-right"})
    })
    .addCase(deleteCourseLevel.fulfilled,(state,action)=>{
        state.courseLevelState = state.courseLevelState ?? {}
        state.courseLevelState.isLoading = false;
        state.courseLevelState.isError= false;
        state.courseLevelState.isSuccess = true;
        toast.success("Successfully Deleted",{position:"top-right"})
    })/*---------------------------for adding a course-----------------------------*/
    .addCase(addCourse.pending,(state)=>{
        state.createCourse = state.createCourse ?? {};
        state.createCourse.isLoading = true;
    })
    .addCase(addCourse.fulfilled,(state)=>{
        state.createCourse = state.createCourse ?? {};
        state.createCourse.isLoading = false;
        state.createCourse.isError = false;
        state.createCourse.isSuccess = true;
        toast.success("Course created successfully",{position:"top-right"}) 
    })
    .addCase(addCourse.rejected,(state,action)=>{
        state.createCourse = state.createCourse ?? {};
        state.createCourse.isLoading = false;
        state.createCourse.isError = true;
        state.createCourse.isSuccess= false;
        toast.error(action.payload,{position:"top-right"})
    })
    /**----------This is for getting all the courses------------------*/
    .addCase(getAllCourses.pending,(state)=>{
        state.isLoading = true
    })
    .addCase(getAllCourses.rejected,(state,action)=>{
        state.isLoading = false
        state.isSuccess = false
        state.isError= true
        toast.error(action.payload,{position:"top-right"})
    })
    .addCase(getAllCourses.fulfilled,(state,action)=>{
        state.isSuccess = true
        state.isError = false
        state.isLoading = false
        state.coursesData = action.payload
         toast.success("All Courses are retrieved",{position:"top-right"})
    })
  }
})


export default courseSlice.reducer;
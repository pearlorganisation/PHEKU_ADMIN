import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axiosInterceptor";

/*--------------------------To Created Course Specializations---------------------------------*/
export const  createSpecialization = createAsyncThunk(
    "course/createSpecialization",async({ name },{ rejectWithValue })=>{
        try {
            const config ={
                headers:{
                    "Content-Type": "application/json"
                }
            }
            const { data } = await axiosInstance.post(`/api/v1/specializations`,{ name },{config});
            console.log("specialization data", data)
            return data.data;
        } catch (error) {
              if (error.response && error.response.data.message) {
                  return rejectWithValue(error.response.data.message);
              } else {
                  return rejectWithValue(error.message);
              }
        }
    }
);

/*------------------------------To Created Course Level--------------------------------*/
export const createCourseLevel = createAsyncThunk(
    "course/courseLevel",async({ level }, {rejectWithValue})=>{
        try {
             const config = {
                 headers: {
                     "Content-Type": "application/json"
                 }
             }
             const {
                 data
             } = await axiosInstance.post(`/api/v1/course-levels`, {
                 level
             }, {
                 config
             });
             console.log("Course Level data", data)
             return data.data;
        } catch (error) {
               if (error.response && error.response.data.message) {
                   return rejectWithValue(error.response.data.message);
               } else {
                   return rejectWithValue(error.message);
               }
        }
    }
);

/*--------------------------------to get all the course specialization--------------------------------*/

export const getAllSpecialization = createAsyncThunk(
    "specialization/getAll",async(_,{ rejectWithValue })=>{
        try {
            const config ={
                headers:{
                    "Content-Type": "application/json"
                }
            }

            const {
                data
            } = await axiosInstance.get(`/api/v1/specializations`,config)
            console.log("The data specialization data",data);
            return data.data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)

/**---------------------------------To get all the course Level-------------------------------------------------- */

export const getAllCourse = createAsyncThunk(
    "specialization/getAllCourseLevel", async (_, {
        rejectWithValue
    }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const {
                data
            } = await axiosInstance.get(`/api/v1/course-levels`, config)
            console.log("course level data----------------------", data);
            return data.data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)
/**---------------------------delete a course Level---------------- */

export const deleteCourseLevel = createAsyncThunk(
    "course/courseLevelDelete", async(id,{rejectWithValue})=>{
        try {
            const config ={
                headers:{
                    "Content-Type": "application/json"
                }
            }
        const { data } = await axiosInstance.delete(`/api/v1/course-levels/${id}`,config)
        return data
        } catch (error) {
         if (error.response && error.response.data.message) {
             return rejectWithValue(error.response.data.message);
         } else {
             return rejectWithValue(error.message);
         }
        }
    }
)



/**-----------------get specialization by id--------------------------*/

export const getSingleSpecialization = createAsyncThunk(
    "specialization/getById",async(id, { rejectWithValue })=>{
        try {
            const config= {
                headers: {
                    "Content-Type":"application/json"
                }
            }
        const {
            data
        } = await axiosInstance.get(`/api/v1/specializations/${id}`, config);
        console.log("Single Specialization data", data);
        return data.data

        } catch (error) {
         if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
         } else {
            return rejectWithValue(error.message);
         }
        }
    })

    /**--------------------Update The Specialization--------------------*/

    export const updateSpecialization = createAsyncThunk(
        "specialization/updated", async({id, name},{rejectWithValue})=>{
            try {
                const config = {
                    headers:{
                        "Content-Type":"application/json"
                    }
                }
                const { data } = await axiosInstance.put(`/api/v1/specializations/${id}`,{name}, {config});
                return data.data
            } catch (error) {
                 if (error.response && error.response.data.message) {
                     return rejectWithValue(error.response.data.message);
                 } else {
                     return rejectWithValue(error.message);
                 }
            }
        }
    )

    /**-----------------------------action for deleting the course-specialization-----------------------------*/
    export const deleteSpecialization = createAsyncThunk(
        "specialization/delete",async({id},{rejectWithValue})=>{
            console.log('-----------id', id)
            try {
                const config = {
                    headers:{
                        "Content-Type":"application/json"
                    }
                }
                const { data } = await axiosInstance.delete(`/api/v1/specializations/${id}`,config);
                return data.data;
            } catch (error) {
                if (error.response && error.response.data.message) {
                    return rejectWithValue(error.response.data.message);
                } else {
                    return rejectWithValue(error.message);
                }
            }
        }
    )


    /**---------------------------------------------Action for Adding a course----------------------------------------*/
    export const addCourse = createAsyncThunk(
        "course/createCourse",async({data},{rejectWithValue})=>{
            try {
                   const config = {
                       headers: {
                           "Content-Type": "application/json"
                       }
                   }
                const { response } = await axiosInstance.post(`/api/v1/courses`,{data},{config})
                return response.data;   
            } catch (error) {
                if (error.response && error.response.data.message) {
                    return rejectWithValue(error.response.data.message);
                } else {
                    return rejectWithValue(error.message);
                }
            }
        }
    )
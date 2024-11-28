import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axiosInterceptor";

export const getAllUniversities = createAsyncThunk(
    "get/allUniversities",async(_,{rejectWithValue})=>{
        try {
            const config ={
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const {
                data
            } = await axiosInstance.get(`/api/v1/universities`,config);
            console.log("------------uni data", data);
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


/** Action to create a University **/

export const createUniversity = createAsyncThunk(
    "university/create",async(userdata,{rejectWithValue})=>{
        try {
           const formData = new FormData();
           formData.append("coverPhoto", userdata.coverPhoto[0])
           formData.append("logo", userdata.logo[0])
           
           for(const key in userdata){
              if (key !== "coverPhoto" && key !== "logo") {
                  if (typeof userdata[key] === "object" && userdata[key] !== null) {
                      // Convert objects (like `ranking`) to JSON strings
                      formData.append(key, JSON.stringify(userdata[key]));
                  } else {
                      // Append other fields as-is
                      formData.append(key, userdata[key]);
                  }
              }
           }
           

            const config={
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            }

            const { data } = await axiosInstance.post(`/api/v1/universities`,formData,{config});
            return data;            
        } catch (error) {
           if (error.response && error.response.data.message) {
               return rejectWithValue(error.response.data.message);
           } else {
               return rejectWithValue(error.message);
           }
        }
    }
)
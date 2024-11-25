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
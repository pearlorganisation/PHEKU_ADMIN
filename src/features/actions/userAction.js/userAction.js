
/*----------------------------to-get-the  logged in user details------------------------------------*/

import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../services/axiosInterceptor";

export const getUserDetails = createAsyncThunk(
    "get/userDetails",async(_,{rejectWithValue})=>{
        try {
            const config ={
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const { data }= await axiosInstance.get(`/api/v1/users/me`, config);
            console.log("logged in user data", data);
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
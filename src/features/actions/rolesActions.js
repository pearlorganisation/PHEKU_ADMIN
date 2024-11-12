import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axiosInterceptor";

/*------------------------------to create the roles-----------------------------------------*/
export const createRoles = createAsyncThunk(
    "roles/createRoles", async ({
            roleName,
            description
        }, {
            rejectWithValue
        }) => {
        try {
            const config= {
                headers:{
                    "Content-Type": "application/json"
                }
            }
            const {
                data
            } = await axiosInstance.post(`/api/v1/roles`, {
                roleName,
                description
            }, {config});
            console.log("The created roles data",data.data)
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

/*----------------------------------------------to get the roles------------------------------------------------------------------*/

export const getRoles = createAsyncThunk(
    "roles/getRoles",async(_,{ rejectWithValue })=>{
        try {
            const config = {
                headers:{
                    "Content-Type": "application/json"
                }
            }
            const {data} = await axiosInstance.get(`/api/v1/roles`,{ config })
            console.log("The data of roles",data.data);
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
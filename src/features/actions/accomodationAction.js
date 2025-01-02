import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axiosInterceptor";

export const createAccomodation = createAsyncThunk(
    "create/accomodation", async(userData,{rejectWithValue})=>{
        try {
            const formData = new FormData()
             userData.images.forEach((image) => {
                 formData.append("images", image)
             });
              userData.amenities.forEach((image) => {
                  formData.append("amenities", image)
              });

              for(const key in userData){
                if(key !== "images" && key !== "amenities"){
                    if(typeof userData[key] === "object" &&  userData[key] !== null){
                        formData.append(key, JSON.stringify(userData[key]));
                    }else{
                        formData.append(key, userData[key])
                    }
                }
              }

              const config ={
                headers:{
                    "Content-Type":"multipart/form-data"
                }
              }
              const {
                  data
              } = await axiosInstance.post(`/api/v1/accomodations`, formData,{config})
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
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axiosInterceptor";

export const getBlogs = createAsyncThunk(
  "blog/get",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`blogs`);

      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getSingleBlog = createAsyncThunk(
  "singleblog/get",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`blogs/${id}`);

      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createBlogs = createAsyncThunk(
  "blogs/post",
  async (userdata, thunkAPI) => {
    console.log("userdata111", userdata);

    try {
      const formData = new FormData();

      formData.append("blogImage", userdata.blogImage[0]);

      for (const key in userdata) {
        if (key !== "blogImage") {
          formData.append(key, userdata[key]);
        }
      }

      const { data } = await instance.post(`blogs`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blog/put",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await instance.put(`blogs/${id}`, data);
      console.log(response, "response");
      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blog/delete",
  async (id, thunkAPI) => {
    try {
      const { data } = await instance.delete(`blogs/${id}`);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

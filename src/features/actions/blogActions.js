import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axiosInterceptor";

export const getBlogs = createAsyncThunk(
  "blog/get",
  async ({ page = 1 }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/api/v1/blogs?page=${page}`);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getSingleBlog = createAsyncThunk(
  "singleblog/get",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/api/v1/blogs/${id}`);

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

      formData.append("thumbImage", userdata.thumbImage[0]);

      for (const key in userdata) {
        if (key !== "thumbImage") {
          console.log(key);
          formData.append(key, userdata[key]);
        }
      }

      const { data } = await axiosInstance.post(`/api/v1/blogs`, formData, {
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
      const response = await axiosInstance.put(`/api/v1/blogs/${id}`, data);
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
      const { data } = await axiosInstance.delete(`/api/v1/blogs/${id}`);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createBlogCategory = createAsyncThunk(
  "blog/createCategory",
  async (blogCategoryName, thunkAPI) => {
    try {
      console.log(blogCategoryName, "blog Cat Name");
      const { data } = await axiosInstance.post(
        `/api/v1/blogs/categories`,
        blogCategoryName
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBlogCategories = createAsyncThunk(
  "blog/getBlogCategories",
  async ({ page = 1 }, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/v1/blogs/categories?page=${page}`
      );
      console.log("-------------------------",data)
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

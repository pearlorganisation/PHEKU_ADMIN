import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axiosInterceptor";

/*------------------------------to create the roles-----------------------------------------*/
export const createRoles = createAsyncThunk(
  "roles/createRoles",
  async ({ roleName, description }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.post(
        `/api/v1/roles`,
        {
          roleName,
          description,
        },
        { config }
      );
      console.log("The created roles data", data.data);
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

/*----------------------------------------------to get the roles------------------------------------------------------------------*/

export const getRoles = createAsyncThunk(
  "roles/getRoles",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.get(`/api/v1/roles`, { config });
      console.log("The data of roles", data.data);
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

export const getRoleById = createAsyncThunk(
  "roleById/getById",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axiosInstance.get(`/api/v1/roles/${id}`, config);
      console.log("The returned data of single role", data.data);
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

/*------------------------------------------Update By ID--------------------------------------------------------------*/

export const updateById = createAsyncThunk(
  "update/updateRoleById",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json", // Fixed typo in "application"
        },
      };
      // Send data directly without wrapping it in another object
      const response = await axiosInstance.put(
        `/api/v1/roles/${id}`,
        data,
        config
      );
      console.log("New Returned Updated Data", response);
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

/**--------------------------Deleting the role--------------------------------------------*/

export const deleteRole = createAsyncThunk(
  "role/delete",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axiosInstance.delete(`/api/v1/roles/${id}`, config);
      return res;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

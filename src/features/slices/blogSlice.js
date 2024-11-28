import { createSlice } from "@reduxjs/toolkit";
import {
  createBlogCategory,
  createBlogs,
  deleteBlog,
  deleteBlogCategory,
  getBlogCategories,
  getBlogs,
  getSingleBlog,
  getSingleBlogCategory,
  updateBlog,
  updateBlogCategory,
} from "../actions/blogActions";
import { toast } from "sonner";

const intialState = {
  blogs: [],
  blogCategories: [],
  blogCategory: {},
  singleBlog: {},
  paginate: {},
  blogsCatPaginate: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const blogSlice = createSlice({
  name: "blog",
  initialState: intialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogs = action.payload.data;
        state.paginate = action.payload.metadata;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getSingleBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleBlog = action.payload;
      })
      .addCase(getSingleBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isUpdated = true;
        state.singleBlog = action.payload;
        toast.success("Blog Updated Successfully", {
          position: "top-center",
        });
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error(action.error, {
          position: "top-center",
        });
      })

      // delete blog

      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isDeleted = true;
        state.singleBlog = action.payload;
        toast.success("Blog Deleted Successfully", {
          position: "top-center",
        });
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error(action.error, {
          position: "top-center",
        });
      })

      //create BLOgs
      .addCase(createBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isUpdated = true;

        toast.success("Blog Created Successfully", {
          position: "top-center",
        });
        state.singleBlog = action.payload;
      })
      .addCase(createBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error(action.error, {
          position: "top-center",
        });
      })

      // create blog Category
      .addCase(createBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isUpdated = true;
        state.blogCategory = action.payload;
        toast.success("Blog Category Created Successfully", {
          position: "top-center",
        });
      })
      .addCase(createBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error(action.error, {
          position: "top-center",
        });
      })

      // get blog Categories
      .addCase(getBlogCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isUpdated = true;
        state.blogCategories = action.payload.data;
        state.blogsCatPaginate = action.payload.metadata;
      })
      .addCase(getBlogCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error(action.error, {
          position: "top-center",
        });
      })

      // update blog category

      .addCase(updateBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isUpdated = true;
        state.blogCategory = action.payload;
        toast.success("Blog Category Updated Successfully", {
          position: "top-center",
        });
      })
      .addCase(updateBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error(action.error, {
          position: "top-center",
        });
      })

      // delete single blog category

      .addCase(deleteBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isDeleted = true;
        state.blogCategory = action.payload;
        toast.success("Blog Category Deleted Successfully", {
          position: "top-center",
        });
      })
      .addCase(deleteBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error(action.error, {
          position: "top-center",
        });
      })

      // get single blog category

      .addCase(getSingleBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogCategory = action.payload.data;
      })
      .addCase(getSingleBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default blogSlice.reducer;

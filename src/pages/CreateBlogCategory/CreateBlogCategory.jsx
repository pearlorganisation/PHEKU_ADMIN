import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createRoles } from "../../features/actions/rolesActions";
import { createBlogCategory } from "../../features/actions/blogActions";
const CreateBlogCategory = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = (data) => {
    dispatch(createBlogCategory(data));
  };
  return (
    <div>
      <main className="flex-1 p-8 mt-16 ml-64">
        <div className="text-4xl font-bold mb-4">Create Blog Categories </div>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="mb-4">
            <label
              htmlFor="blogCategoryName"
              className="block text-sm font-medium text-gray-700"
            >
              Blog Category Name
            </label>
            <input
              type="text"
              id="blogCategoryName"
              {...register("blogCategoryName", {
                required: "Blog Category name is required",
              })}
              className="mt-1 p-2 block w-full rounded-md border-purple-300 border-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.blogCategoryName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.blogCategoryName.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Blog Category
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateBlogCategory;

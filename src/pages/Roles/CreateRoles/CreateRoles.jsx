import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createRoles } from "../../../features/actions/rolesActions";

const CreateRoles = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = (data) => {
    dispatch(createRoles(data));
  };
  return (
    <main className="flex-1 p-8 mt-16 ml-64">
      <div className="text-4xl font-bold mb-4">Create Roles</div>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="mb-4">
          <label
            htmlFor="roleName"
            className="block text-sm font-medium text-gray-700"
          >
            Role Name
          </label>
          <input
            type="text"
            id="roleName"
            {...register("roleName", { required: "Role name is required" })}
            className="mt-1 p-2 block w-full rounded-md border-purple-300 border-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.roleName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.roleName.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description")}
            className="mt-1 p-2 block w-full rounded-md border-purple-300 border-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Role
        </button>
      </form>
    </main>
  );
};

export default CreateRoles;

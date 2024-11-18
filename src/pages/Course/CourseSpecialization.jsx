import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { createSpecialization } from '../../features/actions/courseAction';

const CourseSpecialization = () => {
    const dispatch = useDispatch();

const { register, handleSubmit, formState:{ errors }} = useForm();
 
const submitForm =(data)=>{
    dispatch(createSpecialization(data));
}
    return (
      <main className="flex-1 p-8 mt-16 ml-64">
          <div className="text-4xl font-bold mb-4">Create Course Specialization</div>
          <form onSubmit={handleSubmit(submitForm)}>
              <div className="mb-4">
                  <label
                      htmlFor="roleName"
                      className="block text-sm font-medium text-gray-700"
                  >
                      Specialization Name
                  </label>
                  <input
                      type="text"
                      id="name"
                      {...register("name", { required: "name is required" })}
                      className="mt-1 p-2 block w-full rounded-md border-purple-300 border-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                          {errors.name.message}
                      </p>
                  )}
              </div>

              <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                  Create Speacialization
              </button>
          </form>
      </main>
  )
}

export default CourseSpecialization
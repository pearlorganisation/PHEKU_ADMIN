import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUniversities } from '../../../features/actions/universityAction';
import { addCourse, getAllCourse, getAllSpecialization } from '../../../features/actions/courseAction';
import { getAllCountries } from '../../../features/actions/countryAction';
import { useForm } from 'react-hook-form';
import slugify from 'slugify';
const AddCourse = () => {
   const dispatch = useDispatch();
   const { register, handleSubmit, setValue , watch, formState:{ errors }} = useForm();
   // getting data from the store 
   const { universityInfo } = useSelector((state) => state.universities)
   const { countryData } = useSelector((state)=>state.countries)
   const { courseLevelInfo, courseSpecialization } = useSelector((state)=> state.course)
   /** for slugging the course name */
   const slugName = watch("name")
   useEffect(()=>{
    if(slugName){
      let slug = slugify(slugName,{
        lower:true,
        strict:true
      })
      setValue("slug",slug)
    }
   },[setValue,slugName])

/** handle to submit the course */
const SubmitForm =(data)=>{
  dispatch(addCourse(data))
}

    useEffect(()=>{
        dispatch(getAllUniversities())
        dispatch(getAllSpecialization())
        dispatch(getAllCourse())
        dispatch(getAllCountries())
    },[])
  return (
    <main className="flex-1 p-8 mt-16 ml-64">
      <div>AddCourse</div>
      <div className='container mx-auto p-10'>
        <form onSubmit={handleSubmit(SubmitForm)} > 
          {/** Course Name */}
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Course Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Name is required" })}
            className={`shadow-sm bg-gray-50 border ${errors.name ? "border-red-500" : "border-gray-300"
              } 
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5`}
            placeholder="Enter blog slugName"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>
        {/** course slug */}
        <div className="mb-6">
          <label
            htmlFor="slug"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Slug
          </label>
          <input
            type="text"
            {...register("slug")}
            readOnly
            className={`shadow-sm bg-gray-50 border ${errors.slug ? "border-red-500" : "border-gray-300"
              } 
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5`}
          />
        </div>
        {/**  Selecting countries*/}
        <div className="mb-6">
          <label
            htmlFor="country"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Selecte Country
          </label>
          <select
          {...register("country",{required:"Please Select a Country"})}>
            <option value="">Choose a Country</option>
            {countryData?.map((country)=>(
              <option key={country?._id} value={country?._id}>
                {country?.name}
              </option>
            ))}
          </select>
          {errors.country && <p>{errors.country.message}</p>}
        </div>

        {/** university */}
        <div className="mb-6">
          <label
            htmlFor="university"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Selecte University
          </label>
          <select
            {...register("university", { required: "Please Select a University" })}>
            <option value="">Choose a University</option>
            {universityInfo?.map((university) => (
              <option key={university?._id} value={university?._id}>
                {university?.name}
              </option>
            ))}
          </select>
          {errors.university && <p>{errors.university.message}</p>}
        </div>

        {/** duration of course */}
        <div className="mb-6">
          <label
            htmlFor="duration"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Course duration
          </label>
          <input
            type="number"
            id="duration"
              {...register("duration", { required: "duration is required" })}
            className={`shadow-sm bg-gray-50 border ${errors.duration ? "border-red-500" : "border-gray-300"
              } 
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5`}
            placeholder="Enter Course Duration"
          />
          {errors.duration && (
            <p className="text-red-500 text-sm mt-1">
              {errors.duration.message}
            </p>
          )}
        </div>
        
        {/** select course level */}
        <div className="mb-6">
          <label
            htmlFor="courseLevel"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Select Course Level
          </label>
          <select
            {...register("courseLevel", { required: "Please Select a course Level" })}>
            <option value="">Choose a Course Level</option>
            {courseLevelInfo?.map((courseLevel) => (
              <option key={courseLevel?._id} value={courseLevel?._id}>
                {courseLevel?.level}
              </option>
            ))}
          </select>
          {errors.courseLevel && <p>{errors.courseLevel.message}</p>}
        </div>

        {/** tutionfees amount */}
        <div className="mb-6">
          <label
            htmlFor="tutionFees.amount"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Course Amount
          </label>
          <input
            type="number"
            id="tutionFees.amount"
            {...register("tutionFees.amount", { required: "Amount is required" })}
            className={`shadow-sm bg-gray-50 border ${errors.tutionFees ? "border-red-500" : "border-gray-300"
              } 
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5`}
            placeholder="Enter Course Amount"
          />
          {errors.tutionFees && (
            <p className="text-red-500 text-sm mt-1">
              {errors.tutionFees.message}
            </p>
          )}
        </div>

        {/** tution currency */}
        <div className="mb-6">
          <label
            htmlFor="tutionFees.currency"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Country Currency
          </label>
          <input
            type="text"
            id="tutionFees.currency"
            {...register("tutionFees.currency", { required: "currency is required" })}
            className={`shadow-sm bg-gray-50 border ${errors.tutionFees ? "border-red-500" : "border-gray-300"
              } 
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5`}
            placeholder="Enter Course Amount"
          />
          {errors.tutionFees && (
            <p className="text-red-500 text-sm mt-1">
              {errors.tutionFees.message}
            </p>
          )}
        </div>
        {/** select a course specialization */}
        <div className="mb-6">
          <label
            htmlFor="specialization"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Select Course specialization
          </label>
          <select
            {...register("specialization", { required: "Please Select a course specialization" })}>
            <option value="">Choose a Course specialization</option>
            {courseSpecialization?.map((courseSpecial) => (
              <option key={courseSpecial?._id} value={courseSpecial?._id}>
                {courseSpecial?.name}
              </option>
            ))}
          </select>
          {errors.specialization && <p>{errors.specialization.message}</p>}
        </div>
        <button type='submit'>Submit</button>
        </form>
      </div>
    </main>
  )
}

export default AddCourse
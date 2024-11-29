import React, { useEffect, useRef, useState } from 'react'
import { useForm , Controller, useFieldArray} from 'react-hook-form'
import slugify from 'slugify'
import { Editor } from '@tinymce/tinymce-react'
import { useDispatch } from 'react-redux'
import { createUniversity } from '../../features/actions/universityAction'

const CreateUniversity = () => {
  const overViewRef = useRef();
  const highLightRef = useRef();
  const facilitiesRef = useRef();

  const dispatch = useDispatch();
  const {register , handleSubmit , setValue, watch, control, formState:{errors}} = useForm()
  const { fields, append, remove } = useFieldArray({ control, name: 'faculties' });
  /* states for previewng the coverPhoto images in frontend */
  const [image, setImage] = useState(null) 
  const [preview, setImagePreview] = useState(null);

  /** states for managing logo Image */
  const [logoImage, setLogoImage] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(null);

    /** for selecting the coverPhoto */
    const handleImageChange=(e)=>{
        const file = e.target.files[0];
        if(file){
            setImage(file);
        const reader = new FileReader();
        reader.onloadend =()=>{
            setImagePreview(reader.result)
    };
        reader.readAsDataURL(file)
    }
    }
    /** handle for selecting the logo Image */
    const handleLogoChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                setLogoImage(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewLogo(reader.result)
                }
                reader.readAsDataURL(file)
            }
    }

    const slugName = watch("name")
    /** Slugify based on university name */
    useEffect(()=>{
        if(slugName){
            const slug = slugify(slugName,{
                lower: true,
                strict: true,
            });
            setValue("slug",slug)
        }
    },[slugName,setValue])

    /** handle to submit the form */
    const SubmitForm = async(data)=>{
        console.log("---------form data", data);
        const formData = new FormData();
        formData.append("coverPhoto",image);
        formData.append("logo",logoImage);

        dispatch(createUniversity(data)).then((res)=>{
         console.log("page 10101", res);
        })
    }
    return (
      <div className="mt-20 ml-72">
        <div className='container mx-auto p-10'>
          <form className='bg-white rounded-md shadow-md p-8' onSubmit={handleSubmit(SubmitForm)}>
          {/** cover photo */}
                    <div className="mb-6">
                        <label
                            htmlFor="coverPhtoto"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Upload Cover Image
                        </label>
                        <input
                            type="file"
                            id="coverPhoto"
                            accept="image/*"
                            {...register("coverPhoto", {
                                required: "Cover image is required",
                                onChange: (e) => {
                                    handleImageChange(e);
                                },
                            })}
                            className={`block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100
                            ${errors.coverPhoto
                                    ? "border-red-500"
                                    : "border-gray-300"
                                } 
                            rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                        />
                        {/* Display image preview */}
                        {preview && (
                            <div className="mt-4">
                                <img
                                    src={preview}
                                    alt="Selected"
                                    className="h-40 w-auto rounded-md shadow-md"
                                />
                            </div>
                        )}
                    </div>
          {/**  Logo Image */}
                    <div className="mb-6">
                        <label
                            htmlFor="logo"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Upload Logo Image
                        </label>
                        <input
                            type="file"
                            id="logo"
                            accept="image/*"
                            {...register("logo", {
                                required: "Logo image is required",
                                onChange: (e) => {
                                    handleLogoChange(e);
                                },
                            })}
                            className={`block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100
                            ${errors.logo
                                    ? "border-red-500"
                                    : "border-gray-300"
                                } 
                            rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                        />
                        {/* Display image preview */}
                        {previewLogo && (
                            <div className="mt-4">
                                <img
                                    src={previewLogo}
                                    alt="Selected"
                                    className="h-40 w-auto rounded-md shadow-md"
                                />
                            </div>
                        )}
                    </div>

           {/** University Name */}
                    <div className="mb-6">
                        <label
                            htmlFor="slugName"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            University Name
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
           {/**  University Slug */}
                    {/*Slug*/}

                    <div className="mb-6">
                        <label
                            htmlFor="slugName"
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
            {/** University state */}
                    <div className="mb-6">
                        <label
                            htmlFor="state"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            University State
                        </label>
                        <input
                            type="text"
                            id="state"
                            {...register("state", { required: "State is required" })}
                            className={`shadow-sm bg-gray-50 border ${errors.state ? "border-red-500" : "border-gray-300"
                                } 
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5`}
                            placeholder="Enter state"
                        />
                        {errors.state && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.state.message}
                            </p>
                        )}
                    </div>
            {/** District */}
                    <div className="mb-6">
                        <label
                            htmlFor="district"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            University District
                        </label>
                        <input
                            type="text"
                            id="district"
                            {...register("district", { required: "District is required"})}
                            className={`shadow-sm bg-gray-50 border ${errors.district ? "border-red-500" : "border-gray-300"
                                } 
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5`}
                            placeholder="Enter District Name"
                        />
                        {errors.district && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.district.message}
                            </p>
                        )}
                    </div>
            {/** City */}
                    <div className="mb-6">
                        <label
                            htmlFor="city"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            University City
                        </label>
                        <input
                            type="text"
                            id="city"
                            {...register("city", { required: "City is required" })}
                            className={`shadow-sm bg-gray-50 border ${errors.city ? "border-red-500" : "border-gray-300"
                                } 
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5`}
                            placeholder="Enter City Name"
                        />
                        {errors.city && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.city.message}
                            </p>
                        )}
                    </div>
            {/** address */}
                    <div className="mb-6">
                        <label
                            htmlFor="address"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            University Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            {...register("address", { required: "Address is required" })}
                            className={`shadow-sm bg-gray-50 border ${errors.address ? "border-red-500" : "border-gray-300"
                                } 
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5`}
                            placeholder="Enter university Address"
                        />
                        {errors.address && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.address.message}
                            </p>
                        )}
                    </div>
            {/** established year */}
                    <div className="mb-6">
                        <label
                            htmlFor="estdYear"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            University Established
                        </label>
                        <input
                            type="text"
                            id="estdYear"
                            {...register("estdYear", { required: "Established Year is required" })}
                            className={`shadow-sm bg-gray-50 border ${errors.estdYear ? "border-red-500" : "border-gray-300"
                                } 
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5`}
                            placeholder="Enter Established Year"
                        />
                        {errors.estdYear && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.estdYear.message}
                            </p>
                        )}
                    </div>

            {/** email */}
                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            University Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            {...register("email", { required: "Email is required" })}
                            className={`shadow-sm bg-gray-50 border ${errors.email ? "border-red-500" : "border-gray-300"
                                } 
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5`}
                            placeholder="Enter Email"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
            {/** website */}
                    <div className="mb-6">
                        <label
                            htmlFor="website"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            University Website
                        </label>
                        <input
                            type="text"
                            id="website"
                            {...register("website", { required: "Website is required" })}
                            className={`shadow-sm bg-gray-50 border ${errors.website ? "border-red-500" : "border-gray-300"
                                } 
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5`}
                            placeholder="Enter Website"
                        />
                        {errors.website && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.website.message}
                            </p>
                        )}
                    </div>
            {/** phone */}
                    <div className="mb-6">
                        <label
                            htmlFor="phone"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            University Phone Number
                        </label>
                        <input
                            type="text"
                            id="phone"
                            {...register("phone", { required: "Phone is required" })}
                            className={`shadow-sm bg-gray-50 border ${errors.phone ? "border-red-500" : "border-gray-300"
                                } 
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5`}
                            placeholder="Enter Phone Number"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.phone.message}
                            </p>
                        )}
                    </div>
            {/** Ranking Global */}
                    <div className="mb-6">
                        <label
                            htmlFor="ranking"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            University Global Ranking
                        </label>
                        <input
                            type="number"
                            id="rankingGlobal"
                            {...register("ranking.global", { required: "Ranking is required" })}
                            className={`shadow-sm bg-gray-50 border ${errors.ranking ? "border-red-500" : "border-gray-300"
                                } 
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5`}
                            placeholder="Enter Global Rank"
                        />
                        {errors.ranking && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.ranking.message}
                            </p>
                        )}
                    </div>
            {/** Ranking National */}
                    <div className="mb-6">
                        <label
                            htmlFor="rankingNational"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            University National Ranking
                        </label>
                        <input
                            type="number"
                            id="rankingNational"
                            {...register("ranking.national", { required: "National Ranking is required" })}
                            className={`shadow-sm bg-gray-50 border ${errors.ranking ? "border-red-500" : "border-gray-300"
                                } 
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5`}
                            placeholder="Enter National Rank"
                        />
                        {errors.ranking && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.ranking.message}
                            </p>
                        )}
                    </div>
            {/** total course */}
                    <div className="mb-6">
                        <label
                            htmlFor="totalCourse"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Total Course
                        </label>
                        <input
                            type="number"
                            id="totalCourse"
                            {...register("totalCourse", { required: "Total Courses is required" })}
                            className={`shadow-sm bg-gray-50 border ${errors.totalCourse ? "border-red-500" : "border-gray-300"
                                } 
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5`}
                            placeholder="Enter Total Courses"
                        />
                        {errors.totalCourse && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.totalCourse.message}
                            </p>
                        )}
                    </div>
            {/** total rating */}
                    <div className="mb-6">
                        <label
                            htmlFor="totalRating"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            University Rating
                        </label>
                        <input
                            type="number"
                            id="totalRating"
                            {...register("totalRating", { required: "Total Rating is required" })}
                            className={`shadow-sm bg-gray-50 border ${errors.totalRating ? "border-red-500" : "border-gray-300"
                                } 
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5`}
                            placeholder="Enter Total Rating"
                        />
                        {errors.totalRating && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.totalRating.message}
                            </p>
                        )}
                    </div>
            {/** University Location Embedded Link */}

                    <div className="mb-6">
                        <label
                            htmlFor="location"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            University Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            {...register("location", { required: "Link of the Location is required" })}
                            className={`shadow-sm bg-gray-50 border ${errors.location ? "border-red-500" : "border-gray-300"
                                } 
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5`}
                            placeholder="Enter Embedded location from the google maps."
                        />
                        {errors.location && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.location.message}
                            </p>
                        )}
                    </div>
            {/** overview section */}
                    <div className="mb-6">
                        <label
                            htmlFor="overview"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            University Overview
                        </label>
                        <Controller
                            control={control}
                            name="overview"
                            rules={{ required: "Overview is required" }}
                            render={({ field: { onChange, value } }) => (
                                <Editor
                                    apiKey="2ppuijt6of1geaxsngtofntb89rc3er46z9mx30vl5d69dt7"
                                    value={value} // Bind the value directly to the editor
                                    onEditorChange={onChange} // Pass `onChange` directly
                                    init={{
                                        height: 300,
                                        menubar: true,
                                        plugins: [
                                            "advlist autolink lists link image charmap print preview anchor",
                                            "searchreplace visualblocks code fullscreen",
                                            "insertdatetime media table paste code help wordcount",
                                        ],
                                        toolbar:
                                            "undo redo | formatselect | bold italic backcolor | \
                                             alignleft aligncenter alignright alignjustify | \
                                             bullist numlist outdent indent | removeformat | help",
                                        advlist_bullet_styles: "default,circle,disc,square", // Enable bullet styles
                                        advlist_number_styles: "default,lower-alpha,lower-roman,upper-alpha,upper-roman", // Enable numbered styles
                                    }}
                                    textareaName="overview" // Matches the form field name
                                />
                            )}
                        />
                        {errors.overview && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.overview.message}
                            </p>
                        )}
                    </div>
            {/** highlights section */}
                    <div className="mb-6">
                        <label
                            htmlFor="highlights"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            University HighLights
                        </label>
                        <Controller
                            control={control}
                            name="highlights"
                            rules={{ required: "Highlights is required" }}
                            render={({ field: { onChange, value } }) => (
                                <Editor
                                    apiKey="2ppuijt6of1geaxsngtofntb89rc3er46z9mx30vl5d69dt7"
                                    value={value} // Bind the value directly to the editor
                                    onEditorChange={(highlightContent)=>onChange(highlightContent)} // Pass `onChange` directly
                                    init={{
                                        height: 300,
                                        menubar: true,
                                        plugins: [
                                            "advlist autolink lists link image charmap print preview anchor",
                                            "searchreplace visualblocks code fullscreen",
                                            "insertdatetime media table paste code help wordcount",
                                        ],
                                        toolbar:
                                            "undo redo | formatselect | bold italic backcolor | \
                                                alignleft aligncenter alignright alignjustify | \
                                                bullist numlist outdent indent | removeformat | help",
                                        advlist_bullet_styles: "default,circle,disc,square", // Enable bullet styles
                                        advlist_number_styles: "default,lower-alpha,lower-roman,upper-alpha,upper-roman", // Enable numbered styles
                                    }}
                                    textareaName="highlights" // Matches the form field name
                                />
                            )}
                        />
                        {errors.highlights && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.highlights.message}
                            </p>
                        )}
                    </div>
            {/** Facilities */}
                    <div className="mb-6">
                        <label
                            htmlFor="facilities"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            University Facilities
                        </label>
                        <Controller
                            control={control}
                            name="facilities"
                            rules={{ required: "Facilities is required" }}
                            render={({ field: { onChange, value } }) => (
                                <Editor
                                    apiKey="2ppuijt6of1geaxsngtofntb89rc3er46z9mx30vl5d69dt7"
                                    value={value} // Bind the value directly to the editor
                                    onEditorChange={(facilitiesContent) => onChange(facilitiesContent)} // Pass `onChange` directly
                                    init={{
                                        height: 300,
                                        menubar: true,
                                        plugins: [
                                            "advlist autolink lists link image charmap print preview anchor",
                                            "searchreplace visualblocks code fullscreen",
                                            "insertdatetime media table paste code help wordcount",
                                        ],
                                        toolbar:
                                            "undo redo | formatselect | bold italic backcolor | \
                                                alignleft aligncenter alignright alignjustify | \
                                                bullist numlist outdent indent | removeformat | help",
                                        advlist_bullet_styles: "default,circle,disc,square", // Enable bullet styles
                                        advlist_number_styles: "default,lower-alpha,lower-roman,upper-alpha,upper-roman", // Enable numbered styles
                                    }}
                                    textareaName="facilities" // Matches the form field name
                                />

                            )}
                        />
                        {errors.facilities && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.facilities.message}
                            </p>
                        )}
                    </div>
            {/** Faculties */}
                    <div className="mb-6">
                    
                           <h2 className="text-xl font-bold mb-4">Faculties</h2>
                        {fields.map((faculty, index) => (
                            <div key={faculty.id} className="mb-4 bg-gray-100 p-4 rounded-lg shadow-md"> {/* Added styling */}
                                <h3 className="text-lg font-bold mb-2">Faculty {index + 1}</h3>
                                <div className="mb-2">
                                    <label htmlFor={`faculty-name-${index}`} className="block text-gray-700 font-bold mb-1">Name</label>
                                    <Controller
                                        name={`faculties.${index}.name`}
                                        control={control}
                                        render={({ field }) => (
                                            <input type="text" {...field} id={`faculty-name-${index}`} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                                        )}
                                    />
                                    {errors.faculties && errors.faculties[index] && errors.faculties[index].name && <span className="text-red-500 text-xs italic">Name is required</span>}
                                </div>
                                {/* Repeat similar structure for other fields: position, department, contactEmail */}
                                <div className="mb-2">
                                    <label htmlFor={`faculty-position-${index}`} className="block text-gray-700 font-bold mb-1">Position</label>
                                    <Controller
                                        name={`faculties.${index}.position`}
                                        control={control}
                                        render={({ field }) => (
                                            <input type="text" {...field} id={`faculty-position-${index}`} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                                        )}
                                    />
                                    {errors.faculties && errors.faculties[index] && errors.faculties[index].position && <span className="text-red-500 text-xs italic">Position is required</span>}
                                </div>

                                <div className="mb-2">
                                    <label htmlFor={`faculty-department-${index}`} className="block text-gray-700 font-bold mb-1">Department</label>
                                    <Controller
                                        name={`faculties.${index}.department`}
                                        control={control}
                                        render={({ field }) => (
                                            <input type="text" {...field} id={`faculty-department-${index}`} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                                        )}
                                    />
                                    {errors.faculties && errors.faculties[index] && errors.faculties[index].department && <span className="text-red-500 text-xs italic">Department is required</span>}
                                </div>

                                <div className="mb-2">
                                    <label htmlFor={`faculty-email-${index}`} className="block text-gray-700 font-bold mb-1">Contact Email</label>
                                    <Controller
                                        name={`faculties.${index}.contactEmail`}
                                        control={control}
                                        render={({ field }) => (
                                            <input type="email" {...field} id={`faculty-email-${index}`} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                                        )}
                                    />
                                    {errors.faculties && errors.faculties[index] && errors.faculties[index].contactEmail && <span className="text-red-500 text-xs italic">Valid email is required</span>}
                                </div>

                                <button type="button" onClick={() => remove(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Remove Faculty</button>
                            </div>
                        ))}

                        <button type="button" onClick={() => append({ name: '', position: '', department: '', contactEmail: '' })} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Faculty</button>
                    </div> 

            {/** submit button */}
                     <button className='w-full rounded-lg bg-indigo-500 text-white h-12 transition-all duration-300 ease-in-out hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 shadow-md hover:shadow-lg active:scale-[0.98]'>
                        Submit
                    </button>
          </form>
        </div>
      </div>
  )
}

export default CreateUniversity
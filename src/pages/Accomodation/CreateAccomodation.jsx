import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import slugify from 'slugify'
import JoditEditor from 'jodit-react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCountries } from '../../features/actions/countryAction'
import { createAccomodation } from '../../features/actions/accomodationAction'
const accomodationType = [
    {
      id:1,
      value:"DORMITORY"
    },
    {
      id:2,
      value:"PG"
    }
]



const CreateAccomodation = () => {
    const dispatch = useDispatch()
    const [selectedImages, setSelectedImages] = useState([])
    const [selectedAmenitiesImages, setSelectedAmenitiesImages] = useState([])
    const [lat, setLat] = useState(0)
    const [lon, setLong] = useState(0)
    const {register, handleSubmit, formState:{errors}, setValue, watch, control} = useForm()
    const { countryData } = useSelector(state=> state.countries)
    
    /** Creating the slug from the accomodation name */
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
 
   
        /**--------Image handler-----------*/
    const handleSelectImage = (e) => {
        setSelectedImages(Array.from(e.target.files));
    }

    const handleSelectAmenitiesImage =(e)=>{
        setSelectedAmenitiesImages(Array.from(e.target.files))
    }

    /**lat and long handler */
    const handleEnterLatitude=(e)=>{
        setLat(parseFloat(e.target.value))
    }
    const handleEnterLongitude =(e)=>{
        setLong(parseFloat(e.target.value))
    }
    let tempCordinates = []
    if(lat > 0 && lon > 0){
     tempCordinates =[lat,lon]
    }
    // console.log('the temp coord', tempCordinates)
    // console.log('the value of lat and long is', lat, lon, typeof lat, typeof lon)
    const submitForm = (data)=>{
        const formData = { 
            ...data, 
            images: selectedImages, 
            amenities: selectedAmenitiesImages,
            location: {
                ...data.location,
                locationCoordinates: {
                    coordinates: tempCordinates
                }
            }
        };
        dispatch(createAccomodation(formData))
    }

        /**------------Config of Jodit Editor----------------*/
    const config = {
        readonly: false,
        height: 400,
        toolbar: true,
        buttons: [
            "source",
            "|",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "|",
            "superscript",
            "subscript",
            "|",
            "ul",
            "ol",
            "|",
            "outdent",
            "indent",
            "|",
            "font",
            "fontsize",
            "brush",
            "paragraph",
            "|",
            "image",
            "video",
            "file",
            "table",
            "link",
            "|",
            "align",
            "undo",
            "redo",
            "|",
            "hr",
            "eraser",
            "copyformat",
            "selectall",
            "|",
            "print",
            "about",
        ],
        uploader: {
            insertImageAsBase64URI: true,
            url: "your-upload-url", // If you have a file upload URL
            format: "json",
        },
        placeholder: "Start typing here...",
        showCharsCounter: true,
        showWordsCounter: true,
        showXPathInStatusbar: false,
        spellcheck: true,
        allowResizeY: true,
        allowResizeX: false,
        language: "en",
        askBeforePasteHTML: true,
        askBeforePasteFromWord: true,
    };

    /** useeffect for getting the  country */
    useEffect(()=>{
      dispatch(getAllCountries())
    },[])
  return (
  <main className="flex-1 p-8 mt-16 ml-64 bg-gray-100 min-h-screen">
    <div>CreateAccomodation</div>
    <div className='container mx-auto p-10'> 
        <form className='bg-white rounded-md shadow-md p-8' onSubmit={handleSubmit(submitForm)}>
            {/**-----Name----*/}
            <div className='mb-6'>
                      <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-700"
                      >
                          Accomodation Name
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
            {/**---------Slug----------*/}

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
            {/**------dormitory type selection section------*/}
            <div className='mb-6'>
                <label
                    htmlFor="type"
                    className="block mb-2 text-sm font-medium text-gray-700"
                >
                   
                </label>
                <select
                {...register("type",{ required:"Choose the accomodation type"})}
                >
                    <option value="">Select Dormitory Type</option>
                    {accomodationType.map((value) => (
                        <option key={value.id} value={value.value}>
                            {value.value}
                        </option>
                    ))} 
                </select>
                {errors.type && <p>{errors.type.message}</p>}
            </div>
            {/**-----------description section------------*/}
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Blog Content
                </label>
                <Controller
                    control={control}
                    name="description"
                    rules={{ required: "Content is required" }}
                    render={({ field }) => (
                        <JoditEditor
                        //   ref={editorRef}
                            value={field.value}
                            config={config}
                            onBlur={field.onBlur}
                            onChange={(content) => field.onChange(content)}
                        />
                    )}
                />
                {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.description?.message}
                    </p>
                )}
            </div>

            {/**-----------Images----------------*/}
            <div className="mb-6">
                <label
                    htmlFor="images"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Upload images
                </label>
                <input
                    type="file"
                    id="images"
                    accept="image/*"
                    multiple
                    {...register("images", { required: "Images are required" })}
                    onChange={handleSelectImage}
                    className={`block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:bg-blue-50 file:text-blue-700 ${errors.images ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                />
            </div>
            {/**-----------Countries Section-----------*/}
            <div className='mb-6'>
                <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                   Country
                </label>
                <select
                {...register("location.country",{
                    required:"Please Select a Country"
                })}
                >
                 <option value="">Select a country</option>
                 {Array.isArray( countryData) && countryData.map((el)=>(
                    <option key={el?._id} value={el?._id}>
                      {el?.name}
                    </option>
                 ))}
                </select>
                {errors.location && <p>{errors.location.message}</p>}
            </div>
            {/**------------state--------------*/}
            <div className='mb-6'>
                <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    State
                </label>
                <input
                type='text'
                id='state'
                {...register("location.state",{ required:"State is required"})} 
                />
                {errors.location && <p>{errors.location.message}</p>}
            </div>
            {/**-----------district-----------*/}
            <div className='mb-6'>
                <label
                    htmlFor="district"
                    className="block mb-2 text-sm font-medium text-gray-700"
                >
                    Accomodation District
                </label>
                <input
                    type="text"
                    id="district"
                    {...register("location.district", { required: "District Name is required" })}
                    className={`shadow-sm bg-gray-50 border ${errors.location ? "border-red-500" : "border-gray-300"
                        } 
                    text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                    block w-full p-2.5`}
                    placeholder="Enter District"
                />
                {errors.location && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.location.message}
                    </p>
                )}
            </div>      
            {/**-----------City---------------*/}
            <div className='mb-6'>
                <label
                    htmlFor="city"
                    className="block mb-2 text-sm font-medium text-gray-700"
                >
                    Accomodation City
                </label>
                <input
                    type="text"
                    id="city"
                    {...register("location.city", { required: "City Name is required" })}
                    className={`shadow-sm bg-gray-50 border ${errors.location ? "border-red-500" : "border-gray-300"
                        } 
            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
            block w-full p-2.5`}
                    placeholder="Enter City"
                />
                {errors.location && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.location.message}
                    </p>
                )}
            </div>  
            {/**----------location Coordinates--------*/}
            {/* <div className='mb-6'>
                <label
                    htmlFor="coordinates"
                    className="block mb-2 text-sm font-medium text-gray-700"
                >
                    Accomodation Coordinates
                </label>
                <input
                    type="text"
                    id="coordinates"
                    {...register("location.locationCoordinates.coordinates", { required: "Coordinates are required" })}
                    className={`shadow-sm bg-gray-50 border ${errors.location ? "border-red-500" : "border-gray-300"
                                        } 
                    text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                    block w-full p-2.5`}
                    placeholder="Enter City"
                />
                {errors.location && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.location.message}
                    </p>
                )}
            </div> */}
            {/**-----------enter latitude-------*/} 
                  <div className='mb-6'>
                      <label
                          htmlFor="latitude"
                          className="block mb-2 text-sm font-medium text-gray-700"
                      >
                          Latitude
                      </label>
                      <input
                          type="float"
                          id="latitude"
                          onChange={handleEnterLatitude}
                        //   {...register("location.locationCoordinates.coordinates", { required: "Coordinates are required" })}
                          className={`shadow-sm bg-gray-50 border ${errors.latitude ? "border-red-500" : "border-gray-300"
                              } 
                    text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                    block w-full p-2.5`}
                          placeholder="Enter Latitude"
                      />
                      {errors.latitude && (
                          <p className="text-red-500 text-sm mt-1">
                              {errors.latitude.message}
                          </p>
                      )}
                  </div>
            {/**------------Logitude -----------*/}
                  <div className='mb-6'>
                      <label
                          htmlFor="longitude"
                          className="block mb-2 text-sm font-medium text-gray-700"
                      >
                          Longitude
                      </label>
                      <input
                          type="float"
                          id="longitude"
                          onChange={handleEnterLongitude}
                          //   {...register("location.locationCoordinates.coordinates", { required: "Coordinates are required" })}
                          className={`shadow-sm bg-gray-50 border ${errors.longitude ? "border-red-500" : "border-gray-300"
                              } 
                    text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                    block w-full p-2.5`}
                          placeholder="Enter Longitude"
                      />
                      {errors.longitude && (
                          <p className="text-red-500 text-sm mt-1">
                              {errors.longitude.message}
                          </p>
                      )}
                  </div>
            {/**-------------capacity----------------*/}
            <div className='mb-6'>
                <label
                    htmlFor="capacity"
                    className="block mb-2 text-sm font-medium text-gray-700"
                >
                    Accomodation Capacity
                </label>
                <input
                    type="number"
                    id="capacity"
                    {...register("capacity", { required: "Capacity is required" })}
                    className={`shadow-sm bg-gray-50 border ${errors.capacity ? "border-red-500" : "border-gray-300"
                        } 
                    text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                    block w-full p-2.5`}
                    placeholder="Enter Capacity"
                />
                {errors.capacity && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.capacity.message}
                    </p>
                )}
            </div> 
            {/**------------available spaces-----------*/}
                  <div className='mb-6'>
                      <label
                          htmlFor="availableSpaces"
                          className="block mb-2 text-sm font-medium text-gray-700"
                      >
                          Accomodation Available Spaces
                      </label>
                      <input
                          type="number"
                          id="availableSpaces"
                          {...register("availableSpaces", { required: "availableSpaces is required" })}
                          className={`shadow-sm bg-gray-50 border ${errors.availableSpaces ? "border-red-500" : "border-gray-300"
                              } 
                    text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                    block w-full p-2.5`}
                          placeholder="Enter available Spaces"
                      />
                      {errors.availableSpaces && (
                          <p className="text-red-500 text-sm mt-1">
                              {errors.availableSpaces.message}
                          </p>
                      )}
                  </div>  
            {/**----------amenities but will take images that to multiple----------*/}

                  <div className="mb-6">
                      <label
                          htmlFor="amenities"
                          className="block text-sm font-medium text-gray-700 mb-2"
                      >
                          Upload amenities images
                      </label>
                      <input
                          type="file"
                          id="amenities"
                          accept="image/*"
                          multiple
                          {...register("amenities", { required: "Images are required" })}
                          onChange={handleSelectAmenitiesImage}
                          className={`block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:bg-blue-50 file:text-blue-700 ${errors.amenities ? "border-red-500" : "border-gray-300"
                              } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                      />
                  </div>
            {/**-----------amenities names-----------*/}
                  <div className='mb-6'>
                      <label
                          htmlFor="amenitiesNames"
                          className="block mb-2 text-sm font-medium text-gray-700"
                      >
                          Accomodation amenities Names
                      </label>
                      <input
                          type="text"
                          id="amenitiesNames"
                          {...register("amenitiesNames", { required: "amenities Names are required" })}
                          className={`shadow-sm bg-gray-50 border ${errors.amenitiesNames ? "border-red-500" : "border-gray-300"
                              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                          placeholder="Enter City"
                      />
                      {errors.amenitiesNames && (
                          <p className="text-red-500 text-sm mt-1">
                              {errors.amenitiesNames.message}
                          </p>
                      )}
                  </div>
            {/**------------fees monthly-------------*/}
                  <div className='mb-6'>
                      <label
                          htmlFor="feesmonthly"
                          className="block mb-2 text-sm font-medium text-gray-700"
                      >
                          Monthly Fees of the Accomodation
                      </label>
                      <input
                          type="text"
                          id="feesmonthly"
                          {...register("fees.monthly", { required: "fees is required"})}
                          className={`shadow-sm bg-gray-50 border ${errors.fees ? "border-red-500" : "border-gray-300"
                              } 
                        text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5`}
                          placeholder="Enter fees"
                      />
                      {errors.fees && (
                          <p className="text-red-500 text-sm mt-1">
                              {errors.fees.message}
                          </p>
                      )}
                  </div>  
            {/**------------security fees deposit-----------*/}
                  <div className='mb-6'>
                      <label
                          htmlFor="security"
                          className="block mb-2 text-sm font-medium text-gray-700"
                      >
                          Security Deposit
                      </label>
                      <input
                          type="text"
                          id="security"
                          {...register("fees.securityDeposit", { required: "securityDeposit fees is required" })}
                          className={`shadow-sm bg-gray-50 border ${errors.securityDeposit ? "border-red-500" : "border-gray-300"
                              } 
                        text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5`}
                          placeholder="Enter securityDeposit"
                      />
                      {errors.fees && (
                          <p className="text-red-500 text-sm mt-1">
                              {errors.fees.message}
                          </p>
                      )}
                  </div>  
            {/**------------contact phone------------------*/}
                  <div className='mb-6'>
                      <label
                          htmlFor="phone"
                          className="block mb-2 text-sm font-medium text-gray-700"
                      >
                         Contact Number
                      </label>
                      <input
                          type="text"
                          id="phone"
                          {...register("contactInfo.phone", { required: "contactInfo fees is required" })}
                          className={`shadow-sm bg-gray-50 border ${errors.contactInfo ? "border-red-500" : "border-gray-300"
                              } 
                        text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5`}
                          placeholder="Enter contactInfo"
                      />
                      {errors.contactInfo && (
                          <p className="text-red-500 text-sm mt-1">
                              {errors.contactInfo.message}
                          </p>
                      )}
                  </div>
            {/**------------contact  email ----------------*/}
                  <div className='mb-6'>
                      <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-gray-700"
                      >
                          Contact email
                      </label>
                      <input
                          type="text"
                          id="email"
                          {...register("contactInfo.email", { required: "contactInfo fees is required" })}
                          className={`shadow-sm bg-gray-50 border ${errors.contactInfo ? "border-red-500" : "border-gray-300"
                              } 
                        text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5`}
                          placeholder="Enter contactInfo"
                      />
                      {errors.contactInfo && (
                          <p className="text-red-500 text-sm mt-1">
                              {errors.contactInfo.message}
                          </p>
                      )}
                  </div>
            {/**------------Owner Name --------------------*/}\
                  <div className='mb-6'>
                      <label
                          htmlFor="ownerName"
                          className="block mb-2 text-sm font-medium text-gray-700"
                      >
                       Owner Name
                      </label>
                      <input
                          type="text"
                          id="ownerName"
                          {...register("ownerName", { required: "owner Name is required" })}
                          className={`shadow-sm bg-gray-50 border ${errors.ownerName ? "border-red-500" : "border-gray-300"
                              } 
                        text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5`}
                          placeholder="Enter owner Name"
                      />
                      {errors.ownerName && (
                          <p className="text-red-500 text-sm mt-1">
                              {errors.ownerName.message}
                          </p>
                      )}
                  </div>
         {/** button to submit */}
         <button type='submit'>
            Submit
         </button>
        </form>
    </div>
  </main>
  )
}

export default CreateAccomodation
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUniversities } from '../../../features/actions/universityAction';
import { getAllCourse, getAllSpecialization } from '../../../features/actions/courseAction';

const AddCourse = () => {
   const dispatch = useDispatch();
   // getting universities from the store 
   const { universityInfo } = useSelector((state) => state.universities)
    
    useEffect(()=>{
        dispatch(getAllUniversities())
        dispatch(getAllSpecialization())
        dispatch(getAllCourse())
    },[])
  return (
    <main className="flex-1 p-8 mt-16 ml-64">
      <div>AddCourse</div>
    </main>
  )
}

export default AddCourse
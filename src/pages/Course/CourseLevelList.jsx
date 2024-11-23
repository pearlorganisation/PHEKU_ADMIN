import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCourseLevel, getAllCourse } from '../../features/actions/courseAction';
import { Link } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri';
import ConfirmDeleteModal from '../../components/ConfirmModal/ConfirmDeleteModal';
const CourseLevelList = () => {
   const dispatch = useDispatch();
    const { courseLevelInfo } = useSelector((state)=>state.course);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCourseLevelId, setSelectedCourseLevelId] = useState(null);
    
    useEffect(() => {
        dispatch(getAllCourse());
    }, [dispatch]);
    
    const handleDelete =(id)=>{
        setSelectedCourseLevelId(id)
        setShowDeleteModal(true)
    }

    const confirmDelete =()=>{
      dispatch(deleteCourseLevel(selectedCourseLevelId));
      dispatch(getAllCourse())
      setShowDeleteModal(false)
    }
    
 
  return (
      <main className="flex-1 p-8 mt-16 ml-64">
          <div className="text-4xl font-bold mb-6 flex justify-between items-center">
              <div>Course Level Management</div>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <div className="pb-4 bg-white dark:bg-gray-900 flex justify-end">
                  {/* <input
                      type="text"
                      id="table-search"
                      className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50"
                      placeholder="Search for items"
                  /> */}
                  <Link to="/course-level" relative="path">
                      <span className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 font-medium rounded-lg text-sm px-4 py-2">
                          Create Course Level
                      </span>
                  </Link>
              </div>
              <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                          <th className="px-6 py-3">Course Level Name</th>
                          <th className="px-6 py-3">Action</th>
                      </tr>
                  </thead>
                  <tbody>
                      {Array.isArray(courseLevelInfo) &&
                          courseLevelInfo?.map((course, index) => (
                              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                  <th className="px-6 py-4 font-medium text-gray-900">
                                      {course?.level || "N/A"}
                                  </th>
                                  <td className="px-6 py-4 flex gap-2">
                                      <Link
                                          to={`${course?._id}`}
                                          className="font-medium text-blue-600 hover:underline"
                                      >
                                          Edit
                                      </Link>
                                      <button onClick={() => handleDelete(course?._id)}>
                                          <RiDeleteBin6Line size={20} color="red" />
                                      </button>
                                  </td>
                              </tr>
                          ))}
                  </tbody>
              </table>

              {/* Delete Confirmation Modal */}
              {showDeleteModal && (
                  <ConfirmDeleteModal
                      confirmDelete={confirmDelete}
                      setShowDeleteModal={setShowDeleteModal}
                  />
              )}
          </div>
      </main>
  )
}

export default CourseLevelList
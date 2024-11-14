import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteRole, getRoles } from '../../../features/actions/rolesActions';
import { Link } from 'react-router-dom';
 import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmDeleteModal from '../../../components/ConfirmModal/ConfirmDeleteModal';
 const ListRoles = () => {
    const dispatch = useDispatch();
    const { rolesInfo, loading, error } = useSelector((state) => state.role); // Access loading and error states
     
     const [showDeleteModal, setShowDeleteModal] = useState(false);
     const [selectedRoleId, setSelectedRoleId] = useState(null);

     useEffect(() => {
         dispatch(getRoles());
     }, [dispatch]);

     const handleDelete = (roleId) => {
         setSelectedRoleId(roleId);
         setShowDeleteModal(true);
     };

     const confirmDelete = () => {
         dispatch(deleteRole(selectedRoleId));
         dispatch(getRoles())
         setShowDeleteModal(false);
        // reloadiingn the page
        // window.location.reload(true);
     };

     if (loading) {
         return <div>Loading roles...</div>;
     }

     if (error) {
         return <div>Error: {error}</div>;
     }
    

     return (
         <main className="flex-1 p-8 mt-16 ml-64">
             <div className="text-4xl font-bold mb-6 flex justify-between items-center">
                 <div>Role Management</div>
             </div>
             <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                 <div className="pb-4 bg-white dark:bg-gray-900 flex justify-between">
                     <input type="text" id="table-search" className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50" placeholder="Search for items" />
                     <Link to="/create-roles">
                         <button className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 font-medium rounded-lg text-sm px-4 py-2">
                             Add Role
                         </button>
                     </Link>
                 </div>
                 <table className="w-full text-sm text-left text-gray-500">
                     <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                         <tr>
                             <th className="px-6 py-3">Role name</th>
                             <th className="px-6 py-3">Description</th>
                             <th className="px-6 py-3">Permissions</th>
                             <th className="px-6 py-3">Action</th>
                         </tr>
                     </thead>
                     <tbody>
                         {Array.isArray(rolesInfo) && rolesInfo.map((role, index) => (
                             <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                 <th className="px-6 py-4 font-medium text-gray-900">{role.roleName || "N/A"}</th>
                                 <td className="px-6 py-4">{role.description || "No description available"}</td>
                                 <td className="px-6 py-4">{role.permissions?.join(", ") || "No permissions available"}</td>
                                 <td className="px-6 py-4 flex gap-2">
                                     <Link to={`/roles/${role._id}`} className="font-medium text-blue-600 hover:underline">Edit</Link>
                                     <button onClick={() => handleDelete(role._id)}>
                                         <RiDeleteBin6Line size={20} color='red' />
                                     </button>
                                 </td>
                             </tr>
                         ))}
                     </tbody>
                 </table>

                 {/* Delete Confirmation Modal */}
                 {showDeleteModal && (
                   <ConfirmDeleteModal confirmDelete={confirmDelete} setShowDeleteModal={setShowDeleteModal} />   
                 )}
             </div>
         </main>
     );
}

export default ListRoles
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRoles } from '../../../features/actions/rolesActions';
import { Link } from 'react-router-dom';
import { LuPen } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";

const ListRoles = () => {
    const dispatch = useDispatch();
    const { rolesInfo, loading, error } = useSelector((state) => state.role); // Access loading and error states

    useEffect(() => {
        dispatch(getRoles());
    }, [dispatch]); // Add dispatch as a dependency

    if (loading) {
        return <div>Loading roles...</div>; // Display loading message
    }

    if (error) {
        return <div>Error: {error}</div>; // Display error message
    }

    return (
        <main className="flex-1 p-8 mt-16 ml-64">
            <div className="text-4xl font-bold mb-6 flex justify-between items-center">
                <div>Role Management</div>
                <Link to="/create-roles">
                    <button className="font-normal text-white text-2xl bg-blue-800 py-2 px-4 rounded">
                        + Create New Role
                    </button>
                </Link>
            </div>

            <div className="bg-white shadow rounded-lg p-4">
                {/* Search bar */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search roles..."
                        className="w-full p-2 border rounded-lg"
                    />
                </div>

                {/* Roles table */}
                <div className="overflow-x-auto bg-gray-100 rounded-lg">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-gray-100 border-b text-gray-700 font-semibold text-left">
                                <th className="p-4">ROLE NAME</th>
                                <th className="p-4">DESCRIPTION</th>
                                <th className="p-4">PERMISSIONS</th>
                                <th className="p-4">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rolesInfo?.map((role) => (
                                <tr key={role?._id} className="border-b">
                                    <td className="p-4 font-bold">{role?.roleName}</td>
                                    <td className="p-4 text-gray-600">{role?.description}</td>
                                    <td className="p-4">
                                        {/* <div className="flex gap-2">
                                            Placeholder for permissions
                                            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                                {role?.permission}
                            </span>
                                        </div> */}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <button className="text-black font-bold py-1 px-2 rounded">
                                                <LuPen />
                                            </button>
                                            <button className="text-red-600 font-bold py-1 px-2 rounded">
                                                <RiDeleteBin6Line />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
  )
}

export default ListRoles
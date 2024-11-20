import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRoleById, updateById } from '../../features/actions/rolesActions';

const EditRole = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    
    const [formData, setFormData] = useState({
        roleName: '',
        description: ''
    });

    const { singleRole } = useSelector((state) => state.role);

    useEffect(() => {
        dispatch(getRoleById(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (singleRole) {
            setFormData({
                roleName: singleRole.roleName || '',
                description: singleRole.description || ''
            });
        }
    }, [singleRole]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const submitForm = (e) => {
        e.preventDefault();
        dispatch(updateById({ id, data: formData }));
        setTimeout(()=>{
            dispatch(getRoleById(id))
        },100);
    };

    if (!singleRole) {
        return <p>Loading...</p>;
    }

    return (
        <main className="flex-1 p-8 mt-16 ml-64">
            <div className="text-4xl font-bold mb-4">Edit Role</div>
            <form onSubmit={submitForm}>
                <div className="mb-4">
                    <label htmlFor="roleName" className="block text-sm font-medium text-gray-700">
                        Role Name
                    </label>
                    <input
                        type="text"
                        id="roleName"
                        name="roleName"
                        value={formData.roleName}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full rounded-md border-purple-300 border-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full rounded-md border-purple-300 border-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Update Role
                </button>
            </form>
        </main>
    );
};

export default EditRole;
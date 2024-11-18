import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleSpecialization, updateSpecialization } from '../../features/actions/courseAction';

const EditCourseSpecialization = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { singleSpecialization } = useSelector((state) => state.course);

    const [name, setName] = useState('');

    // Handle input change
    const handleInputChange = (e) => {
        setName(e.target.value);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateSpecialization({ id, name }));
    };

    // Fetch specialization details on mount
    useEffect(() => {
        dispatch(getSingleSpecialization(id));
    }, [dispatch, id]);

    // Update local state when `singleSpecialization` changes
    useEffect(() => {
        if (singleSpecialization?.name) {
            setName(singleSpecialization.name);
        }
    }, [singleSpecialization]);

    return (
        <main className="flex-1 p-8 mt-16 ml-64">
            <div className="text-4xl font-bold mb-4">Edit Specialization</div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Specialization Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleInputChange}
                        className="mt-1 p-2 block w-full rounded-md border-purple-300 border-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Update Specialization
                </button>
            </form>
        </main>
    );
};

export default EditCourseSpecialization;

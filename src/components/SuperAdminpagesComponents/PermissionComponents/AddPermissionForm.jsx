// components/pages/training/AddproductFrom.js

import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { permissionsData as initialData } from './permissionsData';

const AddPermissionForm = ({ onClose }) => {
    const [permissionsData, setPermissionsData] = useState(initialData);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [newPermission, setNewPermission] = useState('');

    const handleAddPermission = (e) => {
        e.preventDefault();

        if (!selectedCategory || !newPermission.trim()) {
            alert("Please select a category and enter a permission.");
            return;
        }

        // Add new permission to the selected category
        setPermissionsData((prevData) => ({
            ...prevData,
            [selectedCategory]: {
                ...prevData[selectedCategory],
                permissions: [
                    ...prevData[selectedCategory].permissions,
                    newPermission.trim()
                ]
            }
        }));

        setNewPermission('');
        alert("Permission added successfully!");
    };

    return (
        <div className="addvideo-from">
            <div className="form-header-inner d-flex justify-content-between align-items-center mb-3">
                <h3 className="mb-0">Add New Permission</h3>
                <FaTimes onClick={onClose} className="close-icon cursor-pointer" />
            </div>

            <form onSubmit={handleAddPermission} className='add-form-box'>
                <div className='employee-search-area-box mb-3'>
                    <label>Select Category:</label>
                    <select 
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className=' input-size-form-control-search'
                    >
                        <option value="">-- Select Category --</option>
                        {Object.entries(permissionsData).map(([key, value]) => (
                            <option key={key} value={key}>
                                {value.category}
                            </option>
                        ))}
                    </select>
                </div>

               <div className='employee-search-area-box mb-3'>
                    <label>Permission Name:</label>
                    <input
                        type="text"
                        placeholder="Enter new permission"
                        value={newPermission}
                        onChange={(e) => setNewPermission(e.target.value)}
                        className='input-size form-control-search'
                    />
                </div>

                 <div className="form-buttons d-flex gap-3">
                    <button type="submit" className="btn btn-primary btn-sm">
                        Submit
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddPermissionForm;

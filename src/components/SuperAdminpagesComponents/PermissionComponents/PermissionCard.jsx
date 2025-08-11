import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { permissionsData } from './permissionsData';
import AddPermissionForm from './AddPermissionForm'; 
import Breadcrumb from '../../MainComponents/breadcrumb/Breadcrumb';

const PermissionCard = () => {
    const [selectedPermissions, setSelectedPermissions] = useState({});
    const [showForm, setShowForm] = useState(false); // Add missing state
    const handleCheckboxChange = (category, permission) => {
        setSelectedPermissions((prev) => ({
            ...prev,
            [category]: {
                ...prev[category],
                [permission]: !prev[category]?.[permission],
            },
        }));
    };

    return (
        <section className="main-content-area">
            <Breadcrumb
                title="Permission"
                titleIcon="bx bx-lock icon"
                buttons={[
                    {
                        label: (
                            <Link to="#">
                                <button type="button" className="addTaskBtn">
                                    <i className="bx bx-arrow-back"></i> Back
                                </button>
                            </Link>
                        )
                    },
                    {
                        label: (
                            <button className="addTaskBtn" onClick={() => setShowForm(true)}>
                                <FaPlus className="mr-1" /> Add Permission
                            </button>
                        )
                    }
                ]}
            />

            {/* Slide Form Panel */}
            <div className={`slide-form-wrapper ${showForm ? 'show' : ''}`}>
                <AddPermissionForm onClose={() => setShowForm(false)} />
            </div>

            {/* Permissions Section */}
            <div className="row-bg mt-3">
                <div className="permission-container">
                    {Object.entries(permissionsData).map(([category, perms]) => (
                        <div key={category} className="permission-section filterformpay">
                            <h3>{perms.category}</h3>
                            <div className="permission-checkboxes">
                                {perms.permissions.map((perm) => {
                                    const isChecked = !!selectedPermissions[category]?.[perm];
                                    return (
                                        <label
                                            key={perm}
                                            className={`permission-checkbox ${isChecked ? 'checked' : ''}`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={isChecked}
                                                onChange={() => handleCheckboxChange(category, perm)}
                                            />
                                            <span>{perm}</span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PermissionCard;

import React, { useState, useEffect, useRef } from 'react';
import './ProfileDetails.css';
import { FaEdit, FaTrash, FaCloudUploadAlt } from 'react-icons/fa';

const ProfileDetails = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const hasSkipped = localStorage.getItem('profile_slide_skipped');
        const isLoggedIn = localStorage.getItem('is_logged_in');
        if (!hasSkipped && isLoggedIn === 'true') {
            setIsOpen(true);
        }
    }, []);

    const handleEditClick = (e) => {
        e.preventDefault();
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteClick = (e) => {
        e.preventDefault();
        setImagePreview(null);
        fileInputRef.current.value = null;
    };

    const handleSkip = () => {
        setIsOpen(false);
        localStorage.setItem('profile_slide_skipped', 'true');
    };

    return (
        <div className={`profile-slide-wrapper ${isOpen ? 'open' : 'closed'}`}>
            <div className="profile-header">
                <h2>Profile Details</h2>
                <button className="btn-skip" onClick={handleSkip}>SKIP</button>
            </div>

            <form className="profile-form">
                <div className="profile-box">
                    {/* Image Upload Section */}
                    <div className="profile-image-section">
                        {imagePreview ? (
                            <img src={imagePreview} alt="Profile" className="profile-image" />
                        ) : (
                            <div
                                className="image-upload-placeholder"
                                onClick={() => fileInputRef.current.click()}
                                style={{ cursor: 'pointer' }}
                            >
                                <FaCloudUploadAlt size={24} />
                                <p>Select an image file</p>
                            </div>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />

                        {imagePreview && (
                            <div className="image-actions">
                                <button className="icon-btn" onClick={handleEditClick}>
                                    <FaEdit />
                                </button>
                                <button className="icon-btn delete" onClick={handleDeleteClick}>
                                    <FaTrash />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="action-buttons">
                        <button type="submit" className="btn btn-primary btn-sm">Update</button>
                        <button type="button" className="btn btn-sm custom-reset">Reset Password</button>
                    </div>

                    {/* Form Fields */}
                   <div className="employee-search-area-box mb-2">
                        <label className="form-label mb-0">Name:</label>
                        <input type="text" placeholder="Enter Employee Name" className="input-size form-control-search" />
                    </div>

                    <div className="form-row">
                       <div className="employee-search-area-box mb-2">
                            <label className="form-label mb-0">Role:</label>
                            <input type="text" defaultValue="SUPER_ADMIN" readOnly className="input-size form-control-search" />
                        </div>
                       <div className="employee-search-area-box mb-2">
                            <label className="form-label mb-0">Employee ID:</label>
                            <input type="text" placeholder="Enter Employee Id" className="input-size form-control-search" />
                        </div>
                       <div className="employee-search-area-box mb-2">
                            <label className="form-label mb-0">Date of Birth:</label>
                            <input type="date" className="input-size form-control-search" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="employee-search-area-box w-100 mb-2">
                            <label className="form-label mb-0">Designation:</label>
                            <input type="text" placeholder="Enter Designation" className="input-size form-control-search" />
                        </div>
                        <div className="employee-search-area-box w-100 mb-2">
                            <label className="form-label mb-0">Department:</label>
                            <input type="text" placeholder="Enter Department" className="input-size form-control-search" />
                        </div>
                    </div>

                    <div className="employee-search-area-box mb-2">
                        <label className="form-label mb-0">Email:</label>
                        <input type="email" placeholder="Enter Email Id" className="input-size form-control-search" />
                    </div>

                   <div className="employee-search-area-box mb-2">
                        <label className="form-label mb-0">Phone Number:</label>
                        <input type="text" placeholder="Enter Phone Number" className="input-size form-control-search" />
                    </div>

                   <div className="employee-search-area-box mb-2">
                        <label className="form-label mb-0">LinkedIn:</label>
                        <input type="text" placeholder="Enter LinkedIn ID" className="input-size form-control-search" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProfileDetails;

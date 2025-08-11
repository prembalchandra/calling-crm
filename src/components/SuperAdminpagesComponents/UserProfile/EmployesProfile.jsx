import React, { useState, useRef } from 'react';
import { FaEdit, FaTrash, FaCloudUploadAlt } from 'react-icons/fa';

const EmployesProfile = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // Image change handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Edit button handler
  const handleEditClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  // Delete button handler
  const handleDeleteClick = (e) => {
    e.preventDefault();
    setImagePreview(null);
    fileInputRef.current.value = null;
  };

  return (
    <section className='main-content-area'>
      <div className='profile--wrapper'>
        <form className="delete-account-form-inner-bxo">
          <div className="profile-box">

            {/* Profile Image Upload */}
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
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />

              {imagePreview && (
                <div className="image-actions d-flex gap-2 mt-2">
                  <button className="icon-btn btn btn-sm btn-info" onClick={handleEditClick}>
                    <FaEdit />
                  </button>
                  <button className="icon-btn btn btn-sm btn-danger" onClick={handleDeleteClick}>
                    <FaTrash />
                  </button>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="action-buttons d-flex gap-2 mb-3 mt-3">
              <button type="submit" className="btn btn-primary btn-sm">Update</button>
              <button type="button" className="btn btn-sm custom-reset">Reset Password</button>
            </div>

            {/* Form Fields */}
            <div className="employee-search-area-box mb-2">
              <label className="form-label mb-0">Name:</label>
              <input type="text" placeholder="Enter Employee Name" className="input-size form-control-search" />
            </div>

            <div className="form-row d-flex gap-3">
              <div className="employee-search-area-box mb-2 w-100">
                <label className="form-label mb-0">Role:</label>
                <input type="text" value="SUPER_ADMIN" readOnly className="input-size form-control-search" />
              </div>
              <div className="employee-search-area-box mb-2 w-100">
                <label className="form-label mb-0">Employee ID:</label>
                <input type="text" placeholder="Enter Employee ID" className="input-size form-control-search" />
              </div>
              <div className="employee-search-area-box mb-2 w-100">
                <label className="form-label mb-0">Date of Birth:</label>
                <input type="date" className="input-size form-control-search" />
              </div>
            </div>

            <div className="form-row d-flex gap-3">
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
              <input type="email" placeholder="Enter Email ID" className="input-size form-control-search" />
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
    </section>
  );
};

export default EmployesProfile;

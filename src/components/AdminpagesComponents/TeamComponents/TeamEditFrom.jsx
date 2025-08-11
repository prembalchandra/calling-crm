import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';

function EditTeamForm({ onClose, data, onUpdated }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    designation: '',
    type: '',
    product: '',
    manager: ''
  });

  useEffect(() => {
    if (data) setFormData(data);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/teams/${data.id}`, formData);
      onUpdated(); // refresh data
      onClose();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="right-slide-form">
      <div className="form-header-inner">
        <h3>Edit Team Member</h3>
        <FaTimes onClick={onClose} className="close-icon" />
      </div>
      <form onSubmit={handleSubmit} className="add-form-box">
        <div className='row align-items-center'>
        <div className=" col-12 mb-1">
          <label className='form-label mb-0'>Name</label>
          <input type="text" name="name" className="input-size form-control-search" value={formData.name} onChange={handleChange} required />
        </div>
        <div className=" col-12 mb-1">
          <label className='form-label mb-0'>Phone</label>
          <input type="text" name="phone" className="input-size form-control-search" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className=" col-12 mb-1">
          <label className='form-label mb-0'>Email</label>
          <input type="email" name="email" className="input-size form-control-search" value={formData.email} onChange={handleChange} />
        </div>
        <div className=" col-12 mb-1">
          <label className='form-label mb-0'>Designation</label>
          <input type="text" name="designation" className="input-size form-control-search" value={formData.designation} onChange={handleChange} />
        </div>
        <div className=" col-12 mb-1">
          <label className='form-label mb-0'>Type</label>
          <select name="type" className=" input-size-form-control-search" value={formData.type} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Permanent">Permanent</option>
            <option value="Contractual">Contractual</option>
          </select>
        </div>
        <div className=" col-12 mb-1">
          <label className='form-label mb-0'>Product</label>
          <input type="text" name="product" className="input-size form-control-search" value={formData.product} onChange={handleChange} />
        </div>
        <div className=" col-12 mb-1">
          <label className='form-label mb-0'>Manager</label>
          <input type="text" name="manager" className="input-size form-control-search" value={formData.manager} onChange={handleChange} />
        </div>
        <div className="form-buttons d-flex gap-3 mt-4">
          <button type="submit" className="btn btn-primary btn-sm">Update</button>
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>Cancel</button>
        </div>
        </div>
      </form>
    </div>
  );
}

export default EditTeamForm;

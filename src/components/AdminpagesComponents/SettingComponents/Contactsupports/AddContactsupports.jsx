// components/pages/training/AddContactsupports.js

import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

function AddContactsupports({ onClose }) {
    const [formData, setFormData] = useState({
        contact_person: '',
        department:'',
        phone_number:'',
        email:''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted:', formData);
        onClose();
    };

    return (
        <div className="addvideo-from">
            <div className="form-header-inner">
                <h3>Add Contact Supports</h3>
                <FaTimes onClick={onClose} className="close-icon" />
            </div>
            <form onSubmit={handleSubmit} className='add-form-box'>
                <div className='employee-search-area-box mb-3'>
                    <label className='form-label mb-0'>Contact Person</label>
                    <input type="text" className='input-size form-control-search' name="contact_person" value={formData.contact_person} onChange={handleChange} required />
                </div>
                 <div className='employee-search-area-box mb-3'>
                    <label className='form-label mb-0'>Department</label>
                    <input type="text" className='input-size form-control-search' name="department" value={formData.department} onChange={handleChange} required />
                </div>
                 <div className='employee-search-area-box mb-3'>
                    <label className='form-label mb-0'>Phone Number</label>
                    <input type="text" className='input-size form-control-search' name="phone_number" value={formData.phone_number} onChange={handleChange} required />
                </div>
                 <div className='employee-search-area-box mb-3'>
                    <label className='form-label mb-0'>E-mail</label>
                    <input type="text" className='input-size form-control-search' name="email" value={formData.email} onChange={handleChange} required />
                </div>
                
                
                 <div className="form-buttons d-flex gap-3">
                    <button type="submit" className="btn btn-primary btn-sm">Submit</button>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default AddContactsupports;

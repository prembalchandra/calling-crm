// components/pages/training/AddproductFrom.js

import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

function CreateStatusform({ onClose }) {
    const [formData, setFormData] = useState({
        status_name: '',
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
                <h3>Create Status</h3>
                <FaTimes onClick={onClose} className="close-icon" />
            </div>
            <form onSubmit={handleSubmit} className='add-form-box'>
                
                <div className='employee-search-area-box mb-3'>
                    <label className='form-label mb-0'>Status</label>
                    <input type="text" className='input-size form-control-search' name="status_name" value={formData.status_name} onChange={handleChange} required />
                </div>

                
                 <div className="form-buttons d-flex gap-3">
                    <button type="submit" className="btn btn-primary btn-sm">Submit</button>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default CreateStatusform;

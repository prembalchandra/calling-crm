// components/pages/training/AddVideoForm.js

import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

function AddVideoForm({ onClose }) {
    const [formData, setFormData] = useState({
        date_video: '',
        uploader_name: '',
        Product_name: '',
        subProduct_name: '',
        language: '',
        video_link: ''
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
                <h3>Add Training Video</h3>
                <FaTimes onClick={onClose} className="close-icon" />
            </div>
            <form onSubmit={handleSubmit} className='add-form-box'>
                <div className='employee-search-area-box mb-3'>
                    <label className='form-label mb-0'>Date</label>
                    <input type="date" className='input-size form-control-search' name="date_video" value={formData.date_video} onChange={handleChange} required />
                </div>

                <div className='employee-search-area-box mb-3'>
                    <label className='form-label mb-0'>Uploader Name</label>
                    <input type="text" className='input-size form-control-search' name="uploader_name" value={formData.uploader_name} onChange={handleChange} required />
                </div>
                <div className='employee-search-area-box mb-3'>
                    <label className='form-label mb-0'>Product Name</label>
                    <input type="text" className='input-size form-control-search' name="Product_name" value={formData.Product_name} onChange={handleChange} required />
                </div>
                <div className='employee-search-area-box mb-3'>

                    <label className='form-label mb-0'>Sub Product</label>
                    <input type="text" className='input-size form-control-search' name="subProduct_name" value={formData.subProduct_name} onChange={handleChange} />
                </div>
                <div className='employee-search-area-box mb-3'>
                    <label className='form-label mb-0'>Language</label>
                    <select className='input-size form-control-search '  name="language" value={formData.language} onChange={handleChange}>
                        <option value="">Select Language</option>
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                        <option value="bn">Bengali</option>
                        <option value="gu">Gujarati</option>
                        <option value="kn">Kannada</option>
                        <option value="ml">Malayalam</option>
                        <option value="mr">Marathi</option>
                        <option value="ne">Nepali</option>
                        <option value="or">Oriya</option>
                        <option value="pa">Punjabi</option>
                        <option value="ta">Tamil</option>
                        <option value="te">Telugu</option>
                        <option value="ur">Urdu</option>
                    </select>
                </div>
                <div className='employee-search-area-box mb-3'>

                    <label className='form-label mb-0'>Video Link</label>
                    <input className='input-size form-control-search' type="url" name="video_link" value={formData.video_link} onChange={handleChange} required />
                </div>
                 <div className="form-buttons d-flex gap-3">
                    <button type="submit" className="btn btn-primary btn-sm">Submit</button>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default AddVideoForm;

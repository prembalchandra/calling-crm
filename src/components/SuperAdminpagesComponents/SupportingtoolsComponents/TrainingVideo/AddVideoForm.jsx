import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

function AddVideoForm({ onClose, onAddVideo }) {
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
        onAddVideo(formData); // Send data back to parent
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
                    <select className='input-size form-control-search ' name="language" value={formData.language} onChange={handleChange}>
                        <option value="">Select Language</option>
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Bengali">Bengali</option>
                        <option value="Gujarati">Gujarati</option>
                        <option value="Kannada">Kannada</option>
                        <option value="Malayalam">Malayalam</option>
                        <option value="Marathi">Marathi</option>
                        <option value="Nepali">Nepali</option>
                        <option value="Oriya">Oriya</option>
                        <option value="Punjabi">Punjabi</option>
                        <option value="Tamil">Tamil</option>
                        <option value="Telugu">Telugu</option>
                        <option value="Urdu">Urdu</option>
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

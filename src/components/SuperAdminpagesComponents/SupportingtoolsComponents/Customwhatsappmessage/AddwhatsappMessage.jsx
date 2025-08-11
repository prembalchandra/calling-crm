// components/pages/training/AddwhatsappMessage.js

import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

function AddwhatsappMessage({ onClose }) {
    const [formData, setFormData] = useState({
        template_name: '',
        owned_name: '',
        title_messages: '',
        date: '',
        description: ''
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
                <h3>Add WhatsApp Message</h3>
                <FaTimes onClick={onClose} className="close-icon" />
            </div>

            <form onSubmit={handleSubmit} className='add-form-box'>

                <div className='employee-search-area-box mb-3'>
                    <label className='form-label mb-0'>Template Name</label>
                    <input
                        type="text"
                        className='input-size form-control-search'
                        name="template_name"
                        value={formData.template_name}
                        onChange={handleChange}
                        placeholder="Enter Template Name"
                        required
                    />
                </div>

                <div className='employee-search-area-box mb-3'>
                    <label className='form-label mb-0'>Owned Name</label>
                    <input
                        type="text"
                        className='input-size form-control-search'
                        name="owned_name"
                        value={formData.owned_name}
                        onChange={handleChange}
                        placeholder="Enter Owner Name"
                        required
                    />
                </div>

                <div className='employee-search-area-box mb-3'>
                    <label className='form-label mb-0'>Title</label>
                    <input
                        type="text"
                        className='input-size form-control-search'
                        name="title_messages"
                        value={formData.title_messages}
                        onChange={handleChange}
                        placeholder="Enter Title"
                    />
                </div>

                <div className='employee-search-area-box mb-3'>
                    <label className='form-label mb-0'>Date</label>
                    <input
                        type="date"
                        className='input-size form-control-search'
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='employee-search-area-box mb-3'>
                    <label className='form-label mb-0'>Description</label>
                    <textarea
                        className="form-control-search"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter Description"
                        required
                        rows={3}
                    ></textarea>
                </div>

                <div className="form-buttons d-flex gap-3">
                    <button type="submit" className="btn btn-primary btn-sm">Submit</button>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default AddwhatsappMessage;

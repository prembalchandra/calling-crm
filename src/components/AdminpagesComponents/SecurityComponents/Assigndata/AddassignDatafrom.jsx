// components/pages/training/AddScheduleData.js

import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

function AddScheduleData({ onClose }) {
    const [formData, setFormData] = useState({
        schedular_name: '',
        data_name: '',
        start_date: '',
        end_date: '',
        start_time: '',
        end_time: ''
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
                <h3>Add Schedule Data</h3>
                <FaTimes onClick={onClose} className="close-icon" />
            </div>
            <form onSubmit={handleSubmit} className='add-form-box'>
                <div className='employee-search-area-box mb-3'>
                    <label className='form-label mb-0'>Schedular Name</label>
                    <input
                        type="text"
                        className='input-size form-control-search'
                        placeholder='Enter Schedular Name'
                        name="schedular_name"
                        value={formData.schedular_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='employee-search-area-box mb-3'>
                    <label className='form-label mb-0'>Data Name</label>
                    <input
                        type="text"
                        className='input-size form-control-search'
                        placeholder='Enter Data Name'
                        name="data_name"
                        value={formData.data_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='employee-search-area-box mb-3'>
                    <label className='form-label mb-0'>Start Date</label>
                    <input
                        type="date"
                        className='input-size form-control-search'
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='employee-search-area-box mb-3'>
                    <label className='form-label mb-0'>End Date</label>
                    <input
                        type="date"
                        className='input-size form-control-search'
                        name="end_date"
                        value={formData.end_date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='employee-search-area-box mb-3'>
                    <label className='form-label mb-0'>Start Time</label>
                    <input
                        type="time"
                        className='input-size form-control-search'
                        name="start_time"
                        value={formData.start_time}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='employee-search-area-box mb-3'>
                    <label className='form-label mb-0'>End Time</label>
                    <input
                        type="time"
                        className='input-size form-control-search'
                        name="end_time"
                        value={formData.end_time}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-buttons d-flex gap-3">
                    <button type="submit" className="btn btn-primary btn-sm">Submit</button>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default AddScheduleData;

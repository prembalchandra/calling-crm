import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

function AddVideoForm({ onClose }) {
    const [formData, setFormData] = useState({
        frequency_name: '',
        time: '',
        Days_name: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted:', formData);
        onClose(); // Close the form after submission
    };

    return (
        <div className="addvideo-from">
            <div className="form-header-inner">
                <h3>Add Call Frequency File</h3>
                <FaTimes onClick={onClose} className="close-icon" />
            </div>

            <form onSubmit={handleSubmit} className='add-form-box'>

                <div className='employee-search-area-box mb-3'>
                    <label className='form-label mb-0'>Frequency Name</label>
                    <input
                        type="text"
                        className='input-size form-control-search'
                        name="frequency_name"
                        value={formData.frequency_name}
                        onChange={handleChange}
                        required
                        placeholder='Enter Frequency Name'
                    />
                </div>

                <div className='employee-search-area-box mb-3'>
                    <label className='form-label mb-0'>No. of Time</label>
                    <input
                        type="time"
                        className='input-size form-control-search'
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='employee-search-area-box mb-3'>
                    <label className='form-label mb-0'>Days</label>
                    <select
                        className=' input-size-form-control-search'
                        name="Days_name"
                        value={formData.Days_name}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Day</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select>
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

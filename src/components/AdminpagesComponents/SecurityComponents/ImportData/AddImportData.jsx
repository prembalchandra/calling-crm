// components/pages/training/AddVideoForm.js

import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

function AddVideoForm({ onClose }) {
    const [formData, setFormData] = useState({
        Product_name: '',
        subProduct_name: '',
        total_data: '',
        used_data: '',
        unused_data: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted:', formData);
        onClose(); // Close the form after submit
    };

    return (
        <div className="addvideo-from">
            <div className="form-header-inner d-flex justify-content-between align-items-center mb-3">
                <h3 className="mb-0">Add Import Data</h3>
                <FaTimes onClick={onClose} className="close-icon" style={{ cursor: 'pointer' }} />
            </div>
            <form onSubmit={handleSubmit} className="add-form-box">
                <div className="employee-search-area-box mb-3">
                    <label className="form-label mb-0">Product Name</label>
                    <input
                        type="text"
                        className="input-size form-control-search"
                        placeholder="Enter Product Name"
                        name="Product_name"
                        value={formData.Product_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="employee-search-area-box mb-3">
                    <label className="form-label mb-0">Sub Product</label>
                    <input
                        type="text"
                        className="input-size form-control-search"
                        placeholder="Enter Sub Product Name"
                        name="subProduct_name"
                        value={formData.subProduct_name}
                        onChange={handleChange}
                    />
                </div>

                <div className="employee-search-area-box mb-3">
                    <label className="form-label mb-0">Total Data</label>
                    <input
                        type="text"
                        className="input-size form-control-search"
                        placeholder="Enter Total Data"
                        name="total_data"
                        value={formData.total_data}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="employee-search-area-box mb-3">
                    <label className="form-label mb-0">Used Data</label>
                    <input
                        type="text"
                        className="input-size form-control-search"
                        placeholder="Enter Used Data"
                        name="used_data"
                        value={formData.used_data}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="employee-search-area-box mb-3">
                    <label className="form-label mb-0">Unused Data</label>
                    <input
                        type="text"
                        className="input-size form-control-search"
                        placeholder="Enter Unused Data"
                        name="unused_data"
                        value={formData.unused_data}
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

export default AddVideoForm;

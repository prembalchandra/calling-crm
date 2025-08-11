// components/pages/training/AddproductFrom.js

import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

function AddproductFrom({ onClose }) {
    const [formData, setFormData] = useState({
        Product_name: '',
        subProduct_name:''
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
                <h3>Add Sub  Product</h3>
                <FaTimes onClick={onClose} className="close-icon" />
            </div>
            <form onSubmit={handleSubmit} className='add-form-box'>
                
                <div className='employee-search-area-box mb-3'>
                    <label className='form-label mb-0'>Product Name</label>
                    <input type="text" className='input-size form-control-search' name="Product_name" value={formData.Product_name} onChange={handleChange} required  placeholder='Enter Product'/>
                </div>
                <div className='employee-search-area-box mb-3'>
                    <label className='form-label mb-0'> Sub Product Name</label>
                    <input type="text" className='input-size form-control-search' name="subProduct_name" value={formData.subProduct_name} onChange={handleChange} required  placeholder='Enter Sub  Product' />
                </div>

                
                 <div className="form-buttons d-flex gap-3">
                    <button type="submit" className="btn btn-primary btn-sm">Submit</button>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default AddproductFrom;

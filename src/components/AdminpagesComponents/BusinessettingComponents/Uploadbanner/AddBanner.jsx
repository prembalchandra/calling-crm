import React, { useState } from 'react';
import { FaTimes, FaUpload } from 'react-icons/fa';

function AddProductBanner({ onClose }) {
    const [formData, setFormData] = useState({
        productName: '',
        subProductName: '',
        date: '',
        bannerFile: null
    });

    const [previewImage, setPreviewImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, bannerFile: file }));
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);

        const form = new FormData();
        form.append('productName', formData.productName);
        form.append('subProductName', formData.subProductName);
        form.append('date', formData.date);
        form.append('bannerFile', formData.bannerFile);

        // axios.post('/api/upload', form)

        onClose(); // Close the modal
    };

    return (
        <div className="add-product-banner">
            <div className="form-header-inner d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Add Product Banner</h5>
                <FaTimes className="cursor-pointer" onClick={onClose} />
            </div>

            <form onSubmit={handleSubmit} className='add-form-box'>
                <div className='employee-search-area-box mb-3'>
                    <label className="form-label">Product name</label>
                    <input
                        type="text"
                        className='input-size form-control-search'
                        name="productName"
                        placeholder="Enter Product name"
                        value={formData.productName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='employee-search-area-box mb-3'>
                    <label className="form-label">Sub-Product name</label>
                    <input
                        type="text"
                        className='input-size form-control-search'
                        name="subProductName"
                        placeholder="Enter Sub Product name"
                        value={formData.subProductName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='employee-search-area-box mb-3'>
                    <label className="form-label">Date</label>
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
                    <label className="form-label">Upload Banner</label>
                    <div
                        className="border p-4 text-center rounded bg-light position-relative"
                        style={{ cursor: 'pointer' }}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{
                                opacity: 0,
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                cursor: 'pointer'
                            }}
                            required
                        />

                        {previewImage ? (
                            <img
                                src={previewImage}
                                alt="Preview"
                                style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'contain' }}
                            />
                        ) : (
                            <div>
                                <FaUpload size={20} className="mb-2" />
                                <div>Upload file max 25px</div>
                                <div className="text-muted">Choose or drop file</div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="d-flex justify-content-end gap-2">
                    <button type="submit" className="btn btn-primary btn-sm">Save</button>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default AddProductBanner;

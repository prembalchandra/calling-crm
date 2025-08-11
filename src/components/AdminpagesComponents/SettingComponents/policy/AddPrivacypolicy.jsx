import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';


function UploadDocumentForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    document: null,
  });


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'document') {
      setFormData({ ...formData, document: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Submit logic here (e.g., to API)
    onClose();
  };

  return (
    <div className="upload-form-wrapper p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Upload Document</h5>
        <FaTimes onClick={onClose} className="cursor-pointer" />
      </div>

      <form onSubmit={handleSubmit}>
       <div className='employee-search-area-box mb-3'>
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
          className='input-size form-control-search'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

       <div className='employee-search-area-box mb-3'>
          <label className="form-label">Uploaded Date</label>
          <input
            type="date"
            name="date"
           className='input-size form-control-search'
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

       <div className='employee-search-area-box mb-3'>
          <label className="form-label">Document</label>
          <input
            type="file"
            name="document"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-buttons d-flex gap-3">
          <button type="submit" className="btn btn-primary btn-sm">Upload</button>
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default UploadDocumentForm;

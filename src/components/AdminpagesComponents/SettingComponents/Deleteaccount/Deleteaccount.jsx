import React, { useState } from 'react';
import './DeleteAccount.css';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../../MainComponents/breadcrumb/Breadcrumb';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteAccountForm = () => {
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    reason: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' })); // Clear error on change
  };

  const validate = () => {
    const newErrors = {};
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.reason || formData.reason.trim().length < 5) {
      newErrors.reason = 'Reason must be at least 5 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;


    toast.success(" Account deletion request submitted successfully!");

    console.log('Form Submitted:', formData);
    setFormData({
      phone: '',
      email: '',
      reason: ''
    });
    setErrors({});
  };

  return (
    <section className='main-content-area'>
      <Breadcrumb
        title="Delete Account"
        titleIcon="bx bx-user-x"
        buttons={[
          {
            label: (
              <Link to="/admin/Setting">
                <button type="button" className="addTaskBtn">
                  <i className="bx bx-arrow-back"></i> Back
                </button>
              </Link>
            )
          }
        ]}
      />

      <form onSubmit={handleSubmit} className="delete-account-form">
        <div className='employee-search-area-box mb-3'>
          <label className='form-label mb-0'>Phone</label>
          <input
            type="tel"
            name="phone"
            className={`input-size form-control-search ${errors.phone ? 'is-invalid' : ''}`}
            placeholder="Enter Your Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <div className="text-danger text-validation">{errors.phone}</div>}
        </div>

        <div className='employee-search-area-box mb-3'>
          <label className='form-label mb-0'>Email</label>
          <input
            type="email"
            name="email"
            className={`input-size form-control-search ${errors.email ? 'is-invalid' : ''}`}
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="text-danger text-validation">{errors.email}</div>}
        </div>

        <div className='employee-search-area-box mb-3'>
          <label className='form-label mb-0'>Delete Account Reason</label>
          <textarea
            name="reason"
            className={`input-size form-control-search ${errors.reason ? 'is-invalid' : ''}`}
            placeholder="Enter reason for account deletion"
            value={formData.reason}
            onChange={handleChange}
          />
          {errors.reason && <div className="text-danger text-validation">{errors.reason}</div>}
        </div>

        <button type="submit" className='btn btn-primary btn-sm'>Submit</button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
};

export default DeleteAccountForm;

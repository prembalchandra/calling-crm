import React, { useState } from 'react';
import pofileimg from '../../.././../assets/Images/profile-img.jpg'
import { Link } from 'react-router-dom';

const EditableProfileDetails = () => {
    const [profile, setProfile] = useState({
        name: 'Sanoj Kumar',
        address: 'Noida, Uttar Pradesh, India',
        phone: '389745896',
        email: 'sanoj1234@gmail.com',
        linkedin: 'https://www.linkedin.com/in'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    return (
        <div className="row-bg ">
            <div className="profile-details-box text-center">
                <div className="profile-details-row mb-3">
                    <Link className="profile-img" href="#">
                        <img
                            src={pofileimg}
                            alt="profile"
                            width="100"
                            height="100"
                        />
                    </Link >
                    <div className="name d-flex gap-2px.flex-row flex-column">
                        <h2 className="heading-h2">
                            <div className="stars rating rating-word pt-2">
                                <i className="bx bxs-star"></i>
                                <i className="bx bxs-star"></i>
                                <i className="bx bxs-star"></i>
                                <i className="bx bxs-star"></i>
                                <i className="bx bx-star"></i>
                            </div>
                        </h2>
                        <input
                            type="text"
                            className=""
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                        />
                    </div>

                </div>


                <div className="employee-detail-inner">
                    <div className="employee-phone-number d-flex flex-column">
                        <div className="employee-datail-row">
                            <label><b>Address:</b></label>
                            <input
                                type="text"
                                
                                name="address"
                                value={profile.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="employee-datail-row">
                            <label><b>Phone:</b></label>
                            <input
                                type="text"
                                
                                name="phone"
                                value={profile.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="employee-datail-row">
                            <label><b>Email:</b></label>
                            <input
                                type="email"
                                
                                name="email"
                                value={profile.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="employee-datail-row">
                            <label><b>LinkedIn:</b></label>
                            <input
                                type="url"
                                
                                name="linkedin"
                                value={profile.linkedin}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditableProfileDetails;

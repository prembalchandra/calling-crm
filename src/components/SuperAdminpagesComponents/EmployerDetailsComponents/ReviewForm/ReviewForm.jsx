import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const ReviewForm = () => {
    const [review, setReview] = useState({
        name: '',
        heading: '',
        rating: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReview({ ...review, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, heading, rating, description } = review;
        if (!name || !heading || !rating || !description) {
            toast.error('Please fill all fields before submitting.', {
                position: 'top-right',
                autoClose: 3000,
                pauseOnHover: true,
            });
            return;
        }
        toast.success('Review submitted successfully!', {
            position: 'top-right',
            autoClose: 3000,
            pauseOnHover: true,
        });
        setReview({
            name: '',
            heading: '',
            rating: '',
            description: ''
        });
    };

    return (
        <div className="review-card row-bg mt-3">
            <div className="profile-details-row mb-3">
                <Link className="profile-img" href="#">
                    <img
                        src="https://www.w3schools.com/howto/img_avatar.png"
                        alt="User"
                        className="review-avatar"
                    />
                </Link>
                <div className='review-from-name'>
                    <h5 className="mb-1">Sanoj Kumar</h5>
                    <p className="text-muted">Posted on 07 Mar 2025</p>
                    <div className="review-stars mb-2">
                        <span className="star active">★</span>
                        <span className="star active">★</span>
                        <span className="star active">★</span>
                        <span className="star">★</span>
                        <span className="star">★</span>
                    </div>
                </div>
            </div>

            <p className="review-text mb-4">
                Lorem Ipsum has been the industry's standard dummy text ever since...
            </p>

            <h5 className="mb-3">Write a Review</h5>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <div className='employee-search-area-box'>
                        <label>Name</label>
                        <input
                            className="input-size form-control-search"
                            name="name"
                            placeholder="Name"
                            value={review.name}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <div className='employee-search-area-box'>
                        <label>Review Heading:</label>
                        <input
                            className="input-size form-control-search"
                            name="heading"
                            placeholder="What most important to know"
                            value={review.heading}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <div className='employee-search-area-box'>
                        <label>Rating</label>
                        <select
                            className="input-size form-control-search"
                            name="rating"
                            value={review.rating}
                            onChange={handleChange}
                        >
                            <option value="">Select rating</option>
                            <option value="5">★★★★★</option>
                            <option value="4">★★★★☆</option>
                            <option value="3">★★★☆☆</option>
                            <option value="2">★★☆☆☆</option>
                            <option value="1">★☆☆☆☆</option>
                        </select>
                    </div>
                </div>

                <div className="mb-3">
                    <div className='employee-search-area-box'>
                        <label>Description</label>
                        <textarea
                            className="input-size form-control-search"
                            rows="4"
                            name="description"
                            placeholder="Write a review here....."
                            value={review.description}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-sm">Submit Review</button>
            </form>

            <ToastContainer />
        </div>
    );
};

export default ReviewForm;

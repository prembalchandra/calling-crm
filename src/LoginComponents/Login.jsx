// src/components/Login.js

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

import logoimg from '../assets/Images/swift-dial-logo.png';
import slide1 from '../assets/Images/crm.png';
import slide2 from '../assets/Images/caller_id.png';
import slide3 from '../assets/Images/id.png';

const slides = [
  {
    img: slide1,
    title: 'Swift Dial Call Management CRM',
    desc: 'Swift Dial: The all-in-one app that seamlessly connects',
  },
  {
    img: slide2,
    title: 'Turn your ideas into reality.',
    desc: 'Consistent quality and experience across all platforms and devices',
  },
  {
    img: slide3,
    title: 'Swift Dial Advanced Caller ID',
    desc: 'Swift Dial’s Advanced Caller ID instantly reveals caller details, so you’re always prepared.',
  },
];

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const role = localStorage.getItem('role');

    if (isLoggedIn === 'true') {
      if (role === 'superadmin') {
        navigate('/superadmin');
      } else if (role === 'admin') {
        navigate('/admin');
      }
    }
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (phoneNumber.trim() && password.trim()) {
      let role = '';

      if (phoneNumber === '9999999999') {
        role = 'superadmin';
      } else if (phoneNumber === '8888888888') {
        role = 'admin';
      } else {
        alert('Unauthorized phone number');
        return;
      }

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('is_logged_in', 'true');
      localStorage.setItem('phoneNumber', phoneNumber);
      localStorage.setItem('role', role);
      localStorage.removeItem('profile_slide_skipped');

      if (role === 'superadmin') {
        navigate('/superadmin');
        window.location.reload();
      } else if (role === 'admin') {
        navigate('/admin');
         window.location.reload();
      }
    } else {
      alert('Please fill in both fields.');
    }
  };

  return (
    <div className="container-fluid loginAuth">
      <div className="logincaptchForm">
        <div className="container p-0">
          <div className="row">
            <div className="col-xl-12 px-0 mx-auto card loginformwrapper">
              <div className="login-container">

                <div className="login-left">
                  <div className="left-content-slider">
                    <div className="slide">
                      <img src={slides[currentSlide].img} alt="slide" className="illustration" />
                      <h2 className="side-heading">{slides[currentSlide].title}</h2>
                      <p className="side_titel">{slides[currentSlide].desc}</p>
                    </div>
                  </div>
                </div>

                <div className="login-right">
                  <div className="form-wrapper">
                    <div className="form-header">
                      <div className="logo-box">
                        <img src={logoimg} alt="logo" className="logo" />
                      </div>
                      <h2>Hello Again!</h2>
                      <p>Welcome back, please enter your details.</p>
                    </div>

                    <form className="login-form" onSubmit={handleSubmit}>
                      <input
                        type="tel"
                        placeholder="Enter Your Phone Number"
                        className="input-field"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        className="input-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />

                      <div className="options">
                        <label>
                          <input type="checkbox" /> Remember Me
                        </label>
                        <Link to="#" className="recovery-link">Forgot Password?</Link>
                      </div>

                      <button type="submit" className="login-button">Login</button>

                      <p className="signup-text">
                        Don’t have an account? <Link to="#">Sign Up</Link>
                      </p>
                    </form>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

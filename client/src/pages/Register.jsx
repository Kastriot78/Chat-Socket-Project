import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isValidEmail } from '../utils/utils';
import axios from 'axios';
import { registerRoute } from '../utils/ApiRoutes';
import TypingLoader from '../utils/TypingLoader';

import './style.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    }

    const handleValidation = () => {
        const { username, email, password } = formData;
        const errors = {};

        if (username === '') {
            errors.username = "Username is required";
        }
        if (email === '') {
            errors.email = "Email is required";
        } else if (!isValidEmail(email)) {
            errors.email = "Email is not valid";
        }
        if (password === '') {
            errors.password = "Password is required";
        }

        return errors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = handleValidation();
        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            setLoading(true);
            axios.post(registerRoute, formData).then(res => {
                console.log(res);
                if(res?.data?.status) {
                    navigate('/login');
                }
            }).catch(err => {
                setError(err?.response?.data?.error);
                setLoading(false);
            });
        }
    }

    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className='account-pages my-5 pt-sm-5'>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6 col-xl-5">
                        <div className="text-center mb-4">
                            <h4 className='title'>Sign up</h4>
                            <p className='text-muted mb-4'>Create user account now.</p>
                        </div>
                        <div className="card register-card">
                            <div className="card-body p-4">
                                <div className="p-3">
                                    {error && <div className="heading_error">
                                        <p className='text-center mb-0'>{error}</p>
                                    </div>
                                    }
                                    <form action="" onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label>Username</label>
                                            <div className="input-group mb-3 bg-soft-light input-group-lg rounded-lg">
                                                <div className="input-group-prepend">
                                                    <span className='input-group-text border-light text-muted'>
                                                        <i className="fa-solid fa-user"></i>
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder='Enter username'
                                                    className='form-control bg-soft-light border-light'
                                                    name="username"
                                                    value={formData?.username}
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </div>
                                            {
                                                errors?.username && <div className="heading_error">
                                                    <p className='text-left mb-0'>{errors?.username}</p>
                                                </div>
                                            }
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <div className="input-group mb-3 bg-soft-light input-group-lg rounded-lg">
                                                <div className="input-group-prepend">
                                                    <span className='input-group-text border-light text-muted'>
                                                        <i className="fa-solid fa-envelope"></i>
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder='Enter your email'
                                                    className='form-control bg-soft-light border-light'
                                                    name="email"
                                                    value={formData?.email}
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </div>
                                            {
                                                errors?.email && <div className="heading_error">
                                                    <p className='text-left mb-0'>{errors?.email}</p>
                                                </div>
                                            }
                                        </div>
                                        <div className="form-group">
                                            <label>Password</label>
                                            <div className="input-group mb-3 bg-soft-light input-group-lg rounded-lg">
                                                <div className="input-group-prepend">
                                                    <span className='input-group-text border-light text-muted'>
                                                        <i className="fa-solid fa-lock"></i>
                                                    </span>
                                                </div>
                                                <input
                                                    type="password"
                                                    placeholder='Enter password'
                                                    className='form-control bg-soft-light border-light'
                                                    name="password"
                                                    value={formData?.password}
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </div>
                                            {
                                                errors?.password && <div className="heading_error">
                                                    <p className='text-left mb-0'>{errors?.password}</p>
                                                </div>
                                            }
                                        </div>
                                        <div>
                                            <button type='submit' className='btn btn-block account-btn'>
                                                {!loading ? 'Sign Up' : <TypingLoader />}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 text-center">
                            <p>Already have an account? <Link to="/login" className='font-weight-medium text-primary'>Signin</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register

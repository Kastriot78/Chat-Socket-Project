import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/apiCalls';
import TypingLoader from '../utils/TypingLoader';

import './style.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const { error, user, loading } = useSelector((state) => state.user);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  }

  const handleValidation = () => {
    const { username, password } = formData;
    const errors = {};

    if (username === '') {
      errors.username = 'Username is required';
    }

    if (password === '') {
      errors.password = 'Password is required';
    }

    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = handleValidation();
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      login(formData.username, formData.password, dispatch);
    }
  }

  useEffect(() => {
    if (user) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [user, navigate, dispatch]);

  return (
    <div className='account-pages my-5 pt-sm-5'>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="text-center mb-4">
              <h4 className='title'>Sign in</h4>
              <p className='text-muted mb-4'>Sign in to continue.</p>
            </div>
            <div className="card register-card">
              <div className="card-body p-4">
                <div className="p-3">
                  {error && <div className="heading_error">
                    <p className='text-center mb-0'>{error}</p>
                  </div>
                  }
                  <form onSubmit={handleSubmit}>
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
                      <button type='btn' className='btn btn-block account-btn'>
                        {loading && <TypingLoader />}
                        {!loading && 'Sign In'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="mt-5 text-center">
              <p>Don't have an account? <Link to="/register" className='font-weight-medium text-primary'>Signup now</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

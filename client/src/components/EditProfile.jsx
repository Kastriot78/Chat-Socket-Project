import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isValidEmail } from '../utils/utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setAvatarRoute } from '../utils/ApiRoutes';
import TypingLoader from '../utils/TypingLoader';
import { updateUserAvatar } from '../redux/userRedux';

const EditProfile = () => {
    const user = useSelector((state) => state.user.user);
    const [formData, setFormData] = useState({
        username: user?.username ? user?.username : '',
        email: user?.email ? user?.email : '',
        avatarImage: user?.avatarImage ? user?.avatarImage : null
    });
    const [errors, setErrors] = useState([]);
    const [file, setFile] = useState();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        if (e.target.name === 'avatarImage') {
            setFormData({
                ...formData,
                avatarImage: e.target.files[0]
            });
            setFile(URL.createObjectURL(e.target.files[0]));
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
    }

    const handleValidation = () => {
        const { username, email } = formData;
        const errors = {};

        if (username === '') {
            errors.username = "Username is required";
        }
        if (email === '') {
            errors.email = "Email is required";
        } else if (!isValidEmail(email)) {
            errors.email = "Email is not valid";
        }
        return errors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = handleValidation();
        setErrors(errors);

        const formDataToSend = new FormData();
        formDataToSend.append('username', formData.username);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('avatarImage', formData.avatarImage);

        setLoading(true);
        if (Object.keys(errors).length === 0) {
            axios.post(`${setAvatarRoute}/${user._id}`, formDataToSend).then(res => {
                setLoading(false);
                if (res.data.status) {
                    dispatch(updateUserAvatar({ avatarImage: res.data.image }));
                    toast.success('Profile Updated Successfully');
                }
            }).catch(() => {
                setLoading(false);
            })
        }
    }

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <div className='container profile-wrap'>
            <div className="profile-nav">
                <ul className='nav nav-tabs nav-tabs-line'>
                    <li className='nav-item'>
                        <button className='nav-link active' data-bs-target="#profile-edit" data-bs-toggle="tab">Edit Profile</button>
                    </li>
                </ul>
            </div>
            <div className="profile-details">
                <div className="tab-content">
                    <div className='tab-pane show active' id='profile-edit'>
                        <div className="row">
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-lg-3">
                                        <h6 className='sub-title'>Personal Information</h6>
                                        <div className='sub-text'>Edit Your personal Info</div>
                                    </div>
                                    <div className="col-lg-9 mt-4 mt-lg-0">
                                        <form onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className='mb-4'>
                                                        <label htmlFor="" className='form-label'>Username</label>
                                                        <div className='form-control-wrap'>
                                                            <input
                                                                name="username"
                                                                type="text"
                                                                className='form-control'
                                                                placeholder='Username'
                                                                value={formData?.username}
                                                                onChange={(e) => handleChange(e)}
                                                            />
                                                        </div>
                                                        {
                                                            errors?.username && <div className="heading_error mt-2">
                                                                <p className='text-left mb-0'>{errors?.username}</p>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className='mb-4'>
                                                        <label htmlFor="" className='form-label'>Email</label>
                                                        <div className='form-control-wrap'>
                                                            <input
                                                                name="email"
                                                                type="text"
                                                                className='form-control'
                                                                placeholder='Email'
                                                                value={formData?.email}
                                                                onChange={(e) => handleChange(e)}
                                                            />
                                                        </div>
                                                        {
                                                            errors?.email && <div className="heading_error mt-2">
                                                                <p className='text-left mb-0'>{errors?.email}</p>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="text-center">
                                                        {formData.avatarImage ? (
                                                            <img
                                                                src={file || formData.avatarImage}
                                                                className="avatar img-circle img-thumbnail"
                                                                alt="avatar"
                                                            />
                                                        ) : (
                                                            <img
                                                                src="/images/user.png"
                                                                className="avatar img-circle img-thumbnail"
                                                                alt="avatar"
                                                            />
                                                        )}
                                                        <h6 className='sub-text mt-2'>Upload profile image</h6>
                                                        <input type="file" className='form-profile-input w-100' name="avatarImage" onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <button type='submit' className='btn account-btn mt-4'>
                                                {!loading ? 'Save' : <TypingLoader />}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile

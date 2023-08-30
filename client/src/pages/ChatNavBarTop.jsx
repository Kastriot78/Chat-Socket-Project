import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userSlice } from '../redux/userRedux';

import './style.css';

const ChatNavBarTop = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    return (
        <nav className='chat-appbar'>
            <div className="chat-appbar-wrap">
                <div className="appbar-logo">
                    <Link to="/" className='logo-icon'>
                        <img src="/images/logo-chat.svg" alt="" />
                    </Link>
                </div>
                <div className="appbar-content">
                    <ul className='appbar-nav appbar-nav-start'>
                        <li className='appbar-item'>
                            <Link to="/edit-profile" className='appbar-link'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-subtract" viewBox="0 0 16 16">
                                    <path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z"></path>
                                </svg>
                                <span className="d-none">Avatars</span>
                            </Link>
                        </li>
                    </ul>

                    {
                        user && <ul className='appbar-nav appbar-nav-end'>
                            <li className="tyn-appbar-item position-relative">
                                <a className="d-inline-flex dropdown-toggle" data-bs-auto-close="outside" data-bs-toggle="dropdown" href="#" aria-expanded="false">
                                    <div className="tyn-media tyn-size-lg tyn-circle">
                                        <img src={user?.avatarImage ? user?.avatarImage : '/images/user.png'} alt="" />
                                    </div>
                                </a>
                                <div className="dropdown-menu dropdown-menu-end">
                                    <div className="dropdown-gap">
                                        <div className="tyn-media-group">
                                            <div className="tyn-media tyn-size-lg">
                                                <img src={user?.isAvatarImageSet ? user?.avatarImage : '/images/user.png'} alt="" />
                                            </div>
                                            <div className="tyn-media-col">
                                                <div className="tyn-media-row">
                                                    <h6 className="name">{user?.username}</h6>
                                                    <div className="indicator varified">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="tyn-media-row has-dot-sap">
                                                    <p className="content">Liked that disco music</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <ul className="tyn-list-links">
                                        <li>
                                            <Link to="edit-profile">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                                                </svg>
                                                <span>Profile</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="edit-profile">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                                                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                                                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                                                </svg>
                                                <span>Settings</span>
                                            </Link>
                                        </li>
                                        <li className="dropdown-divider" />
                                        <li>
                                            <Link to="/login" onClick={() => dispatch(userSlice.actions.logout())}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-power" viewBox="0 0 16 16">
                                                    <path d="M7.5 1v7h1V1h-1z" />
                                                    <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
                                                </svg>
                                                <span>Log Out</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    }
                </div>
            </div>
        </nav>
    )
}

export default ChatNavBarTop

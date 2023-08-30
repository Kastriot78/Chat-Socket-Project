import React, { useEffect, useState, useRef } from 'react';
import ChatContentBody from './ChatContentBody';
import ChatForm from './ChatForm';
import Welcome from '../components/Welcome';
import { getAllMessagesRoute } from '../utils/ApiRoutes';
import axios from 'axios';
import { openChatContent } from '../redux/chatContentRedux';
import { useDispatch, useSelector } from 'react-redux';

import './style.css';

const ChatContent = ({ currentUser, currentChat, isLoaded, socket, fetchNotifications, resetNotifications }) => {
    const [messages, setMessages] = useState([]);
    const open = useSelector((state) => state.chatContent.open);
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const scrollRef = useRef();
    const [typing, setTyping] = useState(false);
    const [messageType, setMessageType] = useState('TEXT');

    useEffect(() => {
        const getAllMessages = async () => {
            const response = await axios.post(getAllMessagesRoute, {
                from: user?._id,
                to: currentChat?._id,
            });
            setMessages(response.data);
        }
        getAllMessages();
    }, [currentChat, user?._id]);

    const scrollToBottom = () => {
        if (scrollRef.current) {
            const chatContainer = scrollRef.current;
            const isScrolledToBottom =
                chatContainer.scrollHeight - chatContainer.scrollTop ===
                chatContainer.clientHeight;

            if (isScrolledToBottom) return;

            const images = chatContainer.querySelectorAll('img');
            let loadedImagesCount = 0;

            const imageLoaded = () => {
                loadedImagesCount++;
                if (loadedImagesCount === images.length) {
                    chatContainer.scrollTo({
                        top: chatContainer.scrollHeight,
                        behavior: 'smooth',
                    });
                }
            };

            images.forEach((image) => {
                if (image.complete) {
                    imageLoaded();
                } else {
                    image.addEventListener('load', imageLoaded);
                }
            });
        }
    };

    useEffect(() => {
        // Scroll to the bottom of the chat whenever messages are updated
        scrollToBottom();
    }, [messages]);

    return (
        <>
            {
                isLoaded && currentChat === null ? (
                    <Welcome currentUser={currentUser} />
                ) : (
                    <div className={`tyn-chat-content ${open ? 'show' : ''}`}>
                        <div className="chat-head">
                            <ul className="tyn-list-inline d-md-none ms-n1">
                                <li>
                                    <button className="btn btn-icon btn-md btn-pill btn-transparent js-toggle-main" onClick={() => dispatch(openChatContent())}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"></path>
                                        </svg>
                                    </button>
                                </li>
                            </ul>
                            <div className="media-group">
                                <div className="media tyn-size-lg">
                                    <img src={currentChat?.avatarImage ? currentChat?.avatarImage : '/images/user.png'} alt="" />
                                </div>
                                <div className="media-col">
                                    <div className="media-row">
                                        <h6 className="name">{currentChat?.username}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ChatContentBody messages={messages} scrollRef={scrollRef} typing={typing} currentChat={currentChat} />
                        <ChatForm 
                            currentUser={currentUser} 
                            currentChat={currentChat} 
                            socket={socket} 
                            messages={messages} 
                            setMessages={setMessages} 
                            typing={typing} 
                            setTyping={setTyping} 
                            messageType={messageType} 
                            setMessageType={setMessageType} 
                            fetchNotifications={fetchNotifications}
                            resetNotifications={resetNotifications}
                        />
                    </div>
                )
            }
        </>
    )
}

export default ChatContent

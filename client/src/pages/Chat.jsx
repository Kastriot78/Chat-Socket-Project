import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute, getNotificationsForUserRoute, host, resetNotificationsRoute } from '../utils/ApiRoutes';
import ChatNavBarTop from './ChatNavBarTop';
import ChatSidebar from './ChatSidebar';
import ChatContent from './ChatContent';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';

const Chat = () => {
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const currentUser = useSelector((state) => state?.user?.user);
  const [currentChat, setCurrentChat] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [notifications, setNotifications] = useState({});

  const navigate = useNavigate('');

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  }

  const fetchNotifications = async () => {
    try {
      if (currentUser) {
        const response = await axios.get(
          `${getNotificationsForUserRoute}/${currentUser._id}`
        );
        const notificationsData = response.data;
        const newNotifications = {};

        notificationsData.forEach((notification) => {
          const { sender } = notification;
          newNotifications[sender] = (newNotifications[sender] || 0) + 1;
        });
        setNotifications(newNotifications);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };


  const resetNotifications = (senderId) => {
    axios
      .put(`${resetNotificationsRoute}/${currentUser._id}/${senderId}`)
      .then((res) => {
        setNotifications((prevNotifications) => {
          const updatedNotifications = { ...prevNotifications };
          delete updatedNotifications[senderId];
          return updatedNotifications;
        });
      })
      .catch((error) => {
        console.error('Error resetting notifications:', error);
      });
  };


  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else {
      setIsLoaded(true);
    }

  }, [navigate, currentUser]);


  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit('add-user', currentUser?._id);
      socket?.current?.on('notification', (msg) => {
        fetchNotifications();
      });
    }
  }, [currentUser]);

  useEffect(() => {
    fetchNotifications();

  }, [currentUser])

  useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        const response = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(response.data);
      }
    }
    fetchData();

  }, [currentUser, navigate]);

  return (
    <div>
      <ChatNavBarTop />
      <div className='chat-content tyn-chat'>
        <ChatSidebar contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} socket={socket} notifications={notifications} fetchNotifications={fetchNotifications} resetNotifications={resetNotifications} />
        <ChatContent currentUser={currentUser} currentChat={currentChat} isLoaded={isLoaded} socket={socket} notifications={notifications} fetchNotifications={fetchNotifications}  resetNotifications={resetNotifications} />
      </div>
    </div>
  )
}

export default Chat;

import React, { useEffect, useState } from 'react';
import { openChatContent } from '../redux/chatContentRedux';
import { useDispatch } from 'react-redux';

import './style.css';

const Contacts = ({ contacts, currentUser, changeChat, notifications, resetNotifications }) => {
  const [currentUserName, setCurrentUserName] = useState(null);
  const [currentUserImage, setCurrentUserImage] = useState(null);
  const [currentSelected, setCurrentSelected] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
    dispatch(openChatContent());
  }

  return (
    <div>
      <ul className='contacts-aside-list'>
        {
          contacts?.length > 0 && contacts?.map((contact, index) => (
            <li className={`contact-item js-toggle-main ${index === currentSelected ? 'active' : ''} `} key={index} onClick={() => {
              changeCurrentChat(index, contact);
              resetNotifications(contact?._id);
            }}>
              <div className="media-group">
                <div className="media">
                  <img src={contact?.avatarImage ? contact?.avatarImage : '/images/user.png'} alt="" />
                </div>
                <div className="media-col">
                  <div className="media-row">
                    <h6 className='name'>{contact.username}</h6>
                    {notifications && notifications[contact._id] && notifications[contact._id] > 0 && (
                      <div>
                        <span className='meta'>{notifications[contact._id]}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Contacts

import React, { useEffect, useState } from 'react'
import Contacts from '../components/Contacts'

const ChatSidebar = ({ contacts, currentUser, changeChat, socket, notifications, fetchNotifications, resetNotifications, contactTo }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredContacts = contacts?.filter((contact) =>
        contact.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='chat-sidebar-aside'>
            <div className='aside-head'>
                <h3 className="aside-title">Chats</h3>
            </div>

            <div className="aside-body" data-simplebar="init">
                <div className="simplebar-wrapper">
                    <div className='simplebar-height-auto-observer-wrapper'>
                        <div className='simplebar-height-auto-observer'></div>
                    </div>
                    <div className="simplebar-mask">
                        <div className="simplebar-offset" style={{ right: '0', bottom: '0' }}>
                            <div className="simplebar-content-wrapper" style={{ height: '100%', overflow: 'hidden scroll' }}>
                                <div className="simplebar-content">
                                    <div className="aside-search">
                                        <div className="form-group">
                                            <div className="form-control-wrap">
                                                <div className="form-control-icon start">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                                                    </svg>
                                                </div>
                                                <input
                                                    type="text"
                                                    className='form-control search-contacts'
                                                    placeholder='Search chat'
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Contacts contacts={filteredContacts} currentUser={currentUser} changeChat={changeChat} notifications={notifications} resetNotifications={resetNotifications} contactTo={contactTo} />
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

export default ChatSidebar

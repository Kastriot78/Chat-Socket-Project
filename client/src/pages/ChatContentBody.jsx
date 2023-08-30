import React from 'react';
import './style.css';
import ChatIncoming from './ChatIncoming';
import ChatOutgoing from './ChatOutgoing';
import TypingLoader from '../utils/TypingLoader';

const ChatContentBody = ({ messages, scrollRef, typing, currentChat }) => {
    return (
        <div className='tyn-chat-body js-scroll-to-end' data-simplebar="init">
            <div className="simplebar-wrapper">
                <div className="simplebar-height-auto-observer-wrapper">
                    <div className="simplebar-height-auto-observer"></div>
                </div>
                <div className="simplebar-mask">
                    <div className="simplebar-offset" style={{ right: '0', bottom: '0' }}>
                        <div className="simplebar-content-wrapper" style={{ height: '100%', overflow: 'hidden scroll' }} ref={scrollRef}>
                            <div className="simplebar-content" style={{ padding: '0' }}>
                                
                                <div className="tyn-reply position-relative" ref={scrollRef}>
                                    {messages.map((message, index) => (
                                        <div key={index}>
                                            {message?.fromSelf ? <ChatOutgoing message={message} typing={typing} currentChat={currentChat} /> : <ChatIncoming message={message} typing={typing} currentChat={currentChat} />}
                                        </div>
                                    ))}
                                    <div className='typing_wrapper'>{typing ? <TypingLoader /> : ''}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatContentBody

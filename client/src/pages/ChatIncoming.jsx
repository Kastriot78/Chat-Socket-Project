import React from 'react'

const ChatIncoming = ({ message, scrollToBottom, currentChat }) => {
    return (
        <div>
            <div className='tyn-reply-item incoming'>
                <div className="avatar">
                    <div className='tyn-media tyn-size-md tyn-circle'>
                        <img src={currentChat?.avatarImage ? currentChat?.avatarImage : '/images/user.png'} alt="" />
                    </div>
                </div>
                <div className="reply-group">
                    <div className="reply-bubble">
                        {
                            message?.type === 'TEXT' && <div className="tyn-reply-text">{message.message} </div>

                        }
                        {message.type === 'FILE' && (
                            <div className="reply-media">
                                {message?.files?.map((img, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        className="glightbox tyn-thumb"
                                        data-gallery="media-photo"
                                    >
                                        <img src={img} className="tyn-image" alt="" onLoad={scrollToBottom} />
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
 
                </div>
            </div>
        </div>
    )
}

export default ChatIncoming

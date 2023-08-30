
const ChatOutgoing = ({ message, scrollToBottom }) => {
    return (
        <div>
            <div className='tyn-reply-item outgoing'>
                <div className="group">
                    <div className="tyn-reply-bubble">
                        {
                            message?.type === 'TEXT' && <div className="tyn-reply-text">{message.message} </div>

                        }
                        {message.type === 'FILE' && (
                            <div className="reply-media">
                                {message?.message?.map((img, index) => (
                                    <a
                                        key={index}
                                        className="glightbox tyn-thumb"
                                        data-gallery="media-photo"
                                        href='#'
                                    >
                                        <img src={img} className="tyn-image" alt="" onLoad={scrollToBottom} />
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    {
                        message?.files?.length > 0 && <div className="reply-bubble">
                            <div className="reply-media">
                                {
                                    message?.files?.map((file, index) => (
                                        <a href="#" className="glightbox tyn-thumb" key={index}>
                                            <img src={file} className="tyn-image" alt="" />
                                        </a>
                                    ))
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ChatOutgoing

import React, { useRef } from 'react';
import iconsEmoji from '../utils/emoji';

import './emoji-style.css';

const Emoji = ({ chatMsg, setChatMsg, emojiOpen, setEmojiOpen }) => {
    const wrapperEmojiRef = useRef(null);

    const onEmojiClick = (emojiObject) => {
        setChatMsg((prevInput) => prevInput + emojiObject);
    };

    const outsideClickAlert = (e) => {
        if (wrapperEmojiRef.current && emojiOpen && !wrapperEmojiRef.current.contains(e.target)) {
            setEmojiOpen(false)
        }
    };

    document.addEventListener('mousedown', outsideClickAlert);

    return (
        <div className={`emoji-picker__wrapper ${emojiOpen ? 'open' : ''}`} ref={wrapperEmojiRef}>
            <div className='emoji-picker light'>
                <div className="emoji-picker__content">
                    <div className='emoji-picker__emoji-area'>
                        <div className="emoji-picker__emojis">
                            <div className="emoji-picker__container">
                                {
                                    iconsEmoji?.map((item, index) => (
                                        <button className="emoji-picker__emoji" onClick={() => onEmojiClick(item?.icon)} tabIndex="-1" data-emoji={item?.icon} title="grinning face" key={index}>{item?.icon}</button>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Emoji;

import React, { useEffect, useState, useRef } from 'react';
import Picker from 'emoji-picker-react';
import axios from 'axios';
import { sendMessageRoute } from '../utils/ApiRoutes';
import { useSelector } from 'react-redux';
import FilePreviewDz from '../utils/FilePreviewDz';
import Emoji from '../components/Emoji';

const ChatForm = ({ currentUser, currentChat, socket, messages, setMessages, scrollRef, setTyping, messageType, setMessageType, resetNotifications }) => {
  const [msg, setMsg] = useState('');
  const [dzPreviewOpen, setDzPreviewOpen] = useState(false)
  const [imageFiles, setImageFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState([]);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [filesSelected, setFilesSelected] = useState([]);

  const chatMsgRef = useRef(null);
  const user = useSelector((state) => state.user.user);

  const handleSendMsg = async (msg, type) => {
    const formDataObj = new FormData();
    formDataObj.append('from', currentUser?._id);
    formDataObj.append('to', currentChat?._id);
    formDataObj.append('type', type);
    if(type === 'FILE') {
      filesSelected.forEach((image) => {
        formDataObj.append('files', image);
      });
    } else {
      formDataObj.append('message', msg);
    }
    const response = await axios.post(sendMessageRoute, formDataObj);
    socket.current.emit('send-msg', {
      to: currentChat._id,
      from: user._id,
      message: msg,
      type: type,
      filesUrl: response.data.data.files
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg, type: type });
    setMessages(msgs);
    setMessageType('TEXT')
    setFilesSelected([]);
    setDzPreviewOpen(false);
  }

  useEffect(() => {
    var timerTyping = null;
    if (socket.current) {
      socket.current.on('msg-recieve', (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg?.message, type: msg?.type, files: msg?.filesUrl });
        setTyping(false);
      });

      socket.current.on('typing', (msg) => {
        setTyping(true);
        if (timerTyping !== null) {
          clearTimeout(timerTyping)
        }

        timerTyping = setTimeout(() => {
          setTyping(false);

        }, 6000);
      });
    }
  }, [socket, setTyping]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, setMessages]);

  const sendChat = (event) => {
    event.preventDefault();
    
    if (msg?.length > 0) {
      setMessageType('TEXT');
      handleSendMsg(msg, messageType);
      setMsg('');
    }

    if (images.length > 0) {
      setMessageType('FILE');
      handleSendMsg(images, messageType);
      setMsg('');
      setImages([]);
    }
  }

  const handleOnChangeInput = (e) => {
    setMsg(e.target.value);
    resetNotifications(currentChat?._id);
    // for typing animation
    socket.current.emit('typing', {
      from: currentUser?._id,
      to: currentChat._id,
    });
  }

  // for file upload
  const handleFilesChange = (e) => {
    const files = [...e.target.files];
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setImages(urls);
    setFilesSelected(files);
    setDzPreviewOpen(true);
    setMessageType('FILE');
    e.target.value = '';
  }
  // for file upload

  return (
    <div className='tyn-chat-form_wrapper' ref={scrollRef}>
      <FilePreviewDz open={dzPreviewOpen} imageFiles={imageFiles} images={images} setImages={setImages} setDzPreviewOpen={setDzPreviewOpen} filesSelected={filesSelected} setFilesSelected={setFilesSelected} />

      <form action="" onSubmit={(e) => sendChat(e)} className="chat-form rounded-pill">
        <div className="row align-items-center gx-0">
          <div className="col-auto">
            <button
              className="position-relative btn-icon btn-link text-body rounded-circle dz-clickable border-0"
              id="dz-btn"
            >
              <input
                type="file"
                className="image-select-file"
                accept="image/*"
                onChange={handleFilesChange}
                multiple
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-paperclip"
              >
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
            </button>
          </div>

          <div className="col">
            <div className="input-group">
              <input
                className="form-control chat_input px-0"
                aria-label="Type your message..."
                placeholder="Type..."
                type="text"
                value={msg}
                onChange={handleOnChangeInput}
                style={{
                  overflow: "hidden",
                  overflowWrap: "break-word",
                  resize: "none",
                  height: 47
                }}
              />
              <a href='javscript:void()' className="input-group-text text-body pe-0" onClick={() => setEmojiOpen(true)}>
                <span className="icon icon-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-smile"
                  >
                    <circle cx={12} cy={12} r={10} />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1={9} y1={9} x2="9.01" y2={9} />
                    <line x1={15} y1={9} x2="15.01" y2={9} />
                  </svg>
                </span>
              </a>
            </div>
          </div>
          <div className="col-auto">
            <button
              className="btn btn-icon btn-primary rounded-circle ms-2"
              disabled=""
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-send"
              >
                <line x1={22} y1={2} x2={11} y2={13} />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      </form>
      <Emoji chatMsg={msg} setChatMsg={setMsg} emojiOpen={emojiOpen} setEmojiOpen={setEmojiOpen} chatMsgRef={chatMsgRef} />
    </div>
  )
}

export default ChatForm

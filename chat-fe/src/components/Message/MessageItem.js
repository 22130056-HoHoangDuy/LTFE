import React from 'react';
import './Message.css';

const MessageItem = ({ message, isUser }) => {
    return (
        <div className={`message-item ${isUser ? 'user-message' : 'other-message'}`}>
            {!isUser && <img className="avatar" src={message.avatar} alt="avatar" />}
            <div className="message-content">
                <p>{message.text}</p>
                <span className="timestamp">{message.timestamp}</span>
            </div>
        </div>
    );
};

export default MessageItem;
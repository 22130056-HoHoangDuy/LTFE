import React from 'react';
import MessageList from '../Message/MessageList';
import './ChatBox.css';

const ChatBox = ({ roomName = "Minh Hao" }) => {
    return (
        <div className="chatbox">
            {/* Header */}
            <div className="chatbox-header">
                {/* Nút Back */}
                <button className="back-btn">&lt;</button>
                <h2 className="room-name">{roomName}</h2>
            </div>

            {/* Danh sách tin nhắn */}
            <MessageList />

            {/* Ô nhập tin nhắn */}
            <div className="chatbox-input">
                <input
                    type="text"
                    placeholder="Type your message..."
                    className="chat-input"
                />
                <button className="send-btn">Gửi</button>
            </div>
        </div>
    );
};

export default ChatBox;
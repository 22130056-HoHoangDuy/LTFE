import React from 'react';
import MessageItem from './MessageItem';
import './Message.css';

const MessageList = () => {
    // Dữ liệu giả để test
    const messages = [
        {
            text: "Lô ông, Mai có đi học thì điểm danh giùm tui với",
            timestamp: "10:30 AM",
            isUser: true, // Của user
        },
        {
            text: "Ok ông",
            avatar: "https://via.placeholder.com/40",
            timestamp: "10:31 AM",
            isUser: false, // Của người khác -> thêm avatar vào
        },
        {
            text: "Ok cảm ơn ông",
            timestamp: "10:32 AM",
            isUser: true,
        },
    ];

    return (
        <div className="message-list">
            {messages.map((msg, index) => (
                <MessageItem
                    key={index}
                    message={msg}
                    isUser={msg.isUser} /* Phân biệt user */
                />
            ))}
        </div>
    );
};

export default MessageList;
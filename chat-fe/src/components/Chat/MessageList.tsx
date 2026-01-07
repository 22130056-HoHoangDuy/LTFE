import React from "react";
import MessageItem, { Message } from "./MessageItem";

// dữ liệu mẫu demo
const messages: Message[] = [
    {
        text: "Lô ông, Mai có đi học thì điểm danh giùm tui với",
        timestamp: "10:30 AM",
        isUser: true,
    },
    {
        text: "Ok ông",
        avatar: "https://via.placeholder.com/40",
        timestamp: "10:31 AM",
        isUser: false,
    },
    {
        text: "Ok cảm ơn ông",
        timestamp: "10:32 AM",
        isUser: true,
    },
];

const MessageList: React.FC = () => (
    <div
        style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            padding: 20,
            background: "#121212",
            overflowY: "auto",
            height: "100%",
        }}
    >
        {messages.map((msg, idx) => (
            <MessageItem key={idx} message={msg} />
        ))}
    </div>
);

export default MessageList;
import React from "react";

export type Message = {
    text: string;
    timestamp: string;
    avatar?: string;
    isUser: boolean;
};

type MessageItemProps = {
    message: Message;
};

const MessageItem: React.FC<MessageItemProps> = ({ message }) => (
    <div
        style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            maxWidth: "70%",
            alignSelf: message.isUser ? "flex-end" : "flex-start",
        }}
    >
        {!message.isUser && (
            <img
                src={message.avatar || "https://via.placeholder.com/40"}
                alt="avatar"
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                }}
            />
        )}
        <div
            style={{
                background: message.isUser ? "#2196f3" : "#3E3E3E",
                color: "#fff",
                padding: "10px 15px",
                borderRadius: 10,
                boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
            }}
        >
            <p style={{ margin: 0 }}>{message.text}</p>
            <span style={{ fontSize: "0.8em", color: "#b0b0b0", marginTop: 5 }}>
                {message.timestamp}
            </span>
        </div>
    </div>
);

export default MessageItem;
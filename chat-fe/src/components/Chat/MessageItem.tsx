import React from "react";

export type MessageUI = {
    text: string;
    timestamp: string;
    avatar?: string;
    isUser: boolean;
};

<<<<<<< HEAD
interface MessageItemProps {
    message: MessageUI;
}

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
                style={{ width: 40, height: 40, borderRadius: "50%" }}
            />
        )}
        <div
            style={{
                background: message.isUser ? "#1DB954" : "#3E3E3E",
                color: "#fff",
                padding: "10px 15px",
                borderRadius: 10,
            }}
        >
            <p style={{ margin: 0 }}>{message.text}</p>
            <span style={{ fontSize: 12, color: "#b0b0b0" }}>
                {message.timestamp}
            </span>
        </div>
    </div>
);
=======
type MessageItemProps = {
    message: MessageUI;
    theme: "dark" | "light";
};

const MessageItem: React.FC<MessageItemProps> = ({ message, theme }) => {
    const bg = message.isUser
        ? theme === "dark" ? "#2196f3" : "#e3eafc"
        : theme === "dark" ? "#3E3E3E" : "#f3f3f4";
    const color = message.isUser
        ? theme === "dark" ? "#fff" : "#1565c0"
        : theme === "dark" ? "#fff" : "#222";
    const timestampColor = theme === "dark" ? "#b0b0b0" : "#888";

    return (
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
                    background: bg,
                    color: color,
                    padding: "10px 15px",
                    borderRadius: 10,
                    boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
                }}
            >
                <p style={{ margin: 0 }}>{message.text}</p>
                <span style={{ fontSize: "0.8em", color: timestampColor, marginTop: 5 }}>
                    {message.timestamp}
                </span>
            </div>
        </div>
    );
};
>>>>>>> e34ca1c6bee647ffe2a98330c2d498cb549c3d60

export default MessageItem;

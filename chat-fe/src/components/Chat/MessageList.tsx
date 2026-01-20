import React from "react";
import MessageItem from "./MessageItem";
import { ChatMessage } from "../../utils/types";

interface MessageListProps {
    messages: ChatMessage[];
    user: {
        name: string;
        username: string;
        avatar: string;
    };
    theme: "dark" | "light";
}

const MessageList: React.FC<MessageListProps> = ({ messages = [], user, theme }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                padding: 20,
                background: theme === "dark" ? "#121212" : "#fff",
                overflowY: "auto",
                height: "100%",
            }}
        >
            {messages
                .filter((msg) => msg.type === "text") // <-- CHỈ lấy tin nhắn text
                .map((msg, idx) => (
                    <MessageItem
                        key={idx}
                        theme={theme}
                        message={{
                            text: msg.content,
                            timestamp: msg.time || "",
                            isUser: msg.type === "text" && msg.sender === user.username, // <-- type guard an toàn
                            avatar: (msg as any).avatar, // Tuỳ bạn muốn lấy trường này hay không
                        }}
                    />
                ))}
        </div>
    );
};

export default MessageList;
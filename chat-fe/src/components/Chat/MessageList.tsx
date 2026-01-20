import React from "react";
import MessageItem from "./MessageItem";
import { ChatMessage } from "../../utils/types";

<<<<<<< HEAD
type Props = {
    messages: ChatMessage[];
    myUsername: string;
};

const MessageList: React.FC<Props> = ({ messages, myUsername }) => {
    return (
        <div style={{ padding: 20, overflowY: "auto", height: "100%" }}>
            {messages.map((msg, idx) => {
                if (msg.type !== "text") return null; // 🚫 bỏ system message

                return (
                    <MessageItem
                        key={idx}
                        message={{
                            text: msg.content,
                            timestamp: msg.time ?? "",
                            isUser: msg.sender === myUsername,
                        }}
                    />
                );
            })}
=======
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
>>>>>>> e34ca1c6bee647ffe2a98330c2d498cb549c3d60
        </div>
    );
};

<<<<<<< HEAD
export default MessageList;
=======
export default MessageList;
>>>>>>> e34ca1c6bee647ffe2a98330c2d498cb549c3d60

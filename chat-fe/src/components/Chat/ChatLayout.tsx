import React from "react";
import MessageInput from "./MessageInput";
import useChat from "../../hooks/useChat";
import { useAuthContext } from "../../context/AuthContext";

const ChatLayout: React.FC = () => {
    const chat = useChat();
    const { user } = useAuthContext();

    if (!user) return null;

    // Debug: log messages trước khi render
    console.log("messages to render:", chat.messages);

    return (
        <div
            style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                background: "#0b0b0b",
            }}
        >
            {/* ===== MESSAGE LIST ===== */}
            <div
                style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "20px 24px",
                }}
            >
                {chat.messages.map((m, i) => {
                    // system message (content đã normalize thành string theo useChat)
                    if (m.type === "system") {
                        return (
                            <div
                                key={i}
                                style={{
                                    textAlign: "center",
                                    margin: "12px 0",
                                    fontSize: 12,
                                    opacity: 0.6,
                                    color: "#ccc",
                                }}
                            >
                                {/* defensive: nếu content vẫn là object (trường hợp hiếm), stringify */}
                                {typeof m.content === "object" ? JSON.stringify(m.content) : m.content}
                            </div>
                        );
                    }

                    // text message
                    const isMine = m.sender === user.username;

                    return (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                justifyContent: isMine ? "flex-end" : "flex-start",
                                marginBottom: 10,
                            }}
                        >
                            <div
                                style={{
                                    maxWidth: "65%",
                                    padding: "10px 14px",
                                    borderRadius: 14,
                                    background: isMine ? "#1DB954" : "#1e1e1e",
                                    color: isMine ? "#000" : "#fff",
                                    fontSize: 14,
                                    wordBreak: "break-word",
                                }}
                            >
                                {typeof m.content === "object" ? JSON.stringify(m.content) : m.content}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ===== INPUT ===== */}
            <MessageInput onSend={chat.sendMessage} />
        </div>
    );
};

export default ChatLayout;
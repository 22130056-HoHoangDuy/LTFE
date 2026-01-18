import React from "react";
import MessageInput from "./MessageInput";
import useChat from "../../hooks/useChat";
import { useAuthContext } from "../../context/AuthContext";

const ChatLayout: React.FC = () => {
    const chat = useChat();
    const { user } = useAuthContext();

    if (!user) return null;

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
                    // 🟢 TEXT MESSAGE
                    if (m.type === "text") {
                        const isMine = m.sender === user.username;

                        return (
                            <div
                                key={i}
                                style={{
                                    display: "flex",
                                    justifyContent: isMine
                                        ? "flex-end"
                                        : "flex-start",
                                    marginBottom: 10,
                                }}
                            >
                                <div
                                    style={{
                                        maxWidth: "65%",
                                        padding: "10px 14px",
                                        borderRadius: 14,
                                        background: isMine
                                            ? "#1DB954"
                                            : "#1e1e1e",
                                        color: isMine ? "#000" : "#fff",
                                        fontSize: 14,
                                        wordBreak: "break-word",
                                    }}
                                >
                                    {m.content}
                                </div>
                            </div>
                        );
                    }

                    // 🔵 SYSTEM MESSAGE
                    if (m.type === "system") {
                        const { name, action, actionTime } = m.content;

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
                                { name } { action } lúc { actionTime }
                            </div>
                        );
                    }

                    return null;
                })}
            </div>

            {/* ===== INPUT ===== */}
            <MessageInput onSend={chat.sendMessage} />
        </div>
    );
};

export default ChatLayout;

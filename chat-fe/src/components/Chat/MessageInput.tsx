import React, { useState } from "react";
import useChat from "../../hooks/useChat";
import { useChatContext } from "../../context/ChatContext";

const MessageInput: React.FC = () => {
    const [value, setValue] = useState("");
    const { sendChat } = useChat();
    const { currentChat } = useChatContext();

    const handleSend = () => {
        if (!value.trim()) return;
        if (!currentChat) return;

        sendChat(value.trim());
        setValue("");
    };

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                padding: 10,
                background: "#1E1E1E",
            }}
        >
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={
                    currentChat
                        ? "Type your message..."
                        : "Nhập tin nhắn của bạn..."
                }
                disabled={!currentChat}
                style={{
                    flex: 1,
                    padding: 10,
                    border: "none",
                    borderRadius: 6,
                    marginRight: 10,
                    background: "#1E1E1E",
                    color: "#fff",
                    opacity: currentChat ? 1 : 0.5,
                }}
            />
            <button
                style={{
                    background: "#1DB954",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    padding: "10px 16px",
                    cursor: currentChat ? "pointer" : "not-allowed",
                    opacity: currentChat ? 1 : 0.6,
                }}
                onClick={handleSend}
                disabled={!currentChat}
            >
                Gửi
            </button>
        </div>
    );
};

export default MessageInput;

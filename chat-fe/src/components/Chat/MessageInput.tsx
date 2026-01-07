import React, { useState } from "react";

const MessageInput: React.FC = () => {
    const [value, setValue] = useState("");

    const handleSend = () => {
        if (!value.trim()) return;
        // TODO: gửi tin nhắn ở đây
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
                placeholder="Type your message..."
                style={{
                    flex: 1,
                    padding: 10,
                    border: "none",
                    borderRadius: 6,
                    marginRight: 10,
                    background: "#1E1E1E",
                    color: "#fff",
                }}
            />
            <button
                style={{
                    background: "#1DB954",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    padding: "10px 16px",
                    cursor: "pointer",
                }}
                onClick={handleSend}
            >
                Gửi
            </button>
        </div>
    );
};

export default MessageInput;
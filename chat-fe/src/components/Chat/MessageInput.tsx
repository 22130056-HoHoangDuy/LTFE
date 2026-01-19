import React, { useState } from "react";

type Props = {
    onSend: (mes: string) => void;
};

const MessageInput: React.FC<Props> = ({ onSend }) => {
    const [text, setText] = useState("");

    const handleSend = () => {
        if (!text.trim()) return;
        onSend(text);
        setText("");
    };

    return (
        <div
            style={{
                padding: 12,
                borderTop: "1px solid #222",
                display: "flex",
                gap: 10,
            }}
        >
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Nhập tin nhắn..."
                style={{
                    flex: 1,
                    background: "#1e1e1e",
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
                    background: "#2196f3",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    padding: "8px 12px",
                    outline: "none",
                }}
            />
            <button onClick={handleSend}>Gửi</button>
        </div>
    );
};
export default MessageInput;

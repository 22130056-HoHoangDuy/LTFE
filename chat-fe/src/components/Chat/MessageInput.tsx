import React, { useState } from "react";

type Props = {
    onSend: (mes: string) => void;
    theme: "dark" | "light";
    user: {
        name: string;
        username: string;
        avatar: string;
    };
};

const MessageInput: React.FC<Props> = ({ onSend, theme }) => {

    const [text, setText] = useState("");

    const handleSend = () => {
        if (!text.trim()) return;
      
        onSend(text.trim());

        setText("");
    };

    // Màu theo theme
    const bg = theme === "dark" ? "#1E1E1E" : "#fff";
    const borderColor = theme === "dark" ? "#222" : "#e0e0e0";
    const color = theme === "dark" ? "#fff" : "#222";
    const btnBg = theme === "dark" ? "#2196f3" : "#e3eafc";
    const btnColor = theme === "dark" ? "#fff" : "#1565c0";

    return (
        <div
            style={{
                padding: 12,
                borderTop: `1px solid ${borderColor}`,
                display: "flex",
                gap: 10,
                background: bg,
            }}
        >
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Nhập tin nhắn..."
                style={{
                    flex: 1,
                    background: bg,
                    color: color,
                    border: "none",
                    borderRadius: 6,
                    padding: "8px 12px",
                    outline: "none",
                }}
            />
            <button
                onClick={handleSend}
                style={{
                    background: btnBg,
                    color: btnColor,
                    border: "none",
                    borderRadius: 6,
                    padding: "10px 16px",
                    fontWeight: 600,
                    cursor: "pointer"
                }}
            >
                Gửi
            </button>
        </div>
    );
};

export default MessageInput;


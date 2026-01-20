import React, { useState } from "react";

type Props = {
    onSend: (mes: string) => void;
<<<<<<< HEAD
};

const MessageInput: React.FC<Props> = ({ onSend }) => {
    const [value, setValue] = useState("");

    const handleSend = () => {
        if (!value.trim()) return;
        onSend(value);
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
=======
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
>>>>>>> e34ca1c6bee647ffe2a98330c2d498cb549c3d60
                }}
            />
            <button
                onClick={handleSend}
                style={{
<<<<<<< HEAD
                    background: "#1DB954",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    padding: "10px 16px",
                    cursor: "pointer",
=======
                    background: btnBg,
                    color: btnColor,
                    border: "none",
                    borderRadius: 6,
                    padding: "10px 16px",
                    fontWeight: 600,
                    cursor: "pointer"
>>>>>>> e34ca1c6bee647ffe2a98330c2d498cb549c3d60
                }}
            >
                Gửi
            </button>
        </div>
    );
};

export default MessageInput;
<<<<<<< HEAD
=======

>>>>>>> e34ca1c6bee647ffe2a98330c2d498cb549c3d60

import React from "react";
import { useAuthContext } from "../../context/AuthContext";

const ChatHeader: React.FC = () => {
    const { user } = useAuthContext();

    return (
        <div
            style={{
                height: 56,
                padding: "0 20px",
                display: "flex",
                alignItems: "center",
                background: "#121212",
                color: "#fff",
                borderBottom: "1px solid #222",
                fontWeight: 600,
                fontSize: 15,
            }}
        >
            {user ? user.username : "Chat"}

type ChatHeaderProps = {
    roomName?: string;
    theme: "dark" | "light";
};

const ChatHeader: React.FC<ChatHeaderProps> = ({ roomName, theme }) => {
    const { user } = useAuthContext();

    // Màu theo theme
    const bg = theme === "dark" ? "#1E1E1E" : "#f8f9fa";
    const color = theme === "dark" ? "#fff" : "#222";
    const border = theme === "dark" ? "#333" : "#e0e0e0";
    const buttonBg = theme === "dark" ? "#2196f3" : "#e3eafc";
    const buttonColor = theme === "dark" ? "#fff" : "#1565c0";

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                background: bg,
                color: color,
                padding: "10px 20px",
                borderBottom: `1px solid ${border}`,
            }}
        >
            <button
                style={{
                    background: buttonBg,
                    color: buttonColor,
                    border: "none",
                    borderRadius: 6,
                    padding: "8px 16px",
                    cursor: "pointer",
                }}
                // onClick={() => ...}
            >
                &lt;
            </button>
            <h2 style={{ margin: 0, marginLeft: 10, fontSize: "1.2rem" }}>
                {roomName || user?.username || "Chat"}
            </h2>
        </div>
    );
};
export default ChatHeader;


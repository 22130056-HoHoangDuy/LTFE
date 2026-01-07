import React from "react";

type ChatHeaderProps = {
    roomName?: string;
    // onBack, user, onLogout
};

const ChatHeader: React.FC<ChatHeaderProps> = ({ roomName = "Minh Hao" }) => (
    <div
        style={{
            display: "flex",
            alignItems: "center",
            background: "#1E1E1E",
            color: "#fff",
            padding: "10px 20px",
            borderBottom: "1px solid #333",
        }}
    >
        <button
            style={{
                background: "#1DB954",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "8px 16px",
                cursor: "pointer",
            }}
            // onClick={() => ...}
        >
            &lt;
        </button>
        <h2 style={{ margin: 0, marginLeft: 10, fontSize: "1.2rem" }}>{roomName}</h2>
    </div>
);

export default ChatHeader;
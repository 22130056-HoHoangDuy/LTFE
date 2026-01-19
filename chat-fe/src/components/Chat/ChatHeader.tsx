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
        </div>
    );
};
export default ChatHeader;
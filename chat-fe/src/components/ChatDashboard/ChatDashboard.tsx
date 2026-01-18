import React, { useState } from "react";
import ChatMainView from "./ChatMainView";
import ChatSidebar from "./ChatSidebar";
import { useAuthContext } from "../../context/AuthContext";

const ChatDashboard: React.FC = () => {
    const { user } = useAuthContext();
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

    if (!user) return null;

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "260px 1fr",
                height: "100vh",
                background: "#0f0f0f",
                color: "#fff",
            }}
        >
            <ChatSidebar
                user={{
                    name: user.username,
                    username: user.username,
                    avatar: "",
                }}
                selectedRoom={selectedRoom}
                onSelectRoom={setSelectedRoom}
            />

            <ChatMainView selectedRoom={selectedRoom} />
        </div>
    );
};

export default ChatDashboard;

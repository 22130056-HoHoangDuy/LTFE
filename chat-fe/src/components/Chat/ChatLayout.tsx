import React from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

// thiếu nhận props như: roomName, user, onLogout
const ChatLayout: React.FC = () => (
    <div
        style={{
            background: '#121212',
            height: "100vh",
            display: "flex",
            flexDirection: "column"
        }}
    >
        <ChatHeader />
        <div style={{ flex: 1, overflow: "hidden" }}>
            <MessageList />
        </div>
        <MessageInput />
    </div>
);

export default ChatLayout;
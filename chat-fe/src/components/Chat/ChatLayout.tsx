import React from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import useChat from "../../hooks/useChat";

interface ChatLayoutProps {
    roomName?: string;
    user: {
        name: string;
        username: string;
        avatar: string;
    };
    onLogout?: () => void;
    theme: "dark" | "light";
}

const ChatLayout: React.FC<ChatLayoutProps> = ({
                                                   roomName,
                                                   user,
                                                   onLogout,
                                                   theme
                                               }) => {
    const bg = theme === "dark" ? '#121212' : '#fff';

    const chat = useChat();

    return (
        <div
            style={{
                background: bg,
                height: "100vh",
                display: "flex",
                flexDirection: "column"
            }}
        >
            <ChatHeader roomName={roomName} theme={theme} />
            <div style={{ flex: 1, overflow: "hidden" }}>
                {/* Bạn có thể truyền thêm user/theme xuống MessageList nếu muốn xử lý theme cho từng message */}
                <MessageList user={user} theme={theme} messages={chat.messages} />
            </div>
            <MessageInput
                theme={theme}
                user={user}
                onSend={chat.sendMessage}
            />
        </div>
    );
};

export default ChatLayout;
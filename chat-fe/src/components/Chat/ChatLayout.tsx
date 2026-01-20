import React from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { ChatMessage } from "../../utils/types";

interface ChatLayoutProps {
    roomName?: string;
    user: {
        name: string;
        username: string;
        avatar: string;
    };
    onLogout?: () => void;
    theme: "dark" | "light";
    messages: ChatMessage[];
    onSend: (mes: string) => void;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({
    roomName,
    user,
    onLogout,
    theme,
    messages,
    onSend
}) => {
    const bg = theme === "dark" ? '#121212' : '#fff';

    // Removed internal useChat call to avoid state isolation
    return (
        <div
            style={{
                background: bg,
                height: "100%",
                display: "flex",
                flexDirection: "column"
            }}
        >
            <ChatHeader roomName={roomName} theme={theme} />
            <div style={{ flex: 1, overflow: "hidden" }}>
                {/* Bạn có thể truyền thêm user/theme xuống MessageList nếu muốn xử lý theme cho từng message */}
                <MessageList user={user} theme={theme} messages={messages} />
            </div>
            <MessageInput
                theme={theme}
                user={user}
                onSend={onSend}
            />
        </div>
    );
};

export default ChatLayout;
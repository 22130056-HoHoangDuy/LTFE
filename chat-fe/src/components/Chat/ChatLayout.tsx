import React from "react";
import MessageInput from "./MessageInput";
import useChat from "../../hooks/useChat";
<<<<<<< HEAD
import { useAuthContext } from "../../context/AuthContext";

const ChatLayout: React.FC = () => {
    const chat = useChat();
    const { user } = useAuthContext();

    if (!user) return null;

    // Debug: log messages trước khi render
    console.log("messages to render:", chat.messages);
=======
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";


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

>>>>>>> e34ca1c6bee647ffe2a98330c2d498cb549c3d60

    return (
        <div
            style={{
<<<<<<< HEAD
                height: "100%",
                display: "flex",
                flexDirection: "column",
                background: "#0b0b0b",
            }}
        >
            {/* ===== MESSAGE LIST ===== */}
            <div
                style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "20px 24px",
                }}
            >
                {chat.messages.map((m, i) => {
                    // system message (content đã normalize thành string theo useChat)
                    if (m.type === "system") {
                        return (
                            <div
                                key={i}
                                style={{
                                    textAlign: "center",
                                    margin: "12px 0",
                                    fontSize: 12,
                                    opacity: 0.6,
                                    color: "#ccc",
                                }}
                            >
                                {/* defensive: nếu content vẫn là object (trường hợp hiếm), stringify */}
                                {typeof m.content === "object" ? JSON.stringify(m.content) : m.content}
                            </div>
                        );
                    }

                    // text message
                    const isMine = m.sender === user.username;

                    return (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                justifyContent: isMine ? "flex-end" : "flex-start",
                                marginBottom: 10,
                            }}
                        >
                            <div
                                style={{
                                    maxWidth: "65%",
                                    padding: "10px 14px",
                                    borderRadius: 14,
                                    background: isMine ? "#1DB954" : "#1e1e1e",
                                    color: isMine ? "#000" : "#fff",
                                    fontSize: 14,
                                    wordBreak: "break-word",
                                }}
                            >
                                {typeof m.content === "object" ? JSON.stringify(m.content) : m.content}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ===== INPUT ===== */}
            <MessageInput onSend={chat.sendMessage} />
=======
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
>>>>>>> e34ca1c6bee647ffe2a98330c2d498cb549c3d60
        </div>
    );
};

export default ChatLayout;
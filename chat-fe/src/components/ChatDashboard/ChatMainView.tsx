import React, { useEffect } from "react";
import Aurora from "../common/Aurora";
import ChatLayout from "../Chat/ChatLayout";
import useChat from "../../hooks/useChat";
import { useAuthContext } from "../../context/AuthContext";

import { UserItem } from "../../hooks/useUserList";

interface Props {
    selectedRoom: UserItem | null;
    theme: "dark" | "light";
    user: {
        name: string;
        username: string;
        avatar: string;
    };
}

const ChatMainView: React.FC<Props> = ({ selectedRoom, theme, user }) => {
    const chat = useChat();

    useEffect(() => {
        if (selectedRoom) {
            // Use specific type if available, default to 'people'
            const type = selectedRoom.type || "people";
            chat.selectChat(type, selectedRoom.name);
        }
    }, [selectedRoom]);

    const textColor = theme === "dark" ? "#fff" : "#222";

    if (!selectedRoom) {
        return (
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
                <Aurora
                    colorStops={["#3A29FF", "#19C1E7", "#10A478"]}
                    blend={0.5}
                    amplitude={1.0}
                    speed={0.5}
                />
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: textColor,
                        fontSize: 22,
                        fontWeight: 600,
                    }}
                >
                    Hãy chọn phòng hoặc người để bắt đầu trò chuyện
                </div>
            </div>
        );
    }

    return (
        <div style={{ flex: 1, color: textColor }}>
            {/* Nếu ChatLayout cần user và selectedRoom, hãy truyền */}
            {/* <ChatLayout roomId={selectedRoom} user={user} /> */}
            <ChatLayout
                roomName={selectedRoom.name}
                user={user}
                theme={theme}
                messages={chat.messages}
                onSend={chat.sendMessage}
            />
        </div>
    );
};

export default ChatMainView;
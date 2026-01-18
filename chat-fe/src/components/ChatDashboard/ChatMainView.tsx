import React, { useEffect } from "react";
import Aurora from "../Common/Aurora";
import ChatLayout from "../Chat/ChatLayout";
import useChat from "../../hooks/useChat";
import { useAuthContext } from "../../context/AuthContext";


interface Props {
    selectedRoom: string | null;
}

const ChatMainView: React.FC<Props> = ({ selectedRoom }) => {
    const chat = useChat();

    useEffect(() => {
        if (selectedRoom) {
            chat.selectChat("people", selectedRoom);
        }
    }, [selectedRoom]);

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
                        color: "#fff",
                        fontSize: 22,
                        fontWeight: 600,
                    }}
                >
                    Hãy chọn phòng hoặc người để bắt đầu trò chuyện
                </div>
            </div>
        );
    }

    return <ChatLayout />;
};
export default ChatMainView;


import React from "react";
import ChatLayout from "../Chat/ChatLayout";
import Aurora from "../common/Aurora";

// Có thể truyền user, room cho ChatLayout
interface Props {
    selectedRoom: string | null;
    user: {
        name: string;
        username: string;
        avatar: string;
    };
    theme: "dark" | "light";
}

const ChatMainView: React.FC<Props> = ({ selectedRoom, user, theme }) => {
    // Đổi màu text theo theme
    const textColor = theme === "dark" ? "#fff" : "#222";

    // Nếu chưa chọn phòng thì render background
    if (!selectedRoom) {
        return (
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
                {/* Aurora background */}
                <Aurora
                    colorStops={["#3A29FF", "#19C1E7", "#10A478"]}
                    blend={0.5}
                    amplitude={1.0}
                    speed={0.5}
                />
                {/* Overlay chữ (hiện trên nền Aurora) */}
                <div
                    style={{
                        position: "absolute",
                        top: 0, left: 0, right: 0, bottom: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: textColor,
                        fontSize: 22,
                        fontWeight: 600,
                        pointerEvents: "none"
                    }}
                >
                    Hãy chọn phòng hoặc người bạn muốn trò chuyện để bắt đầu...
                </div>
            </div>
        );
    }
    return (
        <div style={{ flex: 1, color: textColor }}>
            {/* Chỗ này để render chatbox của phòng đã chọn */}
            {/*<ChatLayout roomId={selectedRoom} user={user}*/}
            /* Chỗ này để xử lý load & hiển thị nội dung phòng chat */
            {/*/>*/}
        </div>
    );
};

export default ChatMainView;
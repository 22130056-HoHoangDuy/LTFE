import React from "react";
import ChatLayout from "../Chat/ChatLayout";

// Có thể truyền user, room cho ChatLayout
interface Props {
    selectedRoom: string | null;
    user: {
        name: string;
        username: string;
        avatar: string;
    };
}

const ChatMainView: React.FC<Props> = ({ selectedRoom, user }) => {
    // Nếu chưa chọn phòng thì render background
    if (!selectedRoom) {
        return (
            <div style={{
                flex: 1,
                background: "#212121",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <div style={{ color: "#bdbdbd", fontSize: "1.2rem", textAlign: "center", maxWidth: 340 }}>
                    Hãy chọn phòng hoặc người bạn muốn trò chuyện để bắt đầu...
                </div>
            </div>
        );
    }
    // Nếu đã chọn phòng thì render ChatLayout (truyền roomId, user)
    return (
        <div style={{ flex: 1 }}>
            {/* Chỗ này để render chatbox của phòng đã chọn */}
            {/*<ChatLayout roomId={selectedRoom} user={user}*/}
                /* Chỗ này để xử lý load & hiển thị nội dung phòng chat */
            {/*/>*/}
        </div>
    );
};

export default ChatMainView;
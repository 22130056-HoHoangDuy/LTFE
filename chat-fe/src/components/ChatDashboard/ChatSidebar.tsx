import React from "react";
import { chatDashboardColors as c } from "./dashboardStyles";

interface User {
    name: string;
    username: string;
    avatar: string;
}
interface Props {
    user: User;
    onSelectRoom: (roomId: string) => void;
    selectedRoom: string | null;
}

const roomListMock = Array.from({ length: 5 }, (_, i) => ({
    id: `room${i + 1}`,
    name: "User name",
    time: "10:03",
}));

const ChatSidebar: React.FC<Props> = ({
                                          user,
                                          onSelectRoom,
                                          selectedRoom,
                                      }) => {
    return (
        <div
            style={{
                width: 260,
                background: c.bgSidebar,
                color: c.text,
                display: "flex",
                flexDirection: "column",
                padding: "0 18px",
                borderRight: `2px solid ${c.sidebarBorder}`,
                minWidth: 0,
                maxWidth: 300,
            }}
        >
            <div style={{ height: 18 }} />
            {/* Thanh tìm kiếm */}
            <div style={{ width: "100%", marginBottom: 10, display: "flex", alignItems: "center" }}>
                <img src="/icons/search.svg" alt="search" width={20} style={{ marginRight: 6 }} />
                <input
                    style={{
                        background: c.input,
                        color: c.inputText,
                        borderRadius: 28,
                        border: "none",
                        padding: "7px 15px",
                        outline: "none",
                        flex: 1,
                    }}
                    placeholder="Tìm kiếm"
                    // Chỗ này để xử lý tìm kiếm room
                />
            </div>
            <button style={{
                marginBottom: 15,
                border: "2px solid #fff",
                background: "transparent",
                borderRadius: 6,
                color: "#fff",
                padding: "6px 22px",
                fontWeight: 450,
                cursor: "pointer"
            }}>
                Tạo phòng
                {/* Chỗ này để xử lý tạo room */}
            </button>
            {/* Danh sách phòng/chat */}
            <div style={{ overflowY: "auto", flex: 1 }}>
                {/* Chỗ này để xử lý gọi list room */}
                {roomListMock.map(room => (
                    <div
                        key={room.id}
                        onClick={() => onSelectRoom(room.id)}
                        style={{
                            borderRadius: 7,
                            padding: "10px 8px",
                            background: selectedRoom === room.id ? "#244D3D" : c.roomBg,
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 6,
                            cursor: "pointer",
                            border: selectedRoom === room.id ? "2px solid #1DB954" : "2px solid transparent"
                        }}
                    >
                        <img src="/icons/avatar.svg" alt="" width={31} height={31} style={{ borderRadius: "50%" }} />
                        <span style={{ marginLeft: 14, fontWeight: 500 }}>{room.name}</span>
                        <span style={{ marginLeft: "auto", marginRight: 6, fontSize: "0.95em", color: "#b0b0b0" }}>{room.time}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatSidebar;
import React, { useState } from "react";
import { chatDashboardColors as c } from "./dashboardStyles";
import RoomList from "../Room/RoomList";

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

// const roomListMock = Array.from({ length: 5 }, (_, i) => ({
//     id: `room${i + 1}`,
//     name: "User name",
//     time: "10:03",
// }));

const ChatSidebar: React.FC<Props> = ({
                                          user,
                                          onSelectRoom,
                                          selectedRoom,
                                      }) => {
    // State hover cho search icon và nút Tạo phòng
    const [hoverSearch, setHoverSearch] = useState(false);
    const [hoverCreate, setHoverCreate] = useState(false);
    // State để track focus input tìm kiếm
    const [searchFocus, setSearchFocus] = useState(false);

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
                <img
                    src={hoverSearch ? "/icons/search1.svg" : "/icons/search.svg"}
                    alt="search"
                    width={20}
                    style={{
                        marginRight: 6,
                        transition: "filter 0.22s, transform 0.18s",
                        filter: hoverSearch ? "brightness(1.4)" : undefined,
                        transform: hoverSearch ? "scale(1.16) translateX(5px)" : undefined,
                        cursor: "pointer"
                    }}
                    onMouseEnter={() => setHoverSearch(true)}
                    onMouseLeave={() => setHoverSearch(false)}
                />
                <input
                    style={{
                        background: c.input,
                        color: c.inputText,
                        borderRadius: 28,
                        border: searchFocus ? "2px solid #fff" : "none",
                        padding: "7px 15px",
                        outline: "none",
                        flex: 1,
                        transition: "border 0.16s"
                    }}
                    placeholder="Tìm kiếm"
                    onFocus={() => setSearchFocus(true)}
                    onBlur={() => setSearchFocus(false)}
                    // Chỗ này để xử lý tìm kiếm room
                />
            </div>
            {/* Nút Tạo phòng */}
            <button style={{
                marginBottom: 15,
                border: `2px solid ${hoverCreate ? "#2196f3" : "#fff"}`,
                background: hoverCreate ? "#2196f3" : "transparent",
                borderRadius: 6,
                color: "#fff",
                padding: "6px 22px",
                fontWeight: 450,
                cursor: "pointer",
                transition: "background 0.17s, border 0.17s"
            }}
                    onMouseEnter={() => setHoverCreate(true)}
                    onMouseLeave={() => setHoverCreate(false)}
            >
                Tạo phòng
                {/* Chỗ này để xử lý tạo room */}
            </button>
            {/* Danh sách phòng/chat */}
            <div style={{ overflowY: "auto", flex: 1 }}>
                {/* Chỗ này để xử lý gọi list room */}
                {/*{roomListMock.map(room => (
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
                ))}*/}
                <RoomList rooms={[]}                    // Chỗ này truyền props thật sau (ví dụ: rooms, selectedRoomId, onSelectRoom...)
                    // Chỗ này truyền props thật sau (ví dụ: rooms, selectedRoomId, onSelectRoom...)
                    // rooms={...}
                    // selectedRoomId={selectedRoom}
                    // onSelectRoom={onSelectRoom}
                />
            </div>
        </div>
    );
};

export default ChatSidebar;
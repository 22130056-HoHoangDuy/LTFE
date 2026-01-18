// ChatSidebar.tsx
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
    theme: "dark" | "light";
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
                                          theme,
                                      }) => {
    // State hover cho search icon và nút Tạo phòng
    const [hoverSearch, setHoverSearch] = useState(false);
    const [hoverCreate, setHoverCreate] = useState(false);
    // State để track focus input tìm kiếm
    const [searchFocus, setSearchFocus] = useState(false);

    // Đổi màu theo theme
    const sidebarBg = theme === "dark" ? c.bgSidebar : "#f3f5f7";
    const sidebarText = theme === "dark" ? c.text : "#222";
    const sidebarBorder = theme === "dark" ? c.sidebarBorder : "#222";
    const inputBg = theme === "dark" ? c.input : "#fff";
    const inputText = theme === "dark" ? c.inputText : "#222";
    const buttonText = theme === "dark" ? "#fff" : "#222";
    const buttonBorder = theme === "dark" ? "#fff" : "#222";
    const buttonBgHover = theme === "dark" ? "#2196f3" : "#2196f3";
    const searchBorderFocus = theme === "dark" ? "#fff" : "#222";
    const placeholderColor = theme === "dark" ? "#aaa" : "#222";

    return (
        <div
            style={{
                width: 260,
                background: sidebarBg,
                color: sidebarText,
                display: "flex",
                flexDirection: "column",
                padding: "0 18px",
                borderRight: `2px solid ${sidebarBorder}`,
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
                        background: inputBg,
                        color: inputText,
                        borderRadius: 28,
                        border: searchFocus ? `2px solid ${searchBorderFocus}` : "none",
                        padding: "7px 15px",
                        outline: "none",
                        flex: 1,
                        transition: "border 0.16s"
                    }}
                    placeholder="Tìm kiếm"
                    onFocus={() => setSearchFocus(true)}
                    onBlur={() => setSearchFocus(false)}

                    // @ts-ignore
                    style={
                        {
                            background: inputBg,
                            color: inputText,
                            borderRadius: 28,
                            border: searchFocus ? `2px solid ${searchBorderFocus}` : "none",
                            padding: "7px 15px",
                            outline: "none",
                            flex: 1,
                            transition: "border 0.16s",
                            '::placeholder': { color: placeholderColor, opacity: 1 }
                        } as React.CSSProperties
                    }
                />
                <style>
                    {`
                input::placeholder {
                  color: ${placeholderColor};
                  opacity: 1;
                }
                `}
                </style>
            </div>
            {/* Nút Tạo phòng */}
            <button style={{
                marginBottom: 15,
                border: `2px solid ${hoverCreate ? buttonBgHover : buttonBorder}`,
                background: hoverCreate ? buttonBgHover : "transparent",
                borderRadius: 6,
                color: buttonText,
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
                <RoomList rooms={[]} />
            </div>
        </div>
    );
};

export default ChatSidebar;
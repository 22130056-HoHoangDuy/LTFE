import React, { useMemo, useState } from "react";
import { chatDashboardColors as c } from "./dashboardStyles";
import RoomList from "../Room/RoomList";
import useUserList from "../../hooks/useUserList";
import socket from "../../api/socket";

import { UserItem } from "../../hooks/useUserList";

interface Props {
    user: {
        name: string;
        username: string;
        avatar?: string;
    };
    selectedRoom: UserItem | null;
    onSelectRoom: (item: UserItem) => void;
    theme: "dark" | "light";
}





const ChatSidebar: React.FC<Props> = ({ user, selectedRoom, onSelectRoom, theme }) => {
    const usersRaw = useUserList();
    const [keyword, setKeyword] = useState("");
    const [hoverSearch, setHoverSearch] = useState(false);
    const [hoverCreate, setHoverCreate] = useState(false);
    const [searchFocus, setSearchFocus] = useState(false);

    // State tạo phòng
    const [isCreating, setIsCreating] = useState(false);
    const [newRoomName, setNewRoomName] = useState("");

    const handleCreateRoom = () => {
        if (!newRoomName.trim()) return;

        socket.send({
            action: "onchat",
            data: {
                event: "CREATE_ROOM",
                data: { name: newRoomName }
            }
        });

        setNewRoomName("");
        setIsCreating(false);
        // Có thể cần reload user list hoặc server sẽ tự push update
    };

    // usersRaw is now UserItem[]
    const users = usersRaw;

    const filteredUsers = useMemo(() => {
        if (!keyword.trim()) return users;
        return users.filter((u) => u.name.toLowerCase().includes(keyword.toLowerCase()));
    }, [users, keyword]);

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
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onFocus={() => setSearchFocus(true)}
                    onBlur={() => setSearchFocus(false)}
                    placeholder="Tìm kiếm"
                    style={{
                        background: inputBg,
                        color: inputText,
                        borderRadius: 28,
                        border: searchFocus ? `2px solid ${searchBorderFocus}` : "none",
                        padding: "7px 15px",
                        outline: "none",
                        flex: 1,
                        transition: "border 0.16s",
                        // @ts-ignore
                        '::placeholder': { color: placeholderColor, opacity: 1 }
                    }}
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
            <button
                style={{
                    marginBottom: 15,
                    border: `2px solid ${hoverCreate ? buttonBgHover : buttonBorder}`,
                    background: hoverCreate ? buttonBgHover : "transparent",
                    borderRadius: 6,
                    color: buttonText,
                    padding: "6px 22px",
                    cursor: "pointer",
                    fontWeight: 450,
                    transition: "background 0.17s, border 0.17s",
                }}
                onMouseEnter={() => setHoverCreate(true)}
                onMouseLeave={() => setHoverCreate(false)}
                onClick={() => setIsCreating(!isCreating)}
            >
                {isCreating ? "Hủy" : "Tạo phòng"}n
            </button>

            {isCreating && (
                <div style={{ marginBottom: 15, display: "flex", gap: 5 }}>
                    <input
                        value={newRoomName}
                        onChange={(e) => setNewRoomName(e.target.value)}
                        placeholder="Tên phòng..."
                        style={{
                            flex: 1,
                            background: inputBg,
                            color: inputText,
                            border: `1px solid ${searchBorderFocus}`,
                            borderRadius: 4,
                            padding: "5px 8px",
                            outline: "none",
                            minWidth: 0
                        }}
                    />
                    <button
                        onClick={handleCreateRoom}
                        style={{
                            background: buttonBgHover,
                            color: "#fff",
                            border: "none",
                            borderRadius: 4,
                            padding: "5px 10px",
                            cursor: "pointer",
                            whiteSpace: "nowrap"
                        }}
                    >
                        Tạo
                    </button>
                </div>
            )}
            {/* 👥 USER LIST */}
            <div style={{ overflowY: "auto", flex: 1 }}>
                <RoomList
                    rooms={filteredUsers}
                    selectedRoomId={selectedRoom?.id || null}
                    onSelectRoom={onSelectRoom} theme={theme} /> </div>
        </div>

    );
};




export default ChatSidebar;
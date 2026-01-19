import React, { useMemo, useState } from "react";
import { chatDashboardColors as c } from "./dashboardStyles";
import RoomList from "../Room/RoomList";
import useUserList from "../../hooks/useUserList";

interface Props {
    user: {
        name: string;
        username: string;
        avatar?: string;
    };
    selectedRoom: string | null;
    onSelectRoom: (username: string) => void;
}

const ChatSidebar: React.FC<Props> = ({ user, selectedRoom, onSelectRoom }) => {
    const usersRaw = useUserList();
    const [keyword, setKeyword] = useState("");

    // Debug: xem cấu trúc users từ hook
    // console.log("usersRaw:", usersRaw);

    // normalize users thành { id, name }
    const users = useMemo(() => {
        if (!Array.isArray(usersRaw)) return [];
        return usersRaw.map((u: any, idx: number) => {
            if (typeof u === "string" || typeof u === "number") {
                const id = String(u);
                return { id, name: id };
            }
            if (typeof u === "object" && u !== null) {
                const id = String(u.id ?? u.userId ?? u.username ?? idx);
                const name = String(u.name ?? u.username ?? u.user ?? id);
                return { id, name };
            }
            return { id: String(idx), name: String(u) };
        });
    }, [usersRaw]);

    const filteredUsers = useMemo(() => {
        if (!keyword.trim()) return users;
        return users.filter((u) => u.name.toLowerCase().includes(keyword.toLowerCase()));
    }, [users, keyword]);

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
            }}
        >
            <div style={{ height: 18 }} />

            {/* 🔍 SEARCH */}
            <div style={{ marginBottom: 10, display: "flex", alignItems: "center" }}>
                <img src="/icons/search.svg" alt="search" width={20} style={{ marginRight: 6 }} />
                <input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Tìm kiếm"
                    style={{
                        background: c.input,
                        color: c.inputText,
                        borderRadius: 28,
                        border: "none",
                        padding: "7px 15px",
                        outline: "none",
                        flex: 1,
                    }}
                />
            </div>

            <button
                style={{
                    marginBottom: 15,
                    border: "2px solid #fff",
                    background: "transparent",
                    borderRadius: 6,
                    color: "#fff",
                    padding: "6px 22px",
                    cursor: "pointer",
                }}
            >
                Tạo phòng
            </button>

            {/* 👥 USER LIST */}
            <div style={{ overflowY: "auto", flex: 1 }}>
                <RoomList
                    rooms={filteredUsers.map((u) => ({
                        id: u.id,
                        name: u.name,
                        time: "",
                    }))}
                    selectedRoomId={selectedRoom}
                    onSelectRoom={onSelectRoom}
                />
            </div>
        </div>
    );
};

export default ChatSidebar;
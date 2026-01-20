import React, { useMemo, useState } from "react";
import { chatDashboardColors as c } from "./dashboardStyles";
import RoomList from "../Room/RoomList";
import useUserList from "../../hooks/useUserList";
import CreateRoomModal from "../Room/CreateRoomModel";
import socketService from "../../api/socket";
import { useEffect } from "react";




interface Props {
    user: {
        name: string;
        username: string;
        avatar?: string;
    };
    selectedRoom: string | null;
    onSelectRoom: (username: string) => void;
    theme: "dark" | "light";
}





const ChatSidebar: React.FC<Props> = ({ user, selectedRoom, onSelectRoom, theme }) => {
    const usersRaw = useUserList();
    const [keyword, setKeyword] = useState("");
    const [hoverSearch, setHoverSearch] = useState(false);
    const [hoverCreate, setHoverCreate] = useState(false);
    const [searchFocus, setSearchFocus] = useState(false);

    const [openCreate, setOpenCreate] = useState(false);

    const [rooms, setRooms] = useState<{ id: string; name: string; time: string }[]>([]);

    const handleCreateRoom = (roomName: string) => {
        const tempId = "temp-" + Date.now();
        // 👇 1. hiện phòng ngay lập tức
        setRooms((prev) => [
            { id: tempId, name: roomName, time: "" },
            ...prev,
        ]);

        // 👇 2. gửi WS lên backend
        const payload = {
            action: "onchat",
            data: {
                event: "CREATE_ROOM",
                data: { name: roomName },
            },
        };

        socketService.send(payload);
    };



    useEffect(() => {
        socketService.connect();
        const off = socketService.onMessage((msg) => {
            console.log("WS IN:", msg);

            // backend wrap: { action, data: { event, data } }
            if (msg?.data?.event === "ROOM_CREATED") {
                const room = msg.data.data;

                setRooms((prev) => {
                    // 👇 xóa phòng temp cùng tên
                    const filtered = prev.filter(
                        (r) => !r.id.startsWith("temp-") || r.name !== room.name
                    );

                    return [
                        {
                            id: String(room.id),
                            name: room.name,
                            time: "",
                        },
                        ...filtered,
                    ];
                });
            }
        });

        return off; // cleanup listener
    }, []);



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
                onClick={() => setOpenCreate(true)}   // 👈 mở modal
            >

                Tạo phòng
            </button>
            {/* 👥 USER LIST */}
            <div style={{ overflowY: "auto", flex: 1 }}>
                <RoomList
                    rooms={[
                        ...rooms,
                        ...filteredUsers.map((u) => ({
                            id: u.id,
                            name: u.name,
                            time: "",
                        })),
                    ]}
                    selectedRoomId={selectedRoom}
                    onSelectRoom={onSelectRoom} theme={"dark"}                />
            </div>

            <CreateRoomModal
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                theme={theme}
                onCreateRoom={handleCreateRoom}
            />



        </div>

    );
};




export default ChatSidebar;
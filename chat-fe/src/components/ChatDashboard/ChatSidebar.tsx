import React, { useState, useEffect } from "react";
import { chatDashboardColors as c } from "./dashboardStyles";
import RoomList, { Room } from "../RoomList/RoomList";
import socket from "../../api/socket";

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

const ChatSidebar: React.FC<Props> = ({
                                          user,
                                          onSelectRoom,
                                          selectedRoom,
                                          theme,
                                      }) => {
    const [hoverSearch, setHoverSearch] = useState(false);
    const [hoverCreate, setHoverCreate] = useState(false);
    const [searchFocus, setSearchFocus] = useState(false);

    const [rooms, setRooms] = useState<Room[]>([]);
    const [currentRoom, setCurrentRoom] = useState<Room | null>(null);

    // ===== restore room khi reload =====
    useEffect(() => {
        const savedName = localStorage.getItem("currentRoomName");
        const savedId = localStorage.getItem("currentRoomId");

        if (savedName && savedId) {
            const room: Room = { id: savedId, name: savedName };

            setRooms([room]);
            setCurrentRoom(room);
            onSelectRoom(savedId);

            socket.send({
                action: "onchat",
                data: {
                    event: "JOIN_ROOM",
                    data: { name: savedName },
                },
            });
        }
    }, []);

    // ===== THEME =====
    const sidebarBg = theme === "dark" ? c.bgSidebar : "#f3f5f7";
    const sidebarText = theme === "dark" ? c.text : "#222";
    const sidebarBorder = theme === "dark" ? c.sidebarBorder : "#222";
    const inputBg = theme === "dark" ? c.input : "#fff";
    const inputText = theme === "dark" ? c.inputText : "#222";
    const buttonText = theme === "dark" ? "#fff" : "#222";
    const buttonBorder = theme === "dark" ? "#fff" : "#222";
    const buttonBgHover = "#2196f3";
    const searchBorderFocus = theme === "dark" ? "#fff" : "#222";
    const placeholderColor = theme === "dark" ? "#aaa" : "#222";

    // ===== CREATE ROOM =====
    const createRoom = (roomName: string) => {
        const roomId = Date.now().toString();

        socket.send({
            action: "onchat",
            data: {
                event: "CREATE_ROOM",
                data: { name: roomName },
            },
        });

        const newRoom: Room = { id: roomId, name: roomName };

        setRooms((prev) => [...prev, newRoom]);
        setCurrentRoom(newRoom);
        onSelectRoom(roomId);

        localStorage.setItem("currentRoomName", roomName);
        localStorage.setItem("currentRoomId", roomId);

        socket.send({
            action: "onchat",
            data: {
                event: "JOIN_ROOM",
                data: { name: roomName },
            },
        });
    };

    // ===== JOIN ROOM =====
    const joinRoom = (room: Room) => {
        setCurrentRoom(room);
        onSelectRoom(room.id);

        localStorage.setItem("currentRoomName", room.name);
        localStorage.setItem("currentRoomId", room.id);

        socket.send({
            action: "onchat",
            data: {
                event: "JOIN_ROOM",
                data: { name: room.name },
            },
        });
    };

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

            {/* SEARCH */}
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
                        cursor: "pointer",
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
                    }}
                    placeholder="Tìm kiếm"
                    onFocus={() => setSearchFocus(true)}
                    onBlur={() => setSearchFocus(false)}
                />
            </div>

            {/* BUTTONS */}
            <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
                <button
                    style={{
                        border: `2px solid ${hoverCreate ? buttonBgHover : buttonBorder}`,
                        background: hoverCreate ? buttonBgHover : "transparent",
                        borderRadius: 6,
                        color: buttonText,
                        padding: "6px 16px",
                        cursor: "pointer",
                    }}
                    onMouseEnter={() => setHoverCreate(true)}
                    onMouseLeave={() => setHoverCreate(false)}
                    onClick={() => {
                        const roomName = prompt("Nhập tên phòng mới:");
                        if (!roomName) return;
                        createRoom(roomName);
                    }}
                >
                    + Tạo phòng
                </button>

                <button
                    style={{
                        border: `2px solid ${buttonBorder}`,
                        background: "transparent",
                        borderRadius: 6,
                        color: buttonText,
                        padding: "6px 16px",
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        const roomName = prompt("Nhập tên phòng muốn tham gia:");
                        if (!roomName) return;

                        const room: Room = {
                            id: Date.now().toString(),
                            name: roomName,
                        };

                        setRooms((prev) => [...prev, room]);
                        joinRoom(room);
                    }}
                >
                    Join phòng
                </button>
            </div>

            {/* ROOM LIST */}
            <div style={{ overflowY: "auto", flex: 1 }}>
                <RoomList rooms={rooms} onSelectRoom={joinRoom} />
            </div>
        </div>
    );
};

export default ChatSidebar;

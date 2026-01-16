import React, { useEffect, useState } from "react";
import socket from "../../api/socket";
import RoomItem from "./RoomItem";
import CreateRoomModel from "./CreateRoomModel";

interface Room {
    name: string;
}

const RoomList: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Lắng nghe tin nhắn từ server
        const unsubscribe = socket.onMessage((message) => {
            if (!message?.event) return;

            switch (message.event) {
                case "ROOM_LIST":
                    setRooms(message.data);
                    break;

                case "ROOM_CREATED":
                    setRooms((prev) => [...prev, message.data]);
                    break;

                default:
                    break;
            }
        });

        // Cleanup khi component unmount
        return () => {
            unsubscribe?.();
        };
    }, []);

    const createRoom = (name: string) => {
        socket.send({
            action: "onchat",
            data: {
                event: "CREATE_ROOM",
                data: { name },
            },
        });

        // Option 1: Thêm ngay vào UI để test mà không cần server
        // setRooms((prev) => [...prev, { name }]);
    };

    const joinRoom = (name: string) => {
        socket.send({
            action: "onchat",
            data: {
                event: "JOIN_ROOM",
                data: { name },
            },
        });
    };

    return (
        <div style={{ padding: 12 }}>
            <h3 style={{ marginTop: 0 }}>Danh sách phòng</h3>

            <button
                onClick={() => setShowModal(true)}
                style={{
                    width: "100%",
                    marginBottom: 12,
                    background: "#1DB954",
                    color: "#fff",
                    border: "none",
                    padding: "6px 0",
                    borderRadius: 4,
                    cursor: "pointer",
                }}
            >
                + Tạo phòng
            </button>

            {rooms.map((room) => (
                <RoomItem key={room.name} room={room} onJoin={joinRoom} />
            ))}

            {showModal && (
                <CreateRoomModel
                    onClose={() => setShowModal(false)}
                    onCreate={createRoom}
                />
            )}
        </div>
    );
};

export default RoomList;

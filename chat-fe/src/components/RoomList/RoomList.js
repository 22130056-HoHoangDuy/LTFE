import React, { useState } from "react";
import RoomItem from "./RoomItem";
import "./RoomList.css";

const RoomList = () => {
    const [rooms] = useState([
        { id: 1, name: "NGA", lastMessage: "Hello mọi người" },
        { id: 2, name: "HAH", lastMessage: " xong chưa?" },
        { id: 3, name: "NVB", lastMessage: " OK " },
    ]);

    const [activeRoomId, setActiveRoomId] = useState(1);

    return (
        <div className="room-list">
            <h3 className="room-list-title">Chats</h3>

            {rooms.map((room) => (
                <div key={room.id} onClick={() => setActiveRoomId(room.id)}>
                    <RoomItem
                        room={room}
                        isActive={room.id === activeRoomId}
                    />
                </div>
            ))}
        </div>
    );
};

export default RoomList;

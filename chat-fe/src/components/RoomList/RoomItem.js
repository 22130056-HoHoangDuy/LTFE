import React from "react";
import "./RoomList.css";

const RoomItem = ({ room, isActive }) => {
    return (
        <div className={`room-item ${isActive ? "active" : ""}`}>
            <div className="room-avatar">
                {room.name.charAt(0).toUpperCase()}
            </div>

            <div className="room-info">
                <div className="room-name">{room.name}</div>
                <div className="room-last-message">
                    {room.lastMessage}
                </div>
            </div>
        </div>
    );
};

export default RoomItem;

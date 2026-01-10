import React, { useState } from "react";
import RoomItem from "./RoomItem";
import CreateRoomModel from "./CreateRoomModel";

const RoomList: React.FC = () => {
    const [showCreate, setShowCreate] = useState(false);

    return (
        <div style={{ padding: 12, color: "#fff" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Rooms</h3>
                <button onClick={() => setShowCreate(true)}>+</button>
            </div>

            {/* fake list để test */}
            <RoomItem name="ABC" />
            <RoomItem name="General" />

            {showCreate && (
                <CreateRoomModel onClose={() => setShowCreate(false)} />
            )}
        </div>
    );
};

export default RoomList;

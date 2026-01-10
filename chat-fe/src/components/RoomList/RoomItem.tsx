import React from "react";

const RoomItem: React.FC<{ name: string }> = ({ name }) => (
    <div
        style={{
            padding: 10,
            borderRadius: 6,
            background: "#2A2A2A",
            marginBottom: 8,
            cursor: "pointer"
        }}
    >
        {name}
    </div>
);

export default RoomItem;

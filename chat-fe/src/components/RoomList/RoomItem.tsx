import React from "react";

interface Props {
    room: { name: string };
    onJoin: (name: string) => void;
}

const RoomItem: React.FC<Props> = ({ room, onJoin }) => {
    return (
        <div
            style={{
                padding: 8,
                marginTop: 8,
                border: "1px solid #333",
                borderRadius: 4,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
            }}
        >
            <span>{room.name}</span>
            <button
                onClick={() => onJoin(room.name)}
                style={{
                    background: "#1DB954",
                    color: "#fff",
                    border: "none",
                    padding: "4px 10px",
                    borderRadius: 4,
                    cursor: "pointer",
                }}
            >
                Join
            </button>
        </div>
    );
};

export default RoomItem;

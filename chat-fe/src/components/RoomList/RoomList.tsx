import React from "react";

export interface Room {
    id: string;
    name: string;
}

type Props = {
    rooms: Room[];
    onSelectRoom: (room: Room) => void;
};

const RoomList: React.FC<Props> = ({ rooms, onSelectRoom }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {rooms.length === 0 && (
                <div style={{ color: "#aaa", fontSize: 13 }}>
                    Chưa tham gia phòng nào 
                </div>
            )}

            {rooms.map((room) => (
                <div
                    key={room.id}
                    onClick={() => onSelectRoom(room)}
                    style={{
                        padding: "10px 12px",
                        borderRadius: 6,
                        background: "#2a2a2a",
                        color: "#fff",
                        cursor: "pointer",
                    }}
                >
                    {room.name}
                </div>
            ))}
        </div>
    );
};

export default RoomList;

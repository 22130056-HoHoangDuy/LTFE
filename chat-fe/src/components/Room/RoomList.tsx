import React from "react";

interface Room {
    id: string;
    name: string;
    time?: string;
}

interface Props {
    rooms: Room[];
    selectedRoomId: string | null;
    onSelectRoom: (roomId: string) => void;
}

const RoomList: React.FC<Props> = ({
                                       rooms,
                                       selectedRoomId,
                                       onSelectRoom,
                                   }) => {
    return (
        <>
            {rooms.map((room) => (
                <div
                    key={room.id}
                    onClick={() => onSelectRoom(room.id)}
                    style={{
                        borderRadius: 7,
                        padding: "10px 8px",
                        background:
                            selectedRoomId === room.id
                                ? "#244D3D"
                                : "#1a1a1a",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 6,
                        cursor: "pointer",
                        border:
                            selectedRoomId === room.id
                                ? "2px solid #1DB954"
                                : "2px solid transparent",
                    }}
                >
                    <img
                        src="/icons/avatar.svg"
                        alt=""
                        width={31}
                        height={31}
                        style={{ borderRadius: "50%" }}
                    />
                    <span style={{ marginLeft: 14, fontWeight: 500 }}>
                        {room.name}
                    </span>
                    {room.time && (
                        <span
                            style={{
                                marginLeft: "auto",
                                marginRight: 6,
                                fontSize: "0.9em",
                                color: "#b0b0b0",
                            }}
                        >
                            {room.time}
                        </span>
                    )}
                </div>
            ))}
        </>
    );
};

export default RoomList;

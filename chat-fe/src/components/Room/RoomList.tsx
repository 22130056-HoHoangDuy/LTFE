import React from "react";

interface Room {
    id?: string;
    name?: string;
    time?: string;
    [key: string]: any;
}

interface Props {
    rooms: any[]; // nhận cả string hoặc object từ server
    selectedRoomId: string | null;
    onSelectRoom: (roomId: string) => void;
}

const RoomList: React.FC<Props> = ({ rooms, selectedRoomId, onSelectRoom }) => {
    return (
        <>
            {rooms.map((roomRaw, idx) => {
                // normalize room: hỗ trợ string hoặc object
                const isString = typeof roomRaw === "string" || typeof roomRaw === "number";
                const id =
                    isString
                        ? String(roomRaw)
                        : String(roomRaw?.id ?? roomRaw?.roomId ?? roomRaw?.name ?? idx);
                const name =
                    isString
                        ? String(roomRaw)
                        : String(roomRaw?.name ?? roomRaw?.roomName ?? roomRaw?.title ?? id);
                const time = isString ? undefined : roomRaw?.time ?? roomRaw?.updatedAt ?? undefined;

                // đảm bảo key là chuỗi duy nhất (tránh dùng object làm key)
                const key = `${id}-${idx}`;

                return (
                    <div
                        key={key}
                        onClick={() => onSelectRoom(id)}
                        style={{
                            borderRadius: 7,
                            padding: "10px 8px",
                            background: selectedRoomId === id ? "#244D3D" : "#1a1a1a",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 6,
                            cursor: "pointer",
                            border: selectedRoomId === id ? "2px solid #1DB954" : "2px solid transparent",
                        }}
                    >
                        <img
                            src="/icons/avatar.svg"
                            alt=""
                            width={31}
                            height={31}
                            style={{ borderRadius: "50%" }}
                        />
                        <span style={{ marginLeft: 14, fontWeight: 500 }}>{name}</span>
                        {time && (
                            <span
                                style={{
                                    marginLeft: "auto",
                                    marginRight: 6,
                                    fontSize: "0.9em",
                                    color: "#b0b0b0",
                                }}
                            >
                {time}
              </span>
                        )}
                    </div>
                );
            })}
        </>
    );
};

export default RoomList;
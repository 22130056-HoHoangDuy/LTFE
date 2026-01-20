import React from "react";

interface Room {
    id?: string;
    name?: string;
    avatar?: string;
    lastMessageTime?: string;
    [key: string]: any;
}

interface Props {
    rooms: any[]; // nhận cả string hoặc object từ server
    selectedRoomId: string | null;
    onSelectRoom: (roomId: string) => void;
    theme: "dark" | "light";
}

const RoomList: React.FC<Props> = ({ rooms, selectedRoomId, onSelectRoom, theme }) => {
    // Đổi màu theo theme
    const bgSelected = theme === "dark" ? "#244D3D" : "#e6f3eb";
    const bg = theme === "dark" ? "#1a1a1a" : "#fff";
    const text = theme === "dark" ? "#fff" : "#222";
    const borderSelected = theme === "dark" ? "2px solid #1DB954" : "2px solid #29b474";
    const border = "2px solid transparent";
    const timeColor = theme === "dark" ? "#b0b0b0" : "#888";

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
                            background: selectedRoomId === id ? bgSelected : bg,
                            color: text,
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 6,
                            cursor: "pointer",
                            border: selectedRoomId === id ? borderSelected : border,
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
                                    color: timeColor,
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
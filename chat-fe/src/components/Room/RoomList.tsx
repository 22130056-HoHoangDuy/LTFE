import React from "react";

interface Room {
    id?: string;
    name?: string;
<<<<<<< HEAD
    time?: string;
=======
    avatar?: string;
    lastMessageTime?: string;
>>>>>>> e34ca1c6bee647ffe2a98330c2d498cb549c3d60
    [key: string]: any;
}

interface Props {
    rooms: any[]; // nhận cả string hoặc object từ server
    selectedRoomId: string | null;
    onSelectRoom: (roomId: string) => void;
<<<<<<< HEAD
}

const RoomList: React.FC<Props> = ({ rooms, selectedRoomId, onSelectRoom }) => {
=======
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

>>>>>>> e34ca1c6bee647ffe2a98330c2d498cb549c3d60
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
<<<<<<< HEAD
                            background: selectedRoomId === id ? "#244D3D" : "#1a1a1a",
                            color: "#fff",
=======
                            background: selectedRoomId === id ? bgSelected : bg,
                            color: text,
>>>>>>> e34ca1c6bee647ffe2a98330c2d498cb549c3d60
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 6,
                            cursor: "pointer",
<<<<<<< HEAD
                            border: selectedRoomId === id ? "2px solid #1DB954" : "2px solid transparent",
=======
                            border: selectedRoomId === id ? borderSelected : border,
>>>>>>> e34ca1c6bee647ffe2a98330c2d498cb549c3d60
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
<<<<<<< HEAD
                                    color: "#b0b0b0",
                                }}
                            >
                {time}
              </span>
=======
                                    color: timeColor,
                                }}
                            >
                                {time}
                            </span>
>>>>>>> e34ca1c6bee647ffe2a98330c2d498cb549c3d60
                        )}
                    </div>
                );
            })}
        </>
    );
};

export default RoomList;
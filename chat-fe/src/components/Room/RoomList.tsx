import React from "react";
import RoomItem from "./RoomItem";

// Props: danh sách room mock, callback chọn phòng
interface Room {
    id: string;
    name: string;
    avatar: string;
    lastMessageTime: string; // dạng "10:03" hoặc "3 ngày trước"
}
interface RoomListProps {
    rooms: Room[];
    selectedRoomId?: string;
    onSelectRoom?: (roomId: string) => void;
}

const RoomList: React.FC<RoomListProps> = ({
                                               rooms,
                                               selectedRoomId,
                                               onSelectRoom
                                           }) => {
    // Chỗ này để xử lý load danh sách room từ backend

    return (
        <div>
            {rooms.map(room => (
                <RoomItem
                    key={room.id}
                    room={room}
                    selected={selectedRoomId === room.id}
                    onClick={() => onSelectRoom?.(room.id)}
                />
            ))}
        </div>
    );
};

export default RoomList;
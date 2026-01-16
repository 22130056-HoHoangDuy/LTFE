import React from "react";

const styles = {
    item: (selected: boolean) => ({
        borderRadius: 7,
        padding: "10px 8px",
        background: selected ? "#244D3D" : "#292929",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        marginBottom: 8,
        cursor: "pointer",
        border: selected ? "2px solid #1DB954" : "2px solid transparent",
        transition: "background 0.2s, border 0.2s"
    }),
    avatar: {
        width: 34,
        height: 34,
        borderRadius: "50%",
        background: "#444",
        marginRight: 14,
        objectFit: "cover"
    },
    name: {
        fontWeight: 500,
        fontSize: 16
    },
    time: {
        marginLeft: "auto",
        marginRight: 6,
        fontSize: "0.95em",
        color: "#b0b0b0"
    }
};

interface Room {
    id: string;
    name: string;
    avatar: string;
    lastMessageTime: string;
}
interface RoomItemProps {
    room: Room;
    selected?: boolean;
    onClick?: () => void;
}

const RoomItem: React.FC<RoomItemProps> = ({ room, selected = false, onClick }) => {
    return (
        <div style={styles.item(selected)} onClick={onClick}>
            <img
                src={room.avatar || "/icons/avatar.svg"}
                alt="avatar"
                style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    background: "#444",
                    marginRight: 14,
                    objectFit: "cover"
                }}
            />
            <span style={styles.name}>{room.name}</span>
            <span style={styles.time}>{room.lastMessageTime}</span>
        </div>
    );
};

export default RoomItem;
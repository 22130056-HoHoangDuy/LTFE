import React, { useState } from "react";

interface Props {
    onClose: () => void;
    onCreate: (name: string) => void;
}

const CreateRoomModal: React.FC<Props> = ({ onClose, onCreate }) => {
    const [roomName, setRoomName] = useState("");

    const handleSubmit = () => {
        if (!roomName.trim()) return;
        onCreate(roomName.trim());
        setRoomName("");
        onClose();
    };

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.3)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    background: "#fff",
                    padding: 20,
                    width: 300,
                    borderRadius: 6,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <h4 style={{ margin: "0 0 10px 0" }}>Tạo phòng mới</h4>

                <input
                    type="text"
                    placeholder="Tên phòng"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    style={{
                        width: "100%",
                        padding: 6,
                        marginBottom: 12,
                        borderRadius: 4,
                        border: "1px solid #ccc",
                    }}
                />

                <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                    <button
                        onClick={handleSubmit}
                        style={{
                            background: "#1DB954",
                            color: "#fff",
                            border: "none",
                            padding: "6px 12px",
                            borderRadius: 4,
                            cursor: "pointer",
                        }}
                    >
                        Tạo
                    </button>
                    <button
                        onClick={onClose}
                        style={{
                            background: "#ccc",
                            border: "none",
                            padding: "6px 12px",
                            borderRadius: 4,
                            cursor: "pointer",
                        }}
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateRoomModal;

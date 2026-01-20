import React, { useState } from "react";

interface CreateRoomModalProps {
    open: boolean;
    onClose: () => void;
    theme: "dark" | "light";
    onCreateRoom: (roomName: string) => void; // 👈 callback
}

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({
                                                             open,
                                                             onClose,
                                                             theme,
                                                             onCreateRoom,
                                                         }) => {
    const [roomName, setRoomName] = useState("");

    if (!open) return null;

    const bg = theme === "dark" ? "#191919" : "#fff";
    const color = theme === "dark" ? "#fff" : "#222";
    const closeBtnColor = theme === "dark" ? "#fff" : "#222";

    const handleCreate = () => {
        if (!roomName.trim()) return;
        onCreateRoom(roomName.trim());
        setRoomName("");
        onClose();
    };

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.35)",
                zIndex: 2000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    background: bg,
                    color,
                    borderRadius: 10,
                    padding: 28,
                    minWidth: 320,
                    minHeight: 180,
                    boxShadow: "0 4px 32px #0005",
                    position: "relative",
                }}
            >
                <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 16 }}>
                    Tạo phòng mới
                </div>

                <input
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    placeholder="Tên phòng..."
                    style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: 6,
                        border: "1px solid #ccc",
                        marginBottom: 14,
                    }}
                />

                <button
                    onClick={handleCreate}
                    style={{
                        padding: "8px 16px",
                        borderRadius: 6,
                        border: "none",
                        background: "#1DB954",
                        color: "#fff",
                        cursor: "pointer",
                        fontWeight: 500,
                    }}
                >
                    Tạo
                </button>

                {/* Đóng modal */}
                <button
                    style={{
                        position: "absolute",
                        top: 10,
                        right: 16,
                        background: "transparent",
                        color: closeBtnColor,
                        fontSize: 22,
                        border: "none",
                        cursor: "pointer",
                    }}
                    onClick={onClose}
                    aria-label="Đóng"
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default CreateRoomModal;

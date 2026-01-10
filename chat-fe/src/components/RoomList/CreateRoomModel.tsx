import React, { useState } from "react";
import socket from "../../api/socket";

const CreateRoomModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [name, setName] = useState("");

    const handleCreate = () => {
        socket.send({
            action: "onchat",
            data: {
                event: "CREATE_ROOM",
                data: { name }
            }
        });
        onClose();
    };

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <div style={{ background: "#222", padding: 20, borderRadius: 8 }}>
                <h3>Create Room</h3>
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Room name"
                />
                <div style={{ marginTop: 10 }}>
                    <button onClick={handleCreate}>Create</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default CreateRoomModal;

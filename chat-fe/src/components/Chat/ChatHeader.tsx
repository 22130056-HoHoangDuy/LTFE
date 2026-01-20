// ChatHeader.tsx
import React, { useState } from "react";
import RoomPage from "../RoomList/RoomPage";

const ChatHeader: React.FC = () => {
    const [showRoom, setShowRoom] = useState(false);

    return (
        <>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "#1E1E1E",
                    color: "#fff",
                    padding: "10px 20px",
                    borderBottom: "1px solid #333",
                }}
            >
                <h2 style={{ margin: 0 }}>Minh Hao</h2>

                <button
                    onClick={() => setShowRoom(!showRoom)}
                    style={{
                        background: "#1DB954",
                        color: "#000",
                        border: "none",
                        borderRadius: 6,
                        padding: "8px 14px",
                        cursor: "pointer",
                        fontWeight: 600
                    }}
                >
                    ROOM
                </button>
            </div>

            {/* 👉 TEST MODULE ROOM */}
            {showRoom && (
                <div
                    style={{
                        position: "absolute",
                        top: 60,
                        right: 20,
                        width: 320,
                        height: 420,
                        background: "#181818",
                        border: "1px solid #333",
                        borderRadius: 8,
                        zIndex: 1000,
                        overflow: "hidden"
                    }}
                >
                    <RoomPage />
                </div>
            )}
        </>
    );
};

export default ChatHeader;

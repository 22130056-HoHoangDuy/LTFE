import { useState } from "react";
import { useChatContext } from "../../context/ChatContext";

export default function TempChatSelector() {
    const { selectChat } = useChatContext();
    const [value, setValue] = useState("");

    return (
        <div style={{ padding: 10, background: "#2A2A2A" }}>
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Nhập tên room hoặc username"
                style={{ marginRight: 8 }}
            />
            <button onClick={() => selectChat("room", value)}>
                Chat Room
            </button>
            <button
                style={{ marginLeft: 6 }}
                onClick={() => selectChat("people", value)}
            >
                Chat User
            </button>
        </div>
    );
}

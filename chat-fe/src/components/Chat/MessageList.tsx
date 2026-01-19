import React from "react";
import MessageItem, { Message } from "./MessageItem";
import { useChatContext } from "../../context/ChatContext";
import useAuth from "../../hooks/useAuth";

const MessageList: React.FC = () => {
    const { messages } = useChatContext();
    const { user } = useAuth();

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                padding: 20,
                background: "#121212",
                overflowY: "auto",
                height: "100%",
            }}
        >
            {messages.map((msg, idx) => (
                <MessageItem
                    key={idx}
                    message={{
                        text: msg.mes,
                        timestamp: "", // có thể format sau
                        isUser: msg.from === user?.username,
                    }}
                />
            ))}
        </div>
    );
};

export default MessageList;

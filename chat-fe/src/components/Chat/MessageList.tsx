import React from "react";
import MessageItem from "./MessageItem";
import { ChatMessage } from "../../hooks/useChat";

type Props = {
    messages: ChatMessage[];
    myUsername: string;
};

const MessageList: React.FC<Props> = ({
                                          messages,
                                          myUsername,
                                      }) => {
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
                        timestamp: msg.time ?? "", // ✅ FIX
                        isUser: msg.from === myUsername,
                    }}
                />
            ))}
        </div>
    );
};

export default MessageList;

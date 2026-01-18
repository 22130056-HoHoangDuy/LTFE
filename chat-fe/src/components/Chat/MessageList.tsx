import React from "react";
import MessageItem from "./MessageItem";
import { ChatMessage } from "../../utils/types";

type Props = {
    messages: ChatMessage[];
    myUsername: string;
};

const MessageList: React.FC<Props> = ({ messages, myUsername }) => {
    return (
        <div style={{ padding: 20, overflowY: "auto", height: "100%" }}>
            {messages.map((msg, idx) => {
                if (msg.type !== "text") return null; // 🚫 bỏ system message

                return (
                    <MessageItem
                        key={idx}
                        message={{
                            text: msg.content,
                            timestamp: msg.time ?? "",
                            isUser: msg.sender === myUsername,
                        }}
                    />
                );
            })}
        </div>
    );
};

export default MessageList;

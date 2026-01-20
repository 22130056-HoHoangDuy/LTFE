import React from "react";
import MessageItem from "./MessageItem";
import { ChatMessage, TextMessage } from "../../utils/types"; // Ensure TextMessage is imported if not already, or just define inline if needed but importing is better. 
// Wait, I can just use the import at top if it exports it. 
// Let's check imports in MessageList.tsx. It only imports ChatMessage.
// I will just cast or simple fix: (msg as TextMessage) inside map, OR better: change filter.

// Actually, I need to check imports.
// Original: import { ChatMessage, TextMessage } from "../../utils/types";
// I should verify if TextMessage is exported. Yes it is in types.ts.

// Let's modify the import first if needed, but I can also just use `msg.type === "text"` and cast in map, or use predicate.
// Predicate is cleanest. I need to make sure TextMessage is available.
// I'll update the import first.


interface MessageListProps {
    messages: ChatMessage[];
    user: {
        name: string;
        username: string;
        avatar: string;
    };
    theme: "dark" | "light";
}

const MessageList: React.FC<MessageListProps> = ({ messages = [], user, theme }) => {
    const bottomRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                padding: "30px 20px 20px 20px", // More top padding
                background: theme === "dark" ? "#121212" : "#fff",
                overflowY: "auto",
                height: "100%",
                boxSizing: "border-box", // Ensure padding doesn't overflow height
            }}
        >
            {messages
                .map((msg, idx) => {
                    // Normalize checking
                    const sender = ((msg as any).sender || "").toString().trim().toLowerCase();
                    const currentUsername = (user.username || "").toString().trim().toLowerCase();
                    const currentName = (user.name || "").toString().trim().toLowerCase();

                    const isUser =
                        (currentUsername && sender === currentUsername) ||
                        (currentName && sender === currentName) ||
                        sender === "me";

                    // Prepare content based on type
                    let text = "";
                    let content = "";
                    let fileName = "";
                    let fileType = "";

                    if (msg.type === "text") {
                        text = msg.content;
                    } else if (msg.type === "system") {
                        text = msg.content;
                    } else if (msg.type === "file") {
                        content = msg.content;
                        fileName = msg.fileName;
                        fileType = msg.fileType;
                    } else if (msg.type === "audio") {
                        content = msg.content;
                    } else if (msg.type === "sticker") {
                        content = msg.content;
                    } else if (msg.type === "image") {
                        content = msg.content;
                    }

                    return (
                        <MessageItem
                            key={idx}
                            theme={theme}
                            message={{
                                text: text,
                                content: content,
                                type: msg.type as any, // "text" | "file" | "audio" | "system"
                                fileName: fileName,
                                fileType: fileType,
                                timestamp: msg.time || "",
                                isUser: isUser,
                                avatar: (msg as any).avatar,
                            }}
                        />
                    );
                })}
            <div ref={bottomRef} />
        </div>
    );
};

export default MessageList;
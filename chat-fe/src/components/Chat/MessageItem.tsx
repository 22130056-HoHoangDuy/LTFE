import React from "react";

export type Message = {
    text?: string;
    content?: string;
    type?: "text" | "file" | "audio" | "sticker" | "image" | "system";
    fileName?: string;
    fileType?: string;
    timestamp: string;
    avatar?: string;
    isUser: boolean;
};

type MessageItemProps = {
    message: MessageUI;
    theme: "dark" | "light";
};

const MessageItem: React.FC<MessageItemProps> = ({ message, theme }) => {
    // Determine colors based on isUser and theme
    let bg = "#f3f3f4";
    let color = "#222";

    if (theme === "dark") {
        bg = message.isUser ? "#2196f3" : "#3E3E3E";
        color = "#fff";
    } else {
        bg = message.isUser ? "#e3eafc" : "#f3f3f4";
        color = message.isUser ? "#1565c0" : "#222";
    }

    const timestampColor = theme === "dark" ? "#b0b0b0" : "#888";
    const linkColor = theme === "dark" ? "#64b5f6" : "#1976d2";

    // Debug help: title attribute
    const debugTitle = `User: ${message.isUser} | Theme: ${theme} | Type: ${message.type}`;

    const renderContent = () => {
        if (message.type === "file") {
            return (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ fontSize: 24 }}>📄</div>
                    <div>
                        <div style={{ fontSize: 14, fontWeight: 500 }}>{message.fileName || "File"}</div>
                        <a
                            href={message.content}
                            download={message.fileName || "download"}
                            style={{ fontSize: 12, color: message.isUser ? "#fff" : linkColor, textDecoration: "underline" }}
                        >
                            Tải xuống
                        </a>
                    </div>
                </div>
            );
        }
        if (message.type === "audio") {
            return (
                <audio controls src={message.content} style={{ maxWidth: 220, height: 40 }} />
            );
        }
        if (message.type === "sticker") {
            return (
                <img
                    src={message.content}
                    alt="sticker"
                    style={{ width: 100, height: 100, objectFit: "contain" }}
                />
            );
        }
        if (message.type === "image") {
            return (
                <img
                    src={message.content}
                    alt="attachment"
                    style={{ maxWidth: 250, maxHeight: 300, borderRadius: 8, marginTop: 4, cursor: "pointer" }}
                    onClick={() => {
                        const w = window.open("");
                        w?.document.write('<img src="' + message.content + '" style="max-width: 100%"/>');
                    }}
                />
            );
        }
        // Default text
        return <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{message.text || message.content}</p>;
    };

    return (
        <div
            title={debugTitle}
            style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 10,
                maxWidth: "70%",
                alignSelf: message.isUser ? "flex-end" : "flex-start",
                margin: 0,
            }}
        >
            {!message.isUser && (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <img
                        src={message.avatar || "/icons/avatar.svg"}
                        alt="avatar"
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            objectFit: "cover"
                        }}
                    />
                </div>
            )}
            <div
                style={{
                    background: bg,
                    color: color,
                    padding: "10px 15px",
                    borderRadius: 10,
                    boxShadow: "0px 1px 3px rgba(0,0,0,0.2)",
                    wordBreak: "break-word"
                }}
            >
                {renderContent()}
                <div style={{ fontSize: "0.75em", color: timestampColor, marginTop: 4, textAlign: "right", opacity: 0.8 }}>
                    {message.timestamp}
                </div>
            </div>
        </div>
    );
};

export default MessageItem;
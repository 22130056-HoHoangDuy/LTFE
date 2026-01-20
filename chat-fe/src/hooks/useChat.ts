// src/hooks/useChat.ts
import { useEffect, useState, useCallback } from "react";
import socket from "../api/socket";
import { ChatMessage, SocketMessage } from "../utils/types";
import { useAuthContext } from "../context/AuthContext";
import { decryptMessage, encryptMessage } from "../utils/crypto";

export type UserItem = {
    id: string;
    name: string;
};

type ChatTarget =
    | { type: "room"; target: string }
    | { type: "people"; target: string }
    | null;

export default function useChat() {
    const { user } = useAuthContext();
    const [currentChat, setCurrentChat] = useState<ChatTarget>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [users, setUsers] = useState<UserItem[]>([]);

    // helper: logic to parse message content from various sources
    const processMessageData = (d: any) => {
        let finalType = "text";
        let finalContent = "";
        let finalExtra = {};

        // raw content might be in d.mes or d.content or d itself
        let rawContent = d?.mes ?? d?.content ?? d;

        // DECRYPT if it's a string
        if (typeof rawContent === "string") {
            // Attempt to decrypt. If it's not encrypted or fails, it returns original.
            rawContent = decryptMessage(rawContent);
        }

        if (rawContent == null) return { type: "text", content: "" };

        // 1. If it's an object with type file/audio/sticker/image (already parsed)
        if (typeof rawContent === "object" && rawContent.type && ["file", "audio", "sticker", "image"].includes(rawContent.type)) {
            finalType = rawContent.type;
            finalContent = rawContent.content;
            if (rawContent.fileName) finalExtra = { fileName: rawContent.fileName, fileType: rawContent.fileType };
        }
        // 2. If it's a string, try to parse details
        else if (typeof rawContent === "string") {
            // Optimization: check if it looks like JSON before parsing
            const trimmed = rawContent.trim();
            if (trimmed.startsWith("{") && (trimmed.includes('"type":"file"') || trimmed.includes('"type":"audio"') || trimmed.includes('"type":"sticker"') || trimmed.includes('"type":"image"'))) {
                try {
                    const parsed = JSON.parse(rawContent);
                    if (parsed && ["file", "audio", "sticker", "image"].includes(parsed.type)) {
                        finalType = parsed.type;
                        finalContent = parsed.content;
                        if (parsed.fileName) finalExtra = { fileName: parsed.fileName, fileType: parsed.fileType };
                    } else {
                        // parsed but not our type -> treat as text
                        finalContent = rawContent;
                    }
                } catch {
                    // Not JSON -> treat as text
                    finalContent = rawContent;
                }
            } else {
                finalContent = rawContent;
            }
        }
        // 3. Fallback normalization for other objects/arrays
        else {
            if (Array.isArray(rawContent)) {
                finalContent = rawContent.map((r) => (typeof r === "object" ? JSON.stringify(r) : String(r))).join(", ");
            } else if (typeof rawContent === "object") {
                // Try to extract text fields if not our special type
                const name = rawContent.name ?? rawContent.user ?? "";
                const action = rawContent.action ?? rawContent.type ?? "";
                const actionTime = rawContent.actionTime ?? rawContent.time ?? rawContent.createdAt ?? "";
                if (name || action || actionTime) {
                    finalContent = `${name} ${action} ${actionTime ? `lúc ${actionTime}` : ""}`.trim();
                } else {
                    finalContent = JSON.stringify(rawContent);
                }
            } else {
                finalContent = String(rawContent);
            }
        }

        return {
            type: finalType,
            content: finalContent,
            ...finalExtra
        };
    };

    useEffect(() => {
        // subscribe to socket messages
        const unsub = socket.onMessage((msg: SocketMessage) => {
            console.log("WS raw message:", msg);

            if (msg?.status === "error") return;

            // handle user list separately
            if (msg.event === "GET_USER_LIST") {
                const raw = msg.data;
                if (!Array.isArray(raw)) {
                    setUsers([]);
                    return;
                }
                const normalized = raw.map((u: any, idx: number) => {
                    if (typeof u === "string" || typeof u === "number") {
                        const id = String(u);
                        return { id, name: id };
                    }
                    if (typeof u === "object" && u !== null) {
                        const id = String(u.id ?? u.userId ?? u.username ?? idx);
                        const name = String(u.name ?? u.username ?? u.user ?? id);
                        return { id, name };
                    }
                    return { id: String(idx), name: String(u) };
                });
                setUsers(normalized);
                return;
            }

            // handle chat history responses
            if (
                msg.event === "GET_ROOM_CHAT_MES" ||
                msg.event === "GET_ROOM_CHAT_MESS" ||
                msg.event === "GET_PEOPLE_CHAT_MES" ||
                msg.event === "GET_PEOPLE_CHAT_MESS"
            ) {
                if (Array.isArray(msg.data)) {
                    // Use flatMap or filter to remove nulls (failed parses)
                    const normalized = msg.data.map((m: any) => {
                        try {
                            const processed = processMessageData(m);
                            return {
                                type: processed.type as any,
                                sender: m.from ?? m.sender ?? "unknown",
                                content: processed.content,
                                fileName: (processed as any).fileName,
                                fileType: (processed as any).fileType,
                                time: m.time ?? m.actionTime ?? "",
                            };
                        } catch (e) {
                            console.error("Error parsing history message:", m, e);
                            return null;
                        }
                    }).filter(Boolean) as ChatMessage[]; // remove nulls and cast
                    // Reverse to show oldest first (top) -> newest last (bottom)
                    setMessages(normalized.reverse());
                } else {
                    // unexpected format
                }
                return;
            }

            // handle system messages (array)
            if (msg.event === "SYSTEM_MESSAGE") {
                if (Array.isArray(msg.data)) {
                    const normalized = msg.data.map((m: any) => ({
                        type: "system" as const,
                        content: typeof m === "string" ? m : JSON.stringify(m),
                        time: m.actionTime ?? m.time ?? "",
                    }));
                    setMessages(normalized);
                }
                return;
            }

            // realtime single-message events (server may use different event names)
            if (msg.event === "SEND_CHAT" || msg.event === "NEW_MESSAGE" || msg.event === "RECEIVE_MESSAGE") {
                const d = msg.data;
                if (!d) return;

                const processed = processMessageData(d);
                const newMsg: any = {
                    type: processed.type,
                    sender: d.from ?? d.sender ?? "unknown",
                    content: processed.content,
                    fileName: (processed as any).fileName,
                    fileType: (processed as any).fileType,
                    time: d.time ?? d.actionTime ?? new Date().toISOString(),
                };

                setMessages((prev) => {
                    // dedupe optimistic message if present: replace last optimistic with server message
                    const last = prev[prev.length - 1] as any;
                    // Relaxed dedupe: check sender and (content OR type match)
                    if (last && last._optimistic && last.sender === newMsg.sender) {
                        // simple check to avoid duplication
                        return [...prev.slice(0, -1), newMsg];
                    }
                    return [...prev, newMsg];
                });
                return;
            }

            // fallback: if msg.data looks like a single message object
            if (msg.data && typeof msg.data === "object" && (msg.data.mes || msg.data.content || msg.data.from)) {
                const d = msg.data;

                const processed = processMessageData(d);

                const newMsg: any = {
                    type: processed.type,
                    sender: d.from ?? d.sender ?? "unknown",
                    content: processed.content,
                    fileName: (processed as any).fileName,
                    fileType: (processed as any).fileType,
                    time: d.time ?? d.actionTime ?? new Date().toISOString(),
                };
                setMessages((prev) => [...prev, newMsg]);
            }
        });

        return unsub;
        // intentionally no dependencies so subscription is set once
    }, []);

    // request user list on demand
    const loadUserList = useCallback(() => {
        try {
            socket.send({
                action: "onchat",
                data: { event: "GET_USER_LIST" },
            });
        } catch {
            // ignore
        }
    }, []);

    // select chat and request history
    const selectChat = useCallback((type: "room" | "people", target: string) => {
        setCurrentChat({ type, target });
        setMessages([]); // clear while loading

        try {
            console.log("REQUESTING HISTORY:", type, target); // DEBUG
            socket.send({
                action: "onchat",
                data: {
                    event: type === "room" ? "GET_ROOM_CHAT_MES" : "GET_PEOPLE_CHAT_MES",
                    data: { name: target, page: 1 },
                },
            });
        } catch {
            // ignore send error
        }
    }, []);

    // send message with optimistic update; uses current user from context
    const sendMessage = useCallback(
        (content: string | { type: "file" | "audio" | "sticker" | "image", content: string, fileName?: string, fileType?: string }) => {
            if (!currentChat) return;

            // Normalize input
            let mesContent = "";
            let msgType = "text";
            let extraData = {};

            if (typeof content === "string") {
                if (!content.trim()) return;
                mesContent = content;
            } else {
                mesContent = content.content; // Base64
                msgType = content.type;
                if (content.type === "file" || content.type === "image") {
                    extraData = { fileName: content.fileName, fileType: content.fileType };
                }
            }

            const currentUsername = user?.username ?? "me";

            // optimistic message
            const optimistic: any = {
                type: msgType,
                sender: currentUsername,
                content: mesContent,
                time: new Date().toISOString(),
                _optimistic: true,
                ...extraData
            };

            setMessages((prev) => [...prev, optimistic]);

            try {
                // If text, send as string to match legacy behavior, OR send object if server supports it.
                // Assuming server expects 'mes' field. We can stringify object into 'mes' if server blindly broadcasts it.
                // Or send distinct event? Plan says: "Hỗ trợ gửi object tin nhắn có type khác text"
                // Let's assume we wrap it in a structure that the server handles or just JSON stringify it into 'mes'
                // But wait, the previous code sent: mes: mes (string).

                // Strategy: Send JSON string as 'mes' content if it's media, OR just rely on server handling objects.
                // Let's try sending object as 'mes'.

                const socketPayload = {
                    type: msgType,
                    content: mesContent,
                    ...extraData
                };

                // ENCRYPT
                // If text, encrypt text. If object, stringify then encrypt.
                const rawString = msgType === "text" ? mesContent : JSON.stringify(socketPayload);
                const encryptedMes = encryptMessage(rawString);

                socket.send({
                    action: "onchat",
                    data: {
                        event: "SEND_CHAT",
                        data: {
                            type: currentChat.type,
                            to: currentChat.target,
                            mes: encryptedMes,
                        },
                    },
                });
            } catch {
                setMessages((prev) => prev.filter((m: any) => m !== optimistic));
            }
        },
        [currentChat, user]
    );

    return {
        users,
        messages,
        selectChat,
        sendMessage,
        loadUserList,
    };
}
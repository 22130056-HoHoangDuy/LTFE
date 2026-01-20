// src/hooks/useChat.ts
import { useEffect, useState, useCallback } from "react";

// @ts-ignore
import socket from "../api/socket";
// @ts-ignore
import { ChatMessage, SocketMessage } from "../utils/types";
// @ts-ignore
import { useAuthContext } from "../context/AuthContext";

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

    // helper: normalize any incoming content to a safe string
    const normalizeContent = (raw: any) => {
        if (raw == null) return "";
        if (typeof raw === "string" || typeof raw === "number") return String(raw);
        if (Array.isArray(raw)) {
            return raw
                .map((r) => (typeof r === "object" ? JSON.stringify(r) : String(r)))
                .join(", ");
        }
        // object: try common fields
        const name = raw.name ?? raw.user ?? "";
        const action = raw.action ?? raw.type ?? "";
        const actionTime = raw.actionTime ?? raw.time ?? raw.createdAt ?? "";
        if (name || action || actionTime) {
            return `${name} ${action} ${actionTime ? `lúc ${actionTime}` : ""}`.trim();
        }
        try {
            return JSON.stringify(raw);
        } catch {
            return String(raw);
        }
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
                    const normalized = msg.data.map((m: any) => ({
                        type: "text" as const,
                        sender: m.from ?? m.sender ?? "unknown",
                        content: normalizeContent(m.mes ?? m.content ?? m),
                        time: m.time ?? m.actionTime ?? "",
                    }));
                    setMessages(normalized);
                }
                return;
            }

            // handle system messages (array)
            if (msg.event === "SYSTEM_MESSAGE") {
                if (Array.isArray(msg.data)) {
                    const normalized = msg.data.map((m: any) => ({
                        type: "system" as const,
                        content: normalizeContent(m),
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
                const newMsg = {
                    type: "text" as const,
                    sender: d.from ?? d.sender ?? "unknown",
                    content: normalizeContent(d.mes ?? d.content ?? d),
                    time: d.time ?? d.actionTime ?? new Date().toISOString(),
                };

                setMessages((prev) => {
                    // dedupe optimistic message if present: replace last optimistic with server message
                    const last = prev[prev.length - 1] as any;
                    if (last && last._optimistic && last.sender === newMsg.sender && last.content === newMsg.content) {
                        return [...prev.slice(0, -1), newMsg];
                    }
                    return [...prev, newMsg];
                });
                return;
            }

            // fallback: if msg.data looks like a single message object
            if (msg.data && typeof msg.data === "object" && (msg.data.mes || msg.data.content || msg.data.from)) {
                const d = msg.data;
                const newMsg = {
                    type: "text" as const,
                    sender: d.from ?? d.sender ?? "unknown",
                    content: normalizeContent(d.mes ?? d.content ?? d),
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
        (mes: string) => {
            if (!currentChat || !mes.trim()) return;

            const currentUsername = user?.username ?? "me";

            // optimistic message (flagged so we can replace if server echoes)
            const optimistic: any = {
                type: "text",
                sender: currentUsername,
                content: mes,
                time: new Date().toISOString(),
                _optimistic: true,
            };
            setMessages((prev) => [...prev, optimistic]);

            try {
                socket.send({
                    action: "onchat",
                    data: {
                        event: "SEND_CHAT",
                        data: {
                            type: currentChat.type,
                            to: currentChat.target,
                            mes,
                        },
                    },
                });
            } catch {
                // if send fails, remove optimistic or mark as failed (simple approach: remove)
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
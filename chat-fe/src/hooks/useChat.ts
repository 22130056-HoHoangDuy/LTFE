import { useCallback, useEffect, useState } from "react";
import socket from "../api/socket";
import { SocketMessage } from "../utils/types";

/**
 * Kiểu chat hiện tại
 */
type ChatTarget =
    | { type: "room"; target: string }
    | { type: "people"; target: string }
    | null;

/**
 * Message chuẩn để render
 */
export type ChatMessage = {
    from: string;
    mes: string;
    time?: string;
};

export default function useChat() {
    const [currentChat, setCurrentChat] = useState<ChatTarget>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    /* =========================
        SOCKET RECEIVE
    ========================== */
    useEffect(() => {
        socket.connect();

        const unsubscribe = socket.onMessage((msg: SocketMessage & any) => {
            console.log("SOCKET RECEIVE:", msg);

            const { event, data, status } = msg;

            // ❌ BE trả error → không xử lý messages
            if (status === "error") {
                console.warn("CHAT ERROR:", msg.mes);
                return;
            }

            switch (event) {
                // ⚠️ LƯU Ý: BE dùng MES, KHÔNG phải MESS
                case "GET_ROOM_CHAT_MESS":
                case "GET_PEOPLE_CHAT_MES":
                    if (Array.isArray(data)) {
                        setMessages(
                            data.map((m: any) => ({
                                from: m.from || m.user || "",
                                mes: m.mes || m.message || "",
                                time: m.time,
                            }))
                        );
                    }
                    break;

                default:
                    break;
            }
        });

        return unsubscribe;
    }, []);

    /* =========================
        LOAD MESSAGE HISTORY
    ========================== */
    const loadMessages = useCallback(() => {
        if (!currentChat) return;

        if (currentChat.type === "room") {
            socket.send({
                action: "onchat",
                data: {
                    event: "GET_ROOM_CHAT_MESS",
                    data: {
                        name: currentChat.target,
                    },
                },
            });
        }

        if (currentChat.type === "people") {
            socket.send({
                action: "onchat",
                data: {
                    // ⚠️ MES (đúng theo BE)
                    event: "GET_PEOPLE_CHAT_MES",
                    data: {
                        user: currentChat.target,
                    },
                },
            });
        }
    }, [currentChat]);

    /* =========================
        SELECT CHAT
    ========================== */
    const selectChat = (type: "room" | "people", target: string) => {
        setCurrentChat({ type, target });
        setMessages([]);

        // Load ngay khi chọn chat
        setTimeout(() => {
            loadMessages();
        }, 100);
    };

    const sendMessage = (mes: string) => {
        if (!currentChat || !mes.trim()) return;

        socket.send({
            action: "onchat",
            data: {
                event: "SEND_CHAT",
                data: {
                    type: currentChat.type,   // "people" | "room"
                    to: currentChat.target,   // username hoặc room name
                    mes,
                },
            },
        });

        // BE không push realtime → phải pull lại
        setTimeout(() => {
            loadMessages();
        }, 200);
    };

    console.log("CHAT STATE messages:", messages);

    return {
        currentChat,
        messages,
        selectChat,
        sendMessage,
        reloadMessages: loadMessages,
    };
}

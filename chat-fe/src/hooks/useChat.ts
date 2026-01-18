import { useEffect, useState } from "react";
import socket from "../api/socket";
import { ChatMessage, SocketMessage } from "../utils/types";

export type UserItem = {
    id: string;
    name: string;
};

type ChatTarget =
    | { type: "room"; target: string }
    | { type: "people"; target: string }
    | null;

export default function useChat() {
    const [currentChat, setCurrentChat] = useState<ChatTarget>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [users, setUsers] = useState<UserItem[]>([]);

    useEffect(() => {
        const unsub = socket.onMessage((msg: SocketMessage) => {
            if (msg.status === "error") return;

            switch (msg.event) {
                case "GET_USER_LIST":
                    if (Array.isArray(msg.data)) {
                        setUsers(
                            msg.data.map((u: string) => ({
                                id: u,
                                name: u,
                            }))
                        );
                    }
                    break;

                case "GET_ROOM_CHAT_MESS":
                case "GET_PEOPLE_CHAT_MES":
                    if (Array.isArray(msg.data)) {
                        setMessages(
                            msg.data.map((m: any) => ({
                                type: "text",
                                sender: m.from,
                                content: m.mes,
                                time: m.time,
                            }))
                        );
                    }
                    break;

                case "SYSTEM_MESSAGE":
                    if (!msg.data) return;

                    setMessages((prev) => [
                        ...prev,
                        {
                            type: "text",
                            sender: "system",
                            content: `${msg.data.name} ${msg.data.action} lúc ${msg.data.actionTime}`,
                            time: msg.data.actionTime,
                        },
                    ]);
                    break;
            }
        });

        return unsub;
    }, [currentChat]);

    const loadUserList = () => {
        socket.send({
            action: "onchat",
            data: { event: "GET_USER_LIST" },
        });
    };

    const selectChat = (type: "room" | "people", target: string) => {
        setCurrentChat({ type, target });
        setMessages([]);
    };

    const sendMessage = (mes: string) => {
        if (!currentChat || !mes.trim()) return;

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
    };

    return {
        users,
        messages,
        selectChat,
        sendMessage,
        loadUserList,
    };
}

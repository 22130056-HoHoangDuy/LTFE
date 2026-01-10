import { useEffect } from "react";
import useSocket from "./useSocket";
import { useChatContext } from "../context/ChatContext";
import { SOCKET_ACTIONS, CHAT_EVENTS } from "../utils/constants";

export default function useChat() {
    const { send, messages: socketMessages } = useSocket<any>();
    const {
        addMessage,
        setRooms,
        setUsers,
        currentChat,
    } = useChatContext();

    // handle socket response
    useEffect(() => {
        if (!socketMessages.length) return;

        const msg = socketMessages[socketMessages.length - 1];
        if (msg.action !== SOCKET_ACTIONS.ON_CHAT) return;

        const { event, data } = msg.data || {};

        switch (event) {
            case CHAT_EVENTS.GET_ROOM_MESSAGES:
            case CHAT_EVENTS.GET_PEOPLE_MESSAGES:
                data.forEach((m: any) => addMessage(m));
                break;

            case CHAT_EVENTS.SEND_CHAT:
                addMessage(data);
                break;

            case CHAT_EVENTS.GET_USER_LIST:
                setUsers(data);
                break;

            case CHAT_EVENTS.CREATE_ROOM:
            case CHAT_EVENTS.JOIN_ROOM:
                // BE thường trả room list mới
                if (Array.isArray(data)) setRooms(data);
                break;

            default:
                break;
        }
    }, [socketMessages]);

    // ===== ACTIONS =====

    const createRoom = (name: string) => {
        send({
            action: SOCKET_ACTIONS.ON_CHAT,
            data: {
                event: CHAT_EVENTS.CREATE_ROOM,
                data: { name },
            },
        });
    };

    const joinRoom = (name: string) => {
        send({
            action: SOCKET_ACTIONS.ON_CHAT,
            data: {
                event: CHAT_EVENTS.JOIN_ROOM,
                data: { name },
            },
        });
    };

    const loadMessages = () => {
        if (!currentChat) return;

        send({
            action: SOCKET_ACTIONS.ON_CHAT,
            data: {
                event:
                    currentChat.type === "room"
                        ? CHAT_EVENTS.GET_ROOM_MESSAGES
                        : CHAT_EVENTS.GET_PEOPLE_MESSAGES,
                data: {
                    name: currentChat.target,
                },
            },
        });
    };

    const sendChat = (mes: string) => {
        if (!currentChat) return;

        send({
            action: SOCKET_ACTIONS.ON_CHAT,
            data: {
                event: CHAT_EVENTS.SEND_CHAT,
                data: {
                    type: currentChat.type,
                    to: currentChat.target,
                    mes,
                },
            },
        });
    };

    const getUserList = () => {
        send({
            action: SOCKET_ACTIONS.ON_CHAT,
            data: {
                event: CHAT_EVENTS.GET_USER_LIST,
            },
        });
    };

    return {
        createRoom,
        joinRoom,
        loadMessages,
        sendChat,
        getUserList,
    };
}

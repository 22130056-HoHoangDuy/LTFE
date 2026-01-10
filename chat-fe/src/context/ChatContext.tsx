import React, { createContext, useContext, useState } from "react";

export type ChatMessage = {
    from: string;
    to: string;
    mes: string;
    type: "room" | "people";
};

type ChatContextType = {
    rooms: string[];
    users: string[];
    currentChat: {
        type: "room" | "people";
        target: string;
    } | null;
    messages: ChatMessage[];

    setRooms: (rooms: string[]) => void;
    setUsers: (users: string[]) => void;
    selectChat: (type: "room" | "people", target: string) => void;
    addMessage: (msg: ChatMessage) => void;
    clearMessages: () => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [rooms, setRooms] = useState<string[]>([]);
    const [users, setUsers] = useState<string[]>([]);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [currentChat, setCurrentChat] = useState<ChatContextType["currentChat"]>(null);

    const selectChat = (type: "room" | "people", target: string) => {
        setCurrentChat({ type, target });
        setMessages([]);
    };

    const addMessage = (msg: ChatMessage) => {
        setMessages((prev) => [...prev, msg]);
    };

    const clearMessages = () => setMessages([]);

    return (
        <ChatContext.Provider
            value={{
                rooms,
                users,
                currentChat,
                messages,
                setRooms,
                setUsers,
                selectChat,
                addMessage,
                clearMessages,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const useChatContext = () => {
    const ctx = useContext(ChatContext);
    if (!ctx) {
        throw new Error("useChatContext must be used inside ChatProvider");
    }
    return ctx;
};

import React, { createContext, useContext } from "react";
import useChat from "../hooks/useChat";
import { ChatMessage } from "../utils/types";

export interface ChatContextType {
    messages: ChatMessage[];
    selectChat: (type: "room" | "people", target: string) => void;
    sendMessage: (mes: string) => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const chat = useChat();

    return (
        <ChatContext.Provider
            value={{
                messages: chat.messages,
                selectChat: chat.selectChat,
                sendMessage: chat.sendMessage,
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

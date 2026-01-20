<<<<<<< HEAD
import React, { useContext } from "react";
import useChat from "../hooks/useChat";
import { ChatContext } from "./ChatContext";
=======
import React, { createContext, useContext } from "react";
import useChat from "../hooks/useChat";
import { ChatMessage } from "../utils/types";

export interface ChatContextType {
    messages: ChatMessage[];
    selectChat: (type: "room" | "people", target: string) => void;
    sendMessage: (mes: string) => void;
}

const ChatContext = createContext<ChatContextType | null>(null);
>>>>>>> e34ca1c6bee647ffe2a98330c2d498cb549c3d60

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const chat = useChat();

    return (
        <ChatContext.Provider
            value={{
                messages: chat.messages,
<<<<<<< HEAD
                currentChat: chat.currentChat,
                selectChat: chat.selectChat,
                sendMessage: chat.sendMessage,
                reloadMessages: () => { console.log("reload not implemented"); },
=======
                selectChat: chat.selectChat,
                sendMessage: chat.sendMessage,
>>>>>>> e34ca1c6bee647ffe2a98330c2d498cb549c3d60
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

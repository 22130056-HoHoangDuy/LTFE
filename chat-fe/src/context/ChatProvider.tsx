import React, { useContext } from "react";
import useChat from "../hooks/useChat";
import { ChatContext } from "./ChatContext";

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const chat = useChat();

    return (
        <ChatContext.Provider
            value={{
                messages: chat.messages,
                currentChat: chat.currentChat,
                selectChat: chat.selectChat,
                sendMessage: chat.sendMessage,
                reloadMessages: () => { console.log("reload not implemented"); },
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

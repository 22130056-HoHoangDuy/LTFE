import { createContext, useContext } from "react";
import { ChatMessage } from "../utils/types";

export interface ChatContextType {
    messages: ChatMessage[];
    currentChat: {
        type: "room" | "people";
        target: string;
    } | null;

    selectChat: (type: "room" | "people", target: string) => void;
    sendMessage: (mes: string) => void;
    reloadMessages: () => void;
}

export const ChatContext = createContext<ChatContextType | null>(null);

export const useChatContext = () => {
    const ctx = useContext(ChatContext);
    if (!ctx) {
        throw new Error("useChatContext must be used inside ChatProvider");
    }
    return ctx;
};

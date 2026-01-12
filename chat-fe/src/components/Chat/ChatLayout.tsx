import React from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { ChatMessage } from "../../hooks/useChat";

type Props = {
    messages: ChatMessage[];
    onSend: (mes: string) => void;
    myUsername: string;
};

const ChatLayout: React.FC<Props> = ({
                                         messages,
                                         onSend,
                                         myUsername,
                                     }) => {
    return (
        <div
            style={{
                background: "#121212",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <ChatHeader />
            <div style={{ flex: 1, overflow: "hidden" }}>
                <MessageList
                    messages={messages}
                    myUsername={myUsername}
                />
            </div>
            <MessageInput onSend={onSend} />
        </div>
    );
};

export default ChatLayout;

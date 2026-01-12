import { useEffect } from "react";
import { User } from "../utils/types";
import ChatLayout from "../components/Chat/ChatLayout";
import useChat from "../hooks/useChat";

type Props = {
    user: User;
};

export default function ChatPage({ user }: Props) {
    const chat = useChat();

    useEffect(() => {
        // đổi email này thành user bạn đang test
        chat.selectChat("people", "22130074@st.hcmuaf.edu.vn");
    }, []);
    return (
        <ChatLayout
            messages={chat.messages}
            onSend={chat.sendMessage}
            myUsername={user.username}
        />
    );
}

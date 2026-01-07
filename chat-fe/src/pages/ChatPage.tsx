import { useEffect, useState } from "react";
import socketService from "../api/socket";
import { User } from "../utils/types";
//Thêm vào để test ChatLayout demo
import ChatLayout from "../components/Chat/ChatLayout";

type Props = {
    user: User;
};

type Message = {
    user: string;
    content: string;
};

export default function ChatPage({ user }: Props) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        socketService.connect();

        socketService.onMessage((data: Message) => {
            console.log("Receive:", data);
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            // optional: nếu backend hỗ trợ
            // socketService.disconnect?.();
        };
    }, []);

    const handleSend = () => {
        if (!message.trim()) return;

        socketService.send({
            user: user.username,
            content: message,
        });

        setMessage("");
    };

    // return (
    //     <div style={{ padding: 16 }}>
    //         <h2>Chat Page</h2>
    //         <p>Logged in as: <b>{user.username}</b></p>
    //
    //         <div
    //             style={{
    //                 border: "1px solid #ccc",
    //                 padding: 8,
    //                 height: 300,
    //                 overflowY: "auto",
    //                 marginBottom: 8,
    //             }}
    //         >
    //             {messages.map((m, i) => (
    //                 <div key={i}>
    //                     <b>{m.user}:</b> {m.content}
    //                 </div>
    //             ))}
    //         </div>
    //
    //         <input
    //             value={message}
    //             onChange={(e) => setMessage(e.target.value)}
    //             placeholder="Type message..."
    //             style={{ width: "70%", marginRight: 8 }}
    //         />
    //
    //         <button onClick={handleSend}>Send</button>
    //     </div>
    // );
    return <ChatLayout />;
}

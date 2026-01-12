import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import socket from "./api/socket";
import { User } from "./utils/types";

export default function App() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        socket.connect();
    }, []);

    if (!user) {
        return <LoginPage onLogin={setUser} />;
    }

    // 🔥 TRUYỀN USER XUỐNG
    return <ChatPage user={user} />;
}

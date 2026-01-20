import { useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import socket from "./api/socket";
import { AuthProvider, useAuthContext } from "./context/AuthContext";
import { ChatProvider } from "./context/ChatProvider";

function AppContent() {
    const { isAuthenticated } = useAuthContext();

    useEffect(() => {
        socket.connect();
    }, []);

    if (!isAuthenticated) {
        return <LoginPage />;
    }

    return (
        <ChatProvider>
            <ChatPage />
        </ChatProvider>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

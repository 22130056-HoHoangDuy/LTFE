import { useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import socket from "./api/socket";
import { AuthProvider, useAuthContext } from "./context/AuthContext";
import { ChatProvider } from "./context/ChatContext";
import ChatDashboard from "./components/ChatDashboard/ChatDashboard";

function AppContent() {
    const { isAuthenticated } = useAuthContext();

    if (!isAuthenticated) {
        //return <LoginPage />;
        return <ChatDashboard />;
    }

    return <ChatPage />;
}

export default function App() {
    useEffect(() => {
        socket.connect();
    }, []);

    return (
        <AuthProvider>
            <ChatProvider>
                <AppContent />
            </ChatProvider>
        </AuthProvider>
    );
}

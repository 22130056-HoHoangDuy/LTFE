import { useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import ChatDashboard from "./components/ChatDashboard/ChatDashboard";
import socket from "./api/socket";
import { AuthProvider, useAuthContext } from "./context/AuthContext";

function AppContent() {
    const { isAuthenticated } = useAuthContext();

    if (!isAuthenticated) {
        return <LoginPage />;
    }

    return <ChatDashboard />;
}

export default function App() {
    useEffect(() => {
        socket.connect();
    }, []);

    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

import ChatLayout from "../components/Chat/ChatLayout";
import useAuth from "../hooks/useAuth";

export default function ChatPage() {
    const { user } = useAuth();

    // guard an toàn, tránh render khi chưa có user
    if (!user) return null;

    return <ChatLayout />;
}

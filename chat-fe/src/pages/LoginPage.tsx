import AuthPage from "../components/Auth/AuthPage";
import useAuth from "../hooks/useAuth";
import { User } from "../utils/types";

export default function LoginPage() {
    const { login } = useAuth();

    const handleLoginSuccess = (user: User) => {
        login(user);
    };

    return <AuthPage onAuthSuccess={handleLoginSuccess} />;
}

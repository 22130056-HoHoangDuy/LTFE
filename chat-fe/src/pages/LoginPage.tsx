import AuthPage from "../components/Auth/AuthPage";
import { useAuthContext } from "../context/AuthContext";

export default function LoginPage() {
    const { login } = useAuthContext();

    return <AuthPage onAuthSuccess={login} />;
}

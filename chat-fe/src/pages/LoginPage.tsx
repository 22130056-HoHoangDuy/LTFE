import AuthPage from "../components/Auth/AuthPage";
import { User } from "../utils/types";

type Props = {
    onLogin: (user: User | null) => void;
};

export default function LoginPage({ onLogin }: Props) {
    return <AuthPage onAuthSuccess={onLogin} />;
}

import { useState, useEffect } from "react";
import useSocket from "../../hooks/useSocket";

export default function Login({ onLoginSuccess }) {
    const { send, lastMessage } = useSocket();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        setError("");

        send({
            action: "onchat",
            data: {
                event: "LOGIN",
                data: {
                    user: email,
                    pass: password,
                },
            },
        });
    };

    useEffect(() => {
        if (!lastMessage) return;

        /**
         * ⚠️ TUỲ BACKEND THẦY TRẢ VỀ
         * Có thể là:
         * - LOGIN_SUCCESS
         * - LOGIN_FAIL
         * - hoặc status: true/false
         */

        if (lastMessage.event === "LOGIN_SUCCESS") {
            console.log("🎉 Login success");
            onLoginSuccess(lastMessage.data);
        }

        if (lastMessage.event === "LOGIN_FAIL") {
            setError("Sai tài khoản hoặc mật khẩu");
        }
    }, [lastMessage]);

    return (
        <div>
            <h2>Login</h2>

            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleLogin}>Login</button>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

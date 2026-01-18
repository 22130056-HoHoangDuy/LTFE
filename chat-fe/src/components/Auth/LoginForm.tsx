import React, { useState } from "react";
import socket from "../../api/socket";
import { User } from "../../utils/types";

type Props = {
    onSuccess: (user: User) => void;
};

const LoginForm: React.FC<Props> = ({ onSuccess }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (!username || !password) {
            setError("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        setLoading(true);
        setError("");

        socket.send({
            action: "onchat",
            data: {
                event: "LOGIN",
                data: {
                    user: username,
                    pass: password,
                },
            },
        });

        const unsubscribe = socket.onMessage((msg: any) => {
            if (msg.event === "LOGIN" && msg.status === "success") {
                const user: User = {
                    id: msg.data?.code || "",
                    username,
                };

                onSuccess(user);
                unsubscribe();
            }

            if (msg.event === "LOGIN" && msg.status === "error") {
                setError(msg.mes || "Đăng nhập thất bại");
                setLoading(false);
                unsubscribe();
            }
        });
    };

    return (
        <div>
            <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {error && <div style={{ color: "red" }}>{error}</div>}

            <button onClick={handleLogin} disabled={loading}>
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
        </div>
    );
};

export default LoginForm;
